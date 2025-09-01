import type { ReactNode } from 'react';
/**
 * GestureDetector component equivalent to Flutter's GestureDetector widget.
 * Detects various gestures like tap, double tap, long press, and provides callbacks.
 *
 * @example
 * ```tsx
 * <GestureDetector
 *   onTap={() => console.log('Tapped!')}
 *   onDoubleTap={() => console.log('Double tapped!')}
 *   onLongPress={() => console.log('Long pressed!')}
 * >
 *   <div>Gesture detection area</div>
 * </GestureDetector>
 * ```
 */
export interface GestureDetectorProps {
    /** Child content to render inside the GestureDetector */
    children?: ReactNode;
    /** Callback function when a tap is detected */
    onTap?: () => void;
    /** Callback function when the gesture starts (mouse/touch down) */
    onTapDown?: (details: TapDownDetails) => void;
    /** Callback function when the gesture is released */
    onTapUp?: (details: TapUpDetails) => void;
    /** Callback function when a tap is cancelled */
    onTapCancel?: () => void;
    /** Callback function when a double tap is detected */
    onDoubleTap?: () => void;
    /** Callback function when a long press is detected */
    onLongPress?: () => void;
    /** Callback function when a long press starts */
    onLongPressStart?: (details: LongPressStartDetails) => void;
    /** Callback function when a long press moves */
    onLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void;
    /** Callback function when a long press ends */
    onLongPressEnd?: (details: LongPressEndDetails) => void;
    /** Callback function when a pan/drag starts */
    onPanStart?: (details: DragStartDetails) => void;
    /** Callback function when a pan/drag updates */
    onPanUpdate?: (details: DragUpdateDetails) => void;
    /** Callback function when a pan/drag ends */
    onPanEnd?: (details: DragEndDetails) => void;
    /** Whether the gesture detector should exclude semantics */
    excludeFromSemantics?: boolean;
    /** Behavior for hit testing */
    behavior?: HitTestBehavior;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
export declare enum HitTestBehavior {
    /** Only hit test if the widget has content */
    deferToChild = "deferToChild",
    /** Always hit test, even if no visible content */
    opaque = "opaque",
    /** Never hit test */
    translucent = "translucent"
}
export interface Offset {
    dx: number;
    dy: number;
}
export interface TapDownDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
export interface TapUpDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
export interface LongPressStartDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
export interface LongPressMoveUpdateDetails {
    globalPosition: Offset;
    localPosition: Offset;
    offsetFromOrigin: Offset;
}
export interface LongPressEndDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
export interface DragStartDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
export interface DragUpdateDetails {
    globalPosition: Offset;
    localPosition: Offset;
    delta: Offset;
}
export interface DragEndDetails {
    velocity: Offset;
    primaryVelocity?: number;
}
declare function GestureDetector(props: GestureDetectorProps): import("react/jsx-runtime").JSX.Element;
export default GestureDetector;
//# sourceMappingURL=GestureDetector.d.ts.map