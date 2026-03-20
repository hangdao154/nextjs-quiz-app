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
    <aside className="bg-primary-800 sticky top-24 space-y-10 rounded-xl p-6">
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
            <Switch />
          </AppFormItem>

          <AppFormItem
            control={form.control}
            name="showResults"
            label="Show Results"
          >
            <Switch />
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
          className="bg-primary/5 hover:bg-primary/20 border-primary/20 hover:border-primary flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed text-zinc-500 transition-colors hover:text-white"
        >
          <ImageIcon className="mb-2 h-6 w-6" />
          <span className="text-xs font-bold tracking-wider">UPLOAD COVER</span>
        </button>
      </div>

      {/* Pro Tip */}
      <div className="bg-accent-foreground rounded-xl border border-zinc-700 p-4">
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
