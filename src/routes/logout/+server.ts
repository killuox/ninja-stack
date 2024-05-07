import type { RequestHandler } from './$types';
import { lucia } from '@server/auth';
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		return error(401, {
			message: 'You are not logged in'
		});
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	redirect(302, '/login');
};
