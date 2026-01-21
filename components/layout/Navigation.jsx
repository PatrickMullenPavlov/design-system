import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { cx } from "../../utils/cx";

/**
 * Navigation - Responsive header navigation with dropdowns
 *
 * @param {Array} navigation - Navigation items array
 * @param {string} navigation[].title - Display title for the nav item
 * @param {string} [navigation[].url] - Direct URL (for single-page items)
 * @param {Array} [navigation[].pages] - Nested pages for dropdown menus
 * @param {string} navigation[].pages[].title - Page title
 * @param {string} navigation[].pages[].url - Page URL
 * @param {string} [navigation[].pages[].description] - Optional description
 * @param {React.ReactNode} [navigation[].pages[].icon] - Optional icon component
 * @param {string} [currentPath] - Current page path for active state
 * @param {React.ReactNode} [logo] - Logo component to display
 * @param {string} [logoHref="/"] - Logo link destination
 * @param {React.ReactNode} [actions] - Right-side action buttons
 * @param {Function} [onNavigate] - Callback when navigation occurs
 * @param {Function} [LinkComponent="a"] - Custom link component (e.g., Next.js Link)
 *
 * @example
 * const navigation = [
 *   { title: "Home", url: "/" },
 *   {
 *     title: "Products",
 *     pages: [
 *       { title: "Onboarding", url: "/products/onboarding", description: "Get users started" },
 *       { title: "Retention", url: "/products/retention", description: "Keep users engaged" },
 *     ]
 *   },
 *   { title: "Blog", url: "/blog" },
 * ];
 *
 * <Navigation
 *   navigation={navigation}
 *   currentPath="/products/onboarding"
 *   logo={<TrigLogoBlack className="h-8" />}
 *   actions={
 *     <>
 *       <SecondaryButton label="Sign In" />
 *       <PrimaryButton label="Book a Demo" />
 *     </>
 *   }
 * />
 */
const Navigation = ({
  navigation = [],
  currentPath = "",
  logo,
  logoHref = "/",
  actions,
  onNavigate,
  LinkComponent = "a",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigationClick = (title, url) => {
    if (onNavigate) {
      onNavigate({ title, url });
    }
  };

  // Function to check if a link is active
  const isActive = (url) => currentPath === url;

  // Function to get grid columns class based on number of pages
  const getGridColsClass = (pageCount) => {
    if (pageCount === 2) return "grid-cols-2";
    if (pageCount === 3 || pageCount === 6) return "grid-cols-3";
    if (pageCount === 4) return "grid-cols-4";
    return "grid-cols-3";
  };

  // Wrapper for links to support custom Link components
  const NavLink = ({ href, children, className, onClick, ...props }) => {
    if (LinkComponent === "a") {
      return (
        <a href={href} className={className} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }
    return (
      <LinkComponent href={href} className={className} onClick={onClick} {...props}>
        {children}
      </LinkComponent>
    );
  };

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-40 h-20 transition-all bg-trig-bg/90",
          scrolled && "shadow-sm"
        )}
      >
        <div className="px-4 md:px-8 2xl:mx-auto max-w-screen-2xl h-full">
          <nav
            className="flex flex-row items-center justify-between h-full"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="flex flex-shrink-0 justify-self-start h-full items-center md:w-1/6 flex-1 md:flex-none">
              <NavLink href={logoHref} className="ml-0">
                <div className="h-8 ml-0">{logo}</div>
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex lg:flex-1 items-center">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center rounded-md p-2.5 text-body-text"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <Bars3Icon
                    className="h-10 w-10 p-2.5 bg-trig-bg-lighter rounded-full"
                    aria-hidden="true"
                  />
                ) : (
                  <XMarkIcon
                    className="h-10 w-10 p-2.5 bg-trig-bg-lighter rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <Popover.Group className="hidden lg:flex items-center font-normal text-[13px] gap-1 h-12 p-0.5 bg-trig-bg-lighter border border-white rounded-full xl:w-4/6 w-1/2">
              {navigation.map((navItem) => (
                <Fragment key={navItem.title}>
                  {navItem.pages && navItem.pages.length > 1 ? (
                    <Popover className="h-full">
                      {({ open, close }) => (
                        <div className="flex items-center h-full">
                          <Popover.Button
                            className={cx(
                              "group flex items-center pl-5 pr-2.5 py-2.5 hover:bg-trig-bg-dark text-body-text-light hover:text-body-text text-[13px] rounded-full text-center transition-colors focus:outline-none",
                              open && "bg-trig-bg-dark shadow-sm"
                            )}
                          >
                            <span>{navItem.title}</span>
                            <ChevronDownIcon
                              className="ml-2 h-5 w-5 mt-.5 flex items-center text-body-text-light group-hover:text-body-text transition-colors"
                              aria-hidden="true"
                            />
                          </Popover.Button>
                          {navItem.pages.length > 0 && (
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                className="absolute w-full top-20 left-0 bg-body-text/5 backdrop-blur-sm h-screen bg-fixed"
                                onClick={() => close()}
                              >
                                <div className="mx-auto max-w-screen-2xl">
                                  <div
                                    className={cx(
                                      "px-4 pb-4 grid gap-4 rounded-b-xl bg-trig-bg",
                                      getGridColsClass(navItem.pages.length)
                                    )}
                                  >
                                    {navItem.pages.map((page, index) => (
                                      <div
                                        key={page.url}
                                        className="group relative flex flex-col w-full h-full rounded-md leading-5 bg-trig-bg-lighter border border-white hover:bg-trig-bg-dark hover:shadow-sm transition-colors cursor-pointer aspect-video p-4"
                                      >
                                        <div className="text-xs mb-2 text-body-text-lighter">
                                          0{index + 1}
                                        </div>

                                        {page.icon && (
                                          <div className="flex flex-grow min-h-0 w-full items-center justify-center rounded-lg overflow-hidden py-2">
                                            <div className="h-full w-auto flex-1">
                                              {page.icon}
                                            </div>
                                          </div>
                                        )}

                                        <div className="mt-auto pt-2">
                                          <NavLink
                                            href={page.url}
                                            className="block font-semibold text-body-text"
                                            onClick={() => {
                                              handleNavigationClick(page.title, page.url);
                                              close();
                                            }}
                                          >
                                            {page.title}
                                            <span className="absolute inset-0" />
                                          </NavLink>
                                          {page.description && (
                                            <p className="text-body-text-light font-light">
                                              {page.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          )}
                        </div>
                      )}
                    </Popover>
                  ) : (
                    <NavLink
                      href={navItem.url || (navItem.pages && navItem.pages[0]?.url)}
                      className={cx(
                        "flex items-stretch text-body-text-light hover:bg-trig-bg-dark hover:shadow-sm hover:text-body-text font-normal text-[13px] rounded-full px-5 py-2.5 text-center transition-colors",
                        isActive(navItem.url) && "bg-trig-bg-dark text-body-text"
                      )}
                      onClick={() =>
                        handleNavigationClick(
                          navItem.title,
                          navItem.url || navItem.pages?.[0]?.url
                        )
                      }
                    >
                      {navItem.title}
                    </NavLink>
                  )}
                </Fragment>
              ))}
            </Popover.Group>

            {/* Action Buttons */}
            {actions && (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2 w-2/6">
                {actions}
              </div>
            )}
          </nav>

          {/* Mobile Menu */}
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed" />

            <Dialog.Panel className="fixed inset-y-0 top-20 z-50 flex w-full flex-col overflow-y-auto bg-trig-bg bg-opacity-90 backdrop-blur-md font-sans text-md tracking-wide">
              <div className="p-4">
                <div className="flow-root">
                  <div className="divide-y divide-gray-500/10">
                    <div className="pb-4">
                      {navigation.map((navItem) => (
                        <Fragment key={navItem.title}>
                          {navItem.pages && navItem.pages.length > 1 ? (
                            <div className="relative">
                              <div className="flex items-stretch text-body-text-lighter tracking-wide font-light text-xs uppercase px-3 pt-5 pb-0">
                                <span>{navItem.title}</span>
                              </div>
                              <div className="p-3 flex flex-col">
                                {navItem.pages.map((page) => (
                                  <div
                                    key={page.url}
                                    className="group flex w-full px-4 py-3 leading-5 hover:bg-trig-bg-dark transition-colors rounded-md"
                                  >
                                    <div className="flex-auto">
                                      <NavLink
                                        href={page.url}
                                        className="block text-body-text"
                                        onClick={() => {
                                          handleNavigationClick(page.title, page.url);
                                          setMobileMenuOpen(false);
                                        }}
                                      >
                                        {page.title}
                                      </NavLink>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <NavLink
                              href={navItem.url || navItem.pages?.[0]?.url}
                              className={cx(
                                "flex items-stretch text-body-text hover:bg-trig-bg-dark p-3 transition-colors rounded-md",
                                isActive(navItem.url) && "bg-trig-bg-dark"
                              )}
                              onClick={() => {
                                handleNavigationClick(
                                  navItem.title,
                                  navItem.url || navItem.pages?.[0]?.url
                                );
                                setMobileMenuOpen(false);
                              }}
                            >
                              {navItem.title}
                            </NavLink>
                          )}
                        </Fragment>
                      ))}
                    </div>

                    {/* Mobile Actions */}
                    {actions && (
                      <div className="py-6 font-sans flex flex-col gap-2">
                        {actions}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default Navigation;
