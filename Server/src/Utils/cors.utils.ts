import { type FastifyCorsOptions } from "@fastify/cors";

const corsOptions: FastifyCorsOptions = {
  origin: Bun.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};

export { corsOptions };