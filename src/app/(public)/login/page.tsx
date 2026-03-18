import { LoginForm } from '@/modules/auth';
import Link from 'next/link';
import { FC } from 'react';

const LoginPage: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
      <p className="mt-1.5 text-sm text-[#7a8a68]">
        Sign in to your account to continue.
      </p>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-[#7a8a68]">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          Register for free
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
