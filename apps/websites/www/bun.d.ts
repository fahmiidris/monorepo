declare module "bun" {
    interface Env {
        VITE_BE_URL: string;
        VITE_FE_URL: string;
    }
}
