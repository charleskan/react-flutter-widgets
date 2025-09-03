import type { CSSProperties, ReactNode } from 'react'
import { type Clip, CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from './Layout'
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
  /** Vertical direction for layout */
  verticalDirection?: VerticalDirection
  /** Space between children in the main axis */
  spacing?: number
  /** Clip behavior for content overflow */
  clipBehavior?: Clip
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
  // Row inherits all props from FlexProps
  // No additional row-specific props needed
}

export namespace Flex {
  /**
   * Builds flex container CSS styles based on Flutter flex properties
   * @param options - Flutter flex configuration
   * @returns CSS style object
   */
  export function buildFlexStyles(options: {
    spacing?: number
    clipBehavior?: Clip
  }): CSSProperties {
    const { spacing, clipBehavior } = options
    const styles: CSSProperties = {}

    if (spacing !== undefined && spacing > 0) {
      styles.gap = `${spacing}px`
    }

    if (clipBehavior !== undefined) {
      styles.overflow = clipBehavior
    }

    return styles
  }

  /**
   * Builds flex child CSS styles for Container (includes flex/expanded/flexible)
   * @param options - Container flex configuration
   * @returns CSS style object
   */
  export function buildContainerFlexStyles(options: {
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
   * Gets CSS styles for main axis size behavior
   * @param size - Main axis size value
   * @param direction - Flex direction ('row' or 'column')
   * @returns CSS style object
   */
  export function getMainAxisSizeStyles(
    size: MainAxisSize,
    direction: 'row' | 'column',
  ): CSSProperties {
    const styles: CSSProperties = {}

    switch (size) {
      case MainAxisSize.MIN:
        if (direction === 'row') {
          styles.width = 'fit-content'
        } else {
          styles.height = 'fit-content'
        }
        break
      case MainAxisSize.MAX:
        if (direction === 'row') {
          styles.width = '100%'
        } else {
          styles.height = '100%'
        }
        break
    }

    return styles
  }
}
