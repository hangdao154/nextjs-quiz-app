'use server';

import { DashboardService } from '@/service';
import { AuthService } from '@/service';
import { IDashboardOverview } from '@/types';
import { cache } from 'react';

export const fetchDashboardOverview = cache(
  async (): Promise<IDashboardOverview> => {
    const user = await AuthService.getCurrentUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const [scheduledReviewsCount, activity] = await Promise.all([
      DashboardService.getScheduledReviewsCount(user.id),
      DashboardService.getUserActivityStats(user.id),
    ]);

    return {
      userName: user.name ?? null,
      scheduledReviewsCount,
      activity,
    };
  }
);

export const fetchMyLibrary = cache(async (limit?: number) => {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserLibraryQuizzes(user.id, limit);
});

const PAGE_SIZE_DEFAULT = 12;

/** Paginated library quizzes (not cached — used for load-more). */
export async function fetchLibraryQuizzesPage(
  offset: number,
  limit: number = PAGE_SIZE_DEFAULT
) {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserLibraryQuizzes(user.id, limit, offset);
}

/** Paginated flashcard decks (stub until flashcards table exists). */
export async function fetchLibraryFlashcardsPage(
  offset: number,
  limit: number = PAGE_SIZE_DEFAULT
) {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserLibraryFlashcards(user.id, limit, offset);
}

export const fetchCommunityExplore = cache(async (limit?: number) => {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getCommunityQuizzes(user.id, limit);
});

export const fetchRecentActivity = cache(async (limit?: number) => {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserRecentAttempts(user.id, limit);
});
