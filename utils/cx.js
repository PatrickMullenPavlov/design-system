/**
 * Utility function for conditionally joining class names.
 * Filters out falsy values and joins the remaining classes with spaces.
 *
 * @param {...(string|boolean|null|undefined)} classes - Class names or falsy values
 * @returns {string} Combined class string
 *
 * @example
 * cx('base', isActive && 'active', isDisabled && 'disabled')
 * // Returns: "base active" if isActive is true and isDisabled is false
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
