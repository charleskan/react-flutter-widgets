import type { CSSProperties, ReactNode } from 'react'
import { CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from './Layout'
import type { VerticalDirection } from './Layout'
import type { TextBaseline, TextDirection } from './Text'

/**
 * Common flex container props interface following Flutter's layout model
 */
export interface FlexProps {
  /** Child elements to render inside the flex container */
  children: ReactNode

  // Flutter layout alignment
  /** Main axis alignment of children */
  mainAxisAlignment?: MainAxisAlignment
  /** Cross axis alignment of children */
  crossAxisAlignment?: CrossAxisAlignment
  /** How much space the flex container should occupy along the main axis */
  mainAxisSize?: MainAxisSize
  /** Text direction for layout */
  textDirection?: TextDirection
  /** Text baseline for cross-axis alignment */
  textBaseline?: TextBaseline

  // Flutter flex properties
  /** Flex factor for this widget (equivalent to CSS flex-grow) */
  flex?: number
  /** Whether this widget should expand to fill available space */
  expanded?: boolean
  /** Whether this widget should be flexible in the flex layout */
  flexible?: boolean

  // Flutter sizing
  /** Fixed width of the container */
  width?: number | string
  /** Fixed height of the container */
  height?: number | string

  // Flutter spacing (using EdgeInsets)
  /** Padding inside the container - must use EdgeInsets methods */
  padding?: string
  /** Margin outside the container - must use EdgeInsets methods */
  margin?: string
}

/**
 * Column component props extending FlexProps with column-specific options
 */
export interface ColumnProps extends FlexProps {
  /** Vertical direction for the column */
  verticalDirection?: VerticalDirection
}

/**
 * Row component props extending FlexProps with row-specific options
 */
export interface RowProps extends FlexProps {
  /** Text direction affects the horizontal direction in a row */
  textDirection?: TextDirection
}

export namespace Flex {
  /**
   * Builds flex-related CSS styles based on Flutter flex properties
   * @param options - Flutter flex configuration
   * @returns CSS style object
   */
  export function buildFlexStyles(options: {
    flex?: number
    expanded?: boolean
    flexible?: boolean
    width?: number | string
    height?: number | string
  }): CSSProperties {
    const { flex, expanded, flexible, width, height } = options
    const styles: CSSProperties = {}

    if (width !== undefined) {
      styles.width = typeof width === 'number' ? `${width}px` : width
    }

    if (height !== undefined) {
      styles.height = typeof height === 'number' ? `${height}px` : height
    }

    if (expanded) {
      styles.flexGrow = 1
      styles.flexShrink = 1
    } else if (flexible) {
      styles.flexGrow = 1
      styles.flexShrink = 0
    } else if (flex !== undefined) {
      styles.flex = flex
    } else {
      // Default: don't grow or shrink
      styles.flexGrow = 0
      styles.flexShrink = 0
    }

    return styles
  }

  /**
   * Gets CSS classes for main axis alignment
   * @param alignment - Main axis alignment value
   * @returns CSS class string
   */
  export function getMainAxisAlignmentClass(alignment: MainAxisAlignment): string {
    switch (alignment) {
      case MainAxisAlignment.START:
        return 'justify-start'
      case MainAxisAlignment.CENTER:
        return 'justify-center'
      case MainAxisAlignment.END:
        return 'justify-end'
      case MainAxisAlignment.SPACE_BETWEEN:
        return 'justify-between'
      case MainAxisAlignment.SPACE_AROUND:
        return 'justify-around'
      case MainAxisAlignment.SPACE_EVENLY:
        return 'justify-evenly'
      default:
        return 'justify-start'
    }
  }

  /**
   * Gets CSS classes for cross axis alignment
   * @param alignment - Cross axis alignment value
   * @returns CSS class string
   */
  export function getCrossAxisAlignmentClass(alignment: CrossAxisAlignment): string {
    switch (alignment) {
      case CrossAxisAlignment.START:
        return 'items-start'
      case CrossAxisAlignment.CENTER:
        return 'items-center'
      case CrossAxisAlignment.END:
        return 'items-end'
      case CrossAxisAlignment.STRETCH:
        return 'items-stretch'
      case CrossAxisAlignment.BASELINE:
        return 'items-baseline'
      default:
        return 'items-start'
    }
  }

  /**
   * Gets CSS classes for main axis size
   * @param size - Main axis size value
   * @returns CSS class string
   */
  export function getMainAxisSizeClass(size: MainAxisSize): string {
    switch (size) {
      case MainAxisSize.MIN:
        return 'w-min h-min'
      case MainAxisSize.MAX:
        return 'w-max h-max'
      default:
        return ''
    }
  }
}
