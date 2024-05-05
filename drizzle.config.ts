import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/lib/server/env';

export default defineConfig({
	schema: './src/lib/server/db/tables.ts',
	driver: 'pg',
	dbCredentials: {
		connectionString: ENV.DRIZZLE_DATABASE_URL
	},
	verbose: true,
	strict: true
});
