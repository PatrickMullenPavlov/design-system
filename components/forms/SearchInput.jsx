import { useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

/**
 * SearchInput - Search field component
 *
 * Input with search icon, typically used for filtering and search interfaces.
 * Supports rounded or square variants.
 *
 * @param {string} value - Current value
 * @param {string} placeholder - Placeholder text
 * @param {boolean} [autoFocus=false] - Whether to focus on mount
 * @param {function} onChange - Callback when value changes (receives string)
 * @param {function} [keyDown] - Callback for key events
 * @param {boolean} [square=false] - Use square corners instead of rounded
 */
export default function SearchInput({
  value,
  placeholder,
  autoFocus = false,
  onChange,
  keyDown,
  square = false,
}) {
  const onInputChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const roundedClasses = square ? "rounded-lg" : "rounded-full";

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="absolute left-4 top-[50%] -translate-y-[50%] h-4 w-4" />
      <input
        type="text"
        className={`w-full border-rule-color h-10 pl-10 text-xs py-2.5 outline-none placeholder:text-xs placeholder:tracking-wide placeholder:text-body-text-lighter ${roundedClasses}`}
        placeholder={placeholder}
        onKeyDown={keyDown}
        value={value}
        onChange={onInputChange}
        autoFocus={autoFocus}
      />
    </div>
  );
}
