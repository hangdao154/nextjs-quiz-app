import { getQuizzes, logoutAction, startQuiz } from '@/lib';
import { redirect } from 'next/navigation';

export default async function Home() {
  const quizzes = await getQuizzes();
  const defaultQuiz = quizzes[0];

  async function beginQuizAction() {
    'use server';

    if (!defaultQuiz) return;

    const attempt = await startQuiz({ quizId: defaultQuiz.id });

    redirect(`/quiz/${defaultQuiz.id}?attemptId=${attempt.id}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <button onClick={logoutAction}>Logout</button>

      <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome to the Quiz App
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Test your knowledge with quick, timed quizzes.
        </p>

        {defaultQuiz ? (
          <form action={beginQuizAction} className="mt-8">
            <p className="mb-4 text-sm text-zinc-700 dark:text-zinc-300">
              Next quiz:{' '}
              <span className="font-medium">{defaultQuiz.title}</span>
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Begin Quiz
            </button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
            No quizzes are available yet. Add one in the database to get
            started.
          </p>
        )}
      </section>
    </main>
  );
}
