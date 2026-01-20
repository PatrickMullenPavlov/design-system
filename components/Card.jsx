import { cx } from "../utils/cx";

/**
 * Card - Interactive card component
 *
 * Container for grouped content with optional click behavior.
 * Provides consistent padding, border radius, and hover states.
 *
 * IMPORTANT: Cards should NEVER have outline-only borders.
 * Always use a background fill (default) or the flash pattern.
 *
 * @param {React.ReactNode} children - Card content
 * @param {string} [variant="default"] - Card style: "default" | "flash"
 * @param {string} [bgColor="bg-pavlov-bg-lighter"] - Background color class (ignored if variant="flash")
 * @param {string} [classNames=""] - Additional CSS classes
 * @param {function} [onClick] - Optional click handler (enables hover state)
 */

// Card padding constant (matches p-4 = 1rem)
// Exported so that components can use it to offset hover states if needed.
export const CARD_PADDING = "1rem";

export default function Card({
  children,
  variant = "default",
  bgColor = "bg-pavlov-bg-lighter",
  classNames = "",
  onClick,
}) {
  const isFlash = variant === "flash";

  return (
    <div
      style={{ padding: CARD_PADDING }}
      className={cx(
        "flex grow flex-col rounded-md animate",
        isFlash ? "flash" : bgColor,
        classNames,
        onClick && "cursor-pointer",
        onClick && !isFlash && "hover:bg-pavlov-bg"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
