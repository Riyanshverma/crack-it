import { z } from 'zod';

const email = z.string().trim().email('Invalid email address')
const password = z.string().trim().min(6, 'Password must be at least 6 characters long').regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/, 'Password must contain at least an uppercase letter, a number, and a special character' )

const userSignUpSchema = z.strictObject({
  first_name: z.string().trim().min(3, 'First name must have at least 3 characters'),
  last_name: z.string().trim().min(3, 'Last name must have at least 3 characters'),
  email: email,
  password: password,
})
export type userSignUpType = z.infer<typeof userSignUpSchema>

const userLogInSchema = z.strictObject({
  email: email,
  password: password
})
export type userLogInType = z.infer<typeof userLogInSchema>

export { userSignUpSchema, userLogInSchema };
