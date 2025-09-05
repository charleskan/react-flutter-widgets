import type React from 'react'
import { type CSSProperties, type ReactNode, useMemo } from 'react'
import { Alignment, type AlignmentGeometry, alignmentToCSS } from '../../utils/Alignment'

/**
 * Properties for the Align widget.
 * Equivalent to Flutter's Align widget properties.
 */
export interface AlignProps {
  /** How to align the child within the container. Defaults to Alignment.center */
  alignment?: AlignmentGeometry
  /** If non-null, sets the width to the child's width multiplied by this factor */
  widthFactor?: number
  /** If non-null, sets the height to the child's height multiplied by this factor */
  heightFactor?: number
  /** The child widget to be aligned */
  child?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

/**
 * A widget that aligns its child within itself and optionally sizes itself based on the child's size.
 *
 * This is equivalent to Flutter's Align widget, providing precise control over child positioning
 * within a container using the Flutter alignment coordinate system.
 *
 * @example
 * ```tsx
 * // Align to top-right corner
 * <Align alignment={Alignment.topRight}>
 *   <div>Top Right Content</div>
 * </Align>
 *
 * // Custom alignment with size factors
 * <Align
 *   alignment={new Alignment(0.2, 0.6)}
 *   widthFactor={2.0}
 *   heightFactor={1.5}
 * >
 *   <div>Custom positioned content</div>
 * </Align>
 * ```
 */
export function Align({
  alignment = Alignment.center,
  widthFactor,
  heightFactor,
  child,
  className,
  style,
}: AlignProps): React.JSX.Element {
  const containerStyles = useMemo((): CSSProperties => {
    const alignmentCSS = alignmentToCSS(alignment)

    // Base container styles
    const baseStyles: CSSProperties = {
      display: 'flex',
      position: 'relative',
      // Convert Flutter alignment coordinates to CSS positioning
      alignItems:
        alignmentCSS.y === '50%' ? 'center' : alignmentCSS.y === '0%' ? 'flex-start' : 'flex-end',
      justifyContent:
        alignmentCSS.x === '50%' ? 'center' : alignmentCSS.x === '0%' ? 'flex-start' : 'flex-end',
    }

    // Handle size factors
    if (widthFactor != null || heightFactor != null) {
      // When size factors are specified, we need to measure the child
      // For now, we'll use a simpler approach with CSS
      if (widthFactor != null) {
        baseStyles.width = 'fit-content'
      }
      if (heightFactor != null) {
        baseStyles.height = 'fit-content'
      }
    } else {
      // Default behavior: fill available space
      baseStyles.width = '100%'
      baseStyles.height = '100%'
    }

    // If the alignment is not exactly center/start/end, use more precise positioning
    const needsPreciseAlignment =
      !['0%', '50%', '100%'].includes(alignmentCSS.x) ||
      !['0%', '50%', '100%'].includes(alignmentCSS.y)

    if (needsPreciseAlignment) {
      baseStyles.alignItems = 'flex-start'
      baseStyles.justifyContent = 'flex-start'
    }

    return baseStyles
  }, [alignment, widthFactor, heightFactor])

  const childWrapperStyles = useMemo((): CSSProperties | undefined => {
    const alignmentCSS = alignmentToCSS(alignment)

    // Check if we need precise positioning
    const needsPreciseAlignment =
      !['0%', '50%', '100%'].includes(alignmentCSS.x) ||
      !['0%', '50%', '100%'].includes(alignmentCSS.y)

    if (!needsPreciseAlignment && widthFactor == null && heightFactor == null) {
      return undefined
    }

    const childStyles: CSSProperties = {}

    // Handle precise alignment
    if (needsPreciseAlignment) {
      childStyles.position = 'absolute'
      childStyles.left = alignmentCSS.x
      childStyles.top = alignmentCSS.y
      childStyles.transform = `translate(-${alignmentCSS.x}, -${alignmentCSS.y})`
    }

    // Handle size factors
    if (widthFactor != null) {
      childStyles.width = `${widthFactor * 100}%`
    }
    if (heightFactor != null) {
      childStyles.height = `${heightFactor * 100}%`
    }

    return childStyles
  }, [alignment, widthFactor, heightFactor])

  const combinedStyle = useMemo(
    () => ({
      ...containerStyles,
      ...style,
    }),
    [containerStyles, style],
  )

  return (
    <div className={className} style={combinedStyle}>
      {child != null &&
        (childWrapperStyles ? <div style={childWrapperStyles}>{child}</div> : child)}
    </div>
  )
}

export default Align
