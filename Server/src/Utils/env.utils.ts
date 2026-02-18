declare module "bun" {
    interface Env {
        NODE_ENV?: string | undefined;
        DATABASE_URL: string;
        PORT: number;
        CORS_ORIGIN: string;
    }
}