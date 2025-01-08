import { defineConfig } from 'drizzle-kit';
import { DB_NAME } from './src/constants';

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: `${process.env.DATABASE_URL}/${DB_NAME}` as string,
  },
  verbose: true,
  strict: true
});
