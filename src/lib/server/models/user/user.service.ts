import { eq } from 'drizzle-orm';
import db from '@server/db/db';
import { userTable } from './user.table';
import { type CreateUserSchema, type UpdateUserSchema } from '@schemas/user';
import { generateDatabaseId } from '@server/helpers/db';
import { error } from '@sveltejs/kit';

const findOne = async (id: string) => {
	const result = await db.query.userTable.findFirst({
		where: eq(userTable.id, id)
	});

	if (!result) {
		error(404, {
			message: 'User not found'
		});
	}

	return result;
};

const findMany = async () => {
	return await db.query.userTable.findMany();
};

const create = async (data: CreateUserSchema) => {
	const userId = generateDatabaseId();
	await db.insert(userTable).values({
		id: userId,
		...data,
	});
	
	return userId;
};

const update = async (id: string, data: UpdateUserSchema) => {
	return await db
		.update(userTable)
		.set({
			...data,
			updatedAt: new Date()
		})
		.where(eq(userTable.id, id));
};

const remove = async (id: string) => {
	return await db.delete(userTable).where(eq(userTable.id, id));
};

const findByEmail = async (email: string) => {
	return await db.query.userTable.findFirst({
		where: eq(userTable.email, email)
	});
};

export default {
	findOne,
	findMany,
	create,
	update,
	remove,
	findByEmail
};
