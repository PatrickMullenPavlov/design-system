#!/usr/bin/env node

/**
 * Trig Design System - Postinstall Setup
 *
 * Automatically configures the consuming project after npm install.
 */

const fs = require("fs");
const path = require("path");

// Find the consuming project's root (go up from node_modules/@trig/design-system)
const packageRoot = path.resolve(__dirname, "..");
const nodeModules = path.resolve(packageRoot, "..");
const projectRoot = path.resolve(nodeModules, "..", "..");

// Check if we're in a consuming project (not during our own development)
const isConsuming = fs.existsSync(path.join(projectRoot, "package.json")) &&
                    !fs.existsSync(path.join(projectRoot, "components", "brand"));

if (!isConsuming) {
  // We're in the design-system repo itself, skip setup
  process.exit(0);
}

console.log("\n🎨 Setting up Trig Design System...\n");

// =============================================================================
// 1. COPY CLAUDE.md
// =============================================================================
const sourceClaude = path.join(packageRoot, "CLAUDE.md");
const targetClaude = path.join(projectRoot, "CLAUDE.md");

try {
  if (fs.existsSync(targetClaude)) {
    // Append reference if CLAUDE.md exists
    const existing = fs.readFileSync(targetClaude, "utf-8");
    if (!existing.includes("@trig/design-system")) {
      const addition = `\n\n---\n\n## Trig Design System\n\nThis project uses the Trig Design System. See \`node_modules/@trig/design-system/CLAUDE.md\` for all component rules and patterns.\n`;
      fs.appendFileSync(targetClaude, addition);
      console.log("✅ Updated CLAUDE.md with design system reference");
    }
  } else {
    // Copy CLAUDE.md if it doesn't exist
    fs.copyFileSync(sourceClaude, targetClaude);
    console.log("✅ Created CLAUDE.md with design system rules");
  }
} catch (err) {
  console.log("⚠️  Could not update CLAUDE.md:", err.message);
}

// =============================================================================
// 2. UPDATE TAILWIND CONFIG
// =============================================================================
const tailwindConfigPath = path.join(projectRoot, "tailwind.config.js");
const tailwindConfigMjs = path.join(projectRoot, "tailwind.config.mjs");
const tailwindConfigTs = path.join(projectRoot, "tailwind.config.ts");

const tailwindTemplate = `const trigConfig = require("@trig/design-system/tailwind.config");

module.exports = {
  presets: [trigConfig],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@trig/design-system/components/**/*.{js,jsx}",
  ],
};
`;

try {
  if (fs.existsSync(tailwindConfigPath)) {
    const existing = fs.readFileSync(tailwindConfigPath, "utf-8");
    if (!existing.includes("@trig/design-system")) {
      // Backup and replace
      fs.writeFileSync(tailwindConfigPath + ".backup", existing);
      fs.writeFileSync(tailwindConfigPath, tailwindTemplate);
      console.log("✅ Updated tailwind.config.js (backup saved as .backup)");
    } else {
      console.log("✅ tailwind.config.js already configured");
    }
  } else if (fs.existsSync(tailwindConfigMjs) || fs.existsSync(tailwindConfigTs)) {
    console.log("⚠️  Found .mjs/.ts tailwind config - please update manually:");
    console.log('   Add: presets: [require("@trig/design-system/tailwind.config")]');
    console.log('   Add to content: "./node_modules/@trig/design-system/components/**/*.{js,jsx}"');
  } else {
    // Create new tailwind config
    fs.writeFileSync(tailwindConfigPath, tailwindTemplate);
    console.log("✅ Created tailwind.config.js");
  }
} catch (err) {
  console.log("⚠️  Could not update tailwind config:", err.message);
}

// =============================================================================
// 3. UPDATE CSS FILE
// =============================================================================
const possibleCssFiles = [
  "src/index.css",
  "src/globals.css",
  "src/styles/globals.css",
  "app/globals.css",
  "styles/globals.css",
];

const cssImports = `/* Trig Design System */
@import "@trig/design-system/styles/fonts.css";
@import "@trig/design-system/styles/globals.css";

`;

let cssUpdated = false;

for (const cssFile of possibleCssFiles) {
  const cssPath = path.join(projectRoot, cssFile);
  if (fs.existsSync(cssPath)) {
    try {
      const existing = fs.readFileSync(cssPath, "utf-8");
      if (!existing.includes("@trig/design-system")) {
        // Prepend imports
        fs.writeFileSync(cssPath, cssImports + existing);
        console.log(`✅ Updated ${cssFile} with design system imports`);
        cssUpdated = true;
        break;
      } else {
        console.log(`✅ ${cssFile} already has design system imports`);
        cssUpdated = true;
        break;
      }
    } catch (err) {
      // Continue to next file
    }
  }
}

if (!cssUpdated) {
  console.log("⚠️  Could not find CSS file. Add these imports to your main CSS:");
  console.log('   @import "@trig/design-system/styles/fonts.css";');
  console.log('   @import "@trig/design-system/styles/globals.css";');
}

// =============================================================================
// 4. INSTALL PRE-COMMIT HOOK
// =============================================================================
const gitDir = path.join(projectRoot, ".git");
const hooksDir = path.join(gitDir, "hooks");
const preCommitPath = path.join(hooksDir, "pre-commit");

if (fs.existsSync(gitDir)) {
  const hookScript = `#!/bin/sh
#
# Trig Design System Pre-Commit Hook
# Validates code against design system rules before committing
#

VALIDATOR="node_modules/@trig/design-system/scripts/validate.js"

if [ ! -f "$VALIDATOR" ]; then
  exit 0
fi

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(jsx?|tsx?)$' | grep -v node_modules || true)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

echo ""
echo "🎨 Running Trig Design System validator..."
echo ""

ERRORS=0
for FILE in $STAGED_FILES; do
  if [ -f "$FILE" ]; then
    node "$VALIDATOR" "$FILE" 2>&1
    if [ $? -ne 0 ]; then
      ERRORS=1
    fi
  fi
done

if [ $ERRORS -ne 0 ]; then
  echo ""
  echo "❌ Design system violations found. Please fix before committing."
  echo "   To bypass: git commit --no-verify"
  echo ""
  exit 1
fi

exit 0
`;

  try {
    // Ensure hooks directory exists
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Check if hook already exists
    let shouldInstall = true;
    if (fs.existsSync(preCommitPath)) {
      const existing = fs.readFileSync(preCommitPath, "utf-8");
      if (existing.includes("Trig Design System")) {
        console.log("✅ Pre-commit hook already installed");
        shouldInstall = false;
      } else {
        // Backup existing hook
        fs.copyFileSync(preCommitPath, preCommitPath + ".backup");
        console.log("📦 Backed up existing pre-commit hook");
      }
    }

    if (shouldInstall) {
      fs.writeFileSync(preCommitPath, hookScript, { mode: 0o755 });
      console.log("✅ Installed pre-commit hook (validates before each commit)");
    }
  } catch (err) {
    console.log("⚠️  Could not install pre-commit hook:", err.message);
  }
} else {
  console.log("⚠️  No .git directory found - skipping pre-commit hook");
  console.log("   Run 'npm run setup-hooks' after git init to install later");
}

// =============================================================================
// DONE
// =============================================================================
console.log("\n🎉 Trig Design System ready!\n");
console.log("Import components:");
console.log('  import { PrimaryButton, Card, SectionHeader } from "@trig/design-system";\n');
