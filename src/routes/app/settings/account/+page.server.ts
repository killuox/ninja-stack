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

	if (!userToUpdate) {
		error(404, {
			message: 'User not found'
		});
	}
	const updateUserForm = await superValidate(
		{
			firstName: userToUpdate.firstName,
			lastName: userToUpdate.lastName,
			email: userToUpdate.email,
			language: userToUpdate.language
		},
		zod(updateUserSchema)
	);

	return {
		session: event.locals.session,
		updateUserForm,
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

		const updateUserForm = await superValidate(event, zod(updateUserSchema));

		if (!updateUserForm.valid) {
			fail(400, { updateUserForm });
		}

		const updateResult = await userService.update(session.userId, updateUserForm.data);

		if (!updateResult) {
			setError(updateUserForm, '', 'Error updating user information');
		}

		return message(updateUserForm, 'User information updated');
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
