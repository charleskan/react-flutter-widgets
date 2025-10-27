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
  const { containerStyle, childrenArray } = useMemo(() => {
    // Resolve alignment with text direction
    const resolvedAlignment =
      alignment instanceof AlignmentDirectional && textDirection
        ? alignment.resolve(textDirection)
        : alignment instanceof Alignment
          ? alignment
          : Alignment.topLeft

    // Build container styles
    const baseContainerStyle: CSSProperties = {
      position: 'relative',
      display: 'flex',
    }

    // Apply fit behavior
    switch (fit) {
      case StackFit.expand:
        baseContainerStyle.width = '100%'
        baseContainerStyle.height = '100%'
        break
      case StackFit.loose:
        baseContainerStyle.width = 'fit-content'
        baseContainerStyle.height = 'fit-content'
        break
      case StackFit.passthrough:
        // Don't set width/height, pass through constraints
        break
    }

    // Apply clip behavior
    const clipClasses = Decoration.clipToClasses(clipBehavior)

    // Process children
    const childArray = Children.toArray(children)
    const processedChildren = childArray.map((child) => {
      if (!isValidElement(child)) return child

      const isPositionedChild = isPositioned(child)

      if (isPositionedChild) {
        // Positioned children handle their own positioning
        return child
      }

      // Non-positioned children need alignment applied
      const childStyle: CSSProperties = {
        position: 'absolute',
        ...getAlignmentStyles(resolvedAlignment),
      }

      // Apply fit to non-positioned children
      if (fit === StackFit.expand) {
        childStyle.width = '100%'
        childStyle.height = '100%'
      }

      // Children.toArray already provides stable keys
      return (
        <div key={child.key} style={childStyle}>
          {child}
        </div>
      )
    })

    return {
      containerStyle: {
        ...baseContainerStyle,
        ...style,
      },
      childrenArray: processedChildren,
      clipClasses: clipClasses.join(' '),
    }
  }, [alignment, textDirection, fit, clipBehavior, children, style])

  const combinedClassName = useMemo(() => {
    const clipClasses = Decoration.clipToClasses(clipBehavior)
    return [clipClasses.join(' '), className].filter(Boolean).join(' ')
  }, [clipBehavior, className])

  return (
    <div className={combinedClassName} style={containerStyle}>
      {childrenArray}
    </div>
  )
}

/**
 * Convert Flutter Alignment to CSS positioning styles
 */
function getAlignmentStyles(alignment: Alignment): CSSProperties {
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
