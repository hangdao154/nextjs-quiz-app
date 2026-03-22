import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components';
import { fetchMyLibrary } from '@/lib/actions/dashboard.actions';
import { FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import QuizCard from '../quiz-card';

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
              <QuizCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default MyLibrary;
