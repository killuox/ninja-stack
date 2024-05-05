import { z } from 'zod';

export const registerUserSchema = z.object({
	first_name: z
		.string()
		.min(2, 'First name must be at least 2 characters')
		.max(64, 'First name must be 64 characters or less'),
	last_name: z
		.string()
		.min(2, 'Last name must be at least 2 characters')
		.max(64, 'Last name must be 64 characters or less'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less'),
	passwordConfirm: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less')
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address')
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

