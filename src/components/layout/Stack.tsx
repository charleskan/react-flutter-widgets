import type { CSSProperties, ReactElement, ReactNode } from 'react'
import { Children, isValidElement, useMemo } from 'react'
import { Alignment, AlignmentDirectional, type AlignmentGeometry } from '../../utils/Alignment'
import type { TextDirection } from '../../utils/Alignment'
import { type Clip, Decoration } from '../../utils/Decoration'

/**
 * How to size the non-positioned children in the stack.
 * Equivalent to Flutter's StackFit enum.
 */
export enum StackFit {
  /** The constraints passed to the stack from its parent are loosened. */
  loose = 'loose',
  /** The constraints passed to the stack from its parent are tightened to the biggest size allowed. */
  expand = 'expand',
  /** The constraints passed to the stack from its parent are passed unmodified to the non-positioned children. */
  passthrough = 'passthrough',
}

/**
 * Properties for the Stack component.
 * Equivalent to Flutter's Stack widget properties.
 */
export interface StackProps {
  /** How to align the non-positioned and partially-positioned children in the stack */
  alignment?: AlignmentGeometry
  /** The text direction with which to resolve alignment */
  textDirection?: TextDirection
  /** How to size the non-positioned children in the stack */
  fit?: StackFit
  /** The clip behavior when content overflows */
  clipBehavior?: Clip
  /** The child widgets (Flutter-style prop) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

/**
 * Check if a child is a Positioned widget
 */
function isPositioned(child: ReactNode): boolean {
  if (!isValidElement(child)) return false
  // Check if the component has a displayName of 'Positioned'
  const type = child.type as { displayName?: string }
  return type.displayName === 'Positioned'
}

/**
 * A widget that positions its children relative to the edges of its box.
 *
 * Equivalent to Flutter's Stack widget. This class is useful if you want to overlap
 * several children in a simple way.
 *
 * Each child of a Stack is either positioned or non-positioned. Positioned children
 * are those wrapped in a Positioned widget that has at least one non-null property.
 * The stack sizes itself to contain all the non-positioned children, which are
 * positioned according to alignment. The positioned children are then placed relative
 * to the stack according to their top, right, bottom, and left properties.
 *
 * @example
 * ```tsx
 * // Basic stack with overlapping children
 * <Stack>
 *   <Container width={100} height={100} color="red" />
 *   <Container width={90} height={90} color="green" />
 *   <Container width={80} height={80} color="blue" />
 * </Stack>
 *
 * // Stack with positioned children
 * <Stack alignment={Alignment.center}>
 *   <Container width={250} height={250} color="white" />
 *   <Positioned
 *     bottom={0}
 *     left={0}
 *     right={0}
 *   >
 *     <Container
 *       padding={EdgeInsets.all(5)}
 *       decoration={{
 *         gradient: new LinearGradient({
 *           begin: Alignment.topCenter,
 *           end: Alignment.bottomCenter,
 *           colors: ['transparent', 'rgba(0,0,0,0.5)']
 *         })
 *       }}
 *     >
 *       <Text style={{ color: 'white' }}>Foreground Text</Text>
 *     </Container>
 *   </Positioned>
 * </Stack>
 *
 * // Stack with custom alignment and fit
 * <Stack
 *   alignment={Alignment.bottomRight}
 *   fit={StackFit.expand}
 * >
 *   <Image src="background.jpg" />
 *   <Positioned
 *     top={10}
 *     right={10}
 *   >
 *     <Icon name="close" />
 *   </Positioned>
 * </Stack>
 * ```
 */
export function Stack({
  alignment = AlignmentDirectional.topStart,
  textDirection,
  fit = StackFit.loose,
  clipBehavior = 'hardEdge',
  children,
  className,
  style,
}: StackProps): ReactElement {
  const { containerClasses, containerStyle, childrenArray } = useMemo(() => {
    // Resolve alignment with text direction
    const resolvedAlignment =
      alignment instanceof AlignmentDirectional && textDirection
        ? alignment.resolve(textDirection)
        : alignment instanceof Alignment
          ? alignment
          : Alignment.topLeft

    // Build container classes (using position: relative instead of grid)
    const baseClasses = ['relative', 'flex']

    // Build container inline styles
    const baseStyle: CSSProperties = {}

    // Apply fit behavior
    switch (fit) {
      case StackFit.expand:
        baseClasses.push('w-full', 'h-full')
        break
      case StackFit.loose:
        // Don't set size - let first non-positioned child determine size
        break
      case StackFit.passthrough:
        // Don't set width/height, pass through constraints
        break
    }

    // Get alignment classes and styles for flex container
    const { classes: alignmentClasses, styles: alignmentStyles } =
      getFlexAlignmentClassesAndStyles(resolvedAlignment)
    baseClasses.push(...alignmentClasses)
    Object.assign(baseStyle, alignmentStyles)

    // Process children - separate positioned from non-positioned
    const childArray = Children.toArray(children)
    const positionedChildren: ReactNode[] = []
    const nonPositionedChildren: ReactNode[] = []

    for (const child of childArray) {
      if (isValidElement(child) && isPositioned(child)) {
        positionedChildren.push(child)
      } else {
        nonPositionedChildren.push(child)
      }
    }

    const processedChildren: ReactNode[] = []

    // Process non-positioned children:
    // - First child uses normal flow (determines Stack size)
    // - Rest use absolute positioning with alignment
    nonPositionedChildren.forEach((child, index) => {
      const key = isValidElement(child)
        ? (child.key ?? `non-positioned-${index}`)
        : `non-positioned-${index}`

      if (index === 0) {
        // First non-positioned child - normal flow, aligned by flex container
        processedChildren.push(<div key={key}>{child}</div>)
      } else {
        // Subsequent non-positioned children - absolute positioned with alignment
        const absoluteStyle = getAbsoluteAlignmentStyles(resolvedAlignment)
        processedChildren.push(
          <div key={key} className="absolute" style={absoluteStyle}>
            {child}
          </div>,
        )
      }
    })

    // Add positioned children (they handle their own positioning via position: absolute)
    processedChildren.push(...positionedChildren)

    return {
      containerClasses: baseClasses,
      containerStyle: {
        ...baseStyle,
        ...style,
      },
      childrenArray: processedChildren,
    }
  }, [alignment, textDirection, fit, children, style])

  const combinedClassName = useMemo(() => {
    const clipClasses = Decoration.clipToClasses(clipBehavior)
    return [...clipClasses, ...containerClasses, className].filter(Boolean).join(' ')
  }, [clipBehavior, containerClasses, className])

  return (
    <div className={combinedClassName} style={containerStyle}>
      {childrenArray}
    </div>
  )
}

/**
 * Convert Flutter Alignment to CSS Flexbox alignment classes and styles
 * For aligning the first non-positioned child within the flex container
 */
function getFlexAlignmentClassesAndStyles(alignment: Alignment): {
  classes: string[]
  styles: CSSProperties
} {
  // Flutter alignment uses -1 to 1 coordinate system
  // -1, -1 = top left (flex-start, flex-start)
  // 0, 0 = center (center, center)
  // 1, 1 = bottom right (flex-end, flex-end)

  const classes: string[] = []
  const styles: CSSProperties = {}

  // Map alignment to flex justify-content and align-items
  // Check for common alignments that can use Tailwind classes
  if (alignment.x === -1 && alignment.y === -1) {
    // topLeft
    classes.push('justify-start', 'items-start')
  } else if (alignment.x === 0 && alignment.y === -1) {
    // topCenter
    classes.push('justify-center', 'items-start')
  } else if (alignment.x === 1 && alignment.y === -1) {
    // topRight
    classes.push('justify-end', 'items-start')
  } else if (alignment.x === -1 && alignment.y === 0) {
    // centerLeft
    classes.push('justify-start', 'items-center')
  } else if (alignment.x === 0 && alignment.y === 0) {
    // center
    classes.push('justify-center', 'items-center')
  } else if (alignment.x === 1 && alignment.y === 0) {
    // centerRight
    classes.push('justify-end', 'items-center')
  } else if (alignment.x === -1 && alignment.y === 1) {
    // bottomLeft
    classes.push('justify-start', 'items-end')
  } else if (alignment.x === 0 && alignment.y === 1) {
    // bottomCenter
    classes.push('justify-center', 'items-end')
  } else if (alignment.x === 1 && alignment.y === 1) {
    // bottomRight
    classes.push('justify-end', 'items-end')
  } else {
    // For arbitrary alignment values, use inline styles
    // Convert -1..1 to flex alignment
    const xPercent = ((alignment.x + 1) / 2) * 100
    const yPercent = ((alignment.y + 1) / 2) * 100

    styles.justifyContent = `${xPercent}%`
    styles.alignItems = `${yPercent}%`
  }

  return { classes, styles }
}

/**
 * Convert Flutter Alignment to absolute positioning styles
 * For non-positioned children after the first one
 */
function getAbsoluteAlignmentStyles(alignment: Alignment): CSSProperties {
  // Flutter alignment uses -1 to 1 coordinate system
  // -1, -1 = top left
  // 0, 0 = center
  // 1, 1 = bottom right

  const xPercent = ((alignment.x + 1) / 2) * 100
  const yPercent = ((alignment.y + 1) / 2) * 100

  return {
    left: `${xPercent}%`,
    top: `${yPercent}%`,
    transform: `translate(-${xPercent}%, -${yPercent}%)`,
  }
}

// Set displayName for debugging
Stack.displayName = 'Stack'

export default Stack
