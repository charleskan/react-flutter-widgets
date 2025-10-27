import type { CSSProperties, ReactElement, ReactNode } from 'react'
import { useMemo } from 'react'
import { TextDirection } from '../../utils/Alignment'

/**
 * Properties for the Positioned component.
 * Equivalent to Flutter's Positioned widget properties.
 */
export interface PositionedProps {
  /** The distance that the child's left edge is inset from the left of the stack */
  left?: number | string
  /** The distance that the child's top edge is inset from the top of the stack */
  top?: number | string
  /** The distance that the child's right edge is inset from the right of the stack */
  right?: number | string
  /** The distance that the child's bottom edge is inset from the bottom of the stack */
  bottom?: number | string
  /** The child's width (cannot be used with both left and right) */
  width?: number | string
  /** The child's height (cannot be used with both top and bottom) */
  height?: number | string
  /** The child widget */
  child?: ReactNode
  /** React-style children prop (alternative to child) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

/**
 * Properties for Positioned.directional
 */
export interface PositionedDirectionalProps {
  /** The distance from the start edge */
  start?: number | string
  /** The distance that the child's top edge is inset from the top of the stack */
  top?: number | string
  /** The distance from the end edge */
  end?: number | string
  /** The distance that the child's bottom edge is inset from the bottom of the stack */
  bottom?: number | string
  /** The child's width */
  width?: number | string
  /** The child's height */
  height?: number | string
  /** Text direction for resolving start/end */
  textDirection: TextDirection
  /** The child widget */
  child?: ReactNode
  /** React-style children prop (alternative to child) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

/**
 * Properties for Positioned.fill
 */
export interface PositionedFillProps {
  /** The distance that the child's left edge is inset from the left of the stack */
  left?: number | string
  /** The distance that the child's top edge is inset from the top of the stack */
  top?: number | string
  /** The distance that the child's right edge is inset from the right of the stack */
  right?: number | string
  /** The distance that the child's bottom edge is inset from the bottom of the stack */
  bottom?: number | string
  /** The child widget */
  child?: ReactNode
  /** React-style children prop (alternative to child) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

/**
 * Convert number or string to CSS value
 */
function toCSSValue(value?: number | string): string | undefined {
  if (value === undefined || value === null) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

/**
 * A widget that controls where a child of a Stack is positioned.
 *
 * A Positioned widget must be a descendant of a Stack. If a widget is wrapped in a
 * Positioned, then it is a positioned widget in its Stack. If the top property is
 * non-null, the top edge of this child will be positioned that many units from the
 * top of the stack. The right, bottom, and left properties work analogously.
 *
 * If both the top and bottom properties are non-null, then the child will be forced
 * to have exactly the height required to satisfy both constraints. Similarly, setting
 * the right and left properties to non-null values will force the child to have a
 * particular width.
 *
 * @example
 * ```tsx
 * // Basic positioned child
 * <Stack>
 *   <Positioned
 *     top={10}
 *     left={20}
 *   >
 *     <Container width={100} height={100} color="blue" />
 *   </Positioned>
 * </Stack>
 *
 * // Stretch child to fill area
 * <Stack>
 *   <Positioned
 *     top={0}
 *     left={0}
 *     right={0}
 *     bottom={0}
 *   >
 *     <Container color="rgba(0,0,0,0.5)" />
 *   </Positioned>
 * </Stack>
 *
 * // Position with width and height
 * <Stack>
 *   <Positioned
 *     top={10}
 *     right={10}
 *     width={100}
 *     height={50}
 *   >
 *     <Text>Top Right</Text>
 *   </Positioned>
 * </Stack>
 * ```
 */
export function Positioned({
  left,
  top,
  right,
  bottom,
  width,
  height,
  child,
  children,
  className,
  style,
}: PositionedProps): ReactElement {
  const content = child ?? children

  const positionedStyle = useMemo((): CSSProperties => {
    const styles: CSSProperties = {
      position: 'absolute',
    }

    // Apply positioning
    if (left !== undefined) styles.left = toCSSValue(left)
    if (top !== undefined) styles.top = toCSSValue(top)
    if (right !== undefined) styles.right = toCSSValue(right)
    if (bottom !== undefined) styles.bottom = toCSSValue(bottom)

    // Apply sizing
    if (width !== undefined) styles.width = toCSSValue(width)
    if (height !== undefined) styles.height = toCSSValue(height)

    return styles
  }, [left, top, right, bottom, width, height])

  const combinedStyle = useMemo(
    () => ({
      ...positionedStyle,
      ...style,
    }),
    [positionedStyle, style],
  )

  return (
    <div className={className} style={combinedStyle}>
      {content}
    </div>
  )
}

/**
 * Creates a Positioned object with left, top, right, and bottom set to 0.0 unless
 * a value for them is passed.
 *
 * @example
 * ```tsx
 * <Stack>
 *   <Positioned.fill>
 *     <Container color="rgba(0,0,0,0.3)" />
 *   </Positioned.fill>
 * </Stack>
 *
 * // With custom insets
 * <Stack>
 *   <Positioned.fill left={10} right={10}>
 *     <Container color="blue" />
 *   </Positioned.fill>
 * </Stack>
 * ```
 */
Positioned.fill = function PositionedFill({
  left = 0,
  top = 0,
  right = 0,
  bottom = 0,
  child,
  children,
  className,
  style,
}: PositionedFillProps): ReactElement {
  const content = child ?? children
  return (
    <Positioned
      left={left}
      top={top}
      right={right}
      bottom={bottom}
      className={className}
      style={style}
    >
      {content}
    </Positioned>
  )
}

/**
 * Creates a widget that controls where a child of a Stack is positioned, with
 * text direction awareness.
 *
 * This constructor is useful when you want to position a child according to the
 * reading direction (left-to-right or right-to-left).
 *
 * @example
 * ```tsx
 * <Stack>
 *   <Positioned.directional
 *     textDirection={TextDirection.ltr}
 *     start={10}
 *     top={10}
 *   >
 *     <Text>Start aligned</Text>
 *   </Positioned.directional>
 * </Stack>
 * ```
 */
Positioned.directional = function PositionedDirectional({
  start,
  top,
  end,
  bottom,
  width,
  height,
  textDirection,
  child,
  children,
  className,
  style,
}: PositionedDirectionalProps): ReactElement {
  // Resolve start/end based on text direction
  const left = textDirection === TextDirection.ltr ? start : end
  const right = textDirection === TextDirection.ltr ? end : start
  const content = child ?? children

  return (
    <Positioned
      left={left}
      top={top}
      right={right}
      bottom={bottom}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      {content}
    </Positioned>
  )
}

// Set displayName for debugging
Positioned.displayName = 'Positioned'
// TypeScript workaround for function properties
Object.defineProperty(Positioned.fill, 'displayName', { value: 'Positioned.fill' })
Object.defineProperty(Positioned.directional, 'displayName', {
  value: 'Positioned.directional',
})

export default Positioned
