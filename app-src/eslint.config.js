// eslint.config.js - Updated configuration with simplified SSR rule

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
      
      // 🚀 FIXED: Enhanced SSR-safe browser API rule with aggressive safe context detection
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': [
        'warn',  // Start with warnings to assess impact
        {
          allowGuarded: true,        // Allow typeof window !== 'undefined' checks
          strictMode: false,         // Standard mode (set true for extra strict)
          utilityLeniency: true,     // Be very lenient with utility files
          debugMode: false           // Enable to see what's being flagged/allowed
        },
      ],
    },
  },
  
  // 📁 File-specific overrides for fine-tuning
  {
    files: ['**/utils/**/*.{ts,tsx}', '**/helpers/**/*.{ts,tsx}', '**/services/**/*.{ts,tsx}'],
    rules: {
      // Extra lenient for utility directories
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: true
      }]
    }
  },
  
  {
    files: ['**/components/**/*.{tsx}', '**/pages/**/*.{tsx}'],
    rules: {
      // Stricter for component files
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
        allowGuarded: true,
        strictMode: true,          // More strict for components
        utilityLeniency: false
      }]
    }
  },
  
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
    rules: {
      // Disable for test files
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': 'off'
    }
  }
)