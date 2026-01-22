import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { cx } from "../../utils/cx";

/**
 * CTAButton - Call-to-action button for marketing pages
 *
 * A styled button for CTAs with optional icon support.
 * "Book a Demo" automatically shows an icon and opens in a new tab.
 *
 * NOTE: CTAButton uses rounded-md (subtle corners), NOT rounded-full.
 * Only PrimaryButton uses fully rounded (pill) shape.
 *
 * @param {string} ctaText - Button text (required)
 * @param {string} [ctaUrl] - URL to navigate to
 * @param {string} [featureLinkUrl] - Alternative URL for "See how" buttons
 * @param {"default"|"light"} [style="default"] - Style variant
 * @param {Function} [handleCtaClick] - Click handler callback (receives ctaText, ctaUrl)
 * @param {string} [className] - Additional classes
 *
 * @example
 * <CTAButton ctaText="Get Started" ctaUrl="/signup" />
 * <CTAButton ctaText="Book a Demo" ctaUrl="/demo" />
 * <CTAButton ctaText="Learn More" style="light" ctaUrl="/about" />
 */
export default function CTAButton({
  ctaText,
  ctaUrl,
  handleCtaClick,
  featureLinkUrl,
  style = "default",
  className = "",
}) {
  if (!ctaText) return null;

  const handleButtonClick = () => {
    // Fire analytics callback if provided
    if (handleCtaClick) {
      handleCtaClick(ctaText, ctaUrl);
    }

    // Track via global analytics if available
    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track("CTA Click", {
        title: ctaText,
        slug: ctaUrl,
      });
    }

    // Determine URL to open
    const urlToOpen =
      ctaText === "See how" && featureLinkUrl ? featureLinkUrl : ctaUrl;

    if (!urlToOpen) return;

    // "Book a Demo" opens in new tab
    if (ctaText === "Book a Demo") {
      window.open(urlToOpen, "_blank");
    } else {
      window.location.href = urlToOpen;
    }
  };

  // Style variants
  const styleClasses =
    style === "light"
      ? "text-light-body-text border border-light-body-text hover:bg-white hover:text-body-text"
      : "bg-transparent text-body-text border border-body-text-lightest/50 hover:bg-yellow hover:text-body-text hover:border-yellow";

  return (
    <div className={cx("inline-block", className)}>
      <button
        type="button"
        className={cx(
          styleClasses,
          // Uses rounded-md only (not rounded-full - only PrimaryButton uses pill shape)
          "rounded-md hover:shadow-sm text-xs md:text-sm px-2.5 py-1.5 md:px-5 md:py-2.5",
          "text-center inline-flex items-center transition-colors font-brand whitespace-nowrap"
        )}
        onClick={handleButtonClick}
      >
        {ctaText === "Book a Demo" && (
          <div className="w-4 h-4 mr-1 md:w-5 md:h-5 md:mr-1.5">
            <SquaresPlusIcon />
          </div>
        )}
        {ctaText}
      </button>
    </div>
  );
}
