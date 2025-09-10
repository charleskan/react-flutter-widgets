import type { CSSProperties } from 'react';
import { type AlignmentGeometry } from './Alignment';
export interface Matrix4 {
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateY?: number;
}
export declare namespace Matrix4 {
    /**
     * Creates an identity matrix (no transformation)
     */
    function identity(): Matrix4;
    /**
     * Creates a translation matrix
     */
    function translationValues(x: number, y: number, _z?: number): Matrix4;
    /**
     * Creates a rotation matrix around Z axis
     */
    function rotationZ(radians: number): Matrix4;
    /**
     * Creates a scale matrix
     */
    function diagonal3Values(x: number, y: number, _z?: number): Matrix4;
    /**
     * Creates a skew matrix (approximated using scale and rotation)
     */
    function skew(alpha: number, _beta: number): Matrix4;
    /**
     * Converts Matrix4 to CSS transform and transform-origin properties
     */
    function toCSS(transform?: Matrix4, transformAlignment?: AlignmentGeometry): CSSProperties;
}
//# sourceMappingURL=Matrix4.d.ts.map