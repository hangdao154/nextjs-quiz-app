import { IDashboardLibraryQuizDTO } from '@/types';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IQuizCardProps {
  data: IDashboardLibraryQuizDTO;
  /** Base path for the play/open link, e.g. `/quiz` or `/flashcard` */
  hrefBase?: string;
  /** Label for the count badge (e.g. QUESTIONS vs CARDS) */
  countLabel?: string;
}

const QuizCard: FC<IQuizCardProps> = ({
  data,
  hrefBase = '/quiz',
  countLabel = 'QUESTIONS',
}) => {
  return (
    <div className="group bg-primary-800 relative flex h-64 flex-col overflow-hidden rounded-xl border border-white/5 p-4">
      <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg transition-transform">
        <Image
          src={
            data.coverImage ??
            'https://placehold.co/600x400/0f0f0f/ffffff?text=Quiz+Cover'
          }
          alt={data.title}
          width={100}
          height={100}
          className="w-full object-cover"
        />
        <div className="absolute top-1 right-1 z-10 rounded bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
          {data.totalQuestions} {countLabel}
        </div>
      </div>
      <h3 className="z-10 mb-1 truncate text-lg font-bold">{data.title}</h3>
      <p className="z-10 mb-2 truncate text-xs text-zinc-500">
        Last edited: {data.updatedAt.toLocaleDateString()}
      </p>
      <div className="flex items-center justify-between">
        {data.category && (
          <span className="bg-primary/50 flex-center h-5 rounded-full px-2 text-xs text-black">
            {data.category}
          </span>
        )}
        <Link
          href={`${hrefBase}/${data.id}`}
          className="border-primary hover:bg-primary/20 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-300"
        >
          <Play className="text-primary size-3" strokeWidth={4} />
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
