import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '../user/user.table';

export const sessionTable = pgTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});