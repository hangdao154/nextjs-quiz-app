'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppFormItem, Input } from '@/components';
import { isEmpty, registerAction, registerSchema } from '@/lib';
import { FC } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NameInput: FC<React.ComponentProps<'input'>> = ({
  className,
  ...props
}) => (
  <div className="relative">
    <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5a6a4a]" />
    <Input
      className={cn(
        'border-[#3a4830] bg-[#181f10] pl-9 text-[#c8d4b0] placeholder:text-[#4a5a3a]',
        className
      )}
      {...props}
    />
  </div>
);

const EmailInput: FC<React.ComponentProps<'input'>> = ({
  className,
  ...props
}) => (
  <div className="relative">
    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5a6a4a]" />
    <Input
      type="email"
      className={cn(
        'border-[#3a4830] bg-[#181f10] pl-9 text-[#c8d4b0] placeholder:text-[#4a5a3a]',
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
    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#5a6a4a]" />
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
        <p className="rounded-lg bg-red-900/20 px-3 py-2 text-xs text-red-300">
          Please fix the errors below.
        </p>
      ) : null}

      <AppFormItem name="name" control={control} label="Full Name">
        <NameInput placeholder="John Doe" />
      </AppFormItem>

      <AppFormItem name="email" control={control} label="Email Address">
        <EmailInput placeholder="name@example.com" />
      </AppFormItem>

      <AppFormItem name="password" control={control} label="Password">
        <PasswordInput placeholder="••••••••" />
      </AppFormItem>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8e020] px-6 py-2.5 text-sm font-semibold text-[#1a2010] transition-colors hover:bg-[#b8d010]"
      >
        Create Account <ArrowRight className="size-4" />
      </button>
    </form>
  );
};

export default RegisterForm;
