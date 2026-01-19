import React from "react";
import {
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  TrashIcon,
  PencilIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import { cx } from "../../utils/cx";

/**
 * IconButton - Icon-only button component
 *
 * Small circular button with an icon. Used for inline actions
 * like edit, delete, copy, etc.
 *
 * @param {function} [onClick] - Click handler
 * @param {string} icon - Icon name from the available set
 * @param {"plain"|"destructive"|"confirm"} [variant="plain"] - Visual style variant
 * @param {boolean} [isDisabled=false] - Whether the button is disabled
 * @param {"button"|"submit"|"reset"} [type="button"] - HTML button type
 */

export const iconMap = {
  check: CheckIcon,
  xMark: XMarkIcon,
  pencil: PencilIcon,
  plus: PlusIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
  clipboard: ClipboardIcon,
  trash: TrashIcon,
  cog: Cog6ToothIcon,
  bookmark: BookmarkIcon,
  ellipsis: EllipsisHorizontalCircleIcon,
  arrowRight: ArrowRightIcon,
};

export default function IconButton({
  icon,
  onClick,
  variant = "plain",
  isDisabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
      className={cx(
        "ml-2 bg-slate-10 w-8 h-8 flex items-center justify-center rounded-full animate hover:bg-blue-10 hover:text-active-blue cursor-pointer",
        variant === "confirm" && "hover:bg-green-10 hover:text-green",
        variant === "destructive" && "hover:bg-red-10 hover:text-red"
      )}
    >
      {React.createElement(iconMap[icon], {
        className: `inline-block ${icon === "pencil" ? "w-4" : "w-5"}`,
      })}
    </button>
  );
}
