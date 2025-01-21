import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.astro',
      'pnpm-lock.yaml',
      'pre-commit',
      '.prettierignore',
      '.changeset',
      '/test-results/',
      '/playwright-report/',
      '/blob-report/',
      '/playwright/.cache/',
      '.wrangler/',
      '**/__coverage__'
    ]
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
