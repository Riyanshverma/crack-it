
import {
  type FastifyPluginAsync,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import fastifyJwt from '@fastify/jwt';
import { jwtOptions } from '../Utils';

const dbPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  await fastify.register(fastifyPostgres, {
    connectionString: Bun.env.DB_CONNECTION_URL,
  });
};

const jwtPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  await fastify.register(fastifyJwt, jwtOptions);
};

export { dbPlugin, jwtPlugin };