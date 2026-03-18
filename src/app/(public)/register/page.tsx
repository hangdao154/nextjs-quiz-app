import { RegisterForm } from '@/modules/auth';
import Link from 'next/link';
import { FC } from 'react';

const RegisterPage: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Create Account</h1>
      <p className="mt-1.5 text-sm text-[#7a8a68]">
        Join thousands of students learning today.
      </p>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-[#7a8a68]">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-[#c8e020] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
