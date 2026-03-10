'use client';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IFormItemProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
}

const AppFormItem = <T extends FieldValues>({
  name,
  control,
  children,
  label,
  description,
}: IFormItemProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
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
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default AppFormItem;
