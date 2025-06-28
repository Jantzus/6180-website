/**
 * @fileoverview Rule to prevent non-deterministic expressions in SSR contexts
 * @author eslint-plugin-no-ssr-unsafe
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const NONDETERMINISTIC_PATTERNS = [
  // Math methods
  { object: 'Math', method: 'random' },
  { object: 'Math', method: 'floor', requiresRandomArg: true },
  { object: 'Math', method: 'ceil', requiresRandomArg: true },
  { object: 'Math', method: 'round', requiresRandomArg: true },
  
  // Date methods
  { object: 'Date', method: 'now' },
  { constructor: 'Date' },
  
  // Performance API
  { object: 'performance', method: 'now' },
  
  // Crypto API
  { object: 'crypto', method: 'getRandomValues' },
  
  // Other nondeterministic functions
  { global: 'setTimeout' },
  { global: 'setInterval' },
];

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'prevent non-deterministic expressions that cause SSR hydration mismatches',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/your-org/eslint-plugin-no-ssr-unsafe/blob/main/docs/rules/no-ssr-nondeterministic-expressions.md'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowInEffects: {
            type: 'boolean',
            default: true
          },
          allowInCallbacks: {
            type: 'boolean', 
            default: true
          },
          customNondeterministicPatterns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                object: { type: 'string' },
                method: { type: 'string' },
                global: { type: 'string' },
                constructor: { type: 'string' }
              }
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      nondeterministicInJSX: 'Non-deterministic expression {{expression}} in JSX will cause hydration mismatch',
      nondeterministicInRender: 'Non-deterministic expression {{expression}} in component render will cause hydration mismatch',
      nondeterministicVariable: 'Variable {{variable}} contains non-deterministic value and is used in JSX'
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const allowInEffects = options.allowInEffects !== false;
    const allowInCallbacks = options.allowInCallbacks !== false;
    const customPatterns = options.customNondeterministicPatterns || [];
    const allPatterns = [...NONDETERMINISTIC_PATTERNS, ...customPatterns];
    
    const sourceCode = context.sourceCode || context.getSourceCode();
    const nondeterministicVariables = new Set();
    const jsxVariables = new Set();
    
    // Track function component contexts
    const functionComponentStack = [];
    const safeContextStack = [];

    /**
     * Check if we're inside a safe context (useEffect, useCallback, etc.)
     */
    function isInSafeContext() {
      return safeContextStack.length > 0;
    }

    /**
     * Check if we're inside a React function component
     */
    function isInFunctionComponent() {
      return functionComponentStack.length > 0;
    }

    /**
     * Check if a function appears to be a React component
     */
    function isReactComponent(node) {
      if (node.type === 'FunctionDeclaration') {
        return /^[A-Z]/.test(node.id?.name);
      }
      
      if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
        const parent = node.parent;
        if (parent.type === 'VariableDeclarator' && /^[A-Z]/.test(parent.id?.name)) {
          return true;
        }
        if (parent.type === 'Property' && /^[A-Z]/.test(parent.key?.name)) {
          return true;
        }
      }
      
      return false;
    }

    /**
     * Check if a call expression matches a nondeterministic pattern
     */
    function isNondeterministicCall(node) {
      if (node.type === 'CallExpression') {
        for (const pattern of allPatterns) {
          // Global function calls (setTimeout, setInterval)
          if (pattern.global && node.callee.type === 'Identifier' && node.callee.name === pattern.global) {
            return pattern.global;
          }
          
          // Object method calls (Math.random, Date.now)
          if (pattern.object && pattern.method && 
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type === 'Identifier' &&
              node.callee.object.name === pattern.object &&
              node.callee.property.type === 'Identifier' &&
              node.callee.property.name === pattern.method) {
            
            // Special case: Math.floor(Math.random()) etc.
            if (pattern.requiresRandomArg) {
              const hasRandomArg = node.arguments.some(arg => 
                isNondeterministicCall(arg) === 'Math.random'
              );
              if (hasRandomArg) {
                return `${pattern.object}.${pattern.method}`;
              }
            } else {
              return `${pattern.object}.${pattern.method}`;
            }
          }
        }
      }
      
      // Constructor calls (new Date())
      if (node.type === 'NewExpression') {
        for (const pattern of allPatterns) {
          if (pattern.constructor && 
              node.callee.type === 'Identifier' && 
              node.callee.name === pattern.constructor) {
            return `new ${pattern.constructor}`;
          }
        }
      }
      
      return null;
    }

    /**
     * Check if we're inside JSX
     */
    function isInJSX(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'JSXExpressionContainer' || 
            current.type === 'JSXElement' || 
            current.type === 'JSXFragment') {
          return true;
        }
        current = current.parent;
      }
      return false;
    }

    /**
     * Check if we're in a component's return statement
     */
    function isInComponentReturn(node) {
      if (!isInFunctionComponent()) return false;
      
      let current = node.parent;
      while (current && current !== functionComponentStack[functionComponentStack.length - 1]) {
        if (current.type === 'ReturnStatement') {
          return true;
        }
        current = current.parent;
      }
      return false;
    }

    /**
     * Check if we're inside a React hook call
     */
    function isInReactHook(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'CallExpression' && 
            current.callee.type === 'Identifier' &&
            /^use[A-Z]/.test(current.callee.name)) {
          
          // Check specific hooks that create safe contexts
          const hookName = current.callee.name;
          if (allowInEffects && (hookName === 'useEffect' || hookName === 'useLayoutEffect')) {
            return true;
          }
          if (allowInCallbacks && (hookName === 'useCallback' || hookName === 'useMemo')) {
            return true;
          }
        }
        current = current.parent;
      }
      return false;
    }

    return {
      // Track function components
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
        if (isReactComponent(node)) {
          functionComponentStack.push(node);
        }
      },

      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression:exit'(node) {
        if (functionComponentStack[functionComponentStack.length - 1] === node) {
          functionComponentStack.pop();
        }
      },

      // Track safe contexts (useEffect, useCallback, etc.)
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && /^use[A-Z]/.test(node.callee.name)) {
          const hookName = node.callee.name;
          if ((allowInEffects && (hookName === 'useEffect' || hookName === 'useLayoutEffect')) ||
              (allowInCallbacks && (hookName === 'useCallback' || hookName === 'useMemo'))) {
            safeContextStack.push(node);
          }
        }

        // Check for nondeterministic calls
        const nondeterministicType = isNondeterministicCall(node);
        if (nondeterministicType && !isInSafeContext() && !isInReactHook(node)) {
          if (isInJSX(node)) {
            context.report({
              node,
              messageId: 'nondeterministicInJSX',
              data: { expression: nondeterministicType }
            });
          } else if (isInComponentReturn(node)) {
            context.report({
              node,
              messageId: 'nondeterministicInRender', 
              data: { expression: nondeterministicType }
            });
          }
        }
      },

      'CallExpression:exit'(node) {
        if (safeContextStack[safeContextStack.length - 1] === node) {
          safeContextStack.pop();
        }
      },

      // Track new expressions (new Date())
      NewExpression(node) {
        const nondeterministicType = isNondeterministicCall(node);
        if (nondeterministicType && !isInSafeContext() && !isInReactHook(node)) {
          if (isInJSX(node)) {
            context.report({
              node,
              messageId: 'nondeterministicInJSX',
              data: { expression: nondeterministicType }
            });
          } else if (isInComponentReturn(node)) {
            context.report({
              node,
              messageId: 'nondeterministicInRender',
              data: { expression: nondeterministicType }
            });
          }
        }
      },

      // Track variable assignments with nondeterministic values
      VariableDeclarator(node) {
        if (node.init && !isInSafeContext()) {
          const nondeterministicType = isNondeterministicCall(node.init);
          if (nondeterministicType && node.id.type === 'Identifier') {
            nondeterministicVariables.add(node.id.name);
          }
        }
      },

      // Track variables used in JSX
      JSXExpressionContainer(node) {
        if (node.expression.type === 'Identifier') {
          jsxVariables.add(node.expression.name);
        }
      },

      // Report variables with nondeterministic values used in JSX
      'Program:exit'() {
        for (const variable of nondeterministicVariables) {
          if (jsxVariables.has(variable)) {
            // Find the variable declaration to report on
            const scope = sourceCode.getScope ? sourceCode.getScope(context.getAncestors()[0]) : context.getScope();
            const variableObj = scope.set.get(variable);
            if (variableObj && variableObj.defs.length > 0) {
              const def = variableObj.defs[0];
              context.report({
                node: def.node,
                messageId: 'nondeterministicVariable',
                data: { variable }
              });
            }
          }
        }
      }
    };
  }
};