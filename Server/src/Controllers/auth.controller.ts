import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type userSignUpType, type userLogInType } from '../Validations';
import { hashPassword, verifyPassword } from '../Utils';
import { createUser, checkIdentity } from '../Services';
import { ZodError } from 'zod';

const signUp = async (
  request: FastifyRequest<{ Body: userSignUpType }>,
  reply: FastifyReply
) => {
  try {
    const { first_name, last_name, email, password } = request.body;

    const password_hash = await hashPassword(password);

    const response = await createUser({
      db: request.server.pg,
      full_name: `${first_name} ${last_name}`,
      email,
      password_hash,
    });

    const token = await reply.jwtSign({
      id: response.id,
      email: response.email,
    });

    return reply.setCookie('cookie', token).status(201).send({
      success: true,
      statusCode: 201,
      message: 'User created successfully',
      user: response,
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
    const { email, password } = request.body;

    const response = await checkIdentity({
      db: request.server.pg,
      email,
    });

    if (!response) {
      return reply.status(404).send({
        success: false,
        statusCode: 404,
        error: 'Not Found',
        messages: ['User not found'],
      });
    }

    if (!(await verifyPassword(password, response.password_hash))) {
      return reply.status(401).send({
        success: false,
        statusCode: 401,
        error: 'Unauthorized',
        messages: ['Invalid credentials'],
      });
    }

    const token = await reply.jwtSign({
      id: response.id,
      email: response.email,
    });

    return reply
      .setCookie('cookie', token)
      .status(200)
      .send({
        success: true,
        statusCode: 200,
        message: 'Logged in successfully',
        user: {
          id: response.id,
          full_name: response.full_name,
          email: response.email,
        },
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

    return reply.status(500).send({
      success: false,
      statusCode: 500,
      error: 'Database Error',
      messages: [error.message.replace(/\"/g, '')],
    });
  }
};

const logOut = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    reply.clearCookie('cookie', {
      path: '/',
      domain: Bun.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      signed: true,
    });

    return reply.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Logged out successfully',
    });
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      return reply.status(500).send({
        success: false,
        statusCode: 500,
        error: 'Unknown Error',
        messages: ['An unknown error occurred'],
      });
    }
    return reply.status(500).send({
      success: false,
      statusCode: 500,
      error: 'Internal Server Error',
      messages: [error.message.replace(/\"/g, '')],
    });
  }
};
export { signUp, logIn, logOut };
