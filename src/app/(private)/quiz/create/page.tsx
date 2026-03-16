'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { quizSchema } from '@/lib';
import { AppFormItem, Input, Textarea } from '@/components';
import { QuestionCard, QuizSidebar } from '@/modules/quiz';
import { TQuizFormValues } from '@/types';
import { toast } from 'sonner';

export default function CreateQuizView() {
  const form = useForm<TQuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      timeLimit: '20m',
      shuffle: true,
      showResults: false,
      questions: [
        {
          text: '',
          type: 'Multiple Choice',
          options: [
            { text: '', isCorrect: true },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
        },
      ],
    },
  });

  const { handleSubmit, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'questions',
  });

  const onSubmit = handleSubmit((data) => {
    toast.success('Quiz Created: ' + JSON.stringify(data));
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-screen gap-8 bg-[#11130e] p-8 text-white"
    >
      {/* Main Content Area */}
      <div className="max-w-4xl flex-1 space-y-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Create New Quiz</h1>
          <p className="text-zinc-400">
            Design your assessment by adding questions and defining correct
            answers.
          </p>
        </div>

        <div className="space-y-6">
          <AppFormItem name="title" control={control} label="Quiz Title">
            <Input
              placeholder="e.g. Advanced Quantum Mechanics"
              className="border-[#2A3322] bg-[#1C2118] text-white focus-visible:ring-[#B1F041]"
            />
          </AppFormItem>

          <AppFormItem control={control} name="description" label="Description">
            <Textarea
              placeholder="Briefly describe what this quiz covers..."
              className="min-h-25 border-[#2A3322] bg-[#1C2118] text-white focus-visible:ring-[#B1F041]"
            />
          </AppFormItem>
        </div>

        <div className="pt-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Questions</h2>
            <div className="rounded-full bg-[#2A3322] px-3 py-1 text-xs font-bold text-[#B1F041]">
              Total: {fields.length}
            </div>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <QuestionCard
                key={field.id}
                index={index}
                remove={remove}
                form={form}
              />
            ))}

            {/* Add Question Button */}
            <button
              type="button"
              onClick={() =>
                append({
                  text: '',
                  type: 'Multiple Choice',
                  options: [
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false },
                  ],
                })
              }
              className="flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2A3322] text-zinc-500 transition-all hover:border-zinc-400 hover:bg-[#1C2118] hover:text-white"
            >
              <div className="mb-2 rounded-full border border-[#2A3322] bg-[#1C2118] p-2">
                <Plus className="h-5 w-5 text-zinc-400" />
              </div>
              <span className="text-sm font-semibold">ADD NEW QUESTION</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#2A3322] pt-8">
          <button
            type="button"
            // variant="outline"
            className="border-[#2A3322] bg-transparent text-white hover:bg-[#2A3322]"
          >
            Save as Draft
          </button>
          <div className="flex items-center gap-4">
            <button
              type="button"
              //   variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#B1F041] px-8 font-bold text-black hover:bg-[#9de02b]"
            >
              Publish Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 shrink-0">
        <QuizSidebar form={form} />
      </div>
    </form>
  );
}
