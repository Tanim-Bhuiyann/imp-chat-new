import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './schema';

(async () => {
  try {
    await migrate(db, { migrationsFolder: './drizzle' }); // Pass the correct `db` type
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Failed to apply migrations:', error);
  }
})();


