import { FC, useState } from 'react';
import { Control } from 'react-hook-form';
import { Copy, Trash2 } from 'lucide-react';
import { TDeckFormValues } from '@/types';
import { AppAutofitTextarea, AppFormItem } from '@/components';

export interface IFlashcardProps {
  index: number;
  control: Control<TDeckFormValues>;
  remove: (index: number) => void;
}

const Flashcard: FC<IFlashcardProps> = ({ index, control, remove }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const padIndex = (num: number) => String(num + 1).padStart(2, '0');

  return (
    <div className="group h-80 w-full perspective-[1000px]">
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-3d ${
          isFlipped ? 'transform-[rotateX(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-[#b1f041]/30 bg-[#21281c] p-6 shadow-[0px_9px_16px_-3px_rgba(0,0,0,0.3)] backface-hidden">
          <div className="mb-2 flex items-start justify-between">
            <span className="rounded bg-[#b1f041] px-2 py-1 text-xs font-black tracking-widest text-black uppercase">
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
              className="text-xs font-bold tracking-widest text-[#899775] uppercase transition-colors hover:text-[#b1f041]"
            >
              Flip to edit back
            </button>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 flex transform-[rotateX(180deg)] flex-col justify-between rounded-xl border border-[#b1f041]/30 bg-[#21281c] p-6 shadow-[0px_9px_16px_-3px_rgba(0,0,0,0.3)] backface-hidden">
          <div className="flex items-start justify-between">
            <span className="rounded border border-[#b1f041]/30 bg-[#1a1f16] px-2 py-1 text-xs font-black tracking-widest text-[#b1f041] uppercase">
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
            <AppFormItem control={control} name={`cards.${index}.back`}>
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
              className="text-xs font-bold tracking-widest text-[#899775] uppercase transition-colors hover:text-[#b1f041]"
            >
              Flip to edit front
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
