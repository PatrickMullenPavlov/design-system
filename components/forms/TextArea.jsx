import { useCallback } from "react";

/**
 * TextArea - Multi-line text input component
 *
 * Labeled textarea for longer text content.
 * Supports same styling and validation patterns as TextInput.
 *
 * @param {string} [autoComplete] - HTML autocomplete attribute
 * @param {string} label - Label text
 * @param {string} [description] - Helper text below the label
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Current value
 * @param {boolean} required - Whether the field is required
 * @param {function} onChange - Callback when value changes (receives string)
 * @param {function} [onKeyDown] - Callback for key events
 * @param {number} rows - Number of visible text rows
 * @param {boolean} [disabled=false] - Whether the textarea is disabled
 * @param {"default"|"large"} [size] - Size variant
 * @param {boolean} [autoFocus=false] - Whether to focus on mount
 * @param {string} [error] - Error message to display
 */
export default function TextArea({
  autoComplete,
  label,
  description,
  placeholder,
  value,
  required,
  onChange,
  onKeyDown = () => undefined,
  rows,
  disabled = false,
  autoFocus = false,
  size,
  error,
}) {
  const onInputChange = useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  const sizeClasses = size === "large" ? "p-3" : "px-2 pl-3";

  return (
    <div className="border-none pb-4">
      <label>
        {label}
        {description && (
          <div className="text-xs font-normal leading-5 tracking-wide text-body-text-lighter mb-2">
            {description}
          </div>
        )}
        <textarea
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          required={required}
          disabled={disabled}
          onKeyDown={onKeyDown}
          rows={rows}
          autoFocus={autoFocus}
          className={`mt-2 block w-full rounded-lg border ${error ? "border-red" : "border-rule-color"} ${disabled ? "bg-gray-50" : "bg-white"} text-xs font-normal leading-6 tracking-wide text-body-text focus:border-blue-800 focus:ring-blue-300 ${sizeClasses}`}
        />
      </label>
    </div>
  );
}
