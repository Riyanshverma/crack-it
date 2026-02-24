import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type userSignUpType, type userLogInType } from '../Validations';
import { hashPassword } from '../Utils';
import { createUser } from '../Services';
import { ZodError } from 'zod';

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

    const token = await reply.jwtSign({
      id: result.id,
      email: result.email,
    });

    return reply.setCookie('cookie', token).status(201).send({
      statusCode: 201,
      message: 'User created successfully',
      user: result,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Zod Validation Error',
        messages: error.issues.map((issue) => issue.message),
      });
    }
    if (error instanceof Error) {
      return reply.status(500).send({
        statusCode: 500,
        error: 'code' in error ? 'Database Error' : 'Internal Server Error',
        messages: [error.message],
      });
    }
    return reply.status(500).send({
      statusCode: 500,
      error: 'Unknown Error',
      messages: ['An unknown error occurred'],
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

const logOut = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
  } catch (error) {}
};
export { signUp, logIn, logOut };
