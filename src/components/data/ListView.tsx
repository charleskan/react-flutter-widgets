import type React from 'react'
import {
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

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
  /** Scrolling physics behavior (set to NEVER to disable scrolling) */
  physics?: ScrollPhysics
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
 * Converts EdgeInsets to CSS padding properties.
 * @param p - EdgeInsets value (number or object with top/right/bottom/left)
 * @returns CSS padding properties or undefined if no padding specified
 */
function toPadding(p?: EdgeInsets): CSSProperties | undefined {
  if (p == null) return undefined
  if (typeof p === 'number') return { padding: p }
  const { top = 0, right = 0, bottom = 0, left = 0 } = p
  return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left }
}

/**
 * Generates container styles for ListView - determines scrolling behavior and layout.
 * This is where the core scrolling logic is implemented.
 * @param axis - Scroll direction (vertical or horizontal)
 * @param reverse - Whether to reverse item order
 * @param shrinkWrap - Whether to size to content instead of filling space
 * @param physics - Scroll physics behavior
 * @param clip - Clipping behavior for overflow
 * @param paddingStyle - Processed padding styles
 * @param userStyle - User-provided custom styles
 * @param itemExtent - Fixed item size for uniform items
 * @returns Complete CSS properties for the container
 */
function buildContainerStyle(
  axis: Axis,
  reverse: boolean,
  shrinkWrap: boolean,
  physics: ScrollPhysics,
  clip: 'visible' | 'hidden',
  paddingStyle?: CSSProperties,
  userStyle?: CSSProperties,
  itemExtent?: number,
): CSSProperties {
  const isVertical = axis === Axis.VERTICAL

  const enableScroll = physics !== ScrollPhysics.NEVER && !shrinkWrap

  const overflow: CSSProperties = enableScroll
    ? isVertical
      ? { overflowY: 'auto', overflowX: 'hidden' }
      : { overflowX: 'auto', overflowY: 'hidden' }
    : { overflow: 'hidden' }

  const direction: CSSProperties['flexDirection'] = reverse
    ? isVertical
      ? 'column-reverse'
      : 'row-reverse'
    : isVertical
      ? 'column'
      : 'row'

  const clipStyle: CSSProperties = clip === 'hidden' ? { overflowClipMargin: 'content-box' } : {}

  const momentum: CSSProperties =
    physics === ScrollPhysics.BOUNCING
      ? ({ WebkitOverflowScrolling: 'touch' } as CSSProperties)
      : {}

  const extentStyle = itemExtent ? (isVertical ? { rowGap: 0 } : { columnGap: 0 }) : undefined

  return {
    display: 'flex',
    flexDirection: direction,
    margin: 0,
    listStyle: 'none',
    ...(paddingStyle ? {} : { padding: 0 }),
    ...overflow,
    ...(shrinkWrap ? { flex: '0 0 auto', maxHeight: 'none' } : { flex: '1 1 auto' }),
    ...(clip === 'hidden' ? { overflow: enableScroll ? 'auto' : 'hidden' } : {}),
    ...clipStyle,
    ...momentum,
    ...extentStyle,
    ...paddingStyle,
    ...userStyle,
  }
}

/**
 * Wrapper component for ListView items.
 * Handles itemExtent (fixed item sizing) and provides semantic listitem role.
 * @param axis - Scroll direction to determine which dimension to fix
 * @param itemExtent - Fixed size for the item in the main axis
 * @param children - Child content to wrap
 */
const ItemWrap: React.FC<{ axis: Axis; itemExtent?: number; children: ReactNode }> = ({
  axis,
  itemExtent,
  children,
}) => {
  const style: CSSProperties | undefined = itemExtent
    ? axis === Axis.VERTICAL
      ? { height: itemExtent }
      : { width: itemExtent }
    : undefined
  return <li style={style}>{children}</li>
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

  const paddingStyle = useMemo(() => toPadding(padding), [padding])
  const containerStyle = useMemo(
    () =>
      buildContainerStyle(
        scrollDirection,
        reverse,
        shrinkWrap,
        physics,
        clipBehavior,
        paddingStyle,
        style,
        itemExtent,
      ),
    [scrollDirection, reverse, shrinkWrap, physics, clipBehavior, paddingStyle, style, itemExtent],
  )

  return (
    <ul
      ref={elRef}
      className={className}
      style={containerStyle}
      aria-orientation={scrollDirection === Axis.VERTICAL ? 'vertical' : 'horizontal'}
      {...aria}
      data-primary={primary ? 'true' : undefined}
    >
      {children?.map((child, i) => (
        <ItemWrap
          axis={scrollDirection}
          itemExtent={itemExtent}
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
