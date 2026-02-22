import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type userSignUpType, type userLogInType } from '../Validations';

const signUp = async (
  request: FastifyRequest<{ Body: userSignUpType }>,
  reply: FastifyReply
) => {
  try {
    const { first_name, last_name, email, password } = request.body
    console.log(first_name, last_name, email, password);
  } catch (error) {

  }
}









const logIn = async (request: FastifyRequest<{ Body: userLogInType }>, reply: FastifyReply) => {
    try {
        console.log(request.body);
        
    } catch (error) {

    }
}
export { signUp, logIn }
