import js from "@eslint/js";
import globals from "globals";

export default [
  // App / backend code (Node)
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    }
  },

  // Jest test files
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },

  js.configs.recommended
];
