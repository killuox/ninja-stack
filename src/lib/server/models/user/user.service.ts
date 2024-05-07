import { eq } from 'drizzle-orm';
import db from '$lib/server/db/db';
import { userTable } from './user.table';
import { type UserSchema , type UpdateUserSchema} from '@lib/schemas/user';

const findOne = async (id: string) => {
	return await db.query.userTable.findFirst({
		where: eq(userTable.id, id)
	});
};

const findMany = async () => {
	return await db.query.userTable.findMany();
};

const create = async (data: UserSchema) => {
	return await db.insert(userTable).values(data);
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
