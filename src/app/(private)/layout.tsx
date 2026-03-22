import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import { FC, ReactNode } from 'react';

const PrivateLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen font-sans text-white">
      <Sidebar />
      <main className="flex flex-1 flex-col">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default PrivateLayout;
