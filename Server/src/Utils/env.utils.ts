declare module 'bun' {
  interface Env {
    NODE_ENV?: string | undefined;
    PORT: number;
    FRONTEND_URL: string;
    JWT_SECRET: string;
    DB_USER: string;
    DB_PASSWORD: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_CONNECTION_URL: string;
  }
}
