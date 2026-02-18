import fastify, { type FastifyInstance, type FastifyRequest, type FastifyReply } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";

import { authRoutes } from "./Routes";

const app: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>() // { logger: true }

app.register(fastifyCors, {
  origin: Bun.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type']
});
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)



app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send(`Server running at ${request.host}`)
})

app.register(authRoutes, { prefix: "/api/v1/user" })

export { app }