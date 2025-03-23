import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
import stylistic from '@stylistic/eslint-plugin';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: { '@stylistic': stylistic },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/lines-between-class-members': ["error", "always", { "exceptAfterOverload": true }],
            '@stylistic/brace-style': ["error", "allman", { "allowSingleLine": true }]
        }
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        ignores: ['eslint.config.js', 'svelte.config.js'],

        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    }
);
