'use client';

import { IDashboardLibraryDeckDTO, IDashboardLibraryQuizDTO } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components';
import { ELibraryTab } from '@/enums';
import { QuizCard } from '@/modules/quiz';
import { fetchLibraryFlashcardsPage, fetchLibraryQuizzesPage } from '@/lib';
import DeckCard from '../deck-card';

const TAB_ITEMS: { id: ELibraryTab; label: string }[] = [
  { id: ELibraryTab.QUIZZES, label: 'Quizzes' },
  { id: ELibraryTab.FLASHCARDS, label: 'Flashcards' },
];

interface ILibraryBrowserProps {
  initialTab: ELibraryTab;
  initialItems: IDashboardLibraryQuizDTO[] | IDashboardLibraryDeckDTO[];
  pageSize: number;
}

const LibraryBrowser = ({
  initialTab,
  initialItems,
  pageSize,
}: ILibraryBrowserProps) => {
  const [items, setItems] = useState<
    IDashboardLibraryQuizDTO[] | IDashboardLibraryDeckDTO[]
  >(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length === pageSize);

  useEffect(() => {
    setItems(initialItems);
    setHasMore(initialItems.length === pageSize);
  }, [initialItems, initialTab, pageSize]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const offset = items.length;
      if (initialTab === ELibraryTab.QUIZZES) {
        const next = await fetchLibraryQuizzesPage(offset, pageSize);
        setItems((prev) => [...(prev as IDashboardLibraryQuizDTO[]), ...next]);
        setHasMore(next.length === pageSize);
      } else {
        const next = await fetchLibraryFlashcardsPage(offset, pageSize);
        setItems((prev) => [...(prev as IDashboardLibraryDeckDTO[]), ...next]);
        setHasMore(next.length === pageSize);
      }
    } finally {
      setLoading(false);
    }
  }, [hasMore, initialTab, items.length, loading, pageSize]);

  const emptyMessage =
    initialTab === ELibraryTab.QUIZZES
      ? 'You have not created any quizzes yet.'
      : 'You have not created any flashcard decks yet.';

  return (
    <div className="space-y-8">
      <div className="flex gap-1 border-b border-white/10">
        {TAB_ITEMS.map((tab) => (
          <Link
            key={tab.id}
            href={`/library?tab=${tab.id}`}
            scroll={false}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
              initialTab === tab.id
                ? 'border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialTab === ELibraryTab.QUIZZES
              ? (items as IDashboardLibraryQuizDTO[]).map((item) => (
                  <QuizCard
                    key={`quiz-${item.id}`}
                    data={item}
                    hrefBase="/quiz"
                    countLabel="QUESTIONS"
                  />
                ))
              : (items as IDashboardLibraryDeckDTO[]).map((item) => (
                  <DeckCard key={`deck-${item.id}`} data={item} />
                ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 min-w-40"
                disabled={loading}
                onClick={loadMore}
              >
                {loading ? 'Loading…' : 'Load more'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LibraryBrowser;
