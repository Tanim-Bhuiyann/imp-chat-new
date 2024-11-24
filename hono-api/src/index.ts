import { Hono, type Context } from 'hono';
import { z } from 'zod';
import { cors } from "hono/cors";
import { db } from "./db"
import { usersTable } from './schema';
import { eq, or } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { serve } from "@hono/node-server";


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  mobileNumber: z.string().regex(/^\d+$/, 'Mobile number must be numeric'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 8 characters long')
                      .max(72, 'Password cannot exceed 72 characters') // bcrypt limit
                      .regex(
                        passwordRegex,
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                      ),
})

const app = new Hono()
.use('*', cors({
  origin: '*',
  allowMethods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
  allowHeaders: ['Content-Type'],
  
}))
.post('/sign-up', async (c: Context) =>{
  try{
    const body = await c.req.json();
    const data = signUpSchema.parse(body);
    const existingUser = await db
                     .select()
                     .from(usersTable)
                     .where(
                      or(
                        eq(usersTable.email, data.email),
                        eq(usersTable.username, data.username)
                      )
                    )
                     .get();

    if(existingUser){
      const field = existingUser.email === data.email ? 'email' : 'username';
      return c.json(
        { 
          success: false, 
          message: `This ${field} is already registered` 
        },
        409 // Conflict status code
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    await db.insert(usersTable).values({
      username: data.username,
      mobileNumber: data.mobileNumber,
      email: data.email,
      password: hashedPassword,
    })

    return c.json({ success: true, message: 'Sign up successful!' }, 201);
  } catch(error){
    if (error instanceof z.ZodError) {
      return c.json({ success: false, errors: error.errors }, 400);
    }
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
})

.get('/tanim', (c) => {
  return c.text('Hello Hono!')
})

export type AppType = typeof app;

/* export default app */

const port = 3002;
console.log(`Server is running on port ${port}`); // Use backticks for template literals
serve({ fetch: app.fetch, port });

