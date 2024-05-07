import { eq } from 'drizzle-orm';
import db from '$lib/server/db/db';
import { workspaceTable } from './workspace.table';
import { type WorkspaceSchema } from '@lib/schemas/workspace';

const findOne = async (id: string) => {
	return await db.query.workspaceTable.findFirst({
		where: eq(workspaceTable.id, id)
	});
};

const findMany = async () => {
	return await db.query.workspaceTable.findMany();
};

const create = async (data: WorkspaceSchema) => {
	return await db.insert(workspaceTable).values({
		...data
	});
};

const update = async (id: string, data: WorkspaceSchema) => {
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
}

export default {
	findOne,
	findMany,
	create,
	update,
	remove,
	findByUser
};
