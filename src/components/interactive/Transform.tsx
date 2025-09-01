import type { ReactNode } from 'react'
import { useMemo } from 'react'

/**
 * Matrix4 class for 4x4 transformation matrices
 */
export class Matrix4 {
  public storage: Float64Array

  constructor(
    m00 = 1,
    m01 = 0,
    m02 = 0,
    m03 = 0,
    m10 = 0,
    m11 = 1,
    m12 = 0,
    m13 = 0,
    m20 = 0,
    m21 = 0,
    m22 = 1,
    m23 = 0,
    m30 = 0,
    m31 = 0,
    m32 = 0,
    m33 = 1,
  ) {
    this.storage = new Float64Array([
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33,
    ])
  }

  /**
   * Creates an identity matrix
   */
  static identity(): Matrix4 {
    return new Matrix4()
  }

  /**
   * Creates a translation matrix
   */
  static translationValues(x: number, y: number, z = 0): Matrix4 {
    return new Matrix4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1)
  }

  /**
   * Creates a scale matrix
   */
  static diagonal3Values(x: number, y: number, z = 1): Matrix4 {
    return new Matrix4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
  }

  /**
   * Creates a rotation matrix around Z axis (degrees)
   */
  static rotationZ(radians: number): Matrix4 {
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    return new Matrix4(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  }

  /**
   * Creates a rotation matrix around X axis (radians)
   */
  static rotationX(radians: number): Matrix4 {
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    return new Matrix4(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1)
  }

  /**
   * Creates a rotation matrix around Y axis (radians)
   */
  static rotationY(radians: number): Matrix4 {
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    return new Matrix4(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1)
  }

  /**
   * Creates a skew matrix
   */
  static skewX(radians: number): Matrix4 {
    const tan = Math.tan(radians)
    return new Matrix4(1, tan, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  }

  static skewY(radians: number): Matrix4 {
    const tan = Math.tan(radians)
    return new Matrix4(1, 0, 0, 0, tan, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  }

  /**
   * Multiplies this matrix by another matrix
   */
  multiply(other: Matrix4): Matrix4 {
    const result = new Matrix4()
    const a = this.storage
    const b = other.storage
    const r = result.storage

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const index = i * 4 + j
        r[index] =
          (a[i * 4 + 0] || 0) * (b[0 * 4 + j] || 0) +
          (a[i * 4 + 1] || 0) * (b[1 * 4 + j] || 0) +
          (a[i * 4 + 2] || 0) * (b[2 * 4 + j] || 0) +
          (a[i * 4 + 3] || 0) * (b[3 * 4 + j] || 0)
      }
    }

    return result
  }

  /**
   * Converts to CSS transform matrix3d string
   */
  toCssMatrix3d(): string {
    const m = this.storage
    return `matrix3d(${Array.from(m).join(', ')})`
  }

  /**
   * Converts to CSS transform matrix string (2D)
   */
  toCssMatrix(): string {
    const m = this.storage
    return `matrix(${m[0]}, ${m[4]}, ${m[1]}, ${m[5]}, ${m[3]}, ${m[7]})`
  }

  /**
   * Creates a copy of this matrix
   */
  clone(): Matrix4 {
    const result = new Matrix4()
    result.storage.set(this.storage)
    return result
  }
}

/**
 * Alignment enumeration for transform origin
 */
export enum Alignment {
  topLeft = 'top left',
  topCenter = 'top center',
  topRight = 'top right',
  centerLeft = 'center left',
  center = 'center',
  centerRight = 'center right',
  bottomLeft = 'bottom left',
  bottomCenter = 'bottom center',
  bottomRight = 'bottom right',
}

/**
 * Transform component equivalent to Flutter's Transform widget.
 * Applies 2D and 3D transformations to its child.
 *
 * @example
 * ```tsx
 * <Transform
 *   transform={Matrix4.rotationZ(Math.PI / 4)}
 *   alignment={Alignment.center}
 * >
 *   <div>Rotated content</div>
 * </Transform>
 * ```
 */
export interface TransformProps {
  /** Child content to transform */
  children?: ReactNode

  /** 4x4 transformation matrix */
  transform: Matrix4

  /** Alignment point for the transformation */
  alignment?: Alignment | string

  /** Transform origin as CSS string (e.g., "50% 50%") */
  transformOrigin?: string

  /** Whether to filter the quality of the transformation */
  filterQuality?: FilterQuality

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

export enum FilterQuality {
  /** Use browser default */
  none = 'auto',
  /** Low quality, fast */
  low = 'crisp-edges',
  /** Medium quality */
  medium = 'auto',
  /** High quality, slower */
  high = 'smooth',
}

function Transform({
  children,
  transform,
  alignment = Alignment.center,
  transformOrigin,
  filterQuality = FilterQuality.medium,
  className = '',
  style = {},
}: TransformProps) {
  const transformStyle = useMemo(() => {
    const origin = transformOrigin || alignment

    return {
      transform: transform.toCssMatrix3d(),
      transformOrigin: origin,
      imageRendering: filterQuality as React.CSSProperties['imageRendering'],
    }
  }, [transform, alignment, transformOrigin, filterQuality])

  const containerStyle: React.CSSProperties = {
    ...transformStyle,
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  )
}

/**
 * Transform.rotate - Creates a rotation transformation
 */
Transform.rotate = ({
  angle,
  children,
  alignment = Alignment.center,
  className = '',
  style = {},
}: {
  angle: number
  children?: ReactNode
  alignment?: Alignment | string
  className?: string
  style?: React.CSSProperties
}) => {
  const transform = Matrix4.rotationZ(angle)

  return (
    <Transform transform={transform} alignment={alignment} className={className} style={style}>
      {children}
    </Transform>
  )
}

/**
 * Transform.scale - Creates a scale transformation
 */
Transform.scale = ({
  scale,
  scaleX,
  scaleY,
  children,
  alignment = Alignment.center,
  className = '',
  style = {},
}: {
  scale?: number
  scaleX?: number
  scaleY?: number
  children?: ReactNode
  alignment?: Alignment | string
  className?: string
  style?: React.CSSProperties
}) => {
  const sx = scaleX ?? scale ?? 1
  const sy = scaleY ?? scale ?? 1
  const transform = Matrix4.diagonal3Values(sx, sy)

  return (
    <Transform transform={transform} alignment={alignment} className={className} style={style}>
      {children}
    </Transform>
  )
}

/**
 * Transform.translate - Creates a translation transformation
 */
Transform.translate = ({
  offset,
  x = 0,
  y = 0,
  children,
  className = '',
  style = {},
}: {
  offset?: { x: number; y: number }
  x?: number
  y?: number
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}) => {
  const offsetX = offset?.x ?? x
  const offsetY = offset?.y ?? y
  const transform = Matrix4.translationValues(offsetX, offsetY)

  return (
    <Transform transform={transform} className={className} style={style}>
      {children}
    </Transform>
  )
}

/**
 * Transform.flip - Creates a flip transformation
 */
Transform.flip = ({
  flipX = false,
  flipY = false,
  children,
  alignment = Alignment.center,
  className = '',
  style = {},
}: {
  flipX?: boolean
  flipY?: boolean
  children?: ReactNode
  alignment?: Alignment | string
  className?: string
  style?: React.CSSProperties
}) => {
  const scaleX = flipX ? -1 : 1
  const scaleY = flipY ? -1 : 1
  const transform = Matrix4.diagonal3Values(scaleX, scaleY)

  return (
    <Transform transform={transform} alignment={alignment} className={className} style={style}>
      {children}
    </Transform>
  )
}

/**
 * Utility functions for creating common transformations
 */
export const TransformUtils = {
  /**
   * Convert degrees to radians
   */
  degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  },

  /**
   * Convert radians to degrees
   */
  radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI
  },

  /**
   * Create a combined transformation matrix
   */
  combine(...matrices: Matrix4[]): Matrix4 {
    return matrices.reduce((acc, matrix) => acc.multiply(matrix), Matrix4.identity())
  },

  /**
   * Create a rotation transformation from degrees
   */
  rotationFromDegrees(degrees: number): Matrix4 {
    return Matrix4.rotationZ(this.degreesToRadians(degrees))
  },

  /**
   * Create a complex transformation with translation, rotation, and scale
   */
  createComplex({
    translateX = 0,
    translateY = 0,
    rotation = 0,
    scaleX = 1,
    scaleY = 1,
  }: {
    translateX?: number
    translateY?: number
    rotation?: number
    scaleX?: number
    scaleY?: number
  }): Matrix4 {
    const translate = Matrix4.translationValues(translateX, translateY)
    const rotate = Matrix4.rotationZ(rotation)
    const scale = Matrix4.diagonal3Values(scaleX, scaleY)

    // Apply transformations in order: scale, rotate, translate
    return translate.multiply(rotate).multiply(scale)
  },
}

export default Transform
