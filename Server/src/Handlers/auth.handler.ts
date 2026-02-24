import {
  type FastifyRequest,
  type FastifyReply,
  type FastifyError,
  type FastifySchemaValidationError,
} from 'fastify';

const validationErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      statusCode: error.statusCode,
      error: 'Bad Request',
      message: (error.validation as FastifySchemaValidationError[]).map(
        ({ message, instancePath, params }: FastifySchemaValidationError) => ({
          field:
            instancePath.length > 1
              ? instancePath.substring(1)
              : params.keys.join(', '),
          message: message?.replace(/\"/g, ''),
        })
      ),
    });
  }
};

const authenticateCookieHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      success: false,
      statusCode: 401,
      error: 'Unauthorized',
      message: ['Invalid or missing authentication token'],
    });
  }
};

export { validationErrorHandler, authenticateCookieHandler };
