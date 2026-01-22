import React from "react";
import { cx } from "../../utils/cx";

/**
 * PrimaryButton - Main action button component
 *
 * Used for primary actions like submit, save, or main CTAs.
 * Supports multiple variants and sizes.
 *
 * IMPORTANT: Primary buttons use rounded-full (pill shape). This is the ONLY
 * place in the design system where we deviate from square/subtle rounded edges.
 *
 * @param {string} label - Button text
 * @param {function} [onClick] - Click handler
 * @param {boolean} [isDisabled=false] - Whether the button is disabled
 * @param {boolean} [fullWidth=false] - Whether to span full width
 * @param {"default"|"sm"|"lg"} [size="default"] - Size variant
 * @param {React.ReactNode} [iconLeft] - Icon to display on the left
 * @param {React.ReactNode} [iconRight] - Icon to display on the right
 * @param {"button"|"submit"|"reset"} [type="button"] - HTML button type
 * @param {"default"|"gradient"|"outline"} [variant="default"] - Visual style variant
 */

const variantClasses = {
  default:
    "animate bg-body-text text-grey-50 hover:bg-active-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-300",
  gradient: "CampaignButton",
  outline:
    "animate bg-transparent text-body-text border border-body-text hover:bg-body-text hover:text-grey-50 focus-visible:outline-none focus-visible:bg-body-text focus-visible:text-grey-50",
};

// Primary buttons ALWAYS use rounded-full - the only place we deviate from square edges
const sizeClasses = {
  sm: "animate rounded-full px-4 py-2 text-center font-medium text-xs flex align-middle items-center justify-center",
  default:
    "animate rounded-full px-4 py-2 font-medium text-center text-xs tracking-wide flex align-middle items-center justify-center",
  lg: "animate rounded-full px-6 py-3 text-center font-medium text-sm flex align-middle items-center justify-center",
};

function renderIconWithForcedSize(icon) {
  return icon && React.isValidElement(icon)
    ? React.cloneElement(icon, { className: "w-4 h-4" })
    : null;
}

export default function PrimaryButton({
  label,
  onClick,
  isDisabled = false,
  fullWidth = false,
  size = "default",
  iconLeft = null,
  iconRight = null,
  type = "button",
  variant = "default",
}) {
  if (iconLeft && iconRight) {
    console.warn("Cannot use both iconLeft and iconRight at the same time.");
    return <div>Invalid button configuration</div>;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
      disabled={isDisabled}
      className={cx(
        isDisabled && "opacity-30",
        fullWidth && "w-full",
        sizeClasses[size],
        variantClasses[variant],
        "flex gap-2"
      )}
    >
      {iconLeft && renderIconWithForcedSize(iconLeft)}
      <div>{label}</div>
      {iconRight && renderIconWithForcedSize(iconRight)}
    </button>
  );
}
