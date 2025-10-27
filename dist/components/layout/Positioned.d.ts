import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { TextDirection } from '../../utils/Alignment';
/**
 * Properties for the Positioned component.
 * Equivalent to Flutter's Positioned widget properties.
 */
export interface PositionedProps {
    /** The distance that the child's left edge is inset from the left of the stack */
    left?: number | string;
    /** The distance that the child's top edge is inset from the top of the stack */
    top?: number | string;
    /** The distance that the child's right edge is inset from the right of the stack */
    right?: number | string;
    /** The distance that the child's bottom edge is inset from the bottom of the stack */
    bottom?: number | string;
    /** The child's width (cannot be used with both left and right) */
    width?: number | string;
    /** The child's height (cannot be used with both top and bottom) */
    height?: number | string;
    /** The child widget */
    child?: ReactNode;
    /** React-style children prop (alternative to child) */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * Properties for Positioned.directional
 */
export interface PositionedDirectionalProps {
    /** The distance from the start edge */
    start?: number | string;
    /** The distance that the child's top edge is inset from the top of the stack */
    top?: number | string;
    /** The distance from the end edge */
    end?: number | string;
    /** The distance that the child's bottom edge is inset from the bottom of the stack */
    bottom?: number | string;
    /** The child's width */
    width?: number | string;
    /** The child's height */
    height?: number | string;
    /** Text direction for resolving start/end */
    textDirection: TextDirection;
    /** The child widget */
    child?: ReactNode;
    /** React-style children prop (alternative to child) */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * Properties for Positioned.fill
 */
export interface PositionedFillProps {
    /** The distance that the child's left edge is inset from the left of the stack */
    left?: number | string;
    /** The distance that the child's top edge is inset from the top of the stack */
    top?: number | string;
    /** The distance that the child's right edge is inset from the right of the stack */
    right?: number | string;
    /** The distance that the child's bottom edge is inset from the bottom of the stack */
    bottom?: number | string;
    /** The child widget */
    child?: ReactNode;
    /** React-style children prop (alternative to child) */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * A widget that controls where a child of a Stack is positioned.
 *
 * A Positioned widget must be a descendant of a Stack. If a widget is wrapped in a
 * Positioned, then it is a positioned widget in its Stack. If the top property is
 * non-null, the top edge of this child will be positioned that many units from the
 * top of the stack. The right, bottom, and left properties work analogously.
 *
 * If both the top and bottom properties are non-null, then the child will be forced
 * to have exactly the height required to satisfy both constraints. Similarly, setting
 * the right and left properties to non-null values will force the child to have a
 * particular width.
 *
 * @example
 * ```tsx
 * // Basic positioned child
 * <Stack>
 *   <Positioned
 *     top={10}
 *     left={20}
 *   >
 *     <Container width={100} height={100} color="blue" />
 *   </Positioned>
 * </Stack>
 *
 * // Stretch child to fill area
 * <Stack>
 *   <Positioned
 *     top={0}
 *     left={0}
 *     right={0}
 *     bottom={0}
 *   >
 *     <Container color="rgba(0,0,0,0.5)" />
 *   </Positioned>
 * </Stack>
 *
 * // Position with width and height
 * <Stack>
 *   <Positioned
 *     top={10}
 *     right={10}
 *     width={100}
 *     height={50}
 *   >
 *     <Text>Top Right</Text>
 *   </Positioned>
 * </Stack>
 * ```
 */
export declare function Positioned({ left, top, right, bottom, width, height, child, children, className, style, }: PositionedProps): ReactElement;
export declare namespace Positioned {
    var fill: ({ left, top, right, bottom, child, children, className, style, }: PositionedFillProps) => ReactElement;
    var directional: ({ start, top, end, bottom, width, height, textDirection, child, children, className, style, }: PositionedDirectionalProps) => ReactElement;
    var displayName: string;
}
export default Positioned;
//# sourceMappingURL=Positioned.d.ts.map