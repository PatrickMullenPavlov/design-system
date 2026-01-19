/**
 * Container - Page-level wrapper component
 *
 * Provides consistent max-width and padding for page content.
 * Centers content with responsive padding.
 *
 * @param {React.ReactNode} children - Content to wrap
 * @param {string} [className] - Additional CSS classes
 */
export default function Container({ children, className }) {
  return (
    <div
      className={`p-6 md:px-8 md:pb-8 md:pt-12 mx-auto w-full max-w-screen-2xl rounded-md ${className || ""}`}
    >
      {children}
    </div>
  );
}
