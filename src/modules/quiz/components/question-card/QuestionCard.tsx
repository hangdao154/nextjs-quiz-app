'use client';

import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Trash2, Check, Circle } from 'lucide-react';
import { TQuizFormValues } from '@/types';
import { AppFormItem, Button, Input } from '@/components';
import { cn } from '@/lib';

interface IQuestionCardProps {
  index: number;
  remove: (index: number) => void;
  form: UseFormReturn<TQuizFormValues>;
}

const QuestionCard: FC<IQuestionCardProps> = ({ index, remove, form }) => {
  const setCorrectOption = (optionIndex: number) => {
    const currentQuestions = form.getValues('questions');
    const updatedOptions = currentQuestions[index].options.map((opt, i) => ({
      ...opt,
      isCorrect: i === optionIndex,
    }));
    form.setValue(`questions.${index}.options`, updatedOptions, {
      shouldDirty: true,
    });
  };

  const isCompleted = form.watch(`questions.${index}.text`)?.length > 0;

  const watchQuestion = form.watch(`questions.${index}`);

  return (
    <div className="group bg-primary-800 border-border relative rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-sm text-xs font-bold ${isCompleted ? 'bg-primary text-black' : 'bg-primary/20 text-zinc-400'}`}
          >
            {index + 1}
          </div>
          <span className="font-bold text-white">Multiple Choice</span>
        </div>
        <Button
          type="button"
          variant="link"
          onClick={() => remove(index)}
          className="p-0 text-zinc-500 transition-colors hover:text-red-400"
        >
          <Trash2 className="size-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <AppFormItem
          name={`questions.${index}.text`}
          control={form.control}
          label="Multiple Choice"
        >
          <Input
            placeholder="Enter your question here..."
            className="dark:bg-accent-foreground border-zinc-700 py-5 text-white"
          />
        </AppFormItem>

        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((optIndex) => {
            const isCorrect = watchQuestion.options[optIndex].isCorrect;
            return (
              <div key={optIndex} className="relative">
                <AppFormItem
                  key={optIndex}
                  control={form.control}
                  name={`questions.${index}.options.${optIndex}.text`}
                >
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                    className={cn(
                      'dark:bg-accent-foreground py-5 pl-10 text-white transition-colors focus-visible:ring-0',
                      isCorrect ? 'border-[#B1F041]' : 'border-zinc-700'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setCorrectOption(optIndex)}
                    className="absolute top-2.75 left-2.5 w-fit! focus:outline-none"
                  >
                    {isCorrect ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B1F041]">
                        <Check className="h-3 w-3 stroke-3 text-black" />
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-[#2A3322]" />
                    )}
                  </button>
                </AppFormItem>
              </div>
            );
          })}
        </div>
      </div>

      <span
        className={cn(
          'absolute top-3 -left-3 h-10 w-1 rounded-[1px]',
          isCompleted ? 'bg-primary' : 'bg-primary/20'
        )}
      />
    </div>
  );
};

export default QuestionCard;
