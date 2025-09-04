export interface Size {
  width: number
  height: number
}

export interface Offset {
  dx: number
  dy: number
}

export interface Rect {
  left: number
  top: number
  width: number
  height: number
}

export enum TextDirection {
  ltr = 'ltr',
  rtl = 'rtl',
}

export abstract class AlignmentGeometry {
  abstract readonly x: number
  abstract readonly y: number

  abstract add(other: AlignmentGeometry): AlignmentGeometry
  abstract resolve(direction: TextDirection | null): Alignment

  multiply(factor: number): AlignmentGeometry {
    if (this instanceof Alignment) {
      return new Alignment(this.x * factor, this.y * factor)
    }
    if (this instanceof AlignmentDirectional) {
      return new AlignmentDirectional(this.x * factor, this.y * factor)
    }
    throw new Error('Unknown AlignmentGeometry type')
  }

  divide(factor: number): AlignmentGeometry {
    return this.multiply(1 / factor)
  }

  remainder(factor: number): AlignmentGeometry {
    if (this instanceof Alignment) {
      return new Alignment(this.x % factor, this.y % factor)
    }
    if (this instanceof AlignmentDirectional) {
      return new AlignmentDirectional(this.x % factor, this.y % factor)
    }
    throw new Error('Unknown AlignmentGeometry type')
  }

  integerDivide(factor: number): AlignmentGeometry {
    if (this instanceof Alignment) {
      return new Alignment(Math.floor(this.x / factor), Math.floor(this.y / factor))
    }
    if (this instanceof AlignmentDirectional) {
      return new AlignmentDirectional(Math.floor(this.x / factor), Math.floor(this.y / factor))
    }
    throw new Error('Unknown AlignmentGeometry type')
  }

  negate(): AlignmentGeometry {
    if (this instanceof Alignment) {
      return new Alignment(-this.x, -this.y)
    }
    if (this instanceof AlignmentDirectional) {
      return new AlignmentDirectional(-this.x, -this.y)
    }
    throw new Error('Unknown AlignmentGeometry type')
  }

  equals(other: unknown): boolean {
    return (
      other instanceof AlignmentGeometry &&
      this.x === other.x &&
      this.y === other.y &&
      this.constructor === other.constructor
    )
  }

  get hashCode(): number {
    return this.x * 37 + this.y * 41
  }

  toString(): string {
    return `${this.constructor.name}(${this.x}, ${this.y})`
  }

  static directional(start: number, y: number): AlignmentDirectional {
    return new AlignmentDirectional(start, y)
  }

  static xy(x: number, y: number): Alignment {
    return new Alignment(x, y)
  }

  static lerp(
    a: AlignmentGeometry | null,
    b: AlignmentGeometry | null,
    t: number,
  ): AlignmentGeometry | null {
    if (a === null && b === null) return null
    if (a === null) return b?.multiply(t) ?? null
    if (b === null) return a.multiply(1 - t)

    if (a.constructor === b.constructor) {
      if (a instanceof Alignment && b instanceof Alignment) {
        return new Alignment(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
      }
      if (a instanceof AlignmentDirectional && b instanceof AlignmentDirectional) {
        return new AlignmentDirectional(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
      }
    }

    const resolvedA = a.resolve(TextDirection.ltr)
    const resolvedB = b.resolve(TextDirection.ltr)
    return new Alignment(
      resolvedA.x + (resolvedB.x - resolvedA.x) * t,
      resolvedA.y + (resolvedB.y - resolvedA.y) * t,
    )
  }
}

export class Alignment extends AlignmentGeometry {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }

  add(other: AlignmentGeometry): Alignment {
    const resolved = other.resolve(null)
    return new Alignment(this.x + resolved.x, this.y + resolved.y)
  }

  subtract(other: Alignment): Alignment {
    return new Alignment(this.x - other.x, this.y - other.y)
  }

  multiply(factor: number): Alignment {
    return new Alignment(this.x * factor, this.y * factor)
  }

  divide(factor: number): Alignment {
    return new Alignment(this.x / factor, this.y / factor)
  }

  remainder(factor: number): Alignment {
    return new Alignment(this.x % factor, this.y % factor)
  }

  integerDivide(factor: number): Alignment {
    return new Alignment(Math.floor(this.x / factor), Math.floor(this.y / factor))
  }

  negate(): Alignment {
    return new Alignment(-this.x, -this.y)
  }

  resolve(_direction: TextDirection | null): Alignment {
    return this
  }

  alongOffset(other: Offset): Offset {
    return {
      dx: other.dx * this.x,
      dy: other.dy * this.y,
    }
  }

  alongSize(other: Size): Offset {
    return {
      dx: (other.width / 2) * (1 + this.x),
      dy: (other.height / 2) * (1 + this.y),
    }
  }

  inscribe(size: Size, rect: Rect): Rect {
    const x = rect.left + ((rect.width - size.width) / 2) * (1 + this.x)
    const y = rect.top + ((rect.height - size.height) / 2) * (1 + this.y)
    return {
      left: x,
      top: y,
      width: size.width,
      height: size.height,
    }
  }

  withinRect(rect: Rect): Offset {
    return {
      dx: rect.left + (rect.width / 2) * (1 + this.x),
      dy: rect.top + (rect.height / 2) * (1 + this.y),
    }
  }

  static lerp(a: Alignment | null, b: Alignment | null, t: number): Alignment | null {
    if (a === null && b === null) return null
    if (a === null) return b?.multiply(t) ?? null
    if (b === null) return a.multiply(1 - t)
    return new Alignment(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
  }

  // Static constants
  static readonly topLeft = new Alignment(-1, -1)
  static readonly topCenter = new Alignment(0, -1)
  static readonly topRight = new Alignment(1, -1)
  static readonly centerLeft = new Alignment(-1, 0)
  static readonly center = new Alignment(0, 0)
  static readonly centerRight = new Alignment(1, 0)
  static readonly bottomLeft = new Alignment(-1, 1)
  static readonly bottomCenter = new Alignment(0, 1)
  static readonly bottomRight = new Alignment(1, 1)
}

export class AlignmentDirectional extends AlignmentGeometry {
  readonly start: number
  readonly y: number

  get x(): number {
    return this.start
  }

  constructor(start: number, y: number) {
    super()
    this.start = start
    this.y = y
  }

  add(other: AlignmentGeometry): AlignmentDirectional {
    if (other instanceof AlignmentDirectional) {
      return new AlignmentDirectional(this.start + other.start, this.y + other.y)
    }
    return new AlignmentDirectional(this.start + other.x, this.y + other.y)
  }

  resolve(direction: TextDirection | null): Alignment {
    if (direction === TextDirection.rtl) {
      return new Alignment(-this.start, this.y)
    }
    return new Alignment(this.start, this.y)
  }

  // Static constants
  static readonly topStart = new AlignmentDirectional(-1, -1)
  static readonly topCenter = new AlignmentDirectional(0, -1)
  static readonly topEnd = new AlignmentDirectional(1, -1)
  static readonly centerStart = new AlignmentDirectional(-1, 0)
  static readonly center = new AlignmentDirectional(0, 0)
  static readonly centerEnd = new AlignmentDirectional(1, 0)
  static readonly bottomStart = new AlignmentDirectional(-1, 1)
  static readonly bottomCenter = new AlignmentDirectional(0, 1)
  static readonly bottomEnd = new AlignmentDirectional(1, 1)
}

/**
 * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
 */
export function alignmentToCSS(alignment: AlignmentGeometry): { x: string; y: string } {
  const resolved = alignment.resolve(null)
  const x = (((resolved.x + 1) / 2) * 100).toFixed(1)
  const y = (((resolved.y + 1) / 2) * 100).toFixed(1)
  return { x: `${x}%`, y: `${y}%` }
}

/**
 * Converts alignment to CSS justify-content and align-items classes for flexbox
 */
export function alignmentToFlexClasses(alignment: AlignmentGeometry): string[] {
  const resolved = alignment.resolve(null)
  const classes: string[] = ['flex']

  // Justify content (x-axis)
  if (resolved.x === -1) classes.push('justify-start')
  else if (resolved.x === 0) classes.push('justify-center')
  else if (resolved.x === 1) classes.push('justify-end')

  // Align items (y-axis)
  if (resolved.y === -1) classes.push('items-start')
  else if (resolved.y === 0) classes.push('items-center')
  else if (resolved.y === 1) classes.push('items-end')

  return classes
}

/**
 * Converts alignment to CSS transform-origin property
 */
export function alignmentToTransformOrigin(alignment: AlignmentGeometry): string {
  const resolved = alignment.resolve(null)
  const originX = resolved.x === -1 ? 'left' : resolved.x === 0 ? 'center' : 'right'
  const originY = resolved.y === -1 ? 'top' : resolved.y === 0 ? 'center' : 'bottom'
  return `${originX} ${originY}`
}

// Legacy constant exports for backward compatibility
export const AlignmentConstants = {
  topLeft: Alignment.topLeft,
  topCenter: Alignment.topCenter,
  topRight: Alignment.topRight,
  centerLeft: Alignment.centerLeft,
  center: Alignment.center,
  centerRight: Alignment.centerRight,
  bottomLeft: Alignment.bottomLeft,
  bottomCenter: Alignment.bottomCenter,
  bottomRight: Alignment.bottomRight,
} as const
