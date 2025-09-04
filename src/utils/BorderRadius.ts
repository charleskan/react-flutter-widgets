export class Radius {
  public readonly x: number
  public readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static circular(radius: number): Radius {
    return new Radius(radius, radius)
  }

  static elliptical(x: number, y: number): Radius {
    return new Radius(x, y)
  }

  static get zero(): Radius {
    return new Radius(0, 0)
  }

  toString(): string {
    if (this.x === this.y) {
      return `${this.x}px`
    }
    return `${this.x}px ${this.y}px`
  }

  equals(other: Radius): boolean {
    return this.x === other.x && this.y === other.y
  }
}

export class BorderRadius {
  public readonly topLeft: Radius
  public readonly topRight: Radius
  public readonly bottomLeft: Radius
  public readonly bottomRight: Radius

  constructor(
    topLeft: Radius = Radius.zero,
    topRight: Radius = Radius.zero,
    bottomLeft: Radius = Radius.zero,
    bottomRight: Radius = Radius.zero
  ) {
    this.topLeft = topLeft
    this.topRight = topRight
    this.bottomLeft = bottomLeft
    this.bottomRight = bottomRight
  }

  static all(radius: Radius): BorderRadius {
    return new BorderRadius(radius, radius, radius, radius)
  }

  static circular(radius: number): BorderRadius {
    const r = Radius.circular(radius)
    return BorderRadius.all(r)
  }

  static horizontal({ left = Radius.zero, right = Radius.zero }: { left?: Radius; right?: Radius } = {}): BorderRadius {
    return new BorderRadius(left, right, left, right)
  }

  static vertical({ top = Radius.zero, bottom = Radius.zero }: { top?: Radius; bottom?: Radius } = {}): BorderRadius {
    return new BorderRadius(top, top, bottom, bottom)
  }

  static only({
    topLeft = Radius.zero,
    topRight = Radius.zero,
    bottomLeft = Radius.zero,
    bottomRight = Radius.zero,
  }: {
    topLeft?: Radius
    topRight?: Radius
    bottomLeft?: Radius
    bottomRight?: Radius
  } = {}): BorderRadius {
    return new BorderRadius(topLeft, topRight, bottomLeft, bottomRight)
  }

  static get zero(): BorderRadius {
    return new BorderRadius()
  }

  copyWith({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  }: {
    topLeft?: Radius
    topRight?: Radius
    bottomLeft?: Radius
    bottomRight?: Radius
  } = {}): BorderRadius {
    return new BorderRadius(
      topLeft ?? this.topLeft,
      topRight ?? this.topRight,
      bottomLeft ?? this.bottomLeft,
      bottomRight ?? this.bottomRight
    )
  }

  add(other: BorderRadius): BorderRadius {
    return new BorderRadius(
      new Radius(this.topLeft.x + other.topLeft.x, this.topLeft.y + other.topLeft.y),
      new Radius(this.topRight.x + other.topRight.x, this.topRight.y + other.topRight.y),
      new Radius(this.bottomLeft.x + other.bottomLeft.x, this.bottomLeft.y + other.bottomLeft.y),
      new Radius(this.bottomRight.x + other.bottomRight.x, this.bottomRight.y + other.bottomRight.y)
    )
  }

  subtract(other: BorderRadius): BorderRadius {
    return new BorderRadius(
      new Radius(this.topLeft.x - other.topLeft.x, this.topLeft.y - other.topLeft.y),
      new Radius(this.topRight.x - other.topRight.x, this.topRight.y - other.topRight.y),
      new Radius(this.bottomLeft.x - other.bottomLeft.x, this.bottomLeft.y - other.bottomLeft.y),
      new Radius(this.bottomRight.x - other.bottomRight.x, this.bottomRight.y - other.bottomRight.y)
    )
  }

  multiply(factor: number): BorderRadius {
    return new BorderRadius(
      new Radius(this.topLeft.x * factor, this.topLeft.y * factor),
      new Radius(this.topRight.x * factor, this.topRight.y * factor),
      new Radius(this.bottomLeft.x * factor, this.bottomLeft.y * factor),
      new Radius(this.bottomRight.x * factor, this.bottomRight.y * factor)
    )
  }

  divide(divisor: number): BorderRadius {
    return new BorderRadius(
      new Radius(this.topLeft.x / divisor, this.topLeft.y / divisor),
      new Radius(this.topRight.x / divisor, this.topRight.y / divisor),
      new Radius(this.bottomLeft.x / divisor, this.bottomLeft.y / divisor),
      new Radius(this.bottomRight.x / divisor, this.bottomRight.y / divisor)
    )
  }

  remainder(divisor: number): BorderRadius {
    return new BorderRadius(
      new Radius(this.topLeft.x % divisor, this.topLeft.y % divisor),
      new Radius(this.topRight.x % divisor, this.topRight.y % divisor),
      new Radius(this.bottomLeft.x % divisor, this.bottomLeft.y % divisor),
      new Radius(this.bottomRight.x % divisor, this.bottomRight.y % divisor)
    )
  }

  integerDivide(divisor: number): BorderRadius {
    return new BorderRadius(
      new Radius(Math.floor(this.topLeft.x / divisor), Math.floor(this.topLeft.y / divisor)),
      new Radius(Math.floor(this.topRight.x / divisor), Math.floor(this.topRight.y / divisor)),
      new Radius(Math.floor(this.bottomLeft.x / divisor), Math.floor(this.bottomLeft.y / divisor)),
      new Radius(Math.floor(this.bottomRight.x / divisor), Math.floor(this.bottomRight.y / divisor))
    )
  }

  negate(): BorderRadius {
    return new BorderRadius(
      new Radius(-this.topLeft.x, -this.topLeft.y),
      new Radius(-this.topRight.x, -this.topRight.y),
      new Radius(-this.bottomLeft.x, -this.bottomLeft.y),
      new Radius(-this.bottomRight.x, -this.bottomRight.y)
    )
  }

  static lerp(a: BorderRadius | null, b: BorderRadius | null, t: number): BorderRadius | null {
    if (a === null && b === null) return null
    if (a === null) return b!.multiply(t)
    if (b === null) return a.multiply(1.0 - t)

    return new BorderRadius(
      new Radius(
        a.topLeft.x + (b.topLeft.x - a.topLeft.x) * t,
        a.topLeft.y + (b.topLeft.y - a.topLeft.y) * t
      ),
      new Radius(
        a.topRight.x + (b.topRight.x - a.topRight.x) * t,
        a.topRight.y + (b.topRight.y - a.topRight.y) * t
      ),
      new Radius(
        a.bottomLeft.x + (b.bottomLeft.x - a.bottomLeft.x) * t,
        a.bottomLeft.y + (b.bottomLeft.y - a.bottomLeft.y) * t
      ),
      new Radius(
        a.bottomRight.x + (b.bottomRight.x - a.bottomRight.x) * t,
        a.bottomRight.y + (b.bottomRight.y - a.bottomRight.y) * t
      )
    )
  }

  resolve(): BorderRadius {
    return this
  }

  toCSS(): string {
    const tl = this.topLeft.toString()
    const tr = this.topRight.toString()
    const bl = this.bottomLeft.toString()
    const br = this.bottomRight.toString()

    if (tl === tr && tr === bl && bl === br) {
      return tl
    }

    if (tl === br && tr === bl) {
      if (tl === tr) {
        return tl
      }
      return `${tl} ${tr}`
    }

    if (tr === bl) {
      return `${tl} ${tr} ${br}`
    }

    return `${tl} ${tr} ${br} ${bl}`
  }

  toString(): string {
    return `BorderRadius(${this.topLeft.toString()}, ${this.topRight.toString()}, ${this.bottomLeft.toString()}, ${this.bottomRight.toString()})`
  }

  equals(other: BorderRadius): boolean {
    return (
      this.topLeft.equals(other.topLeft) &&
      this.topRight.equals(other.topRight) &&
      this.bottomLeft.equals(other.bottomLeft) &&
      this.bottomRight.equals(other.bottomRight)
    )
  }
}