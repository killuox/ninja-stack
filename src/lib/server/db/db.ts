import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { ENV } from '$lib/server/env';
import * as schema from './tables';

const sql = neon(ENV.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql, { schema });

export default db;
