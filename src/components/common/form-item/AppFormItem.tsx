'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components';
import { cn } from '@/lib';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IFormItemProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  classWrapper?: string;
  classLabel?: string;
  showError?: boolean;
}

const AppFormItem = <T extends FieldValues>({
  name,
  control,
  children,
  label,
  description,
  classWrapper,
  classLabel,
  showError = true,
}: IFormItemProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={classWrapper}>
          {label && (
            <FieldLabel
              htmlFor={field.name}
              className={cn(
                'font-bold tracking-widest text-[#899775] uppercase',
                classLabel
              )}
            >
              {label}
            </FieldLabel>
          )}
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              // Element is HTML
              if (typeof child?.type === 'string') return child;

              // Element is React Element
              return cloneElement(child, {
                ...field,
                ...(child.props ?? {}),
                'aria-invalid': fieldState.invalid,
              } as React.ComponentProps<typeof child.type>);
            }
            return null;
          })}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && showError && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default AppFormItem;
