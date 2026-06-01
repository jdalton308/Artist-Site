import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import doubleBlankLinesRule from "./eslint-rules/double-blank-lines.mjs";


const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/app/(payload)/admin/importMap.js",
  ]),
  {
    name: "artist-site/formatting",
    files: ["**/*.{js,jsx,mjs}"],
    plugins: {
      "artist-site": {
        rules: {
          "double-blank-lines": doubleBlankLinesRule,
        },
      },
    },
    rules: {
      "react/jsx-one-expression-per-line": ["error", { allow: "none" }],
      "react/jsx-newline": ["error", { prevent: false }],
      "artist-site/double-blank-lines": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
    },
  },
]);

export default eslintConfig;
