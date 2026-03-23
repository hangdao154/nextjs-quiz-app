import { Button } from '@/components';
import {
  fetchDashboardOverview,
  fetchRecentActivity,
} from '@/lib/actions/dashboard.actions';
import { Activity } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

const RecentActivities: FC = async () => {
  const [overview, items] = await Promise.all([
    fetchDashboardOverview(),
    fetchRecentActivity(3),
  ]);

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <Activity className="text-primary h-5 w-5" />
        Recent Activity
      </h2>
      <div className="bg-primary-800 rounded-xl border border-white/5 p-6">
        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 border-b border-white/10 pb-6">
          <div>
            <div className="text-3xl font-bold text-[#B1F041]">
              {Math.round(overview.activity.averageAccuracy)}%
            </div>
            <div className="mt-1 text-xs font-bold tracking-wider text-zinc-500">
              AVG. ACCURACY
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {overview.activity.totalQuizzesCompleted}
            </div>
            <div className="mt-1 text-xs font-bold tracking-wider text-zinc-500">
              QUIZZES COMPLETED
            </div>
          </div>
        </div>
        {!!items.length ? (
          <>
            {' '}
            {/* List of recent scores */}
            {items.map((item) => (
              <div
                key={item.id}
                className="mb-6 flex items-center justify-between gap-4"
              >
                <div className="flex max-w-[calc(100%-80px)] items-center gap-4">
                  <div className="max-h-16 min-h-16 max-w-16 min-w-16 items-center justify-center overflow-hidden rounded-md">
                    <Image
                      src={
                        item.coverImage ??
                        'https://placehold.co/128x128/0f0f0f/ffffff?text=Quiz'
                      }
                      alt={item.quizTitle}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-[calc(100%-80px)]">
                    <p className="-mb-0.5 truncate font-semibold">
                      {item.quizTitle}
                    </p>
                    <span className="mb-2 truncate text-xs text-zinc-500">
                      {item.completedAt
                        ? new Date(item.completedAt).toLocaleDateString()
                        : 'In progress'}
                    </span>
                  </div>
                </div>
                <span className="text-primary font-bold">
                  {item.score}/{item.maxScore}
                </span>
              </div>
            ))}
            {/* Action */}
            <div className="mt-6 max-h-fit border-t border-white/10 pt-4">
              <Button variant="link" className="w-full">
                View Performance Report
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-zinc-500">
            You have not completed any quizzes yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default RecentActivities;
