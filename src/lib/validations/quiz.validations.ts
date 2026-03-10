import { z } from 'zod';

export const startQuizSchema = z.object({
  quizId: z.number().int().positive(),
});

export const submitAnswersSchema = z.object({
  attemptId: z.number().int().positive(),
  quizId: z.number().int().positive(),
  answers: z
    .array(
      z.object({
        questionId: z.number().int().positive(),
        optionId: z.number().int().positive(),
      })
    )
    .min(1),
});
