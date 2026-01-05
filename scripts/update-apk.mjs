import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get version from args
const versionArg = process.argv[2];

if (!versionArg) {
  console.error('Error: Please provide a version string (e.g., v1-3)');
  console.log('Usage: npm run update-apk -- v1-3');
  process.exit(1);
}

// Clean up the version string if user provides "v1.3" -> "v1-3" or just uses "v1-3"
// We want to enforce the filename format "hawk-buddy-VERSION.apk"
// Let's assume the user provides the suffix part "v1-3" or "1.3"
let versionSuffix = versionArg;

// Optional: Normalize dots to dashes if preferred, or just trust the user input.
// Given previous context "v1-2", let's suggest/enforce safe chars.
if (!/^[a-zA-Z0-9-_.]+$/.test(versionSuffix)) {
    console.error('Error: Version string contains invalid characters. Use letters, numbers, dashes, or dots.');
    process.exit(1);
}

const newFilename = `hawk-buddy-${versionSuffix}.apk`;
const rootDir = path.resolve(__dirname, '..');

const filesToUpdate = [
  {
    path: path.join(rootDir, 'components/ProjectsSection.tsx'),
    replacements: [
      {
        regex: /hawk-buddy-[a-zA-Z0-9-_.]+\.apk/g,
        replacement: newFilename
      }
    ]
  },
  {
    path: path.join(rootDir, 'public/downloads/README.md'),
    replacements: [
      {
        regex: /hawk-buddy-[a-zA-Z0-9-_.]+\.apk/g,
        replacement: newFilename
      }
    ]
  }
];

console.log(`\n🚀 Updating APK version references to: ${newFilename}\n`);

let totalUpdates = 0;

for (const file of filesToUpdate) {
  try {
    const relPath = path.relative(rootDir, file.path);
    if (!fs.existsSync(file.path)) {
      console.warn(`⚠️  Warning: File not found: ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(file.path, 'utf8');
    let originalContent = content;

    for (const rule of file.replacements) {
        content = content.replace(rule.regex, rule.replacement);
    }

    if (content !== originalContent) {
      fs.writeFileSync(file.path, content, 'utf8');
      console.log(`✅ Updated ${relPath}`);
      totalUpdates++;
    } else {
      console.log(`ℹ️  No changes needed for ${relPath} (already up to date or pattern not found)`);
    }

  } catch (err) {
    console.error(`❌ Error updating ${file.path}:`, err.message);
  }
}

if (totalUpdates > 0) {
    console.log(`\n✨ Success! ${totalUpdates} files updated.`);
    console.log(`\n📋 Next Steps:`);
    console.log(`1. Upload the file to your Cloudflare R2 bucket:`);
    console.log(`   File: ${newFilename}`);
    console.log(`2. (Optional) If you have a local copy in public/downloads/ for backup, rename it:`);
    console.log(`   mv public/downloads/hawk-buddy-OLD_VERSION.apk public/downloads/${newFilename}`);
    console.log(`3. Commit your changes.`);
} else {
    console.log(`\nNo files were changed.`);
}
