import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components';
import { fetchMyLibrary } from '@/lib/actions/dashboard.actions';
import { FolderOpen, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const carouselButtonStyles =
  '[all:unset] min-w-8! max-w-8! min-h-8! max-h-8! rounded-full! bg-lime-500! flex! items-center! justify-center! [&>svg]:text-black cursor-pointer!';

const MyLibrary: FC = async () => {
  const items = await fetchMyLibrary(5);

  if (!items.length) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <FolderOpen className="text-primary h-5 w-5" />
            My Library
          </h2>
          <Link
            href="/library"
            className="text-sm font-medium text-[#B1F041] hover:underline"
          >
            View All
          </Link>
        </div>
        <p className="text-sm text-zinc-500">
          You have not created any quizzes yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <FolderOpen className="text-primary h-5 w-5" />
          My Library
        </h2>
        <Link
          href="/library"
          className="text-sm font-medium text-[#B1F041] hover:underline"
        >
          View All
        </Link>
      </div>
      <Carousel
        className="flex items-center gap-4"
        opts={{
          slidesToScroll: 1,
          align: 'start',
        }}
      >
        <div className="flex flex-col gap-2">
          <CarouselPrevious className={carouselButtonStyles} />
          <CarouselNext className={carouselButtonStyles} />
        </div>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-1/2">
              <div className="group bg-primary-800 relative flex h-64 flex-col overflow-hidden rounded-xl border border-white/5 p-4">
                <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg transition-transform">
                  <Image
                    src={
                      item.coverImage ??
                      'https://placehold.co/600x400/0f0f0f/ffffff?text=Quiz+Cover'
                    }
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full object-cover"
                  />
                  <div className="absolute top-1 right-1 z-10 rounded bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                    {item.totalQuestions} QUESTIONS
                  </div>
                </div>
                <h3 className="z-10 mb-1 truncate text-lg font-bold">
                  {item.title}
                </h3>
                <p className="z-10 mb-2 truncate text-xs text-zinc-500">
                  Last edited: {item.updatedAt.toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  {item.category && (
                    <span className="bg-primary/50 flex-center h-5 rounded-full px-2 text-xs text-black">
                      {item.category}
                    </span>
                  )}
                  <Link
                    href={`/quiz/${item.id}`}
                    className="border-primary hover:bg-primary/20 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-300"
                  >
                    <Play className="text-primary size-3" strokeWidth={4} />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default MyLibrary;
