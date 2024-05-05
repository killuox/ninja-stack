import { lucia } from '$lib/server/auth';
import { type RequestEvent } from '@sveltejs/kit';

const create = async (event: RequestEvent, userId: string) => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export default {
	create
};
