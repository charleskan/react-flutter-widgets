import type { CSSProperties } from 'react';
export interface BoxConstraints {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}
export declare namespace BoxConstraints {
    /**
     * Converts BoxConstraints to CSS properties
     */
    function toCSS(constraints?: BoxConstraints): CSSProperties;
    /**
     * Creates BoxConstraints that expand to fill available space
     */
    function expand(width?: number, height?: number): BoxConstraints;
    /**
     * Creates BoxConstraints with tight dimensions
     */
    function tight(width: number, height: number): BoxConstraints;
    /**
     * Creates BoxConstraints with tight width
     */
    function tightFor(options: {
        width?: number;
        height?: number;
    }): BoxConstraints;
    /**
     * Creates BoxConstraints with loose constraints
     */
    function loose(maxWidth?: number, maxHeight?: number): BoxConstraints;
}
//# sourceMappingURL=BoxConstraints.d.ts.map