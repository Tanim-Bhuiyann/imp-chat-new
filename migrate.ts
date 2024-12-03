/* import "dotenv/config"
import { migrate } from "drizzle-orm/mysql2/migrator"
import { db, connection } from "./src/db"
 
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" })
 
// Don't forget to close the connection, otherwise the script will hang
await connection.end() */

import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator'; // SQLite-specific migrator
import { db } from './src/db/schema'; // Import your db instance

// Run migrations for SQLite/Turso
await migrate(db, { migrationsFolder: './drizzle' });

console.log('Migrations applied successfully!');
