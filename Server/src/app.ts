import fastify, { type FastifyInstance, type FastifyRequest, type FastifyReply } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import { authRoutes } from './Routes';
import { dbPlugin, jwtPlugin } from './Plugins';

const app: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>(); // { logger: true }

app.register(fastifyCors, {
  origin: Bun.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
});
app.register(fastifyFormbody);
app.register(fastifyPlugin(dbPlugin));
app.register(fastifyPlugin(jwtPlugin));

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