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
   * Creates EdgeInsets with zero values for all sides
   */
  static zero(): EdgeInsets {
    return new EdgeInsets(0, 0, 0, 0)
  }

  /**
   * Creates EdgeInsets from TRBL (top, right, bottom, left) values
   */
  static fromTRBL(top: number, right: number, bottom: number, left: number): EdgeInsets {
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
}
