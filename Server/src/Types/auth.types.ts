import { type PostgresDb } from "@fastify/postgres";

interface Database {
  db: PostgresDb;
}

interface CreateUserParams extends Database {
  full_name: string;
  email: string;
  password_hash: string;
}

export type { CreateUserParams }