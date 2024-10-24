import * as v from 'valibot';

export const workspaceSchema = v.object({
	id: v.string(),
	name: v.string(),
	user_id: v.string()
});

export type WorkspaceSchema = v.InferOutput<typeof workspaceSchema>;

export const createWorkspaceSchema = v.omit(workspaceSchema, ['id']);
export type CreateWorkspaceSchema = v.InferOutput<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = v.partial(v.omit(workspaceSchema, ['id']));
export type UpdateWorkspaceSchema = v.InferOutput<typeof updateWorkspaceSchema>;
