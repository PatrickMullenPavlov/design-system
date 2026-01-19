import { useCallback } from "react";
import Alert from "../feedback/Alert";

/**
 * Input - Base input component
 *
 * Low-level input component with support for various HTML input types.
 * Handles basic validation display and size variants.
 *
 * @param {string} [autoComplete] - HTML autocomplete attribute
 * @param {boolean} [autoFocus=false] - Whether to focus on mount
 * @param {string} [type="text"] - HTML input type
 * @param {string} [placeholder] - Placeholder text
 * @param {string|number} value - Current value
 * @param {boolean} [required=false] - Whether the field is required
 * @param {function} onChange - Callback when value changes (receives string)
 * @param {function} [onKeyDown] - Callback for key events
 * @param {string} [min] - Minimum value (for number inputs)
 * @param {string} [step] - Step value (for number inputs)
 * @param {boolean} [disabled=false] - Whether the input is disabled
 * @param {"default"|"large"} [size="default"] - Size variant
 * @param {string} [error] - Error message to display
 */
export default function Input({
  autoComplete,
  autoFocus = false,
  type = "text",
  placeholder,
  value,
  required = false,
  onChange,
  onKeyDown = () => undefined,
  min,
  step,
  disabled = false,
  size = "default",
  error,
}) {
  const onInputChange = useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  const sizeClasses = size === "large" ? "p-3" : "px-2 pl-3";

  return (
    <>
      <input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        type={type}
        className={`mt-2 block w-full rounded-lg border ${error ? "border-red" : "border-rule-color"} ${disabled ? "bg-gray-50" : "bg-white"} text-xs font-normal leading-6 tracking-wide text-body-text focus:border-blue-800 focus:ring-blue-300 ${sizeClasses}`}
        aria-describedby="helper-text-explanation"
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        required={required}
        disabled={disabled}
        onKeyDown={onKeyDown}
        min={min}
        step={step}
      />
      {error && (
        <div className="mt-2">
          <Alert type="error" size="small" message={error} />
        </div>
      )}
    </>
  );
}
