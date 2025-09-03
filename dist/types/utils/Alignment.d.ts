export interface AlignmentGeometry {
    x: number;
    y: number;
}
export declare class Alignment {
    static readonly topLeft: AlignmentGeometry;
    static readonly topCenter: AlignmentGeometry;
    static readonly topRight: AlignmentGeometry;
    static readonly centerLeft: AlignmentGeometry;
    static readonly center: AlignmentGeometry;
    static readonly centerRight: AlignmentGeometry;
    static readonly bottomLeft: AlignmentGeometry;
    static readonly bottomCenter: AlignmentGeometry;
    static readonly bottomRight: AlignmentGeometry;
    /**
     * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
     */
    static toCSS(alignment: AlignmentGeometry): {
        x: string;
        y: string;
    };
    /**
     * Converts alignment to CSS justify-content and align-items classes for flexbox
     */
    static toFlexClasses(alignment: AlignmentGeometry): string[];
    /**
     * Converts alignment to CSS transform-origin property
     */
    static toTransformOrigin(alignment: AlignmentGeometry): string;
}
//# sourceMappingURL=Alignment.d.ts.map