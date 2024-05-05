import { pgTable, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	first_name: text('first_name').notNull(),
	last_name: text('last_name').notNull(),
    email: text('email').notNull(),
    password_hash: text('password_hash').notNull()
});