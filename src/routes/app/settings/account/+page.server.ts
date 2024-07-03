import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { changePasswordSchema, updateUserSchema } from '@schemas/user';
import { valibot } from 'sveltekit-superforms/adapters';
import userService from '@lib/server/models/user/user.service';
import { verifyPassword, generatePasswordHash } from '@lib/server/helpers/auth';
import { t } from '$lib/locales';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) {
		error(401, {
			message: t.get('error_code.UNAUTHORIZED')
		});
	}

	const userToUpdate = await userService.findOne(event.locals.session.userId);

	if (!userToUpdate) {
		error(404, {
			message: t.get('error_code.USER_NOT_FOUND')
		});
	}

	const updateUserForm = await superValidate(
		{
			firstName: userToUpdate.firstName,
			lastName: userToUpdate.lastName,
			email: userToUpdate.email,
			language: userToUpdate.language
		},
		valibot(updateUserSchema)
	);

	return {
		session: event.locals.session,
		updateUserForm,
		changePasswordForm: await superValidate(valibot(changePasswordSchema))
	};
};
export const actions: Actions = {
	updateUser: async (event) => {
		const session = event.locals.session;
		if (!session) {
			error(401, {
				message: t.get('error_code.UNAUTHORIZED')
			});
		}

		const updateUserForm = await superValidate(event, valibot(updateUserSchema));

		if (!updateUserForm.valid) {
			fail(400, { updateUserForm });
		}

		const updateResult = await userService.update(session.userId, updateUserForm.data);

		if (!updateResult) {
			setError(updateUserForm, '', t.get('error_code.UPDATE_FAILED'));
		}
		return message(updateUserForm, t.get('error_code.UPDATE_SUCCESS'));
	},
	changePassword: async (event) => {
		const session = event.locals.session;
		if (!session) {
			error(401, {
				message: t.get('error_code.UNAUTHORIZED')
			});
		}
		const changePasswordForm = await superValidate(event, valibot(changePasswordSchema));

		if (!changePasswordForm.valid) {
			fail(400, { changePasswordForm });
		}

		// Validate current password
		const user = await userService.findOne(session.userId);

		const validPassword = await verifyPassword(
			user.passwordHash,
			changePasswordForm.data.currentPassword
		);

		if (!validPassword) {
			setError(changePasswordForm, 'currentPassword', t.get('error_code.INVALID_PASSWORD'));
		}

		// Generate new password hash
		const newPasswordHash = await generatePasswordHash(changePasswordForm.data.newPassword);

		const updateResult = await userService.update(session.userId, {
			passwordHash: newPasswordHash
		});

		if (!updateResult) {
			setError(changePasswordForm, '', t.get('error_code.UPDATE_FAILED'));
		}

		return message(changePasswordForm, t.get('error_code.UPDATE_SUCCESS'));
	}
};
