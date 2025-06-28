// eslint-plugin-no-ssr-unsafe/index.js

const noSSRUnsafeBrowserApi = require('./rules/no-ssr-unsafe-browser-api.js');
const noSSRNonDeterministic = require('./rules/no-ssr-nondeterministic-expressions.js');
const noSSRAsyncInRender = require('./rules/no-ssr-async-in-render.js');

module.exports = {
  meta: {
    name: 'eslint-plugin-no-ssr-unsafe',
    version: '2.1.0'  // bumped version to reflect new rules
  },
  rules: {
    'no-ssr-unsafe-browser-api': noSSRUnsafeBrowserApi,
    'no-ssr-nondeterministic-expressions': noSSRNonDeterministic,
    'no-ssr-async-in-render': noSSRAsyncInRender,
  },
  configs: {
    // Recommended configuration enabling all three rules
    recommended: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
          allowGuarded: true,
          strictMode: false,
          utilityLeniency: true
        }],
        'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'error',
        'no-ssr-unsafe/no-ssr-async-in-render': 'error'
      }
    },

    // Strict configuration (same behavior, just more explicit)
    strict: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['error', {
          allowGuarded: true,
          strictMode: true,
          utilityLeniency: false
        }],
        'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'error',
        'no-ssr-unsafe/no-ssr-async-in-render': 'error'
      }
    },

    // Lenient configuration for legacy codebases
    lenient: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
          allowGuarded: true,
          strictMode: false,
          utilityLeniency: true
        }],
        'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'warn',
        'no-ssr-unsafe/no-ssr-async-in-render': 'warn'
      }
    },

    // Migration configuration for gradual rollout
    migration: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-browser-api': ['warn', {
          allowGuarded: true,
          strictMode: false,
          utilityLeniency: true
        }],
        'no-ssr-unsafe/no-ssr-nondeterministic-expressions': 'warn',
        'no-ssr-unsafe/no-ssr-async-in-render': 'warn'
      }
    }
  }
};