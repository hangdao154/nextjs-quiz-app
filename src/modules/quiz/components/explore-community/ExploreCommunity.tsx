import { Compass, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { fetchCommunityExplore } from '@/lib/actions/dashboard.actions';

const ExploreCommunity: FC = async () => {
  const items = await fetchCommunityExplore(4);

  if (!items.length) {
    return (
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Compass className="text-primary h-5 w-5" />
          Explore Community
        </h2>
        <p className="text-sm text-zinc-500">
          No community quizzes are available yet. Check back later!
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <Compass className="text-primary h-5 w-5" />
        Explore Community
      </h2>
      {items.map((item) => (
        <Link href={`/quiz/${item.id}`} key={item.id}>
          <div className="bg-primary-800 hover:bg-primary/10 mb-2 flex items-center justify-between rounded-md border border-white/5 p-2.5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-20 items-center justify-center overflow-hidden rounded-md">
                <Image
                  src={
                    item.coverImage ??
                    'https://placehold.co/160x160/0f0f0f/ffffff?text=Quiz'
                  }
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="-mb-0.5 font-bold">{item.title}</h4>
                <span className="mb-2 truncate text-xs text-zinc-500">
                  {item.authorName ?? 'Unknown author'} • {item.playCount} plays
                </span>
              </div>
            </div>
            <div className="bg-primary/10 flex items-center gap-1 rounded-sm px-3 py-1">
              <Star
                className="text-primary size-4"
                fill="oklch(0.8379 0.231 132.5)"
              />
              <span className="text-primary text-sm font-bold">
                {item.rating ?? 0}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ExploreCommunity;
