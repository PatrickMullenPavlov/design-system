# Trig Design System - Claude Agent Instructions

This document provides prescriptive rules for maintaining consistent styling across all Trig projects. Follow these patterns exactly.

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

The **isometric cube** is the atomic unit of Trig's visual language.

### Cube Characteristics
- Line-drawn (not filled, not 3D-rendered)
- Isometric perspective (consistent, mathematical)
- Combinable (cubes join to form more complex shapes)

### Cube Applications

**Icons:** Built from cube combinations. Each icon should feel like it could be disassembled into its constituent geometric parts. Use hatching and line patterns to differentiate surfaces.

**Patterns:** Cube wireframes can extend into background patterns — connected grids, tessellations, or floating arrangements. These should feel architectural and structured, never random or scattered.

**Diagrams:** When explaining concepts or flows, use the same isometric, geometric language. Prefer architectural/diagrammatic clarity over abstract symbolism.

### Cube Variants
- Pure wireframe
- Filled with hatching or texture patterns
- Combined into icons representing product concepts
- Arranged into larger compositional patterns

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
  title="Welcome to Trig"
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

**CRITICAL: All padding and margin values must be EVEN numbers.**

Never use odd pixel values: ~~9px~~, ~~11px~~, ~~13px~~, ~~15px~~, ~~17px~~

Use Tailwind's spacing scale consistently (all values are even):

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

**Allowed Tailwind spacing values:**
| Class | Pixels | Use |
|-------|--------|-----|
| `1` | 4px | Minimal spacing |
| `2` | 8px | Tight spacing |
| `3` | 12px | Small spacing |
| `4` | 16px | Default spacing |
| `5` | 20px | Medium spacing |
| `6` | 24px | Relaxed spacing |
| `8` | 32px | Spacious spacing |
| `10` | 40px | Large spacing |
| `12` | 48px | Section spacing |

**Forbidden:**
```jsx
// ❌ NEVER use arbitrary odd values
<div className="p-[9px]">...</div>
<div className="p-[13px]">...</div>
<div style={{ padding: '11px' }}>...</div>

// ✅ Use Tailwind's even scale
<div className="p-2">...</div>  // 8px
<div className="p-3">...</div>  // 12px
<div className="p-4">...</div>  // 16px
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
