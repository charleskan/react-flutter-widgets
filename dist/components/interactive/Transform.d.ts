import type { ReactNode } from 'react';
/**
 * Matrix4 class for 4x4 transformation matrices
 */
export declare class Matrix4 {
    storage: Float64Array;
    constructor(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number);
    /**
     * Creates an identity matrix
     */
    static identity(): Matrix4;
    /**
     * Creates a translation matrix
     */
    static translationValues(x: number, y: number, z?: number): Matrix4;
    /**
     * Creates a scale matrix
     */
    static diagonal3Values(x: number, y: number, z?: number): Matrix4;
    /**
     * Creates a rotation matrix around Z axis (degrees)
     */
    static rotationZ(radians: number): Matrix4;
    /**
     * Creates a rotation matrix around X axis (radians)
     */
    static rotationX(radians: number): Matrix4;
    /**
     * Creates a rotation matrix around Y axis (radians)
     */
    static rotationY(radians: number): Matrix4;
    /**
     * Creates a skew matrix
     */
    static skewX(radians: number): Matrix4;
    static skewY(radians: number): Matrix4;
    /**
     * Multiplies this matrix by another matrix
     */
    multiply(other: Matrix4): Matrix4;
    /**
     * Converts to CSS transform matrix3d string
     */
    toCssMatrix3d(): string;
    /**
     * Converts to CSS transform matrix string (2D)
     */
    toCssMatrix(): string;
    /**
     * Creates a copy of this matrix
     */
    clone(): Matrix4;
}
/**
 * Alignment enumeration for transform origin
 */
export declare enum Alignment {
    topLeft = "top left",
    topCenter = "top center",
    topRight = "top right",
    centerLeft = "center left",
    center = "center",
    centerRight = "center right",
    bottomLeft = "bottom left",
    bottomCenter = "bottom center",
    bottomRight = "bottom right"
}
/**
 * Transform component equivalent to Flutter's Transform widget.
 * Applies 2D and 3D transformations to its child.
 *
 * @example
 * ```tsx
 * <Transform
 *   transform={Matrix4.rotationZ(Math.PI / 4)}
 *   alignment={Alignment.center}
 * >
 *   <div>Rotated content</div>
 * </Transform>
 * ```
 */
export interface TransformProps {
    /** Child content to transform */
    children?: ReactNode;
    /** 4x4 transformation matrix */
    transform: Matrix4;
    /** Alignment point for the transformation */
    alignment?: Alignment | string;
    /** Transform origin as CSS string (e.g., "50% 50%") */
    transformOrigin?: string;
    /** Whether to filter the quality of the transformation */
    filterQuality?: FilterQuality;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
export declare enum FilterQuality {
    /** Use browser default */
    none = "auto",
    /** Low quality, fast */
    low = "crisp-edges",
    /** Medium quality */
    medium = "auto",
    /** High quality, slower */
    high = "smooth"
}
declare function Transform({ children, transform, alignment, transformOrigin, filterQuality, className, style, }: TransformProps): import("react/jsx-runtime").JSX.Element;
declare namespace Transform {
    var rotate: ({ angle, children, alignment, className, style, }: {
        angle: number;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => import("react/jsx-runtime").JSX.Element;
    var scale: ({ scale, scaleX, scaleY, children, alignment, className, style, }: {
        scale?: number;
        scaleX?: number;
        scaleY?: number;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => import("react/jsx-runtime").JSX.Element;
    var translate: ({ offset, x, y, children, className, style, }: {
        offset?: {
            x: number;
            y: number;
        };
        x?: number;
        y?: number;
        children?: ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }) => import("react/jsx-runtime").JSX.Element;
    var flip: ({ flipX, flipY, children, alignment, className, style, }: {
        flipX?: boolean;
        flipY?: boolean;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => import("react/jsx-runtime").JSX.Element;
}
/**
 * Utility functions for creating common transformations
 */
export declare const TransformUtils: {
    /**
     * Convert degrees to radians
     */
    degreesToRadians(degrees: number): number;
    /**
     * Convert radians to degrees
     */
    radiansToDegrees(radians: number): number;
    /**
     * Create a combined transformation matrix
     */
    combine(...matrices: Matrix4[]): Matrix4;
    /**
     * Create a rotation transformation from degrees
     */
    rotationFromDegrees(degrees: number): Matrix4;
    /**
     * Create a complex transformation with translation, rotation, and scale
     */
    createComplex({ translateX, translateY, rotation, scaleX, scaleY, }: {
        translateX?: number;
        translateY?: number;
        rotation?: number;
        scaleX?: number;
        scaleY?: number;
    }): Matrix4;
};
export default Transform;
//# sourceMappingURL=Transform.d.ts.map