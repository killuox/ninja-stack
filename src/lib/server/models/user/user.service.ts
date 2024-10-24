import { error } from '@sveltejs/kit';
import type { CreateUserSchema, UpdateUserSchema } from '@schemas/user';
import type { SupabaseClient } from '@supabase/supabase-js';

const findOne = async (supabase: SupabaseClient, id: string) => {
	const { data, error: err } = await supabase.from('profiles').select('*').eq('id', id).single();

	if (err) {
		error(404, { message: 'User not found' });
	}

	return data;
};

const findMany = async (supabase: SupabaseClient) => {
	const { data } = await supabase.from('profiles').select('*');
	return data;
};

const create = async (supabase: SupabaseClient, data: CreateUserSchema) => {
	const { data: newUser, error: err } = await supabase.from('profiles').insert(data).select().single();

	if (err) {
		error(500, { message: 'Failed to create user' });
	}

	return newUser.id;
};

const update = async (supabase: SupabaseClient, id: string, data: Partial<UpdateUserSchema>) => {
	const { error: err, data: updatedUser } = await supabase
		.from('profiles')
		.update({ ...data, updated_at: new Date() })
		.eq('id', id);

	if (err) {
		error(500, { message: 'Failed to update user' });
	}

	return updatedUser;
};

const remove = async (supabase: SupabaseClient, id: string) => {
	const { error: err } = await supabase.from('profiles').delete().eq('id', id);

	if (err) {
		error(500, { message: 'Failed to delete user' });
	}
};

const findByEmail = async (supabase: SupabaseClient, email: string) => {
	const { data } = await supabase.from('profiles').select('*').eq('email', email).single();

	return data;
};

export default {
	findOne,
	findMany,
	create,
	update,
	remove,
	findByEmail
};
