import Section from "../layout/Section";
import { cx } from "../../utils/cx";

/**
 * Quote - Large testimonial quote display
 *
 * A prominent quote section with author info, typically used between
 * content sections. Sits on a flash background.
 *
 * @param {string} quote - The quote text
 * @param {string} author - Author name
 * @param {string} [authorTitle] - Author's job title
 * @param {string} [authorImage] - Author's photo URL
 * @param {string} [companyLogo] - Company logo URL
 * @param {string} [companyName] - Company name (for alt text)
 * @param {string} [href] - Optional link URL
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Quote
 *   quote="Trig transformed how we engage with customers."
 *   author="Jane Smith"
 *   authorTitle="VP of Marketing"
 *   authorImage="/jane.jpg"
 *   companyLogo="/acme-logo.svg"
 *   companyName="Acme Inc"
 *   href="/casestudies/acme"
 * />
 */
export default function Quote({
  quote,
  author,
  authorTitle,
  authorImage,
  companyLogo,
  companyName,
  href,
  className = "",
}) {
  const content = (
    <div className="max-w-screen-lg mx-auto">
      {companyLogo && (
        <div className="h-8 mb-8 flex items-center justify-center">
          <img
            src={companyLogo}
            alt={companyName || "Company"}
            className="h-8 w-auto mx-auto"
            loading="lazy"
          />
        </div>
      )}

      <figure className="flex flex-auto flex-col justify-between">
        <blockquote className="text-2xl md:text-4xl text-body-text mb-8 font-light leading-tight tracking-tight text-center">
          <p>"{quote}"</p>
        </blockquote>

        <figcaption className="flex flex-col items-center text-center">
          {authorImage && (
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden mb-4">
              <img
                src={authorImage}
                alt={author}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="text-base">
            <div className="font-semibold text-body-text tracking-tight">
              {author}
            </div>
            {authorTitle && (
              <div className="mt-1 text-body-text-lighter tracking-tight">
                {authorTitle}
              </div>
            )}
          </div>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <Section bgColor="flash rounded-lg" className={className}>
      <div className="py-8 md:pt-16 md:pb-12 mx-auto overflow-hidden text-center">
        {href ? (
          <a href={href} className="block hover:opacity-90 transition-opacity">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </Section>
  );
}
