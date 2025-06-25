// eslint-plugin-no-ssr-unsafe/rules/no-ssr-unsafe-browser-api.js

/**
 * Fixed ESLint rule for SSR-safe browser API detection
 * Focus: Much more aggressive safe context detection to reduce false positives
 */

const BROWSER_APIS = new Set([
  'window',
  'document', 
  'navigator',
  'location',
  'history',
  'localStorage',
  'sessionStorage',
  'alert',
  'confirm',
  'prompt',
  'screen',
  'performance'
]);

const SAFE_HOOKS = new Set([
  'useEffect',
  'useLayoutEffect',
  'useCallback',
  'useMemo',
  'useRef'
]);

const SAFE_FUNCTION_PATTERNS = [
  /handle[A-Z]/,        // handleClick, handleSubmit
  /on[A-Z]/,            // onClick, onSubmit  
  /_handle/,            // _handleClick
  /callback/i,          // callback, onCallback
  /handler/i,           // clickHandler, eventHandler
  /listener/i,          // eventListener
  /^set[A-Z]/,         // setState functions
  /cleanup/i,           // cleanup functions
  /mount/i,             // onMount, mountHandler
  /unmount/i,           // onUnmount, unmountHandler
];

const EVENT_HANDLER_PATTERN = /^on[A-Z]/; // onClick, onSubmit, etc.

/**
 * File classification - much more lenient
 */
function getFileType(filename) {
  const utilityPatterns = [
    // Utility directories
    /[\/\\]utils?[\/\\]/,
    /[\/\\]helpers?[\/\\]/,
    /[\/\\]services?[\/\\]/,
    /[\/\\]lib[\/\\]/,
    /[\/\\]api[\/\\]/,
    /[\/\\]hooks?[\/\\]/,
    /[\/\\]shared[\/\\]/,
    /[\/\\]common[\/\\]/,
    
    // Utility file patterns
    /-?utils?\.tsx?$/,
    /-?helpers?\.tsx?$/,
    /-?services?\.tsx?$/,
    /-?api\.tsx?$/,
    /-?hooks?\.tsx?$/,
    /\.utils?\.tsx?$/,
    /\.helpers?\.tsx?$/,
    /\.services?\.tsx?$/,
    /\.api\.tsx?$/,
    /\.hook\.tsx?$/,
    /use[A-Z].*\.tsx?$/,  // useLocalStorage.ts, etc.
  ];
  
  // If it matches utility patterns, it's utility
  if (utilityPatterns.some(pattern => pattern.test(filename))) {
    return 'utility';
  }
  
  // .ts files are utilities unless explicitly components
  if (filename.endsWith('.ts')) {
    return 'utility';
  }
  
  // .tsx files are components
  return 'component';
}

/**
 * Enhanced safe context detection with much more aggressive detection
 */
function isInSafeContext(node) {
  let current = node.parent;
  let depth = 0;
  const MAX_DEPTH = 15; // Increased from 8
  
  while (current && depth < MAX_DEPTH) {
    depth++;
    
    // 1. React effect hooks and callbacks
    if (isInReactSafeHook(current)) {
      return true;
    }
    
    // 2. Event handler props in JSX
    if (isEventHandlerProp(current)) {
      return true;
    }
    
    // 3. Event handler function assignments
    if (isEventHandlerFunction(current)) {
      return true;
    }
    
    // 4. Browser API method calls (addEventListener, etc.)
    if (isBrowserAPIMethod(current)) {
      return true;
    }
    
    // 5. Try-catch blocks (feature detection)
    if (current.type === 'TryStatement') {
      return true;
    }
    
    // 6. Async execution contexts
    if (isAsyncContext(current)) {
      return true;
    }
    
    // 7. Modal/portal mounting contexts
    if (isModalContext(current)) {
      return true;
    }
    
    // 8. Conditional execution based on user interaction
    if (isUserInteractionConditional(current)) {
      return true;
    }
    
    current = current.parent;
  }
  
  return false;
}

/**
 * Detect React safe hooks more reliably
 */
function isInReactSafeHook(node) {
  if (node.type === 'CallExpression' && node.callee) {
    // Direct hook calls: useEffect(() => { ... })
    if (node.callee.type === 'Identifier' && SAFE_HOOKS.has(node.callee.name)) {
      return true;
    }
    
    // React.useEffect calls
    if (node.callee.type === 'MemberExpression' && 
        node.callee.object?.name === 'React' &&
        node.callee.property?.name && 
        SAFE_HOOKS.has(node.callee.property.name)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detect JSX event handler props
 */
function isEventHandlerProp(node) {
  if (node.type === 'JSXAttribute' && 
      node.name?.type === 'JSXIdentifier' &&
      EVENT_HANDLER_PATTERN.test(node.name.name)) {
    return true;
  }
  
  // Object properties that are event handlers
  if (node.type === 'Property' && 
      node.key?.type === 'Identifier' &&
      EVENT_HANDLER_PATTERN.test(node.key.name)) {
    return true;
  }
  
  return false;
}

/**
 * Detect event handler function patterns
 */
function isEventHandlerFunction(node) {
  // Variable declarations with handler patterns
  if (node.type === 'VariableDeclarator' && 
      node.id?.name && 
      SAFE_FUNCTION_PATTERNS.some(pattern => pattern.test(node.id.name))) {
    return true;
  }
  
  // Function declarations with handler patterns
  if (node.type === 'FunctionDeclaration' && 
      node.id?.name && 
      SAFE_FUNCTION_PATTERNS.some(pattern => pattern.test(node.id.name))) {
    return true;
  }
  
  // Arrow functions assigned to variables with handler patterns
  if (node.type === 'ArrowFunctionExpression' && 
      node.parent?.type === 'VariableDeclarator' &&
      node.parent.id?.name &&
      SAFE_FUNCTION_PATTERNS.some(pattern => pattern.test(node.parent.id.name))) {
    return true;
  }
  
  return false;
}

/**
 * Detect browser API method contexts (addEventListener, etc.)
 */
function isBrowserAPIMethod(node) {
  if (node.type === 'CallExpression' && 
      node.callee?.type === 'MemberExpression') {
    
    const methodName = node.callee.property?.name;
    const safeMethods = [
      'addEventListener',
      'removeEventListener', 
      'appendChild',
      'removeChild',
      'createElement',
      'getElementById',
      'querySelector',
      'querySelectorAll'
    ];
    
    if (safeMethods.includes(methodName)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detect async execution contexts
 */
function isAsyncContext(node) {
  if (node.type === 'CallExpression' && node.callee?.type === 'Identifier') {
    const asyncFunctions = [
      'setTimeout', 
      'setInterval', 
      'requestAnimationFrame', 
      'requestIdleCallback',
      'queueMicrotask'
    ];
    
    if (asyncFunctions.includes(node.callee.name)) {
      return true;
    }
  }
  
  // Promise callbacks
  if (node.type === 'CallExpression' && 
      node.callee?.type === 'MemberExpression' &&
      node.callee.property?.name) {
    const promiseMethods = ['then', 'catch', 'finally'];
    if (promiseMethods.includes(node.callee.property.name)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detect modal/portal mounting contexts
 */
function isModalContext(node) {
  // Look for common modal patterns
  if (node.type === 'VariableDeclarator' && 
      node.id?.name && 
      /modal|portal|overlay|popup|dialog/i.test(node.id.name)) {
    return true;
  }
  
  // Component names with modal patterns
  if (node.type === 'JSXElement' && 
      node.openingElement?.name?.name &&
      /modal|portal|overlay|popup|dialog/i.test(node.openingElement.name.name)) {
    return true;
  }
  
  return false;
}

/**
 * Detect conditionals based on user interaction
 */
function isUserInteractionConditional(node) {
  if (node.type === 'IfStatement' || node.type === 'ConditionalExpression') {
    const condition = node.test;
    if (hasUserInteractionPattern(condition)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if condition involves user interaction patterns
 */
function hasUserInteractionPattern(node) {
  if (!node) return false;
  
  const userPatterns = [
    /click/i, /press/i, /tap/i, /select/i, /choose/i,
    /submit/i, /confirm/i, /accept/i, /approve/i,
    /modal/i, /open/i, /visible/i, /show/i, /active/i,
    /user/i, /interaction/i, /event/i
  ];
  
  const nodeText = getNodeText(node);
  return userPatterns.some(pattern => pattern.test(nodeText));
}

/**
 * Extract text from node for pattern matching
 */
function getNodeText(node) {
  if (!node) return '';
  
  let text = '';
  
  function traverse(n) {
    if (!n) return;
    
    if (n.type === 'Identifier') {
      text += n.name + ' ';
    } else if (n.type === 'Literal') {
      text += String(n.value) + ' ';
    }
    
    // Traverse child nodes
    for (const key in n) {
      if (key === 'parent') continue;
      const child = n[key];
      if (Array.isArray(child)) {
        child.forEach(traverse);
      } else if (child && typeof child === 'object') {
        traverse(child);
      }
    }
  }
  
  traverse(node);
  return text;
}

/**
 * Enhanced guard detection - much more permissive
 */
function isWithinGuard(node) {
  let current = node.parent;
  let depth = 0;
  const MAX_DEPTH = 10;
  
  while (current && depth < MAX_DEPTH) {
    depth++;
    
    // If statement with any kind of guard
    if (current.type === 'IfStatement' && hasAnyGuard(current.test)) {
      return true;
    }
    
    // Ternary with any kind of guard
    if (current.type === 'ConditionalExpression' && hasAnyGuard(current.test)) {
      return true;
    }
    
    // Logical && with guard on left
    if (current.type === 'LogicalExpression' && 
        current.operator === '&&' && 
        hasAnyGuard(current.left)) {
      return true;
    }
    
    current = current.parent;
  }
  
  return false;
}

/**
 * Very permissive guard detection
 */
function hasAnyGuard(condition) {
  if (!condition) return false;
  
  // Check for any browser API checks
  const conditionText = getNodeText(condition);
  const guardPatterns = [
    /typeof.*window/i,
    /typeof.*document/i,
    /typeof.*navigator/i,
    /window.*undefined/i,
    /document.*undefined/i,
    /window\s*&&/i,
    /document\s*&&/i,
    /navigator\s*&&/i,
    /if.*window/i,
    /if.*document/i,
    /browser/i,
    /client/i,
    /server/i
  ];
  
  return guardPatterns.some(pattern => pattern.test(conditionText));
}

/**
 * Get human-readable API name for error messages
 */
function getApiName(node) {
  if (node.type === 'Identifier') {
    return node.name;
  }
  
  if (node.type === 'MemberExpression' && node.object?.type === 'Identifier') {
    const objName = node.object.name;
    const propName = node.property?.type === 'Identifier' ? 
                    node.property.name : '[computed]';
    return `${objName}.${propName}`;
  }
  
  if (node.type === 'CallExpression') {
    if (node.callee?.type === 'Identifier') {
      return `${node.callee.name}()`;
    }
    if (node.callee?.type === 'MemberExpression') {
      return getApiName(node.callee) + '()';
    }
  }
  
  return 'browser API';
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow SSR-breaking browser API usage with enhanced safe context detection',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://nextjs.org/docs/messages/react-hydration-error'
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowGuarded: { 
            type: 'boolean',
            default: true,
            description: 'Allow browser APIs when properly guarded'
          },
          strictMode: { 
            type: 'boolean',
            default: false,
            description: 'Enable stricter checking'
          },
          utilityLeniency: {
            type: 'boolean',
            default: true,
            description: 'Be very lenient with utility files'
          },
          debugMode: {
            type: 'boolean',
            default: false,
            description: 'Enable debug logging'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      ssrUnsafe: 'Browser API "{{apiName}}" used during render will cause hydration mismatch. Move to useEffect, add typeof guard, or use in event handler.',
      ssrUnsafeStrict: 'Browser API "{{apiName}}" may cause SSR issues. Consider moving to useEffect or adding proper guards.',
      ssrUnsafeUtility: 'Browser API "{{apiName}}" in utility file should be called from safe contexts only.'
    },
    fixable: 'code'
  },

  create(context) {
    const options = context.options[0] || {};
    const { 
      allowGuarded = true, 
      strictMode = false, 
      utilityLeniency = true,
      debugMode = false
    } = options;
    
    const filename = context.getFilename();
    const fileType = getFileType(filename);

    function shouldFlag(node) {
      // 1. File-type based early returns
      if (fileType === 'utility' && utilityLeniency) {
        // For utility files, only flag in strict mode
        return strictMode;
      }
      
      // 2. Check if in any safe execution context
      if (isInSafeContext(node)) {
        if (debugMode) {
          console.log(`SAFE CONTEXT: ${getApiName(node)} at ${filename}`);
        }
        return false;
      }
      
      // 3. Check if properly guarded
      if (allowGuarded && isWithinGuard(node)) {
        if (debugMode) {
          console.log(`GUARDED: ${getApiName(node)} at ${filename}`);
        }
        return false;
      }
      
      // 4. Flag it
      if (debugMode) {
        console.log(`FLAGGING: ${getApiName(node)} at ${filename}`);
      }
      return true;
    }

    function getMessageId() {
      if (fileType === 'utility') {
        return 'ssrUnsafeUtility';
      }
      return strictMode ? 'ssrUnsafeStrict' : 'ssrUnsafe';
    }

    function reportNode(node) {
      if (!shouldFlag(node)) return;
      
      const apiName = getApiName(node);
      const messageId = getMessageId();
      
      context.report({
        node,
        messageId,
        data: { apiName }
      });
    }

    return {
      // Check direct API references (window, document, etc.)
      Identifier(node) {
        if (BROWSER_APIS.has(node.name)) {
          reportNode(node);
        }
      },

      // Check API property access (window.location, document.body, etc.)
      MemberExpression(node) {
        if (node.object?.type === 'Identifier' && BROWSER_APIS.has(node.object.name)) {
          reportNode(node);
        }
      },

      // Check API method calls (alert(), localStorage.getItem(), etc.)
      CallExpression(node) {
        // Direct calls (alert, confirm, etc.)
        if (node.callee?.type === 'Identifier' && BROWSER_APIS.has(node.callee.name)) {
          reportNode(node);
        }
        
        // Method calls (localStorage.getItem, etc.)
        if (node.callee?.type === 'MemberExpression' && 
            node.callee.object?.type === 'Identifier' &&
            BROWSER_APIS.has(node.callee.object.name)) {
          reportNode(node);
        }
      }
    };
  }
};