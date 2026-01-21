import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import CTAButton from "../buttons/CTAButton";
import { cx } from "../../utils/cx";

/**
 * HeroTextLeft - Hero section with text on left, media on right
 *
 * A standard hero layout with headline, description, CTA on the left
 * and an image or video on the right.
 *
 * @param {string} [tag] - Optional tag above headline
 * @param {string} headline - Main headline text
 * @param {string} [subheadline] - Description text below headline
 * @param {string} [ctaText] - CTA button label
 * @param {string} [ctaUrl] - CTA button URL
 * @param {string} [heroImageUrl] - Hero image URL
 * @param {string} [heroVideoUrl] - Hero video URL (takes precedence over image)
 * @param {string} [videoPosterUrl] - Poster image for video
 * @param {Function} [onCtaClick] - CTA click handler
 * @param {string} [className] - Additional classes
 *
 * @example
 * <HeroTextLeft
 *   tag="New Feature"
 *   headline="Welcome to Trig"
 *   subheadline="The customer engagement platform"
 *   ctaText="Book a Demo"
 *   ctaUrl="/demo"
 *   heroImageUrl="/hero.jpg"
 * />
 */
export default function HeroTextLeft({
  tag,
  headline,
  subheadline,
  ctaText,
  ctaUrl,
  heroImageUrl,
  heroVideoUrl,
  videoPosterUrl,
  onCtaClick,
  className = "",
}) {
  return (
    <Section className={className}>
      <div className="grid grid-cols-12 pt-16 lg:pt-32 text-left">
        {/* Text Column */}
        <div className="col-span-12 pb-8 text-left lg:col-span-4">
          <SectionHeader
            tag={tag}
            title={headline}
            description={subheadline}
            size="xl"
            alignment="left"
          />
          {ctaText && (
            <div className="mt-6">
              <CTAButton
                label={ctaText}
                href={ctaUrl}
                onClick={onCtaClick}
              />
            </div>
          )}
        </div>

        {/* Media Column */}
        {(heroVideoUrl || heroImageUrl) && (
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 py-8 lg:py-0 pb-8 lg:pb-16">
            {heroVideoUrl ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={videoPosterUrl}
                className="w-full h-auto"
              >
                <source src={heroVideoUrl} type="video/mp4" />
                Your browser does not support video.
              </video>
            ) : (
              <img
                src={heroImageUrl}
                alt={headline}
                className="w-full h-auto"
                loading="eager"
              />
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
