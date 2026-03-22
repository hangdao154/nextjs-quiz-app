import { LENGTH_CONSTANTS } from '@/constants';
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

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, 'Question text is required'),
        type: z.literal('Multiple Choice').default('Multiple Choice'),
        options: z
          .array(
            z.object({
              text: z.string().min(1, 'Option text is required'),
              isCorrect: z.boolean().default(false),
            })
          )
          .length(4, 'Must have exactly 4 options'),
      })
    )
    .min(1, 'At least one question is required'),
  timeLimit: z.string().optional(),
  shuffle: z.boolean().default(false),
  showResults: z.boolean().default(false),
  cover: z
    .union([
      z.string().min(1, 'Image String is required'),
      z.instanceof(File, { message: 'Image File is required' }),
    ])
    .optional()
    .refine(
      (item) =>
        typeof item === 'string' ||
        (item instanceof File && item.type.startsWith('image/')),
      'Only image files or strings are supported'
    )
    .refine(
      (item) =>
        typeof item === 'string' ||
        (item instanceof File && item.size <= LENGTH_CONSTANTS.MAX_FILE_SIZE),
      'Max image size is 2MB'
    ),
});
