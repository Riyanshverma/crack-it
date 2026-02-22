import fastify, {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
} from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyJwt from '@fastify/jwt';
import { authRoutes } from './Routes';
import { dbPlugin } from './Plugins';

const app: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>(); // { logger: true }

app.register(fastifyCors, {
  origin: Bun.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
});
app.register(fastifyFormbody);
app.register(fastifyJwt, {
  secret: Bun.env.JWT_SECRET,
});
app.register(dbPlugin)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send(`Server running at ${request.host}`);
});

app.register(authRoutes, { prefix: '/api/v1/user' });

app.ready((error) => {
  if(error) {
    console.error("Plugin loading failed:", error);
    process.exit(1)
  }
})

export { app };