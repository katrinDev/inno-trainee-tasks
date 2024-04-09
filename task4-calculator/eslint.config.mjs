import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("airbnb"),
  {
    rules: {
      "linebreak-style": 0,
      "no-tabs": ["error", { allowIndentationTabs: true }],
      "object-curly-spacing": ["error", "always"],
      "quote-props": ["error", "as-needed"],
      indent: ["error", "tab", { SwitchCase: 1 }],
      "no-unused-vars": 1,
      "space-before-function-paren": 0,
      "comma-dangle": 0,
    },
  },
];
