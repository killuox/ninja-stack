import * as v from 'valibot';
const languages = ['en', 'fr'] as const;


export const userSchema = v.object({
	id: v.string(),
	first_name: v.pipe(v.string(), v.minLength(2), v.maxLength(64)),
	last_name: v.pipe(v.string(), v.minLength(2), v.maxLength(64)),
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
	language: v.picklist(languages)
});
export type UserSchema = v.InferOutput<typeof userSchema>;
export type SanitizedUser = Omit<UserSchema, 'passwordHash'>;

export const createUserSchema = v.omit(userSchema, ['id']);
export type CreateUserSchema = v.InferOutput<typeof createUserSchema>;

export const updateUserSchema = v.object({
	first_name: userSchema.entries.first_name,
	last_name: userSchema.entries.last_name,
	email: userSchema.entries.email,
	language: userSchema.entries.language,
	password: v.optional(v.pipe(v.string(), v.minLength(6), v.maxLength(64)))
});

export type UpdateUserSchema = v.InferOutput<typeof updateUserSchema>;

export const registerUserSchema = v.object({
	first_name: userSchema.entries.first_name,
	last_name: userSchema.entries.last_name,
	email: userSchema.entries.email,
	password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
	password_confirm: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
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
		current_password: v.string(),
		new_password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
		new_password_confirm: v.pipe(v.string(), v.minLength(6), v.maxLength(64))
	}),
	v.forward(
		v.partialCheck(
			[['new_password'], ['new_password_confirm']],
			(input) => input.new_password === input.new_password_confirm,
			'password_mismatch'
		),
		['new_password_confirm']
	)
);

export type ChangePasswordSchema = v.InferOutput<typeof changePasswordSchema>;
