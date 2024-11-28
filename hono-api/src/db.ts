/* import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
export const db = drizzle({ 
  connection: { 
    url: process.env.TURSO_DATABASE_URL!, 
    authToken: process.env.TURSO_AUTH_TOKEN!
  }
}); */

/* import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client); */ // Ensure `db` is of type `AnySQLiteDatabase`
/* import 'dotenv/config';
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client) */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { AnySQLiteDeleteBase } from 'drizzle-orm/sqlite-core';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

const client = createClient({ url: process.env.DB_FILE_NAME! });

export const db = drizzle({ client })  as unknown as AnySQLiteDeleteBase;

