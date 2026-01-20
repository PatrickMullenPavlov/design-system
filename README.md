# Trig Design System

A unified design system care package for Trig projects. This package provides consistent styling, components, and patterns for React applications.

## Quick Start

### 1. Install Dependencies

```bash
npm install @headlessui/react @heroicons/react tailwindcss @tailwindcss/forms @tailwindcss/typography
```

### 2. Install Required Design Tools

These tools are **mandatory** for all projects using the design system:

```bash
# UI Skills - enforces consistent UI standards
npx ui-skills init

# RAMS - audits accessibility and visual design
curl -fsSL https://rams.ai/install | bash
```

**Usage:**
- Run `/ui-skills` or `/ui-skills <file>` to check UI constraints
- Run `/rams` or `/rams <file>` before PRs to audit accessibility

### 3. Copy the Design System

Copy the entire `design-system` folder into your project, or copy individual pieces as needed:

```
your-project/
├── src/
│   ├── design-system/          # Copy the whole folder here
│   │   ├── components/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── tailwind.config.js
│   └── ...
```

### 4. Configure Tailwind

Merge the design system's Tailwind config with your project's config. You can either:

**Option A: Replace your config**
```bash
cp design-system/tailwind.config.js ./tailwind.config.js
```

**Option B: Extend your existing config**
```js
// tailwind.config.js
const designSystem = require('./src/design-system/tailwind.config.js');

module.exports = {
  content: [
    // Your paths...
    './src/design-system/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      ...designSystem.theme.extend,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### 5. Import Global Styles

In your main CSS file or app entry point:

```css
/* Import before your other styles */
@import './design-system/styles/globals.css';
```

Or in your JavaScript entry:
```jsx
import './design-system/styles/globals.css';
```

### 6. Configure Claude Code

**This is the key step.** Add the design system rules to your project's `CLAUDE.md` file (create one if it doesn't exist):

```markdown
## Design System

This project uses the Trig Design System located at `src/design-system/`.

**IMPORTANT:** Before building any UI, read `src/design-system/CLAUDE.md` for:
- Component usage rules and patterns
- Exact Tailwind classes to use
- What NOT to do

Key rules:
- Always use design system components instead of creating custom styles
- Follow the color palette in tailwind.config.js
- Use SectionHeader for all headings
- Use PrimaryButton/SecondaryButton for all buttons
- Never invent new colors or spacing values
```

Claude will automatically read your project's `CLAUDE.md` and follow these rules. The detailed instructions in `design-system/CLAUDE.md` will guide component usage.

### 7. Use Components

```jsx
import TextInput from './design-system/components/forms/TextInput';
import PrimaryButton from './design-system/components/buttons/PrimaryButton';
import SectionHeader from './design-system/components/layout/SectionHeader';

function MyForm() {
  return (
    <div>
      <SectionHeader
        title="Contact Us"
        description="We'd love to hear from you"
        size="lg"
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
        required
      />
      <PrimaryButton label="Submit" type="submit" />
    </div>
  );
}
```

## File Structure

```
design-system/
├── CLAUDE.md                    # Agent instructions (prescriptive rules)
├── README.md                    # This file
├── tailwind.config.js           # Unified Tailwind configuration
├── styles/
│   ├── globals.css              # Base styles + Tailwind directives
│   └── buttons.css              # Button animations (CampaignButton, etc.)
├── components/
│   ├── layout/                  # Page structure components
│   │   ├── SectionHeader.jsx    # Headings with tag + description
│   │   ├── Tag.jsx              # Small uppercase labels
│   │   ├── Container.jsx        # Page wrapper
│   │   └── Section.jsx          # Content section wrapper
│   ├── forms/                   # Form input components
│   │   ├── Input.jsx            # Base input
│   │   ├── TextInput.jsx        # Labeled text input
│   │   ├── TextArea.jsx         # Multi-line input
│   │   ├── SelectInput.jsx      # Dropdown select
│   │   └── SearchInput.jsx      # Search field with icon
│   ├── buttons/                 # Button components
│   │   ├── PrimaryButton.jsx    # Main action button
│   │   ├── SecondaryButton.jsx  # Secondary action button
│   │   └── IconButton.jsx       # Icon-only button
│   ├── feedback/                # User feedback components
│   │   ├── Alert.jsx            # Status messages
│   │   ├── Modal.jsx            # Dialog overlay
│   │   └── Tooltip.jsx          # Hover hints (CSS-only)
│   ├── Card.jsx                 # Content card
│   └── Toggle.jsx               # On/off switch
├── utils/
│   └── cx.js                    # Class name helper
└── package.json                 # Peer dependencies
```

## Dependencies

The design system requires these peer dependencies:

| Package | Version | Purpose |
|---------|---------|---------|
| `@headlessui/react` | ^2.2.0 | Accessible UI primitives (Toggle, etc.) |
| `@heroicons/react` | ^2.2.0 | Icon library |
| `tailwindcss` | ^3.4.0 | Utility CSS framework |
| `@tailwindcss/forms` | ^0.5.0 | Form element styling reset |
| `@tailwindcss/typography` | ^0.5.0 | Prose styling |

## Component Categories

### Layout Components (Marketing)
Best for: Landing pages, informational content, page structure

- **SectionHeader** - Consistent heading hierarchy with optional tag and description
- **Tag** - Small uppercase labels for categorization
- **Container** - Page-level wrapper with responsive padding
- **Section** - Content section with max-width constraints

### Form Components (Product)
Best for: User input, data collection, interactive forms

- **Input** - Base input element (usually wrapped by TextInput)
- **TextInput** - Labeled text input with description support
- **TextArea** - Multi-line text input
- **SelectInput** - Native dropdown with option groups
- **SearchInput** - Search field with magnifying glass icon

### Button Components
Best for: Actions, CTAs, interactive triggers

- **PrimaryButton** - Main actions (save, submit, create)
- **SecondaryButton** - Secondary actions (cancel, back)
- **IconButton** - Compact icon-only actions (edit, delete)

### Feedback Components
Best for: User notifications, confirmations, status updates

- **Alert** - Inline status messages (info, success, warning, error)
- **Modal** - Dialog overlays for confirmations and forms
- **Tooltip** - Hover hints for additional context
- **Toggle** - Boolean on/off switches
- **Card** - Grouped content containers

## Customization

### Adding New Colors

Add to the `colors` section in `tailwind.config.js`:

```js
colors: {
  // ... existing colors
  'brand-accent': {
    light: '#...',
    DEFAULT: '#...',
    dark: '#...',
  },
}
```

### Adding New Components

1. Create the component in the appropriate folder
2. Follow the existing patterns (JSDoc comments, prop destructuring)
3. Import the `cx` utility for conditional classes
4. Document usage in CLAUDE.md

## Migration Guide

If migrating from an existing project:

1. Audit current component usage
2. Map existing components to design system equivalents
3. Update imports progressively
4. Replace custom color values with semantic names
5. Test thoroughly after each batch of changes
