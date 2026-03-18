'use server';

import { DashboardService } from '@/service';
import { AuthService } from '@/service';
import { IDashboardOverview } from '@/types';

export async function fetchDashboardOverview(): Promise<IDashboardOverview> {
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

export async function fetchMyLibrary(limit?: number) {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserLibraryQuizzes(user.id, limit);
}

export async function fetchCommunityExplore(limit?: number) {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getCommunityQuizzes(user.id, limit);
}

export async function fetchRecentActivity(limit?: number) {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  return DashboardService.getUserRecentAttempts(user.id, limit);
}
