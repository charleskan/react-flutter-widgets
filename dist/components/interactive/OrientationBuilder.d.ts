import type { ReactNode } from 'react';
import { Orientation } from './MediaQuery';
/**
 * Builder function type that receives orientation and returns content
 */
export type OrientationWidgetBuilder = (orientation: Orientation) => ReactNode;
/**
 * OrientationBuilder component equivalent to Flutter's OrientationBuilder widget.
 * Builds content based on the current screen orientation.
 *
 * @example
 * ```tsx
 * <OrientationBuilder builder={(orientation) => {
 *   if (orientation === Orientation.landscape) {
 *     return <LandscapeLayout />
 *   } else {
 *     return <PortraitLayout />
 *   }
 * }} />
 * ```
 */
export interface OrientationBuilderProps {
    /** Builder function that receives orientation and returns content */
    builder: OrientationWidgetBuilder;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function OrientationBuilder({ builder, className, style }: OrientationBuilderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to get the current screen orientation
 */
export declare function useOrientation(): Orientation;
/**
 * Hook to check if the current orientation matches the specified orientation
 */
export declare function useOrientationMatch(targetOrientation: Orientation): boolean;
/**
 * Hook that returns different values based on orientation
 */
export declare function useOrientationValue<T>(portraitValue: T, landscapeValue: T): T;
/**
 * Utility functions for working with orientation
 */
export declare const OrientationUtils: {
    /**
     * Check if the current orientation is portrait
     */
    isPortrait(): boolean;
    /**
     * Check if the current orientation is landscape
     */
    isLandscape(): boolean;
    /**
     * Get the rotation angle (if supported)
     */
    getRotationAngle(): number;
    /**
     * Get aspect ratio of the screen
     */
    getAspectRatio(): number;
    /**
     * Check if the device is likely a mobile device based on orientation capabilities
     */
    isMobileDevice(): boolean;
};
export default OrientationBuilder;
//# sourceMappingURL=OrientationBuilder.d.ts.map