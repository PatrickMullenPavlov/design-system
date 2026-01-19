import { cx } from "../utils/cx";

/**
 * Card - Interactive card component
 *
 * Container for grouped content with optional click behavior.
 * Provides consistent padding, border radius, and hover states.
 *
 * @param {React.ReactNode} children - Card content
 * @param {string} [bgColor="bg-pavlov-bg-lighter"] - Background color class
 * @param {string} [classNames=""] - Additional CSS classes
 * @param {function} [onClick] - Optional click handler (enables hover state)
 */

// Card padding constant (matches p-4 = 1rem)
// Exported so that components can use it to offset hover states if needed.
export const CARD_PADDING = "1rem";

export default function Card({
  children,
  bgColor = "bg-pavlov-bg-lighter",
  classNames = "",
  onClick,
}) {
  return (
    <div
      style={{ padding: CARD_PADDING }}
      className={cx(
        "flex grow flex-col rounded-md animate",
        bgColor,
        classNames,
        onClick && "cursor-pointer",
        onClick && "hover:bg-pavlov-bg"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
