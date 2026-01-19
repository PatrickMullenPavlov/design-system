import { useCallback } from "react";

/**
 * SelectInput - Dropdown select component
 *
 * Native HTML select with label and description support.
 * Supports flat options or grouped options.
 *
 * @param {string} [label] - Label text
 * @param {string} [description] - Helper text below the label
 * @param {string} placeholder - Placeholder text (shown as disabled first option)
 * @param {Array<{label: string, value: string|number}>} [options] - Flat list of options
 * @param {Array<{label: string, options: Array<{label: string, value: string|number}>}>} [groups] - Grouped options
 * @param {string} [value] - Current selected value
 * @param {boolean} required - Whether the field is required
 * @param {boolean} [disabled=false] - Whether the select is disabled
 * @param {function} onChange - Callback when value changes (receives string)
 */
export default function SelectInput({
  label = "",
  description,
  placeholder,
  options,
  groups,
  value,
  required,
  disabled = false,
  onChange,
}) {
  const onInputChange = useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="flex justify-between leading-6">
      <label className="w-full mb-0">
        {label}
        {description && (
          <div className="text-xs font-normal leading-5 tracking-wide text-body-text-lighter mb-2">
            {description}
          </div>
        )}
        <select
          id="select-input__select"
          value={value}
          className="block w-full rounded-lg border border-rule-color bg-white px-2 pl-3 text-xs font-normal leading-6 tracking-wide text-body-text focus:border-blue-800 focus:ring-blue-300"
          onChange={onInputChange}
          required={required}
          disabled={disabled}
          defaultValue={""}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options &&
            options.map((o) => (
              <option
                key={o.value}
                value={o.value}
                className="text-xs font-normal leading-4 tracking-wide"
              >
                {o.label}
              </option>
            ))}
          {groups &&
            groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    className="text-xs font-normal leading-4 tracking-wide"
                  >
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      </label>
    </div>
  );
}
