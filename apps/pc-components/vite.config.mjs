import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "@llm/ui-less": path.resolve(__dirname, "../../packages/llm-ui-less/src/index.ts"),
      "@llm/pc-components": path.resolve(__dirname, "../../packages/llm-pc-components/src/index.ts")
    }
  }
});
