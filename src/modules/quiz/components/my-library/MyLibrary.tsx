import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components';
import { FolderOpen, Play } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

const carouselButtonStyles =
  '[all:unset] min-w-8! max-w-8! min-h-8! max-h-8! rounded-full! bg-lime-500! flex! items-center! justify-center! [&>svg]:text-black cursor-pointer!';

const MyLibrary: FC = () => {
  const items = [
    {
      id: 1,
      title: 'Advanced Organic Chemistry',
      createdAt: new Date('2026-03-10'),
      updatedAt: new Date('2026-03-10'),
      questionsCount: 15,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
      category: 'Chemistry',
    },
    {
      id: 2,
      title:
        'Advanced Inorganic Chemistry Advanced Inorganic Chemistry Advanced Inorganic Chemistry Advanced Inorganic Chemistry',
      createdAt: new Date('2026-03-10'),
      updatedAt: new Date('2026-03-10'),
      questionsCount: 15,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
      category: 'Chemistry',
    },
    {
      id: 3,
      title: 'Advanced Physical Chemistry',
      createdAt: new Date('2026-03-10'),
      updatedAt: new Date('2026-03-10'),
      questionsCount: 15,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
      category: 'Computer Science',
    },
    {
      id: 4,
      title: 'Advanced Physical Chemistry',
      createdAt: new Date('2026-03-10'),
      updatedAt: new Date('2026-03-10'),
      questionsCount: 15,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
      category: 'Math',
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <FolderOpen className="h-5 w-5 text-[#B1F041]" />
          My Library
        </h2>
        <a
          href="/library"
          className="text-sm font-medium text-[#B1F041] hover:underline"
        >
          View All
        </a>
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
          {items.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="group relative flex h-64 flex-col overflow-hidden rounded-xl border border-white/5 bg-[#1C2118] p-4">
                <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg transition-transform">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full object-cover"
                  />
                  <div className="absolute top-1 right-1 z-10 rounded bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                    {item.questionsCount} QUESTIONS
                  </div>
                </div>
                <h3 className="z-10 mb-1 truncate text-lg font-bold">
                  {item.title}
                </h3>
                <p className="z-10 mb-2 truncate text-xs text-zinc-500">
                  Last edited: {item.updatedAt.toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-primary/50 flex-center h-5 rounded-full px-2 text-xs text-black">
                    {item.category}
                  </span>
                  <Button
                    variant="outline"
                    className="border-primary flex size-7 cursor-pointer items-center justify-center rounded-full border-2"
                  >
                    <Play className="text-primary size-3" strokeWidth={4} />
                  </Button>
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
