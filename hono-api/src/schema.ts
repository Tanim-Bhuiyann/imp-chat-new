import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(), // Represents the user's name or username
  mobileNumber: text().notNull(), // For storing the user's mobile number
  email: text().notNull().unique(), // Email, marked unique
  password: text().notNull(), // Stores the user's password
});
