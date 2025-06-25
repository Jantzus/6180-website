// eslint.config.js - Updated configuration with enhanced SSR rule

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
      
      // 🚀 ENHANCED: SSR-safe browser API rule with improved client detection
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': [
        'warn',  // Start with warnings to assess the improved detection
        {
          allowGuarded: true,                    // Allow typeof window !== 'undefined' checks
          strictMode: false,                     // Standard mode for general files
          utilityLeniency: true,                 // Be very lenient with utility files
          enhancedClientDetection: true,         // 🆕 NEW: Better client-side check detection
          debugMode: false                       // 🔧 Set to true temporarily to see improvements
        },
      ],
    },
  },
  
  // 📁 File-specific overrides for fine-tuning
  {
    files: [
      '**/utils/**/*.{ts,tsx}', 
      '**/helpers/**/*.{ts,tsx}', 
      '**/services/**/*.{ts,tsx}',
      '**/lib/**/*.{ts,tsx}',           // Added lib directory
      '**/hooks/**/*.{ts,tsx}'          // Added hooks directory
    ],
    rules: {
      // Extra lenient for utility directories
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: true,
        enhancedClientDetection: true     // 🆕 Enhanced detection for utilities
      }]
    }
  },
  
  {
    files: ['**/components/**/*.{tsx}', '**/pages/**/*.{tsx}'],
    rules: {
      // More balanced strictness for component files with enhanced detection
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
        allowGuarded: true,
        strictMode: false,                     // 🔄 CHANGED: Less strict due to enhanced detection
        utilityLeniency: false,
        enhancedClientDetection: true          // 🆕 Enhanced detection for components
      }]
    }
  },
  
  // 🆕 NEW: Special handling for SSR-safe utilities
  {
    files: [
      '**/*SSRSafe*.{ts,tsx}',
      '**/*ClientOnly*.{ts,tsx}', 
      '**/*BrowserSafe*.{ts,tsx}',
      '**/ssr-safe/**/*.{ts,tsx}'
    ],
    rules: {
      // Very lenient for explicitly SSR-safe files
      'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
        allowGuarded: true,
        strictMode: false,
        utilityLeniency: true,
        enhancedClientDetection: true
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