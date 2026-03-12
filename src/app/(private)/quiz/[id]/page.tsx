import { notFound } from 'next/navigation';
import { QuizClient } from './QuizClient';
import { getQuizWithQuestions } from '@/lib';

type QuizPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    attemptId?: string;
  }>;
};

export default async function QuizPage({
  params,
  searchParams,
}: QuizPageProps) {
  const { id } = await params;
  const searchParamsData = await searchParams;

  const quizId = Number(id);

  if (!Number.isFinite(quizId) || quizId <= 0) {
    notFound();
  }

  const quiz = await getQuizWithQuestions(quizId);

  if (!quiz) {
    notFound();
  }

  const attemptId = searchParamsData?.attemptId
    ? Number(searchParamsData.attemptId)
    : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {quiz.title}
        </h1>
        {quiz.description ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {quiz.description}
          </p>
        ) : null}
      </header>

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <QuizClient quiz={quiz} attemptId={attemptId} />
      </section>
    </main>
  );
}
