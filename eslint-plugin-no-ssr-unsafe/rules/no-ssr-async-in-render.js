/**
 * @fileoverview Rule to prevent async operations in SSR render paths
 * @author eslint-plugin-no-ssr-unsafe
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'prevent async operations in SSR render paths that can cause rendering issues',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/your-org/eslint-plugin-no-ssr-unsafe/blob/main/docs/rules/no-ssr-async-in-render.md'
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
          allowInHandlers: {
            type: 'boolean',
            default: true
          },
          allowedAsyncMethods: {
            type: 'array',
            items: { type: 'string' },
            default: []
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      awaitInJSX: 'Await expression in JSX will block SSR rendering',
      awaitInRender: 'Await expression in component render will block SSR rendering',
      promiseInJSX: 'Promise {{method}} in JSX will not resolve during SSR',
      promiseInRender: 'Promise {{method}} in component render will not resolve during SSR',
      asyncFunctionInRender: 'Async function call in component render may not resolve during SSR'
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const allowInEffects = options.allowInEffects !== false;
    const allowInCallbacks = options.allowInCallbacks !== false;
    const allowInHandlers = options.allowInHandlers !== false;
    const allowedAsyncMethods = new Set(options.allowedAsyncMethods || []);
    
    const sourceCode = context.sourceCode || context.getSourceCode();
    
    // Track function component contexts
    const functionComponentStack = [];
    const safeContextStack = [];
    const asyncFunctionStack = [];

    /**
     * Check if we're inside a safe context
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
     * Check if we're inside an async function
     */
    function isInAsyncFunction() {
      return asyncFunctionStack.length > 0;
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
        if (parent.type === 'AssignmentExpression' && 
            parent.left.type === 'Identifier' && 
            /^[A-Z]/.test(parent.left.name)) {
          return true;
        }
      }
      
      return false;
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

    /**
     * Check if we're inside an event handler
     */
    function isInEventHandler(node) {
      if (!allowInHandlers) return false;
      
      let current = node.parent;
      while (current) {
        // Check for JSX event handler attributes (onClick, onSubmit, etc.)
        if (current.type === 'JSXAttribute' && 
            current.name.type === 'JSXIdentifier' &&
            /^on[A-Z]/.test(current.name.name)) {
          return true;
        }
        
        // Check for object properties that look like event handlers
        if (current.type === 'Property' && 
            current.key.type === 'Identifier' &&
            /^(on[A-Z]|handle[A-Z])/.test(current.key.name)) {
          return true;
        }
        
        current = current.parent;
      }
      return false;
    }

    /**
     * Check if this is a promise method call (.then, .catch, .finally)
     */
    function isPromiseMethod(node) {
      if (node.type === 'CallExpression' && 
          node.callee.type === 'MemberExpression' &&
          node.callee.property.type === 'Identifier') {
        const methodName = node.callee.property.name;
        return ['then', 'catch', 'finally'].includes(methodName) && 
               !allowedAsyncMethods.has(methodName);
      }
      return false;
    }

    /**
     * Check if this is a call to an async function
     */
    function isAsyncFunctionCall(node) {
      if (node.type !== 'CallExpression') return false;
      
      // Check if calling a function that's marked as async
      if (node.callee.type === 'Identifier') {
        try {
          const scope = sourceCode.getScope ? sourceCode.getScope(node) : context.getScope();
          const variable = scope.set.get(node.callee.name);
          if (variable && variable.defs.length > 0) {
            const def = variable.defs[0];
            if (def.node.type === 'FunctionDeclaration' || 
                def.node.type === 'FunctionExpression' ||
                def.node.type === 'ArrowFunctionExpression') {
              return def.node.async;
            }
          }
        } catch (e) {
          // Fallback if scope access fails
          return false;
        }
      }
      
      return false;
    }

    return {
      // Track function components
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
        if (isReactComponent(node)) {
          functionComponentStack.push(node);
        }
        
        if (node.async) {
          asyncFunctionStack.push(node);
        }
      },

      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression:exit'(node) {
        if (functionComponentStack[functionComponentStack.length - 1] === node) {
          functionComponentStack.pop();
        }
        
        if (asyncFunctionStack[asyncFunctionStack.length - 1] === node) {
          asyncFunctionStack.pop();
        }
      },

      // Track safe contexts (useEffect, useCallback, etc.)
      CallExpression(node) {
        // Track hook calls for safe contexts
        if (node.callee.type === 'Identifier' && /^use[A-Z]/.test(node.callee.name)) {
          const hookName = node.callee.name;
          if ((allowInEffects && (hookName === 'useEffect' || hookName === 'useLayoutEffect')) ||
              (allowInCallbacks && (hookName === 'useCallback' || hookName === 'useMemo'))) {
            safeContextStack.push(node);
          }
        }

        // Check for promise method calls (.then, .catch, .finally)
        if (isPromiseMethod(node) && 
            !isInSafeContext() && 
            !isInReactHook(node) && 
            !isInEventHandler(node)) {
          
          const methodName = node.callee.property.name;
          
          if (isInJSX(node)) {
            context.report({
              node,
              messageId: 'promiseInJSX',
              data: { method: `.${methodName}()` }
            });
          } else if (isInComponentReturn(node)) {
            context.report({
              node,
              messageId: 'promiseInRender',
              data: { method: `.${methodName}()` }
            });
          }
        }

        // Check for async function calls
        if (isAsyncFunctionCall(node) && 
            !isInSafeContext() && 
            !isInReactHook(node) && 
            !isInEventHandler(node)) {
          
          if (isInJSX(node) || isInComponentReturn(node)) {
            context.report({
              node,
              messageId: 'asyncFunctionInRender'
            });
          }
        }
      },

      'CallExpression:exit'(node) {
        if (safeContextStack[safeContextStack.length - 1] === node) {
          safeContextStack.pop();
        }
      },

      // Check for await expressions
      AwaitExpression(node) {
        if (!isInSafeContext() && 
            !isInReactHook(node) && 
            !isInEventHandler(node)) {
          
          if (isInJSX(node)) {
            context.report({
              node,
              messageId: 'awaitInJSX'
            });
          } else if (isInComponentReturn(node)) {
            context.report({
              node,
              messageId: 'awaitInRender'
            });
          }
        }
      }
    };
  }
};