import type { CSSProperties } from 'react'
import type { Gradient } from './Gradient'

export type Clip = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer'

export interface BoxDecoration {
  color?: string
  borderRadius?: number | string
  borderWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  boxShadow?: string
  gradient?: Gradient
}

export namespace Decoration {
  /**
   * Converts BoxDecoration to CSS properties
   */
  export function toCSS(decoration?: BoxDecoration): CSSProperties {
    if (!decoration) return {}

    const styles: CSSProperties = {}

    if (decoration.color) styles.backgroundColor = decoration.color
    if (decoration.borderRadius) {
      styles.borderRadius =
        typeof decoration.borderRadius === 'number'
          ? `${decoration.borderRadius}px`
          : decoration.borderRadius
    }
    if (decoration.borderWidth && decoration.borderWidth > 0) {
      styles.borderWidth = `${decoration.borderWidth}px`
      styles.borderColor = decoration.borderColor
      styles.borderStyle = decoration.borderStyle || 'solid'
    }
    if (decoration.boxShadow) styles.boxShadow = decoration.boxShadow
    if (decoration.gradient) {
      styles.background = decoration.gradient.toCSS()
      // If both color and gradient are specified, gradient takes precedence
      if (decoration.color) {
        styles.backgroundColor = 'transparent'
      }
    }

    return styles
  }

  /**
   * Converts Clip behavior to CSS classes
   */
  export function clipToClasses(clipBehavior?: Clip): string[] {
    if (!clipBehavior || clipBehavior === 'none') return []

    switch (clipBehavior) {
      case 'hardEdge':
        return ['overflow-hidden']
      case 'antiAlias':
        return ['overflow-hidden', 'rounded-inherit']
      case 'antiAliasWithSaveLayer':
        return ['overflow-hidden', 'rounded-inherit', 'isolate']
      default:
        return []
    }
  }
}
