import type { CSSProperties } from 'react'
import type { AlignmentGeometry } from './Alignment'
import { alignmentToCSS } from './Alignment'
import type { BorderRadius } from './BorderRadius'
import type { Gradient } from './Gradient'

export type Clip = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer'

/**
 * How the image should be inscribed into the box (Flutter BoxFit equivalent)
 */
export type BoxFit = 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown'

/**
 * How to paint any portions of the box that would not otherwise be covered by the image
 */
export type ImageRepeat = 'repeat' | 'repeatX' | 'repeatY' | 'noRepeat'

/**
 * An image for a box decoration (Flutter DecorationImage equivalent)
 */
export interface DecorationImage {
  /** The image to be painted into the decoration */
  image: string
  /** How the image should be inscribed into the box */
  fit?: BoxFit
  /** How to align the image within its bounds */
  alignment?: AlignmentGeometry
  /** How to paint any portions of the box that would not otherwise be covered by the image */
  repeat?: ImageRepeat
  /** If non-null, the value is multiplied with the opacity of each image pixel before painting */
  opacity?: number
}

export interface BoxDecoration {
  color?: string
  image?: DecorationImage
  borderRadius?: BorderRadius | number | string
  borderWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  boxShadow?: string
  gradient?: Gradient
}

export namespace Decoration {
  /**
   * Converts BoxFit to CSS object-fit
   */
  function boxFitToCSS(fit?: BoxFit): string {
    switch (fit) {
      case 'fill':
        return 'fill'
      case 'contain':
        return 'contain'
      case 'cover':
        return 'cover'
      case 'fitWidth':
        return 'scale-down'
      case 'fitHeight':
        return 'scale-down'
      case 'none':
        return 'none'
      case 'scaleDown':
        return 'scale-down'
      default:
        return 'cover'
    }
  }

  /**
   * Converts ImageRepeat to CSS background-repeat
   */
  function imageRepeatToCSS(repeat?: ImageRepeat): string {
    switch (repeat) {
      case 'repeat':
        return 'repeat'
      case 'repeatX':
        return 'repeat-x'
      case 'repeatY':
        return 'repeat-y'
      case 'noRepeat':
        return 'no-repeat'
      default:
        return 'no-repeat'
    }
  }

  /**
   * Converts DecorationImage to CSS properties
   */
  function decorationImageToCSS(image: DecorationImage): CSSProperties {
    const styles: CSSProperties = {}

    // Set background image
    styles.backgroundImage = `url(${image.image})`

    // Set background size based on fit
    if (image.fit) {
      if (image.fit === 'fitWidth') {
        styles.backgroundSize = '100% auto'
      } else if (image.fit === 'fitHeight') {
        styles.backgroundSize = 'auto 100%'
      } else {
        // For other fit values that correspond directly to CSS
        const cssObjectFit = boxFitToCSS(image.fit)
        if (cssObjectFit === 'fill') {
          styles.backgroundSize = '100% 100%'
        } else if (cssObjectFit === 'contain') {
          styles.backgroundSize = 'contain'
        } else if (cssObjectFit === 'cover') {
          styles.backgroundSize = 'cover'
        } else if (cssObjectFit === 'none') {
          styles.backgroundSize = 'auto'
        } else {
          styles.backgroundSize = 'contain'
        }
      }
    } else {
      styles.backgroundSize = 'cover'
    }

    // Set background position based on alignment
    if (image.alignment) {
      const alignment = alignmentToCSS(image.alignment)
      styles.backgroundPosition = `${alignment.x} ${alignment.y}`
    } else {
      styles.backgroundPosition = 'center center'
    }

    // Set background repeat
    styles.backgroundRepeat = imageRepeatToCSS(image.repeat)

    // Set opacity if specified
    if (image.opacity !== undefined && image.opacity < 1) {
      styles.opacity = image.opacity
    }

    return styles
  }

  /**
   * Converts BoxDecoration to CSS properties
   */
  export function toCSS(decoration?: BoxDecoration): CSSProperties {
    if (!decoration) return {}

    const styles: CSSProperties = {}

    if (decoration.color) styles.backgroundColor = decoration.color
    if (decoration.borderRadius) {
      if (typeof decoration.borderRadius === 'object' && 'toCSS' in decoration.borderRadius) {
        styles.borderRadius = decoration.borderRadius.toCSS()
      } else if (typeof decoration.borderRadius === 'number') {
        styles.borderRadius = `${decoration.borderRadius}px`
      } else {
        styles.borderRadius = decoration.borderRadius
      }
    }
    if (decoration.borderWidth && decoration.borderWidth > 0) {
      styles.borderWidth = `${decoration.borderWidth}px`
      styles.borderColor = decoration.borderColor
      styles.borderStyle = decoration.borderStyle || 'solid'
    }
    if (decoration.boxShadow) styles.boxShadow = decoration.boxShadow

    // Handle background layers: color -> gradient -> image (in CSS stacking order)
    // Image goes on top (first in CSS background shorthand)
    if (decoration.image) {
      const imageStyles = decorationImageToCSS(decoration.image)
      Object.assign(styles, imageStyles)
    }

    // Gradient goes in the middle
    if (decoration.gradient) {
      if (decoration.image) {
        // If both image and gradient, use multiple backgrounds
        const currentBg = styles.backgroundImage as string
        styles.backgroundImage = `${currentBg}, ${decoration.gradient.toCSS()}`
      } else {
        styles.background = decoration.gradient.toCSS()
        if (decoration.color) {
          styles.backgroundColor = 'transparent'
        }
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
