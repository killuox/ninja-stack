import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import userService from '@models/user/user.service';
import sessionService from '@models/session/session.service';
import { loginUserSchema } from '@schemas/user';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { verifyPassword } from '@server/helpers/auth';
import { t } from '$lib/locales';
export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (session) redirect(302, '/app');

	return {
		session: event.locals.session,
		form: await superValidate(valibot(loginUserSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, valibot(loginUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const existingUser = await userService.findByEmail(form.data.email);

		if (!existingUser) {
			return fail(400, {
				message: t.get('error_code.INVALID_EMAIL_OR_PASSWORD')
			});
		}

		const validPassword = await verifyPassword(existingUser.passwordHash, form.data.password);

		if (!validPassword) {
			return fail(400, {
				message: t.get('error_code.INVALID_EMAIL_OR_PASSWORD')
			});
		}

		await sessionService.create(event, existingUser.id);

		return redirect(302, '/app');
	}
};
