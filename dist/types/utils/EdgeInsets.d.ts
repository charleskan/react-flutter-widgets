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
     * Creates EdgeInsets with zero values for all sides
     */
    static zero(): EdgeInsets;
    /**
     * Creates EdgeInsets from TRBL (top, right, bottom, left) values
     */
    static fromTRBL(top: number, right: number, bottom: number, left: number): EdgeInsets;
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
}
//# sourceMappingURL=EdgeInsets.d.ts.map