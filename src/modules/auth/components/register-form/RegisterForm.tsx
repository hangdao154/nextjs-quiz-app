'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppFormItem, Input } from '@/components';
import { isEmpty, registerAction, registerSchema } from '@/lib';
import { FC } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm: FC = () => {
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await registerAction(data);
      toast.success(result.message);
      router.push('/login');
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
    }
  });

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {!isEmpty(errors) ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-200">
          Please fix the errors below.
        </p>
      ) : null}

      <div className="space-y-1">
        <AppFormItem name="name" control={control} label="Name">
          <Input />
        </AppFormItem>
      </div>

      <div className="space-y-1">
        <AppFormItem name="email" control={control} label="Email">
          <Input type="email" />
        </AppFormItem>
      </div>

      <div className="space-y-1">
        <AppFormItem name="password" control={control} label="Password">
          <Input type="password" />
        </AppFormItem>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
