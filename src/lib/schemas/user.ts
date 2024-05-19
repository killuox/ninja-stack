import { z } from 'zod';
export const userSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	passwordHash: z.string(),
	language: z.enum(['en', 'fr']).default('en'),
});
export type UserSchema = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.omit({ id: true });
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
	firstName: userSchema.shape.firstName,
	lastName: userSchema.shape.lastName,
	email: userSchema.shape.email,
	language: userSchema.shape.language
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const registerUserSchema = z.object({
	firstName: userSchema.shape.firstName,
	lastName: userSchema.shape.lastName,
	email: userSchema.shape.email,
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less'),
	passwordConfirm: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less'),
	language: userSchema.shape.language
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
	email: userSchema.shape.email,
	password: z.string()
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email address')
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;


export const changePasswordSchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string().min(6, 'Password must be at least 6 characters'),
	newPasswordConfirm: z.string().min(6, 'Password must be at least 6 characters')
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;