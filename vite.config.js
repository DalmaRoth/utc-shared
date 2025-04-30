import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import cesium from 'vite-plugin-cesium';

const __dirname = dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  plugins: [
    cesium()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        flood: resolve(__dirname, "./app/examples/flood/index.html"),
      },
    },
  },
});
