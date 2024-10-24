import userService from '@lib/server/models/user/user.service';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const { session, user } = await event.locals.safeGetSession();
	if (!user) redirect(302, '/login');
	const userData = await userService.findOne(event.locals.supabase, user.id);
	return {
		session,
		user: userData
	};
};
