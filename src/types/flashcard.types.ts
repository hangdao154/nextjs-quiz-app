import { deckSchema } from '@/lib';
import z from 'zod';

export type TDeckFormValues = z.infer<typeof deckSchema>;
