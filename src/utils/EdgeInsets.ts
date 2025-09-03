export class EdgeInsets {
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number

  constructor(top: number, right: number, bottom: number, left: number) {
    this.top = top
    this.right = right
    this.bottom = bottom
    this.left = left
  }

  /**
   * Creates EdgeInsets with the same value for all sides
   */
  static all(value: number): EdgeInsets {
    return new EdgeInsets(value, value, value, value)
  }

  /**
   * Creates EdgeInsets with symmetric horizontal and vertical values
   */
  static symmetric(options: { horizontal?: number; vertical?: number }): EdgeInsets {
    const horizontal = options.horizontal || 0
    const vertical = options.vertical || 0
    return new EdgeInsets(vertical, horizontal, vertical, horizontal)
  }

  /**
   * Creates EdgeInsets with individual side values
   */
  static only(options: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }): EdgeInsets {
    return new EdgeInsets(
      options.top || 0,
      options.right || 0,
      options.bottom || 0,
      options.left || 0,
    )
  }

  /**
   * An EdgeInsets with zero offsets in each direction
   */
  static readonly zero = new EdgeInsets(0, 0, 0, 0)

  /**
   * Creates EdgeInsets from LTRB (left, top, right, bottom) values
   * This matches Flutter's EdgeInsets.fromLTRB constructor
   */
  static fromLTRB(left: number, top: number, right: number, bottom: number): EdgeInsets {
    return new EdgeInsets(top, right, bottom, left)
  }

  /**
   * Converts EdgeInsets to CSS padding string
   */
  toPadding(): string {
    if (this.top === this.right && this.right === this.bottom && this.bottom === this.left) {
      return `${this.top}px`
    }
    if (this.top === this.bottom && this.left === this.right) {
      return `${this.top}px ${this.right}px`
    }
    return `${this.top}px ${this.right}px ${this.bottom}px ${this.left}px`
  }

  /**
   * Converts EdgeInsets to CSS margin string
   */
  toMargin(): string {
    return this.toPadding()
  }

  /**
   * Converts EdgeInsets to CSS object for padding
   */
  toPaddingObject(): {
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  } {
    return {
      paddingTop: `${this.top}px`,
      paddingRight: `${this.right}px`,
      paddingBottom: `${this.bottom}px`,
      paddingLeft: `${this.left}px`,
    }
  }

  /**
   * Converts EdgeInsets to CSS object for margin
   */
  toMarginObject(): {
    marginTop: string
    marginRight: string
    marginBottom: string
    marginLeft: string
  } {
    return {
      marginTop: `${this.top}px`,
      marginRight: `${this.right}px`,
      marginBottom: `${this.bottom}px`,
      marginLeft: `${this.left}px`,
    }
  }

  /**
   * Returns a new EdgeInsets with added values
   */
  add(other: EdgeInsets): EdgeInsets {
    return new EdgeInsets(
      this.top + other.top,
      this.right + other.right,
      this.bottom + other.bottom,
      this.left + other.left,
    )
  }

  /**
   * Returns a new EdgeInsets with subtracted values
   */
  subtract(other: EdgeInsets): EdgeInsets {
    return new EdgeInsets(
      this.top - other.top,
      this.right - other.right,
      this.bottom - other.bottom,
      this.left - other.left,
    )
  }

  /**
   * Returns true if all sides are equal to zero
   */
  get isZero(): boolean {
    return this.top === 0 && this.right === 0 && this.bottom === 0 && this.left === 0
  }

  /**
   * Returns true if all sides are equal
   */
  get isUniform(): boolean {
    return this.top === this.right && this.right === this.bottom && this.bottom === this.left
  }

  /**
   * Creates a copy of this EdgeInsets with optional modifications
   */
  copyWith(options: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }): EdgeInsets {
    return new EdgeInsets(
      options.top !== undefined ? options.top : this.top,
      options.right !== undefined ? options.right : this.right,
      options.bottom !== undefined ? options.bottom : this.bottom,
      options.left !== undefined ? options.left : this.left,
    )
  }

  toString(): string {
    return `EdgeInsets(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`
  }

  equals(other: EdgeInsets): boolean {
    return (
      this.top === other.top &&
      this.right === other.right &&
      this.bottom === other.bottom &&
      this.left === other.left
    )
  }

  /**
   * The total offset in the horizontal direction
   */
  get horizontal(): number {
    return this.left + this.right
  }

  /**
   * The total offset in the vertical direction
   */
  get vertical(): number {
    return this.top + this.bottom
  }

  /**
   * Returns a new rect that is smaller than the given rect in each direction
   * by the amount of inset in each direction
   */
  deflateRect(rect: { x: number; y: number; width: number; height: number }): {
    x: number
    y: number
    width: number
    height: number
  } {
    return {
      x: rect.x + this.left,
      y: rect.y + this.top,
      width: rect.width - this.horizontal,
      height: rect.height - this.vertical,
    }
  }

  /**
   * Returns a new rect that is bigger than the given rect in each direction
   * by the amount of inset in each direction
   */
  inflateRect(rect: { x: number; y: number; width: number; height: number }): {
    x: number
    y: number
    width: number
    height: number
  } {
    return {
      x: rect.x - this.left,
      y: rect.y - this.top,
      width: rect.width + this.horizontal,
      height: rect.height + this.vertical,
    }
  }

  /**
   * Returns a new size that is smaller than the given size by the amount
   * of inset in the horizontal and vertical directions
   */
  deflateSize(size: { width: number; height: number }): { width: number; height: number } {
    return {
      width: size.width - this.horizontal,
      height: size.height - this.vertical,
    }
  }

  /**
   * Returns a new size that is bigger than the given size by the amount
   * of inset in the horizontal and vertical directions
   */
  inflateSize(size: { width: number; height: number }): { width: number; height: number } {
    return {
      width: size.width + this.horizontal,
      height: size.height + this.vertical,
    }
  }

  /**
   * Whether every dimension is non-negative
   */
  get isNonNegative(): boolean {
    return this.top >= 0 && this.right >= 0 && this.bottom >= 0 && this.left >= 0
  }

  /**
   * Returns an EdgeInsets with top and bottom as well as left and right flipped
   */
  get flipped(): EdgeInsets {
    return new EdgeInsets(this.bottom, this.left, this.top, this.right)
  }
}
