import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db, users } from '@/db';
import { TLoginInput, TRegisterInput } from '@/types';
import { getSessionPayload, loginSchema, registerSchema } from '@/lib';
import { STORAGE_KEYS } from '@/constants';

export type AuthUser = typeof users.$inferSelect;

export default class AuthService {
  static register = async (input: TRegisterInput) => {
    const data = registerSchema.parse(input);

    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, data.email));

    if (existing.length > 0) {
      throw new Error('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email: data.email,
        name: data.name,
        passwordHash,
      })
      .returning();

    return user;
  };

  static login = async (input: TLoginInput) => {
    const data = loginSchema.parse(input);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);

    if (!valid) {
      throw new Error('Invalid email or password');
    }

    return user;
  };

  static logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(STORAGE_KEYS.AUTH_TOKEN);
  };

  static getCurrentUser = async () => {
    const payload = await getSessionPayload();
    if (!payload) return null;

    const userId = payload.sub;
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return user ?? null;
  };
}
