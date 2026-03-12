'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { ENV, STORAGE_KEYS } from '@/constants';

const SESSION_EXPIRES_STRING = '7d';
const SESSION_EXPIRES_TIME = 60 * 60 * 24 * 7; // 7 days

export const encrypt = async (user: object) => {
  return jwt.sign(user, ENV.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: SESSION_EXPIRES_STRING,
  });
};

export const decrypt = async (token: string) => {
  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET!, {
      algorithms: ['HS256'],
    }) as { userId: string; session: Date };
    return payload;
  } catch {
    return null;
  }
};

export const createSession = async (userId: string) => {
  const token = await encrypt({
    userId,
    session: new Date(Date.now() + SESSION_EXPIRES_TIME),
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

  const user = await decrypt(token);
  if (!user) return null;

  return user.userId;
};
