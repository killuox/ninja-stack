import type { SupabaseClient } from '@supabase/supabase-js';
import { type CreateWorkspaceSchema } from '@lib/schemas/workspace';

const findOne = async (supabase: SupabaseClient, id: string) => {
	const { data, error } = await supabase.from('workspaces').select('*').eq('id', id).single();
	if (error) throw error;
	return data;
};

const findMany = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.from('workspaces').select('*');
	if (error) throw error;
	return data;
};

const create = async (supabase: SupabaseClient, data: CreateWorkspaceSchema) => {
	const { error, data: newWorkspace } = await supabase
		.from('workspaces')
		.insert(data)
		.select()
		.single();
	if (error) throw error;
	return newWorkspace.id;
};

const update = async (supabase: SupabaseClient, id: string, data: CreateWorkspaceSchema) => {
	const { error } = await supabase
		.from('workspaces')
		.update({ ...data, updated_at: new Date() })
		.eq('id', id);
	if (error) throw error;
};

const remove = async (supabase: SupabaseClient, id: string) => {
	const { error } = await supabase.from('workspaces').delete().eq('id', id);
	if (error) throw error;
};

const findByUser = async (supabase: SupabaseClient, userId: string) => {
	const { data, error } = await supabase.from('workspaces').select('*').eq('user_id', userId);
	if (error) throw error;
	return data;
};

export default {
	findOne,
	findMany,
	create,
	update,
	remove,
	findByUser
};
