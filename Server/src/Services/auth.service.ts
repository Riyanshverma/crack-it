import { type CreateUserParams } from '../Types';

const createUser = async ({
  db,
  full_name,
  email,
  password_hash,
}: CreateUserParams): Promise<any> => {
  const client = await db.connect();
  try {
    const response = await client.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [full_name, email, password_hash]
    );
    console.log("This is the response: ",response);
    
    return response.rows[0];
  }catch(error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export { createUser };
