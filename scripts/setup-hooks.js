#!/usr/bin/env node

/**
 * Trig Design System - Git Hooks Setup
 *
 * Sets up a pre-commit hook to run the design system validator
 * before each commit. Violations will block the commit.
 *
 * Usage:
 *   node node_modules/@trig/design-system/scripts/setup-hooks.js
 *   npm run setup-hooks (if added to package.json)
 */

const fs = require("fs");
const path = require("path");

// Find the project root (where .git lives)
function findProjectRoot(startDir) {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, ".git"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}

const projectRoot = findProjectRoot(process.cwd());

if (!projectRoot) {
  console.log("⚠️  No .git directory found. Skipping hook setup.");
  console.log("   Initialize git first: git init");
  process.exit(0);
}

const hooksDir = path.join(projectRoot, ".git", "hooks");
const preCommitPath = path.join(hooksDir, "pre-commit");

// The pre-commit hook script
const hookScript = `#!/bin/sh
#
# Trig Design System Pre-Commit Hook
# Validates code against design system rules before committing
#

# Find the validator script
VALIDATOR="node_modules/@trig/design-system/scripts/validate.js"

if [ ! -f "$VALIDATOR" ]; then
  # Try alternative path
  VALIDATOR="./node_modules/@trig/design-system/scripts/validate.js"
fi

if [ ! -f "$VALIDATOR" ]; then
  echo "⚠️  Design system validator not found, skipping check"
  exit 0
fi

# Get list of staged .js, .jsx, .ts, .tsx files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(jsx?|tsx?)$' | grep -v node_modules || true)

if [ -z "$STAGED_FILES" ]; then
  # No relevant files staged
  exit 0
fi

echo ""
echo "🎨 Running Trig Design System validator..."
echo ""

# Run validator on each staged file
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
  echo ""
  echo "To bypass this check (not recommended):"
  echo "  git commit --no-verify"
  echo ""
  exit 1
fi

echo "✅ Design system check passed"
echo ""
exit 0
`;

// Ensure hooks directory exists
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

// Check if pre-commit hook already exists
if (fs.existsSync(preCommitPath)) {
  const existing = fs.readFileSync(preCommitPath, "utf-8");
  if (existing.includes("Trig Design System")) {
    console.log("✅ Pre-commit hook already installed");
    process.exit(0);
  }

  // Backup existing hook
  const backupPath = preCommitPath + ".backup";
  fs.copyFileSync(preCommitPath, backupPath);
  console.log(`📦 Backed up existing pre-commit hook to ${backupPath}`);
}

// Write the hook
fs.writeFileSync(preCommitPath, hookScript, { mode: 0o755 });
console.log("✅ Pre-commit hook installed");
console.log("");
console.log("The validator will now run before each commit.");
console.log("To skip validation: git commit --no-verify");
console.log("");
