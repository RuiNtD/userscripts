import babelPlugin from "@rollup/plugin-babel";
import commonjsPlugin from "@rollup/plugin-commonjs";
import jsonPlugin from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve";
import { isAbsolute, relative, resolve } from "path";
import { defineConfig } from "rollup";
import userscript from "rollup-plugin-userscript";

const extensions = [".ts", ".mjs", ".js"];

export default defineConfig(
  Object.entries({
    "bang-anywhere": "src/bang-anywhere/index.ts",
    "n64-notify": "src/n64-notify/index.ts",
  }).map(([name, entry]) =>
    defineConfig({
      input: entry,
      plugins: [
        babelPlugin({
          // import helpers from '@babel/runtime'
          babelHelpers: "runtime",
          plugins: [
            [
              import.meta.resolve("@babel/plugin-transform-runtime"),
              {
                useESModules: true,
                version: "^7.5.0", // see https://github.com/babel/babel/issues/10261#issuecomment-514687857
              },
            ],
          ],
          exclude: "node_modules/**",
          extensions,
        }),
        resolvePlugin({ browser: false, extensions }),
        commonjsPlugin(),
        jsonPlugin(),
        userscript(),
      ],
      external: defineExternal([
        "@violentmonkey/ui",
        "@violentmonkey/dom",
        "@violentmonkey/url",
      ]),
      output: {
        format: "iife",
        file: `dist/${name}.user.js`,
        globals: {
          "@violentmonkey/dom": "VM",
          "@violentmonkey/ui": "VM",
          "@violentmonkey/url": "VM",
        },
        indent: false,
      },
    }),
  ),
);

function defineExternal(externals: string[]) {
  return (id: string): boolean =>
    externals.some((pattern) => {
      // if (typeof pattern === "function") return pattern(id);
      // if (pattern && typeof pattern.test === "function")
      // return pattern.test(id);
      if (isAbsolute(pattern))
        return !relative(pattern, resolve(id)).startsWith("..");
      return id === pattern || id.startsWith(pattern + "/");
    });
}
