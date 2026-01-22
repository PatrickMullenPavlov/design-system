import { cx } from "../../utils/cx";

/**
 * Skeleton - Loading placeholder
 *
 * @param {"text"|"circle"|"rect"|"card"} [variant="text"] - Shape variant
 * @param {string} [width] - Custom width class
 * @param {string} [height] - Custom height class
 * @param {string} [className] - Additional classes
 *
 * @example
 * // Text skeleton
 * <Skeleton variant="text" width="w-48" />
 *
 * // Avatar skeleton
 * <Skeleton variant="circle" width="w-10" height="h-10" />
 *
 * // Card skeleton
 * <Skeleton variant="card" />
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
}) {
  const variants = {
    text: cx("h-4 rounded", width || "w-full"),
    circle: cx("rounded-full", width || "w-10", height || "h-10"),
    rect: cx("rounded-md", width || "w-full", height || "h-20"),
    card: cx("rounded-lg", width || "w-full", height || "h-32"),
  };

  return (
    <div
      className={cx(
        "bg-trig-bg animate-pulse",
        variants[variant],
        className
      )}
      data-testid="skeleton"
    />
  );
}

/**
 * SkeletonText - Multiple lines of skeleton text
 *
 * @param {number} [lines=3] - Number of lines
 * @param {string} [className] - Additional classes
 */
export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={cx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonScreen - Full-screen loading state
 *
 * @param {string} [label="Loading your data"] - Loading message
 * @param {string} [className] - Additional classes
 *
 * @example
 * <SkeletonScreen label="Loading dashboard..." />
 */
export default function SkeletonScreen({
  label = "Loading your data",
  className = "",
}) {
  return (
    <div
      className={cx(
        "flex items-center align-middle justify-center w-full min-h-96",
        className
      )}
      data-testid="skeleton-screen"
    >
      <div className="w-64 text-center">
        <div className="mx-auto mb-4">
          <div className="w-12 h-12 mx-auto rounded-lg bg-trig-bg animate-pulse" />
        </div>
        <div className="text-body-text-lighter animate-pulse">
          {label}...
        </div>
      </div>
    </div>
  );
}
