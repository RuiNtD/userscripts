import { defineConfig } from "eslint/config";
import globals from "globals";
import prettier from "eslint-plugin-prettier/recommended";
import userscripts from "eslint-plugin-userscripts";

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  {
    files: ["src/**/*.user.js"],
    plugins: {
      userscripts: {
        rules: userscripts.rules,
      },
    },
    rules: {
      ...userscripts.configs.recommended.rules,
    },
    settings: {
      userscriptVersions: {
        violentmonkey: "*",
      },
    },
  },
  prettier,
]);
