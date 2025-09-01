/**
 * SizedBox component equivalent to Flutter's SizedBox widget.
 * Creates a box with specific width and/or height dimensions.
 *
 * @example
 * ```tsx
 * // Fixed size box
 * <SizedBox width={100} height={50} />
 *
 * // Width only
 * <SizedBox width="100%" />
 *
 * // Height only
 * <SizedBox height={20} />
 *
 * // Using string values
 * <SizedBox width="200px" height="10rem" />
 * ```
 */
export interface SizedBoxProps {
  /** Width of the box - number is treated as pixels, string passed directly to CSS */
  width?: number | string
  /** Height of the box - number is treated as pixels, string passed directly to CSS */
  height?: number | string
}

function SizedBox({ width, height }: SizedBoxProps) {
  const style: React.CSSProperties = {}
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }
  return <div style={style} />
}

export default SizedBox
