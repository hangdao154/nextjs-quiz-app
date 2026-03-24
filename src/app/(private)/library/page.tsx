import { ELibraryTab } from '@/enums';
import {
  fetchLibraryFlashcardsPage,
  fetchLibraryQuizzesPage,
} from '@/lib/actions/dashboard.actions';
import { LibraryBrowser } from '@/modules/library';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const PAGE_SIZE = 12;

type Props = {
  searchParams: Promise<{ tab?: ELibraryTab }>;
};

export default async function LibraryPage({ searchParams }: Props) {
  const { tab } = await searchParams;

  if (!tab) {
    return redirect('/library?tab=quizzes');
  }

  const initialItems =
    tab === ELibraryTab.QUIZZES
      ? await fetchLibraryQuizzesPage(0, PAGE_SIZE)
      : await fetchLibraryFlashcardsPage(0, PAGE_SIZE);

  return (
    <Suspense fallback={<div>Loading Library...</div>}>
      <div className="mx-auto w-full max-w-7xl p-6 md:p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">My Library</h1>
          <p className="text-muted-foreground text-sm">
            Browse and manage your quizzes and flashcard decks.
          </p>
        </div>

        <LibraryBrowser
          initialTab={tab ?? ELibraryTab.QUIZZES}
          initialItems={initialItems}
          pageSize={PAGE_SIZE}
        />
      </div>
    </Suspense>
  );
}
