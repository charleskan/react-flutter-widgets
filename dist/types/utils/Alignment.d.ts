export interface AlignmentGeometry {
    x: number;
    y: number;
}
export declare const Alignment: {
    readonly topLeft: {
        readonly x: -1;
        readonly y: -1;
    };
    readonly topCenter: {
        readonly x: 0;
        readonly y: -1;
    };
    readonly topRight: {
        readonly x: 1;
        readonly y: -1;
    };
    readonly centerLeft: {
        readonly x: -1;
        readonly y: 0;
    };
    readonly center: {
        readonly x: 0;
        readonly y: 0;
    };
    readonly centerRight: {
        readonly x: 1;
        readonly y: 0;
    };
    readonly bottomLeft: {
        readonly x: -1;
        readonly y: 1;
    };
    readonly bottomCenter: {
        readonly x: 0;
        readonly y: 1;
    };
    readonly bottomRight: {
        readonly x: 1;
        readonly y: 1;
    };
};
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
//# sourceMappingURL=Alignment.d.ts.map