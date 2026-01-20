# Design System - Claude Agent Instructions

This document provides prescriptive rules for maintaining consistent styling across all Pavlov projects. Follow these patterns exactly.

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

**Circular is the Pavlov brand typeface. It must be used for ALL text across all projects.**

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

### Color System

**IMPORTANT: Default Tailwind colors have been completely replaced.**

The Pavlov palette uses **muted, warm tones** exclusively. All colors have:
- Reduced saturation (no bright/neon colors)
- Warm undertones (slight yellow/brown shift)
- Sophisticated, professional appearance

Standard Tailwind colors like `blue-500`, `red-400`, `green-600` now point to our muted variants, not the default bright colors.

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
| `bg-pavlov-bg` | Page background | The default app background (#f7f7f7) |
| `bg-pavlov-bg-lighter` | Card/panel background | Containers, sidebars, elevated surfaces |
| `bg-white` | Input background | Form fields, modals, prominent cards |
| `bg-pavlov-bg-light` | Subtle highlight | Selected states, subtle differentiation |
| `bg-pavlov-bg-dark` | Divider/separator | Very subtle visual breaks |

**Hierarchy (light to dark):**
```
bg-white → bg-pavlov-bg-lightest → bg-pavlov-bg-lighter → bg-pavlov-bg-light → bg-pavlov-bg → bg-pavlov-bg-dark → bg-pavlov-bg-darker
```

**Rules:**
- Page wrapper: Always `bg-pavlov-bg`
- Cards & containers: `bg-pavlov-bg-lighter` or `bg-white`
- Inputs & form fields: `bg-white`
- Disabled inputs: `bg-gray-50`
- Never use dark backgrounds (`bg-pavlov-bg-darkest`, `bg-gray-900`) except for specific dark-mode sections

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
| `hover:bg-pavlov-bg` | Cards that are clickable |
| `hover:bg-pavlov-bg-light` | Subtle hover on light backgrounds |
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

#### Forbidden Patterns

**Colors:**
```jsx
// ❌ NEVER use arbitrary hex colors
<div className="bg-[#f5f5f5]">...</div>
<div className="text-[#3B82F6]">...</div>

// ✅ ALWAYS use palette colors
<div className="bg-pavlov-bg">...</div>
<div className="text-blue-600">...</div>

// ❌ NEVER import external color libraries or add bright colors
// The palette is intentionally muted and warm

// ❌ NEVER use numbered gray scales for body text
<p className="text-gray-500">...</p>

// ✅ ALWAYS use semantic body-text for text content
<p className="text-body-text-lighter">...</p>
```

**Borders:**
```jsx
// ❌ NEVER use dark borders on light cards
<div className="bg-white border border-gray-400">...</div>

// ✅ Use subtle borders
<div className="bg-white border border-rule-color">...</div>
```

**What "muted" means:**
- Our `red-500` is terracotta (#C45D4A), not bright red (#EF4444)
- Our `blue-500` is steel blue (#5A7A99), not electric blue (#3B82F6)
- Our `green-500` is sage (#5A8A62), not neon green (#22C55E)

The numbered scales (50-900) are available but all point to our muted palette.

---

## Component Categories

### When to Use What

**Marketing/Layout Components** (from `components/layout/`):
- Landing pages and informational sections
- Page structure and content hierarchy
- Headings and body content
- Section organization

**Product/Interactive Components** (from `components/forms/`, `components/buttons/`, `components/feedback/`):
- Forms and user input
- Interactive elements and CTAs
- User feedback (alerts, modals, tooltips)
- Data display cards

---

## Typography Patterns

### Headings

Always use `SectionHeader` for page/section headings. Never create custom heading styles.

```jsx
// Page title (hero)
<SectionHeader
  size="xl"
  title="Welcome to Pavlov"
  description="The customer engagement platform"
  alignment="center"
/>

// Section heading
<SectionHeader
  size="lg"
  tag="Features"
  title="Everything you need"
  description="Powerful tools for your team"
  alignment="left"
/>

// Subsection heading
<SectionHeader
  size="md"
  title="Campaign Analytics"
  alignment="left"
/>

// Small heading
<SectionHeader
  size="sm"
  title="Recent Activity"
  alignment="left"
/>
```

### Body Text Classes

Use these exact Tailwind classes for body text:

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

### Text Sizes

```
Extra small:  text-xs (12px)
Small:        text-sm (13px)
Base:         text-base (16px)
Large:        text-lg (18px)
XL:           text-xl (20px)
2XL:          text-2xl (24px)
3XL:          text-3xl (30px)
4XL:          text-4xl (36px)
```

---

## Button Patterns

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

### Marketing CTAs (CSS classes)

For marketing pages, you can also use these CSS classes directly:

```jsx
// Dark CTA
<button className="CTAButton">Get Started</button>

// White CTA (for dark backgrounds)
<button className="whiteCTAButton">Learn More</button>
```

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

```jsx
// Static card
<Card>
  <h3 className="text-body-text font-bold mb-2">Card Title</h3>
  <p className="text-body-text-light">Card content goes here.</p>
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
```

---

## Spacing Conventions

Use Tailwind's spacing scale consistently:

```
Padding/Margin:
- Tight:    p-2 / m-2 (8px)
- Default:  p-4 / m-4 (16px)
- Relaxed:  p-6 / m-6 (24px)
- Spacious: p-8 / m-8 (32px)

Gaps:
- Elements: gap-2 (8px)
- Sections: gap-4 (16px)
- Major:    gap-8 (32px)

Vertical spacing between form fields: pb-4
Vertical spacing between sections: py-8 or py-12
```

---

## Color Usage

### Backgrounds

```
Page background:      bg-pavlov-bg
Card background:      bg-pavlov-bg-lighter
Hover background:     bg-pavlov-bg
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

1. **Never invent new colors** - Use only colors from the palette in `tailwind.config.js`

2. **Never use arbitrary values for spacing** - Use Tailwind's spacing scale (2, 4, 6, 8, etc.)

3. **Never create custom button styles** - Use `PrimaryButton`, `SecondaryButton`, or the CSS classes

4. **Never hardcode colors** - Always use the semantic color names:
   ```
   ❌ text-[#262A33]
   ✅ text-body-text
   ```

5. **Never skip the design system components** - Don't create one-off styled elements:
   ```
   ❌ <input className="border p-2 rounded" />
   ✅ <Input value={value} onChange={setValue} />
   ```

6. **Never mix heading approaches** - Always use `SectionHeader` for headings

7. **Never use inline styles for layout** - Use Tailwind classes and the layout components

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
