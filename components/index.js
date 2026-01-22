/**
 * @trig/design-system
 *
 * Unified design system for Trig projects.
 * Import components from this package to ensure consistent styling.
 */

// =============================================================================
// LAYOUT - Structural elements for page composition
// =============================================================================
export {
  Container,
  Section,
  SectionHeader,
  Tag,
  Navigation,
} from "./layout";

// =============================================================================
// FORMS - User input elements
// =============================================================================
export {
  Input,
  TextInput,
  TextArea,
  SelectInput,
  SearchInput,
  EmailSubmit,
  EmailSubmitInline,
} from "./forms";

// =============================================================================
// BUTTONS - Action triggers
// =============================================================================
export {
  PrimaryButton,
  SecondaryButton,
  IconButton,
  CTAButton,
} from "./buttons";

// =============================================================================
// FEEDBACK - User feedback and status indicators
// =============================================================================
export {
  Alert,
  Modal,
  Tooltip,
  Drawer,
  Accordion,
  AccordionGroup,
  SkeletonScreen,
  Skeleton,
  SkeletonText,
  EmptyState,
  EmptyStateCompact,
  EmptyStateInline,
  Badge,
  StatusBadge,
  CountBadge,
} from "./feedback";

// =============================================================================
// NAVIGATION - Wayfinding and orientation
// =============================================================================
export {
  Breadcrumbs,
  BreadcrumbsList,
  BreadcrumbsCompact,
  TabNavigation,
  TabNavigationWrapper,
  TabPill,
} from "./navigation";

// =============================================================================
// MARKETING - Landing pages, feature sections, testimonials
// =============================================================================
export {
  HeroTextLeft,
  Quote,
  Testimonial,
  TestimonialGrid,
  FeatureSection,
  FeatureWithBenefits,
  TabbedFeatures,
  Footer,
} from "./marketing";

// =============================================================================
// BRAND - Logo and brand assets
// =============================================================================
export {
  TrigLogo,
  TrigLogoBlack,
  TrigLogoWhite,
  IsometricCube,
  PeriodicElement,
  PeriodicSequence,
} from "./brand";

// =============================================================================
// TYPOGRAPHY - Rich text and content styling
// =============================================================================
export {
  portableTextComponents,
  Prose,
} from "./typography";

// =============================================================================
// STANDALONE COMPONENTS
// =============================================================================
export { default as Card } from "./Card";
export { default as Toggle } from "./Toggle";
