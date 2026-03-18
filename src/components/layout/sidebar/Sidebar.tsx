import {
  Zap,
  LayoutDashboard,
  BookOpen,
  Compass,
  BarChart2,
  Settings,
  MoreVertical,
  LogOut,
} from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components';
import Image from 'next/image';
import { FC } from 'react';
import { AuthService } from '@/service';
import { logoutAction } from '@/lib';

const Sidebar: FC = async () => {
  const user = await AuthService.getCurrentUser();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col justify-between border-r border-white/5 bg-[#11130e] p-4">
      <div>
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="rounded-md bg-[#B1F041] p-1.5">
            <Zap className="h-5 w-5 fill-black text-black" />
          </div>
          <span className="text-lg font-bold tracking-wide text-white">
            QuizMaster
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start bg-[#B1F041] font-semibold text-black hover:bg-[#9de02b] hover:text-black"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            My Library
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <Compass className="mr-3 h-5 w-5" />
            Explore
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Performance
          </Button>

          <div className="px-4 pt-6 pb-2 text-xs font-semibold tracking-wider text-zinc-600 uppercase">
            Personal
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </nav>
      </div>

      {/* User Profile */}
      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1C2118] p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-lime-200 text-center">
            {user?.avatar ? (
              <Image src={user.avatar} alt="Avatar" width={36} height={36} />
            ) : (
              <span className="text-xl font-black text-black">
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                  : 'G'}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {user?.name ?? 'Guest'}
            </span>
            <span className="text-xs text-[#B1F041]">Pro Member</span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="hover:bg-primary-80 h-8 w-8 bg-transparent text-zinc-400 hover:text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <form action={logoutAction}>
              <Button
                type="submit"
                className="hover:text-primary w-full justify-start bg-transparent text-white"
              >
                <LogOut className="mr-3 h-5 w-5 stroke-2" />
                Logout
              </Button>
            </form>
            <Button className="hover:text-primary w-full justify-start bg-transparent text-white">
              <Settings className="mr-3 h-5 w-5 stroke-2" />
              Settings
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};

export default Sidebar;
