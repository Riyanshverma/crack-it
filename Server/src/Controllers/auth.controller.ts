import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type userSignUpType, type userLogInType } from '../Validations';
import { hashPassword } from '../Utils';
import { createUser } from '../Services';

const signUp = async (
  request: FastifyRequest<{ Body: userSignUpType }>,
  reply: FastifyReply
) => {
  try {
    const { first_name, last_name, email, password } = request.body;

    const password_hash = await hashPassword(password);

    const result = await createUser({
      db: request.server.pg,
      full_name: `${first_name} ${last_name}`,
      email,
      password_hash,
    });

    // TODO: Implement JWT

    // TODO: Send Cookie with JWT

    // TODO: Send proper response
  } catch (error: unknown) {
    if (error instanceof Error) {
      return reply.status(500).send({
        statusCode: 500,
        error: 'code' in error ? 'Database Error' : 'Internal Server Error',
        message: error.message,
      });
    }

    return reply.status(500).send({
      statusCode: 500,
      error: 'Unknown Error',
      message: 'An unknown error occurred',
    });
  }
};

const logIn = async (
  request: FastifyRequest<{ Body: userLogInType }>,
  reply: FastifyReply
) => {
  try {
    console.log(request.body);
  } catch (error) {}
};
export { signUp, logIn };
