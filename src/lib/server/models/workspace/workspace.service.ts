import { eq } from 'drizzle-orm';
import db from '$lib/server/db/db';
import { workspaceTable } from './workspace.table';
import { type CreateWorkspaceSchema } from '@lib/schemas/workspace';
import { generateDatabaseId } from '@lib/server/helpers/db';

const findOne = async (id: string) => {
	return await db.query.workspaceTable.findFirst({
		where: eq(workspaceTable.id, id)
	});
};

const findMany = async () => {
	return await db.query.workspaceTable.findMany();
};

const create = async (data: CreateWorkspaceSchema) => {
	const workspaceId = generateDatabaseId();
	await db.insert(workspaceTable).values({
		id: workspaceId,
		...data
	});
	return workspaceId;
};

const update = async (id: string, data: CreateWorkspaceSchema) => {
	return await db
		.update(workspaceTable)
		.set({
			...data,
			updatedAt: new Date()
		})
		.where(eq(workspaceTable.id, id));
};

const remove = async (id: string) => {
	return await db.delete(workspaceTable).where(eq(workspaceTable.id, id));
};

const findByUser = async (userId: string) => {
	return await db.query.workspaceTable.findMany({
		where: eq(workspaceTable.userId, userId)
	});
};

export default {
	findOne,
	findMany,
	create,
	update,
	remove,
	findByUser
};
