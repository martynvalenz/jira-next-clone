import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }).email({
    message: 'Invalid email address',
  }),
  password: z.string({
    required_error: 'Password is required',
  }).min(8,{
    message: 'Password must be at least 8 characters long',
  }).max(16,{
    message: 'Password must be at most 16 characters long',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = loginSchema.extend({
  name: z.string({
    required_error: 'Name is required',
  }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;