import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { loginUserSchema } from '@schemas/user';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

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
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, valibot(loginUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			return fail(400, {
				message: error.message
			});
		}

		return redirect(302, '/app');
	}
};
