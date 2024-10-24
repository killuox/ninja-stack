import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { changePasswordSchema, updateUserSchema } from '@schemas/user';
import { valibot } from 'sveltekit-superforms/adapters';
import userService from '@lib/server/models/user/user.service';
import { t } from '$lib/locales';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	if (!session) {
		error(401, {
			message: t.get('error_code.UNAUTHORIZED')
		});
	}

	const userToUpdate = await userService.findOne(supabase, session.user.id);

	if (!userToUpdate) {
		error(404, {
			message: t.get('error_code.USER_NOT_FOUND')
		});
	}

	const updateUserForm = await superValidate(
		{
			first_name: userToUpdate.first_name,
			last_name: userToUpdate.last_name,
			email: userToUpdate.email,
			language: userToUpdate.language
		},
		valibot(updateUserSchema)
	);

	return {
		session: session,
		updateUserForm,
		changePasswordForm: await superValidate(valibot(changePasswordSchema))
	};
};
export const actions: Actions = {
	updateUser: async (event) => {
		const {
			locals: { supabase, safeGetSession }
		} = event;
		const { session } = await safeGetSession();
		if (!session) {
			error(401, {
				message: t.get('error_code.UNAUTHORIZED')
			});
		}

		const updateUserForm = await superValidate(event, valibot(updateUserSchema));

		if (!updateUserForm.valid) {
			fail(400, { updateUserForm });
		}

		const updateResult = await userService.update(supabase, session.user.id, updateUserForm.data);

		if (!updateResult) {
			setError(updateUserForm, '', t.get('error_code.UPDATE_FAILED'));
		}
		return message(updateUserForm, t.get('error_code.UPDATE_SUCCESS'));
	},
	changePassword: async (event) => {
		const {
			locals: { supabase, safeGetSession }
		} = event;
		const { session } = await safeGetSession();
		if (!session) {
			error(401, {
				message: t.get('error_code.UNAUTHORIZED')
			});
		}
		const changePasswordForm = await superValidate(event, valibot(changePasswordSchema));

		if (!changePasswordForm.valid) {
			fail(400, { changePasswordForm });
		}

		const updateResult = await userService.update(supabase, session.user.id, {
			password: changePasswordForm.data.new_password
		});

		if (!updateResult) {
			setError(changePasswordForm, '', t.get('error_code.UPDATE_FAILED'));
		}

		return message(changePasswordForm, t.get('error_code.UPDATE_SUCCESS'));
	}
};
