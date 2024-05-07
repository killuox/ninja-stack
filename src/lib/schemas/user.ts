import { z } from 'zod';
export const userSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	passwordHash: z.string()
});
export type UserSchema = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.omit({ id: true });
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = userSchema.omit({ id: true, passwordHash: true }).partial();
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const registerUserSchema = z.object({
	firstName: z
		.string()
		.min(2, 'First name must be at least 2 characters')
		.max(64, 'First name must be 64 characters or less'),
	lastName: z
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
