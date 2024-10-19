import * as dotenv from 'dotenv';
dotenv.config();

function getEnvironmentVariable(environmentVariable: string): string {
	const validEnvironmentVariable = process.env[environmentVariable];
	if (!validEnvironmentVariable) {
		throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
	}
	return validEnvironmentVariable;
}

export const ENV = {
	EMAIL_API_KEY: getEnvironmentVariable('EMAIL_API_KEY'),
	EMAIL_FROM: getEnvironmentVariable('EMAIL_FROM'),
	SUPABASE_ANON_KEY: getEnvironmentVariable('SUPABASE_ANON_KEY'),
	SUPABASE_PROJECT_URL: getEnvironmentVariable('SUPABASE_PROJECT_URL'),
	SUPABASE_SERVICE_ROLE: getEnvironmentVariable('SUPABASE_SERVICE_ROLE'),
	PUBLIC_SUPABASE_ANON_KEY: getEnvironmentVariable("PUBLIC_SUPABASE_ANON_KEY"),
	PUBLIC_SUPABASE_URL: getEnvironmentVariable("PUBLIC_SUPABASE_URL"),
};