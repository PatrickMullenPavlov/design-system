/**
 * Section - Content section wrapper component
 *
 * Provides consistent max-width constraints and padding for content sections.
 * Supports multiple size variants for different layout needs.
 *
 * @param {React.ReactNode} children - Content to wrap
 * @param {string} [bgColor="bg-none"] - Background color class
 * @param {string} [opacity="bg-opacity-100"] - Background opacity class
 * @param {"sm"|"md"|"lg"} [size="lg"] - Max-width size variant
 * @param {string} [className="mx-auto w-full"] - Additional CSS classes
 */
export default function Section({
  children,
  bgColor = "bg-none",
  opacity = "bg-opacity-100",
  size = "lg",
  className = "mx-auto w-full",
}) {
  const sizeStyles = {
    sm: {
      width: "max-w-screen-lg",
    },
    md: {
      width: "max-w-screen-xl",
    },
    lg: {
      width: "max-w-screen-2xl",
    },
  };

  const selectedSizeStyle = sizeStyles[size] || sizeStyles.lg;

  return (
    <div
      className={`px-4 md:px-8 ${className} ${bgColor} ${opacity} ${selectedSizeStyle.width}`}
    >
      {children}
    </div>
  );
}
