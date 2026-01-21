"use client";

import { useState, useRef, useEffect } from "react";
import Container from "../layout/Container";
import SectionHeader from "../layout/SectionHeader";
import CTAButton from "../buttons/CTAButton";
import Card from "../Card";
import { cx } from "../../utils/cx";

/**
 * TabbedFeatures - Tabbed content section for features
 *
 * A section with tab navigation that switches between different feature
 * content panels. Each tab shows a title, description, and image.
 *
 * @param {string} title - Section title
 * @param {React.ReactNode} description - Section description
 * @param {string} [tag] - Optional tag above title
 * @param {string} [tagUrl] - Tag link URL
 * @param {Array} tabs - Array of tab items
 * @param {string} tabs[].title - Tab button label
 * @param {string} tabs[].contentTitle - Content panel title
 * @param {React.ReactNode} tabs[].description - Content description
 * @param {string} [tabs[].imageUrl] - Content image URL
 * @param {string} [tabs[].href] - Optional CTA link
 * @param {Object} [cta] - Section-level CTA
 * @param {string} [className] - Additional classes
 *
 * @example
 * <TabbedFeatures
 *   tag="Solutions"
 *   title="Choose Your Path"
 *   description="Multiple ways to engage customers"
 *   tabs={[
 *     { title: "Onboarding", contentTitle: "User Onboarding", description: "...", imageUrl: "/onboarding.png" },
 *     { title: "Retention", contentTitle: "Customer Retention", description: "...", imageUrl: "/retention.png" },
 *   ]}
 * />
 */
export default function TabbedFeatures({
  title,
  description,
  tag,
  tagUrl,
  tabs = [],
  cta,
  className = "",
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    contentRefs.current = tabs.map((_, i) => contentRefs.current[i] || { current: null });
  }, [tabs.length]);

  // Update content height
  const updateContentHeight = () => {
    const activeContent = contentRefs.current[activeTab]?.current;
    if (activeContent) {
      setContentHeight(activeContent.offsetHeight);
    }
  };

  useEffect(() => {
    updateContentHeight();
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => updateContentHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  const handleTabChange = (index) => {
    if (index === activeTab || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  return (
    <Container className={cx("bg-white text-body-text", className)}>
      {/* Header */}
      <div className="flex sm:flex-row flex-col justify-between pb-6 md:mb-6">
        <div className="flex flex-col max-w-screen-md">
          <SectionHeader
            tag={tag}
            url={tagUrl}
            title={title}
            description={description}
            size="lgLight"
            alignment="left"
          />
        </div>

        {cta && (
          <div className="mt-4 sm:mt-0">
            <CTAButton label={cta.text} href={cta.url} />
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center text-sm gap-1 p-0.5 md:p-1 bg-trig-bg rounded-full mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cx(
              "flex items-center font-light md:font-normal text-xs md:text-sm px-3 py-2 md:px-4 md:py-2.5 rounded-full text-center transition-colors focus:outline-none",
              activeTab === index
                ? "bg-white shadow-sm text-body-text"
                : "text-body-text-light hover:bg-white hover:text-body-text hover:shadow-sm",
              isTransitioning && "pointer-events-none"
            )}
            onClick={() => handleTabChange(index)}
            disabled={isTransitioning}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="flash">
        <div
          className="relative transition-all duration-300 ease-in-out overflow-hidden"
          style={{ height: contentHeight > 0 ? `${contentHeight}px` : "auto" }}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={cx(
                "absolute inset-0 w-full transition-all duration-500 ease-in-out",
                activeTab === index
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : index < activeTab
                  ? "opacity-0 -translate-x-8 pointer-events-none"
                  : "opacity-0 translate-x-8 pointer-events-none"
              )}
            >
              <div
                ref={(el) => (contentRefs.current[index] = { current: el })}
                className="flex flex-col md:flex-row gap-0 p-6 sm:p-8 lg:p-12 rounded-lg w-full"
              >
                {/* Text Content */}
                <div className="flex flex-col w-full md:w-1/2">
                  <div className="max-w-96 text-left">
                    <SectionHeader
                      title={tab.contentTitle || tab.title}
                      description={tab.description}
                      size="lgLight"
                      alignment="left"
                    />

                    {tab.href && (
                      <div className="text-left mt-4">
                        <CTAButton label="See how" href={tab.href} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Image */}
                {tab.imageUrl && (
                  <div className="flex w-full md:w-1/2 items-center justify-center overflow-hidden mt-6 md:mt-0">
                    <img
                      src={tab.imageUrl}
                      alt={tab.contentTitle || tab.title}
                      className={cx(
                        "w-full h-auto transition-opacity duration-300",
                        activeTab === index ? "opacity-100" : "opacity-0"
                      )}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
