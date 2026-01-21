import Tag from "./Tag";

/**
 * SectionHeader - Heading component with optional tag and description
 *
 * Provides consistent heading hierarchy across the application.
 * Supports multiple sizes (xs, sm, md, lg, lgLight, xl) and alignments.
 *
 * @param {string} title - Main heading text
 * @param {string} [description] - Optional subheading/description text
 * @param {"xs"|"sm"|"md"|"lg"|"lgLight"|"xl"} [size="md"] - Size variant
 * @param {"center"|"left"} [alignment="center"] - Text alignment
 * @param {string} [tag] - Optional tag label above the title
 * @param {"default"|"white"} [tagColor="default"] - Tag color variant
 * @param {string} [url] - Optional link URL for tag
 * @param {"default"|"light"} [style] - Style variant (light for dark backgrounds)
 */
export default function SectionHeader({
  title,
  description,
  size = "md",
  alignment = "center",
  tag,
  tagColor = "default",
  url,
  style,
}) {
  // Define styles based on size prop
  // All values use the locked typography scale - no arbitrary values
  const sizeStyles = {
    xs: {
      tag: "mt-2",
      title: "text-sm font-medium tracking-tight",
      description: "text-sm font-light text-body-text-lighter",
    },
    sm: {
      tag: "mt-2",
      title: "text-base font-semibold tracking-tight",
      description: "text-sm leading-normal text-body-text-lighter",
    },
    md: {
      tag: "mt-2",
      title: "text-lg lg:text-2xl pb-2 font-semibold tracking-tight",
      description: "text-sm lg:text-base font-light",
    },
    lg: {
      tag: "mt-2",
      title: "text-2xl lg:text-4xl pb-4 font-bold tracking-tight",
      description: "text-base lg:text-lg pb-4 font-light",
    },
    lgLight: {
      tag: "mt-2",
      title: "text-2xl lg:text-4xl pb-2 font-semibold tracking-tight",
      description: "text-base lg:text-lg pb-4 sm:pb-2 font-light",
    },
    xl: {
      tag: "mt-2",
      title: "text-4xl lg:text-6xl pb-6 font-bold tracking-tighter",
      description: "text-base lg:text-lg pb-6 font-light",
    },
  };

  const appliedSizeStyles = sizeStyles[size] || sizeStyles.md;
  const alignmentClass = alignment === "left" ? "ml-0" : "mx-auto";

  // Apply gradient classes based on style prop
  const gradientClasses =
    style === "light" ? "text-white" : "gradient text-gradient";

  // Apply description text color based on style prop
  const descriptionTextClasses =
    style === "light" ? "text-light-body-text" : "text-body-text-lighter";

  return (
    <div className={`max-w-screen-sm ${alignmentClass}`}>
      {/* If tag is not equal to title, show the Tag component and title */}
      {tag !== title && (
        <>
          {tag && <Tag label={tag} url={url} tagColor={tagColor} />}
          <div
            className={`tracking-tight ${gradientClasses} ${appliedSizeStyles.title} ${tag && appliedSizeStyles.tag}`}
          >
            {title}
          </div>
          {/* Render the description if available */}
          {description && (
            <div
              className={`${descriptionTextClasses} ${appliedSizeStyles.description}`}
            >
              {description}
            </div>
          )}
        </>
      )}

      {/* If tag is equal to title, show the title as a clickable link */}
      {tag === title && (
        <a className="cursor-pointer" href={url}>
          <div className={`tracking-tight ${appliedSizeStyles.title}`}>
            {title}
          </div>
          {description && (
            <div className={`items-center ${appliedSizeStyles.description}`}>
              {description}
            </div>
          )}
        </a>
      )}
    </div>
  );
}
