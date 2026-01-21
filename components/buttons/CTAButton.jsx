import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { cx } from "../../utils/cx";

/**
 * CTAButton - Call-to-action button for marketing pages
 *
 * A styled button for CTAs with optional icon support.
 * Uses the locked typography and spacing scales.
 *
 * @param {string} label - Button text
 * @param {string} [href] - URL to navigate to
 * @param {"default"|"light"} [variant="default"] - Style variant
 * @param {"sm"|"md"} [size="md"] - Button size
 * @param {boolean} [showIcon=false] - Show icon (auto-enabled for "Book a Demo")
 * @param {React.ReactNode} [icon] - Custom icon component
 * @param {boolean} [openInNewTab=false] - Open link in new tab
 * @param {Function} [onClick] - Click handler
 * @param {string} [className] - Additional classes
 *
 * @example
 * <CTAButton label="Get Started" href="/signup" />
 * <CTAButton label="Book a Demo" href="/demo" openInNewTab />
 * <CTAButton label="Learn More" variant="light" href="/about" />
 */
export default function CTAButton({
  label,
  href,
  variant = "default",
  size = "md",
  showIcon,
  icon,
  openInNewTab = false,
  onClick,
  className = "",
}) {
  if (!label) return null;

  // Auto-show icon for "Book a Demo"
  const shouldShowIcon = showIcon ?? label === "Book a Demo";
  // Auto-open in new tab for "Book a Demo"
  const shouldOpenNewTab = openInNewTab || label === "Book a Demo";

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (href && !onClick) {
      if (shouldOpenNewTab) {
        window.open(href, "_blank");
      } else {
        window.location.href = href;
      }
    }
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-xs md:text-sm px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-md md:rounded-full",
  };

  const variantClasses = {
    default:
      "bg-transparent text-body-text border border-body-text-lightest/50 hover:bg-body-text hover:text-white hover:border-body-text",
    light:
      "text-light-body-text border border-light-body-text hover:bg-white hover:text-body-text hover:border-white",
  };

  const IconComponent = icon || (shouldShowIcon ? SquaresPlusIcon : null);

  return (
    <button
      type="button"
      className={cx(
        "inline-flex items-center font-medium whitespace-nowrap transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={handleClick}
    >
      {IconComponent && (
        <span className="w-4 h-4 mr-1.5 md:w-5 md:h-5 md:mr-2">
          {typeof IconComponent === "function" ? <IconComponent /> : IconComponent}
        </span>
      )}
      {label}
    </button>
  );
}
