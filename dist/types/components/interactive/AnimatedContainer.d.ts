import type { ContainerProps } from '../layout/Container';
/**
 * AnimatedContainer component equivalent to Flutter's AnimatedContainer widget.
 * Automatically animates changes to its properties over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedContainer
 *   width={isExpanded ? 200 : 100}
 *   height={isExpanded ? 200 : 100}
 *   backgroundColor={isExpanded ? '#ff0000' : '#0000ff'}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Animation completed')}
 * >
 *   <span>Animated content</span>
 * </AnimatedContainer>
 * ```
 */
export interface AnimatedContainerProps extends Omit<ContainerProps, 'style'> {
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
    /** Custom inline styles (will be merged with animated styles) */
    style?: React.CSSProperties;
}
export declare enum AnimationCurve {
    /** Linear animation curve */
    linear = "linear",
    /** Ease animation curve (default) */
    ease = "ease",
    /** Ease-in animation curve */
    easeIn = "ease-in",
    /** Ease-out animation curve */
    easeOut = "ease-out",
    /** Ease-in-out animation curve */
    easeInOut = "ease-in-out",
    /** Bounce animation curve */
    bounceIn = "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    /** Elastic animation curve */
    elasticIn = "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    /** Fast out slow in (Material Design) */
    fastOutSlowIn = "cubic-bezier(0.4, 0, 0.2, 1)",
    /** Decelerate (Material Design) */
    decelerate = "cubic-bezier(0, 0, 0.2, 1)"
}
declare function AnimatedContainer(props: AnimatedContainerProps): import("react/jsx-runtime").JSX.Element;
export default AnimatedContainer;
//# sourceMappingURL=AnimatedContainer.d.ts.map