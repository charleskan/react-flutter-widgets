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

    // Build container classes (using Tailwind)
    const baseClasses = ['grid', 'relative']

    // Apply fit behavior via Tailwind classes
    switch (fit) {
      case StackFit.expand:
        baseClasses.push('w-full', 'h-full')
        break
      case StackFit.loose:
        baseClasses.push('w-fit', 'h-fit')
        break
      case StackFit.passthrough:
        // Don't set width/height, pass through constraints
        break
    }

    // Get alignment classes and styles
    const { classes: alignmentClasses, styles: alignmentStyles } =
      getGridAlignmentClassesAndStyles(resolvedAlignment)
    baseClasses.push(...alignmentClasses)

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

    // Wrap each non-positioned child to place them in the same grid cell
    for (const child of nonPositionedChildren) {
      const key = isValidElement(child) ? child.key : undefined
      processedChildren.push(
        <div key={key} className="col-start-1 row-start-1">
          {child}
        </div>,
      )
    }

    // Add positioned children (they handle their own positioning via position: absolute)
    processedChildren.push(...positionedChildren)

    return {
      containerClasses: baseClasses,
      containerStyle: {
        ...alignmentStyles,
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
 * Convert Flutter Alignment to CSS Grid alignment classes and styles
 * Returns both Tailwind classes and inline styles for precise alignment
 */
function getGridAlignmentClassesAndStyles(alignment: Alignment): {
  classes: string[]
  styles: CSSProperties
} {
  // Flutter alignment uses -1 to 1 coordinate system
  // -1, -1 = top left (start, start)
  // 0, 0 = center (center, center)
  // 1, 1 = bottom right (end, end)

  const classes: string[] = []
  const styles: CSSProperties = {}

  // Check for common alignments that can use Tailwind classes
  if (alignment.x === -1 && alignment.y === -1) {
    // topLeft
    classes.push('place-items-start')
  } else if (alignment.x === 0 && alignment.y === -1) {
    // topCenter
    classes.push('items-start', 'justify-items-center')
  } else if (alignment.x === 1 && alignment.y === -1) {
    // topRight
    classes.push('items-start', 'justify-items-end')
  } else if (alignment.x === -1 && alignment.y === 0) {
    // centerLeft
    classes.push('items-center', 'justify-items-start')
  } else if (alignment.x === 0 && alignment.y === 0) {
    // center
    classes.push('place-items-center')
  } else if (alignment.x === 1 && alignment.y === 0) {
    // centerRight
    classes.push('items-center', 'justify-items-end')
  } else if (alignment.x === -1 && alignment.y === 1) {
    // bottomLeft
    classes.push('items-end', 'justify-items-start')
  } else if (alignment.x === 0 && alignment.y === 1) {
    // bottomCenter
    classes.push('items-end', 'justify-items-center')
  } else if (alignment.x === 1 && alignment.y === 1) {
    // bottomRight
    classes.push('place-items-end')
  } else {
    // For arbitrary alignment values, use inline styles
    // Convert -1..1 to CSS percentage (start, center, end)
    const xPercent = ((alignment.x + 1) / 2) * 100
    const yPercent = ((alignment.y + 1) / 2) * 100

    styles.justifyItems = `${xPercent}%`
    styles.alignItems = `${yPercent}%`
  }

  return { classes, styles }
}

// Set displayName for debugging
Stack.displayName = 'Stack'

export default Stack
