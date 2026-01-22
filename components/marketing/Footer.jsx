import { cx } from "../../utils/cx";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import CTAButton from "../buttons/CTAButton";
import { TrigLogoWhite } from "../brand";

/**
 * Footer - Marketing site footer
 *
 * @param {Object} [promo] - Optional promotional section above footer
 * @param {string} promo.title - Promo title
 * @param {React.ReactNode} promo.description - Promo description
 * @param {string} [promo.ctaText] - CTA button text
 * @param {string} [promo.ctaUrl] - CTA button URL
 * @param {string} [promo.imageUrl] - Optional promo image
 * @param {Array} navigation - Footer navigation sections
 * @param {string} navigation[].title - Section title
 * @param {Array} navigation[].links - Section links
 * @param {string} navigation[].links[].label - Link text
 * @param {string} navigation[].links[].href - Link URL
 * @param {Object} [social] - Social links
 * @param {string} [social.twitter] - Twitter URL
 * @param {string} [social.linkedin] - LinkedIn URL
 * @param {string} [social.email] - Email address
 * @param {Object} [legal] - Legal links
 * @param {string} [legal.privacy] - Privacy policy URL
 * @param {string} [legal.terms] - Terms URL
 * @param {React.ComponentType} [LinkComponent] - Custom link component
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Footer
 *   promo={{
 *     title: "Ready to get started?",
 *     description: "Book a demo with our team",
 *     ctaText: "Book a Demo",
 *     ctaUrl: "/demo"
 *   }}
 *   navigation={[
 *     { title: "Product", links: [{ label: "Features", href: "/features" }] },
 *     { title: "Company", links: [{ label: "About", href: "/about" }] },
 *   ]}
 *   social={{ twitter: "https://twitter.com/...", linkedin: "https://linkedin.com/..." }}
 *   legal={{ privacy: "/privacy", terms: "/terms" }}
 * />
 */
export default function Footer({
  promo,
  navigation = [],
  social = {},
  legal = {},
  LinkComponent = "a",
  className = "",
}) {
  const Link = LinkComponent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx("footer", className)}>
      {/* Promotional section */}
      {promo && (
        <Section className="bg-transparent">
          <div className="pt-8 pb-16">
            <div className="text-center max-w-screen-md mx-auto">
              <SectionHeader
                title={promo.title}
                description={promo.description}
                size="lg"
                style="light"
              />
              {promo.ctaText && (
                <div className="mt-4">
                  <CTAButton
                    label={promo.ctaText}
                    href={promo.ctaUrl}
                    variant="light"
                  />
                </div>
              )}
              {promo.imageUrl && (
                <div className="text-center mx-auto max-w-64 mt-8">
                  <img src={promo.imageUrl} alt="" className="w-full h-auto" />
                </div>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Main footer content */}
      <Section className="bg-white/5 border border-white/10 rounded-t-md backdrop-blur-lg text-light-body-text">
        <div className="flex flex-col md:flex-row gap-8 pt-8 pb-8 md:pb-24">
          {/* Logo and status */}
          <div className="flex flex-col w-full md:w-1/3 text-xs gap-4">
            <div>
              <Link href="/" className="flex">
                <TrigLogoWhite className="h-8" />
              </Link>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green opacity-75 animate-ping" />
              </div>
              <span>All systems operational</span>
            </div>

            {/* Social links */}
            {(social.twitter || social.linkedin || social.email) && (
              <div className="flex flex-row items-center gap-4 text-light-body-text-light mt-4">
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <XIcon />
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                  </a>
                )}
                {social.email && (
                  <a href={`mailto:${social.email}`}>
                    <EmailIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation columns */}
          <div className="flex flex-col w-full md:w-2/3 text-sm">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              {navigation.map((section, idx) => (
                <div key={idx} className="col-span-1">
                  <span className="font-medium">{section.title}</span>
                  <div className="mt-2">
                    {section.links.map((link, linkIdx) => (
                      <Link
                        key={linkIdx}
                        href={link.href}
                        className="block py-1 font-brand text-light-body-text-light hover:text-light-body-text transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom bar */}
      <Section>
        <div className="flex flex-col md:flex-row gap-8 py-8 text-xs text-light-body-text-lighter">
          <div className="flex w-full md:w-1/3">
            &copy; {currentYear} Trig Ltd. All rights reserved.
          </div>

          <div className="flex flex-row justify-between w-full md:w-2/3">
            <div className="flex items-center gap-8">
              {legal.privacy && (
                <Link href={legal.privacy} className="hover:text-light-body-text transition-colors">
                  Privacy Policy
                </Link>
              )}
              {legal.terms && (
                <Link href={legal.terms} className="hover:text-light-body-text transition-colors">
                  Terms of Service
                </Link>
              )}
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}

// Social icons as inline SVGs
function XIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 300 300" className="h-4 w-4">
      <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 16" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
      <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
    </svg>
  );
}
