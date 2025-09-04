export declare class Radius {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    static circular(radius: number): Radius;
    static elliptical(x: number, y: number): Radius;
    static get zero(): Radius;
    toString(): string;
    equals(other: Radius): boolean;
}
export declare class BorderRadius {
    readonly topLeft: Radius;
    readonly topRight: Radius;
    readonly bottomLeft: Radius;
    readonly bottomRight: Radius;
    constructor(topLeft?: Radius, topRight?: Radius, bottomLeft?: Radius, bottomRight?: Radius);
    static all(radius: Radius): BorderRadius;
    static circular(radius: number): BorderRadius;
    static horizontal({ left, right }?: {
        left?: Radius;
        right?: Radius;
    }): BorderRadius;
    static vertical({ top, bottom }?: {
        top?: Radius;
        bottom?: Radius;
    }): BorderRadius;
    static only({ topLeft, topRight, bottomLeft, bottomRight, }?: {
        topLeft?: Radius;
        topRight?: Radius;
        bottomLeft?: Radius;
        bottomRight?: Radius;
    }): BorderRadius;
    static get zero(): BorderRadius;
    copyWith({ topLeft, topRight, bottomLeft, bottomRight, }?: {
        topLeft?: Radius;
        topRight?: Radius;
        bottomLeft?: Radius;
        bottomRight?: Radius;
    }): BorderRadius;
    add(other: BorderRadius): BorderRadius;
    subtract(other: BorderRadius): BorderRadius;
    multiply(factor: number): BorderRadius;
    divide(divisor: number): BorderRadius;
    remainder(divisor: number): BorderRadius;
    integerDivide(divisor: number): BorderRadius;
    negate(): BorderRadius;
    static lerp(a: BorderRadius | null, b: BorderRadius | null, t: number): BorderRadius | null;
    resolve(): BorderRadius;
    toCSS(): string;
    toString(): string;
    equals(other: BorderRadius): boolean;
}
//# sourceMappingURL=BorderRadius.d.ts.map