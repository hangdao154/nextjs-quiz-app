import { Card, CardContent } from '@/components';
import { getQuizzes, startQuiz } from '@/lib';
import { ExploreCommunity, MyLibrary } from '@/modules/quiz';
import { Activity, Library, PenTool } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
      href: '/flashcards/create',
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
            <Card className="group cursor-pointer border-2 border-lime-800/10 bg-transparent bg-linear-to-br from-lime-800/10 to-lime-800/60 p-5 text-white transition-colors **:transition-colors hover:border-lime-500 hover:bg-lime-400">
              <CardContent className="flex gap-5 p-0">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#B1F041] group-hover:bg-black">
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

      {/* Grid Layout for the rest of the content */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Left/Main Column (takes up 2 spans) */}
        <div className="space-y-8 xl:col-span-2">
          {/* My Library Section */}
          <MyLibrary />

          {/* Explore Community Section */}
          <ExploreCommunity />
        </div>

        {/* Right Column (Sidebar-ish) */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Activity className="h-5 w-5 text-white" />
              Recent Activity
            </h2>
            <div className="rounded-xl border border-white/5 bg-[#1C2118] p-6">
              {/* Stats Grid */}
              <div className="mb-6 grid grid-cols-2 border-b border-white/5 pb-6">
                <div>
                  <div className="text-3xl font-bold text-[#B1F041]">84%</div>
                  <div className="mt-1 text-xs font-bold tracking-wider text-zinc-500">
                    AVG. ACCURACY
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">12</div>
                  <div className="mt-1 text-xs font-bold tracking-wider text-zinc-500">
                    QUIZZES COMPLETED
                  </div>
                </div>
              </div>
              {/* List of recent scores goes here */}
            </div>
          </section>

          {/* Promo Card */}
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
