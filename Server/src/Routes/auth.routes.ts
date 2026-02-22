import {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
  type FastifyError,
} from 'fastify';
import { signUp } from '../Controllers';
import { userSignUpSchema } from '../Validations';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/sign-up', { schema: { body: userSignUpSchema } }, signUp);
};

export default authRoutes;



// fastify.setErrorHandler(
//     (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
//       if (error.validation) {
//         // Custom response for validation errors
//         reply.status(400).send({
//           statusCode: 400,
//           error: 'Bad Request',
//           message: 'Custom: Validation failed',
//           details: error.validation.map((v: any) => v.message),
//         });
//       } else {
//         // Default error handler
//         reply.status(error.statusCode || 500).send({
//           error: error.message,
//         });
//       }
//     }
//   );