import { FC } from 'react';
import { Button, Input } from '@/components';
import { Search, Bell, Plus } from 'lucide-react';

const Topbar: FC = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/5 bg-[#161913] px-8">
      <div className="relative w-96">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="text"
          placeholder="Search for quizzes, topics, or friends..."
          className="w-full border-none bg-[#1C2118] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#B1F041]"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-zinc-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button className="bg-[#B1F041] font-semibold text-black hover:bg-[#9de02b]">
          <Plus className="mr-2 h-4 w-4" />
          New Quiz
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
