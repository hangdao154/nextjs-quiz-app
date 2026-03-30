import { z } from 'zod';

export const cardSchema = z.object({
  front: z.string().min(1, 'Front is required'),
  back: z.string().optional(), // Optional initially to allow drafting
});

export const deckSchema = z.object({
  title: z.string().min(1, 'Deck title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  cards: z.array(cardSchema).min(1, 'At least one card is required'),
});
