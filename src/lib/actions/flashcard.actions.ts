'use server';

import { cache } from 'react';
import { AuthService, FlashcardService } from '@/service';
import { TDeckFormValues } from '@/types';
import { successResponse } from '../utils';
import { deckSchema } from '../validations';

export const getDecks = cache(
  async ({
    userId,
    limit,
    offset,
  }: {
    userId: string;
    limit: number;
    offset: number;
  }) => {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    try {
      const data = await FlashcardService.getAllDecks(userId, limit, offset);
      return successResponse(data, 'Decks fetched successfully!');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to fetch decks. Please try again.';
      throw new Error(message);
    }
  }
);

export async function createDeck(formData: TDeckFormValues) {
  const user = await AuthService.getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const parsed = deckSchema.safeParse(formData);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    throw new Error(
      `Validation failed: ${Object.keys(fieldErrors).join(', ')}`
    );
  }

  try {
    const deck = await FlashcardService.create(parsed.data, user.id);
    return successResponse(deck, 'Quiz created successfully!');
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to create quiz. Please try again.';
    throw new Error(message);
  }
}
