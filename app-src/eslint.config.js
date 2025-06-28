// eslint.config.js - Updated configuration with enhanced SSR rules

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import noSSRUnsafe from '../eslint-plugin-no-ssr-unsafe/index.js'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'no-ssr-unsafe': noSSRUnsafe,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ✅ SSR rules
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': [
        'warn',
        {
          allowGuarded: true,
          strictMode: false,
          utilityLeniency: true,
          enhancedClientDetection: true,
          debugMode: false
        },
      ],
      'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'error',
      'no-ssr-unsafe/no-ssr-async-in-render': 'error',
    },
  },

  {
    files: [
      '**/utils/**/*.{ts,tsx}', 
      '**/helpers/**/*.{ts,tsx}', 
      '**/services/**/*.{ts,tsx}',
      '**/lib/**/*.{ts,tsx}', 
      '**/hooks/**/*.{ts,tsx}'
    ],
    rules: {
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: true,
        enhancedClientDetection: true
      }],
      'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'warn',
      'no-ssr-unsafe/no-ssr-async-in-render': 'warn',
    }
  },

  {
    files: ['**/components/**/*.{tsx}', '**/pages/**/*.{tsx}'],
    rules: {
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: false,
        enhancedClientDetection: true
      }],
      'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'error',
      'no-ssr-unsafe/no-ssr-async-in-render': 'error',
    }
  },

  {
    files: [
      '**/*SSRSafe*.{ts,tsx}',
      '**/*ClientOnly*.{ts,tsx}', 
      '**/*BrowserSafe*.{ts,tsx}',
      '**/ssr-safe/**/*.{ts,tsx}'
    ],
    rules: {
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: true,
        enhancedClientDetection: true
      }],
      'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'warn',
      'no-ssr-unsafe/no-ssr-async-in-render': 'warn',
    }
  },

  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
    rules: {
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': 'off',
      'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'off',
      'no-ssr-unsafe/no-ssr-async-in-render': 'off',
    }
  }
)