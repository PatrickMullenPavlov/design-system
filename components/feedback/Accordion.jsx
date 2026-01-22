"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { cx } from "../../utils/cx";

/**
 * Accordion - Expandable disclosure panel
 *
 * @param {string} [number] - Optional step number badge
 * @param {string} title - Accordion header title
 * @param {boolean} [defaultOpen=false] - Whether panel is open initially
 * @param {React.ReactNode} children - Accordion content
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Accordion number="1" title="Getting Started" defaultOpen>
 *   <p>Step one content goes here...</p>
 * </Accordion>
 */
export default function Accordion({
  number,
  title,
  defaultOpen = false,
  children,
  className = "",
}) {
  return (
    <Disclosure
      as="div"
      defaultOpen={defaultOpen}
      className={cx("px-6 pt-6 last:pb-6", className)}
    >
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className="flex w-full items-start text-left text-body-text">
              {number && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-body-text font-semibold text-white text-xs">
                  {number}
                </span>
              )}
              <span className={cx("grow text-base font-semibold", number && "pl-4")}>
                {title}
              </span>
              <span className="ml-6 flex h-6 items-center">
                {open ? (
                  <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className={cx("mt-2 pr-12", number && "pl-10")}>
            <div className="mb-4 mt-4 text-base text-body-text-lighter font-light">
              {children}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

/**
 * AccordionGroup - Container for multiple accordions
 *
 * @param {React.ReactNode} children - Accordion components
 * @param {string} [className] - Additional classes
 */
export function AccordionGroup({ children, className = "" }) {
  return (
    <dl className={cx("bg-trig-bg-lighter rounded-lg divide-y divide-rule-color", className)}>
      {children}
    </dl>
  );
}
