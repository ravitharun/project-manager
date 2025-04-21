import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore certain directories or files
  {
    ignores: ['dist', 'node_modules'], // Added 'node_modules' for completeness
  },
  {
    files: ['**/*.{js,jsx}'], // Apply settings to all JS/JSX files
    languageOptions: {
      ecmaVersion: 2021, // Updated to the latest stable ECMAScript version
      globals: globals.browser, // Includes browser-specific global variables
      parserOptions: {
        ecmaVersion: 'latest', // Automatically use the latest version
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module', // Use ES Modules
      },
    },
    settings: {
      react: { version: 'detect' }, // Automatically detect the React version
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // Standard JS rules
      ...react.configs.recommended.rules, // Recommended React rules
      ...react.configs['jsx-runtime'].rules, // React JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React hooks rules
      'react/jsx-no-target-blank': 'off', // Disable warning for `target="_blank"`
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constants in exports
      ],
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used' }], // Warn on unused variables
      'no-console': 'warn', // Warn on `console.log` usage
      'react/prop-types': 'off', // Disable prop-types requirement if using TypeScript
    },
  },
];
