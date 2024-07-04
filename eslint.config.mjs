import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {rules: {
    "no-unused-vars": "error",
    "eqeqeq": "error",
    "camelcase": "error",
    "no-console": "error",
  }}
];