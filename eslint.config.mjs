import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    },
    rules: {
      // kan strammes senere
    }
  },
  js.configs.recommended
];
