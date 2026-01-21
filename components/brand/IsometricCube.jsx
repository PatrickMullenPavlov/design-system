import { cx } from "../../utils/cx";

/**
 * IsometricCube - The atomic visual unit of Trig's brand
 *
 * A line-drawn isometric cube that can be used standalone or combined
 * into patterns. Use sparingly - for logos, hero illustrations, diagrams.
 * NOT required in all designs.
 *
 * @param {string} [size="md"] - Cube size: "sm" (24px) | "md" (48px) | "lg" (96px)
 * @param {string} [variant="wireframe"] - Style: "wireframe" | "filled" | "hatched"
 * @param {string} [strokeColor="currentColor"] - Stroke color (uses currentColor by default)
 * @param {string} [fillColor="transparent"] - Fill color for filled variant
 * @param {number} [strokeWidth=1] - Stroke width in pixels
 * @param {string} [className=""] - Additional CSS classes
 */
export default function IsometricCube({
  size = "md",
  variant = "wireframe",
  strokeColor = "currentColor",
  fillColor = "transparent",
  strokeWidth = 1,
  className = "",
}) {
  const sizes = {
    sm: 24,
    md: 48,
    lg: 96,
  };

  const sizeValue = sizes[size] || sizes.md;

  // Isometric cube vertices (30° angles)
  // Top face
  const top = {
    center: { x: 50, y: 13.4 },
    left: { x: 6.7, y: 38.4 },
    right: { x: 93.3, y: 38.4 },
    bottom: { x: 50, y: 63.4 },
  };

  // Bottom point
  const bottom = { x: 50, y: 88.4 };

  // Face paths
  const topFace = `M${top.center.x},${top.center.y} L${top.right.x},${top.right.y} L${top.bottom.x},${top.bottom.y} L${top.left.x},${top.left.y} Z`;
  const leftFace = `M${top.left.x},${top.left.y} L${top.bottom.x},${top.bottom.y} L${bottom.x},${bottom.y} L${6.7},${63.4} Z`;
  const rightFace = `M${top.right.x},${top.right.y} L${93.3},${63.4} L${bottom.x},${bottom.y} L${top.bottom.x},${top.bottom.y} Z`;

  // Hatching pattern for hatched variant
  const hatchId = `hatch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("inline-block", className)}
    >
      {variant === "hatched" && (
        <defs>
          <pattern
            id={hatchId}
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke={strokeColor}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
      )}

      {/* Top face */}
      <path
        d={topFace}
        fill={variant === "hatched" ? `url(#${hatchId})` : variant === "filled" ? fillColor : "transparent"}
        fillOpacity={variant === "filled" ? 0.1 : 1}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left face */}
      <path
        d={leftFace}
        fill={variant === "hatched" ? `url(#${hatchId})` : variant === "filled" ? fillColor : "transparent"}
        fillOpacity={variant === "filled" ? 0.2 : 1}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right face */}
      <path
        d={rightFace}
        fill={variant === "hatched" ? `url(#${hatchId})` : variant === "filled" ? fillColor : "transparent"}
        fillOpacity={variant === "filled" ? 0.15 : 1}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
