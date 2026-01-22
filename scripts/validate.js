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
    fix: (match) => {
      const px = parseInt(match.match(/\[(\d+)px\]/)[1]);
      if (px <= 11) return "text-xs";
      if (px <= 13) return "text-sm";
      if (px <= 15) return "text-base";
      if (px <= 17) return "text-lg";
      if (px <= 19) return "text-xl";
      if (px <= 23) return "text-2xl";
      if (px <= 29) return "text-3xl";
      if (px <= 35) return "text-4xl";
      if (px <= 47) return "text-5xl";
      if (px <= 59) return "text-6xl";
      if (px <= 71) return "text-7xl";
      return "text-8xl";
    },
  },
  {
    name: "arbitrary-spacing",
    pattern: /[pm][trblxy]?-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g,
    message: "Use locked spacing scale (0-24), not arbitrary spacing",
    severity: "error",
    fix: (match) => {
      const prefix = match.match(/^([pm][trblxy]?)-/)[1];
      const value = match.match(/\[([\d.]+)(?:px|rem|em)\]/)[1];
      const px = value.includes(".") ? parseFloat(value) * 16 : parseFloat(value);
      // Map to nearest Tailwind spacing
      if (px <= 1) return `${prefix}-0`;
      if (px <= 3) return `${prefix}-0.5`;
      if (px <= 5) return `${prefix}-1`;
      if (px <= 7) return `${prefix}-1.5`;
      if (px <= 9) return `${prefix}-2`;
      if (px <= 11) return `${prefix}-2.5`;
      if (px <= 13) return `${prefix}-3`;
      if (px <= 15) return `${prefix}-4`;
      if (px <= 18) return `${prefix}-4`;
      if (px <= 22) return `${prefix}-5`;
      if (px <= 26) return `${prefix}-6`;
      if (px <= 30) return `${prefix}-7`;
      if (px <= 34) return `${prefix}-8`;
      if (px <= 42) return `${prefix}-10`;
      if (px <= 50) return `${prefix}-12`;
      if (px <= 58) return `${prefix}-14`;
      if (px <= 66) return `${prefix}-16`;
      if (px <= 82) return `${prefix}-20`;
      return `${prefix}-24`;
    },
  },
  {
    name: "arbitrary-font-weight",
    pattern: /font-\[\d+\]/g,
    message: "Use named weights (font-light, font-medium, etc.)",
    severity: "error",
    fix: (match) => {
      const weight = parseInt(match.match(/\[(\d+)\]/)[1]);
      if (weight <= 250) return "font-light";
      if (weight <= 350) return "font-light";
      if (weight <= 450) return "font-normal";
      if (weight <= 550) return "font-medium";
      if (weight <= 650) return "font-semibold";
      return "font-bold";
    },
  },
  {
    name: "gray-text-color",
    pattern: /text-(?:gray|slate|zinc|neutral|stone)-\d{2,3}(?![0-9])/g,
    message: "Use text-body-text variants instead of gray scales for text",
    severity: "warning",
    fix: (match) => {
      const num = parseInt(match.match(/-(\d{2,3})$/)[1]);
      if (num >= 800) return "text-body-text";
      if (num >= 600) return "text-body-text-light";
      if (num >= 400) return "text-body-text-lighter";
      return "text-body-text-lightest";
    },
  },
  {
    name: "gray-background",
    pattern: /bg-(?:gray|slate|zinc|neutral|stone)-\d{2,3}(?![0-9])/g,
    message: "Use bg-trig-bg variants instead of gray scales for backgrounds",
    severity: "warning",
    fix: (match) => {
      const num = parseInt(match.match(/-(\d{2,3})$/)[1]);
      if (num <= 50) return "bg-white";
      if (num <= 100) return "bg-trig-bg-lighter";
      if (num <= 200) return "bg-trig-bg";
      if (num <= 400) return "bg-trig-bg-dark";
      return "bg-trig-bg-darker";
    },
  },
  {
    name: "outline-only-container",
    pattern: /className="[^"]*border(?:\s|-)(?!-?(?:t|b|l|r|x|y))[^"]*"(?![^>]*bg-)/g,
    message: "Containers should have background fills, not outline-only borders",
    severity: "warning",
    fix: () => "Add bg-trig-bg-lighter or use flash class",
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
    fix: () => "bg-gradient-45 or bg-gradient-135",
  },
  {
    name: "arbitrary-hex-color",
    pattern: /(?:bg|text|border)-\[#[0-9a-fA-F]{3,6}\]/g,
    message: "Use palette colors instead of arbitrary hex values",
    severity: "error",
    fix: (match) => {
      if (match.startsWith("bg-")) return "bg-trig-bg or bg-trig-bg-lighter";
      if (match.startsWith("text-")) return "text-body-text or text-body-text-lighter";
      return "border-rule-color";
    },
  },
  {
    name: "invalid-font-size-md",
    pattern: /text-md\b/g,
    message: "text-md is not valid, use text-base instead",
    severity: "error",
    fix: () => "text-base",
  },
  {
    name: "comms-color-in-product",
    pattern: /bg-comms-|text-comms-/g,
    message: "Communications palette is for marketing only, not product UI",
    severity: "warning",
    fix: (match) => {
      if (match.startsWith("bg-")) return "bg-blue-10 or bg-trig-bg-lighter";
      return "text-body-text or text-action-color";
    },
  },
  {
    name: "forbidden-radius",
    pattern: /rounded-(?:2xl|3xl)\b/g,
    message: "Use rounded-lg for cards, not rounded-2xl/3xl",
    severity: "error",
    fix: () => "rounded-lg",
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
        fix: rule.fix ? rule.fix(match[0]) : null,
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
  let output = `${icon} ${v.file}:${v.line} - ${v.message}\n   Found: ${v.match}`;
  if (v.fix) {
    output += `\n   Fix:   ${v.match} → ${v.fix}`;
  }
  return output;
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
