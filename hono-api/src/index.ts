import { Hono, type Context } from 'hono';
import { z } from 'zod';
import { cors } from "hono/cors";
import { db } from "./db"
import { usersTable } from './m_schema';
import { eq, or } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { serve } from "@hono/node-server";



/* const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
.regex(
  passwordRegex,
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
) */
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  mobileNumber: z.string().regex(/^\d+$/, 'Mobile number must be numeric'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 8 characters long')
                      .max(72, 'Password cannot exceed 72 characters') // bcrypt limit
                     ,
})

const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, 'Password must be at least 8 characters long'),
});

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
.post('/sign-in', async (c: Context) => {
  try{
    const body = await c.req.json();
    const data = signInSchema.parse(body);

    const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, data.email))
    .get();

    if(!user){
      return c.json({
        success: false,
        message: 'Email not found'
      },401)
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid){
      return c.json({
        success: false,
        message: 'Invalid password'
      },401);
    }
    return c.json({ success: true, message: 'Sign in successful!' }, 200);
  }catch (error){
    if (error instanceof z.ZodError) {
      return c.json({ success: false, errors: error.errors }, 400);
    }
    console.error(error);
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

/* import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { eq } from 'drizzle-orm'
import { users, accounts } from './schema'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import { db } from './schema'
// Create Turso client


// Validation schemas
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const app = new Hono() */

// Login route
/* app.post('/login', zValidator('json', LoginSchema), async (c) => {
  const { email, password } = c.req.valid('json')

  try {
    // Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    // Verify password (assuming you've stored a hashed password in a custom account table or users table)
    // Note: This is a simplified example. In a real app, you'd have a more robust authentication mechanism
    const passwordMatch = await bcrypt.compare(password, user.passwordHash || '')

    if (!passwordMatch) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }

    // Generate session or JWT token
    const sessionToken = crypto.randomUUID()

    // You would typically create a session here and store it in the sessions table
    return c.json({ 
      message: 'Login successful', 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      },
      sessionToken 
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
 */
// Registration route
/* app.post('/register', zValidator('json', RegisterSchema), async (c) => {
  const { name, email, password } = c.req.valid('json')

  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUser.length > 0) {
      return c.json({ error: 'User already exists' }, 409)
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create new user
    const [newUser] = await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      emailVerified: null,
      image: null,
      passwordHash // You'll need to add this to your schema
    }).returning()

    return c.json({ 
      message: 'Registration successful', 
      user: { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email 
      }
    }, 201)
  } catch (error) {
    console.error('Registration error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Optional: Password reset route (placeholder)
app.post('/reset-password', zValidator('json', z.object({
  email: z.string().email('Invalid email address')
})), async (c) => {
  const { email } = c.req.valid('json')

  // In a real app, implement password reset logic
  // 1. Find user by email
  // 2. Generate reset token
  // 3. Send reset email
  // 4. Store reset token with expiration

  return c.json({ message: 'Password reset instructions sent' })
})

export const GET = handle(app)
export const POST = handle(app)

export default app */