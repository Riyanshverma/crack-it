import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type userSignUpType, type userLogInType } from '../Validations';
import { hashPassword } from '../Utils';
import { createUser } from '../Services';

const signUp = async (
  request: FastifyRequest<{ Body: userSignUpType }>,
  reply: FastifyReply
) => {
  try {
    const { first_name, last_name, email, password } = request.body;
    
    const hashed_password = await hashPassword(password);
    
    const result = await createUser({ full_name: `${first_name} ${last_name}`, email, hashed_password });
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
