import type { ReactNode } from 'react';
/**
 * BoxConstraints interface equivalent to Flutter's BoxConstraints
 */
export interface BoxConstraints {
    /** Minimum width constraint */
    minWidth: number;
    /** Maximum width constraint */
    maxWidth: number;
    /** Minimum height constraint */
    minHeight: number;
    /** Maximum height constraint */
    maxHeight: number;
    /** Whether the width is bounded (has a finite maximum) */
    hasBoundedWidth: boolean;
    /** Whether the height is bounded (has a finite maximum) */
    hasBoundedHeight: boolean;
    /** Whether the width is tightly constrained (min equals max) */
    hasTightWidth: boolean;
    /** Whether the height is tightly constrained (min equals max) */
    hasTightHeight: boolean;
    /** Whether both dimensions are tightly constrained */
    isTight: boolean;
    /** Whether the constraints allow any size */
    isNormalized: boolean;
}
/**
 * Builder function type that receives constraints and returns content
 */
export type LayoutWidgetBuilder = (constraints: BoxConstraints) => ReactNode;
/**
 * LayoutBuilder component equivalent to Flutter's LayoutBuilder widget.
 * Builds content based on the available space constraints.
 *
 * @example
 * ```tsx
 * <LayoutBuilder builder={(constraints) => {
 *   if (constraints.maxWidth > 600) {
 *     return <DesktopLayout />
 *   } else {
 *     return <MobileLayout />
 *   }
 * }} />
 * ```
 */
export interface LayoutBuilderProps {
    /** Builder function that receives constraints and returns content */
    builder: LayoutWidgetBuilder;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function LayoutBuilder({ builder, className, style }: LayoutBuilderProps): import("react/jsx-runtime").JSX.Element;
export declare function createBoxConstraints({ minWidth, maxWidth, minHeight, maxHeight, }: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}): BoxConstraints;
export declare function createTightConstraints(width: number, height: number): BoxConstraints;
export declare function createLooseConstraints(maxWidth?: number, maxHeight?: number): BoxConstraints;
export declare function createExpandedConstraints(): BoxConstraints;
export declare const BoxConstraintsUtils: {
    /**
     * Returns the biggest size that satisfies the constraints
     */
    biggest(constraints: BoxConstraints): {
        width: number;
        height: number;
    };
    /**
     * Returns the smallest size that satisfies the constraints
     */
    smallest(constraints: BoxConstraints): {
        width: number;
        height: number;
    };
    /**
     * Returns a size that attempts to be the specified size within the constraints
     */
    constrain(constraints: BoxConstraints, width: number, height: number): {
        width: number;
        height: number;
    };
    /**
     * Returns constraints with width constrained to the given value
     */
    tighten(constraints: BoxConstraints, width?: number, height?: number): BoxConstraints;
    /**
     * Returns constraints with the width and height loosened
     */
    loosen(constraints: BoxConstraints): BoxConstraints;
    /**
     * Returns constraints with the width tightened to the given value
     */
    tightenWidth(constraints: BoxConstraints, width: number): BoxConstraints;
    /**
     * Returns constraints with the height tightened to the given value
     */
    tightenHeight(constraints: BoxConstraints, height: number): BoxConstraints;
};
export default LayoutBuilder;
//# sourceMappingURL=LayoutBuilder.d.ts.map