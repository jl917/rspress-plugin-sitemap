import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outExtension() {
    return {
      js: `.js`,
    };
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  outDir: "./lib",
  format: "cjs",
  target: "es5",
});
