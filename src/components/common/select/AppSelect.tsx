import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { cn } from '@/lib';
import { FC } from 'react';

interface IAppSelectProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  'aria-invalid'?: boolean;
}

const AppSelect: FC<IAppSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  triggerClassName,
  contentClassName,
  itemClassName,
  'aria-invalid': ariaInvalid,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(triggerClassName)}
        aria-invalid={ariaInvalid}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(contentClassName)} position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(itemClassName)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
