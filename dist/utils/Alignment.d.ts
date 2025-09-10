export interface Size {
    width: number;
    height: number;
}
export interface Offset {
    dx: number;
    dy: number;
}
export interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export declare enum TextDirection {
    ltr = "ltr",
    rtl = "rtl"
}
export declare abstract class AlignmentGeometry {
    abstract readonly x: number;
    abstract readonly y: number;
    abstract add(other: AlignmentGeometry): AlignmentGeometry;
    abstract resolve(direction: TextDirection | null): Alignment;
    multiply(factor: number): AlignmentGeometry;
    divide(factor: number): AlignmentGeometry;
    remainder(factor: number): AlignmentGeometry;
    integerDivide(factor: number): AlignmentGeometry;
    negate(): AlignmentGeometry;
    equals(other: unknown): boolean;
    get hashCode(): number;
    toString(): string;
    static directional(start: number, y: number): AlignmentDirectional;
    static xy(x: number, y: number): Alignment;
    static lerp(a: AlignmentGeometry | null, b: AlignmentGeometry | null, t: number): AlignmentGeometry | null;
}
export declare class Alignment extends AlignmentGeometry {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    add(other: AlignmentGeometry): Alignment;
    subtract(other: Alignment): Alignment;
    multiply(factor: number): Alignment;
    divide(factor: number): Alignment;
    remainder(factor: number): Alignment;
    integerDivide(factor: number): Alignment;
    negate(): Alignment;
    resolve(_direction: TextDirection | null): Alignment;
    alongOffset(other: Offset): Offset;
    alongSize(other: Size): Offset;
    inscribe(size: Size, rect: Rect): Rect;
    withinRect(rect: Rect): Offset;
    static lerp(a: Alignment | null, b: Alignment | null, t: number): Alignment | null;
    static readonly topLeft: Alignment;
    static readonly topCenter: Alignment;
    static readonly topRight: Alignment;
    static readonly centerLeft: Alignment;
    static readonly center: Alignment;
    static readonly centerRight: Alignment;
    static readonly bottomLeft: Alignment;
    static readonly bottomCenter: Alignment;
    static readonly bottomRight: Alignment;
}
export declare class AlignmentDirectional extends AlignmentGeometry {
    readonly start: number;
    readonly y: number;
    get x(): number;
    constructor(start: number, y: number);
    add(other: AlignmentGeometry): AlignmentDirectional;
    resolve(direction: TextDirection | null): Alignment;
    static readonly topStart: AlignmentDirectional;
    static readonly topCenter: AlignmentDirectional;
    static readonly topEnd: AlignmentDirectional;
    static readonly centerStart: AlignmentDirectional;
    static readonly center: AlignmentDirectional;
    static readonly centerEnd: AlignmentDirectional;
    static readonly bottomStart: AlignmentDirectional;
    static readonly bottomCenter: AlignmentDirectional;
    static readonly bottomEnd: AlignmentDirectional;
}
/**
 * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
 */
export declare function alignmentToCSS(alignment: AlignmentGeometry): {
    x: string;
    y: string;
};
/**
 * Converts alignment to CSS justify-content and align-items classes for flexbox
 */
export declare function alignmentToFlexClasses(alignment: AlignmentGeometry): string[];
/**
 * Converts alignment to CSS transform-origin property
 */
export declare function alignmentToTransformOrigin(alignment: AlignmentGeometry): string;
export declare const AlignmentConstants: {
    readonly topLeft: Alignment;
    readonly topCenter: Alignment;
    readonly topRight: Alignment;
    readonly centerLeft: Alignment;
    readonly center: Alignment;
    readonly centerRight: Alignment;
    readonly bottomLeft: Alignment;
    readonly bottomCenter: Alignment;
    readonly bottomRight: Alignment;
};
//# sourceMappingURL=Alignment.d.ts.map