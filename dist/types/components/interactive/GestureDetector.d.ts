import type React from "react";
import { type ReactNode } from "react";
/**
 * Flutter-style GestureDetector for the web (React + PointerEvents)
 * - Approximates Flutter's GestureDetector semantics for websites.
 * - Uses Pointer Events to unify mouse, touch, pen.
 * - Implements: tap, double tap, long press (with slop), pan/drag, optional scale (pinch/rotate alt.).
 * - Attempts to mirror HitTestBehavior semantics.
 */
export declare enum HitTestBehavior {
    /** Only hit test if a child is hit. */
    deferToChild = "deferToChild",
    /** Treat as hit even if it has no visible content. */
    opaque = "opaque",
    /** Consider hit even if it is transparent; do not block children. */
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
export interface ScaleStartDetails {
    focalPoint: Offset;
    localFocalPoint: Offset;
    pointers: number;
}
export interface ScaleUpdateDetails {
    focalPoint: Offset;
    localFocalPoint: Offset;
    scale: number;
    rotation: number;
    horizontalScale: number;
    verticalScale: number;
    pointers: number;
}
export interface ScaleEndDetails {
    velocity: Offset;
    pointers: number;
}
export interface GestureDetectorProps {
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    behavior?: HitTestBehavior;
    excludeFromSemantics?: boolean;
    ariaLabel?: string;
    onTap?: () => void;
    onTapDown?: (d: TapDownDetails) => void;
    onTapUp?: (d: TapUpDetails) => void;
    onTapCancel?: () => void;
    onDoubleTap?: () => void;
    onLongPress?: () => void;
    onLongPressStart?: (d: LongPressStartDetails) => void;
    onLongPressMoveUpdate?: (d: LongPressMoveUpdateDetails) => void;
    onLongPressEnd?: (d: LongPressEndDetails) => void;
    onPanStart?: (d: DragStartDetails) => void;
    onPanUpdate?: (d: DragUpdateDetails) => void;
    onPanEnd?: (d: DragEndDetails) => void;
    onScaleStart?: (d: ScaleStartDetails) => void;
    onScaleUpdate?: (d: ScaleUpdateDetails) => void;
    onScaleEnd?: (d: ScaleEndDetails) => void;
    longPressDelay?: number;
    doubleTapDelay?: number;
    tapSlop?: number;
    panSlop?: number;
    longPressMoveTolerance?: number;
}
export default function GestureDetector({ children, className, style, behavior, excludeFromSemantics, ariaLabel, onTap, onTapDown, onTapUp, onTapCancel, onDoubleTap, onLongPress, onLongPressStart, onLongPressMoveUpdate, onLongPressEnd, onPanStart, onPanUpdate, onPanEnd, onScaleStart, onScaleUpdate, onScaleEnd, longPressDelay, doubleTapDelay, tapSlop, panSlop, longPressMoveTolerance }: GestureDetectorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=GestureDetector.d.ts.map