import type { ReactNode } from 'react';
export interface AlignmentGeometry {
    x: number;
    y: number;
}
export interface BoxConstraints {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}
export interface Decoration {
    color?: string;
    borderRadius?: number | string;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    boxShadow?: string;
    gradient?: string;
}
export type Clip = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer';
export interface Matrix4 {
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateY?: number;
}
export declare const Alignment: {
    topLeft: {
        x: number;
        y: number;
    };
    topCenter: {
        x: number;
        y: number;
    };
    topRight: {
        x: number;
        y: number;
    };
    centerLeft: {
        x: number;
        y: number;
    };
    center: {
        x: number;
        y: number;
    };
    centerRight: {
        x: number;
        y: number;
    };
    bottomLeft: {
        x: number;
        y: number;
    };
    bottomCenter: {
        x: number;
        y: number;
    };
    bottomRight: {
        x: number;
        y: number;
    };
};
export interface ContainerProps {
    /** Child content to render inside the container */
    children?: ReactNode;
    /** Align the child within the container */
    alignment?: AlignmentGeometry;
    /** Empty space to inscribe inside the decoration. The child, if any, is placed inside this padding */
    padding?: string;
    /** The color to paint behind the child */
    color?: string;
    /** The decoration to paint behind the child */
    decoration?: Decoration;
    /** The decoration to paint in front of the child */
    foregroundDecoration?: Decoration;
    /** Fixed width of the container */
    width?: number | string;
    /** Fixed height of the container */
    height?: number | string;
    /** Additional constraints to apply to the child */
    constraints?: BoxConstraints;
    /** Empty space to surround the decoration and child */
    margin?: string;
    /** The transformation matrix to apply before painting the container */
    transform?: Matrix4;
    /** The alignment of the origin, relative to the size of the container, if transform is specified */
    transformAlignment?: AlignmentGeometry;
    /** The clip behavior when Container.decoration is not null */
    clipBehavior?: Clip;
    /** @deprecated Use decoration.color instead */
    backgroundColor?: string;
    /** @deprecated Use decoration.borderRadius instead */
    borderRadius?: number | string;
    /** @deprecated Use decoration.borderWidth instead */
    borderWidth?: number;
    /** @deprecated Use decoration.borderColor instead */
    borderColor?: string;
    /** @deprecated Use decoration.borderStyle instead */
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    /** Flex factor for this widget (equivalent to CSS flex-grow) */
    flex?: number;
    /** Whether this widget should expand to fill available space */
    expanded?: boolean;
    /** Whether this widget should be flexible in the flex layout */
    flexible?: boolean;
    /** Whether this widget should not shrink */
    flexShrink?: boolean;
    /** Align self in cross axis when inside a flex container */
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    /** Custom CSS class name (use sparingly) */
    className?: string;
    /** Custom inline styles (use sparingly) */
    style?: React.CSSProperties;
}
/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * // Basic usage with decoration
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   decoration={{
 *     color: "#f5f5f5",
 *     borderRadius: 8,
 *     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
 *   }}
 *   alignment={Alignment.center}
 * >
 *   <div>Content goes here</div>
 * </Container>
 *
 * // With transform and constraints
 * <Container
 *   constraints={{ minHeight: 200, maxWidth: 400 }}
 *   transform={{ rotateZ: 0.1, scaleX: 1.1 }}
 *   transformAlignment={Alignment.center}
 *   clipBehavior="antiAlias"
 * >
 *   <div>Transformed content</div>
 * </Container>
 * ```
 *
 * EdgeInsets methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 */
declare function Container(props: ContainerProps): import("react/jsx-runtime").JSX.Element;
export default Container;
//# sourceMappingURL=Container.d.ts.map