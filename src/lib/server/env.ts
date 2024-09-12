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
	SENDGRID_API_KEY: getEnvironmentVariable('SENDGRID_API_KEY'),
	EMAIL_FROM: getEnvironmentVariable('EMAIL_FROM'),
	SENDGRID_SANDBOX_MODE: getEnvironmentVariable('SENDGRID_SANDBOX_MODE') === 'true',
};

// USAGE: import { ENV } from "$lib/server/env"; ENV.STRIPE_SECRET_KEY