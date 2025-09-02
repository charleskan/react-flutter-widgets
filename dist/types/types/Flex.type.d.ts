import type { CSSProperties, ReactNode } from 'react';
import { MainAxisAlignment, CrossAxisAlignment, MainAxisSize } from './Layout';
import type { VerticalDirection } from './Layout';
import type { TextDirection, TextBaseline } from './Text';
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