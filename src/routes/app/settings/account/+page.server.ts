import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { changePasswordSchema, updateUserSchema } from '@schemas/user';
import { zod } from 'sveltekit-superforms/adapters';
import userService from '@lib/server/models/user/user.service';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		error(401, {
			message: 'You are not logged in'
		});
	}

	const userToUpdate = await userService.findOne(event.locals.session.userId);

	return {
		session: event.locals.session,
		form: await superValidate(
			{
				firstName: userToUpdate.firstName,
				lastName: userToUpdate.lastName,
				email: userToUpdate.email,
				language: userToUpdate.language
			},
			zod(updateUserSchema)
		),
		changePasswordForm: await superValidate(zod(changePasswordSchema))
	};
};
export const actions: Actions = {
	updateUser: async (event) => {
		const session = event.locals.session;
		if (!session) {
			error(401, {
				message: 'You are not logged in'
			});
		}

		const form = await superValidate(event, zod(updateUserSchema), {
			id: 'updateUserForm'
		});

		if (!form.valid) {
			fail(400, {
				form: form
			});
		}

		const updateResult = await userService.update(
			session.userId,
			form.data
		);

		if (!updateResult) {
			setError(form, '', 'Error updating user information');
		}

		return message(form, 'User information updated');
	},
	changePassword: async (event) => {
		const session = event.locals.session;
		if (!session) {
			error(401, {
				message: 'You are not logged in'
			});
		}
	}
};
