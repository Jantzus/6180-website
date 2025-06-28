#!/usr/bin/env node

/**
 * Unused Translation Keys Remover Script
 * 
 * Removes unused translation keys from:
 * 1. terms.ts (phrase-first approach)
 * 2. Individual language JSON files
 * 3. Condensed language JSON files
 * 
 * Based on the translation audit results
 */

const fs = require('fs');
const path = require('path');

class UnusedKeysRemover {
  constructor(options = {}) {
    // Configurable paths
    this.auditReportPath = path.resolve(options.auditReportPath || './translationAudit/all-unused-keys.json');
    this.termsFilePath = path.resolve(options.termsFilePath || './src/lib/i18n/terms.ts');
    this.translationsDir = path.resolve(options.translationsDir || './src/lib/i18n/translations');
    this.condensedDir = path.resolve(options.condensedDir || './src/lib/i18n/condensed');
    this.backupDir = path.resolve(options.backupDir || './translationAudit/backups');
    
    // Options
    this.dryRun = options.dryRun || false;
    this.interactive = options.interactive || false;
    this.confirmEach = options.confirmEach || false;
    
    // Statistics
    this.stats = {
      startTime: Date.now(),
      keysToRemove: 0,
      keysRemoved: 0,
      languagesProcessed: 0,
      filesModified: 0,
      backupsCreated: 0
    };
    
    // Ensure backup directory exists
    this.ensureBackupDirectory();
    
    console.log('🗑️  Translation Keys Removal Tool');
    console.log(`📊 Audit report: ${this.auditReportPath}`);
    console.log(`📝 Terms file: ${this.termsFilePath}`);
    console.log(`📁 Translations dir: ${this.translationsDir}`);
    console.log(`📁 Condensed dir: ${this.condensedDir}`);
    console.log(`💾 Backup dir: ${this.backupDir}`);
    console.log(`🔍 Mode: ${this.dryRun ? 'DRY RUN' : 'EXECUTE'}`);
    console.log(`🤝 Interactive: ${this.interactive ? 'YES' : 'NO'}`);
    console.log('='.repeat(70));
  }

  /**
   * Ensure backup directory exists
   */
  ensureBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      console.log(`📁 Created backup directory: ${this.backupDir}`);
    }
  }

  /**
   * Load the unused keys report
   */
  loadUnusedKeysReport() {
    console.log(`\n📊 Loading unused keys report...`);
    
    if (!fs.existsSync(this.auditReportPath)) {
      throw new Error(`Audit report not found: ${this.auditReportPath}`);
    }
    
    try {
      const reportData = fs.readFileSync(this.auditReportPath, 'utf-8');
      const report = JSON.parse(reportData);
      
      console.log(`✅ Report loaded successfully`);
      console.log(`📈 Generated: ${report.summary.generatedAt}`);
      console.log(`🌍 Languages analyzed: ${report.summary.totalLanguages}`);
      
      // Extract all unique unused keys across all languages
      const unusedKeysSet = new Set();
      const languageBreakdown = {};
      
      for (const [langCode, languageData] of Object.entries(report.unusedKeysByLanguage)) {
        languageBreakdown[langCode] = languageData.totalUnusedKeys;
        
        for (const keyData of languageData.keys) {
          unusedKeysSet.add(keyData.key);
        }
      }
      
      const unusedKeys = Array.from(unusedKeysSet).sort();
      this.stats.keysToRemove = unusedKeys.length;
      
      console.log(`\n📋 UNUSED KEYS SUMMARY:`);
      console.log(`   🔑 Total unique unused keys: ${unusedKeys.length}`);
      console.log(`   📊 By language:`);
      
      const sortedLanguages = Object.entries(languageBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
      
      sortedLanguages.forEach(([lang, count]) => {
        console.log(`      • ${lang}: ${count} unused keys`);
      });
      
      if (Object.keys(languageBreakdown).length > 10) {
        console.log(`      ... and ${Object.keys(languageBreakdown).length - 10} more languages`);
      }
      
      return {
        unusedKeys,
        languageBreakdown,
        fullReport: report
      };
      
    } catch (error) {
      throw new Error(`Failed to parse audit report: ${error.message}`);
    }
  }

  /**
   * Create backup of a file
   */
  createBackup(filePath, backupSuffix = '') {
    if (!fs.existsSync(filePath)) return null;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = path.basename(filePath);
    const backupFileName = `${fileName}.backup-${timestamp}${backupSuffix}`;
    const backupPath = path.join(this.backupDir, backupFileName);
    
    try {
      fs.copyFileSync(filePath, backupPath);
      this.stats.backupsCreated++;
      return backupPath;
    } catch (error) {
      console.warn(`⚠️  Failed to create backup for ${filePath}: ${error.message}`);
      return null;
    }
  }

  /**
   * Process the terms.ts file (phrase-first approach)
   */
  async processTermsFile(unusedKeys) {
    console.log(`\n📝 Processing terms.ts file...`);
    
    if (!fs.existsSync(this.termsFilePath)) {
      console.warn(`⚠️  Terms file not found: ${this.termsFilePath}`);
      return 0;
    }
    
    // Create backup
    const backupPath = this.createBackup(this.termsFilePath, '-terms');
    if (backupPath) {
      console.log(`💾 Backup created: ${path.basename(backupPath)}`);
    }
    
    // Read the terms file
    const termsContent = fs.readFileSync(this.termsFilePath, 'utf-8');
    
    // Find unused keys that exist in the terms file
    const keysFoundInTerms = [];
    const keysNotFoundInTerms = [];
    
    for (const key of unusedKeys) {
      // Look for the key as a property in the translations object
      const keyPattern = new RegExp(`'${this.escapeRegex(key)}'\\s*:\\s*{`, 'g');
      if (keyPattern.test(termsContent)) {
        keysFoundInTerms.push(key);
      } else {
        keysNotFoundInTerms.push(key);
      }
    }
    
    console.log(`📊 Terms file analysis:`);
    console.log(`   ✅ Keys found in terms.ts: ${keysFoundInTerms.length}`);
    console.log(`   ❌ Keys not found in terms.ts: ${keysNotFoundInTerms.length}`);
    
    if (keysNotFoundInTerms.length > 0 && keysNotFoundInTerms.length <= 10) {
      console.log(`   🔍 Keys not found: ${keysNotFoundInTerms.join(', ')}`);
    }
    
    if (keysFoundInTerms.length === 0) {
      console.log(`ℹ️  No unused keys found in terms.ts to remove`);
      return 0;
    }
    
    // Interactive confirmation
    if (this.interactive) {
      console.log(`\n❓ Remove ${keysFoundInTerms.length} unused keys from terms.ts?`);
      if (keysFoundInTerms.length <= 20) {
        keysFoundInTerms.forEach((key, i) => console.log(`   ${i+1}. "${key}"`));
      } else {
        keysFoundInTerms.slice(0, 15).forEach((key, i) => console.log(`   ${i+1}. "${key}"`));
        console.log(`   ... and ${keysFoundInTerms.length - 15} more keys`);
      }
      
      const response = await this.promptUser('\nProceed? (y/N): ');
      if (!response.toLowerCase().startsWith('y')) {
        console.log(`⏭️  Skipping terms.ts processing`);
        return 0;
      }
    }
    
    if (this.dryRun) {
      console.log(`🔍 DRY RUN: Would remove ${keysFoundInTerms.length} keys from terms.ts`);
      return keysFoundInTerms.length;
    }
    
    // Remove the keys from terms content
    let modifiedContent = termsContent;
    let keysActuallyRemoved = 0;
    
    for (const key of keysFoundInTerms) {
      // Match the entire key object including its translations
      const keyRegex = new RegExp(
        `\\s*'${this.escapeRegex(key)}'\\s*:\\s*{[^}]*?}\\s*,?`,
        'gs'
      );
      
      const beforeLength = modifiedContent.length;
      modifiedContent = modifiedContent.replace(keyRegex, '');
      
      if (modifiedContent.length < beforeLength) {
        keysActuallyRemoved++;
      }
    }
    
    // Clean up any trailing commas or empty lines
    modifiedContent = this.cleanupTypeScriptObject(modifiedContent);
    
    // Write the modified content
    fs.writeFileSync(this.termsFilePath, modifiedContent, 'utf-8');
    this.stats.filesModified++;
    this.stats.keysRemoved += keysActuallyRemoved;
    
    console.log(`✅ Terms file updated: ${keysActuallyRemoved} keys removed`);
    return keysActuallyRemoved;
  }

  /**
   * Process individual language JSON files
   */
  async processLanguageFiles(unusedKeys, languageBreakdown) {
    console.log(`\n📁 Processing individual language JSON files...`);
    
    const directories = [
      { path: this.translationsDir, name: 'translations' },
      { path: this.condensedDir, name: 'condensed' }
    ].filter(dir => fs.existsSync(dir.path));
    
    if (directories.length === 0) {
      console.warn(`⚠️  No translation directories found`);
      return 0;
    }
    
    let totalRemovedFromFiles = 0;
    
    for (const directory of directories) {
      console.log(`\n📂 Processing ${directory.name} directory...`);
      
      const files = fs.readdirSync(directory.path)
        .filter(file => file.endsWith('.json'))
        .sort();
      
      console.log(`📊 Found ${files.length} JSON files`);
      
      for (const file of files) {
        const langCode = file.replace('.json', '');
        const filePath = path.join(directory.path, file);
        
        // Check if this language has unused keys
        const languageUnusedCount = languageBreakdown[langCode] || 0;
        if (languageUnusedCount === 0) {
          continue;
        }
        
        // Create backup
        const backupPath = this.createBackup(filePath, `-${directory.name}`);
        
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const translations = JSON.parse(fileContent);
          
          let keysRemovedFromFile = 0;
          const originalKeyCount = Object.keys(translations).length;
          
          // Remove unused keys
          for (const key of unusedKeys) {
            if (key in translations) {
              delete translations[key];
              keysRemovedFromFile++;
            }
          }
          
          if (keysRemovedFromFile > 0) {
            if (!this.dryRun) {
              // Write updated file
              const updatedContent = JSON.stringify(translations, null, 2);
              fs.writeFileSync(filePath, updatedContent, 'utf-8');
              this.stats.filesModified++;
            }
            
            totalRemovedFromFiles += keysRemovedFromFile;
            
            const status = this.dryRun ? 'DRY RUN - Would remove' : 'Removed';
            console.log(`   📄 ${langCode}: ${status} ${keysRemovedFromFile}/${originalKeyCount} keys`);
          }
          
        } catch (error) {
          console.error(`❌ Error processing ${file}: ${error.message}`);
        }
        
        this.stats.languagesProcessed++;
      }
    }
    
    return totalRemovedFromFiles;
  }

  /**
   * Generate removal summary report
   */
  generateRemovalReport(unusedKeysData, termsRemoved, filesRemoved) {
    const report = {
      metadata: {
        generatedAt: new Date().toISOString(),
        processingTime: Date.now() - this.stats.startTime,
        mode: this.dryRun ? 'DRY_RUN' : 'EXECUTE',
        interactive: this.interactive
      },
      summary: {
        totalUnusedKeysIdentified: this.stats.keysToRemove,
        keysRemovedFromTermsFile: termsRemoved,
        keysRemovedFromLanguageFiles: filesRemoved,
        filesModified: this.stats.filesModified,
        languagesProcessed: this.stats.languagesProcessed,
        backupsCreated: this.stats.backupsCreated
      },
      removedKeys: unusedKeysData.unusedKeys.slice(0, 100), // Limit for readability
      backupLocation: this.backupDir,
      statistics: this.stats
    };
    
    const reportPath = path.join(this.backupDir, `removal-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return reportPath;
  }

  /**
   * Utility: Escape regex special characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Utility: Clean up TypeScript object formatting
   */
  cleanupTypeScriptObject(content) {
    // Remove duplicate commas
    content = content.replace(/,(\s*,)+/g, ',');
    
    // Remove trailing commas before closing braces
    content = content.replace(/,(\s*})/g, '$1');
    
    // Remove excessive blank lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return content;
  }

  /**
   * Utility: Simple prompt for interactive mode
   */
  promptUser(question) {
    return new Promise((resolve) => {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  /**
   * Main removal process
   */
  async removeUnusedKeys() {
    try {
      console.log(`🚀 Starting unused keys removal process...`);
      
      // Step 1: Load unused keys report
      const unusedKeysData = this.loadUnusedKeysReport();
      
      if (unusedKeysData.unusedKeys.length === 0) {
        console.log(`🎉 No unused keys found! Your translations are perfectly clean.`);
        return;
      }
      
      // Step 2: Interactive overview
      if (this.interactive) {
        console.log(`\n📋 REMOVAL PLAN:`);
        console.log(`   🔑 Total unused keys to remove: ${unusedKeysData.unusedKeys.length}`);
        console.log(`   📝 Will process terms.ts file`);
        console.log(`   📁 Will process individual language JSON files`);
        console.log(`   💾 Backups will be created before any changes`);
        
        const response = await this.promptUser('\n❓ Continue with removal? (y/N): ');
        if (!response.toLowerCase().startsWith('y')) {
          console.log(`❌ Removal cancelled by user`);
          return;
        }
      }
      
      // Step 3: Process terms.ts file
      const termsRemoved = await this.processTermsFile(unusedKeysData.unusedKeys);
      
      // Step 4: Process language JSON files
      const filesRemoved = await this.processLanguageFiles(
        unusedKeysData.unusedKeys, 
        unusedKeysData.languageBreakdown
      );
      
      // Step 5: Generate report
      const reportPath = this.generateRemovalReport(unusedKeysData, termsRemoved, filesRemoved);
      
      // Step 6: Show final summary
      console.log(`\n🎉 REMOVAL COMPLETE!`);
      console.log(`=`.repeat(50));
      console.log(`📊 FINAL STATISTICS:`);
      console.log(`   🔑 Unused keys identified: ${this.stats.keysToRemove}`);
      console.log(`   📝 Keys removed from terms.ts: ${termsRemoved}`);
      console.log(`   📁 Keys removed from language files: ${filesRemoved}`);
      console.log(`   📄 Files modified: ${this.stats.filesModified}`);
      console.log(`   🌍 Languages processed: ${this.stats.languagesProcessed}`);
      console.log(`   💾 Backups created: ${this.stats.backupsCreated}`);
      console.log(`   ⏱️  Processing time: ${((Date.now() - this.stats.startTime) / 1000).toFixed(2)}s`);
      console.log(`   📋 Detailed report: ${path.basename(reportPath)}`);
      
      if (this.dryRun) {
        console.log(`\n🔍 This was a DRY RUN - no files were actually modified`);
        console.log(`💡 Run without --dry-run to execute the changes`);
      } else {
        console.log(`\n✅ All files have been updated and backed up`);
        console.log(`💾 Backups location: ${this.backupDir}`);
        
        // Suggest next steps
        console.log(`\n💡 NEXT STEPS:`);
        console.log(`   1. Test your application to ensure everything works`);
        console.log(`   2. Run the translation audit again to verify cleanup`);
        console.log(`   3. Commit the changes to version control`);
        console.log(`   4. Deploy and monitor for any missing translations`);
      }
      
    } catch (error) {
      console.error('❌ Removal failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// CLI Interface
async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i++) {
      switch (args[i]) {
        case '--audit-report':
          options.auditReportPath = args[++i];
          break;
        case '--terms-file':
          options.termsFilePath = args[++i];
          break;
        case '--translations-dir':
          options.translationsDir = args[++i];
          break;
        case '--condensed-dir':
          options.condensedDir = args[++i];
          break;
        case '--backup-dir':
          options.backupDir = args[++i];
          break;
        case '--dry-run':
          options.dryRun = true;
          break;
        case '--interactive':
          options.interactive = true;
          break;
        case '--confirm-each':
          options.confirmEach = true;
          break;
        case '--help':
          showHelp();
          return;
      }
    }
    
    const remover = new UnusedKeysRemover(options);
    await remover.removeUnusedKeys();
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
🗑️  Unused Translation Keys Remover

USAGE:
  node removeUnusedKeys.cjs [options]

OPTIONS:
  --audit-report <path>     Path to the unused keys audit report
                           Default: ./translationAudit/all-unused-keys.json
  
  --terms-file <path>       Path to the terms.ts file
                           Default: ./src/lib/i18n/terms.ts
  
  --translations-dir <path> Path to individual language JSON files
                           Default: ./src/lib/i18n/translations
  
  --condensed-dir <path>    Path to condensed language JSON files
                           Default: ./src/lib/i18n/condensed
  
  --backup-dir <path>       Directory to store backups
                           Default: ./translationAudit/backups
  
  --dry-run                 Show what would be removed without making changes
  --interactive             Prompt for confirmation before making changes
  --help                    Show this help message

EXAMPLES:
  # Dry run to see what would be removed
  node removeUnusedKeys.cjs --dry-run

  # Interactive removal with confirmations
  node removeUnusedKeys.cjs --interactive

  # Remove with custom paths
  node removeUnusedKeys.cjs --terms-file ./src/translations.ts --backup-dir ./backups

SAFETY:
  - Always creates backups before making changes
  - Use --dry-run to preview changes
  - Use --interactive for step-by-step confirmation
  - All operations are logged and reported
`);
}

if (require.main === module) {
  main();
}

module.exports = UnusedKeysRemover;