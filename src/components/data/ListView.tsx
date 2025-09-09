import { clsx } from 'clsx'
import React, {
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { type AlignmentGeometry, alignmentToCSS } from '../../utils/Alignment'
import type { PageScrollPhysics } from '../../utils/ScrollPhysics'
import { Align } from '../layout/Align'

/**
 * Defines the scroll direction for ListView components.
 * @enum {string}
 */
export enum Axis {
  /** Vertical scrolling (default) */
  VERTICAL = 'vertical',
  /** Horizontal scrolling */
  HORIZONTAL = 'horizontal',
}
/**
 * Defines the scroll physics behavior for ListView components.
 * @enum {string}
 */
export enum ScrollPhysics {
  /** Default scrolling behavior (allows scrolling) */
  DEFAULT = 'default',
  /** Disables user scrolling (equivalent to NeverScrollableScrollPhysics) */
  NEVER = 'never',
  /** iOS-style bouncing scrolling (Safari supports; other browsers ignore) */
  BOUNCING = 'bouncing',
  /** Android/desktop-style clamping scrolling (Web roughly equivalent to default) */
  CLAMPING = 'clamping',
}
/**
 * Defines padding values that can be applied to ListView components.
 * Equivalent to Flutter's EdgeInsets class - supports uniform padding or individual sides.
 *
 * @example
 * ```tsx
 * // Uniform padding (equivalent to EdgeInsets.all(16))
 * padding={16}
 *
 * // Individual sides (equivalent to EdgeInsets.only())
 * padding={{ top: 8, bottom: 16, left: 12, right: 12 }}
 *
 * // Symmetric padding can be achieved with:
 * padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
 * ```
 */
export type EdgeInsets = number | { top?: number; right?: number; bottom?: number; left?: number }

/**
 * Base properties shared by all ListView variants.
 * Provides common configuration options for scrolling behavior, styling, and accessibility.
 */
export interface BaseProps {
  /** Scroll direction (default: vertical) */
  scrollDirection?: Axis
  /** Reverse the order of items visually and logically (note: affects accessibility) */
  reverse?: boolean
  /** Size to content instead of filling available space (disables scrolling) */
  shrinkWrap?: boolean
  /** Mark this ListView as primary (semantic only on Web; doesn't affect behavior) */
  primary?: boolean
  /** Scrolling physics behavior (set to NEVER to disable scrolling, or use PageScrollPhysics for snapping) */
  physics?: ScrollPhysics | PageScrollPhysics
  /** Internal padding (supports number or individual sides) */
  padding?: EdgeInsets
  /** Fixed height/width for child items (corresponds to itemExtent) */
  itemExtent?: number
  /** Template item to derive itemExtent from (measures first item only) */
  prototypeItem?: ReactNode
  /** Clipping behavior for overflow content */
  clipBehavior?: 'visible' | 'hidden'
  /** Additional CSS class name */
  className?: string
  /** Additional CSS styles */
  style?: CSSProperties
  /** Accessible label for the list */
  'aria-label'?: string
  /** ID of element that labels this list */
  'aria-labelledby'?: string
}

/**
 * Props for the main ListView component that accepts children directly.
 * This is the equivalent of Flutter's ListView(...) constructor.
 */
export interface ListViewProps extends BaseProps {
  /** Array of child elements to render */
  children?: ReactNode[]
  /** Semantic child count for accessibility (equivalent to semanticChildCount) */
  semanticChildCount?: number
}

/**
 * Props for ListView.builder - creates items dynamically using a builder function.
 * @template T - Type parameter for future extensibility
 */
export interface BuilderProps<_T> extends BaseProps {
  /** Total number of items to build */
  itemCount: number
  /** Function that builds an item at the given index */
  itemBuilder: (index: number) => ReactNode
}
/**
 * Props for ListView.separated - like builder but with separators between items.
 * @template T - Type parameter for future extensibility
 */
export interface SeparatedProps<T> extends BuilderProps<T> {
  /** Function that builds a separator at the given index */
  separatorBuilder: (index: number) => ReactNode
}

/**
 * Handle interface for imperative ListView operations.
 * Equivalent to a subset of Flutter's ScrollController functionality.
 */
export interface ListViewHandle {
  /** Scroll to a specific position with animation options */
  scrollTo: (options: ScrollToOptions) => void
  /** Get the underlying scroll element for advanced operations */
  getScrollElement: () => HTMLUListElement | null
}

/**
 * Converts EdgeInsets to Tailwind padding classes.
 * @param p - EdgeInsets value (number or object with top/right/bottom/left)
 * @returns Tailwind padding classes or empty string if no padding specified
 */
function toPaddingClasses(p?: EdgeInsets): string {
  if (p == null) return ''
  if (typeof p === 'number') return `p-[${p}px]`

  const classes: string[] = []
  const { top, right, bottom, left } = p

  if (top) classes.push(`pt-[${top}px]`)
  if (right) classes.push(`pr-[${right}px]`)
  if (bottom) classes.push(`pb-[${bottom}px]`)
  if (left) classes.push(`pl-[${left}px]`)

  return classes.join(' ')
}

/**
 * Converts Flutter Alignment to Tailwind flexbox classes.
 * @param alignment - Flutter AlignmentGeometry object
 * @returns Array of Tailwind classes for flexbox alignment
 */
function alignmentToFlexClasses(alignment: AlignmentGeometry): string[] {
  const classes = ['flex']
  const css = alignmentToCSS(alignment)

  // Handle horizontal alignment (justify-content)
  const xValue = Number.parseFloat(css.x)
  if (xValue === 0) {
    classes.push('justify-start')
  } else if (xValue === 50) {
    classes.push('justify-center')
  } else if (xValue === 100) {
    classes.push('justify-end')
  } else {
    // For custom alignments, fallback to center
    classes.push('justify-center')
  }

  // Handle vertical alignment (align-items)
  const yValue = Number.parseFloat(css.y)
  if (yValue === 0) {
    classes.push('items-start')
  } else if (yValue === 50) {
    classes.push('items-center')
  } else if (yValue === 100) {
    classes.push('items-end')
  } else {
    // For custom alignments, fallback to center
    classes.push('items-center')
  }

  return classes
}

/**
 * Generates container classes for ListView using Tailwind CSS.
 * This is where the core scrolling logic is implemented.
 * @param axis - Scroll direction (vertical or horizontal)
 * @param reverse - Whether to reverse item order
 * @param shrinkWrap - Whether to size to content instead of filling space
 * @param physics - Scroll physics behavior
 * @param clip - Clipping behavior for overflow
 * @param paddingClasses - Processed padding classes
 * @param className - User-provided CSS classes
 * @returns Complete Tailwind class string for the container
 */
function buildContainerClasses(
  axis: Axis,
  reverse: boolean,
  shrinkWrap: boolean,
  physics: ScrollPhysics | PageScrollPhysics,
  _clip: 'visible' | 'hidden',
  paddingClasses: string,
  className?: string,
): string {
  const classes: string[] = []

  // Base layout classes
  classes.push('flex', 'list-none', 'm-0')

  // Add padding if no user padding
  if (!paddingClasses) {
    classes.push('p-0')
  }

  const isVertical = axis === Axis.VERTICAL
  const enableScroll = physics !== ScrollPhysics.NEVER && !shrinkWrap

  // Direction classes
  if (reverse) {
    classes.push(isVertical ? 'flex-col-reverse' : 'flex-row-reverse')
  } else {
    classes.push(isVertical ? 'flex-col' : 'flex-row')
  }

  // Scroll and overflow classes
  if (enableScroll) {
    if (isVertical) {
      classes.push('overflow-y-auto', 'overflow-x-hidden')
    } else {
      classes.push('overflow-x-auto', 'overflow-y-hidden')
    }
  } else {
    classes.push('overflow-hidden')
  }

  // Size classes
  if (shrinkWrap) {
    classes.push('flex-none')
  } else {
    classes.push('flex-1')
  }

  // Physics classes (PageScrollPhysics)
  if (physics && typeof physics === 'object' && 'getClasses' in physics) {
    const direction = isVertical ? 'vertical' : 'horizontal'
    classes.push(...physics.getClasses(direction))
  }

  // Momentum scrolling for iOS (bouncing physics)
  if (physics === ScrollPhysics.BOUNCING) {
    // Use smooth scrolling behavior
    classes.push('scroll-smooth')
  }

  return clsx(classes, paddingClasses, className)
}

/**
 * Wrapper component for ListView items.
 * Handles itemExtent (fixed item sizing), Align component detection, and provides semantic listitem role.
 * @param axis - Scroll direction to determine which dimension to fix
 * @param itemExtent - Fixed size for the item in the main axis
 * @param physics - Physics to apply item-specific classes
 * @param children - Child content to wrap
 */
const ItemWrap: React.FC<{
  axis: Axis
  itemExtent?: number
  physics?: ScrollPhysics | PageScrollPhysics
  children: ReactNode
}> = ({ axis, itemExtent, physics, children }) => {
  const classes: string[] = []

  // Check if child is an Align component
  const isAlignComponent = React.isValidElement(children) && children.type === Align

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('ItemWrap debug:', {
      isValidElement: React.isValidElement(children),
      childType: React.isValidElement(children) ? children.type : 'not valid element',
      alignType: Align,
      typeMatch: React.isValidElement(children) ? children.type === Align : false,
      isAlignComponent,
    })
  }

  if (isAlignComponent) {
    // Extract alignment from Align component props
    const alignProps = children.props as { alignment?: AlignmentGeometry }
    const alignment = alignProps.alignment

    if (alignment) {
      // Add flexbox classes for alignment
      classes.push(...alignmentToFlexClasses(alignment))
    } else {
      // Default to center if no alignment specified
      classes.push('flex', 'items-center', 'justify-center')
    }
  }

  // Fixed size classes
  if (itemExtent) {
    if (axis === Axis.VERTICAL) {
      classes.push(`h-[${itemExtent}px]`, 'flex-shrink-0')
    } else {
      classes.push(`w-[${itemExtent}px]`, 'flex-shrink-0')
    }
  }

  // Physics item classes (for PageScrollPhysics snap alignment)
  if (physics && typeof physics === 'object' && 'getItemClasses' in physics) {
    classes.push(...physics.getItemClasses())
  }

  // Ensure consistent sizing for snap behavior
  if (!itemExtent && physics && typeof physics === 'object' && 'getItemClasses' in physics) {
    classes.push('flex-shrink-0')
  }

  // Render content: if it's an Align component, render its children directly
  const content = isAlignComponent
    ? (children as React.ReactElement).props.children ||
      (children as React.ReactElement).props.child
    : children

  return <li className={clsx(classes)}>{content}</li>
}

/**
 * Base ListView component implementation.
 * Handles the core functionality for children-based ListView (equivalent to Flutter's ListView(...)).
 * @param props - ListView properties
 * @param ref - Forward ref for imperative operations
 */
const ListViewBase = forwardRef(function ListView(
  {
    children = [],
    scrollDirection = Axis.VERTICAL,
    reverse = false,
    shrinkWrap = false,
    primary,
    physics = ScrollPhysics.DEFAULT,
    padding,
    itemExtent,
    prototypeItem,
    clipBehavior = 'visible',
    className,
    style,
    semanticChildCount,
    ...aria
  }: ListViewProps,
  ref: ForwardedRef<ListViewHandle>,
) {
  const elRef = useRef<HTMLUListElement>(null)

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (opts) => elRef.current?.scrollTo(opts),
      getScrollElement: () => elRef.current,
    }),
    [],
  )

  const paddingClasses = useMemo(() => toPaddingClasses(padding), [padding])
  const containerClasses = useMemo(
    () =>
      buildContainerClasses(
        scrollDirection,
        reverse,
        shrinkWrap,
        physics,
        clipBehavior,
        paddingClasses,
        className,
      ),
    [scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingClasses, className],
  )

  return (
    <ul
      ref={elRef}
      className={containerClasses}
      style={style}
      aria-orientation={scrollDirection === Axis.VERTICAL ? 'vertical' : 'horizontal'}
      {...aria}
      data-primary={primary ? 'true' : undefined}
    >
      {children?.map((child, i) => (
        <ItemWrap
          axis={scrollDirection}
          itemExtent={itemExtent}
          physics={physics}
          key={(child as React.ReactElement)?.key ?? i}
        >
          {child}
        </ItemWrap>
      ))}
    </ul>
  )
})

/**
 * Builder function for dynamic ListView variants (builder and separated).
 * Creates items on-demand using provided builder functions.
 * @template T - Type parameter for future extensibility
 * @param props - Builder props including itemCount and builder functions
 * @param ref - Forward ref for imperative operations
 */
function Builder<T>(
  {
    itemCount,
    itemBuilder,
    separatorBuilder,
    ...rest
  }: BuilderProps<T> & { separatorBuilder?: (index: number) => ReactNode },
  ref: ForwardedRef<ListViewHandle>,
) {
  const items: ReactNode[] = useMemo(() => {
    const out: ReactNode[] = []
    for (let i = 0; i < itemCount; i++) {
      out.push(itemBuilder(i))
      if (separatorBuilder && i < itemCount - 1) out.push(separatorBuilder(i))
    }
    return out
  }, [itemCount, itemBuilder, separatorBuilder])

  return (
    <ListViewBase ref={ref} {...rest}>
      {items}
    </ListViewBase>
  )
}

/**
 * Flutter-inspired ListView component with multiple variants. Supports basic children, builder pattern, and separated items.
 *
 * @example
 * ```tsx
 * // Basic ListView with children
 * <ListView>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </ListView>
 *
 * // Builder pattern
 * <ListView.builder
 *   itemCount={100}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 * />
 *
 * // With separators
 * <ListView.separated
 *   itemCount={10}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 *   separatorBuilder={(index) => <hr key={`sep-${index}`} />}
 * />
 * ```
 */
export const ListView = Object.assign(ListViewBase, {
  builder: forwardRef<ListViewHandle, BuilderProps<unknown>>((p, ref) => Builder(p, ref)),
  separated: forwardRef<ListViewHandle, SeparatedProps<unknown>>((p, ref) =>
    Builder(p as SeparatedProps<unknown> & { separatorBuilder: (index: number) => ReactNode }, ref),
  ),
})
