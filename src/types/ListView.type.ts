import type { CSSProperties, Key, ReactNode } from 'react'
import { MainAxisAlignment, CrossAxisAlignment } from './Flex.type'

// Re-export enums from Flex.type.ts for ListView usage
export { MainAxisAlignment, CrossAxisAlignment }

/**
 * Scroll direction for ListView
 */
export enum ScrollDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * Scroll physics behavior controls how the list responds to user scroll gestures
 */
export enum ScrollPhysics {
  BOUNCING = 'bouncing',
  CLAMPING = 'clamping',
  NEVER_SCROLLABLE = 'never_scrollable',
  ALWAYS_SCROLLABLE = 'always_scrollable',
}

// MainAxisAlignment and CrossAxisAlignment are imported from Flex.type.ts to avoid duplication

/**
 * Padding direction options for convenience methods
 */
export enum PaddingDirection {
  ALL = 'all',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  NONE = 'none',
}

// Import and re-export EdgeInsets from Flex types for backward compatibility
import { EdgeInsets } from './Flex.type'
export { EdgeInsets }

/**
 * Core ListView builder interface defining how items are rendered
 */
export interface ListViewBuilder<T> {
  /** Total number of items (used when items array is not provided) */
  itemCount?: number
  /** Array of items to render */
  items?: T[]
  /** Function that builds each item widget */
  itemBuilder: (item: T | null, index: number) => ReactNode
  /** Optional function that builds separators between items */
  separatorBuilder?: (index: number) => ReactNode
  /** Optional function to extract unique keys for each item */
  keyExtractor?: (item: T | null, index: number) => Key
}

/**
 * Main ListView component props interface
 */
export interface ListViewProps<T> extends ListViewBuilder<T> {
  /** Direction of scrolling (vertical or horizontal) */
  scrollDirection?: ScrollDirection
  /** Whether to reverse the scroll order */
  reverse?: boolean
  /** Whether the list should shrink-wrap its content */
  shrinkWrap?: boolean
  /** Scroll physics behavior */
  physics?: ScrollPhysics
  /** Cross axis alignment of items */
  crossAxisAlignment?: CrossAxisAlignment
  /** Main axis alignment of items */
  mainAxisAlignment?: MainAxisAlignment

  // Flutter flex properties
  /** Whether this widget should be flexible in the flex layout */
  flexible?: boolean
  /** Whether this widget should expand to fill available space */
  expanded?: boolean
  /** Flex factor for this widget */
  flex?: number

  /** Padding for the list container (supports EdgeInsets or CSS values) */
  padding?: CSSProperties['padding']
  /** Convenience prop for uniform padding on all sides */
  paddingAll?: number | string
  /** Convenience prop for horizontal padding */
  paddingHorizontal?: number | string
  /** Convenience prop for vertical padding */
  paddingVertical?: number | string

  /** Whether content should be clipped to container bounds */
  clipBehavior?: 'hidden' | 'visible'
  /** Whether to add automatic keep alives for off-screen items */
  addAutomaticKeepAlives?: boolean
  /** Whether to add repaint boundaries for performance */
  addRepaintBoundaries?: boolean
  /** Whether to add semantic indexes for accessibility */
  addSemanticIndexes?: boolean
  /** Cache extent for performance optimization */
  cacheExtent?: number | string
  /** Number of semantic children for accessibility */
  semanticChildCount?: number
}

export interface ListViewSeparatedProps<T> extends Omit<ListViewProps<T>, 'separatorBuilder'> {
  separatorBuilder: (index: number) => ReactNode
}

export interface ScrollController {
  scrollToIndex?: (index: number) => void
  scrollToTop?: () => void
  scrollToBottom?: () => void
  animateTo?: (offset: number) => void
}

export interface ListViewController extends ScrollController {
  itemCount: number
  isScrollable: boolean
  hasScrolledToEnd: boolean
}

export namespace ListView {
  export interface BuilderProps<T> extends ListViewBuilder<T> {
    scrollDirection?: ScrollDirection
    reverse?: boolean
    shrinkWrap?: boolean
    physics?: ScrollPhysics
    crossAxisAlignment?: CrossAxisAlignment
    mainAxisAlignment?: MainAxisAlignment
    className?: string
    style?: CSSProperties
    padding?: CSSProperties['padding']
  }

  export interface SeparatedProps<T> extends ListViewSeparatedProps<T> {}

  export function getPhysicsClassName(physics: ScrollPhysics): string {
    switch (physics) {
      case ScrollPhysics.BOUNCING:
        return 'scroll-smooth'
      case ScrollPhysics.CLAMPING:
        return 'scroll-auto'
      case ScrollPhysics.NEVER_SCROLLABLE:
        return 'overflow-hidden'
      case ScrollPhysics.ALWAYS_SCROLLABLE:
        return 'overflow-scroll'
      default:
        return 'scroll-auto'
    }
  }

  export function getScrollDirectionClasses(direction: ScrollDirection): string {
    return direction === ScrollDirection.VERTICAL
      ? 'flex-col overflow-y-auto overflow-x-hidden'
      : 'flex-row overflow-x-auto overflow-y-hidden'
  }

  export function getCrossAxisAlignmentClass(
    alignment: CrossAxisAlignment,
    direction: ScrollDirection,
  ): string {
    const isVertical = direction === ScrollDirection.VERTICAL
    switch (alignment) {
      case CrossAxisAlignment.START:
        return isVertical ? 'items-start' : 'justify-start'
      case CrossAxisAlignment.CENTER:
        return isVertical ? 'items-center' : 'justify-center'
      case CrossAxisAlignment.END:
        return isVertical ? 'items-end' : 'justify-end'
      case CrossAxisAlignment.STRETCH:
        return isVertical ? 'items-stretch' : 'justify-stretch'
      default:
        return isVertical ? 'items-stretch' : 'justify-start'
    }
  }

  export function getMainAxisAlignmentClass(
    alignment: MainAxisAlignment,
    direction: ScrollDirection,
  ): string {
    const isVertical = direction === ScrollDirection.VERTICAL
    switch (alignment) {
      case MainAxisAlignment.START:
        return isVertical ? 'justify-start' : 'items-start'
      case MainAxisAlignment.CENTER:
        return isVertical ? 'justify-center' : 'items-center'
      case MainAxisAlignment.END:
        return isVertical ? 'justify-end' : 'items-end'
      case MainAxisAlignment.SPACE_BETWEEN:
        return isVertical ? 'justify-between' : 'items-between'
      case MainAxisAlignment.SPACE_AROUND:
        return isVertical ? 'justify-around' : 'items-around'
      case MainAxisAlignment.SPACE_EVENLY:
        return isVertical ? 'justify-evenly' : 'items-evenly'
      default:
        return isVertical ? 'justify-start' : 'items-start'
    }
  }

  export function calculatePadding(options: {
    paddingAll?: number | string
    paddingHorizontal?: number | string
    paddingVertical?: number | string
    padding?: CSSProperties['padding']
  }): CSSProperties['padding'] {
    const { paddingAll, paddingHorizontal, paddingVertical, padding } = options

    // Priority: convenience props > padding
    if (paddingAll !== undefined) {
      return EdgeInsets.all(paddingAll)
    }

    if (paddingHorizontal !== undefined || paddingVertical !== undefined) {
      return EdgeInsets.symmetric({
        horizontal: paddingHorizontal,
        vertical: paddingVertical,
      })
    }

    return padding
  }
}
