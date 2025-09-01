import type { CSSProperties, ReactNode } from 'react'

/**
 * Main axis alignment controls how children are positioned along the main axis
 */
export enum MainAxisAlignment {
  START = 'flex-start',
  CENTER = 'center',
  END = 'flex-end',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly',
}

/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
export enum CrossAxisAlignment {
  START = 'flex-start',
  CENTER = 'center',
  END = 'flex-end',
  STRETCH = 'stretch',
  BASELINE = 'baseline',
}

/**
 * Main axis size controls how much space the flex container should occupy
 */
export enum MainAxisSize {
  MIN = 'min-content',
  MAX = 'max-content',
}

/**
 * Text direction for layout purposes
 */
export enum TextDirection {
  LTR = 'ltr',
  RTL = 'rtl',
  AUTO = 'auto',
}

/**
 * Vertical direction for column layout
 */
export enum VerticalDirection {
  UP = 'column-reverse',
  DOWN = 'column',
}

/**
 * Text baseline for alignment
 */
export enum TextBaseline {
  ALPHABETIC = 'alphabetic',
  IDEOGRAPHIC = 'ideographic',
}

/**
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 */
export const EdgeInsets = {
  /**
   * Creates uniform spacing for all sides
   * @param value - The spacing value (number will be converted to px)
   */
  all(value: number | string): string {
    const spacingValue = typeof value === 'number' ? `${value}px` : value
    return spacingValue
  },

  /**
   * Creates symmetric spacing for horizontal and/or vertical sides
   * @param options - Object containing horizontal and/or vertical spacing values
   */
  symmetric(options: {
    horizontal?: number | string
    vertical?: number | string
  }): string {
    const horizontal = options.horizontal
      ? typeof options.horizontal === 'number'
        ? `${options.horizontal}px`
        : options.horizontal
      : '0'
    const vertical = options.vertical
      ? typeof options.vertical === 'number'
        ? `${options.vertical}px`
        : options.vertical
      : '0'

    return `${vertical} ${horizontal}`
  },

  /**
   * Creates spacing with individual control for each side
   * @param options - Object containing left, top, right, and/or bottom spacing values
   */
  only(options: {
    left?: number | string
    top?: number | string
    right?: number | string
    bottom?: number | string
  }): string {
    const top = options.top
      ? typeof options.top === 'number'
        ? `${options.top}px`
        : options.top
      : '0'
    const right = options.right
      ? typeof options.right === 'number'
        ? `${options.right}px`
        : options.right
      : '0'
    const bottom = options.bottom
      ? typeof options.bottom === 'number'
        ? `${options.bottom}px`
        : options.bottom
      : '0'
    const left = options.left
      ? typeof options.left === 'number'
        ? `${options.left}px`
        : options.left
      : '0'

    return `${top} ${right} ${bottom} ${left}`
  },

  /**
   * Creates zero spacing for all sides
   */
  zero(): string {
    return '0'
  },
} as const

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
