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

    const password_hash = await hashPassword(password);

    const result = await createUser({
      db: request.server.pg,
      full_name: `${first_name} ${last_name}`,
      email,
      password_hash,
    });
    console.log("This is the reuslt: ", result);
    
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (
  request: FastifyRequest<{ Body: userLogInType }>,
  reply: FastifyReply
) => {
  try {
    console.log(request.body);
  } catch (error) {}
};
export { signUp, logIn };
