import type { CSSProperties } from 'react'

export interface BoxConstraints {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export namespace BoxConstraints {
  /**
   * Converts BoxConstraints to CSS properties
   */
  export function toCSS(constraints?: BoxConstraints): CSSProperties {
    if (!constraints) return {}

    const styles: CSSProperties = {}
    if (constraints.minWidth !== undefined) styles.minWidth = constraints.minWidth
    if (constraints.maxWidth !== undefined) styles.maxWidth = constraints.maxWidth
    if (constraints.minHeight !== undefined) styles.minHeight = constraints.minHeight
    if (constraints.maxHeight !== undefined) styles.maxHeight = constraints.maxHeight

    return styles
  }

  /**
   * Creates BoxConstraints that expand to fill available space
   */
  export function expand(width?: number, height?: number): BoxConstraints {
    return {
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height,
    }
  }

  /**
   * Creates BoxConstraints with tight dimensions
   */
  export function tight(width: number, height: number): BoxConstraints {
    return {
      minWidth: width,
      maxWidth: width,
      minHeight: height,
      maxHeight: height,
    }
  }

  /**
   * Creates BoxConstraints with tight width
   */
  export function tightFor(options: { width?: number; height?: number }): BoxConstraints {
    return {
      minWidth: options.width,
      maxWidth: options.width,
      minHeight: options.height,
      maxHeight: options.height,
    }
  }

  /**
   * Creates BoxConstraints with loose constraints
   */
  export function loose(maxWidth?: number, maxHeight?: number): BoxConstraints {
    return {
      minWidth: 0,
      maxWidth: maxWidth,
      minHeight: 0,
      maxHeight: maxHeight,
    }
  }
}
