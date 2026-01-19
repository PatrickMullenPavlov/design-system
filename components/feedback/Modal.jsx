import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Modal - Dialog overlay component
 *
 * Renders a modal dialog using React portals.
 * Includes header with title, close button, and content area.
 *
 * @param {function} close - Callback to close the modal
 * @param {string} title - Modal title
 * @param {"default"|"large"|"xlarge"} [size="default"] - Size variant
 * @param {React.ComponentType} [icon] - Icon component to display next to title
 * @param {React.ReactNode} children - Modal content
 */
export default function Modal({
  close,
  title,
  size = "default",
  icon: IconComponent,
  children,
}) {
  const modalContents = useRef(null);

  const onBgClick = useCallback(
    (e) => {
      if (!modalContents.current.contains(e.target)) {
        close();
      }
    },
    [close]
  );

  const sizeClasses =
    size === "xlarge"
      ? "max-w-4xl"
      : size === "large"
        ? "max-w-lg"
        : "max-w-md";

  return createPortal(
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] grid max-h-full w-full place-items-center overflow-y-auto overflow-x-hidden rounded-lg md:inset-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      onClick={onBgClick}
    >
      <div
        className={`relative max-h-full w-full ${sizeClasses}`}
        ref={modalContents}
      >
        <div className="relative rounded-lg bg-white shadow-sm">
          <div className="border-b border-rule-color px-8 py-5">
            <div className="flex items-center gap-3">
              {IconComponent && (
                <div className="flex items-center w-6 h-6">
                  <IconComponent className="w-6 h-6 flex-shrink-0" />
                </div>
              )}
              <span className="text-sm font-bold tracking-tight text-body-text dark:text-white">
                {title}
              </span>
            </div>
            <button
              type="button"
              className="absolute right-5 top-4 bottom-4 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-sm text-body-text bg-grey-10 hover:text-active-blue hover:bg-blue-10 animate cursor-pointer"
              data-modal-hide="event-modal"
              onClick={close}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-8 pt-6 pb-8">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
