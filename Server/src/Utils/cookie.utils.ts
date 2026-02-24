import { type FastifyCookieOptions } from "@fastify/cookie";

const cookieOptions: FastifyCookieOptions = {
  secret: Bun.env.COOKIE_SECRET,
  hook: 'onRequest',
  parseOptions: {
    domain: Bun.env.COOKIE_DOMAIN,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    secure: true,
    sameSite: 'strict',
    signed: true,
  },
};

export { cookieOptions };