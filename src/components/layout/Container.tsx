import type { ReactNode } from 'react'
import { Flex } from '../../types/Flex.type'
import { BoxConstraints, Decoration, Matrix4, alignmentToFlexClasses } from '../../utils'
import type {
  AlignmentGeometry,
  BoxDecoration,
  Clip,
  EdgeInsets,
  Matrix4Interface,
} from '../../utils'

export interface ContainerProps {
  /** Child content to render inside the container */
  children?: ReactNode

  // Core Flutter Container properties
  /** Align the child within the container */
  alignment?: AlignmentGeometry
  /** Empty space to inscribe inside the decoration. The child, if any, is placed inside this padding */
  padding?: EdgeInsets | string
  /** The color to paint behind the child */
  color?: string
  /** The decoration to paint behind the child */
  decoration?: BoxDecoration
  /** The decoration to paint in front of the child */
  foregroundDecoration?: BoxDecoration
  /** Fixed width of the container */
  width?: number | string
  /** Fixed height of the container */
  height?: number | string
  /** Additional constraints to apply to the child */
  constraints?: BoxConstraints
  /** Empty space to surround the decoration and child */
  margin?: EdgeInsets | string
  /** The transformation matrix to apply before painting the container */
  transform?: Matrix4Interface
  /** The alignment of the origin, relative to the size of the container, if transform is specified */
  transformAlignment?: AlignmentGeometry
  /** The clip behavior when Container.decoration is not null */
  clipBehavior?: Clip

  // Legacy properties for backward compatibility
  /** @deprecated Use decoration.color instead */
  backgroundColor?: string
  /** @deprecated Use decoration.borderRadius instead */
  borderRadius?: number | string
  /** @deprecated Use decoration.borderWidth instead */
  borderWidth?: number
  /** @deprecated Use decoration.borderColor instead */
  borderColor?: string
  /** @deprecated Use decoration.borderStyle instead */
  borderStyle?: 'solid' | 'dashed' | 'dotted'

  // Flutter flex properties (React-specific additions)
  /** Flex factor for this widget (equivalent to CSS flex-grow) */
  flex?: number
  /** Whether this widget should expand to fill available space */
  expanded?: boolean
  /** Whether this widget should be flexible in the flex layout */
  flexible?: boolean
  /** Whether this widget should not shrink */
  flexShrink?: boolean

  // CSS alignment when used as flex child
  /** Align self in cross axis when inside a flex container */
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

  // Additional CSS properties for edge cases
  /** Custom CSS class name (use sparingly) */
  className?: string
  /** Custom inline styles (use sparingly) */
  style?: React.CSSProperties
}

function resolvePaddingMargin(value?: EdgeInsets | string): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  return value.toPadding()
}

/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * // Basic usage with decoration
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   decoration={{
 *     color: "#f5f5f5",
 *     borderRadius: 8,
 *     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
 *   }}
 *   alignment={Alignment.center}
 * >
 *   <div>Content goes here</div>
 * </Container>
 *
 * // With gradient and transform
 * <Container
 *   constraints={{ minHeight: 200, maxWidth: 400 }}
 *   decoration={{
 *     gradient: new LinearGradient({
 *       begin: Alignment.topCenter,
 *       end: Alignment.bottomCenter,
 *       colors: ['rgba(0,0,0,0.2)', 'transparent'],
 *       stops: [0.0, 0.1],
 *     })
 *   }}
 *   transform={{ rotateZ: 0.1, scaleX: 1.1 }}
 *   transformAlignment={Alignment.center}
 *   clipBehavior="antiAlias"
 * >
 *   <div>Transformed content</div>
 * </Container>
 * ```
 *
 * Utility class methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 * - Alignment.center, Alignment.topLeft, etc. - predefined alignments
 * - LinearGradient, RadialGradient, SweepGradient - gradient classes
 */
function Container(props: ContainerProps) {
  const {
    children,
    alignment,
    padding,
    color,
    decoration,
    foregroundDecoration,
    width,
    height,
    constraints,
    margin,
    transform,
    transformAlignment,
    clipBehavior,
    // Legacy properties (with fallback support)
    backgroundColor,
    borderRadius,
    borderWidth = 0,
    borderColor,
    borderStyle = 'solid',
    // Flex properties
    flex,
    expanded,
    flexible,
    flexShrink,
    alignSelf,
    className = '',
    style = {},
  } = props

  // Build flex styles
  const flexStyles = Flex.buildFlexStyles({
    flex,
    expanded,
    flexible,
    width,
    height,
  })

  // Handle flex shrink
  if (flexShrink === false) {
    flexStyles.flexShrink = 0
  }

  // Create effective decoration (merge decoration with legacy props)
  const effectiveDecoration: BoxDecoration = {
    ...decoration,
    // Legacy fallbacks
    color: decoration?.color || color || backgroundColor,
    borderRadius: decoration?.borderRadius || borderRadius,
    borderWidth: decoration?.borderWidth || (borderWidth > 0 ? borderWidth : undefined),
    borderColor: decoration?.borderColor || borderColor,
    borderStyle: decoration?.borderStyle || borderStyle,
  }

  // Build Tailwind classes
  const alignmentClasses = alignment ? alignmentToFlexClasses(alignment) : []
  const clipClasses = Decoration.clipToClasses(clipBehavior)

  // Build CSS styles for properties that don't have good Tailwind equivalents
  const constraintStyles = BoxConstraints.toCSS(constraints)
  const transformStyles = Matrix4.toCSS(transform, transformAlignment)
  const decorationStyles = Decoration.toCSS(effectiveDecoration)

  // Resolve padding and margin
  const resolvedPadding = resolvePaddingMargin(padding)
  const resolvedMargin = resolvePaddingMargin(margin)

  // Combine all CSS classes
  const allClasses = [
    ...alignmentClasses,
    ...clipClasses,
    foregroundDecoration ? 'relative' : '', // Required for foregroundDecoration positioning
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Container styles combining all properties
  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    ...constraintStyles,
    ...decorationStyles,
    ...transformStyles,
    padding: resolvedPadding,
    margin: resolvedMargin,
    alignSelf,
    ...style,
  }

  // Create foreground decoration element if specified
  const foregroundElement = foregroundDecoration ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        ...Decoration.toCSS(foregroundDecoration),
        backgroundColor: 'transparent', // Don't paint background for foreground
      }}
    />
  ) : null

  return (
    <div className={allClasses} style={containerStyle}>
      {children}
      {foregroundElement}
    </div>
  )
}

export default Container
