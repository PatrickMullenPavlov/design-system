import { cx } from "../../utils/cx";
import PrimaryButton from "../buttons/PrimaryButton";

/**
 * EmptyState - Empty state placeholder with action
 *
 * @param {string} title - Main message
 * @param {string} description - Supporting text
 * @param {React.ReactNode} [icon] - Optional icon or illustration
 * @param {string} [buttonLabel] - Optional CTA button text
 * @param {function} [onClick] - Button click handler
 * @param {boolean} [fullHeight=true] - Whether to use full container height
 * @param {string} [className] - Additional classes
 *
 * @example
 * <EmptyState
 *   title="No campaigns yet"
 *   description="Create your first campaign to get started"
 *   buttonLabel="Create Campaign"
 *   onClick={() => navigate("/campaigns/new")}
 * />
 */
export default function EmptyState({
  title,
  description,
  icon,
  buttonLabel,
  onClick,
  fullHeight = true,
  className = "",
}) {
  return (
    <div
      className={cx(
        fullHeight
          ? "h-auto place-items-center bg-trig-bg-lighter mx-8 rounded-lg py-4"
          : "grid h-full w-auto p-8 text-center rounded-lg",
        className
      )}
      data-testid="empty-state"
    >
      <div className="py-12">
        {/* Icon/Illustration */}
        {icon && (
          <div className="mx-auto mb-6 flex items-center justify-center">
            {icon}
          </div>
        )}

        {/* Default illustration when no icon provided */}
        {!icon && (
          <div className="mx-auto mb-6 flex items-center justify-center">
            <EmptyStateIllustration />
          </div>
        )}

        {/* Text content */}
        <div className="mx-auto pb-4 text-center">
          <p className="text-base font-medium text-body-text">{title}</p>
          <p className="text-sm font-light text-body-text-lighter mt-1">
            {description}
          </p>
        </div>

        {/* Action button */}
        {buttonLabel && (
          <div className="mx-auto flex justify-center">
            <PrimaryButton label={buttonLabel} onClick={onClick} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * EmptyStateCompact - Smaller inline empty state
 *
 * @param {string} title - Main message
 * @param {string} [description] - Optional supporting text
 * @param {React.ReactNode} [icon] - Optional icon
 * @param {string} [className] - Additional classes
 */
export function EmptyStateCompact({
  title,
  description,
  icon,
  className = "",
}) {
  return (
    <div className={cx("text-center py-8 px-4", className)}>
      {icon && (
        <div className="mx-auto mb-3 text-body-text-lighter">{icon}</div>
      )}
      <p className="text-sm font-medium text-body-text">{title}</p>
      {description && (
        <p className="text-xs font-light text-body-text-lighter mt-1">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * EmptyStateInline - Very minimal inline empty state
 */
export function EmptyStateInline({ message, className = "" }) {
  return (
    <div className={cx("text-sm text-body-text-lighter py-4 text-center", className)}>
      {message}
    </div>
  );
}

/**
 * Default illustration for empty states
 */
function EmptyStateIllustration() {
  return (
    <div className="relative w-24 h-24">
      {/* Stacked cards effect */}
      <div className="absolute inset-0 bg-trig-bg rounded-lg transform rotate-3" />
      <div className="absolute inset-0 bg-trig-bg-light rounded-lg transform -rotate-2" />
      <div className="absolute inset-0 bg-white rounded-lg shadow-sm flex items-center justify-center">
        <div className="w-8 h-1 bg-trig-bg rounded-full mb-2" />
      </div>
    </div>
  );
}
