import {
  type FastifyRequest,
  type FastifyReply,
  type FastifyError,
  type FastifySchemaValidationError,
} from 'fastify';

const authErrorHandler = (
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

export { authErrorHandler };
