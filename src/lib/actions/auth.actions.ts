'use server';

import { AuthService } from '@/service';
import { loginSchema, registerSchema } from '../validations';
import { TLoginInput, TRegisterInput } from '@/types';
import { createSession, successResponse } from '../utils';
import { redirect } from 'next/navigation';

export async function registerAction(formData: TRegisterInput) {
  const { email, name, password } = formData || {};
  const parsed = registerSchema.safeParse({ email, name, password });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    throw new Error(
      `Validation failed: ${Object.keys(fieldErrors).join(', ')}`
    );
  }

  try {
    const user = await AuthService.register(parsed.data);
    const token = await createSession(user.id);
    return successResponse(token, 'Registered successfully!');
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to register. Please try again.';
    throw new Error(message);
  }
}

export async function loginAction(formData: TLoginInput) {
  const { email, password } = formData;
  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    throw new Error(
      `Validation failed: ${Object.keys(fieldErrors).join(', ')}`
    );
  }

  try {
    const user = await AuthService.login(parsed.data);
    const token = await createSession(user.id);
    return successResponse(token, 'Logged in successfully!');
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to login. Please try again.';
    throw new Error(message);
  }
}

export async function logoutAction() {
  await AuthService.logout();
  redirect('/login');
}
