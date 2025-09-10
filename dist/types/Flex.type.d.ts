import type { CSSProperties, ReactNode } from 'react';
import { type Clip, CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from './Layout';
import type { VerticalDirection } from './Layout';
import type { TextBaseline, TextDirection } from './Text';
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
    /** Vertical direction for layout */
    verticalDirection?: VerticalDirection;
    /** Space between children in the main axis */
    spacing?: number;
    /** Clip behavior for content overflow */
    clipBehavior?: Clip;
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
}
export declare namespace Flex {
    /**
     * Builds flex container CSS styles based on Flutter flex properties
     * @param options - Flutter flex configuration
     * @returns CSS style object
     */
    function buildFlexStyles(options: {
        spacing?: number;
        clipBehavior?: Clip;
    }): CSSProperties;
    /**
     * Builds flex child CSS styles for Container (includes flex/expanded/flexible)
     * @param options - Container flex configuration
     * @returns CSS style object
     */
    function buildContainerFlexStyles(options: {
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
     * Gets CSS styles for main axis size behavior
     * @param size - Main axis size value
     * @param direction - Flex direction ('row' or 'column')
     * @returns CSS style object
     */
    function getMainAxisSizeStyles(size: MainAxisSize, direction: 'row' | 'column'): CSSProperties;
}
//# sourceMappingURL=Flex.type.d.ts.map