/**
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 * Following Flutter's EdgeInsets class API for consistent spacing management
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
   * Creates spacing by specifying all four sides explicitly (Left, Top, Right, Bottom)
   * @param left - Left spacing value
   * @param top - Top spacing value  
   * @param right - Right spacing value
   * @param bottom - Bottom spacing value
   */
  fromLTRB(
    left: number | string,
    top: number | string,
    right: number | string, 
    bottom: number | string
  ): string {
    const topValue = typeof top === 'number' ? `${top}px` : top
    const rightValue = typeof right === 'number' ? `${right}px` : right
    const bottomValue = typeof bottom === 'number' ? `${bottom}px` : bottom
    const leftValue = typeof left === 'number' ? `${left}px` : left

    return `${topValue} ${rightValue} ${bottomValue} ${leftValue}`
  },

  /**
   * Creates zero spacing for all sides
   */
  zero(): string {
    return '0'
  },
} as const