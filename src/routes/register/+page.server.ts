// routes/signup/+page.server.ts
import { lucia } from '$lib/server/auth';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2'
import db from '$lib/server/db/db';
import { userTable } from '@lib/server/db/tables';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '@schemas/user';
import { zod } from "sveltekit-superforms/adapters";
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	
	// if (session !== null) {
	// 	redirect(302, '/app');
	// }

	return {
		session: event.locals.session,
		form: await superValidate(zod(registerUserSchema))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwords do not match');
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(form.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// check if email is already used
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.email, form.data.email.toLowerCase())
		});

		if (existingUser) {
			return fail(400, {
				message: 'Incorrect email or password'
			});
		}

        await db.insert(userTable).values({
			id: userId,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			email: form.data.email,
			password_hash: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
