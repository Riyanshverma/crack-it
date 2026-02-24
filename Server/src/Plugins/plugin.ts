import {
  type FastifyPluginAsync,
  type FastifyInstance,
  type FastifyPluginOptions,
} from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { jwtOptions, corsOptions, cookieOptions } from '../Utils';

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

const corsPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  await fastify.register(fastifyCors, corsOptions);
};

const cookiePlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  await fastify.register(fastifyCookie, cookieOptions);
};

export { dbPlugin, jwtPlugin, corsPlugin, cookiePlugin };
