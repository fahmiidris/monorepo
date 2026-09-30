import { default as tailwindcss } from "@monorepo/ui/tailwind.vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart as start } from "@tanstack/react-start/plugin/vite";
import { default as react } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
    plugins: [devtools(), tailwindcss(), nitro({ preset: "bun" }), start(), react()],
    resolve: {
        tsconfigPaths: true,
    },
});

export default config;
