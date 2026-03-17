import { Card, CardContent } from '@/components';
import { PenTool, Library } from 'lucide-react';
import { FC } from 'react';

const ActionCard: FC = () => {
  return (
    <div className="mb-8 grid grid-cols-2 gap-6">
      {/* Create Quiz Card */}
      <Card className="cursor-pointer border-2 border-lime-800/10 bg-transparent bg-linear-to-br from-lime-800/10 to-lime-800/60 text-white transition-colors hover:border-lime-500">
        <CardContent className="p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#B1F041]">
            <PenTool className="h-6 w-6 text-black" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">Create Quiz</h3>
          <p className="max-w-[250px] font-medium text-zinc-400">
            Design custom questions and challenge your students or friends.
          </p>
        </CardContent>
      </Card>

      {/* Create Flashcards Card */}
      <Card className="cursor-pointer border-white/5 bg-linear-to-br from-[#2A3322] to-[#1C2118] text-white transition-colors hover:border-white/10">
        <CardContent className="p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#B1F041]">
            <Library className="h-6 w-6 text-black" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">Create Flashcards</h3>
          <p className="max-w-[250px] text-zinc-400">
            Master any subject with AI-powered rapid memory cards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCard;
