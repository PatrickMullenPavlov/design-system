import Container from "../layout/Container";
import SectionHeader from "../layout/SectionHeader";
import CTAButton from "../buttons/CTAButton";
import { cx } from "../../utils/cx";

/**
 * FeatureSection - Feature highlight with image
 *
 * A flexible feature section with text on one side and an image on the other.
 * Image sits on a flash background per design system rules.
 *
 * @param {string} title - Feature title
 * @param {React.ReactNode} description - Description (can be rich text)
 * @param {string} [tag] - Optional tag above title
 * @param {string} [tagUrl] - Tag link URL
 * @param {string} [imageUrl] - Feature image URL
 * @param {string} [imageAlt] - Image alt text
 * @param {"left"|"right"} [imagePosition="right"] - Image position
 * @param {Object} [cta] - CTA configuration
 * @param {string} cta.text - CTA button text
 * @param {string} cta.url - CTA button URL
 * @param {string} [className] - Additional classes
 *
 * @example
 * <FeatureSection
 *   tag="Analytics"
 *   title="Real-time Insights"
 *   description="Track engagement as it happens."
 *   imageUrl="/analytics.png"
 *   imagePosition="right"
 *   cta={{ text: "Learn more", url: "/features/analytics" }}
 * />
 */
export default function FeatureSection({
  title,
  description,
  tag,
  tagUrl,
  imageUrl,
  imageAlt,
  imagePosition = "right",
  cta,
  className = "",
}) {
  const textContent = (
    <div className="flex flex-col w-full md:w-1/3">
      <div className="max-w-screen-sm text-left">
        <SectionHeader
          tag={tag}
          url={tagUrl}
          title={title}
          description={description}
          size="lgLight"
          alignment="left"
        />

        {cta && (
          <div className="text-left mt-4">
            <CTAButton label={cta.text} href={cta.url} />
          </div>
        )}
      </div>
    </div>
  );

  const imageContent = imageUrl && (
    <div className="flex w-full md:w-2/3 items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden flash rounded-md">
      <img
        src={imageUrl}
        alt={imageAlt || title}
        className="w-full h-auto"
        loading="lazy"
      />
    </div>
  );

  return (
    <Container className={cx("bg-white text-body-text", className)}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12">
        {imagePosition === "left" ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </Container>
  );
}

/**
 * FeatureWithBenefits - Feature section with benefits list and image
 *
 * @param {string} title - Section title
 * @param {React.ReactNode} description - Section description
 * @param {string} [tag] - Optional tag
 * @param {Array} benefits - Array of benefit items
 * @param {string} benefits[].title - Benefit title
 * @param {React.ReactNode} benefits[].description - Benefit description
 * @param {string} [benefits[].icon] - Benefit icon URL
 * @param {string} [benefits[].href] - Benefit link URL
 * @param {string} [imageUrl] - Main image URL
 * @param {Object} [cta] - CTA configuration
 * @param {string} [className] - Additional classes
 */
export function FeatureWithBenefits({
  title,
  description,
  tag,
  tagUrl,
  benefits = [],
  imageUrl,
  cta,
  className = "",
}) {
  return (
    <Container className={cx("bg-white text-body-text", className)}>
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between pb-6 md:mb-4">
        <div className="flex flex-col max-w-screen-md">
          <SectionHeader
            tag={tag}
            url={tagUrl}
            title={title}
            description={description}
            size="lgLight"
            alignment="left"
          />
        </div>

        {cta && (
          <div className="mt-4 sm:mt-0">
            <CTAButton label={cta.text} href={cta.url} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex lg:flex-row flex-col gap-8 items-stretch flash rounded-md">
        {/* Image */}
        {imageUrl && (
          <div className="lg:w-1/2 w-full rounded-md aspect-auto lg:aspect-square flex items-center justify-center p-4">
            <img
              src={imageUrl}
              alt={title}
              className="h-auto lg:w-full w-3/5 mx-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Benefits List */}
        <div className="lg:w-1/2 w-full flex flex-col space-y-6 justify-center max-w-lg p-4 lg:p-0">
          {benefits.map((benefit, index) => {
            const benefitContent = (
              <div className="flex flex-row gap-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
                {benefit.icon && (
                  <div className="h-12 w-12 bg-trig-bg-lighter rounded-md flex items-center justify-center flex-shrink-0">
                    <img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="h-8 w-8"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <SectionHeader
                    title={benefit.title}
                    size="sm"
                    alignment="left"
                  />
                  {benefit.description && (
                    <div className="text-sm font-light text-body-text-lighter mt-1">
                      {benefit.description}
                    </div>
                  )}
                </div>
              </div>
            );

            return benefit.href ? (
              <a key={index} href={benefit.href}>
                {benefitContent}
              </a>
            ) : (
              <div key={index}>{benefitContent}</div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
