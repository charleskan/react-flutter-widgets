import type { CSSProperties } from 'react';
import type { BorderRadius } from './BorderRadius';
import type { Gradient } from './Gradient';
export type Clip = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer';
export interface BoxDecoration {
    color?: string;
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