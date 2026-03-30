import { FC, useState } from 'react';
import { Control, useFormState } from 'react-hook-form';
import { Copy, Trash2 } from 'lucide-react';
import { TDeckFormValues } from '@/types';
import { cn } from '@/lib';
import { AppAutofitTextarea, AppFormItem, FieldError } from '@/components';

export interface IFlashcardProps {
  index: number;
  control: Control<TDeckFormValues>;
  remove: (index: number) => void;
}

const Flashcard: FC<IFlashcardProps> = ({ index, control, remove }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { errors } = useFormState({ control });
  const frontFieldError = errors.cards?.[index]?.front;
  const backFieldError = errors.cards?.[index]?.back;

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const padIndex = (num: number) => String(num + 1).padStart(2, '0');

  return (
    <div className="w-full">
      <div className="group h-80 w-full perspective-[1000px]">
        <div
          className={`relative h-full w-full transition-transform duration-500 transform-3d ${
            isFlipped ? 'transform-[rotateX(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={cn(
              'border-primary-20 bg-primary-800 absolute inset-0 flex flex-col justify-between rounded-xl border p-6 shadow-[0px_9px_16px_-3px_rgba(0,0,0,0.3)] backface-hidden',
              frontFieldError &&
                'dark:border-destructive/50 border-destructive border-2'
            )}
          >
            <div className="mb-2 flex items-start justify-between">
              <span className="bg-primary rounded px-2 py-1 text-xs font-black tracking-widest text-black uppercase">
                Front #{padIndex(index)}
              </span>
              <div className="flex items-center gap-3 text-zinc-500">
                <button
                  type="button"
                  className="transition-colors hover:text-white"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <AppFormItem
                control={control}
                name={`cards.${index}.front`}
                classWrapper="h-full justify-center"
                showError={false}
              >
                <AppAutofitTextarea
                  maxLength={600}
                  maxFontSize={32}
                  minFontSize={12}
                  className="max-h-50 w-full bg-transparent text-center text-2xl font-bold text-[#b1f041] transition-colors placeholder:text-zinc-600 focus:text-white"
                  placeholder="Question or term..."
                />
              </AppFormItem>
            </div>

            <div className="flex justify-center border-t border-[#2a3322]/50 pt-4">
              <button
                type="button"
                onClick={handleFlip}
                className="hover:text-primary text-primary-40 cursor-pointer text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Flip to edit back
              </button>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div
            className={cn(
              'bg-primary-800 border-primary-60 absolute inset-0 flex transform-[rotateX(180deg)] flex-col justify-between rounded-xl border p-6 shadow-[0px_9px_16px_-3px_rgba(0,0,0,0.3)] backface-hidden',
              backFieldError &&
                'dark:border-destructive/50 border-destructive border-2'
            )}
          >
            <div className="flex items-start justify-between">
              <span className="border-primary text-primary rounded border px-2 py-1 text-xs font-black tracking-widest uppercase">
                Back #{padIndex(index)}
              </span>
              <div className="flex items-center gap-3 text-zinc-500">
                <button
                  type="button"
                  className="transition-colors hover:text-white"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <AppFormItem
                control={control}
                name={`cards.${index}.back`}
                showError={false}
              >
                <AppAutofitTextarea
                  maxLength={600}
                  maxFontSize={32}
                  minFontSize={10}
                  className="max-h-50 w-full bg-transparent text-center text-2xl font-bold text-[#6f7e95] placeholder:text-zinc-600"
                  placeholder="Answer or definition..."
                />
              </AppFormItem>
            </div>

            <div className="flex justify-center border-t border-[#2a3322]/50 pt-4">
              <button
                type="button"
                onClick={handleFlip}
                className="hover:text-primary text-primary-40 cursor-pointer text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Flip to edit front
              </button>
            </div>
          </div>
        </div>
      </div>

      {(frontFieldError || backFieldError) && (
        <div className="mt-2 space-y-1">
          {frontFieldError && <FieldError errors={[frontFieldError]} />}
          {backFieldError && <FieldError errors={[backFieldError]} />}
        </div>
      )}
    </div>
  );
};

export default Flashcard;
