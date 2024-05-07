import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import type { PageServerLoad, Actions } from './$types';
import user from '@models/user/user.service';
import session from '@models/session/session.service';
import { loginUserSchema } from '@lib/schemas/user';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (session) redirect(302, '/app');

	return {
		session: event.locals.session,
		form: await superValidate(zod(loginUserSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const existingUser = await user.findByEmail(form.data.email);

		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const validPassword = await verify(existingUser.passwordHash, form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
	
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		await session.create(event, existingUser.id);

		redirect(302, '/app');
	}
};
