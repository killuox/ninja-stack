// routes/signup/+page.server.ts
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2'
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '@schemas/user';
import { zod } from "sveltekit-superforms/adapters";
import user from '@lib/server/models/user/user.service';
import session from '@lib/server/models/session/session.service';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	
	if (session !== null) {
		redirect(302, '/app');
	}

	return {
		session: event.locals.session,
		form: await superValidate(zod(registerUserSchema))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwords do not match');
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(form.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// check if email is already used
		const existingUser = await user.findByEmail(form.data.email);

		if (existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		await user.create({
			id: userId,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			email: form.data.email,
			password_hash: passwordHash
		});

		await session.create(event, userId);

		redirect(302, '/');
	}
};
