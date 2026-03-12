import { LoginForm } from '@/modules/auth';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Login
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in with your email and password to start taking quizzes.
        </p>

        <LoginForm />

        <p className="mt-4 text-center text-xs text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <a
            href="/register"
            className="font-medium text-zinc-900 underline dark:text-zinc-50"
          >
            Register
          </a>
        </p>
      </section>
    </main>
  );
}
