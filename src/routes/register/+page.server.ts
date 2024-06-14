import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '@schemas/user';
import { zod } from "sveltekit-superforms/adapters";
import userService from '@models/user/user.service';
import sessionService from '@models/session/session.service';
import workspaceService from '@server/models/workspace/workspace.service';
import { generatePasswordHash } from '@server/helpers/auth';
import {t} from '$lib/locales';

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
			return setError(form, 'passwordConfirm', t.get('error_code.PASSWORDS_DO_NOT_MATCH'));
		}

		const passwordHash = await generatePasswordHash(form.data.password);

		// check if email is already used
		const existingUser = await userService.findByEmail(form.data.email);

		// For security reasons, we don't want to tell the user if the email is already in use
		if (existingUser) {
			return fail(400, {
				message: t.get('error_code.INVALID_EMAIL_OR_PASSWORD')
			});
		}

		const createdUserId = await userService.create({
			firstName: form.data.firstName,
			lastName: form.data.lastName,
			email: form.data.email,
			passwordHash,
			language: navigator.language.split('-')[0] === 'fr' ? 'fr' : 'en' // TODO: Make sure it works
		});

		await workspaceService.create({
			userId: createdUserId,
			name: `${form.data.firstName} ${form.data.lastName}'s Workspace`
		});

		await sessionService.create(event, createdUserId);

		redirect(302, '/app');
	}
};
