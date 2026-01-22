"use client";

import { cx } from "../../utils/cx";

/**
 * TabNavigation - Pill-style tab navigation
 *
 * @param {Array} tabs - Array of tab items
 * @param {string} tabs[].label - Tab label text
 * @param {function} [tabs[].action] - Click handler
 * @param {boolean} tabs[].isActive - Whether tab is active
 * @param {string} [className] - Additional classes
 *
 * @example
 * <TabNavigation
 *   tabs={[
 *     { label: "Overview", isActive: true, action: () => setTab("overview") },
 *     { label: "Analytics", isActive: false, action: () => setTab("analytics") },
 *     { label: "Settings", isActive: false, action: () => setTab("settings") },
 *   ]}
 * />
 */
export default function TabNavigation({ tabs, className = "" }) {
  return (
    <div className={cx("mx-8", className)}>
      <TabNavigationWrapper>
        {tabs.map((t) => (
          <TabPill key={t.label} {...t} />
        ))}
      </TabNavigationWrapper>
    </div>
  );
}

/**
 * TabNavigationWrapper - Container for tab pills
 */
export function TabNavigationWrapper({ children, className = "" }) {
  return (
    <div className={cx("flex rounded-full bg-trig-bg p-1 py-1.5 text-xs mb-6", className)}>
      {children}
    </div>
  );
}

/**
 * TabPill - Individual tab button
 *
 * @param {string} label - Tab text
 * @param {function} [action] - Click handler
 * @param {boolean} isActive - Whether tab is active
 */
export function TabPill({ label, action, isActive }) {
  return (
    <button
      className={cx(
        "rounded-full px-4 py-2 ml-1 transition-colors",
        isActive
          ? "bg-white font-medium shadow-sm"
          : "cursor-pointer hover:bg-white/50"
      )}
      onClick={() => action?.()}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
