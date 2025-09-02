/**
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 * Following Flutter's EdgeInsets class API for consistent spacing management
 */
export declare const EdgeInsets: {
    /**
     * Creates uniform spacing for all sides
     * @param value - The spacing value (number will be converted to px)
     */
    readonly all: (value: number | string) => string;
    /**
     * Creates symmetric spacing for horizontal and/or vertical sides
     * @param options - Object containing horizontal and/or vertical spacing values
     */
    readonly symmetric: (options: {
        horizontal?: number | string;
        vertical?: number | string;
    }) => string;
    /**
     * Creates spacing with individual control for each side
     * @param options - Object containing left, top, right, and/or bottom spacing values
     */
    readonly only: (options: {
        left?: number | string;
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
    }) => string;
    /**
     * Creates spacing by specifying all four sides explicitly (Left, Top, Right, Bottom)
     * @param left - Left spacing value
     * @param top - Top spacing value
     * @param right - Right spacing value
     * @param bottom - Bottom spacing value
     */
    readonly fromLTRB: (left: number | string, top: number | string, right: number | string, bottom: number | string) => string;
    /**
     * Creates zero spacing for all sides
     */
    readonly zero: () => string;
};
//# sourceMappingURL=EdgeInsets.d.ts.map