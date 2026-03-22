'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty, loginAction, loginSchema } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppFormItem, Button, Input } from '@/components';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const EmailInput: FC<React.ComponentProps<'input'>> = ({
  className,
  ...props
}) => (
  <div className="relative">
    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#c8d4b0]" />
    <Input
      className={cn(
        'border-[#3a4830] pl-9 text-[#c8d4b0] placeholder:text-[#4a5a3a]',
        className
      )}
      {...props}
    />
  </div>
);

const PasswordInput: FC<React.ComponentProps<'input'>> = ({
  className,
  ...props
}) => (
  <div className="relative">
    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#c8d4b0]" />
    <Input
      type="password"
      className={cn(
        'border-[#3a4830] bg-[#181f10] pl-9 text-[#c8d4b0] placeholder:text-[#4a5a3a]',
        className
      )}
      {...props}
    />
  </div>
);

const LoginForm: FC = () => {
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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
      const result = await loginAction(data);
      toast.success(result.message);
      router.push('/');
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
    }
  });

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {!isEmpty(errors) ? (
        <p className="rounded-lg bg-red-900/20 px-3 py-2 text-xs text-red-300">
          Please fix the errors below.
        </p>
      ) : null}

      <AppFormItem name="email" control={control} label="Email Address">
        <EmailInput placeholder="name@example.com" />
      </AppFormItem>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-[#c8d4b0]">Password</span>
          <Link
            href="/forgot-password"
            className="text-primary text-xs hover:underline"
          >
            Forgot?
          </Link>
        </div>
        <AppFormItem name="password" control={control}>
          <PasswordInput placeholder="••••••••" />
        </AppFormItem>
      </div>

      <Button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
      >
        Login to Account <ArrowRight className="size-4" />
      </Button>
    </form>
  );
};

export default LoginForm;
