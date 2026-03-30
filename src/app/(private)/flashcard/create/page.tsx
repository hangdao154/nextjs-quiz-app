'use client';

import { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Layers } from 'lucide-react';
import { createDeck, deckSchema } from '@/lib';
import { TDeckFormValues } from '@/types';
import { AppFormItem, AppSelect, Button, Input, Textarea } from '@/components';
import { Flashcard } from '@/modules/flashcard';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CreateDeckForm: FC = () => {
  const router = useRouter();

  const form = useForm<TDeckFormValues>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      cards: [
        { front: '', back: '' },
        { front: '', back: '' },
      ],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cards',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await createDeck(data);
      toast.success(result.message);
      router.push(`/library?tab=flashcards`);
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto min-h-screen w-full max-w-5xl p-8 text-white"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Create New Deck</h1>
        <p className="text-zinc-400">
          Organize your thoughts and start mastering new subjects.
        </p>
      </div>

      {/* Deck Metadata Form */}
      <div className="border-border bg-primary-800 mb-12 space-y-6 rounded-xl border p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <AppFormItem
              control={control}
              name="title"
              label="Deck Title"
              classLabel="text-xs font-bold tracking-widest text-[#899775] uppercase"
            >
              <Input
                placeholder="e.g. Molecular Biology - Unit 4"
                className="dark:bg-accent-foreground border-zinc-700 py-5 text-white"
              />
            </AppFormItem>
          </div>

          <div className="col-span-1">
            <AppFormItem
              control={control}
              name="category"
              classLabel="text-xs font-bold tracking-widest text-[#899775] uppercase"
              label="Category"
            >
              <AppSelect
                options={[
                  { label: 'Science', value: 'science' },
                  { label: 'Languages', value: 'languages' },
                  { label: 'History', value: 'history' },
                ]}
                placeholder="Science"
                triggerClassName="dark:bg-accent-foreground border-zinc-700 py-5 text-white"
                itemClassName="dark:hover:bg-primary-80 not-data-[variant=destructive]:focus:**:text-accent not-data-[variant=destructive]:aria-selected:**:text-primary"
              />
            </AppFormItem>
          </div>
        </div>

        <div>
          <AppFormItem
            control={control}
            name="description"
            label="Description"
            classLabel="text-xs font-bold tracking-widest text-[#899775] uppercase"
          >
            <Textarea
              placeholder="Briefly describe what this deck covers..."
              className="dark:bg-accent-foreground min-h-25 border-zinc-700 text-white"
            />
          </AppFormItem>
        </div>
      </div>

      {/* Flashcards Section */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Layers className="h-6 w-6 text-[#b1f041]" />
            Flashcards
          </h2>
          <span className="text-sm font-medium text-zinc-500">
            {fields.length} Cards Total
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {fields.map((field, index) => (
            <Flashcard
              key={field.id}
              index={index}
              control={control}
              remove={remove}
            />
          ))}

          {/* Add New Card Button */}
          <Button
            variant="outline"
            type="button"
            onClick={() => append({ front: '', back: '' })}
            className="group dark:border-border dark:bg-primary-800/20 dark:hover:border-primary dark:hover:bg-primary-800 dark:hover:text-primary flex h-80 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed"
          >
            <div className="bg-primary mb-4 rounded-full p-3 text-black transition-transform group-hover:scale-110">
              <Plus className="h-6 w-6 stroke-3" />
            </div>
            <span className="mb-1 text-lg font-bold">Add New Card</span>
            <span className="text-xs font-semibold tracking-widest uppercase">
              To the stack
            </span>
          </Button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pb-12">
        <Button type="button" variant="secondary">
          Discard Draft
        </Button>
        <Button type="submit">Create Deck</Button>
      </div>
    </form>
  );
};

export default CreateDeckForm;
