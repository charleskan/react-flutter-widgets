import type { ReactNode } from 'react';
export interface Size {
    width: number;
    height: number;
}
export interface EdgeInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export declare enum Orientation {
    portrait = "portrait",
    landscape = "landscape"
}
export declare enum Brightness {
    light = "light",
    dark = "dark"
}
export interface MediaQueryData {
    size: Size;
    devicePixelRatio: number;
    orientation: Orientation;
    padding: EdgeInsets;
    viewInsets: EdgeInsets;
    textScaleFactor: number;
    platformBrightness: Brightness;
    disableAnimations: boolean;
    highContrast: boolean;
    supportsTouch: boolean;
}
export interface MediaQueryBreakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}
export declare const defaultBreakpoints: MediaQueryBreakpoints;
type MediaQueryContextValue = MediaQueryData & {
    breakpoints: MediaQueryBreakpoints;
};
export interface MediaQueryProps {
    children: ReactNode;
    breakpoints?: MediaQueryBreakpoints;
    data?: MediaQueryData;
}
export default function MediaQuery({ children, breakpoints, data, }: MediaQueryProps): import("react/jsx-runtime").JSX.Element;
export declare function useMediaQuery(): MediaQueryContextValue;
export declare function useBreakpoint(breakpoints?: MediaQueryBreakpoints): "xl" | "lg" | "md" | "sm" | "xs";
export declare function useBreakpointMatch(condition: string, breakpoints?: MediaQueryBreakpoints): boolean;
export {};
//# sourceMappingURL=MediaQuery.d.ts.map