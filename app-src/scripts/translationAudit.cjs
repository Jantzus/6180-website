#!/usr/bin/env node

/**
 * Focused Translation Audit Script with Line Number Tracking
 * 
 * Scans codebase specifically for t(), tSync(), and tAsync() function calls:
 * 1. All translation keys used in code (WITH LINE NUMBERS)
 * 2. Missing translations in language files
 * 3. Unused translations (orphaned keys)
 * 4. Inconsistencies across languages
 * 5. Duplicate keys and potential issues
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

class FocusedTranslationAuditor {
  constructor(options = {}) {
    // Configurable paths
    this.srcPath = path.resolve(options.srcPath || './src');
    this.languagesPath = path.resolve(options.languagesPath || './src/lib/i18n/translations');
    this.outputDir = path.resolve(options.outputDir || './translationAudit');
    this.outputPath = path.join(this.outputDir, 'translation-audit-report.json');
    this.excludePaths = options.excludePaths || ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
    
    // All translation keys found in code
    this.keysInCode = new Set();
    this.keyUsageMap = new Map(); // key -> [{ file, line, column, context }]
    this.keyContextMap = new Map(); // key -> detailed context info
    
    // Translation data
    this.languageFiles = new Map(); // lang -> translations object
    this.allLanguages = [];
    
    // Results
    this.missingTranslations = new Map(); // lang -> [missing keys]
    this.unusedTranslations = new Map(); // lang -> [unused keys]
    this.inconsistentKeys = new Set(); // keys that exist in some langs but not others
    this.duplicateKeys = new Map(); // potential duplicate translations
    
    // FOCUSED: Only these three translation functions
    this.translationFunctions = new Set(['t', 'tSync', 'tAsync']);
    
    // Statistics
    this.stats = {
      filesScanned: 0,
      filesWithKeys: 0,
      totalKeyInstances: 0,
      functionCallBreakdown: {
        t: 0,
        tSync: 0,
        tAsync: 0
      },
      scanStartTime: Date.now()
    };
    
    // Ensure output directory exists
    this.ensureOutputDirectory();
    
    console.log('🔍 Starting FOCUSED Translation Audit (t, tSync, tAsync only)...');
    console.log(`📁 Source path: ${this.srcPath}`);
    console.log(`📚 Languages path: ${this.languagesPath}`);
    console.log(`📊 Output directory: ${this.outputDir}`);
    console.log(`🎯 Target functions: ${Array.from(this.translationFunctions).join(', ')}`);
    console.log(`📊 Exclude paths: ${this.excludePaths.join(', ')}`);
    console.log('='.repeat(60));
  }

  /**
   * Ensure output directory exists
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${this.outputDir}`);
    }
  }

  /**
   * Enhanced file scanner with better filtering
   */
  scanAllFiles(dirPath, depth = 0) {
    const files = [];
    
    if (!fs.existsSync(dirPath)) {
      console.warn(`⚠️  Directory not found: ${dirPath}`);
      return files;
    }
    
    // Prevent infinite recursion
    if (depth > 10) {
      console.warn(`⚠️  Max depth reached for: ${dirPath}`);
      return files;
    }
    
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          // Skip excluded directories
          if (this.excludePaths.includes(entry.name) || entry.name.startsWith('.')) {
            continue;
          }
          files.push(...this.scanAllFiles(fullPath, depth + 1));
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (['.tsx', '.ts', '.jsx', '.js', '.vue', '.svelte'].includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error reading directory ${dirPath}:`, error.message);
    }
    
    return files;
  }

  /**
   * FOCUSED: Extract keys only from t(), tSync(), and tAsync() calls
   */
  extractKeysFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const sourceFile = ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true
      );
      
      const keys = [];
      const relativePath = path.relative('.', filePath);
      
      const visit = (node) => {
        try {
          // Handle function calls - FOCUSED on our three functions only
          if (ts.isCallExpression(node)) {
            this.extractFromFocusedCallExpression(node, keys, relativePath, sourceFile);
          }
          
          // Handle JSX attributes (e.g., placeholder={t('key')})
          if (ts.isJsxAttribute(node)) {
            this.extractFromJsxAttribute(node, keys, relativePath, sourceFile);
          }
          
          // Continue traversing
          ts.forEachChild(node, visit);
        } catch (error) {
          // Continue parsing even if a node fails
          console.warn(`⚠️  Error parsing node in ${filePath}:`, error.message);
        }
      };
      
      visit(sourceFile);
      return keys;
      
    } catch (error) {
      console.error(`❌ Error parsing ${filePath}:`, error.message);
      return [];
    }
  }

  /**
   * Get line and column information from a TypeScript node
   */
  getPositionInfo(node, sourceFile) {
    const start = node.getStart(sourceFile);
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(start);
    return {
      line: line + 1, // Convert to 1-based line numbering
      column: character + 1, // Convert to 1-based column numbering
      position: start
    };
  }

  /**
   * FOCUSED: Extract keys only from t(), tSync(), and tAsync() calls
   */
  extractFromFocusedCallExpression(node, keys, filePath, sourceFile) {
    const expression = node.expression;
    let functionName = null;
    
    // Direct calls: t('key'), tSync('key'), tAsync('key')
    if (ts.isIdentifier(expression) && this.translationFunctions.has(expression.text)) {
      functionName = expression.text;
    }
    
    // Property access calls: context.t('key'), i18n.tSync('key'), etc.
    else if (ts.isPropertyAccessExpression(expression)) {
      const propertyName = expression.name.text;
      if (this.translationFunctions.has(propertyName)) {
        functionName = propertyName;
      }
    }
    
    // Object destructuring calls: { t } = useTranslation(); t('key')
    else if (ts.isIdentifier(expression)) {
      const text = expression.text;
      if (this.translationFunctions.has(text)) {
        functionName = text;
      }
    }
    
    // If we found a matching function, extract the key
    if (functionName) {
      this.extractKeyFromArguments(node.arguments, keys, filePath, functionName, sourceFile, node);
      
      // Track function usage statistics
      this.stats.functionCallBreakdown[functionName]++;
    }
    
    // Recursively check nested calls (but only for our target functions)
    node.arguments.forEach(arg => {
      if (ts.isCallExpression(arg)) {
        this.extractFromFocusedCallExpression(arg, keys, filePath, sourceFile);
      }
    });
  }

  /**
   * Extract keys from JSX attributes with position tracking
   */
  extractFromJsxAttribute(node, keys, filePath, sourceFile) {
    if (node.initializer && ts.isJsxExpression(node.initializer)) {
      const expression = node.initializer.expression;
      if (ts.isCallExpression(expression)) {
        this.extractFromFocusedCallExpression(expression, keys, filePath, sourceFile);
      }
    }
  }

  /**
   * Extract key from function arguments with position tracking
   */
  extractKeyFromArguments(args, keys, filePath, functionName, sourceFile, callNode) {
    if (args.length === 0) return;
    
    const firstArg = args[0];
    const position = this.getPositionInfo(callNode, sourceFile);
    
    // String literals - the most common case
    if (ts.isStringLiteral(firstArg)) {
      this.addKey(firstArg.text, keys, filePath, functionName, position);
      return;
    }
    
    // Template literals without substitutions
    if (ts.isNoSubstitutionTemplateLiteral(firstArg)) {
      this.addKey(firstArg.text, keys, filePath, functionName, position);
      return;
    }
    
    // Template expressions (basic support)
    if (ts.isTemplateExpression(firstArg)) {
      const headText = firstArg.head.text.trim();
      if (headText && this.looksLikeTranslationKey(headText)) {
        this.addKey(headText, keys, filePath, functionName, position);
      }
      return;
    }
    
    // Variable references (we can track these for potential dynamic keys)
    if (ts.isIdentifier(firstArg)) {
      // Store potential dynamic key for analysis
      this.keyContextMap.set(`__DYNAMIC__${firstArg.text}`, {
        file: filePath,
        function: functionName,
        type: 'dynamic',
        position: position,
        variableName: firstArg.text
      });
      
      console.warn(`⚠️  Dynamic key detected: ${functionName}(${firstArg.text}) at ${filePath}:${position.line}:${position.column}`);
      return;
    }
    
    // Binary expressions (e.g., 'prefix.' + variable)
    if (ts.isBinaryExpression(firstArg)) {
      console.warn(`⚠️  Complex key expression detected: ${functionName}(...) at ${filePath}:${position.line}:${position.column}`);
      this.keyContextMap.set(`__COMPLEX__${position.line}_${position.column}`, {
        file: filePath,
        function: functionName,
        type: 'complex',
        position: position
      });
      return;
    }
    
    // Other complex expressions
    console.warn(`⚠️  Unknown key type in ${functionName}() at ${filePath}:${position.line}:${position.column}`);
  }

  /**
   * Add a key with context information and position
   */
  addKey(key, keys, filePath, context, position) {
    if (!key || typeof key !== 'string') return;
    
    // Clean the key
    const cleanKey = key.trim();
    if (!cleanKey) return;
    
    keys.push(cleanKey);
    
    // Store usage information with position
    if (!this.keyUsageMap.has(cleanKey)) {
      this.keyUsageMap.set(cleanKey, []);
    }
    
    this.keyUsageMap.get(cleanKey).push({
      file: filePath,
      line: position.line,
      column: position.column,
      context: context
    });
    
    // Store context information
    this.keyContextMap.set(cleanKey, {
      file: filePath,
      context: context,
      type: 'static',
      position: position
    });
  }

  /**
   * Simple heuristic to check if a string looks like a translation key
   */
  looksLikeTranslationKey(text) {
    if (!text || text.length > 100) return false;
    
    // Common translation key patterns
    const patterns = [
      /^[a-zA-Z][a-zA-Z0-9._-]*$/, // Simple dot notation: 'user.name'
      /^[A-Z_][A-Z0-9_]*$/, // Constants: 'USER_NAME'
      /^[a-z]+([A-Z][a-z]*)*$/ // CamelCase: 'userName'
    ];
    
    return patterns.some(pattern => pattern.test(text));
  }

  /**
   * Enhanced translation file loader with better error handling
   */
  loadAllTranslations() {
    console.log(`\n📚 Loading translation files from: ${this.languagesPath}`);
    
    if (!fs.existsSync(this.languagesPath)) {
      throw new Error(`Translation directory not found: ${this.languagesPath}`);
    }
    
    try {
      const files = fs.readdirSync(this.languagesPath).filter(f => 
        f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.ts')
      );
      
      this.allLanguages = files.map(f => f.replace(/\.(json|js|ts)$/, ''));
      
      console.log(`📊 Found ${files.length} language files`);
      
      for (const file of files) {
        const langCode = file.replace(/\.(json|js|ts)$/, '');
        const filePath = path.join(this.languagesPath, file);
        
        try {
          let translations = {};
          
          if (file.endsWith('.json')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            translations = JSON.parse(content);
          } else if (file.endsWith('.js') || file.endsWith('.ts')) {
            // Basic support for JS/TS modules
            const content = fs.readFileSync(filePath, 'utf-8');
            try {
              const match = content.match(/export\s+default\s+({[\s\S]*})/);
              if (match) {
                translations = JSON.parse(match[1]);
              }
            } catch (e) {
              console.warn(`⚠️  Could not parse JS/TS file ${file}, treating as empty`);
            }
          }
          
          // Flatten nested objects
          const flatTranslations = this.flattenObject(translations);
          this.languageFiles.set(langCode, flatTranslations);
          
          if (files.indexOf(file) < 5) {
            console.log(`   ✅ ${langCode}: ${Object.keys(flatTranslations).length} keys`);
          }
        } catch (error) {
          console.error(`❌ Error loading ${file}:`, error.message);
          this.languageFiles.set(langCode, {});
        }
      }
      
      if (files.length > 5) {
        console.log(`   ... and ${files.length - 5} more languages`);
      }
    } catch (error) {
      throw new Error(`Failed to read translation directory: ${error.message}`);
    }
  }

  /**
   * Flatten nested translation objects
   */
  flattenObject(obj, prefix = '') {
    const flattened = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
    
    return flattened;
  }

  /**
   * Enhanced codebase scanner with progress reporting
   */
  scanCodebase() {
    console.log(`\n🔍 Scanning codebase for t(), tSync(), and tAsync() calls...`);
    
    const allFiles = this.scanAllFiles(this.srcPath);
    this.stats.filesScanned = allFiles.length;
    console.log(`📊 Found ${allFiles.length} files to scan`);
    
    let filesWithKeys = 0;
    let totalKeysFound = 0;
    
    // Progress reporting for large codebases
    const progressInterval = Math.max(1, Math.floor(allFiles.length / 20));
    
    for (let i = 0; i < allFiles.length; i++) {
      const filePath = allFiles[i];
      
      if (i % progressInterval === 0) {
        const progress = ((i / allFiles.length) * 100).toFixed(1);
        console.log(`   📊 Progress: ${progress}% (${i}/${allFiles.length} files)`);
      }
      
      const keys = this.extractKeysFromFile(filePath);
      
      if (keys.length > 0) {
        filesWithKeys++;
        const relativePath = path.relative('.', filePath);
        
        if (filesWithKeys <= 10) {
          console.log(`   📄 ${relativePath}: ${keys.length} keys`);
        }
        
        // Track key usage
        for (const key of keys) {
          this.keysInCode.add(key);
          totalKeysFound++;
        }
      }
    }
    
    this.stats.filesWithKeys = filesWithKeys;
    this.stats.totalKeyInstances = totalKeysFound;
    
    if (filesWithKeys > 10) {
      console.log(`   ... and ${filesWithKeys - 10} more files with translation keys`);
    }
    
    console.log(`\n📊 FOCUSED Codebase Scan Results:`);
    console.log(`   📁 Files scanned: ${allFiles.length}`);
    console.log(`   📄 Files with translation calls: ${filesWithKeys}`);
    console.log(`   🔑 Total function call instances: ${totalKeysFound}`);
    console.log(`   🎯 Unique keys found: ${this.keysInCode.size}`);
    console.log(`   📞 Function call breakdown:`);
    console.log(`      • t(): ${this.stats.functionCallBreakdown.t} calls`);
    console.log(`      • tSync(): ${this.stats.functionCallBreakdown.tSync} calls`);
    console.log(`      • tAsync(): ${this.stats.functionCallBreakdown.tAsync} calls`);
    console.log(`   ⏱️  Scan time: ${((Date.now() - this.stats.scanStartTime) / 1000).toFixed(2)}s`);
  }

  /**
   * Enhanced translation analysis with duplicate detection
   */
  analyzeTranslations() {
    console.log(`\n🔬 Analyzing translation coverage...`);
    
    for (const [langCode, translations] of this.languageFiles) {
      const translationKeys = new Set(Object.keys(translations));
      
      // Find missing translations (in code but not in translation file)
      const missing = [];
      for (const key of this.keysInCode) {
        if (!translationKeys.has(key)) {
          missing.push(key);
        }
      }
      this.missingTranslations.set(langCode, missing);
      
      // Find unused translations (in translation file but not in code)
      const unused = [];
      for (const key of translationKeys) {
        if (!this.keysInCode.has(key)) {
          unused.push(key);
        }
      }
      this.unusedTranslations.set(langCode, unused);
    }
    
    // Find inconsistent keys across languages
    this.findInconsistentKeys();
    
    // Find potential duplicate translations
    this.findDuplicateTranslations();
    
    // Analyze unused keys in detail
    this.unusedAnalysis = this.analyzeUnusedKeys();
  }

  /**
   * Find keys that exist in some languages but not others
   */
  findInconsistentKeys() {
    const allTranslationKeys = new Set();
    
    // Collect all keys from all languages
    for (const [langCode, translations] of this.languageFiles) {
      for (const key of Object.keys(translations)) {
        allTranslationKeys.add(key);
      }
    }
    
    // Check each key across all languages
    for (const key of allTranslationKeys) {
      const languagesWithKey = [];
      const languagesMissingKey = [];
      
      for (const [langCode, translations] of this.languageFiles) {
        if (key in translations) {
          languagesWithKey.push(langCode);
        } else {
          languagesMissingKey.push(langCode);
        }
      }
      
      // If key exists in some but not all languages, it's inconsistent
      if (languagesMissingKey.length > 0 && languagesWithKey.length > 0) {
        this.inconsistentKeys.add(key);
      }
    }
  }

  /**
   * Find potential duplicate translations (same value, different key)
   */
  findDuplicateTranslations() {
    const sampleLang = this.allLanguages[0];
    if (!sampleLang) return;
    
    const translations = this.languageFiles.get(sampleLang);
    const valueToKeys = new Map();
    
    // Group keys by their translation values
    for (const [key, value] of Object.entries(translations)) {
      if (typeof value === 'string' && value.trim() && value.length > 3) {
        const normalizedValue = value.toLowerCase().trim();
        
        if (!valueToKeys.has(normalizedValue)) {
          valueToKeys.set(normalizedValue, []);
        }
        valueToKeys.get(normalizedValue).push(key);
      }
    }
    
    // Find values with multiple keys (potential duplicates)
    for (const [value, keys] of valueToKeys) {
      if (keys.length > 1) {
        this.duplicateKeys.set(value, keys);
      }
    }
  }

  /**
   * Enhanced unused keys analysis
   */
  analyzeUnusedKeys() {
    console.log(`\n🔬 Analyzing unused translation patterns...`);
    
    const sampleLang = this.allLanguages[0];
    const unusedKeys = this.unusedTranslations.get(sampleLang) || [];
    
    if (unusedKeys.length === 0) {
      console.log(`   ✅ No unused keys found in ${sampleLang}!`);
      return { categories: [], totalUnused: 0 };
    }
    
    // Enhanced categorization
    const categories = {
      ui: { keywords: ['button', 'menu', 'tab', 'link', 'icon', 'label', 'title', 'heading'], keys: [] },
      forms: { keywords: ['form', 'input', 'field', 'validate', 'submit', 'required', 'placeholder'], keys: [] },
      errors: { keywords: ['error', 'invalid', 'failed', 'wrong', 'cannot', 'unable', 'exception'], keys: [] },
      messages: { keywords: ['success', 'complete', 'done', 'finished', 'saved', 'message', 'notification'], keys: [] },
      navigation: { keywords: ['back', 'next', 'previous', 'home', 'page', 'goto', 'navigate'], keys: [] },
      dates: { keywords: ['date', 'time', 'day', 'month', 'year', 'hour', 'minute', 'calendar'], keys: [] },
      auth: { keywords: ['login', 'logout', 'signin', 'signup', 'password', 'user', 'account'], keys: [] },
      media: { keywords: ['album', 'photo', 'image', 'video', 'upload', 'download', 'media'], keys: [] },
      settings: { keywords: ['setting', 'config', 'preference', 'option', 'profile', 'configuration'], keys: [] },
      deprecated: { keywords: ['old', 'legacy', 'deprecated', 'unused', 'temp', 'test', 'todo'], keys: [] },
      api: { keywords: ['api', 'endpoint', 'request', 'response', 'fetch', 'post', 'get'], keys: [] },
      numbers: { keywords: [], keys: [] },
      short: { keywords: [], keys: [] },
      long: { keywords: [], keys: [] },
      other: { keywords: [], keys: [] }
    };
    
    const translations = this.languageFiles.get(sampleLang);
    
    for (const key of unusedKeys) {
      const keyLower = key.toLowerCase();
      const value = translations[key] || '';
      const valueLower = value.toLowerCase();
      let categorized = false;
      
      // Check if it's a number/numeric key
      if (/^\d+$/.test(key) || /^[0-9\-\s]*$/.test(key)) {
        categories.numbers.keys.push({ key, value });
        categorized = true;
      }
      // Check key length
      else if (key.length <= 3) {
        categories.short.keys.push({ key, value });
        categorized = true;
      }
      else if (key.length > 100) {
        categories.long.keys.push({ key, value });
        categorized = true;
      }
      
      if (!categorized) {
        // Check against category keywords
        for (const [catName, category] of Object.entries(categories)) {
          if (['numbers', 'short', 'long', 'other'].includes(catName)) continue;
          
          const matchesKey = category.keywords.some(keyword => keyLower.includes(keyword));
          const matchesValue = category.keywords.some(keyword => valueLower.includes(keyword));
          
          if (matchesKey || matchesValue) {
            category.keys.push({ key, value });
            categorized = true;
            break;
          }
        }
      }
      
      // If no category matched, put in 'other'
      if (!categorized) {
        categories.other.keys.push({ key, value });
      }
    }
    
    // Sort categories by count (largest first)
    const sortedCategories = Object.entries(categories)
      .map(([name, data]) => ({ name, count: data.keys.length, keys: data.keys }))
      .filter(cat => cat.count > 0)
      .sort((a, b) => b.count - a.count);
    
    console.log(`\n📊 UNUSED KEYS BY CATEGORY (${sampleLang}):`);
    sortedCategories.forEach((category, index) => {
      console.log(`   ${index + 1}. ${category.name.toUpperCase()}: ${category.count} keys`);
      
      // Show examples from each category
      const examples = category.keys.slice(0, 3);
      examples.forEach((item, i) => {
        const truncatedValue = item.value.length > 40 ? item.value.substring(0, 40) + '...' : item.value;
        console.log(`      • "${item.key}" → "${truncatedValue}"`);
      });
      
      if (category.keys.length > 3) {
        console.log(`      ... and ${category.keys.length - 3} more ${category.name} keys`);
      }
    });
    
    return { categories: sortedCategories, totalUnused: unusedKeys.length };
  }

  /**
   * Generate comprehensive report with line numbers
   */
  generateReport() {
    console.log(`\n📋 FOCUSED TRANSLATION AUDIT REPORT`);
    console.log('='.repeat(70));
    
    const sampleLang = this.allLanguages[0];
    const sampleMissing = this.missingTranslations.get(sampleLang)?.length || 0;
    const sampleUnused = this.unusedTranslations.get(sampleLang)?.length || 0;
    
    console.log(`📊 SUMMARY STATISTICS:`);
    console.log(`   🔑 Unique keys found in code: ${this.keysInCode.size}`);
    console.log(`   🌍 Languages: ${this.allLanguages.length}`);
    console.log(`   ❌ Keys missing from translations: ${sampleMissing} (in ${sampleLang})`);
    console.log(`   🗑️  Unused keys in translations: ${sampleUnused} (in ${sampleLang})`);
    console.log(`   ⚠️  Inconsistent keys across languages: ${this.inconsistentKeys.size}`);
    console.log(`   👥 Potential duplicate translations: ${this.duplicateKeys.size}`);
    console.log(`   📁 Files scanned: ${this.stats.filesScanned}`);
    console.log(`   📄 Files with translation calls: ${this.stats.filesWithKeys}`);
    console.log(`   📞 Function call breakdown:`);
    console.log(`      • t(): ${this.stats.functionCallBreakdown.t} calls`);
    console.log(`      • tSync(): ${this.stats.functionCallBreakdown.tSync} calls`);
    console.log(`      • tAsync(): ${this.stats.functionCallBreakdown.tAsync} calls`);
    console.log(`   ⏱️  Total scan time: ${((Date.now() - this.stats.scanStartTime) / 1000).toFixed(2)}s`);
    
    // Show sample missing keys with line numbers
    if (sampleMissing > 0) {
      console.log(`\n❌ SAMPLE MISSING TRANSLATIONS WITH LINE NUMBERS (${sampleLang}):`);
      const missing = this.missingTranslations.get(sampleLang);
      missing.slice(0, 10).forEach((key, index) => {
        const usages = this.keyUsageMap.get(key) || [];
        console.log(`   ${index + 1}. "${key}" (used in ${usages.length} locations):`);
        
        // Show first few usages with line numbers
        usages.slice(0, 3).forEach(usage => {
          console.log(`      📍 ${usage.file}:${usage.line}:${usage.column} [${usage.context}()]`);
        });
        
        if (usages.length > 3) {
          console.log(`      ... and ${usages.length - 3} more locations`);
        }
      });
      if (missing.length > 10) {
        console.log(`   ... and ${missing.length - 10} more missing keys`);
      }
    }
    
    // Show potential duplicates
    if (this.duplicateKeys.size > 0) {
      console.log(`\n👥 SAMPLE POTENTIAL DUPLICATE TRANSLATIONS:`);
      const duplicates = Array.from(this.duplicateKeys.entries()).slice(0, 5);
      duplicates.forEach(([value, keys], index) => {
        console.log(`   ${index + 1}. "${value.substring(0, 50)}${value.length > 50 ? '...' : ''}"`);
        console.log(`      Keys: ${keys.join(', ')}`);
      });
      if (this.duplicateKeys.size > 5) {
        console.log(`   ... and ${this.duplicateKeys.size - 5} more potential duplicates`);
      }
    }
    
    // Language coverage analysis
    this.generateLanguageCoverageAnalysis();
    
    // Generate action items
    this.generateActionItems(sampleMissing, sampleUnused);
  }

  /**
   * Generate language coverage analysis
   */
  generateLanguageCoverageAnalysis() {
    console.log(`\n🌍 LANGUAGE COVERAGE ANALYSIS:`);
    const languageStats = [];
    
    for (const [langCode, translations] of this.languageFiles) {
      const missing = this.missingTranslations.get(langCode).length;
      const unused = this.unusedTranslations.get(langCode).length;
      const total = Object.keys(translations).length;
      const coverage = this.keysInCode.size > 0 ? 
        ((this.keysInCode.size - missing) / this.keysInCode.size * 100).toFixed(1) : 100;
      
      languageStats.push({
        lang: langCode,
        total,
        missing,
        unused,
        coverage: parseFloat(coverage)
      });
    }
    
    // Sort by coverage (best first)
    languageStats.sort((a, b) => b.coverage - a.coverage);
    
    console.log(`   📊 Languages by coverage:`);
    languageStats.forEach((stat, index) => {
      const icon = stat.coverage >= 95 ? '✅' : stat.coverage >= 80 ? '⚠️' : '❌';
      console.log(`      ${icon} ${(index + 1).toString().padStart(2)}. ${stat.lang}: ${stat.coverage}% coverage (${stat.total} keys, ${stat.missing} missing, ${stat.unused} unused)`);
    });
  }

  /**
   * Generate actionable recommendations
   */
  generateActionItems(sampleMissing, sampleUnused) {
    console.log(`\n🎯 ACTIONABLE RECOMMENDATIONS:`);
    
    let actionCount = 1;
    
    if (sampleMissing > 0) {
      console.log(`   ${actionCount++}. 🔴 URGENT: Add ${sampleMissing} missing translation keys`);
      console.log(`      • These keys are actively used in t(), tSync(), or tAsync() calls`);
      console.log(`      • May cause runtime errors or display raw keys to users`);
      console.log(`      • Prioritize high-usage keys first (see detailed report with line numbers)`);
    }
    
    if (sampleUnused > 0 && this.unusedAnalysis) {
      const bundleReduction = (this.unusedAnalysis.totalUnused * 15 * this.allLanguages.length / 1024 / 1024).toFixed(2);
      console.log(`   ${actionCount++}. 💰 OPTIMIZATION: Remove ${this.unusedAnalysis.totalUnused} unused keys (~${bundleReduction}MB savings)`);
    }
    
    if (this.inconsistentKeys.size > 0) {
      console.log(`   ${actionCount++}. ⚠️  CONSISTENCY: Resolve ${this.inconsistentKeys.size} inconsistent keys`);
    }
    
    if (this.duplicateKeys.size > 0) {
      console.log(`   ${actionCount++}. 👥 DEDUPLICATION: Review ${this.duplicateKeys.size} potential duplicate translations`);
    }
    
    console.log(`\n💡 FOCUSED AUDIT BENEFITS:`);
    console.log(`   ✅ Only scans for actual translation functions: t(), tSync(), tAsync()`);
    console.log(`   ✅ Eliminates false positives from other functions`);
    console.log(`   ✅ Provides precise line numbers for each translation call`);
    console.log(`   ✅ Tracks function usage statistics`);
    console.log(`   ✅ Identifies dynamic and complex key patterns`);
    console.log(`   ✅ All diagnostic files saved to: ${this.outputDir}`);
  }

  /**
   * Save comprehensive JSON report with line numbers
   */
  saveJSONReport() {
    const sampleLang = this.allLanguages[0];
    
    // Convert keyUsageMap to a serializable format
    const keyUsageData = {};
    const dynamicKeys = {};
    const complexKeys = {};
    
    for (const [key, usages] of this.keyUsageMap) {
      keyUsageData[key] = {
        usages: usages,
        count: usages.length,
        files: [...new Set(usages.map(u => u.file))],
        context: this.keyContextMap.get(key)
      };
    }
    
    // Extract dynamic and complex keys
    for (const [key, context] of this.keyContextMap) {
      if (key.startsWith('__DYNAMIC__')) {
        dynamicKeys[key] = context;
      } else if (key.startsWith('__COMPLEX__')) {
        complexKeys[key] = context;
      }
    }
    
    // Main comprehensive report
    const report = {
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '3.0.0-focused',
        scanDurationMs: Date.now() - this.stats.scanStartTime,
        srcPath: this.srcPath,
        languagesPath: this.languagesPath,
        outputDir: this.outputDir,
        targetFunctions: Array.from(this.translationFunctions),
        features: ['focused_functions', 'line_numbers', 'position_tracking', 'dynamic_key_detection', 'unused_keys_list']
      },
      summary: {
        keysInCode: this.keysInCode.size,
        languages: this.allLanguages.length,
        inconsistentKeys: this.inconsistentKeys.size,
        duplicateTranslations: this.duplicateKeys.size,
        filesScanned: this.stats.filesScanned,
        filesWithKeys: this.stats.filesWithKeys,
        totalKeyInstances: this.stats.totalKeyInstances,
        functionCallBreakdown: this.stats.functionCallBreakdown,
        dynamicKeys: Object.keys(dynamicKeys).length,
        complexKeys: Object.keys(complexKeys).length
      },
      keysInCode: Array.from(this.keysInCode).sort(),
      keyUsage: keyUsageData,
      dynamicKeys: dynamicKeys,
      complexKeys: complexKeys,
      missingTranslations: Object.fromEntries(this.missingTranslations),
      unusedTranslations: Object.fromEntries(this.unusedTranslations),
      inconsistentKeys: Array.from(this.inconsistentKeys).sort(),
      duplicateTranslations: Object.fromEntries(this.duplicateKeys),
      unusedAnalysis: this.unusedAnalysis,
      languageStats: this.allLanguages.map(lang => ({
        language: lang,
        totalKeys: Object.keys(this.languageFiles.get(lang)).length,
        missingKeys: this.missingTranslations.get(lang).length,
        unusedKeys: this.unusedTranslations.get(lang).length,
        coverage: this.keysInCode.size > 0 ? 
          ((this.keysInCode.size - this.missingTranslations.get(lang).length) / this.keysInCode.size * 100) : 100
      }))
    };
    
    fs.writeFileSync(this.outputPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Focused audit report saved to: ${this.outputPath}`);
    
    // Save additional detailed reports
    this.saveDetailedReports(sampleLang);
  }

  /**
   * Save additional detailed reports with line numbers in translationAudit folder
   */
  saveDetailedReports(sampleLang) {
    const files = [];
    
    // Missing keys report with line numbers
    const missingKeys = this.missingTranslations.get(sampleLang) || [];
    if (missingKeys.length > 0) {
      const missingReport = {
        summary: {
          totalMissingKeys: missingKeys.length,
          language: sampleLang,
          description: `Keys used in t(), tSync(), or tAsync() calls but missing from ${sampleLang}.json`,
          generatedAt: new Date().toISOString()
        },
        missingKeys: missingKeys.map(key => {
          const usages = this.keyUsageMap.get(key) || [];
          return {
            key: key,
            usages: usages,
            usageCount: usages.length,
            files: [...new Set(usages.map(u => u.file))],
            functions: [...new Set(usages.map(u => u.context))],
            context: this.keyContextMap.get(key),
            priority: usages.length > 5 ? 'HIGH' : 
                     usages.length > 2 ? 'MEDIUM' : 'LOW'
          };
        }).sort((a, b) => b.usageCount - a.usageCount)
      };
      
      const missingFile = path.join(this.outputDir, 'missing-keys-focused.json');
      fs.writeFileSync(missingFile, JSON.stringify(missingReport, null, 2));
      files.push(`missing-keys-focused.json (${missingKeys.length} keys)`);
    }

    // ALL UNUSED KEYS REPORT - Complete list for all languages
    const allUnusedReport = {
      summary: {
        description: "Complete list of all unused translation keys across all languages",
        generatedAt: new Date().toISOString(),
        totalLanguages: this.allLanguages.length
      },
      unusedKeysByLanguage: {}
    };

    for (const [langCode, unusedKeys] of this.unusedTranslations) {
      if (unusedKeys.length > 0) {
        const translations = this.languageFiles.get(langCode);
        allUnusedReport.unusedKeysByLanguage[langCode] = {
          totalUnusedKeys: unusedKeys.length,
          keys: unusedKeys.map(key => ({
            key: key,
            value: translations[key] || '',
            estimatedSize: (key.length + (translations[key] || '').length) * 2 // rough byte estimate
          })).sort((a, b) => a.key.localeCompare(b.key))
        };
      }
    }

    const allUnusedFile = path.join(this.outputDir, 'all-unused-keys.json');
    fs.writeFileSync(allUnusedFile, JSON.stringify(allUnusedReport, null, 2));
    files.push(`all-unused-keys.json (complete list for all languages)`);
    
    // Dynamic keys report
    const dynamicKeys = Array.from(this.keyContextMap.entries())
      .filter(([key]) => key.startsWith('__DYNAMIC__'));
    
    if (dynamicKeys.length > 0) {
      const dynamicReport = {
        summary: {
          totalDynamicKeys: dynamicKeys.length,
          description: "Variable-based translation keys that need manual review",
          generatedAt: new Date().toISOString()
        },
        dynamicKeys: dynamicKeys.map(([key, context]) => ({
          location: `${context.file}:${context.position.line}:${context.position.column}`,
          function: context.function,
          variableName: context.variableName,
          type: context.type,
          recommendation: "Review this variable to ensure it contains valid translation keys"
        }))
      };
      
      const dynamicFile = path.join(this.outputDir, 'dynamic-keys-report.json');
      fs.writeFileSync(dynamicFile, JSON.stringify(dynamicReport, null, 2));
      files.push(`dynamic-keys-report.json (${dynamicKeys.length} dynamic keys)`);
    }

    // Inconsistent keys report
    if (this.inconsistentKeys.size > 0) {
      const inconsistentReport = {
        summary: {
          totalInconsistentKeys: this.inconsistentKeys.size,
          description: "Keys that exist in some languages but not others",
          generatedAt: new Date().toISOString()
        },
        inconsistentKeys: Array.from(this.inconsistentKeys).sort().map(key => {
          const languageStatus = {};
          for (const [langCode, translations] of this.languageFiles) {
            languageStatus[langCode] = {
              exists: key in translations,
              value: translations[key] || null
            };
          }
          return {
            key: key,
            languageStatus: languageStatus,
            missingInLanguages: this.allLanguages.filter(lang => !(key in this.languageFiles.get(lang))),
            existsInLanguages: this.allLanguages.filter(lang => key in this.languageFiles.get(lang))
          };
        })
      };
      
      const inconsistentFile = path.join(this.outputDir, 'inconsistent-keys-report.json');
      fs.writeFileSync(inconsistentFile, JSON.stringify(inconsistentReport, null, 2));
      files.push(`inconsistent-keys-report.json (${this.inconsistentKeys.size} inconsistent keys)`);
    }

    // Duplicate translations report
    if (this.duplicateKeys.size > 0) {
      const duplicateReport = {
        summary: {
          totalDuplicateGroups: this.duplicateKeys.size,
          description: "Potential duplicate translations (same value, different keys)",
          generatedAt: new Date().toISOString()
        },
        duplicateGroups: Array.from(this.duplicateKeys.entries()).map(([value, keys]) => ({
          sharedValue: value,
          duplicateKeys: keys,
          keyCount: keys.length,
          estimatedSavings: value.length * (keys.length - 1) * 2 // rough byte estimate if consolidated
        })).sort((a, b) => b.estimatedSavings - a.estimatedSavings)
      };
      
      const duplicateFile = path.join(this.outputDir, 'duplicate-translations-report.json');
      fs.writeFileSync(duplicateFile, JSON.stringify(duplicateReport, null, 2));
      files.push(`duplicate-translations-report.json (${this.duplicateKeys.size} duplicate groups)`);
    }
    
    if (files.length > 0) {
      console.log(`📄 Additional focused reports saved to ${this.outputDir}:`);
      files.forEach(file => console.log(`   • ${file}`));
    }
  }

  /**
   * Main audit process
   */
  async audit() {
    try {
      console.log(`🚀 Starting focused translation audit (t, tSync, tAsync only)...`);
      
      // Step 1: Load all translation files
      this.loadAllTranslations();
      
      // Step 2: Scan entire codebase
      this.scanCodebase();
      
      // Step 3: Analyze translations
      this.analyzeTranslations();
      
      // Step 4: Generate report
      this.generateReport();
      
      // Step 5: Save JSON reports
      this.saveJSONReport();
      
      console.log(`\n🎉 Focused translation audit complete!`);
      console.log(`⏱️  Total time: ${((Date.now() - this.stats.scanStartTime) / 1000).toFixed(2)}s`);
      console.log(`🎯 Only t(), tSync(), and tAsync() calls were analyzed`);
      console.log(`📁 All reports saved to: ${this.outputDir}`);
      
    } catch (error) {
      console.error('❌ Audit failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// CLI Interface with options
async function main() {
  try {
    // Parse command line arguments for configuration
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i]?.replace(/^--/, '');
      const value = args[i + 1];
      if (key && value) {
        options[key] = value;
      }
    }
    
    const auditor = new FocusedTranslationAuditor(options);
    await auditor.audit();
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = FocusedTranslationAuditor;