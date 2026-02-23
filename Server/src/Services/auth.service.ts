import { type CreateUserParams } from "../Types";

const createUser = async ({full_name, email, hashed_password}: CreateUserParams): Promise<void> => {
    console.log("I am create user function");
    console.log({full_name, email, hashed_password});
}


export { createUser }