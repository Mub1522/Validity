const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: false, //.map
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: false, //.map
    },
  ],
  external: [],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", declaration: false }),
  ],
};
