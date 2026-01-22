import { cx } from "../../utils/cx";

/**
 * BreadcrumbsList - Simple breadcrumb navigation
 *
 * @param {Array} crumbs - Array of breadcrumb items
 * @param {string} crumbs[].label - Breadcrumb text
 * @param {string} [crumbs[].link] - Optional URL
 * @param {React.ComponentType} [LinkComponent] - Custom link component (e.g., Next.js Link)
 * @param {string} [className] - Additional classes
 *
 * @example
 * <BreadcrumbsList
 *   crumbs={[
 *     { label: "Home", link: "/" },
 *     { label: "Products", link: "/products" },
 *     { label: "Current Page" }
 *   ]}
 * />
 */
export function BreadcrumbsList({
  crumbs,
  LinkComponent = "a",
  className = "",
}) {
  const Link = LinkComponent;

  return (
    <ol className={cx("flex items-center", className)}>
      {crumbs.map((crumb, index) => (
        <li key={index} className="flex items-center">
          {crumb.link ? (
            <Link
              href={crumb.link}
              to={crumb.link}
              className="hover:text-blue-800 transition-colors font-semibold"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-body-text-lighter">{crumb.label}</span>
          )}
          {index !== crumbs.length - 1 && (
            <span className="mx-1.5 text-body-text-lightest">/</span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Breadcrumbs - Full breadcrumb navigation with icon
 *
 * @param {Array} crumbs - Array of breadcrumb items
 * @param {React.ReactNode} icon - Icon to display before breadcrumbs
 * @param {React.ComponentType} [LinkComponent] - Custom link component
 * @param {string} [className] - Additional classes
 *
 * @example
 * <Breadcrumbs
 *   icon={<HomeIcon className="h-5 w-5" />}
 *   crumbs={[
 *     { label: "Dashboard", link: "/dashboard" },
 *     { label: "Settings" }
 *   ]}
 * />
 */
export default function Breadcrumbs({
  crumbs,
  icon,
  LinkComponent = "a",
  className = "",
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(
        "flex items-center border-b border-rule-color",
        className
      )}
    >
      <div className="p-6 py-3 flex items-center text-sm leading-5 text-body-text">
        {icon && (
          <div className="mr-2 h-7 w-7 rounded-md bg-trig-bg-light flex items-center justify-center">
            <div className="w-5 h-5">{icon}</div>
          </div>
        )}
        <BreadcrumbsList crumbs={crumbs} LinkComponent={LinkComponent} />
      </div>
    </nav>
  );
}

/**
 * BreadcrumbsCompact - Compact breadcrumbs with optional right accessory
 *
 * @param {Array} crumbs - Array of breadcrumb items
 * @param {React.ReactNode} [icon] - Icon to display before breadcrumbs
 * @param {React.ReactNode} [rightAccessory] - Content on the right side
 * @param {React.ComponentType} [LinkComponent] - Custom link component
 * @param {string} [className] - Additional classes
 */
export function BreadcrumbsCompact({
  crumbs,
  icon,
  rightAccessory,
  LinkComponent = "a",
  className = "",
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(
        "flex flex-row justify-between h-[52px] bg-white items-center py-2 px-4",
        className
      )}
    >
      <div className="flex items-center text-sm text-body-text">
        {icon && (
          <div className="mr-2 h-6 w-6 flex items-center justify-center">
            {icon}
          </div>
        )}
        <BreadcrumbsList crumbs={crumbs} LinkComponent={LinkComponent} />
      </div>
      {rightAccessory && <div className="ml-auto">{rightAccessory}</div>}
    </nav>
  );
}
