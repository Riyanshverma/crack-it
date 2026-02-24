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
      success: true,
      statusCode: 201,
      message: 'User created successfully',
      user: result,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        statusCode: 400,
        error: 'Zod Validation Error',
        messages: error.issues.map((issue) => issue.message.replace(/\"/g, '')),
      });
    }

    if (!(error instanceof Error)) {
      return reply.status(500).send({
        success: false,
        statusCode: 500,
        error: 'Unknown Error',
        messages: ['An unknown error occurred'],
      });
    }

    if (!('code' in error)) {
      return reply.status(500).send({
        success: false,
        statusCode: 500,
        error: 'Internal Server Error',
        messages: [error.message.replace(/\"/g, '')],
      });
    }

    return error.code === '23505'
      ? reply.status(409).send({
          success: false,
          statusCode: 409,
          error: 'Conflict Error',
          messages: ['Email already exists'],
        })
      : reply.status(500).send({
          success: false,
          statusCode: 500,
          error: 'Database Error',
          messages: [error.message.replace(/\"/g, '')],
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
