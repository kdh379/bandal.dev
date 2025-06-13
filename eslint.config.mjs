import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // Next.js 설정 (core-web-vitals만 사용하여 TypeScript 플러그인 충돌 방지)
  ...compat.extends("next/core-web-vitals"),

  // Prettier 설정
  eslintConfigPrettier,

  // TypeScript ESLint 추천 설정
  ...tseslint.configs.recommended,

  {
    ignores: ["dist", "node_modules"],
    languageOptions: {
      parserOptions: {
        projectService: true, // 프로젝트에서 가장 가까운 tsconfig.json 파일을 찾아서 사용합니다.
        project: true, // tsconfig.json 프로젝트 설정 활성화
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "@import": importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "prettier/prettier": "error", // prettier 규칙 어긋나면 error

      // TypeScript ESLint 규칙
      // -------------------------------------
      "@typescript-eslint/consistent-type-imports": "error", // type에 대한 import 시 type 키워드 필수
      "no-unused-vars": "off", // ts eslint에서 수행하므로, eslint 에서는 무시

      // tseslint.configs.recommended를 덮어쓰기 위한 규칙
      // -------------------------------------
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          varsIgnorePattern: "_.*",
          argsIgnorePattern: "_.*",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off", // any 타입 허용
      "@typescript-eslint/ban-ts-comment": "off", // @ts-comment 사용 허용
      "@typescript-eslint/no-empty-object-type": "off", // 빈 객체 타입 허용
      // "no-undef": "off",  // ts eslint가 전역 변수/타입을 못잡을 경우 주석 제거

      // import 규칙
      // -------------------------------------
      "@import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@turucar/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "*.scss",
              group: "sibling",
              position: "after",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // JavaScript 파일용 설정 (TypeScript 체크 비활성화)
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
