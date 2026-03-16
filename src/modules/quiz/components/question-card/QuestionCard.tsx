'use client';

import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Trash2, Check, Circle } from 'lucide-react';
import { TQuizFormValues } from '@/types';
import { AppFormItem, Input } from '@/components';
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
    <div className="group relative rounded-xl border border-[#2A3322] bg-[#1C2118] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${isCompleted ? 'bg-[#B1F041] text-black' : 'bg-[#2A3322] text-zinc-400'}`}
          >
            {index + 1}
          </div>
          <span className="font-bold text-white">Multiple Choice</span>
        </div>
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-zinc-500 transition-colors hover:text-red-400"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        <AppFormItem
          name={`questions.${index}.text`}
          control={form.control}
          label="Multiple Choice"
        >
          <Input
            placeholder="Enter your question here..."
            className="border-[#2A3322] bg-[#11130e] text-white focus-visible:ring-[#B1F041]"
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
                      'bg-[#11130e] py-5 pl-10 text-white transition-colors focus-visible:ring-0',
                      isCorrect ? 'border-[#B1F041]' : 'border-[#2A3322]'
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
    </div>
  );
};

export default QuestionCard;
