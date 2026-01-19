import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

/**
 * Alert - Feedback message component
 *
 * Displays informational, warning, success, or error messages.
 * Used for form validation, notifications, and status updates.
 *
 * @param {string} [title] - Optional title for the alert
 * @param {string} message - Alert message text
 * @param {"info"|"warning"|"success"|"error"} [type] - Alert type
 * @param {boolean} [icon=true] - Whether to show the icon
 * @param {React.ReactNode} [children] - Additional content
 * @param {"default"|"small"} [size="default"] - Size variant
 */
export default function Alert({
  title,
  message,
  type,
  icon = true,
  children,
  size = "default",
}) {
  let iconElement;
  let bgColor;
  let textColor;
  let sizeClass;

  switch (type) {
    case "info":
      iconElement = (
        <InformationCircleIcon className="flex-shrink-0 inline w-5 h-5" />
      );
      bgColor = "bg-blue-50 dark:bg-blue-800";
      textColor = "text-blue-800 dark:text-blue-300";
      break;
    case "warning":
      iconElement = (
        <ExclamationCircleIcon className="flex-shrink-0 inline w-5 h-5" />
      );
      bgColor = "bg-yellow-50 dark:bg-yellow-800";
      textColor = "text-yellow-800 dark:text-yellow-300";
      break;
    case "success":
      iconElement = (
        <CheckCircleIcon className="flex-shrink-0 inline w-5 h-5" />
      );
      bgColor = "bg-green-50 dark:bg-green-800";
      textColor = "text-green-800 dark:text-green-300";
      break;
    case "error":
      iconElement = (
        <ExclamationCircleIcon className="flex-shrink-0 inline w-5 h-5" />
      );
      bgColor = "bg-red-50 dark:bg-red-800";
      textColor = "text-red-800 dark:text-red-300";
      break;
    default:
      iconElement = (
        <InformationCircleIcon className="flex-shrink-0 inline w-5 h-5" />
      );
      bgColor = "bg-grey-50 dark:bg-grey-800";
      textColor = "text-grey-800 dark:text-grey-300";
  }

  sizeClass = size === "small" ? "p-3 text-xs gap-x-2" : "p-4 gap-x-3 text-sm";

  return (
    <div
      id="core"
      className={`flex items-start rounded-lg ${bgColor} ${textColor} ${sizeClass}`}
      role="alert"
    >
      {icon && iconElement}
      <div className="leading-5">
        {title && <h3 className={`font-medium ${textColor} mb-1`}>{title}</h3>}
        {message}
        {children}
      </div>
    </div>
  );
}
