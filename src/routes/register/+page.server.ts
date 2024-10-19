import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '@schemas/user';
import { valibot } from 'sveltekit-superforms/adapters';
import userService from '@models/user/user.service';
import workspaceService from '@server/models/workspace/workspace.service';
import { t } from '$lib/locales';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session !== null) {
		redirect(302, '/app');
	}

	return {
		session,
		form: await superValidate(valibot(registerUserSchema))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, valibot(registerUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', t.get('error_code.PASSWORDS_DO_NOT_MATCH'));
		}

		// check if email is already used
		const existingUser = await userService.findByEmail(supabase, form.data.email);

		// For security reasons, we don't want to tell the user if the email is already in use
		if (existingUser) {
			return fail(400, {
				message: t.get('error_code.INVALID_EMAIL_OR_PASSWORD')
			});
		}

		const { data, error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					language: event.cookies.get('lang') === 'fr' ? 'fr' : 'en'
				}
			}
		});
		console.log(error)
		if (!data.user) {
			return fail(400, {
				form,
				message: t.get('error_code.USER_SIGNUP_FAILED')
			});
		}

		await workspaceService.create(supabase, {
			userId: data.user.id,
			name: `${form.data.firstName} ${form.data.lastName}'s Workspace`
		});

		if (error) {
			return fail(400, {
				form,
				message: error.message
			});
		}

		redirect(302, '/app');
	}
};
