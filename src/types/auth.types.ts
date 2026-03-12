import z from 'zod';
import { loginSchema, registerSchema } from '@/lib';

export type TRegisterInput = z.infer<typeof registerSchema>;
export type TLoginInput = z.infer<typeof loginSchema>;
