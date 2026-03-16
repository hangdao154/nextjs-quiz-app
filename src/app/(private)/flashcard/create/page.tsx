'use client';

import { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Layers } from 'lucide-react';
import { deckSchema } from '@/lib';
import { TDeckFormValues } from '@/types';
import { AppFormItem, Input, Textarea } from '@/components';
import { Flashcard } from '@/modules/flashcard';
import { toast } from 'sonner';

const CreateDeckForm: FC = () => {
  const { control, handleSubmit } = useForm<TDeckFormValues>({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cards',
  });

  const onSubmit = (data: TDeckFormValues) => {
    toast.success('Deck Created: ' + JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-h-screen max-w-5xl bg-[#11130e] p-8 text-white"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Create New Deck</h1>
        <p className="text-[#899775]">
          Organize your thoughts and start mastering new subjects.
        </p>
      </div>

      {/* Deck Metadata Form */}
      <div className="mb-12 space-y-6 rounded-xl border border-[#2a3322] bg-[#151911] p-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <AppFormItem
              control={control}
              name="title"
              label={
                <span className="text-xs font-bold tracking-widest text-[#899775] uppercase">
                  Deck Title
                </span>
              }
            >
              <Input
                placeholder="e.g. Molecular Biology - Unit 4"
                className="border-[#2a3322] bg-[#1a1f16] text-white placeholder:text-zinc-600 focus-visible:ring-[#b1f041]"
              />
            </AppFormItem>
          </div>

          <div className="col-span-1">
            {/* <AppFormItem
              control={control}
              name="category"
              label={
                <span className="text-xs font-bold tracking-widest text-[#899775] uppercase">
                  Category
                </span>
              }
            >
              <Select>
                <SelectTrigger className="border-[#2a3322] bg-[#1a1f16] text-white focus:ring-[#b1f041]">
                  <SelectValue placeholder="Science" />
                </SelectTrigger>
                <SelectContent className="border-[#2a3322] bg-[#1a1f16] text-white">
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </AppFormItem> */}
            <div>Category</div>
          </div>
        </div>

        <div>
          <AppFormItem
            control={control}
            name="description"
            label={
              <span className="text-xs font-bold tracking-widest text-[#899775] uppercase">
                Description
              </span>
            }
          >
            <Textarea
              placeholder="Briefly describe what this deck covers..."
              className="min-h-30 resize-y border-[#2a3322] bg-[#1a1f16] text-white placeholder:text-zinc-600 focus-visible:ring-[#b1f041]"
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
          <button
            type="button"
            onClick={() => append({ front: '', back: '' })}
            className="group flex h-80 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2a3322] text-[#899775] transition-all hover:border-[#b1f041]/50 hover:bg-[#151911] hover:text-[#b1f041]"
          >
            <div className="mb-4 rounded-full bg-[#b1f041] p-3 text-black transition-transform group-hover:scale-110">
              <Plus className="h-6 w-6 stroke-3" />
            </div>
            <span className="mb-1 text-lg font-bold">Add New Card</span>
            <span className="text-xs font-semibold tracking-widest uppercase">
              To the stack
            </span>
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pb-12">
        <button
          type="button"
          //   variant="outline"
          className="border-[#2a3322] bg-transparent px-8 text-white hover:bg-[#1a1f16] hover:text-white"
        >
          Discard Draft
        </button>
        <button
          type="submit"
          className="bg-[#b1f041] px-10 font-bold text-black hover:bg-[#a3e635]"
        >
          Create Deck
        </button>
      </div>
    </form>
  );
};

export default CreateDeckForm;
