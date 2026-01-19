import Input from "./Input";

/**
 * TextInput - Labeled text input component
 *
 * Wraps the base Input component with a label and optional description.
 * Use for standard form fields.
 *
 * @param {string} [autoComplete] - HTML autocomplete attribute
 * @param {string} [type="text"] - HTML input type
 * @param {string} label - Label text
 * @param {string} [description] - Helper text below the label
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Current value
 * @param {boolean} required - Whether the field is required
 * @param {function} onChange - Callback when value changes (receives string)
 * @param {function} [onKeyDown] - Callback for key events
 * @param {string} [min] - Minimum value (for number inputs)
 * @param {string} [step] - Step value (for number inputs)
 * @param {boolean} [disabled=false] - Whether the input is disabled
 * @param {"default"|"large"} [size] - Size variant
 * @param {string} [error] - Error message to display
 * @param {boolean} [autoFocus=false] - Whether to focus on mount
 */
export default function TextInput({
  autoComplete,
  type = "text",
  label,
  description,
  placeholder,
  value,
  required,
  onChange,
  onKeyDown = () => undefined,
  min,
  step,
  disabled = false,
  autoFocus = false,
  size,
  error,
}) {
  return (
    <div className="border-none pb-4">
      <label>
        {label}
        {description && (
          <div className="text-xs font-normal leading-5 tracking-wide text-body-text-lighter mb-2">
            {description}
          </div>
        )}
        <Input
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          onKeyDown={onKeyDown}
          min={min}
          step={step}
          size={size}
          error={error}
          autoFocus={autoFocus}
        />
      </label>
    </div>
  );
}
