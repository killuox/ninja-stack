import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { registerUserSchema, changePasswordSchema, updateUserSchema } from '@schemas/user';
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
		updateUserForm: await superValidate(
			{
				firstName: userToUpdate.firstName,
				lastName: userToUpdate.lastName,
				email: userToUpdate.email,
				language: userToUpdate.language
			},
			zod(updateUserSchema),
			{
				id: 'updateUserForm'
			}
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

		const updateUserForm = await superValidate(event, zod(updateUserSchema), {
			id: 'updateUserForm'
		});

		if (!updateUserForm.valid) {
			fail(400, updateUserForm);
		}

		const updateResult = await userService.update(session.userId, updateUserForm.data);
		console.log('updateResult', updateResult);
		if(!updateResult) {
			setError(updateUserForm, '', 'Error updating user information');
		}

		return {updateUserForm};
	},
	changePassword: async (event) => {
		const session = event.locals.session;
		if (!session) {
			return error(401, {
				message: 'You are not logged in'
			});
		}
	}
};
