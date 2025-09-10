import type { CSSProperties } from 'react';
import type { AlignmentGeometry } from './Alignment';
import type { BorderRadius } from './BorderRadius';
import type { Gradient } from './Gradient';
export type Clip = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer';
/**
 * How the image should be inscribed into the box (Flutter BoxFit equivalent)
 */
export type BoxFit = 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';
/**
 * How to paint any portions of the box that would not otherwise be covered by the image
 */
export type ImageRepeat = 'repeat' | 'repeatX' | 'repeatY' | 'noRepeat';
/**
 * An image for a box decoration (Flutter DecorationImage equivalent)
 */
export interface DecorationImage {
    /** The image to be painted into the decoration */
    image: string;
    /** How the image should be inscribed into the box */
    fit?: BoxFit;
    /** How to align the image within its bounds */
    alignment?: AlignmentGeometry;
    /** How to paint any portions of the box that would not otherwise be covered by the image */
    repeat?: ImageRepeat;
    /** If non-null, the value is multiplied with the opacity of each image pixel before painting */
    opacity?: number;
}
export interface BoxDecoration {
    color?: string;
    image?: DecorationImage;
    borderRadius?: BorderRadius | number | string;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    boxShadow?: string;
    gradient?: Gradient;
}
export declare namespace Decoration {
    /**
     * Converts BoxDecoration to CSS properties
     */
    function toCSS(decoration?: BoxDecoration): CSSProperties;
    /**
     * Converts Clip behavior to CSS classes
     */
    function clipToClasses(clipBehavior?: Clip): string[];
}
//# sourceMappingURL=Decoration.d.ts.map