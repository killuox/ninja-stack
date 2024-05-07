import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '../user/user.table';

export const workspaceTable = pgTable('workspace', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.notNull()
});
