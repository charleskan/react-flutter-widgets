import type { CSSProperties, ReactNode } from 'react';
/**
 * Main axis alignment controls how children are positioned along the main axis
 */
export declare enum MainAxisAlignment {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly"
}
/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
export declare enum CrossAxisAlignment {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    STRETCH = "stretch",
    BASELINE = "baseline"
}
/**
 * Main axis size controls how much space the flex container should occupy
 */
export declare enum MainAxisSize {
    MIN = "min-content",
    MAX = "max-content"
}
/**
 * Text direction for layout purposes
 */
export declare enum TextDirection {
    LTR = "ltr",
    RTL = "rtl"
}
/**
 * Vertical direction for column layout
 */
export declare enum VerticalDirection {
    UP = "column-reverse",
    DOWN = "column"
}
/**
 * Text baseline for alignment
 */
export declare enum TextBaseline {
    ALPHABETIC = "alphabetic",
    IDEOGRAPHIC = "ideographic"
}
/**
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
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
     * Creates zero spacing for all sides
     */
    readonly zero: () => string;
};
/**
 * Common flex container props interface following Flutter's layout model
 */
export interface FlexProps {
    /** Child elements to render inside the flex container */
    children: ReactNode;
    /** Main axis alignment of children */
    mainAxisAlignment?: MainAxisAlignment;
    /** Cross axis alignment of children */
    crossAxisAlignment?: CrossAxisAlignment;
    /** How much space the flex container should occupy along the main axis */
    mainAxisSize?: MainAxisSize;
    /** Text direction for layout */
    textDirection?: TextDirection;
    /** Text baseline for cross-axis alignment */
    textBaseline?: TextBaseline;
    /** Flex factor for this widget (equivalent to CSS flex-grow) */
    flex?: number;
    /** Whether this widget should expand to fill available space */
    expanded?: boolean;
    /** Whether this widget should be flexible in the flex layout */
    flexible?: boolean;
    /** Fixed width of the container */
    width?: number | string;
    /** Fixed height of the container */
    height?: number | string;
    /** Padding inside the container - must use EdgeInsets methods */
    padding?: string;
    /** Margin outside the container - must use EdgeInsets methods */
    margin?: string;
}
/**
 * Column component props extending FlexProps with column-specific options
 */
export interface ColumnProps extends FlexProps {
    /** Vertical direction for the column */
    verticalDirection?: VerticalDirection;
}
/**
 * Row component props extending FlexProps with row-specific options
 */
export interface RowProps extends FlexProps {
    /** Text direction affects the horizontal direction in a row */
    textDirection?: TextDirection;
}
export declare namespace Flex {
    /**
     * Builds flex-related CSS styles based on Flutter flex properties
     * @param options - Flutter flex configuration
     * @returns CSS style object
     */
    function buildFlexStyles(options: {
        flex?: number;
        expanded?: boolean;
        flexible?: boolean;
        width?: number | string;
        height?: number | string;
    }): CSSProperties;
    /**
     * Gets CSS classes for main axis alignment
     * @param alignment - Main axis alignment value
     * @returns CSS class string
     */
    function getMainAxisAlignmentClass(alignment: MainAxisAlignment): string;
    /**
     * Gets CSS classes for cross axis alignment
     * @param alignment - Cross axis alignment value
     * @returns CSS class string
     */
    function getCrossAxisAlignmentClass(alignment: CrossAxisAlignment): string;
    /**
     * Gets CSS classes for main axis size
     * @param size - Main axis size value
     * @returns CSS class string
     */
    function getMainAxisSizeClass(size: MainAxisSize): string;
}
//# sourceMappingURL=Flex.type.d.ts.map