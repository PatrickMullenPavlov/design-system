# Trig Design System - Claude Agent Instructions

This document provides prescriptive rules for maintaining consistent styling across all Trig projects. Follow these patterns exactly.

---

## Setup

**Setup is automatic.** When you run `npm install`, the postinstall script:
- Updates `tailwind.config.js` to use the Trig preset
- Adds font/style imports to your CSS file
- Copies this CLAUDE.md to your project root
- Installs a pre-commit hook that validates code before each commit

**If automatic setup didn't work**, manually configure:

```js
// tailwind.config.js
const trigConfig = require("@trig/design-system/tailwind.config");

module.exports = {
  presets: [trigConfig],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@trig/design-system/components/**/*.{js,jsx}",
  ],
};
```

```css
/* In your main CSS file */
@import "@trig/design-system/styles/fonts.css";
@import "@trig/design-system/styles/globals.css";
```

---

## ⛔ NEVER DO THIS (Anti-Patterns)

**These are hard rules. Violations will cause visual inconsistency.**

### Colors
- ❌ **NEVER** use raw Tailwind grays: `zinc-*`, `stone-*`, `slate-*`, `gray-*`, `neutral-*`
- ❌ **NEVER** use arbitrary hex colors: `bg-[#f5f5f5]`, `text-[#333]`
- ❌ **NEVER** use bright/saturated default Tailwind colors

### Containers
- ❌ **NEVER** create outline-only containers (border without background fill)
- ❌ **NEVER** use dashed borders for content areas
- ❌ **NEVER** use `rounded-2xl` or `rounded-3xl` for cards (use `rounded-lg`)

### Typography
- ❌ **NEVER** write custom `<h1>`, `<h2>`, `<h3>` elements — use `<SectionHeader>`
- ❌ **NEVER** use arbitrary font sizes: `text-[14px]`, `text-[15px]`
- ❌ **NEVER** use arbitrary font weights: `font-[450]`, `font-[550]`
- ❌ **NEVER** use fonts other than Circular

### Buttons & Rounding
- ❌ **NEVER** use `rounded-full` except on `PrimaryButton`
- ❌ **NEVER** create custom button styles — use the button components
- ❌ **NEVER** use pill shapes on cards, containers, or inputs

### Spacing
- ❌ **NEVER** use arbitrary spacing: `p-[13px]`, `m-[7px]`, `gap-[9px]`
- ❌ **NEVER** use inline styles for spacing

```
╔═══════════════════════════════════════════════════════════════════╗
║  If you catch yourself typing [  ] for any Tailwind value,        ║
║  STOP and find the correct design system token instead.           ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## ✅ REQUIRED Components

**These components MUST be used. Do not create custom implementations.**

| Instead of...              | You MUST use...                          |
|----------------------------|------------------------------------------|
| Custom `<h1>`, `<h2>`, `<h3>` | `<SectionHeader size="xl/lg/md/sm">` |
| Custom heading styles      | `<SectionHeader>` component              |
| Custom primary button      | `<PrimaryButton>` component              |
| Custom secondary button    | `<SecondaryButton>` component            |
| Custom icon button         | `<IconButton>` component                 |
| Custom text input          | `<TextInput>` component                  |
| Custom select dropdown     | `<SelectInput>` component                |
| Custom alert/message       | `<Alert>` component                      |
| Custom modal/dialog        | `<Modal>` component                      |
| Custom card container      | `<Card>` component                       |

```jsx
// ❌ WRONG - custom heading
<h1 className="text-4xl font-bold">Welcome</h1>

// ✅ CORRECT - use SectionHeader
<SectionHeader title="Welcome" size="xl" />

// ❌ WRONG - custom button
<button className="bg-black text-white px-4 py-2 rounded-full">Submit</button>

// ✅ CORRECT - use PrimaryButton
<PrimaryButton label="Submit" />
```

---

## 🔄 Migration Patterns

**When applying the design system to existing code, use these replacements:**

### Colors
| If you see...                          | Replace with...              |
|----------------------------------------|------------------------------|
| `text-zinc-*`, `text-stone-*`          | `text-body-text-*`           |
| `text-slate-*`, `text-neutral-*`       | `text-body-text-*`           |
| `text-gray-900`, `text-gray-800`       | `text-body-text`             |
| `text-gray-600`, `text-gray-500`       | `text-body-text-lighter`     |
| `text-gray-400`, `text-gray-300`       | `text-body-text-lightest`    |
| `bg-zinc-*`, `bg-stone-*`, `bg-slate-*`| `bg-trig-bg-*`               |
| `bg-gray-50`, `bg-gray-100`            | `bg-trig-bg-lighter`         |
| `bg-gray-200`                          | `bg-trig-bg`                 |
| `border-gray-*`                        | `border-rule-color`          |

### Containers
| If you see...                          | Replace with...              |
|----------------------------------------|------------------------------|
| `border border-gray-200` (no bg)       | `bg-trig-bg-lighter`         |
| `border border-gray-300` (no bg)       | `bg-trig-bg-lighter`         |
| `ring-1 ring-gray-200` (no bg)         | `bg-trig-bg-lighter`         |
| `rounded-2xl` on cards                 | `rounded-lg`                 |
| `rounded-3xl` on cards                 | `rounded-lg`                 |

### Typography
| If you see...                          | Replace with...              |
|----------------------------------------|------------------------------|
| `<h1 className="...">Title</h1>`       | `<SectionHeader title="Title" size="xl" />` |
| `<h2 className="...">Title</h2>`       | `<SectionHeader title="Title" size="lg" />` |
| `<h3 className="...">Title</h3>`       | `<SectionHeader title="Title" size="md" />` |
| `text-[14px]`, `text-[15px]`           | `text-sm` or `text-base`     |
| `text-[13px]`                          | `text-xs` or `text-sm`       |

### Buttons
| If you see...                          | Replace with...              |
|----------------------------------------|------------------------------|
| Custom primary button markup           | `<PrimaryButton label="..." />` |
| Custom secondary button markup         | `<SecondaryButton label="..." />` |
| `rounded-full` on non-primary buttons  | `rounded-md`                 |

---

## 📊 Visual Reference

### Container Styling

```
❌ WRONG — Outline Only (no background):
┌─────────────────────────────────┐
│                                 │
│   border border-gray-200        │
│   (empty, cold, clinical)       │
│                                 │
└─────────────────────────────────┘

✅ CORRECT — Background Fill:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓                                 ▓
▓   bg-trig-bg-lighter            ▓
▓   (warm, filled, intentional)   ▓
▓                                 ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

✅ CORRECT — Flash Pattern:
░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░
▒                                 ▒
░   flash class                   ░
▒   (subtle diagonal stripes)     ▒
░                                 ░
░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░
```

### Button Rounding

```
PrimaryButton — ONLY element with pill shape:
╭───────────────────────────────────╮
│         rounded-full              │
╰───────────────────────────────────╯

Everything else — subtle corners:
┌───────────────────────────────────┐
│         rounded-md                │
└───────────────────────────────────┘
```

### Card Rounding

```
❌ WRONG — Too rounded:
╭─────────────────────────────────────╮
│                                     │
│   rounded-2xl or rounded-3xl        │
│   (too soft, not brand)             │
│                                     │
╰─────────────────────────────────────╯

✅ CORRECT — Subtle corners:
┌─────────────────────────────────────┐
│                                     │
│   rounded-lg                        │
│   (precise, intentional)            │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 Text Color Hierarchy

**Use this guide to choose the right text color:**

| Class                     | Use for                                              |
|---------------------------|------------------------------------------------------|
| `text-body-text`          | Primary content, headings, important text, labels    |
| `text-body-text-light`    | Secondary content, supporting text, subheadings      |
| `text-body-text-lighter`  | Tertiary content, descriptions, captions, help text  |
| `text-body-text-lightest` | Placeholder text, disabled states, hints, timestamps |

**On dark backgrounds:**

| Class                          | Use for                                    |
|--------------------------------|--------------------------------------------|
| `text-light-body-text`         | Primary content on dark                    |
| `text-light-body-text-light`   | Secondary content on dark                  |
| `text-light-body-text-lighter` | Tertiary/muted content on dark             |

```jsx
// Example hierarchy
<h3 className="text-body-text font-semibold">Account Overview</h3>
<p className="text-body-text-light">Monthly revenue summary</p>
<span className="text-body-text-lighter">Last updated 2 hours ago</span>
<span className="text-body-text-lightest">ID: abc-123</span>
```

---

## 📐 SectionHeader Size Guide

**Use this guide to choose the right SectionHeader size:**

| Size      | Use for                                              | Example context                    |
|-----------|------------------------------------------------------|------------------------------------|
| `xl`      | Page hero, primary landing section                   | Homepage hero, main page title     |
| `lg`      | Major page sections, feature blocks                  | "Features", "How it works"         |
| `lgLight` | Major sections needing lighter visual weight         | Long-form content, less aggressive |
| `md`      | Subsections, card groups, content blocks             | "Recent activity", "Settings"      |
| `sm`      | Card headers, sidebar sections, minor headings       | Card titles, panel headers         |
| `xs`      | Labels, metadata headers, inline section markers     | "Details", "Configuration"         |

```jsx
// Page hero
<SectionHeader size="xl" title="Welcome to Trig" description="AI-powered customer engagement" />

// Major section
<SectionHeader size="lg" tag="Features" title="Everything you need" />

// Card group header
<SectionHeader size="md" title="Recent Campaigns" alignment="left" />

// Card header
<SectionHeader size="sm" title="Campaign Details" alignment="left" />

// Metadata label
<SectionHeader size="xs" title="Advanced Settings" alignment="left" />
```

---

## 🌗 Dark Mode Patterns

**Light mode to dark mode mappings:**

| Light Mode            | Dark Mode                    |
|-----------------------|------------------------------|
| `bg-white`            | `dark:bg-trig-bg-darker`     |
| `bg-trig-bg`          | `dark:bg-trig-bg-darkest`    |
| `bg-trig-bg-lighter`  | `dark:bg-trig-bg-dark`       |
| `bg-green-10`         | `dark:bg-green-900/20`       |
| `bg-red-10`           | `dark:bg-red-900/20`         |
| `bg-blue-10`          | `dark:bg-blue-900/20`        |
| `bg-orange-10`        | `dark:bg-orange-900/20`      |
| `text-body-text`      | `dark:text-light-body-text`  |
| `text-body-text-lighter` | `dark:text-light-body-text-lighter` |
| `border-rule-color`   | `dark:border-white/10`       |

```jsx
// Card with dark mode support
<div className="bg-trig-bg-lighter dark:bg-trig-bg-dark rounded-lg p-4">
  <h3 className="text-body-text dark:text-light-body-text font-semibold">Title</h3>
  <p className="text-body-text-lighter dark:text-light-body-text-lighter">Description</p>
</div>

// Status badge with dark mode
<div className="bg-green-10 dark:bg-green-900/20 text-green px-2 py-1 rounded-md">
  Active
</div>
```

---

## 🔢 Arbitrary Value Policy

**What's allowed vs. forbidden:**

| Category        | ❌ NEVER                           | ✅ OK                              |
|-----------------|------------------------------------|------------------------------------|
| Font sizes      | `text-[11px]`, `text-[13px]`       | `text-xs`, `text-sm`, `text-base`  |
| Font weights    | `font-[450]`, `font-[550]`         | `font-light`, `font-medium`        |
| Colors          | `bg-[#123456]`, `text-[#fff]`      | `bg-trig-bg`, `text-body-text`     |
| Spacing         | `p-[13px]`, `m-[7px]`              | `p-4`, `m-2`, `gap-6`              |
| Half-steps      | —                                  | `p-1.5`, `p-2.5`, `gap-0.5` ✅     |
| Border radius   | `rounded-[10px]`                   | `rounded-md`, `rounded-lg`         |

**Half-step spacing (0.5, 1.5, 2.5, 3.5) is permitted** when the full steps don't fit:

```jsx
// ✅ OK - Tailwind's built-in half-steps
<button className="px-2.5 py-1.5">Small button</button>
<div className="gap-0.5">Tight gap</div>

// ❌ NEVER - arbitrary values
<button className="px-[11px] py-[7px]">Bad button</button>
<div className="gap-[3px]">Bad gap</div>
```

---

## 📋 Copy-Paste Patterns

### Card with Header

```jsx
<Card>
  <SectionHeader
    size="sm"
    title="Card Title"
    description="Optional description text"
    alignment="left"
  />
  <div className="mt-4">
    {/* Card content */}
  </div>
</Card>
```

### Card with Visual + Content

```jsx
<div className="rounded-lg bg-trig-bg-lighter dark:bg-trig-bg-dark overflow-hidden">
  {/* Visual area with flash background */}
  <div className="flash p-6">
    <img src="/illustration.svg" alt="" className="w-full h-auto" />
  </div>
  {/* Content area */}
  <div className="p-5">
    <h3 className="text-base font-semibold text-body-text dark:text-light-body-text mb-2">
      Feature Title
    </h3>
    <p className="text-sm text-body-text-lighter dark:text-light-body-text-lighter">
      Feature description goes here.
    </p>
  </div>
</div>
```

### Status Alert

```jsx
<Alert type="success" title="Campaign Launched" message="Your campaign is now live." />

// Or manually:
<div className="flex items-start gap-3 p-4 rounded-lg bg-green-10 dark:bg-green-900/20">
  <CheckCircleIcon className="w-5 h-5 text-green flex-shrink-0" />
  <div>
    <p className="text-sm font-medium text-body-text dark:text-light-body-text">Success</p>
    <p className="text-sm text-body-text-lighter dark:text-light-body-text-lighter">
      Your changes have been saved.
    </p>
  </div>
</div>
```

### Form Field Group

```jsx
<div className="space-y-4">
  <TextInput
    label="Campaign Name"
    description="Choose a memorable name"
    placeholder="e.g., Q1 Onboarding"
    value={name}
    onChange={setName}
    required
  />
  <SelectInput
    label="Target Segment"
    placeholder="Select a segment"
    options={segments}
    value={segment}
    onChange={setSegment}
    required
  />
  <div className="flex gap-2 pt-4">
    <PrimaryButton label="Create Campaign" onClick={handleCreate} />
    <SecondaryButton label="Cancel" onClick={handleCancel} />
  </div>
</div>
```

### Page Section

```jsx
<Section>
  <SectionHeader
    size="lg"
    tag="Features"
    title="Everything you need"
    description="Powerful tools for customer engagement"
    alignment="center"
  />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    {features.map((feature) => (
      <Card key={feature.id}>
        {/* Feature content */}
      </Card>
    ))}
  </div>
</Section>
```

### Empty State

```jsx
<EmptyState
  title="No campaigns yet"
  description="Create your first campaign to start engaging customers"
  buttonLabel="Create Campaign"
  onClick={() => navigate("/campaigns/new")}
/>
```

---

## 🔍 Automated Validation

**The design system includes a validation script and pre-commit hook.**

### Pre-Commit Hook (Automatic)

A pre-commit hook is installed automatically during `npm install`. It validates staged files before each commit:

```
🎨 Running Trig Design System validator...

❌ src/components/Card.jsx:24 - Use locked font scale, not arbitrary sizes
   Found: text-[14px]
   Fix:   text-[14px] → text-sm

❌ Design system violations found. Please fix before committing.
```

To bypass (not recommended): `git commit --no-verify`

If git wasn't initialized during install, run later:
```bash
npm run setup-hooks
```

### Manual Validation

```bash
# Check your entire src folder
node node_modules/@trig/design-system/scripts/validate.js src/

# Check a specific file
node node_modules/@trig/design-system/scripts/validate.js src/components/MyComponent.jsx
```

**Add to your package.json:**

```json
{
  "scripts": {
    "lint:design": "node node_modules/@trig/design-system/scripts/validate.js src/"
  }
}
```

### What It Checks

| Violation | Example | Fix Suggestion |
|-----------|---------|----------------|
| Arbitrary font sizes | `text-[14px]` | `text-sm` |
| Arbitrary spacing | `p-[13px]` | `p-3` |
| Arbitrary weights | `font-[450]` | `font-normal` |
| Arbitrary colors | `bg-[#fff]` | `bg-white` |
| Raw Tailwind grays | `text-gray-600` | `text-body-text-lighter` |
| Invalid font size | `text-md` | `text-base` |
| Forbidden radius | `rounded-2xl` | `rounded-lg` |
| Radial gradients | `bg-radial` | `bg-gradient-45` |
| Comms colors in UI | `bg-comms-magenta` | `bg-blue-10` |
| Outline-only containers | `border` (no bg) | `bg-trig-bg-lighter` |

The validator shows **smart fix suggestions** based on the actual values found.

---

## Pre-Flight Checklist

**Before submitting any UI work, verify ALL of the following:**

### 1. Typography: Circular Only
- [ ] All text uses `font-brand` or `font-sans` (both map to Circular)
- [ ] No system fonts, no Arial, no Helvetica, no other typefaces
- [ ] Font weights are from the locked scale (light/normal/medium/semibold/bold)

### 2. Containers: No Outline-Only Borders
- [ ] Cards and containers use background fills (`bg-trig-bg-lighter`, `bg-white`)
- [ ] Or use the `.flash` pattern for visual interest
- [ ] **NO** empty boxes with just `border` and no background
- [ ] **NO** dashed borders around content areas

```jsx
// ❌ WRONG - outline only
<div className="border border-gray-200 rounded-lg p-4">...</div>

// ✅ CORRECT - background fill
<div className="bg-trig-bg-lighter rounded-lg p-4">...</div>

// ✅ CORRECT - flash pattern
<div className="flash rounded-lg p-4">...</div>
```

### 3. Colors: Subtle Grays Only
- [ ] Using `text-body-text` variants for text (not `text-gray-*`)
- [ ] Using `bg-trig-bg` variants for backgrounds (not `bg-gray-*`)
- [ ] Using `border-rule-color` for borders (not `border-gray-*`)
- [ ] No bright/saturated colors from default Tailwind
- [ ] All colors are from the muted, warm palette

### 4. Images & Illustrations: Flash Backgrounds
- [ ] Illustrations sit on `.flash` background (diagonal stripe pattern)
- [ ] Icons and graphics sit on `.flash` background
- [ ] Product screenshots sit on `.flash` background
- [ ] **Exception:** Hero images can be full-bleed without flash

```jsx
// ❌ WRONG - illustration on plain background
<div className="bg-white p-8">
  <img src="/illustration.svg" />
</div>

// ✅ CORRECT - illustration on flash background
<div className="flash p-8">
  <img src="/illustration.svg" />
</div>

// ✅ EXCEPTION - hero images can be full-bleed
<div className="relative h-[500px]">
  <img src="/hero.jpg" className="object-cover w-full h-full" />
</div>
```

### 5. Button Rounding: Primary Only
- [ ] **PrimaryButton uses `rounded-full`** (pill shape) - this is the ONLY exception
- [ ] All other buttons use `rounded-md` (subtle rounding)
- [ ] Cards, containers, inputs use `rounded-md` or `rounded-lg`
- [ ] **NEVER** use `rounded-full` on anything except PrimaryButton

```jsx
// ✅ CORRECT - PrimaryButton is pill-shaped
<PrimaryButton label="Get Started" />  // Uses rounded-full internally

// ✅ CORRECT - SecondaryButton has subtle rounding
<SecondaryButton label="Cancel" />  // Uses rounded-md internally

// ❌ WRONG - Don't make other buttons pill-shaped
<button className="rounded-full bg-grey-100">Cancel</button>

// ❌ WRONG - Don't make cards pill-shaped
<div className="rounded-full bg-trig-bg-lighter p-4">...</div>
```

### Quick Visual Test

Ask yourself:
1. **Does it feel warm?** — If it feels cold or clinical, check your grays
2. **Are there empty outlined boxes?** — If yes, add backgrounds or flash
3. **Is the typography consistent?** — If anything looks "off", check the font family
4. **Do images float on nothing?** — If yes, add flash backgrounds

---

## Design System Review Command

**When the user asks to "review against the design system" or "check my work", generate a detailed review checklist based on the code they've written.**

### How to Use

User can say:
- "Review this against the design system"
- "Check my work against Trig guidelines"
- "Design system audit"
- "Pre-ship checklist"

### Review Checklist Template

When asked to review, analyze the code and check each item. Mark as ✅ (pass), ❌ (fail), or ⚠️ (warning/needs attention):

```
## Design System Review

### Typography
[ ] Font family: All text uses Circular (font-brand/font-sans)
[ ] Font sizes: Only using locked scale (text-xs through text-8xl)
[ ] Font weights: Only light/normal/medium/semibold/bold
[ ] Letter spacing: Only tighter/tight/normal/wide
[ ] Line heights: Only none/tight/snug/normal/relaxed
[ ] No arbitrary values: No text-[14px], font-[450], etc.
[ ] Headings use SectionHeader component (not custom h1/h2/h3)
[ ] Body text uses text-body-text variants (not text-gray-*)

### Colors
[ ] Using muted palette: No bright/saturated Tailwind defaults
[ ] Text colors: Using text-body-text-* variants
[ ] Backgrounds: Using bg-trig-bg-* variants
[ ] Borders: Using border-rule-color
[ ] No arbitrary hex: No bg-[#fff] or text-[#333]
[ ] Status colors: Using semantic variants (red-10, green-10, etc.)

### Containers & Cards
[ ] No outline-only containers: All have background fills
[ ] Using bg-trig-bg-lighter, bg-white, or flash pattern
[ ] No border-only boxes: No border without background
[ ] No dashed borders on content areas

### Images & Illustrations
[ ] Illustrations on flash backgrounds
[ ] Screenshots on flash backgrounds
[ ] Icons on flash backgrounds (when standalone)
[ ] Exception: Hero images can be full-bleed

### Spacing
[ ] Using locked scale: 0,1,2,3,4,6,8,12,16,20,24
[ ] Half-steps used sparingly: 0.5, 1.5, 2.5
[ ] No arbitrary spacing: No p-[13px], m-[7px]
[ ] Consistent patterns: Cards p-4/p-6, sections py-12/py-16

### Components
[ ] Using SectionHeader for headings
[ ] Using CTAButton for marketing CTAs
[ ] Using PrimaryButton/SecondaryButton for actions
[ ] Using TextInput/SelectInput for forms
[ ] Using Alert for feedback messages
[ ] Using Card component (not custom containers)

### Accessibility
[ ] Buttons have visible focus states
[ ] Images have alt text
[ ] Form inputs have labels
[ ] Sufficient color contrast
[ ] No skipped heading levels

### Code Quality
[ ] No inline styles for colors/spacing/typography
[ ] Using cx() utility for conditional classes
[ ] Components are composable and reusable
[ ] No duplicate style definitions
```

### Review Output Format

When reviewing, provide:

1. **Summary**: Overall pass/fail with key issues
2. **Detailed Findings**: Each category with specific line numbers
3. **Fixes Required**: Concrete code changes needed
4. **Recommendations**: Optional improvements

Example output:
```
## Design System Review: ComponentName.jsx

### Summary
⚠️ 3 issues found, 2 critical

### Critical Issues
❌ Line 24: Using text-[15px] - use text-base instead
❌ Line 38: Outline-only container - add bg-trig-bg-lighter

### Warnings
⚠️ Line 12: Image without flash background - add flash class

### Fixes Required
1. Line 24: Change `text-[15px]` to `text-base`
2. Line 38: Change `border border-gray-200` to `bg-trig-bg-lighter`
3. Line 12: Wrap image in `<div className="flash">`

### Passed
✅ Typography font family
✅ Color palette
✅ Spacing scale
✅ Component usage
```

---

## Brand Philosophy

**The name "Trig" combines trigonometry (precision, geometry, mathematical foundations) and triggers (product actions that drive engagement). This duality — precision meets action — runs through everything.**

### The Generative Principle

**Simple units combine into complex meaning.**

This is the philosophical and visual foundation. Individual cubes become icons. Icons become patterns. Patterns become systems. This mirrors the product: individual signals combine into patterns and insights.

### What Trig Stands For

1. **Precision over ambiguity** — AI is mathematical, structured, knowable
2. **Confidence over hedging** — Bold statements, clear positions
3. **Systematic over decorative** — Every element earns its place
4. **Craft over clinical** — Warmth through texture and care, not softness

### The Core Tension We Resolve

Most AI branding falls into two traps:
- **Cold and robotic** — clinical, impersonal, intimidating
- **Amorphous and mystical** — glowing gradients, undefined shapes, AI-as-magic

**Trig rejects both.** AI is precise and mathematical, not vague or sentient. But precision doesn't mean cold. The brand is sophisticated and powerful, but never complicated.

---

## Visual System: The Cube

The **isometric cube** appears in the Trig logo and is available as a visual element — but it's **not mandatory** and shouldn't be overused.

### When to Use Cubes
- Logo and brand marks
- Hero illustrations where geometric precision fits
- Diagrams explaining structured concepts

### When NOT to Use Cubes
- Don't force cubes into every design
- Don't use them just because they're "on brand"
- Product UI doesn't need cube motifs

### If You Do Use Cubes
- Line-drawn (not filled, not 3D-rendered)
- Isometric perspective (consistent, mathematical)
- Architectural and structured, never random or scattered
- Can use hatching patterns to differentiate surfaces

---

## Framework Device: Periodic Table Treatment

For conceptual structures (like "Identify → Act → Measure"), use a **periodic table treatment**:

```
┌────┐  ┌────┐  ┌────┐
│ Id │  │ Ac │  │ Ms │
│ 01 │→ │ 02 │→ │ 03 │
└────┘  └────┘  └────┘
```

- Abbreviated labels (Id, Ac, Ms)
- Boxed/bordered elements
- Sequential numbering (01, 02, 03)
- Connected by arrows or lines

This positions concepts as fundamental building blocks — elemental, precise, scientific.

---

## Tone of Voice

### Guiding Principles

1. **Simple** — Make complexity feel navigable. Even magical.
2. **Authentic** — Disruptive because we believe differently, not for its own sake.
3. **Honest** — Open and direct. Trust through clarity.

### How We Speak

| Trait | Meaning |
|-------|---------|
| **Human** | Everyday words. Bend grammar rules if it sounds more natural. No jargon. |
| **Concise** | 100% clarity, minimum words. Write headlines as if subcopy is illegal. |
| **Energetic** | Ambitious, pacey, direct. Infectious confidence without arrogance. |
| **Modern** | Light-hearted when earned. A well-chosen reference or moment of wit. Never forced. |

### AI Positioning in Copy

AI is good news. It opens possibilities. It lets you do things you couldn't before.

- This is **not** about replacing humans
- This is **not** inevitable obsolescence
- This **is** augmentation, scale, precision

The future is now, and it's already here. Not cold, not distant. Tangible and real.

### Typography in Copy

**Exclamation first, information second.** Lead with the bold statement. Support with detail.

**Let numbers speak.** Statistics and metrics should be displayed large and confident. They are proof points, not footnotes.

**Headlines hook, body supports.** Headlines can be dramatic and abbreviated. Body copy provides the full context.

---

## Required Tools

**Every project using this design system MUST install and use these tools:**

### 1. UI Skills (Constraint System)

UI Skills enforces consistent, production-ready UI standards.

```bash
npx ui-skills init
```

**Usage:**
- `/ui-skills` — Apply constraints to UI work in conversation
- `/ui-skills <file>` — Review files against all constraints

### 2. RAMS (Design Review CLI)

RAMS audits for accessibility violations and visual design inconsistencies.

```bash
curl -fsSL https://rams.ai/install | bash
```

**Usage:**
- `/rams` — Auto-detect and prompt for files to review
- `/rams src/components/Button.jsx` — Review a specific file

**Run RAMS before every PR** to catch accessibility issues, visual inconsistencies, and UI polish problems.

---

## Design Principles

These principles are mandatory. They come from [Vercel's Design Guidelines](https://vercel.com/design/guidelines), [UI Skills](https://ui-skills.com), and [RAMS](https://rams.ai).

### Interactions

- **Keyboard accessibility is mandatory** — all flows must be keyboard-operable
- **Visible focus indicators** — use `:focus-visible` to show focus without distracting pointer users
- **Minimum hit targets** — 24px on desktop, 44px on mobile
- **URL state persistence** — enable sharing and navigation restoration where appropriate
- **Optimistic UI updates** — improve perceived responsiveness
- **AlertDialog for destructive actions** — MUST use for irreversible operations
- **Never block paste** — in `input` or `textarea` elements

### Animations

- **NEVER add animation unless explicitly requested**
- **Honor motion preferences** — respect `prefers-reduced-motion`
- **CSS over JavaScript** — prefer CSS animations when possible
- **GPU-accelerated properties only** — animate only `transform` and `opacity`
- **Maximum 200ms for interaction feedback**
- **Never use `transition: all`** — explicitly list animated properties
- **Use `motion/react`** for JavaScript animations when needed

### Layout

- **Optical alignment** — occasionally adjust by 1px when perception beats geometry
- **Intentional alignment** — every element should align to grids or baselines
- **Responsive design** — must cover mobile, laptop, and ultra-wide displays
- **Browser-native sizing** — flexbox and grid beat JavaScript measurements
- **Fixed z-index scales** — avoid arbitrary z-index values

### Content & Accessibility

- **Inline explanations over tooltips** — prefer visible text
- **Design all states** — empty, sparse, dense, error, loading
- **Semantic HTML first** — before reaching for ARIA
- **Icon-only buttons need `aria-label`**
- **Locale-aware formatting** — for dates, numbers, currencies
- **Minimum contrast ratios** — 4.5:1 for text (prefer APCA over WCAG 2)
- **Alt text for images** — never leave images unlabeled
- **No skipped heading levels** — h1 → h2 → h3, never h1 → h3

### Forms

- **Labels on every control** — for accessibility
- **Validation guides, not blocks** — help users, don't prevent input
- **Submit buttons stay enabled** — until submission actually begins
- **Password manager compatibility** — use proper `autocomplete` attributes

### Performance

- **Test on throttled/low-power devices**
- **Virtualize large lists**
- **Lazy-load images with explicit dimensions** — prevent layout shift
- **Prioritize render logic over `useEffect`**

### Component Rules

- **Use accessible primitives** — for anything with keyboard or focus behavior
- **Never mix primitive systems** — within the same interaction surface
- **Use `cn` utility for class logic** — (equivalent to our `cx` function)
- **Empty states need one clear action** — guide users on what to do next

---

## Brand Fundamentals

### Typeface: Circular

**Circular is the Trig brand typeface. It must be used for ALL text across all projects.**

The font is included in `styles/fonts/Circular/` and loaded via `styles/fonts.css`.

**Font Weights:**
| Weight | Name | Tailwind Class | Usage |
|--------|------|----------------|-------|
| 200 | Thin | `font-thin` | Decorative, large display text only |
| 300 | Light | `font-light` | Body text, descriptions, secondary content |
| 400 | Book | `font-regular` or `font-normal` | Default body text, form inputs |
| 500 | Bold | `font-semibold` or `font-medium` | Labels, emphasis, subheadings |
| 600 | Black | `font-bold` | Headings, strong emphasis, CTAs |

**Usage Rules:**
- Headlines: `font-bold` (600) with tight tracking (`tracking-tight` or `tracking-tighter`)
- Body text: `font-light` (300) or `font-regular` (400)
- Labels & UI: `font-medium` (500)
- Never use weights outside this range (no 100, 700, 800, 900)
- Never use a different font family

**Accessing the Font:**
```jsx
// Via Tailwind (recommended)
<h1 className="font-brand font-bold">Heading</h1>
<p className="font-brand font-light">Body text</p>

// The font is also set as the default, so this works too:
<p className="font-light">Body text</p>
```

---

### Icons: Heroicons

**Use Heroicons (`@heroicons/react`) for all icons.** This library is a required dependency.

```jsx
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// Standard icon size
<PencilIcon className="h-5 w-5" />

// In a button
<button className="flex items-center gap-2">
  <PlusIcon className="h-4 w-4" />
  Add Item
</button>

// With action color
<PencilIcon className="h-5 w-5 text-action-color" />
```

**Icon sizes:**
| Size | Class | Usage |
|------|-------|-------|
| Small | `h-4 w-4` | Inline with text, buttons |
| Default | `h-5 w-5` | Standard UI icons |
| Large | `h-6 w-6` | Prominent actions, navigation |

**Available variants:**
- `@heroicons/react/24/outline` - Line icons (default, most common)
- `@heroicons/react/24/solid` - Filled icons (for active/selected states)
- `@heroicons/react/20/solid` - Smaller filled icons

---

### Action Color

**The action color (`#8F8871`) is used for interactive elements that invite user action.**

```jsx
// Links and interactive text
<a className="text-action-color hover:underline">View details</a>

// Icons that indicate interactivity
<PencilIcon className="h-5 w-5 text-action-color" />

// Subtle emphasis on actionable items
<span className="text-action-color font-medium">Edit</span>
```

**Use `text-action-color` for:**
- Text links
- Interactive icons
- Call-to-action text
- Hover states on neutral elements

**Don't use for:** Primary buttons (use the button components), status indicators, or body text.

---

### Color System

**IMPORTANT: Default Tailwind colors have been completely replaced.**

The Trig palette uses **muted, warm tones** exclusively. All colors have:
- Reduced saturation (no bright/neon colors)
- Warm undertones (slight yellow/brown shift)
- Sophisticated, professional appearance

Standard Tailwind colors like `blue-500`, `red-400`, `green-600` now point to our muted variants, not the default bright colors.

**This is wrong:**
```
❌ Bright blue callouts/alerts (default Tailwind blue-900 background)
❌ Saturated, electric blue UI elements
❌ Any color that looks like default Tailwind
```

If you see bright, saturated blues like this in the UI, it means the design system's `tailwind.config.js` isn't being used — fix the config, don't just add more bright colors.

#### Color Philosophy

| Instead of... | We use... |
|---------------|-----------|
| Bright electric blue | Muted steel/slate blue |
| Vivid red | Warm terracotta |
| Neon green | Soft sage/olive |
| Pure yellow | Golden amber |
| Hot pink | Dusty rose |
| Vibrant purple | Warm mauve/plum |

This creates a cohesive, sophisticated look that feels warm and approachable rather than clinical or harsh.

#### Text Colors (in order of usage)

| Class | Usage | When to Use |
|-------|-------|-------------|
| `text-body-text` | Primary text | All main content, headings, labels |
| `text-body-text-lighter` | Secondary text | Descriptions, helper text, metadata |
| `text-body-text-lightest` | Muted text | Disabled states, timestamps, tertiary info |
| `text-body-text-light` | Subtle emphasis | Subheadings, captions |
| `text-white` | Inverted text | On dark backgrounds only |

**On Dark Backgrounds:**
| Class | Usage |
|-------|-------|
| `text-light-body-text` | Primary text on dark |
| `text-light-body-text-light` | Secondary text on dark |
| `text-light-body-text-lighter` | Muted text on dark |

**Never use:** `text-gray-*` or `text-grey-*` numbered scales for body text. Use the semantic `text-body-text` variants.

---

#### Background Colors

| Class | Usage | Context |
|-------|-------|---------|
| `bg-trig-bg` | Page background | The default app background (#f7f7f7) |
| `bg-trig-bg-lighter` | Card/panel background | Containers, sidebars, elevated surfaces |
| `bg-white` | Input background | Form fields, modals, prominent cards |
| `bg-trig-bg-light` | Subtle highlight | Selected states, subtle differentiation |
| `bg-trig-bg-dark` | Divider/separator | Very subtle visual breaks |

**Hierarchy (light to dark):**
```
bg-white → bg-trig-bg-lightest → bg-trig-bg-lighter → bg-trig-bg-light → bg-trig-bg → bg-trig-bg-dark → bg-trig-bg-darker
```

**Rules:**
- Page wrapper: Always `bg-trig-bg`
- Cards & containers: `bg-trig-bg-lighter` or `bg-white`
- Inputs & form fields: `bg-white`
- Disabled inputs: `bg-gray-50`
- Never use dark backgrounds (`bg-trig-bg-darkest`, `bg-gray-900`) except for specific dark-mode sections

---

#### Border Colors

| Class | Usage |
|-------|-------|
| `border-rule-color` | Default borders | Cards, inputs, dividers |
| `border-white` | Container accents | Subtle container definition |
| `border-grey-200` | Alternative subtle | When rule-color is too light |

**Rules:**
- Default border: Always `border-rule-color`
- Containers: `border-white` or `border-rule-color`
- Never use dark borders on light containers
- Error state: `border-red`
- Focus state: `border-blue-800`

---

#### Hover States

| Class | Context |
|-------|---------|
| `hover:bg-blue-10` | Interactive elements (links, buttons) |
| `hover:bg-trig-bg` | Cards that are clickable |
| `hover:bg-trig-bg-light` | Subtle hover on light backgrounds |
| `hover:bg-grey-200` | List items, table rows |
| `hover:bg-red-10` | Destructive actions |
| `hover:bg-green-10` | Confirm actions |

---

#### Status Colors

| Status | Background | Text |
|--------|------------|------|
| Info | `bg-blue-10` | `text-blue-800` |
| Success | `bg-green-10` | `text-green` |
| Warning | `bg-orange-10` | `text-orange` |
| Error | `bg-red-10` | `text-red` |

---

#### Communications Palette (Stankowski-style)

**For marketing materials, campaigns, and whitepapers ONLY. Never use in product UI.**

The communications palette provides vibrant, saturated colors inspired by Anton Stankowski's work. These colors are permitted for brand communications but must:
- Always be paired with grain/noise texture
- Fill angular shapes (not soft blobs)
- Be structured by geometry

| Color | Classes | Hex |
|-------|---------|-----|
| Magenta | `bg-comms-magenta`, `text-comms-magenta` | #EC4899 |
| Cyan | `bg-comms-cyan`, `text-comms-cyan` | #22D3EE |
| Green | `bg-comms-green`, `text-comms-green` | #22C55E |
| Violet | `bg-comms-violet`, `text-comms-violet` | #8B5CF6 |
| Amber | `bg-comms-amber`, `text-comms-amber` | #F59E0B |

Each has `-light` and `-dark` variants (e.g., `bg-comms-magenta-light`).

```jsx
// ✅ Communications materials with texture
<div className="bg-comms-cyan grain">
  <h2 className="text-white font-bold">Marketing Hero</h2>
</div>

// ❌ NEVER in product UI
<button className="bg-comms-magenta">Submit</button>
```

---

#### Texture and Grain

Texture adds warmth and craft. Grain makes digital surfaces feel analog.

**Available utilities:**

| Class | Effect | Usage |
|-------|--------|-------|
| `grain` | Film grain overlay (8% opacity) | Marketing heroes, cards |
| `grain-subtle` | Lighter grain (4% opacity) | Subtle texture |
| `grain-heavy` | Stronger grain (15% opacity) | Dramatic effect |
| `hatch` | Diagonal line pattern | Cube surfaces, illustrations |
| `hatch-dense` | Tighter diagonal lines | Smaller elements |
| `crosshatch` | Cross-diagonal pattern | Complex surfaces |

```jsx
// Marketing section with grain
<section className="bg-comms-violet grain">
  <h1 className="text-white">Bold Statement</h1>
</section>

// Cube surface with hatching
<div className="hatch text-grey-400">
  {/* Isometric cube face */}
</div>
```

**Rules:**
- Always use `grain` with communications palette colors
- `hatch` patterns use `currentColor` — set text color to control line color
- Grain requires `position: relative` on the parent (already included in `.grain`)

---

#### Container & Card Styling

**CRITICAL: Never use outline-only containers.**

Boxes, cards, and containers must NEVER have:
- A solid or dashed border with no fill/background
- An outline style that creates an empty box

**Always use one of these approaches:**

1. **Light background (preferred for most cases):**
```jsx
// ✅ Card with light fill
<div className="bg-trig-bg-lighter rounded-lg p-4">
  Content here
</div>

// ✅ Use the Card component
<Card>Content here</Card>
```

2. **Flash pattern (preferred for feature cards, visual interest):**
```jsx
// ✅ Subtle diagonal stripe pattern - no border needed
<div className="flash rounded-lg p-6">
  <h3 className="font-bold text-body-text">Feature Title</h3>
  <p className="text-body-text-light">Description text</p>
</div>
```

The `.flash` class creates a subtle 45-degree stripe pattern that provides visual definition without heavy borders.

**Hierarchy of container styles:**
| Style | Use Case |
|-------|----------|
| `flash` | Feature cards, marketing sections, visual emphasis |
| `bg-trig-bg-lighter` | Standard cards, sidebars, panels |
| `bg-white` | Forms, modals, elevated content |
| `bg-trig-bg-light` | Subtle grouping, selected states |

---

#### Forbidden Patterns

**Colors:**
```jsx
// ❌ NEVER use arbitrary hex colors
<div className="bg-[#f5f5f5]">...</div>
<div className="text-[#3B82F6]">...</div>

// ✅ ALWAYS use palette colors
<div className="bg-trig-bg">...</div>
<div className="text-blue-600">...</div>

// ❌ NEVER import external color libraries or add bright colors
// The palette is intentionally muted and warm

// ❌ NEVER use numbered gray scales for body text
<p className="text-gray-500">...</p>

// ✅ ALWAYS use semantic body-text for text content
<p className="text-body-text-lighter">...</p>
```

**Containers:**
```jsx
// ❌ NEVER use outline-only containers (border with no fill)
<div className="border border-gray-200 rounded-lg p-4">...</div>
<div className="border border-dashed border-gray-300 rounded-lg">...</div>
<div className="ring-1 ring-gray-200 rounded-lg">...</div>

// ✅ ALWAYS use a background fill or the flash pattern
<div className="bg-trig-bg-lighter rounded-lg p-4">...</div>
<div className="flash rounded-lg p-4">...</div>
<Card>...</Card>
```

**Borders:**
```jsx
// ❌ NEVER use dark borders on light cards
<div className="bg-white border border-gray-400">...</div>

// ✅ Use subtle borders only when needed (prefer no border with bg fill)
<div className="bg-white border border-rule-color">...</div>

// ✅ Better: use background fill without border
<div className="bg-trig-bg-lighter rounded-lg">...</div>
```

**What "muted" means:**
- Our `red-500` is terracotta (#C45D4A), not bright red (#EF4444)
- Our `blue-500` is steel blue (#5A7A99), not electric blue (#3B82F6)
- Our `green-500` is sage (#5A8A62), not neon green (#22C55E)

The numbered scales (50-900) are available but all point to our muted palette.

---

## Layout Patterns

**Layout components are structural and functional. They organize content but don't express brand personality. Use only neutral colors.**

### Page Structure

| Component | Purpose | Location |
|-----------|---------|----------|
| `Navigation` | Responsive header nav with dropdowns and mobile menu | `components/layout/` |
| `Container` | Responsive content wrapper with max-width | `components/layout/` |
| `Section` | Content section with padding/background options | `components/layout/` |
| `SectionHeader` | Headings with optional tag and description | `components/layout/` |
| `Card` | Content container with optional click behavior | `components/` |

### Form Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `Input` | Base input element | `components/forms/` |
| `TextInput` | Labeled text input with description | `components/forms/` |
| `TextArea` | Multi-line text input | `components/forms/` |
| `SelectInput` | Dropdown select with option groups | `components/forms/` |
| `SearchInput` | Search field with icon | `components/forms/` |

### Feedback Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `Alert` | Status messages (info, success, warning, error) | `components/feedback/` |
| `Modal` | Dialog overlay | `components/feedback/` |
| `Tooltip` | Hover hints | `components/feedback/` |
| `Toggle` | On/off switch | `components/` |

### Button Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `PrimaryButton` | Main action button | `components/buttons/` |
| `SecondaryButton` | Secondary action button | `components/buttons/` |
| `IconButton` | Icon-only button | `components/buttons/` |
| `CTAButton` | Marketing CTA with optional icon | `components/buttons/` |

**Principle:** Layout components use only neutral colors (`bg-trig-bg`, `bg-white`, `border-rule-color`). Never use the communications palette or grain textures in layout.

### Marketing Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `HeroTextLeft` | Hero section with text left, media right | `components/marketing/` |
| `Quote` | Large testimonial quote display | `components/marketing/` |
| `Testimonial` | Individual testimonial card | `components/marketing/` |
| `TestimonialGrid` | Grid of testimonial cards | `components/marketing/` |
| `FeatureSection` | Feature with text and image | `components/marketing/` |
| `FeatureWithBenefits` | Feature with benefits list | `components/marketing/` |
| `TabbedFeatures` | Tabbed content switcher | `components/marketing/` |

### Typography Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `portableTextComponents` | Rich text styling config | `components/typography/` |
| `Prose` | Rich text wrapper | `components/typography/` |

---

## Brand Assets

**Brand components are expressive and distinctive. They appear at key moments — hero sections, diagrams, marketing materials. Use sparingly.**

### Available Brand Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `TrigLogo` | Brand logo (black/white variants) | `components/brand/` |
| `IsometricCube` | Cube illustration (wireframe/filled/hatched) | `components/brand/` |
| `PeriodicElement` | Framework device for concepts | `components/brand/` |
| `PeriodicSequence` | Compose element sequences with arrows | `components/brand/` |

### Isometric Cube Usage

```jsx
import { IsometricCube } from "./components/brand";

// Wireframe (default)
<IsometricCube size="md" />

// Filled with opacity
<IsometricCube size="lg" variant="filled" fillColor="currentColor" />

// Hatched pattern
<IsometricCube size="md" variant="hatched" />
```

**When to use:** Logo marks, hero illustrations, diagram nodes.
**When NOT to use:** Decorative scatter, product UI, every page.

### Periodic Table Device

```jsx
import { PeriodicSequence } from "./components/brand";

<PeriodicSequence
  elements={[
    { symbol: "Id", number: "01", label: "Identify" },
    { symbol: "Ac", number: "02", label: "Act" },
    { symbol: "Ms", number: "03", label: "Measure" },
  ]}
  size="md"
/>
```

Use for conceptual frameworks and step-by-step flows.

### Angular Gradients

**Angular gradients only. NEVER radial.**

Trig's visual language is precise and geometric. Radial gradients feel organic and amorphous — the opposite of our brand.

```jsx
// ✅ Angular gradients (with comms palette + grain)
<div className="bg-gradient-45 from-comms-magenta to-comms-cyan grain">
  Marketing hero content
</div>

// ❌ NEVER radial gradients
<div className="bg-radial-gradient ...">  // WRONG
```

Available utilities: `bg-gradient-45`, `bg-gradient-90`, `bg-gradient-135`, `bg-gradient-180`, `bg-gradient-225`, `bg-gradient-270`, `bg-gradient-315`

### Data Visualization Guidelines

**Preferred chart types:**
- Heat maps
- Bar charts (squared ends, not rounded)
- Stacked area charts (hard edges)
- Tables with inline bars
- Sparklines

**Avoid:**
- Bubble charts
- Scatter plots
- Pie/donut charts
- Curved/smooth lines

**Color rules for data viz:**
- Use semantic colors from the palette
- Single-hue scales work best (e.g., `blue-100` to `blue-800`)
- Never use communications palette in product data viz
- Ensure sufficient contrast between adjacent values

**Principle:** Brand assets can use the full palette including communications colors, but comms palette must always be paired with grain texture and angular shapes.

---

## Typography Patterns

**Typography is locked down. Use only these values. No arbitrary sizes, weights, or spacing.**

### SectionHeader (Required for All Headings)

**Always use `SectionHeader` for page and section headings. Never create custom heading styles.**

```jsx
import SectionHeader from "./components/layout/SectionHeader";
```

#### Size Variants

| Size | Title | Description | Use Case |
|------|-------|-------------|----------|
| `xs` | text-sm / medium | text-sm / light | Inline labels, minor headings |
| `sm` | text-base / semibold | text-sm / light | Card headers, small sections |
| `md` | text-lg→2xl / semibold | text-sm→base / light | Standard sections (default) |
| `lg` | text-2xl→4xl / bold | text-base→lg / light | Major sections |
| `lgLight` | text-2xl→4xl / semibold | text-base→lg / light | Major sections (lighter weight) |
| `xl` | text-4xl→6xl / bold | text-base→lg / light | Hero sections, page titles |

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Main heading text |
| `description` | string | - | Optional subheading text |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"lgLight"` \| `"xl"` | `"md"` | Size variant |
| `alignment` | `"center"` \| `"left"` | `"center"` | Text alignment |
| `tag` | string | - | Optional tag label above title |
| `tagColor` | `"default"` \| `"white"` | `"default"` | Tag color variant |
| `url` | string | - | Optional link URL (used with tag) |
| `style` | `"default"` \| `"light"` | `"default"` | Use `"light"` on dark backgrounds |

#### Examples

```jsx
// Hero (xl) - Page title, centered
<SectionHeader
  size="xl"
  title="Welcome to Trig"
  description="The customer engagement platform"
  alignment="center"
/>

// Major section (lg) - With tag
<SectionHeader
  size="lg"
  tag="Features"
  title="Everything you need"
  description="Powerful tools for your team"
  alignment="left"
/>

// Standard section (md) - Default size
<SectionHeader
  size="md"
  title="Campaign Analytics"
  description="Track performance in real-time"
  alignment="left"
/>

// Card header (sm)
<SectionHeader
  size="sm"
  title="Recent Activity"
  alignment="left"
/>

// Minor heading (xs)
<SectionHeader
  size="xs"
  title="Settings"
  alignment="left"
/>

// On dark background
<div className="bg-trig-bg-darkest p-8">
  <SectionHeader
    size="lg"
    title="Dark Section"
    description="This text is light colored"
    style="light"
  />
</div>
```

#### When to Use Each Size

- **xl**: Hero sections, landing page titles, major page headers
- **lg**: Primary content sections, feature blocks, major divisions
- **lgLight**: Same as lg but lighter weight (less aggressive)
- **md**: Standard sections, card groups, content blocks (default)
- **sm**: Card headers, sidebar sections, compact areas
- **xs**: Inline headings, labels, very minor sections

### Font Sizes (Locked Scale)

**Only these sizes are permitted. Never use arbitrary values like `text-[14px]`.**

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Labels, tags, micro-text, timestamps |
| `text-sm` | 13px | Navigation, small UI text, captions |
| `text-base` | 16px | Body copy (default) |
| `text-lg` | 18px | Lead paragraphs, emphasized body |
| `text-xl` | 20px | Card titles, small headings |
| `text-2xl` | 24px | Section subheadings |
| `text-3xl` | 30px | Section headings |
| `text-4xl` | 36px | Page headings |
| `text-5xl` | 48px | Hero headings |
| `text-6xl` | 60px | Large display text |
| `text-7xl` | 72px | Statistics, large numbers |
| `text-8xl` | 96px | Hero statistics |

**Forbidden:**
```jsx
// ❌ NEVER use arbitrary font sizes
<p className="text-[14px]">...</p>
<p className="text-[15px]">...</p>
<h1 className="text-[120px]">...</h1>

// ✅ Use the scale
<p className="text-sm">...</p>
<p className="text-base">...</p>
<h1 className="text-7xl">...</h1>
```

### Font Weights (Locked Scale)

**Only these weights are permitted.**

| Class | Weight | Usage |
|-------|--------|-------|
| `font-light` | 300 | Body text, descriptions, secondary content |
| `font-normal` | 400 | Default body text, form inputs |
| `font-medium` | 500 | Labels, emphasis, UI controls |
| `font-semibold` | 600 | Subheadings, navigation, buttons |
| `font-bold` | 700 | Headings, strong emphasis, CTAs |

**Forbidden:**
- `font-thin` (200) — too light for readability
- `font-extrabold` (800) — not in brand
- `font-black` (900) — not in brand
- Arbitrary weights like `font-[450]`

**Common patterns:**
```jsx
// Headlines
<h1 className="text-4xl font-bold tracking-tight">...</h1>

// Body text
<p className="text-base font-light">...</p>

// Labels and UI
<label className="text-sm font-medium">...</label>

// Navigation
<span className="text-sm font-semibold">...</span>
```

### Letter Spacing (Locked Scale)

**Only these tracking values are permitted.**

| Class | Usage |
|-------|-------|
| `tracking-tighter` | Large display headings (text-5xl+) |
| `tracking-tight` | All headings (most common) |
| `tracking-normal` | Body text (default, often omitted) |
| `tracking-wide` | Navigation, labels, uppercase text |

**Forbidden:**
- `tracking-wider` — too spaced
- `tracking-widest` — not in brand
- Arbitrary values like `tracking-[0.05em]`

**Patterns:**
```jsx
// Headings - always tight
<h1 className="text-4xl font-bold tracking-tight">...</h1>
<h2 className="text-2xl font-bold tracking-tight">...</h2>

// Large display - tighter
<span className="text-7xl font-bold tracking-tighter">42%</span>

// Navigation and labels - wide
<span className="text-xs font-medium tracking-wide uppercase">Features</span>
```

### Line Heights (Locked Scale)

**Only these leading values are permitted.**

| Class | Ratio | Usage |
|-------|-------|-------|
| `leading-none` | 1 | Large statistics, display numbers |
| `leading-tight` | 1.25 | Headings |
| `leading-snug` | 1.375 | Subheadings, cards |
| `leading-normal` | 1.5 | Body text (default) |
| `leading-relaxed` | 1.625 | Long-form content, articles |

**Forbidden:**
- Arbitrary values like `leading-[120px]`
- `leading-loose` — too spaced for brand

### Body Text Colors

Use semantic color classes, never arbitrary hex values:

```
Primary text:     text-body-text
Secondary text:   text-body-text-light
Tertiary text:    text-body-text-lighter
Muted text:       text-body-text-lightest

On dark backgrounds:
Primary:          text-light-body-text
Secondary:        text-light-body-text-light
Muted:            text-light-body-text-lighter
```

**Forbidden:**
```jsx
// ❌ Never use gray scales for body text
<p className="text-gray-600">...</p>
<p className="text-slate-500">...</p>

// ✅ Use semantic text colors
<p className="text-body-text-lighter">...</p>
```

### Complete Typography Examples

```jsx
// Hero section
<h1 className="text-5xl font-bold tracking-tighter text-body-text">
  Welcome to Trig
</h1>
<p className="text-xl font-light text-body-text-light">
  The customer engagement platform
</p>

// Card
<h3 className="text-xl font-semibold tracking-tight text-body-text">
  Card Title
</h3>
<p className="text-base font-light text-body-text-lighter">
  Card description goes here.
</p>

// Navigation item
<span className="text-sm font-semibold tracking-wide text-body-text">
  Products
</span>

// Statistic
<span className="text-7xl font-bold tracking-tighter leading-none text-body-text">
  2.4M
</span>
<span className="text-sm font-medium tracking-wide uppercase text-body-text-lighter">
  Active Users
</span>

// Form label
<label className="text-sm font-medium text-body-text">
  Email Address
</label>
```

---

## Button Patterns

**CRITICAL: Button Rounding Rule**

| Button Type | Rounding | Class |
|-------------|----------|-------|
| PrimaryButton | Pill (fully rounded) | `rounded-full` |
| SecondaryButton | Subtle corners | `rounded-md` |
| IconButton | Subtle corners | `rounded-md` |
| CTAButton | Subtle corners | `rounded-md` |

**PrimaryButton is the ONLY element in the entire design system that uses `rounded-full`.** Everything else uses subtle rounding (`rounded-md` or `rounded-lg`). This creates visual hierarchy — primary actions stand out with their distinctive pill shape.

### Primary Actions

```jsx
// Standard primary button
<PrimaryButton label="Save Changes" onClick={handleSave} />

// Large primary button
<PrimaryButton label="Get Started" size="lg" onClick={handleStart} />

// Gradient animated button (for main CTAs)
<PrimaryButton label="Launch Campaign" variant="gradient" onClick={handleLaunch} />

// Outline variant
<PrimaryButton label="Learn More" variant="outline" onClick={handleLearn} />

// With icon
<PrimaryButton
  label="Add Item"
  iconLeft={<PlusIcon />}
  onClick={handleAdd}
/>

// Full width (forms)
<PrimaryButton label="Submit" fullWidth type="submit" />
```

### Secondary Actions

```jsx
// Standard secondary
<SecondaryButton label="Cancel" onClick={handleCancel} />

// With icon
<SecondaryButton label="Edit" icon={<PencilIcon />} onClick={handleEdit} />

// Destructive (auto-styled when label is "Delete")
<SecondaryButton label="Delete" onClick={handleDelete} />
```

### Icon Buttons

```jsx
// Edit action
<IconButton icon="pencil" onClick={handleEdit} />

// Delete action
<IconButton icon="trash" variant="destructive" onClick={handleDelete} />

// Confirm action
<IconButton icon="check" variant="confirm" onClick={handleConfirm} />

// Available icons: check, xMark, pencil, plus, eye, eyeSlash,
//                  clipboard, trash, cog, bookmark, ellipsis, arrowRight
```

### Marketing CTAs

Use `CTAButton` for marketing page call-to-actions:

```jsx
import { CTAButton } from "@trig/design-system";

// Standard CTA
<CTAButton ctaText="Get Started" ctaUrl="/signup" />

// Book a Demo (auto-shows icon, opens in new tab)
<CTAButton ctaText="Book a Demo" ctaUrl="/demo" />

// Light variant (for dark backgrounds)
<CTAButton ctaText="Learn More" ctaUrl="/about" style="light" />

// "See how" with feature link
<CTAButton ctaText="See how" ctaUrl="/features" featureLinkUrl="/features/specific" />

// With analytics callback
<CTAButton
  ctaText="Get Started"
  ctaUrl="/signup"
  handleCtaClick={(text, url) => trackEvent("cta_click", { text, url })}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ctaText` | string | required | Button text |
| `ctaUrl` | string | - | URL to navigate to |
| `featureLinkUrl` | string | - | Alternative URL for "See how" buttons |
| `style` | `"default"` \| `"light"` | `"default"` | Style variant |
| `handleCtaClick` | function | - | Callback fired on click (receives ctaText, ctaUrl) |

**Auto behaviors:**
- `"Book a Demo"` — shows icon and opens in new tab
- `"See how"` — uses `featureLinkUrl` if provided
- Analytics tracked via `window.analytics` if available

---

## Rich Text Patterns

### Using portableTextComponents

For Sanity CMS or similar rich text content:

```jsx
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./components/typography/PortableTextComponents";

<PortableText value={content} components={portableTextComponents} />
```

### Using the Prose Wrapper

For general HTML or markdown content:

```jsx
import { Prose } from "./components/typography/PortableTextComponents";

<Prose>
  <h1>Article Title</h1>
  <p>Body content with <strong>bold</strong> and <a href="#">links</a>.</p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
</Prose>
```

### Rich Text Styles Reference

All rich text uses the locked typography scale:

| Element | Styles |
|---------|--------|
| `h1` | text-4xl, font-bold, tracking-tight |
| `h2` | text-2xl, font-semibold, tracking-tight |
| `h3` | text-xl, font-semibold, tracking-tight |
| `h4` | text-lg, font-medium, tracking-tight |
| `p` | font-light, leading-relaxed, text-body-text-light |
| `strong` | font-semibold, text-body-text |
| `a` | text-action-color, underline |
| `ul/ol` | font-light, text-body-text-light |
| `blockquote` | border-l-2, italic, text-body-text-lighter |

---

## Marketing Page Patterns

### Hero Section

```jsx
import { HeroTextLeft } from "./components/marketing";

<HeroTextLeft
  tag="New Feature"
  headline="Welcome to Trig"
  subheadline="The customer engagement platform that drives results"
  ctaText="Book a Demo"
  ctaUrl="/demo"
  heroImageUrl="/images/hero.png"
/>

// With video instead of image
<HeroTextLeft
  headline="See It In Action"
  subheadline="Watch how teams use Trig"
  heroVideoUrl="/videos/demo.mp4"
  videoPosterUrl="/images/poster.jpg"
/>
```

### Feature Sections

```jsx
import { FeatureSection, FeatureWithBenefits } from "./components/marketing";

// Simple feature with image
<FeatureSection
  tag="Analytics"
  title="Real-time Insights"
  description="Track engagement as it happens with live dashboards."
  imageUrl="/images/analytics.png"
  imagePosition="right"
  cta={{ text: "Learn more", url: "/features/analytics" }}
/>

// Feature with benefits list
<FeatureWithBenefits
  tag="Platform"
  title="Everything You Need"
  description="A complete toolkit for customer engagement."
  imageUrl="/images/platform.png"
  benefits={[
    { title: "Onboarding", description: "Get users started fast", icon: "/icons/onboard.svg" },
    { title: "Retention", description: "Keep users engaged", icon: "/icons/retain.svg" },
    { title: "Expansion", description: "Grow customer value", icon: "/icons/expand.svg" },
  ]}
  cta={{ text: "See all features", url: "/features" }}
/>
```

### Tabbed Features

```jsx
import { TabbedFeatures } from "./components/marketing";

<TabbedFeatures
  tag="Solutions"
  title="Choose Your Path"
  description="Multiple ways to engage customers"
  tabs={[
    {
      title: "Onboarding",
      contentTitle: "User Onboarding",
      description: "Guide new users to success with personalized journeys.",
      imageUrl: "/images/onboarding.png",
      href: "/solutions/onboarding",
    },
    {
      title: "Retention",
      contentTitle: "Customer Retention",
      description: "Keep users engaged with timely, relevant touchpoints.",
      imageUrl: "/images/retention.png",
      href: "/solutions/retention",
    },
  ]}
  cta={{ text: "View all solutions", url: "/solutions" }}
/>
```

### Testimonials

```jsx
import { Quote, Testimonial, TestimonialGrid } from "./components/marketing";

// Large featured quote
<Quote
  quote="Trig transformed how we engage with customers."
  author="Jane Smith"
  authorTitle="VP of Marketing, Acme Inc"
  authorImage="/images/jane.jpg"
  companyLogo="/logos/acme.svg"
  href="/casestudies/acme"
/>

// Single testimonial card
<Testimonial
  quote="Our conversion rate increased by 40% in the first month."
  author="John Doe"
  authorTitle="CEO, StartupCo"
  authorImage="/images/john.jpg"
  companyLogo="/logos/startup.svg"
  companyImage="/images/startup-team.jpg"
  stat={{ value: "40%", label: "Conversion Rate", description: "Increase in 30 days" }}
  href="/casestudies/startup"
/>

// Grid of testimonials
<TestimonialGrid
  columns={2}
  testimonials={[
    { quote: "...", author: "...", ... },
    { quote: "...", author: "...", ... },
  ]}
/>
```

### Key Marketing Component Rules

1. **Images on flash backgrounds** — All feature images, illustrations, and screenshots use `.flash`
2. **Use SectionHeader** — Never create custom headings in marketing components
3. **CTAButton for actions** — Don't create custom CTA styles
4. **Locked typography** — All text uses the scale, no arbitrary sizes

---

## Form Patterns

### Text Input

```jsx
<TextInput
  label="Email Address"
  description="We'll never share your email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  required
  type="email"
/>
```

### Text Area

```jsx
<TextArea
  label="Message"
  description="Tell us what you need"
  placeholder="Enter your message..."
  value={message}
  onChange={setMessage}
  rows={4}
  required
/>
```

### Select Input

```jsx
// Flat options
<SelectInput
  label="Country"
  placeholder="Select a country"
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
  ]}
  value={country}
  onChange={setCountry}
  required
/>

// Grouped options
<SelectInput
  label="Category"
  placeholder="Select category"
  groups={[
    {
      label: "Marketing",
      options: [
        { label: "Email", value: "email" },
        { label: "SMS", value: "sms" },
      ],
    },
  ]}
  value={category}
  onChange={setCategory}
  required
/>
```

### Search Input

```jsx
<SearchInput
  value={searchQuery}
  placeholder="Search campaigns..."
  onChange={setSearchQuery}
/>
```

---

## Feedback Patterns

### Alerts

```jsx
// Info
<Alert type="info" message="Your changes have been saved." />

// Success
<Alert type="success" message="Campaign launched successfully!" />

// Warning
<Alert type="warning" message="This action cannot be undone." />

// Error
<Alert type="error" message="Failed to save changes." />

// With title
<Alert
  type="error"
  title="Connection Error"
  message="Unable to reach the server. Please try again."
/>

// Small variant (for inline errors)
<Alert type="error" size="small" message="Invalid email format" />
```

### Modals

```jsx
const [isOpen, setIsOpen] = useState(false);

{isOpen && (
  <Modal
    title="Confirm Delete"
    close={() => setIsOpen(false)}
    size="default" // or "large", "xlarge"
    icon={TrashIcon}
  >
    <p className="text-body-text-light mb-4">
      Are you sure you want to delete this item?
    </p>
    <div className="flex gap-2 justify-end">
      <SecondaryButton label="Cancel" onClick={() => setIsOpen(false)} />
      <PrimaryButton label="Delete" onClick={handleDelete} />
    </div>
  </Modal>
)}
```

### Tooltips

```jsx
<Tooltip content="Edit this item" position="top">
  <IconButton icon="pencil" onClick={handleEdit} />
</Tooltip>
```

### Toggle

```jsx
<Toggle
  isOn={isEnabled}
  onChange={setIsEnabled}
  size="md" // or "sm"
/>
```

---

## Layout Patterns

### Navigation

```jsx
import Navigation from "./components/layout/Navigation";
import { TrigLogoBlack } from "./components/brand";

const navigation = [
  { title: "Home", url: "/" },
  {
    title: "Products",
    pages: [
      { title: "Onboarding", url: "/products/onboarding", description: "Get users started" },
      { title: "Retention", url: "/products/retention", description: "Keep users engaged" },
      { title: "Expansion", url: "/products/expansion", description: "Grow accounts" },
    ]
  },
  { title: "Pricing", url: "/pricing" },
  { title: "Blog", url: "/blog" },
];

<Navigation
  navigation={navigation}
  currentPath="/products/onboarding"
  logo={<TrigLogoBlack className="h-8" />}
  logoHref="/"
  actions={
    <>
      <SecondaryButton label="Sign In" />
      <PrimaryButton label="Book a Demo" />
    </>
  }
  onNavigate={({ title, url }) => console.log(`Navigated to ${title}`)}
  LinkComponent={Link} // Optional: pass Next.js Link for client-side routing
/>
```

**Props:**
- `navigation` - Array of nav items (with optional nested `pages` for dropdowns)
- `currentPath` - Current URL for active state highlighting
- `logo` - Logo component to display
- `logoHref` - Where logo links to (default: "/")
- `actions` - Right-side action buttons (sign in, CTA, etc.)
- `onNavigate` - Callback when user navigates
- `LinkComponent` - Custom link component (e.g., Next.js `Link`)

### Page Structure

```jsx
<Container>
  <Section size="lg">
    <SectionHeader
      size="xl"
      title="Page Title"
      description="Page description"
      alignment="center"
    />
    {/* Page content */}
  </Section>
</Container>
```

### Cards

**IMPORTANT:** Cards must NEVER have outline-only borders. Always use a background fill or the flash pattern.

```jsx
// Standard card (light background fill)
<Card>
  <h3 className="text-body-text font-bold mb-2">Card Title</h3>
  <p className="text-body-text-light">Card content goes here.</p>
</Card>

// Flash variant (diagonal stripe pattern - great for feature cards)
<Card variant="flash">
  <h3 className="text-body-text font-bold mb-2">Feature Card</h3>
  <p className="text-body-text-light">Subtle stripe pattern for visual interest.</p>
</Card>

// Clickable card
<Card onClick={handleCardClick}>
  <h3 className="text-body-text font-bold mb-2">Clickable Card</h3>
  <p className="text-body-text-light">Click to view details.</p>
</Card>

// Custom background
<Card bgColor="bg-blue-10">
  <p>Blue tinted card</p>
</Card>

// ❌ NEVER do this (outline-only)
<div className="border border-gray-200 rounded-lg p-4">...</div>
```

---

## Spacing Conventions

**Spacing is locked down. Use only the permitted scale values. No arbitrary spacing.**

### The Spacing Scale (Locked)

**Core scale — use these for 95% of spacing needs:**

| Class | Pixels | Usage |
|-------|--------|-------|
| `0` | 0px | Reset, flush alignment |
| `1` | 4px | Minimal: icon gaps, tight inline spacing |
| `2` | 8px | Tight: button padding, small gaps |
| `3` | 12px | Small: form field padding, list gaps |
| `4` | 16px | Default: card padding, standard gaps |
| `6` | 24px | Relaxed: section padding, comfortable gaps |
| `8` | 32px | Spacious: large cards, section breaks |
| `12` | 48px | Section: vertical section spacing |
| `16` | 64px | Large section: page-level spacing |
| `20` | 80px | Hero: major section breaks |
| `24` | 96px | Maximum: hero sections only |

**Half-step scale — permitted but use sparingly:**

| Class | Pixels | Usage |
|-------|--------|-------|
| `0.5` | 2px | Micro-adjustments only |
| `1.5` | 6px | Button vertical padding |
| `2.5` | 10px | Navigation item padding |

### Padding Patterns

**Components:**
```jsx
// Buttons
<button className="px-4 py-2">Standard</button>
<button className="px-6 py-3">Large</button>
<button className="px-2.5 py-1.5">Small</button>

// Cards
<div className="p-4">Standard card</div>
<div className="p-6">Spacious card</div>
<div className="p-8">Feature card</div>

// Inputs
<input className="px-3 py-2" />

// Navigation items
<a className="px-4 py-2.5">Nav item</a>
```

**Sections:**
```jsx
// Page sections
<section className="py-12">Standard section</section>
<section className="py-16">Large section</section>
<section className="py-20">Hero section</section>

// Container padding
<div className="px-4 md:px-8">Responsive container</div>
```

### Margin Patterns

**Vertical rhythm:**
```jsx
// Between elements
<h2 className="mb-4">Heading</h2>
<p className="mb-6">Paragraph with space after</p>

// Between sections
<section className="mb-12">Section</section>

// Form fields
<div className="mb-4">
  <label>...</label>
  <input />
</div>
```

**Horizontal centering:**
```jsx
<div className="mx-auto max-w-screen-xl">Centered container</div>
```

### Gap Patterns

**Prefer `gap` over margins for flex/grid layouts:**

```jsx
// Flex layouts
<div className="flex gap-2">Tight items</div>
<div className="flex gap-4">Standard items</div>
<div className="flex gap-8">Spacious items</div>

// Grid layouts
<div className="grid grid-cols-3 gap-4">Standard grid</div>
<div className="grid grid-cols-2 gap-8">Feature grid</div>

// Vertical stacks
<div className="flex flex-col gap-4">Form fields</div>
<div className="flex flex-col gap-8">Sections</div>
```

### Forbidden Spacing Values

**Never use these:**

```jsx
// ❌ Arbitrary pixel values
<div className="p-[9px]">...</div>
<div className="p-[13px]">...</div>
<div className="m-[7px]">...</div>

// ❌ Arbitrary decimals
<div className="m-[3.375rem]">...</div>
<div className="p-[1.2rem]">...</div>

// ❌ Negative decimals for alignment hacks
<div className="mt-[-0.5rem]">...</div>

// ❌ Inline styles for spacing
<div style={{ padding: '11px' }}>...</div>
<div style={{ margin: '13px 17px' }}>...</div>
```

**If you need fine adjustment:**
- Use `0.5`, `1.5`, or `2.5` from the half-step scale
- If those don't work, reconsider the layout — the design should fit the scale

### Quick Reference

**Most common patterns:**
```
Button padding:     px-4 py-2 (standard), px-6 py-3 (large)
Card padding:       p-4 (standard), p-6 (spacious)
Input padding:      px-3 py-2
Section padding:    py-12 (standard), py-16 (large)
Element gap:        gap-2 (tight), gap-4 (standard)
Section gap:        gap-8 (standard), gap-12 (large)
Form field margin:  mb-4
Heading margin:     mb-4 (h3+), mb-6 (h2), mb-8 (h1)
```

**Responsive spacing:**
```jsx
// Increase spacing at larger breakpoints
<section className="py-8 md:py-12 lg:py-16">...</section>
<div className="px-4 md:px-8 lg:px-12">...</div>
<div className="gap-4 md:gap-6 lg:gap-8">...</div>
```

---

## Color Usage

### Backgrounds

```
Page background:      bg-trig-bg
Card background:      bg-trig-bg-lighter
Hover background:     bg-trig-bg
Input background:     bg-white
Disabled background:  bg-gray-50
```

### Borders

```
Default border:       border-rule-color
Error border:         border-red
Focus border:         border-blue-800
```

### Status Colors

```
Info:     blue-10 (bg), blue-800 (text)
Success:  green-10 (bg), green (text)
Warning:  yellow-50 (bg), yellow-800 (text)
Error:    red-10 (bg), red (text)
```

---

## Don'ts

1. **Never use outline-only containers** - Cards and boxes must have a background fill or use `.flash`:
   ```
   ❌ <div className="border border-gray-200 rounded-lg">
   ✅ <div className="bg-trig-bg-lighter rounded-lg">
   ✅ <div className="flash rounded-lg">
   ```

2. **Never invent new colors** - Use only colors from the palette in `tailwind.config.js`

3. **Never use arbitrary values for spacing** - Use Tailwind's spacing scale (2, 4, 6, 8, etc.)

4. **Never create custom button styles** - Use `PrimaryButton`, `SecondaryButton`, or the CSS classes

5. **Never hardcode colors** - Always use the semantic color names:
   ```
   ❌ text-[#262A33]
   ✅ text-body-text
   ```

6. **Never skip the design system components** - Don't create one-off styled elements:
   ```
   ❌ <input className="border p-2 rounded" />
   ✅ <Input value={value} onChange={setValue} />
   ```

7. **Never mix heading approaches** - Always use `SectionHeader` for headings

8. **Never use inline styles for layout** - Use Tailwind classes and the layout components

9. **Never use amorphous gradients** - No radial gradients, no ambient washes, no glowing undefined shapes:
   ```
   ❌ background: radial-gradient(circle, #ff00ff, #00ffff)
   ❌ Soft, blurry AI-style glows
   ✅ Angular gradients with defined edges (comms only)
   ✅ Solid colors with grain texture
   ```

10. **Never make AI feel mystical or sentient** - AI is mathematical, structured, knowable. Not magic.

11. **Never scatter elements randomly** - Everything should feel intentionally placed, aligned to grids

12. **Never use communications colors in product UI** - `comms-*` colors are for marketing only:
    ```
    ❌ <button className="bg-comms-magenta">Save</button>
    ✅ <PrimaryButton label="Save" />
    ```

13. **Never use texture without purpose** - Grain should feel intentional, not like an Instagram filter

14. **Never hedge in headlines** - Be direct and confident, not tentative

---

## Utility Functions

### cx() - Class Name Helper

Combine class names conditionally:

```jsx
import { cx } from "../utils/cx";

<div className={cx(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class",
  customClass
)}>
```

---

## Component Index

### Layout (Marketing)
- `Navigation` - Responsive header nav with dropdowns
- `SectionHeader` - Headings with optional tag and description
- `Tag` - Small uppercase labels
- `Container` - Page-level wrapper
- `Section` - Content section wrapper

### Forms (Product)
- `Input` - Base input element
- `TextInput` - Labeled text input
- `TextArea` - Multi-line input
- `SelectInput` - Dropdown select
- `SearchInput` - Search field with icon

### Buttons
- `PrimaryButton` - Main action button
- `SecondaryButton` - Secondary action button
- `IconButton` - Icon-only button

### Feedback
- `Alert` - Status messages
- `Modal` - Dialog overlay
- `Tooltip` - Hover hints
- `Toggle` - On/off switch
- `Card` - Content card
