import { type FastifyInstance } from "fastify";
import { signUp } from "../Controllers";
import { userSignUpSchema } from "../Validations";

const authRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/sign-up', { schema: { body: userSignUpSchema }, preHandler: async () => {

    } } ,signUp)
}

export default authRoutes