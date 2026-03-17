import {
  Zap,
  LayoutDashboard,
  BookOpen,
  Compass,
  BarChart2,
  Settings,
  MoreVertical,
} from 'lucide-react';
import { Button } from '@/components';
import Image from 'next/image';
import { FC } from 'react';

const Sidebar: FC = () => {
  const avatar =
    'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/535330314_1301068191694365_8513639196053862897_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeH_WsRNz6OjQv2xdjaAGN9E0Lj-rCPd2-HQuP6sI93b4SdOFShDXicj_ApJX0gcmu9hSDJUSdMVuJMLE382LiHT&_nc_ohc=V0eXR7oUOfUQ7kNvwHHXRDH&_nc_oc=AdnJILBCoO0QsSGcsejkwfkzvW0nj07WlKukJKnOlU_AqTuzu4E_UF-0YnsE0bKk-uVagoWV88GBQCCF5nlmqJaF&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=zL2XZwgiep3TpnPMs0KsOA&_nc_ss=8&oh=00_AfxqmiBJH2NbQoJuKhSAvTmEePdb_rrPAwZ0--UnM8nJFw&oe=69B857A3';

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
            {avatar ? (
              <Image src={avatar} alt="Avatar" width={36} height={36} />
            ) : (
              <span className="text-xl font-black text-black">KM</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Kim My</span>
            <span className="text-xs text-[#B1F041]">Pro Member</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
