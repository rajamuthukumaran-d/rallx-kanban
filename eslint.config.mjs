import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.extends('next/core-web-vitals'),
  ...tseslint.configs.recommended,
  { ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'next-env.d.ts', 'eslint.config.mjs'] },
];
