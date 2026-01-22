/**
 * Tag - Small uppercase label component
 *
 * Used for categorization, section labels, and metadata display.
 * Typically appears above headings in SectionHeader.
 *
 * @param {string} label - Text content of the tag
 * @param {string} [url] - Optional link URL
 * @param {"default"|"white"} [tagColor="default"] - Color variant
 */
export default function Tag({ label, url, tagColor = "default" }) {
  const styles = {
    default: "text-body-text hover:text-yellow",
    white: "text-white",
  };

  const className = `my-auto inline-block text-xs uppercase tracking-wide font-light transition-colors ${styles[tagColor]}`;

  return (
    <div className={className}>
      {url ? (
        <a href={url}>{label}</a>
      ) : (
        label
      )}
    </div>
  );
}
