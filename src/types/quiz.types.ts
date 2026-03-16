import { quizSchema, startQuizSchema, submitAnswersSchema } from '@/lib';
import z from 'zod';

export type TStartQuizInput = z.infer<typeof startQuizSchema>;
export type TSubmitAnswersInput = z.infer<typeof submitAnswersSchema>;
export type TQuizFormValues = z.input<typeof quizSchema>;
