import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	return {
		session: event.locals.session,
		user: event.locals.user
	};
};
