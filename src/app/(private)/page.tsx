import { Card, CardContent } from '@/components';
import { getQuizzes, startQuiz } from '@/lib';
import { ExploreCommunity, MyLibrary, RecentActivities } from '@/modules/quiz';
import { Library, PenTool } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home() {
  const quizzes = await getQuizzes();
  const defaultQuiz = quizzes[0];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function beginQuizAction() {
    'use server';

    if (!defaultQuiz) return;

    const attempt = await startQuiz({ quizId: defaultQuiz.id });

    redirect(`/quiz/${defaultQuiz.id}?attemptId=${attempt.id}`);
  }

  const actions = [
    {
      title: 'Create Quiz',
      description:
        'Design custom questions and challenge your students or friends.',
      icon: <PenTool className="h-6 w-6 text-black group-hover:text-white" />,
      href: '/quiz/create',
    },
    {
      title: 'Create Flashcards',
      description: 'Master any subject with AI-powered rapid memory cards.',
      icon: <Library className="h-6 w-6 text-black group-hover:text-white" />,
      href: '/flashcard/create',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Welcome back, My!</h1>
        <p className="text-zinc-400">
          You have 3 quizzes scheduled for review this week.
        </p>
      </div>

      {/* Actions Section */}
      <section className="mb-8 grid grid-cols-2 gap-6">
        {actions.map((item) => (
          <Link href={item.href} key={item.title}>
            <Card className="group border-primary-60 from-primary/0 to-primary/40 hover:border-primary hover:bg-primary cursor-pointer border-2 bg-transparent bg-linear-to-br p-5 text-white ring-0 transition-colors **:transition-colors">
              <CardContent className="flex gap-5 p-0">
                <div className="bg-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg group-hover:bg-black">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 text-2xl font-bold group-hover:text-black">
                    {item.title}
                  </h3>
                  <p className="max-w-[300px] font-medium text-zinc-400 group-hover:text-black">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Dashboard Section */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <Suspense fallback={<div>Loading Library...</div>}>
            <MyLibrary />
          </Suspense>
          <Suspense fallback={<div>Loading Explore Community...</div>}>
            <ExploreCommunity />
          </Suspense>
        </div>
        <div className="space-y-8">
          <Suspense fallback={<div>Loading Recent Activities...</div>}>
            <RecentActivities />
          </Suspense>
          <div className="rounded-xl bg-[#B1F041] p-6 text-black">
            <h3 className="mb-2 text-xl font-bold">Upgrade to Elite</h3>
            <p className="mb-4 text-sm font-medium opacity-80">
              Get AI generation, unlimited quizzes, and priority support.
            </p>
            <button className="rounded-lg bg-[#161913] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
