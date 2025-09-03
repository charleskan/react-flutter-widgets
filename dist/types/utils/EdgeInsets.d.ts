export declare class EdgeInsets {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
    constructor(top: number, right: number, bottom: number, left: number);
    /**
     * Creates EdgeInsets with the same value for all sides
     */
    static all(value: number): EdgeInsets;
    /**
     * Creates EdgeInsets with symmetric horizontal and vertical values
     */
    static symmetric(options: {
        horizontal?: number;
        vertical?: number;
    }): EdgeInsets;
    /**
     * Creates EdgeInsets with individual side values
     */
    static only(options: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    }): EdgeInsets;
    /**
     * An EdgeInsets with zero offsets in each direction
     */
    static readonly zero: EdgeInsets;
    /**
     * Creates EdgeInsets from LTRB (left, top, right, bottom) values
     * This matches Flutter's EdgeInsets.fromLTRB constructor
     */
    static fromLTRB(left: number, top: number, right: number, bottom: number): EdgeInsets;
    /**
     * Converts EdgeInsets to CSS padding string
     */
    toPadding(): string;
    /**
     * Converts EdgeInsets to CSS margin string
     */
    toMargin(): string;
    /**
     * Converts EdgeInsets to CSS object for padding
     */
    toPaddingObject(): {
        paddingTop: string;
        paddingRight: string;
        paddingBottom: string;
        paddingLeft: string;
    };
    /**
     * Converts EdgeInsets to CSS object for margin
     */
    toMarginObject(): {
        marginTop: string;
        marginRight: string;
        marginBottom: string;
        marginLeft: string;
    };
    /**
     * Returns a new EdgeInsets with added values
     */
    add(other: EdgeInsets): EdgeInsets;
    /**
     * Returns a new EdgeInsets with subtracted values
     */
    subtract(other: EdgeInsets): EdgeInsets;
    /**
     * Returns true if all sides are equal to zero
     */
    get isZero(): boolean;
    /**
     * Returns true if all sides are equal
     */
    get isUniform(): boolean;
    /**
     * Creates a copy of this EdgeInsets with optional modifications
     */
    copyWith(options: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    }): EdgeInsets;
    toString(): string;
    equals(other: EdgeInsets): boolean;
    /**
     * The total offset in the horizontal direction
     */
    get horizontal(): number;
    /**
     * The total offset in the vertical direction
     */
    get vertical(): number;
    /**
     * Returns a new rect that is smaller than the given rect in each direction
     * by the amount of inset in each direction
     */
    deflateRect(rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Returns a new rect that is bigger than the given rect in each direction
     * by the amount of inset in each direction
     */
    inflateRect(rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Returns a new size that is smaller than the given size by the amount
     * of inset in the horizontal and vertical directions
     */
    deflateSize(size: {
        width: number;
        height: number;
    }): {
        width: number;
        height: number;
    };
    /**
     * Returns a new size that is bigger than the given size by the amount
     * of inset in the horizontal and vertical directions
     */
    inflateSize(size: {
        width: number;
        height: number;
    }): {
        width: number;
        height: number;
    };
    /**
     * Whether every dimension is non-negative
     */
    get isNonNegative(): boolean;
    /**
     * Returns an EdgeInsets with top and bottom as well as left and right flipped
     */
    get flipped(): EdgeInsets;
}
//# sourceMappingURL=EdgeInsets.d.ts.map