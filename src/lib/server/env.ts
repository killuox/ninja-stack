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
	DRIZZLE_DATABASE_URL: getEnvironmentVariable('DRIZZLE_DATABASE_URL'),
	EMAIL_API_KEY: getEnvironmentVariable('EMAIL_API_KEY'),
	EMAIL_FROM: getEnvironmentVariable('EMAIL_FROM'),
	CONVEX_URL: getEnvironmentVariable('CONVEX_URL')
};

// USAGE: import { ENV } from "$lib/server/env"; ENV.STRIPE_SECRET_KEY