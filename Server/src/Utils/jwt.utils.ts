import { type FastifyJWTOptions } from '@fastify/jwt';

const jwtOptions: FastifyJWTOptions = {
  secret: Bun.env.JWT_SECRET,
  sign: { expiresIn: '1d' },
  cookie: {
    cookieName: 'cookie',
    signed: true,
  },
};

export { jwtOptions };