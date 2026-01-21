import { cx } from "../../utils/cx";

/**
 * PeriodicElement - Framework device for conceptual structures
 *
 * Displays concepts as "elemental" building blocks with abbreviated labels,
 * sequential numbering, and boxed treatment. Use for step-by-step flows
 * like "Identify → Act → Measure".
 *
 * @param {string} symbol - 2-letter abbreviated label (e.g., "Id", "Ac", "Ms")
 * @param {string} [number] - Sequential number (e.g., "01", "02", "03")
 * @param {string} [label] - Full label text shown below
 * @param {boolean} [active=false] - Whether this element is in active state
 * @param {string} [size="md"] - Size: "sm" | "md" | "lg"
 * @param {string} [className=""] - Additional CSS classes
 */
export default function PeriodicElement({
  symbol,
  number,
  label,
  active = false,
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: {
      container: "w-12 h-14",
      symbol: "text-lg",
      number: "text-[8px]",
      label: "text-[9px]",
      padding: "p-1.5",
    },
    md: {
      container: "w-16 h-20",
      symbol: "text-2xl",
      number: "text-[10px]",
      label: "text-xs",
      padding: "p-2",
    },
    lg: {
      container: "w-24 h-28",
      symbol: "text-4xl",
      number: "text-xs",
      label: "text-sm",
      padding: "p-3",
    },
  };

  const sizeClasses = sizes[size] || sizes.md;

  return (
    <div className={cx("flex flex-col items-center", className)}>
      <div
        className={cx(
          "border-2 rounded flex flex-col items-center justify-center",
          sizeClasses.container,
          sizeClasses.padding,
          active
            ? "border-body-text bg-trig-bg-lighter"
            : "border-rule-color bg-white"
        )}
      >
        {number && (
          <span
            className={cx(
              "font-light tracking-wider text-body-text-lighter self-start",
              sizeClasses.number
            )}
          >
            {number}
          </span>
        )}
        <span
          className={cx(
            "font-bold tracking-tight text-body-text",
            sizeClasses.symbol
          )}
        >
          {symbol}
        </span>
      </div>
      {label && (
        <span
          className={cx(
            "mt-2 text-body-text-lighter font-medium tracking-wide text-center",
            sizeClasses.label
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * PeriodicArrow - Connector arrow between PeriodicElements
 */
export function PeriodicArrow({ className = "" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("text-body-text-lighter", className)}
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * PeriodicSequence - Compose a sequence of PeriodicElements with arrows
 *
 * @param {Array} elements - Array of { symbol, number, label } objects
 * @param {string} [size="md"] - Size for all elements
 * @param {number} [activeIndex] - Index of the active element (optional)
 */
export function PeriodicSequence({ elements, size = "md", activeIndex, className = "" }) {
  return (
    <div className={cx("flex items-start gap-4", className)}>
      {elements.map((element, index) => (
        <div key={index} className="flex items-center gap-4">
          <PeriodicElement
            symbol={element.symbol}
            number={element.number}
            label={element.label}
            size={size}
            active={activeIndex === index}
          />
          {index < elements.length - 1 && (
            <PeriodicArrow className="mt-2" />
          )}
        </div>
      ))}
    </div>
  );
}
