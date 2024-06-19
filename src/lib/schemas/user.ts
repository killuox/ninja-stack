import * as v from 'valibot';

enum languages {
	en = 'en',
	fr = 'fr'
}

export const userSchema = v.object({
	id: v.string(),
	firstName: v.string(),
	lastName: v.string(),
	email: v.pipe(v.string(), v.email()),
	passwordHash: v.string(),
	language: v.enum(languages, 'en')
});
export type UserSchema = v.InferOutput<typeof userSchema>;
export type SanitizedUser = Omit<UserSchema, 'passwordHash'>;

export const createUserSchema = v.omit(userSchema, ['id']);
export type CreateUserSchema = v.InferOutput<typeof createUserSchema>;

export const updateUserSchema = v.object({
	firstName: userSchema.entries.firstName,
	lastName: userSchema.entries.lastName,
	email: userSchema.entries.email,
	language: userSchema.entries.language,
	passwordHash: v.optional(v.pipe(v.string(), v.minLength(6), v.maxLength(64)))
});

export type UpdateUserSchema = v.InferOutput<typeof updateUserSchema>;

export const registerUserSchema = v.object({
	firstName: userSchema.entries.firstName,
	lastName: userSchema.entries.lastName,
	email: userSchema.entries.email,
	password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
	passwordConfirm: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
	language: userSchema.entries.language
});

export type RegisterUserSchema = v.InferOutput<typeof registerUserSchema>;

export const loginUserSchema = v.object({
	email: userSchema.entries.email,
	password: v.string()
});

export type LoginUserSchema = v.InferOutput<typeof loginUserSchema>;

export const forgotPasswordSchema = v.object({
	email: v.pipe(v.string(), v.email())
});

export type ForgotPasswordSchema = v.InferOutput<typeof forgotPasswordSchema>;

export const changePasswordSchema = v.pipe(
	v.object({
		currentPassword: v.string(),
		newPassword: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
		newPasswordConfirm: v.pipe(v.string(), v.minLength(6), v.maxLength(64))
	}),
	v.forward(
		v.partialCheck(
			[['newPassword'], ['newPasswordConfirm']],
			(input) => input.newPassword === input.newPasswordConfirm,
			'password_mismatch'
		),
		['newPasswordConfirm']
	)
);

export type ChangePasswordSchema = v.InferOutput<typeof changePasswordSchema>;
