import { cx } from "../../utils/cx";

/**
 * Tooltip - CSS-only hover hints component
 *
 * Lightweight tooltip that appears on hover. Uses pure CSS positioning
 * (no JavaScript positioning libraries required).
 *
 * @param {React.ReactNode} children - Element that triggers the tooltip
 * @param {string} content - Tooltip text content
 * @param {"top"|"bottom"|"left"|"right"} [position="top"] - Tooltip position
 * @param {string} [className] - Additional CSS classes for the wrapper
 */
export default function Tooltip({
  children,
  content,
  position = "top",
  className,
}) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-body-text border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-body-text border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-body-text border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-body-text border-y-transparent border-l-transparent",
  };

  return (
    <div className={cx("relative inline-block group", className)}>
      {children}
      <div
        className={cx(
          "absolute z-50 px-3 py-2 text-xs font-medium text-white bg-body-text rounded-lg",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
          "transition-opacity duration-200 whitespace-nowrap",
          positionClasses[position]
        )}
        role="tooltip"
      >
        {content}
        {/* Arrow */}
        <div
          className={cx(
            "absolute w-0 h-0 border-4",
            arrowClasses[position]
          )}
        />
      </div>
    </div>
  );
}
