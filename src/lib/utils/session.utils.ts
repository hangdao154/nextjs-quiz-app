'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ENV, STORAGE_KEYS } from '@/constants';

const SESSION_EXPIRES_STRING = '7d';
const SESSION_EXPIRES_TIME = 60 * 60 * 24 * 7; // 7 days

export const createSession = async (userId: string) => {
  const token = jwt.sign({ sub: userId }, ENV.JWT_SECRET!, {
    expiresIn: SESSION_EXPIRES_STRING,
  });
  const cookieStore = await cookies();

  cookieStore.set(STORAGE_KEYS.AUTH_TOKEN, token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRES_TIME,
  });

  return token;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(STORAGE_KEYS.AUTH_TOKEN);
};

export const getSessionPayload = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(STORAGE_KEYS.AUTH_TOKEN)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, ENV.JWT_SECRET!) as { sub: string };
  } catch {
    return null;
  }
};
