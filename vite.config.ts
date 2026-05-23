import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ...(command === "build" && {
    environments: {
      ssr: {
        resolve: {
          conditions: ["workerd"],
          noExternal: true,
        },
      },
    },
  }),
}));
