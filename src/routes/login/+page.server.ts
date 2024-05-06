import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import type { PageServerLoad, Actions } from './$types';
import { userTable } from '@lib/server/db/tables';
import db from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { loginUserSchema } from '@lib/schemas/user';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (session) redirect(302, '/app');

	return {
		session: event.locals.session,
		form: await superValidate(zod(loginUserSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			typeof email !== 'string' ||
			!/^[a-z0-9_-]{4,31}$/.test(email)
		) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, email.toLowerCase())
		});

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid emails from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid emails.
			// However, valid emails can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If emails are public, you may outright tell the user that the email is invalid.
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const validPassword = await verify(existingUser.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
