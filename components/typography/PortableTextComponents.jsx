/**
 * PortableTextComponents - Rich text styling configuration
 *
 * Use with @portabletext/react or as reference for rich text styling patterns.
 * All styles use the locked typography scale.
 *
 * @example
 * import { PortableText } from "@portabletext/react";
 * import { portableTextComponents } from "./components/typography/PortableTextComponents";
 *
 * <PortableText value={content} components={portableTextComponents} />
 */

export const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="py-4">
        <img
          src={value.asset?.url || value.src}
          alt={value.alt || "Image"}
          className="mx-auto xl:ml-0 h-full w-auto"
          loading="lazy"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight leading-tight pt-6 mb-4 last:mb-0 text-body-text">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight leading-tight mb-6 max-w-screen-md text-body-text">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight leading-snug mb-4 text-body-text">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium tracking-tight leading-snug mb-3 text-body-text">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 last:mb-0 font-light leading-relaxed text-body-text-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-rule-color pl-4 my-6 italic text-body-text-lighter">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-body-text">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-action-color underline hover:text-body-text transition-colors"
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-trig-bg-darker px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 font-light text-body-text-light space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 font-light text-body-text-light space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

/**
 * Prose - Wrapper component for rich text content
 *
 * Applies consistent typography styling to any rich text content.
 * Use this to wrap HTML content or markdown-rendered content.
 *
 * @param {React.ReactNode} children - Content to style
 * @param {string} [className] - Additional classes
 */
export function Prose({ children, className = "" }) {
  return (
    <div
      className={`
        prose prose-body-text
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mb-6
        prose-h3:text-xl prose-h3:mb-4
        prose-p:font-light prose-p:leading-relaxed prose-p:text-body-text-light
        prose-a:text-action-color prose-a:underline
        prose-strong:font-semibold prose-strong:text-body-text
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:font-light
        max-w-none
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default portableTextComponents;
