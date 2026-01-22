"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { cx } from "../../utils/cx";

const WIDTH_MAP = {
  sm: "320px",
  md: "640px",
  lg: "960px",
};

function isEventInElement(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX;
  const y = event.clientY;
  if (x < rect.left || x >= rect.right) return false;
  if (y < rect.top || y >= rect.bottom) return false;
  return true;
}

/**
 * Drawer - Slide-out panel from the right side
 *
 * @param {"sm"|"md"|"lg"} [size="lg"] - Drawer width
 * @param {function} close - Close handler
 * @param {React.ReactNode} children - Drawer content
 * @param {string} [className] - Additional classes
 *
 * @example
 * {isOpen && (
 *   <Drawer size="md" close={() => setIsOpen(false)}>
 *     <div className="p-6">Drawer content</div>
 *   </Drawer>
 * )}
 */
export default function Drawer({
  size = "lg",
  close,
  children,
  className = "",
}) {
  const drawerContents = useRef(null);

  const onBgClick = useCallback(
    (e) => {
      if (drawerContents.current && !isEventInElement(e, drawerContents.current)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("mouseup", onBgClick);
    return () => {
      document.removeEventListener("mouseup", onBgClick);
    };
  }, [onBgClick]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [close]);

  const width = WIDTH_MAP[size];

  // Only render portal on client
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-[199]" />

      {/* Drawer panel */}
      <div
        ref={drawerContents}
        className={cx(
          "fixed h-[100vh] top-0 bottom-0 right-0 z-[200] overflow-y-auto overscroll-none pb-[360px] shadow-[-8px_0_8px_-4px_rgba(0,0,0,0.050)] bg-white",
          className
        )}
        style={{ width }}
      >
        <div className="absolute flex items-center text-center top-6 right-6 text-body-text bg-trig-bg hover:bg-blue-10 hover:text-blue-800 rounded-full p-1 transition-colors">
          <button onClick={close} aria-label="Close drawer">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.body
  );
}
