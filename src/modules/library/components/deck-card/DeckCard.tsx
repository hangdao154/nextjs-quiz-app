import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { IDashboardLibraryDeckDTO } from '@/types';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface IDeckCardProps {
  data: IDashboardLibraryDeckDTO;
  /** Base path for the deck detail link, e.g. `/flashcard` */
  hrefBase?: string;
}

type TReviewMilestone = 'new' | 'struggling' | 'mastered' | 'finished';

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

const getReviewMilestone = (value: number): TReviewMilestone => {
  const progress = clampPercentage(value);

  if (progress === 0) return 'new';
  if (progress <= 69) return 'struggling';
  if (progress <= 99) return 'mastered';
  return 'finished';
};

const MILESTONE_STYLES: Record<
  TReviewMilestone,
  { label: string; fillClassName: string; textClassName: string }
> = {
  new: {
    label: 'New',
    fillClassName: 'bg-muted-foreground/50',
    textClassName: 'text-muted-foreground',
  },
  struggling: {
    label: 'Struggling',
    fillClassName: 'bg-chart-1',
    textClassName: 'text-chart-1',
  },
  mastered: {
    label: 'Mastered',
    fillClassName: 'bg-primary-20',
    textClassName: 'text-primary-20',
  },
  finished: {
    label: 'Finished',
    fillClassName: 'bg-primary',
    textClassName: 'text-primary',
  },
};

const DeckCard: FC<IDeckCardProps> = ({ data, hrefBase = '/flashcard' }) => {
  const reviewProgress = clampPercentage(data.reviewProgress ?? 0);
  const milestone = getReviewMilestone(reviewProgress);
  const milestoneStyle = MILESTONE_STYLES[milestone];

  return (
    <div className="group relative h-64">
      <div className="bg-primary-80/95 border-primary-60 pointer-events-none absolute inset-0 z-0 rounded-lg border transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:translate-y-1" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            type="button"
            className="hover:bg-primary-80/80 text-primary-20 hover:text-primary absolute top-2 right-2 z-2 h-7 w-7 rounded-md bg-transparent group-hover:-translate-x-1 group-hover:-translate-y-1"
            aria-label={`Deck options for ${data.title}`}
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="flex w-fit flex-row p-1.5"
          side="top"
        >
          <Link
            href={`${hrefBase}/${data.id}`}
            className="hover:bg-primary-80/60 flex items-center gap-2 rounded-md px-2 py-2 text-sm"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <Button
            type="button"
            className="hover:bg-destructive/20 hover:text-destructive flex items-center justify-start gap-2 rounded-md bg-transparent px-2 py-2 text-sm text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </PopoverContent>
      </Popover>

      <Link
        href={`flashcard/${data.id}`}
        className="bg-primary-800 border-border group-hover:border-primary-60 relative z-1 flex h-full flex-col overflow-hidden rounded-lg border p-4 transition-transform duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1"
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {data.totalCards} CARDS
          </div>
        </div>

        <h3 className="text-foreground mb-1 line-clamp-3 truncate text-lg font-bold text-wrap">
          {data.title}
        </h3>
        <p className="text-muted-foreground mb-3 truncate text-xs">
          Updated {data.updatedAt.toLocaleDateString()}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          {data.category ? (
            <span className="bg-primary/45 text-primary-foreground flex h-6 items-center truncate rounded-full px-2.5 text-xs font-semibold capitalize">
              {data.category}
            </span>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="text-muted-foreground flex items-center justify-between text-[10px] font-semibold tracking-wide uppercase">
            <span className={milestoneStyle.textClassName}>
              {milestoneStyle.label}
            </span>
            <span>{reviewProgress}%</span>
          </div>
          <div className="bg-primary-80 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${milestoneStyle.fillClassName}`}
              style={{ width: `${reviewProgress}%` }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DeckCard;
