'use server';

import { and, count, eq, inArray } from 'drizzle-orm';

import { db } from '@/db/client';
import { options, questions, quizzes, userAttempts } from '@/db/schema';
import {
  startQuizSchema,
  submitAnswersSchema,
} from '@/lib/validations/quiz.validations';
import { AuthService } from '@/service';
import { TStartQuizInput, TSubmitAnswersInput } from '@/types';
import { redirect } from 'next/navigation';

export async function getQuizzes() {
  const rows = await db
    .select({
      id: quizzes.id,
      title: quizzes.title,
      description: quizzes.description,
    })
    .from(quizzes)
    .where(eq(quizzes.isActive, true));

  return rows;
}

export async function startQuiz(rawInput: TStartQuizInput) {
  const input = startQuizSchema.parse(rawInput);
  const user = await AuthService.getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const totalQuestionsResult = await db
    .select({ count: count(questions.id) })
    .from(questions)
    .where(eq(questions.quizId, input.quizId));

  const totalQuestions = totalQuestionsResult[0]?.count ?? 0;

  const [attempt] = await db
    .insert(userAttempts)
    .values({
      userId: user.id,
      quizId: input.quizId,
      totalQuestions,
    })
    .returning();

  return attempt;
}

export async function getQuizWithQuestions(quizId: number) {
  const quiz = await db.query.quizzes.findFirst({
    where: (q, { eq }) => eq(q.id, quizId),
    with: {
      questions: {
        orderBy: (q, { asc }) => [asc(q.order), asc(q.id)],
        with: {
          options: {
            orderBy: (o, { asc }) => [asc(o.id)],
          },
        },
      },
    },
  });

  return quiz;
}

export async function submitAnswers(rawInput: TSubmitAnswersInput) {
  const input = submitAnswersSchema.parse(rawInput);
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const [attempt] = await db
    .select()
    .from(userAttempts)
    .where(
      and(
        eq(userAttempts.id, input.attemptId),
        eq(userAttempts.quizId, input.quizId),
        eq(userAttempts.userId, user.id)
      )
    );

  if (!attempt) {
    throw new Error('Attempt not found');
  }

  const questionIds = input.answers.map((a) => a.questionId);

  const correctOptions = await db
    .select({
      questionId: options.questionId,
      optionId: options.id,
      isCorrect: options.isCorrect,
    })
    .from(options)
    .where(
      and(inArray(options.questionId, questionIds), eq(options.isCorrect, true))
    );

  let score = 0;

  for (const answer of input.answers) {
    const correct = correctOptions.find(
      (o) =>
        o.questionId === answer.questionId && o.optionId === answer.optionId
    );

    if (correct?.isCorrect) {
      score += 1;
    }
  }

  const [updatedAttempt] = await db
    .update(userAttempts)
    .set({
      score,
      completedAt: new Date(),
    })
    .where(eq(userAttempts.id, attempt.id))
    .returning();

  return {
    attempt: updatedAttempt,
    score,
    totalQuestions: attempt.totalQuestions,
  };
}
