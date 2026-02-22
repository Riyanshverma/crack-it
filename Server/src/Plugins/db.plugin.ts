import fastifyPlugin from 'fastify-plugin';
import {
  type FastifyPluginAsync,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';
import fastifyPostgres from '@fastify/postgres';

const dbPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  await fastify.register(fastifyPostgres, {
    connectionString: Bun.env.DB_CONNECTION_URL,
  });
};

export default fastifyPlugin(dbPlugin);
