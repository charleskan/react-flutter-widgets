import type { CSSProperties } from 'react'
import { Alignment, type AlignmentGeometry } from './Alignment'

export interface Matrix4 {
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  scaleX?: number
  scaleY?: number
  translateX?: number
  translateY?: number
}

export namespace Matrix4 {
  /**
   * Creates an identity matrix (no transformation)
   */
  export function identity(): Matrix4 {
    return {}
  }

  /**
   * Creates a translation matrix
   */
  export function translationValues(x: number, y: number, _z?: number): Matrix4 {
    return {
      translateX: x,
      translateY: y,
    }
  }

  /**
   * Creates a rotation matrix around Z axis
   */
  export function rotationZ(radians: number): Matrix4 {
    return {
      rotateZ: radians,
    }
  }

  /**
   * Creates a scale matrix
   */
  export function diagonal3Values(x: number, y: number, _z?: number): Matrix4 {
    return {
      scaleX: x,
      scaleY: y,
    }
  }

  /**
   * Creates a skew matrix (approximated using scale and rotation)
   */
  export function skew(alpha: number, _beta: number): Matrix4 {
    // Note: This is a simplified implementation
    // Full skew transformation would require more complex CSS
    return {
      rotateZ: alpha * 0.1, // Approximate skew with rotation
    }
  }

  /**
   * Converts Matrix4 to CSS transform and transform-origin properties
   */
  export function toCSS(
    transform?: Matrix4,
    transformAlignment?: AlignmentGeometry,
  ): CSSProperties {
    if (!transform) return {}

    const transforms: string[] = []

    if (transform.translateX !== undefined) transforms.push(`translateX(${transform.translateX}px)`)
    if (transform.translateY !== undefined) transforms.push(`translateY(${transform.translateY}px)`)
    if (transform.scaleX !== undefined) transforms.push(`scaleX(${transform.scaleX})`)
    if (transform.scaleY !== undefined) transforms.push(`scaleY(${transform.scaleY})`)
    if (transform.rotateX !== undefined) transforms.push(`rotateX(${transform.rotateX}rad)`)
    if (transform.rotateY !== undefined) transforms.push(`rotateY(${transform.rotateY}rad)`)
    if (transform.rotateZ !== undefined) transforms.push(`rotateZ(${transform.rotateZ}rad)`)

    const styles: CSSProperties = {}
    if (transforms.length > 0) {
      styles.transform = transforms.join(' ')
    }

    if (transformAlignment) {
      styles.transformOrigin = Alignment.toTransformOrigin(transformAlignment)
    }

    return styles
  }
}
