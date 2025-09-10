/**
 * Props interface aligning with Flutter's Divider widget
 */
export interface DividerProps {
    /** The divider's height extent */
    height?: number;
    /** The thickness of the line drawn within the divider */
    thickness?: number;
    /** The amount of empty space to the leading edge of the divider */
    indent?: number;
    /** The amount of empty space to the trailing edge of the divider */
    endIndent?: number;
    /** The color to use when painting the line */
    color?: string;
    /** The amount of radius for the border of the divider */
    radius?: number;
    /** Custom CSS class name */
    className?: string;
}
/**
 * A Flutter Divider widget-inspired React component for creating horizontal dividers.
 *
 * A thin horizontal line, with padding on either side.
 * In the Material Design language, this represents a divider.
 * Dividers can be used in lists, Drawers, and elsewhere to separate content.
 *
 * The box's total height is controlled by height. The appropriate padding is automatically computed from the height.
 *
 * @example
 * ```tsx
 * // Basic divider
 * <Divider />
 *
 * // Custom styled divider
 * <Divider
 *   height={20}
 *   thickness={5}
 *   indent={20}
 *   color="#000000"
 * />
 *
 * // Divider with rounded corners
 * <Divider
 *   thickness={2}
 *   color="#e5e7eb"
 *   radius={1}
 * />
 * ```
 */
export declare const Divider: ({ height, thickness, indent, endIndent, color, radius, className, }: DividerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map