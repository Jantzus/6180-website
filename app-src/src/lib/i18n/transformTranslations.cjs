// src/lib/i18n/transformTranslations.js
const fs = require('fs');
const path = require('path');

// Define paths
const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const i18nDir = path.join(srcDir, 'lib', 'i18n');
const termsFilePath = path.join(i18nDir, 'terms.ts');
const outputDir = path.join(i18nDir, 'translations');

console.log('Starting translation transformation process...');
console.log(`Current directory: ${rootDir}`);
console.log(`Looking for terms.ts at: ${termsFilePath}`);

// Check if terms.ts exists
if (!fs.existsSync(termsFilePath)) {
  console.error(`Error: Cannot find terms.ts at ${termsFilePath}`);
  console.log('Make sure you are running this script from the project root.');
  process.exit(1);
}

// Read the terms.ts file
let termsContent;
try {
  termsContent = fs.readFileSync(termsFilePath, 'utf8');
  console.log('Successfully read terms.ts file.');
} catch (error) {
  console.error(`Error reading terms.ts: ${error.message}`);
  process.exit(1);
}

// Extract the translations object
const translationsMatch = termsContent.match(/export const translations\s*:\s*[^=]*=\s*({[\s\S]*?});/m);

if (!translationsMatch) {
  console.error('Could not find translations object in terms.ts');
  process.exit(1);
}

console.log('Found translations object in terms.ts.');

// Process the translations object
let translationsString = translationsMatch[1];

// Instead of parsing directly, we'll use a safer approach
// We'll convert the TS code to JS for evaluation
let translationsObj;
try {
  // Replace TypeScript specific syntax
  translationsString = translationsString
    .replace(/Record<string, Partial<Record<SupportedLanguage, string>>>/g, '')
    .replace(/\/\/.*$/gm, ''); // Remove comments
  
  // Add a wrapper to safely evaluate
  const evalCode = `
    (function() {
      return ${translationsString};
    })()
  `;
  
  // Evaluate the code to get the object
  // This is a simplified approach and might not work with complex TS syntax
  translationsObj = eval(evalCode);
  
  console.log('Successfully parsed translations object.');
} catch (error) {
  console.error(`Error parsing translations: ${error.message}`);
  console.log('Fallback to manual extraction required.');
  process.exit(1);
}

// Extract all supported languages
const supportedLanguages = new Set();

Object.values(translationsObj).forEach(translationSet => {
  Object.keys(translationSet).forEach(lang => {
    supportedLanguages.add(lang);
  });
});

console.log(`Found ${supportedLanguages.size} supported languages: ${Array.from(supportedLanguages).join(', ')}`);

// Create output directory
if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
    process.exit(1);
  }
}

// Create a JSON file for each language
let successCount = 0;
let failureCount = 0;

supportedLanguages.forEach(lang => {
  const langTranslations = {};
  
  // For each phrase
  Object.entries(translationsObj).forEach(([phrase, translationSet]) => {
    // English is special as phrases are the keys
    if (lang === 'en') {
      langTranslations[phrase] = phrase;
    } 
    // For non-English languages
    else if (translationSet[lang]) {
      langTranslations[phrase] = translationSet[lang];
    } else {
      // Fallback to English for missing translations
      langTranslations[phrase] = phrase;
    }
  });
  
  // Write to file
  const filePath = path.join(outputDir, `${lang}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(langTranslations, null, 2));
    console.log(`Created translation file: ${filePath}`);
    successCount++;
  } catch (error) {
    console.error(`Error writing ${lang}.json: ${error.message}`);
    failureCount++;
  }
});

// Create an index file with metadata about available translations
const indexContent = `// Generated file - do not edit manually
export const availableTranslations = ${JSON.stringify(Array.from(supportedLanguages), null, 2)};
`;

try {
  fs.writeFileSync(path.join(outputDir, 'index.js'), indexContent);
  console.log('Created translations index.js file.');
} catch (error) {
  console.error(`Error writing index.js: ${error.message}`);
  failureCount++;
}

console.log(`
Transformation complete!
- Successfully processed: ${successCount} language files
- Failed: ${failureCount} language files
- Output directory: ${outputDir}
`);

if (failureCount > 0) {
  process.exit(1);
}