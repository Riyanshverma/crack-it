import { type PostgresDb } from "@fastify/postgres";

interface Database {
  db: PostgresDb;
}

interface createUserParamsType extends Database {
  full_name: string;
  email: string;
  password_hash: string;
}

interface checkIdentityParamsType extends Database {
  email: string;
}

export type { createUserParamsType, checkIdentityParamsType }