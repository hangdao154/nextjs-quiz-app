import { and, avg, count, desc, eq, ne, sql } from 'drizzle-orm';
import { db } from '@/db/client';
import { quizzes, userAttempts, users } from '@/db';
import {
  IDashboardActivityStatsDTO,
  IDashboardCommunityQuizDTO,
  IDashboardLibraryQuizDTO,
  IDashboardRecentAttemptDTO,
} from '@/types';

export default class DashboardService {
  static async getScheduledReviewsCount(userId: string): Promise<number> {
    const [row] = await db
      .select({ count: count() })
      .from(userAttempts)
      .where(
        and(
          eq(userAttempts.userId, userId),
          eq(userAttempts.isScheduledForReview, true)
        )
      );

    return row?.count ?? 0;
  }

  static async getUserLibraryQuizzes(
    userId: string,
    limit = 5
  ): Promise<IDashboardLibraryQuizDTO[]> {
    const rows = await db
      .select({
        id: quizzes.id,
        title: quizzes.title,
        coverImage: quizzes.coverImage,
        category: quizzes.category,
        totalQuestions: quizzes.totalQuestions,
        updatedAt: quizzes.updatedAt,
      })
      .from(quizzes)
      .where(eq(quizzes.createdBy, userId))
      .orderBy(desc(quizzes.updatedAt))
      .limit(limit);

    return rows;
  }

  static async getCommunityQuizzes(
    userId: string,
    limit = 4
  ): Promise<IDashboardCommunityQuizDTO[]> {
    const rows = await db
      .select({
        id: quizzes.id,
        title: quizzes.title,
        authorName: users.name,
        playCount: sql<number>`COUNT(${userAttempts.id})`,
        rating: sql<number | null>`NULL`,
        coverImage: quizzes.coverImage,
      })
      .from(quizzes)
      .leftJoin(users, eq(quizzes.createdBy, users.id))
      .leftJoin(userAttempts, eq(userAttempts.quizId, quizzes.id))
      .where(and(eq(quizzes.isPublic, true), ne(quizzes.createdBy, userId)))
      .groupBy(quizzes.id, quizzes.title, users.name)
      .orderBy(desc(sql`COUNT(${userAttempts.id})`))
      .limit(limit);

    return rows;
  }

  static async getUserActivityStats(
    userId: string
  ): Promise<IDashboardActivityStatsDTO> {
    const [row] = await db
      .select({
        averageAccuracy: avg(
          sql<number>`CASE 
            WHEN ${userAttempts.maxScore} > 0 
            THEN (${userAttempts.score}::float / ${userAttempts.maxScore}::float) * 100 
            ELSE 0 
          END`
        ),
        totalQuizzesCompleted: count(userAttempts.id),
      })
      .from(userAttempts)
      .where(
        and(
          eq(userAttempts.userId, userId),
          sql`${userAttempts.completedAt} IS NOT NULL`
        )
      );

    return {
      averageAccuracy: Number(row?.averageAccuracy ?? 0),
      totalQuizzesCompleted: row?.totalQuizzesCompleted ?? 0,
    };
  }

  static async getUserRecentAttempts(
    userId: string,
    limit = 3
  ): Promise<IDashboardRecentAttemptDTO[]> {
    const rows = await db
      .select({
        id: userAttempts.id,
        quizId: userAttempts.quizId,
        quizTitle: quizzes.title,
        completedAt: userAttempts.completedAt,
        score: userAttempts.score,
        maxScore: userAttempts.maxScore,
        coverImage: quizzes.coverImage,
      })
      .from(userAttempts)
      .innerJoin(quizzes, eq(userAttempts.quizId, quizzes.id))
      .where(eq(userAttempts.userId, userId))
      .orderBy(desc(userAttempts.completedAt), desc(userAttempts.id))
      .limit(limit);

    return rows;
  }
}
