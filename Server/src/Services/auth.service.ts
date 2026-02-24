import { ZodError } from 'zod';
import {
  type createUserParamsType,
  type checkIdentityParamsType,
} from '../Types';
import {
  type createUserResultType,
  createUserResultSchema,
  type checkIdentityResultType,
  chechkIdentityResultSchema,
} from '../Validations';

const checkIdentity = async ({
  db,
  email,
}: checkIdentityParamsType): Promise<checkIdentityResultType | false> => {
  try {
    const result = await db.query(
      'SELECT id, full_name, email, password_hash FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length > 0) {
      return chechkIdentityResultSchema.parse(result.rows[0]);
    }
    return false
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(`Zod validation error: ${error.issues}`);
      throw error;
    }
    if(error instanceof Error) {
      console.error(`Error checking identity: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while checking identity');
  }
};

const createUser = async ({
  db,
  full_name,
  email,
  password_hash,
}: createUserParamsType): Promise<createUserResultType> => {
  try {
    const result = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email',
      [full_name, email, password_hash]
    );

    if (result.rows.length > 0) {
      return createUserResultSchema.parse(result.rows[0]);
    }
    throw new Error('Failed to create user');
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(`Zod validation error: ${error.issues}`);
      throw error;
    }
    if (error instanceof Error) {
      console.error(`Error creating user: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating user');
  }
};

export { createUser, checkIdentity };
