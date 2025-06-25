// eslint-plugin-no-ssr-unsafe/index.js

const noSSRUnsafeBrowserApi = require('./rules/no-ssr-unsafe-browser-api.js');

module.exports = {
  meta: {
    name: 'eslint-plugin-no-ssr-unsafe',
    version: '2.0.0'
  },
  rules: {
    'no-ssr-unsafe-browser-api': noSSRUnsafeBrowserApi
  },
  configs: {
    // Standard configuration - recommended for most projects
    recommended: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
          allowGuarded: true,        // Allow typeof window !== 'undefined' 
          strictMode: false,         // Standard checking
          utilityLeniency: true      // Be lenient with utility files
        }]
      }
    },
    
    // Strict configuration - for teams wanting maximum safety
    strict: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
          allowGuarded: true,        // Still allow guards
          strictMode: true,          // Stricter checking
          utilityLeniency: false     // Flag utility files too
        }]
      }
    },
    
    // Lenient configuration - for existing codebases with many utilities
    lenient: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
          allowGuarded: true,        // Allow guards
          strictMode: false,         // Standard checking
          utilityLeniency: true      // Very lenient with utilities
        }]
      }
    },
    
    // Migration configuration - for gradually adopting the rule
    migration: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
          allowGuarded: true,
          strictMode: false,
          utilityLeniency: true
        }]
      }
    }
  }
};