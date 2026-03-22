'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { createQuiz, quizSchema } from '@/lib';
import { AppFormItem, Button, FieldError, Input, Textarea } from '@/components';
import { QuestionCard, QuizSidebar } from '@/modules/quiz';
import { TQuizFormValues, TQuizQuestion } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DEFAULT_QUESTION_VALUES: TQuizQuestion = {
  text: '',
  type: 'Multiple Choice',
  options: [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ],
};

export default function CreateQuizView() {
  const router = useRouter();

  const form = useForm<TQuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      timeLimit: '20m',
      shuffle: true,
      showResults: false,
      questions: [DEFAULT_QUESTION_VALUES],
    },
  });

  const { handleSubmit, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'questions',
  });

  const questionsState = form.getFieldState('questions');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await createQuiz(data);
      toast.success(result.message);
      router.push(`/quiz/${result.data.id}`);
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
    }
  });

  const handleAppenQuestion = () => {
    append(DEFAULT_QUESTION_VALUES);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-screen gap-8 p-8 text-white"
    >
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        <div className="mx-auto max-w-4xl">
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
                className="dark:bg-primary-800 border-border py-5"
              />
            </AppFormItem>

            <AppFormItem
              control={control}
              name="description"
              label="Description"
            >
              <Textarea
                placeholder="Briefly describe what this quiz covers..."
                className="dark:bg-primary-800 border-border min-h-25 text-white"
              />
            </AppFormItem>
          </div>

          <div className="pt-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Questions</h2>
              <div className="bg-primary-80 text-primary rounded-full px-3 py-1 text-xs font-bold">
                Total: {fields.length}
              </div>
            </div>

            {questionsState.invalid && (
              <FieldError
                errors={[
                  questionsState.error?.message
                    ? questionsState.error
                    : questionsState.error?.root,
                ]}
                className="mb-4"
              />
            )}

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
              <Button
                type="button"
                variant="outline"
                onClick={handleAppenQuestion}
                className="dark:border-primary/20 dark:hover:border-primary dark:bg-primary/5 group dark:hover:bg-primary/20 flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed text-zinc-500 transition-all"
              >
                <div className="border-border bg-primary-80 group-hover:border-primary/20 group-hover:bg-primary-40 mb-2 rounded-full border p-2 transition-colors">
                  <Plus className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
                </div>
                <span className="text-sm font-semibold">ADD NEW QUESTION</span>
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#2A3322] pt-8">
            <Button
              type="button"
              variant="outline"
              className="text-primary border-dashed"
            >
              Save as Draft
            </Button>
            <div className="flex items-center gap-4">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Publish Quiz</Button>
            </div>
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
