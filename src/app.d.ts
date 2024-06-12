import type { SanitizedUser } from '@lib/schemas/user';

// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			user: SanitizedUser | null;
			session: import('lucia').Session | null;
		}
	}
}

export {};
