import { type CreateUserParams, type CreateUserResult } from '../Types';

const createUser = async ({
  db,
  full_name,
  email,
  password_hash,
}: CreateUserParams): Promise<CreateUserResult> => {
  try {
    const result = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email',
      [full_name, email, password_hash]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
    throw new Error('Failed to create user');
  } catch (error: unknown) {
    throw error instanceof Error
      ? (console.error(`Error creating user: ${error}`), error)
      : new Error('Unknown error occurred while creating user');
  }
};

export { createUser };
