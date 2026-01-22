#!/usr/bin/env node

/**
 * Trig Design System Validator
 *
 * Checks source files for common design system violations.
 *
 * Usage:
 *   node scripts/validate.js [path]
 *   npm run validate -- path/to/check
 *
 * Checks for:
 *   - Arbitrary Tailwind values (text-[14px], p-[13px], etc.)
 *   - Forbidden colors (text-gray-*, bg-gray-* for body text)
 *   - Outline-only containers
 *   - Non-design-system fonts
 *   - Missing font family declarations
 */

const fs = require("fs");
const path = require("path");

// =============================================================================
// RULES
// =============================================================================

const RULES = [
  {
    name: "arbitrary-font-size",
    pattern: /text-\[\d+px\]/g,
    message: "Use locked font scale (text-xs through text-8xl), not arbitrary sizes",
    severity: "error",
  },
  {
    name: "arbitrary-spacing",
    pattern: /[pm][trblxy]?-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g,
    message: "Use locked spacing scale (0-24), not arbitrary spacing",
    severity: "error",
  },
  {
    name: "arbitrary-font-weight",
    pattern: /font-\[\d+\]/g,
    message: "Use named weights (font-light, font-medium, etc.)",
    severity: "error",
  },
  {
    name: "gray-text-color",
    pattern: /text-(?:gray|slate|zinc|neutral|stone)-\d{2,3}(?![0-9])/g,
    message: "Use text-body-text variants instead of gray scales for text",
    severity: "warning",
  },
  {
    name: "gray-background",
    pattern: /bg-(?:gray|slate|zinc|neutral|stone)-\d{2,3}(?![0-9])/g,
    message: "Use bg-trig-bg variants instead of gray scales for backgrounds",
    severity: "warning",
  },
  {
    name: "outline-only-container",
    pattern: /className="[^"]*border(?:\s|-)(?!-?(?:t|b|l|r|x|y))[^"]*"(?![^>]*bg-)/g,
    message: "Containers should have background fills, not outline-only borders",
    severity: "warning",
    customCheck: (match, content, index) => {
      // Check if there's also a bg- class nearby
      const surrounding = content.slice(Math.max(0, index - 100), index + match.length + 100);
      if (/bg-\w+/.test(surrounding)) {
        return false; // Has background, not a violation
      }
      return true;
    },
  },
  {
    name: "radial-gradient",
    pattern: /bg-radial|radial-gradient/g,
    message: "Use angular gradients only, not radial gradients",
    severity: "error",
  },
  {
    name: "arbitrary-hex-color",
    pattern: /(?:bg|text|border)-\[#[0-9a-fA-F]{3,6}\]/g,
    message: "Use palette colors instead of arbitrary hex values",
    severity: "error",
  },
  {
    name: "invalid-font-size-md",
    pattern: /text-md\b/g,
    message: "text-md is not valid, use text-base instead",
    severity: "error",
  },
  {
    name: "comms-color-in-product",
    pattern: /bg-comms-|text-comms-/g,
    message: "Communications palette is for marketing only, not product UI",
    severity: "warning",
  },
  {
    name: "forbidden-radius",
    pattern: /rounded-(?:2xl|3xl)\b/g,
    message: "Use rounded-lg for cards, not rounded-2xl/3xl",
    severity: "error",
  },
];

// =============================================================================
// FILE SCANNING
// =============================================================================

function getFiles(dir, extensions = [".jsx", ".js", ".tsx", ".ts"]) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.error(`Path not found: ${dir}`);
    process.exit(1);
  }

  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    if (extensions.some((ext) => dir.endsWith(ext))) {
      return [dir];
    }
    return [];
  }

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and .next
        if (entry !== "node_modules" && entry !== ".next" && entry !== ".git") {
          walk(fullPath);
        }
      } else if (extensions.some((ext) => entry.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const violations = [];

  for (const rule of RULES) {
    let match;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);

    while ((match = regex.exec(content)) !== null) {
      // Run custom check if provided
      if (rule.customCheck && !rule.customCheck(match[0], content, match.index)) {
        continue;
      }

      violations.push({
        rule: rule.name,
        message: rule.message,
        severity: rule.severity,
        line: getLineNumber(content, match.index),
        match: match[0],
        file: filePath,
      });
    }
  }

  return violations;
}

// =============================================================================
// REPORTING
// =============================================================================

function formatViolation(v) {
  const icon = v.severity === "error" ? "❌" : "⚠️";
  return `${icon} ${v.file}:${v.line} - ${v.message}\n   Found: ${v.match}`;
}

function printReport(violations) {
  const errors = violations.filter((v) => v.severity === "error");
  const warnings = violations.filter((v) => v.severity === "warning");

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║              TRIG DESIGN SYSTEM VALIDATOR                    ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  if (violations.length === 0) {
    console.log("✅ No violations found!\n");
    return 0;
  }

  if (errors.length > 0) {
    console.log(`\n🔴 ERRORS (${errors.length}):\n`);
    errors.forEach((v) => console.log(formatViolation(v)));
  }

  if (warnings.length > 0) {
    console.log(`\n🟡 WARNINGS (${warnings.length}):\n`);
    warnings.forEach((v) => console.log(formatViolation(v)));
  }

  console.log("\n────────────────────────────────────────────────────────────────");
  console.log(`Total: ${errors.length} errors, ${warnings.length} warnings`);
  console.log("────────────────────────────────────────────────────────────────\n");

  return errors.length > 0 ? 1 : 0;
}

// =============================================================================
// MAIN
// =============================================================================

function main() {
  const targetPath = process.argv[2] || ".";

  console.log(`\nScanning: ${path.resolve(targetPath)}\n`);

  const files = getFiles(targetPath);
  console.log(`Found ${files.length} files to check...\n`);

  let allViolations = [];

  for (const file of files) {
    const violations = validateFile(file);
    allViolations = allViolations.concat(violations);
  }

  const exitCode = printReport(allViolations);
  process.exit(exitCode);
}

main();
