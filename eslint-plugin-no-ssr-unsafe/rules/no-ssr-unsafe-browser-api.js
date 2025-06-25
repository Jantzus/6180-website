// eslint-plugin-no-ssr-unsafe/rules/no-ssr-unsafe-browser-api.js

/**
 * Conservative ESLint rule improvements for SSR-safe browser API detection
 * Focus: Reduce false positives while maintaining strong SSR error detection
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
  /SSRSafe/i,           // SSR-safe utilities (NEW)
  /ClientOnly/i,        // Client-only utilities (NEW)
  /BrowserSafe/i,       // Browser-safe utilities (NEW)
];

const EVENT_HANDLER_PATTERN = /^on[A-Z]/; // onClick, onSubmit, etc.

/**
 * File classification - more conservative, but with better utility detection
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
    
    // SSR-safe utility patterns (NEW)
    /ssr[-_]?safe/i,
    /client[-_]?only/i,
    /browser[-_]?safe/i,
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
 * Enhanced client-side check detection (NEW IMPROVEMENT)
 */
function isInClientSideCheck(node) {
  let current = node.parent;
  let depth = 0;
  const MAX_DEPTH = 8;
  
  while (current && depth < MAX_DEPTH) {
    depth++;
    
    // Check for explicit client-side checks
    if (current.type === 'IfStatement' && hasClientSideCheck(current.test)) {
      return true;
    }
    
    // Check for ternary client-side checks
    if (current.type === 'ConditionalExpression' && hasClientSideCheck(current.test)) {
      return true;
    }
    
    // Check for logical && with client check
    if (current.type === 'LogicalExpression' && 
        current.operator === '&&' && 
        hasClientSideCheck(current.left)) {
      return true;
    }
    
    // Check for early return patterns (NEW)
    if (isEarlyReturnPattern(current)) {
      return true;
    }
    
    current = current.parent;
  }
  
  return false;
}

/**
 * Detect client-side check patterns (IMPROVED)
 */
function hasClientSideCheck(condition) {
  if (!condition) return false;
  
  const conditionText = getNodeText(condition);
  
  // More specific client-side check patterns
  const clientCheckPatterns = [
    // TypeScript/JavaScript environment checks
    /typeof\s+window\s*[!=]==?\s*['"]undefined['"]/,
    /typeof\s+document\s*[!=]==?\s*['"]undefined['"]/,
    /typeof\s+navigator\s*[!=]==?\s*['"]undefined['"]/,
    /window\s*[!=]==?\s*undefined/,
    /document\s*[!=]==?\s*undefined/,
    
    // Common SSR guard patterns
    /isClient\s*[!=]==?\s*(true|false)/,
    /isBrowser\s*[!=]==?\s*(true|false)/,
    /isServer\s*[!=]==?\s*(true|false)/,
    /hasWindow\s*[!=]==?\s*(true|false)/,
    
    // Logical patterns
    /window\s*&&/,
    /document\s*&&/,
    /navigator\s*&&/,
    
    // Process/environment checks
    /process\.browser/,
    /process\.client/,
    /typeof\s+process\s*[!=]==?\s*['"]undefined['"]/,
  ];
  
  return clientCheckPatterns.some(pattern => pattern.test(conditionText));
}

/**
 * Detect early return patterns for SSR safety (NEW)
 */
function isEarlyReturnPattern(node) {
  // Look for early return statements with client checks
  if (node.type === 'ReturnStatement') {
    // Check if this return is at the beginning of a function
    const parent = node.parent;
    if (parent?.type === 'BlockStatement') {
      const statements = parent.body;
      const returnIndex = statements.indexOf(node);
      
      // If it's one of the first few statements, check for client guards
      if (returnIndex <= 2) {
        // Look for client check patterns in preceding statements
        for (let i = 0; i < returnIndex; i++) {
          const stmt = statements[i];
          if (hasClientCheckInStatement(stmt)) {
            return true;
          }
        }
      }
    }
  }
  
  return false;
}

/**
 * Check if a statement contains client-side checks (NEW)
 */
function hasClientCheckInStatement(statement) {
  const stmtText = getNodeText(statement);
  
  const earlyReturnPatterns = [
    /if\s*\(\s*!isClient\s*\)/,
    /if\s*\(\s*!isBrowser\s*\)/,
    /if\s*\(\s*isServer\s*\)/,
    /if\s*\(\s*typeof\s+window\s*===?\s*['"]undefined['"]\s*\)/,
    /if\s*\(\s*!window\s*\)/,
  ];
  
  return earlyReturnPatterns.some(pattern => pattern.test(stmtText));
}

/**
 * Enhanced safe context detection with new client-side check detection
 */
function isInSafeContext(node) {
  let current = node.parent;
  let depth = 0;
  const MAX_DEPTH = 15;
  
  while (current && depth < MAX_DEPTH) {
    depth++;
    
    // 1. CLIENT-SIDE CHECKS (NEW - HIGHEST PRIORITY)
    if (isInClientSideCheck(node)) {
      return true;
    }
    
    // 2. React effect hooks and callbacks
    if (isInReactSafeHook(current)) {
      return true;
    }
    
    // 3. Event handler props in JSX
    if (isEventHandlerProp(current)) {
      return true;
    }
    
    // 4. Event handler function assignments
    if (isEventHandlerFunction(current)) {
      return true;
    }
    
    // 5. Browser API method calls (addEventListener, etc.)
    if (isBrowserAPIMethod(current)) {
      return true;
    }
    
    // 6. Try-catch blocks (feature detection)
    if (current.type === 'TryStatement') {
      return true;
    }
    
    // 7. Async execution contexts
    if (isAsyncContext(current)) {
      return true;
    }
    
    // 8. Modal/portal mounting contexts
    if (isModalContext(current)) {
      return true;
    }
    
    // 9. Conditional execution based on user interaction
    if (isUserInteractionConditional(current)) {
      return true;
    }
    
    current = current.parent;
  }
  
  return false;
}

/**
 * Enhanced React hook detection (IMPROVED)
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
  
  // Check if we're inside any hook callback function (IMPROVED)
  let current = node.parent;
  let hookDepth = 0;
  const MAX_HOOK_DEPTH = 5;
  
  while (current && hookDepth < MAX_HOOK_DEPTH) {
    hookDepth++;
    
    if (current.type === 'CallExpression' && 
        current.callee?.type === 'Identifier' &&
        SAFE_HOOKS.has(current.callee.name)) {
      return true;
    }
    
    current = current.parent;
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
 * Enhanced event handler function detection (IMPROVED)
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
 * Enhanced guard detection - more permissive but still conservative (IMPROVED)
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
 * Enhanced guard detection with better patterns (IMPROVED)
 */
function hasAnyGuard(condition) {
  if (!condition) return false;
  
  // Check for any browser API checks
  const conditionText = getNodeText(condition);
  const guardPatterns = [
    // Standard typeof checks
    /typeof.*window/i,
    /typeof.*document/i,
    /typeof.*navigator/i,
    /window.*undefined/i,
    /document.*undefined/i,
    
    // Logical checks
    /window\s*&&/i,
    /document\s*&&/i,
    /navigator\s*&&/i,
    
    // Conditional checks
    /if.*window/i,
    /if.*document/i,
    
    // Environment checks
    /browser/i,
    /client/i,
    /server/i,
    
    // Common SSR patterns (NEW)
    /isClient/i,
    /isBrowser/i,
    /isServer/i,
    /hasWindow/i,
    /process\.browser/i,
    /process\.client/i,
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
          },
          enhancedClientDetection: {
            type: 'boolean',
            default: true,
            description: 'Enable enhanced client-side check detection'
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
      debugMode = false,
      enhancedClientDetection = true
    } = options;
    
    const filename = context.getFilename();
    const fileType = getFileType(filename);

    function shouldFlag(node) {
      // 1. File-type based early returns
      if (fileType === 'utility' && utilityLeniency) {
        // For utility files, only flag in strict mode
        return strictMode;
      }
      
      // 2. Enhanced client-side check detection (NEW)
      if (enhancedClientDetection && isInClientSideCheck(node)) {
        if (debugMode) {
          console.log(`CLIENT-SIDE CHECK: ${getApiName(node)} at ${filename}`);
        }
        return false;
      }
      
      // 3. Check if in any safe execution context
      if (isInSafeContext(node)) {
        if (debugMode) {
          console.log(`SAFE CONTEXT: ${getApiName(node)} at ${filename}`);
        }
        return false;
      }
      
      // 4. Check if properly guarded
      if (allowGuarded && isWithinGuard(node)) {
        if (debugMode) {
          console.log(`GUARDED: ${getApiName(node)} at ${filename}`);
        }
        return false;
      }
      
      // 5. Flag it
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