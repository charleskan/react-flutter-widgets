import type { ReactNode } from 'react';
/**
 * Opacity component equivalent to Flutter's Opacity widget.
 * Makes its child partially transparent.
 *
 * @example
 * ```tsx
 * <Opacity opacity={0.5}>
 *   <div>Semi-transparent content</div>
 * </Opacity>
 * ```
 */
export interface OpacityProps {
    /** Child content to make transparent */
    children?: ReactNode;
    /** The opacity value (0.0 to 1.0) */
    opacity: number;
    /** Whether the widget should always maintain its size */
    alwaysIncludeSemantics?: boolean;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function Opacity({ children, opacity, alwaysIncludeSemantics, className, style, }: OpacityProps): import("react/jsx-runtime").JSX.Element;
export default Opacity;
//# sourceMappingURL=Opacity.d.ts.map