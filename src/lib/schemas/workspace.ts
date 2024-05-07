import { z } from 'zod';

export const workspaceSchema = z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
});

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;

export const createWorkspaceSchema = workspaceSchema.omit({ id: true });
export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = workspaceSchema.omit({ id: true }).partial();
export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;