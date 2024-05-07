import { hash } from '@node-rs/argon2'
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '@schemas/user';
import { zod } from "sveltekit-superforms/adapters";
import userService from '@models/user/user.service';
import sessionService from '@models/session/session.service';
import workspaceService from '@lib/server/models/workspace/workspace.service';

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

		const passwordHash = await hash(form.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// check if email is already used
		const existingUser = await userService.findByEmail(form.data.email);

		if (existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const createdUserId = await userService.create({
			firstName: form.data.firstName,
			lastName: form.data.lastName,
			email: form.data.email,
			passwordHash
		});

		await workspaceService.create({
			userId: createdUserId,
			name: `${form.data.firstName} ${form.data.lastName}'s Workspace`
		});

		await sessionService.create(event, createdUserId);

		redirect(302, '/app');
	}
};
