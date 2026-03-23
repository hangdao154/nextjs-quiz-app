import { UseFormReturn } from 'react-hook-form';
import { TQuizFormValues } from '@/types';
import { FC } from 'react';
import { AppDragger, AppFormItem, Switch } from '@/components';

interface IQuizSidebarProps {
  form: UseFormReturn<TQuizFormValues>;
}

const QuizSidebar: FC<IQuizSidebarProps> = ({ form }) => {
  return (
    <aside className="bg-primary-800 sticky top-24 space-y-10 rounded-xl p-6">
      {/* Quiz Settings */}
      <div>
        <h3 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Quiz Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Time Limit</span>
            <span className="text-sm font-bold text-[#B1F041]">
              {form.watch('timeLimit')}
            </span>
          </div>

          <AppFormItem
            control={form.control}
            name="shuffle"
            label="Shuffle"
            classWrapper="flex-row"
          >
            <Switch />
          </AppFormItem>

          <AppFormItem
            control={form.control}
            name="showResults"
            label="Show Results"
            classWrapper="flex-row"
          >
            <Switch />
          </AppFormItem>
        </div>
      </div>

      {/* Assets */}
      <AppFormItem
        control={form.control}
        name="cover"
        label="Cover"
        classLabel="mb-2 text-xs font-bold tracking-widest text-zinc-500 uppercase"
      >
        <AppDragger formMethods={form} maxFiles={1} uploadText="Upload Cover" />
      </AppFormItem>

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
