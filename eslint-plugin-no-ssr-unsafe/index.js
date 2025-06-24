// eslint-plugin-no-ssr-unsafe/index.js

const noSSRUnsafeAPIs = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow browser-only APIs that break SSR',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          apis: {
            type: 'array',
            items: {
              type: 'string'
            },
            default: [
              'localStorage', 
              'sessionStorage', 
              'window', 
              'document', 
              'navigator', 
              'location', 
              'history',
              'alert',
              'confirm',
              'prompt'
            ]
          },
          allowInBrowserCheck: {
            type: 'boolean',
            default: true
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const options = context.options[0] || {};
    const unsafeAPIs = new Set(options.apis || [
      'localStorage', 
      'sessionStorage', 
      'window', 
      'document', 
      'navigator', 
      'location', 
      'history',
      'alert',
      'confirm',
      'prompt'
    ]);
    const allowInBrowserCheck = options.allowInBrowserCheck !== false;

    // Check if we're inside a browser environment check
    function isInsideBrowserCheck(node) {
      if (!allowInBrowserCheck) return false;
      
      let parent = node.parent;
      while (parent) {
        // Check for typeof window !== 'undefined'
        if (parent.type === 'BinaryExpression') {
          const { left, right, operator } = parent;
          if (operator === '!==' || operator === '!=') {
            if (
              (left.type === 'UnaryExpression' && 
               left.operator === 'typeof' && 
               left.argument.type === 'Identifier' && 
               left.argument.name === 'window' &&
               right.type === 'Literal' && 
               right.value === 'undefined') ||
              (right.type === 'UnaryExpression' && 
               right.operator === 'typeof' && 
               right.argument.type === 'Identifier' && 
               right.argument.name === 'window' &&
               left.type === 'Literal' && 
               left.value === 'undefined')
            ) {
              return true;
            }
          }
        }
        
        // Check for window !== undefined
        if (parent.type === 'BinaryExpression') {
          const { left, right, operator } = parent;
          if (operator === '!==' || operator === '!=') {
            if (
              (left.type === 'Identifier' && left.name === 'window' &&
               right.type === 'Identifier' && right.name === 'undefined') ||
              (right.type === 'Identifier' && right.name === 'window' &&
               left.type === 'Identifier' && left.name === 'undefined')
            ) {
              return true;
            }
          }
        }

        // Check for if (typeof window !== 'undefined') pattern
        if (parent.type === 'IfStatement' && parent.test) {
          const test = parent.test;
          if (test.type === 'BinaryExpression') {
            const { left, right, operator } = test;
            if (operator === '!==' || operator === '!=') {
              if (
                (left.type === 'UnaryExpression' && 
                 left.operator === 'typeof' && 
                 left.argument.type === 'Identifier' && 
                 left.argument.name === 'window' &&
                 right.type === 'Literal' && 
                 right.value === 'undefined') ||
                (right.type === 'UnaryExpression' && 
                 right.operator === 'typeof' && 
                 right.argument.type === 'Identifier' && 
                 right.argument.name === 'window' &&
                 left.type === 'Literal' && 
                 left.value === 'undefined')
              ) {
                return true;
              }
            }
          }
        }

        parent = parent.parent;
      }
      return false;
    }

    return {
      Identifier(node) {
        if (unsafeAPIs.has(node.name)) {
          // Skip if it's a property name (right side of member expression)
          if (node.parent.type === 'MemberExpression' && node.parent.property === node && !node.parent.computed) {
            return;
          }
          
          // Skip if inside a browser check
          if (isInsideBrowserCheck(node)) {
            return;
          }

          context.report({
            node,
            message: `'${node.name}' is not available during SSR and will cause runtime errors. Consider using a browser check: if (typeof window !== 'undefined') { ... }`
          });
        }
      },

      MemberExpression(node) {
        // Handle window.localStorage, document.getElementById, etc.
        if (node.object.type === 'Identifier' && unsafeAPIs.has(node.object.name)) {
          if (isInsideBrowserCheck(node)) {
            return;
          }

          context.report({
            node: node.object,
            message: `'${node.object.name}' is not available during SSR and will cause runtime errors. Consider using a browser check: if (typeof window !== 'undefined') { ... }`
          });
        }

        // Handle direct property access like localStorage.getItem
        if (node.object.type === 'Identifier' && unsafeAPIs.has(node.object.name)) {
          if (isInsideBrowserCheck(node)) {
            return;
          }

          context.report({
            node: node.object,
            message: `'${node.object.name}' is not available during SSR and will cause runtime errors. Consider using a browser check: if (typeof window !== 'undefined') { ... }`
          });
        }
      },

      CallExpression(node) {
        // Handle direct calls like alert(), confirm(), prompt()
        if (node.callee.type === 'Identifier' && unsafeAPIs.has(node.callee.name)) {
          if (isInsideBrowserCheck(node)) {
            return;
          }

          context.report({
            node: node.callee,
            message: `'${node.callee.name}()' is not available during SSR and will cause runtime errors. Consider using a browser check: if (typeof window !== 'undefined') { ... }`
          });
        }
      }
    };
  }
};

module.exports = {
  rules: {
    'no-ssr-unsafe-apis': noSSRUnsafeAPIs
  },
  configs: {
    recommended: {
      plugins: ['no-ssr-unsafe'],
      rules: {
        'no-ssr-unsafe/no-ssr-unsafe-apis': 'error'
      }
    }
  }
};