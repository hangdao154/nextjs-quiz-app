export interface IDashboardLibraryQuizDTO {
  id: number;
  title: string;
  coverImage: string | null;
  category: string | null;
  totalQuestions: number;
  updatedAt: Date;
}

export interface IDashboardCommunityQuizDTO {
  id: number;
  title: string;
  authorName: string | null;
  playCount: number;
  rating: number | null;
  coverImage: string | null;
}

export interface IDashboardActivityStatsDTO {
  averageAccuracy: number;
  totalQuizzesCompleted: number;
}

export interface IDashboardRecentAttemptDTO {
  id: number;
  quizId: number;
  quizTitle: string;
  completedAt: Date | null;
  score: number;
  maxScore: number;
  coverImage: string | null;
}

export interface IDashboardOverview {
  userName: string | null;
  scheduledReviewsCount: number;
  activity: {
    averageAccuracy: number;
    totalQuizzesCompleted: number;
  };
}
