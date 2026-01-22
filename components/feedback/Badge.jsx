import { cx } from "../../utils/cx";

/**
 * Badge - Status badge component
 *
 * @param {string} label - Badge text
 * @param {"default"|"success"|"warning"|"error"|"info"} [variant="default"] - Color variant
 * @param {"sm"|"md"} [size="sm"] - Badge size
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Badge label="Active" variant="success" />
 * <Badge label="Pending" variant="warning" />
 * <Badge label="Failed" variant="error" />
 */
export default function Badge({
  label,
  variant = "default",
  size = "sm",
  className = "",
}) {
  const variantStyles = {
    default: "bg-trig-bg text-body-text",
    success: "bg-green-10 text-green",
    warning: "bg-orange-10 text-orange",
    error: "bg-red-10 text-red",
    info: "bg-blue-10 text-blue-800",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cx(
        "rounded-full font-normal inline-flex items-center",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
}

/**
 * StatusBadge - Badge with colored dot indicator
 *
 * @param {string} label - Badge text
 * @param {"active"|"inactive"|"pending"|"error"} [status="active"] - Status type
 * @param {"sm"|"md"} [size="sm"] - Badge size
 * @param {string} [className] - Additional classes
 *
 * @example
 * <StatusBadge label="Live" status="active" />
 * <StatusBadge label="Paused" status="inactive" />
 */
export function StatusBadge({
  label,
  status = "active",
  size = "sm",
  className = "",
}) {
  const statusColors = {
    active: "bg-green",
    inactive: "bg-body-text-lighter",
    pending: "bg-orange",
    error: "bg-red",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cx(
        "rounded-full font-normal inline-flex items-center gap-1.5 bg-trig-bg text-body-text",
        sizeStyles[size],
        className
      )}
    >
      <span className={cx("w-1.5 h-1.5 rounded-full", statusColors[status])} />
      {label}
    </span>
  );
}

/**
 * CountBadge - Numeric count badge
 *
 * @param {number|string} count - Count to display
 * @param {"default"|"primary"|"error"} [variant="default"] - Color variant
 * @param {string} [className] - Additional classes
 *
 * @example
 * <CountBadge count={5} />
 * <CountBadge count="99+" variant="primary" />
 */
export function CountBadge({
  count,
  variant = "default",
  className = "",
}) {
  const variantStyles = {
    default: "bg-trig-bg text-body-text",
    primary: "bg-blue-800 text-white",
    error: "bg-red text-white",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {count}
    </span>
  );
}
