import { ENV } from '@/constants';
import { db } from '@/db/client';
import { options, questions, quizzes } from '@/db/schema';
import { quizSchema } from '@/lib/validations/quiz.validations';
import { TQuizFormValues } from '@/types';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { R2Service } from '.';
import { InferInsertModel } from 'drizzle-orm';

export default class QuizService {
  static create = async (input: TQuizFormValues, userId: string) => {
    const data = quizSchema.parse(input);
    const image = data.cover;
    const questionsData = data.questions;

    // CASE: Image already uploaded (string)
    let imageUrl;
    if (typeof image === 'string') imageUrl = image;

    // CASE: Image is a File
    const { name, type } = image as File;
    if (!name || !type) {
      throw new Error('Missing filename or contentType for image');
    }

    try {
      const key = `quizzes/${Date.now()}-${name}`;
      // TODO: Temporarily use publicUrl to get the image url
      imageUrl = `${ENV.PUBLIC_URL_PREFIX}/${key}`;

      const command = new PutObjectCommand({
        Bucket: ENV.R2_BUCKET_NAME,
        Key: key,
        ContentType: type,
      });

      // Generate a presigned URL that allows uploading to this specific key
      const signedUrl = await getSignedUrl(R2Service, command, {
        expiresIn: 3600,
      });

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: image,
      });

      if (uploadResponse.ok) {
        const [quiz] = await db
          .insert(quizzes)
          .values({
            title: data.title,
            description: data.description,
            createdBy: userId,
            category: 'General',
            isPublic: true,
            totalQuestions: data.questions.length,
            isActive: true,
            coverImage: imageUrl,
          })
          .returning();

        const questionInsertData: InferInsertModel<typeof questions>[] =
          questionsData.map((question, order) => ({
            quizId: quiz.id,
            text: question.text,
            order,
          }));

        const questionsResult = await db
          .insert(questions)
          .values(questionInsertData)
          .returning();

        // One row per option; `questionsResult[i]` matches `questionsData[i]`
        const optionInsertData: InferInsertModel<typeof options>[] =
          questionsResult.flatMap((insertedQuestion, i) =>
            questionsData[i].options.map((opt) => ({
              questionId: insertedQuestion.id,
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))
          );

        const optionsResult = await db
          .insert(options)
          .values(optionInsertData)
          .returning();

        return {
          ...quiz,
          questions: { ...questionsResult, options: optionsResult },
        };
      } else {
        throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to create quiz: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };
}
