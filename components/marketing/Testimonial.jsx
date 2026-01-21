import { cx } from "../../utils/cx";

/**
 * Testimonial - Individual testimonial card
 *
 * Displays a customer testimonial with quote, author, optional stat,
 * and company info. Designed to sit on flash backgrounds.
 *
 * @param {string} quote - The testimonial quote
 * @param {string} author - Author name
 * @param {string} [authorTitle] - Author's job title
 * @param {string} [authorImage] - Author's photo URL
 * @param {string} [companyLogo] - Company logo URL
 * @param {string} [companyName] - Company name
 * @param {string} [companyImage] - Company hero/background image
 * @param {Object} [stat] - Optional statistic to highlight
 * @param {string} stat.value - The stat value (e.g., "42%")
 * @param {string} stat.label - Stat label
 * @param {string} [stat.description] - Stat description
 * @param {string} [href] - Link URL
 * @param {"horizontal"|"vertical"} [layout="horizontal"] - Card layout
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Testimonial
 *   quote="Trig helped us increase conversions by 40%"
 *   author="John Doe"
 *   authorTitle="CEO"
 *   authorImage="/john.jpg"
 *   companyLogo="/acme-logo.svg"
 *   companyName="Acme"
 *   stat={{ value: "40%", label: "Conversion Rate", description: "Increase in 3 months" }}
 *   href="/casestudies/acme"
 * />
 */
export default function Testimonial({
  quote,
  author,
  authorTitle,
  authorImage,
  companyLogo,
  companyName,
  companyImage,
  stat,
  href,
  layout = "horizontal",
  className = "",
}) {
  const content = (
    <div
      className={cx(
        "flash rounded-md p-4 gap-8",
        layout === "horizontal"
          ? "flex flex-col lg:flex-row"
          : "flex flex-col",
        className
      )}
    >
      {/* Image Section */}
      {companyImage && (
        <div
          className={cx(
            "flex-shrink-0 overflow-hidden rounded-lg",
            layout === "horizontal"
              ? "w-full lg:w-2/5 xl:w-1/3 aspect-video lg:aspect-square"
              : "w-full aspect-video"
          )}
        >
          <img
            src={companyImage}
            alt={companyName || author}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col justify-between py-0 lg:py-4 flex-1">
        {/* Company Logo */}
        {companyLogo && (
          <div className="pb-6">
            <img
              src={companyLogo}
              alt={companyName}
              className="h-6 w-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Stat */}
        {stat && (
          <div className="mb-6">
            <div className="text-sm font-medium text-body-text">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-sm font-light text-body-text-lighter">
                {stat.description}
              </div>
            )}
            <div className="text-7xl font-light tracking-tight text-body-text leading-none mt-2">
              {stat.value}
            </div>
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-lg font-light text-body-text mb-6 max-w-screen-sm">
          "{quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          {authorImage && (
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={authorImage}
                alt={author}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-body-text">{author}</div>
            {authorTitle && (
              <div className="text-sm font-light text-body-text-lighter">
                {authorTitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-95 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}

/**
 * TestimonialGrid - Grid of testimonials
 *
 * @param {Array} testimonials - Array of testimonial props
 * @param {number} [columns=2] - Number of columns
 * @param {string} [className] - Additional classes
 */
export function TestimonialGrid({
  testimonials,
  columns = 2,
  className = "",
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cx("grid gap-4", gridCols[columns] || gridCols[2], className)}>
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          {...testimonial}
          layout="vertical"
        />
      ))}
    </div>
  );
}
