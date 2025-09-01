import type { ReactNode } from 'react';
import { AnimationCurve } from './AnimatedContainer';
export interface AnimatedOpacityProps {
    /** Child content to render */
    children?: ReactNode;
    /** Target opacity value (0.0 to 1.0) */
    opacity: number;
    /** Duration of the animation in milliseconds */
    duration: number;
    /** Animation curve/timing function */
    curve?: AnimationCurve | string;
    /** Delay before starting the animation in milliseconds */
    delay?: number;
    /** Callback function called when the animation starts */
    onStart?: () => void;
    /** Callback function called when the animation completes */
    onEnd?: () => void;
    /** Whether the widget should always maintain its size */
    alwaysIncludeSemantics?: boolean;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
/**
 * AnimatedOpacity component equivalent to Flutter's AnimatedOpacity widget.
 * Animates the opacity of its child over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedOpacity
 *   opacity={isVisible ? 1.0 : 0.0}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Fade completed')}
 * >
 *   <div>Content to fade</div>
 * </AnimatedOpacity>
 * ```
 */
declare function AnimatedOpacity(props: AnimatedOpacityProps): import("react/jsx-runtime").JSX.Element;
export default AnimatedOpacity;
//# sourceMappingURL=AnimatedOpacity.d.ts.map