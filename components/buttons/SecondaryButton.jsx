import React from "react";
import { cx } from "../../utils/cx";

/**
 * SecondaryButton - Secondary action button component
 *
 * Used for secondary actions like cancel, back, or alternative options.
 * Has special styling when label is "Delete" for destructive actions.
 *
 * NOTE: Secondary buttons use rounded-md (subtle rounding), NOT rounded-full.
 * Only PrimaryButton uses fully rounded edges.
 *
 * @param {string} label - Button text
 * @param {function} [onClick] - Click handler
 * @param {boolean} [isDisabled] - Whether the button is disabled
 * @param {boolean} [fullWidth=false] - Whether to span full width
 * @param {React.ReactNode} [icon] - Icon to display
 */
export default function SecondaryButton({
  label,
  onClick,
  isDisabled,
  fullWidth = false,
  icon = null,
}) {
  const isDeleteButton = label.toLowerCase() === "delete";

  const iconWithForcedSize =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon, { className: "w-4 h-4" })
      : icon;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
      className={cx(
        isDisabled && "opacity-30",
        fullWidth && "w-full",
        "animate rounded-md px-4 py-2 font-medium text-center text-xs tracking-wide flex align-middle items-center justify-center text-body-text gap-2",
        isDeleteButton
          ? "bg-grey-100 hover:bg-red-100 hover:text-red hover:border-red-10 focus:outline-none focus:ring-2 focus:ring-grey-300"
          : "bg-grey-100 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-grey-300"
      )}
    >
      {icon && <div>{iconWithForcedSize}</div>}
      {label}
    </button>
  );
}
