import { UseFormReturn } from 'react-hook-form';
import { Image as ImageIcon } from 'lucide-react';
import { TQuizFormValues } from '@/types';
import { FC } from 'react';
import { AppFormItem, Switch } from '@/components';

interface IQuizSidebarProps {
  form: UseFormReturn<TQuizFormValues>;
}

const QuizSidebar: FC<IQuizSidebarProps> = ({ form }) => {
  return (
    <aside className="sticky top-8 space-y-10">
      {/* Quiz Settings */}
      <div>
        <h3 className="mb-6 text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Quiz Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Time Limit</span>
            <span className="text-sm font-bold text-[#B1F041]">
              {form.watch('timeLimit')}
            </span>
          </div>

          <AppFormItem control={form.control} name="shuffle" label="Shuffle">
            <Switch className="data-[state=checked]:bg-[#B1F041] data-[state=unchecked]:bg-[#B1F04150]" />
          </AppFormItem>

          <AppFormItem
            control={form.control}
            name="showResults"
            label="Show Results"
          >
            <Switch className="data-[state=checked]:bg-[#B1F041] data-[state=unchecked]:bg-[#B1F04150]" />
          </AppFormItem>
        </div>
      </div>

      {/* Assets */}
      <div>
        <h3 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Assets
        </h3>
        <button
          type="button"
          className="flex h-32 w-full flex-col items-center justify-center rounded-xl border border-[#2A3322] bg-[#1C2118] text-zinc-500 transition-colors hover:border-zinc-400 hover:text-white"
        >
          <ImageIcon className="mb-2 h-6 w-6" />
          <span className="text-xs font-bold tracking-wider">UPLOAD COVER</span>
        </button>
      </div>

      {/* Pro Tip */}
      <div className="rounded-xl border border-[#2A3322] bg-[#1a1f16] p-4">
        <p className="mb-2 text-sm text-zinc-400 italic">
          &quot;Quality questions lead to quality insights.&quot;
        </p>
        <p className="text-xs font-bold tracking-wider text-[#B1F041] uppercase">
          — QuizMaster Pro Tip
        </p>
      </div>
    </aside>
  );
};

export default QuizSidebar;
