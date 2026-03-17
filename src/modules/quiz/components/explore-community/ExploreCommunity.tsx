import { Compass, Star } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

const ExploreCommunity: FC = () => {
  const items = [
    {
      id: 1,
      title: 'Advanced Organic Chemistry',
      creator: 'John Doe',
      playCount: 100,
      averageRating: 4.5,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
    },
    {
      id: 2,
      title: 'Advanced Inorganic Chemistry',
      creator: 'Jane Doe',
      playCount: 200,
      averageRating: 4.8,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
    },
    {
      id: 3,
      title: 'Advanced Physical Chemistry',
      creator: 'Jim Doe',
      playCount: 300,
      averageRating: 4.9,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
    },
    {
      id: 4,
      title: 'Advanced Physical Chemistry',
      creator: 'Jim Doe',
      playCount: 300,
      averageRating: 4.9,
      image:
        'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/490573678_1086708366830913_1717914352728473497_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEh71p8avUihCMxqIYKVtyp827L9uL1EXXzbsv24vURdfV0r3h4onIDn83tBsQxyf6LaH4LSDVcARGCNef1Q1WO&_nc_ohc=3eos9eZY7hUQ7kNvwGGQlKy&_nc_oc=Admcw1KH7nhuGMiZajF0j_HgLzjwlEyPDrnKZj364jpS8PSi-U1bOiS5P64VOkBIdHxe-zc3O-LiwP5X8-aPuD-6&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=OLibRWk7UB3T6RgwDNQyIA&_nc_ss=8&oh=00_AfxkyJw-aJucTG4bMm4REUYIP_jcqth-GNYlpLuVgcc17Q&oe=69B848DF',
    },
  ];

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <Compass className="h-5 w-5 text-[#B1F041]" />
        Explore Community
      </h2>
      {/* List goes here */}
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-primary/5 mb-2 flex items-center justify-between rounded-md p-2"
        >
          <div className="flex items-center gap-4">
            <div className="size-16 items-center justify-center overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="-mb-0.5 font-bold">{item.title}</h4>
              <span className="mb-2 truncate text-xs text-zinc-500">
                {item.creator} • {item.playCount} plays
              </span>
            </div>
          </div>
          <div className="bg-primary/10 flex items-center gap-1 rounded-full px-3 py-1">
            <Star
              className="text-primary size-4"
              fill="oklch(0.8379 0.231 132.5)"
            />
            <span className="text-primary text-sm font-bold">
              {item.averageRating}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExploreCommunity;
