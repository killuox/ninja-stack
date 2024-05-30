import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const langs = ['en', 'fr'] as const;
const langEnum = pgEnum("text", langs);

export const userTable = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	passwordHash: text('password_hash').notNull(),
	language: langEnum('language').default('en').notNull(),
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
