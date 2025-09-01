import type { ReactNode } from 'react'

/**
 * Opacity component equivalent to Flutter's Opacity widget.
 * Makes its child partially transparent.
 *
 * @example
 * ```tsx
 * <Opacity opacity={0.5}>
 *   <div>Semi-transparent content</div>
 * </Opacity>
 * ```
 */
export interface OpacityProps {
  /** Child content to make transparent */
  children?: ReactNode

  /** The opacity value (0.0 to 1.0) */
  opacity: number

  /** Whether the widget should always maintain its size */
  alwaysIncludeSemantics?: boolean

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

function Opacity({
  children,
  opacity,
  alwaysIncludeSemantics = false,
  className = '',
  style = {},
}: OpacityProps) {
  // Clamp opacity value between 0 and 1
  const clampedOpacity = Math.max(0, Math.min(1, opacity))

  // Determine if content should be visible to screen readers
  const shouldIncludeSemantics = alwaysIncludeSemantics || clampedOpacity > 0

  const containerStyle: React.CSSProperties = {
    opacity: clampedOpacity,
    // Maintain layout space even when opacity is 0
    visibility: shouldIncludeSemantics ? 'visible' : 'hidden',
    ...style,
  }

  return (
    <div className={className} style={containerStyle} aria-hidden={!shouldIncludeSemantics}>
      {children}
    </div>
  )
}

export default Opacity
