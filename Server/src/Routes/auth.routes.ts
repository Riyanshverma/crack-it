import {
  type FastifyError,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';
import { signUp, logIn, logOut } from '../Controllers';
import { userLogInSchema, userSignUpSchema } from '../Validations';
import { authErrorHandler } from '../Handlers';

const authRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.setErrorHandler<FastifyError>(authErrorHandler);

  fastify.post(
    '/sign-up',
    {
      schema: { body: userSignUpSchema },
      preHandler: (request, reply, done) => {
        console.log("I am pre-Handler...");
        done();
      },
    },
    signUp
  );

  fastify.post('/log-in', { schema: { body: userLogInSchema } }, logIn);
  fastify.post('/log-out', logOut);
};

export default authRoutes;
