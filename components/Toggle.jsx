import { Fragment, useMemo } from "react";
import { Switch } from "@headlessui/react";
import { cx } from "../utils/cx";

/**
 * Toggle - On/off switch component
 *
 * Uses Headless UI Switch for accessibility.
 * Supports multiple sizes.
 *
 * @param {boolean} isOn - Current toggle state
 * @param {boolean} [disabled=false] - Whether the toggle is disabled
 * @param {function} onChange - Callback when state changes (receives boolean)
 * @param {"sm"|"md"} [size="md"] - Size variant
 */

const SIZE_MAP = {
  sm: {
    buttonWidth: "w-8",
    buttonHeight: "h-4",
    circleDiameter: "h-3 w-3",
    translateXWhenChecked: "translate-x-4",
  },
  md: {
    buttonWidth: "w-11",
    buttonHeight: "h-6",
    circleDiameter: "h-4 w-4",
    translateXWhenChecked: "translate-x-6",
  },
};

export default function Toggle({
  isOn,
  disabled = false,
  onChange,
  size = "md",
}) {
  const { buttonWidth, buttonHeight, circleDiameter, translateXWhenChecked } =
    SIZE_MAP[size];

  const dotTranslate = useMemo(() => {
    return isOn ? translateXWhenChecked : "translate-x-1";
  }, [isOn, translateXWhenChecked]);

  return (
    <Switch checked={isOn} onChange={onChange} as={Fragment}>
      {({ checked }) => (
        <button
          className={cx(
            "relative inline-flex items-center",
            buttonWidth,
            buttonHeight,
            "rounded-full",
            checked ? "bg-body-text" : "bg-grey-400",
            disabled && "opacity-30"
          )}
          disabled={disabled}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={cx(
              "inline-block",
              dotTranslate,
              circleDiameter,
              "transform rounded-full bg-white transition"
            )}
          />
        </button>
      )}
    </Switch>
  );
}
