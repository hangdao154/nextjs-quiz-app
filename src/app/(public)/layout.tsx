import { FC, ReactNode } from 'react';

interface IPublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<IPublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2a3120] p-4 font-sans">
      <div className="flex w-full max-w-215 overflow-hidden rounded-2xl shadow-2xl">
        {/* Left decorative panel */}
        <div className="relative hidden flex-col justify-between bg-[#1c2614] p-8 md:flex md:w-[42%]">
          {/* Decorative orb */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative size-36">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#3a4a28] via-[#252f18] to-[#141c0c] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]" />
              <div className="absolute inset-6 rounded-full bg-linear-to-br from-[#4a5c34] to-[#2a3620] opacity-70" />
              <div className="absolute inset-10 rounded-full bg-linear-to-tl from-transparent to-[rgba(180,210,80,0.15)]" />
              <div className="absolute top-4 right-4 size-6 rounded-full bg-[rgba(200,230,80,0.2)] blur-sm" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-[#c8e020]/15 px-3 py-1 text-[10px] font-bold tracking-widest text-[#c8e020] uppercase">
              New Update
            </span>
            <h2 className="text-[1.35rem] leading-tight font-bold text-white">
              Master your skills with interactive challenges.
            </h2>
            <p className="text-sm leading-relaxed text-[#7a8a68]">
              Join over 10,000 students learning through gamified quizzes.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 flex-col justify-center bg-[#242c18] px-8 py-10 text-[#c8d4b0] md:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
