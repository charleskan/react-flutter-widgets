import type React from "react";
import { type ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Flutter-style GestureDetector for the web (React + PointerEvents)
 * - Approximates Flutter's GestureDetector semantics for websites.
 * - Uses Pointer Events to unify mouse, touch, pen.
 * - Implements: tap, double tap, long press (with slop), pan/drag, optional scale (pinch/rotate alt.).
 * - Attempts to mirror HitTestBehavior semantics.
 */

// ===== Types aligned to Flutter naming =====
export enum HitTestBehavior {
  /** Only hit test if a child is hit. */
  deferToChild = "deferToChild",
  /** Treat as hit even if it has no visible content. */
  opaque = "opaque",
  /** Consider hit even if it is transparent; do not block children. */
  translucent = "translucent",
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
  rotation: number; // rotation in radians
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

  // Hit testing / semantics
  behavior?: HitTestBehavior;
  excludeFromSemantics?: boolean;
  ariaLabel?: string;

  // Tap
  onTap?: () => void;
  onTapDown?: (d: TapDownDetails) => void;
  onTapUp?: (d: TapUpDetails) => void;
  onTapCancel?: () => void;
  onDoubleTap?: () => void;

  // Long press
  onLongPress?: () => void;
  onLongPressStart?: (d: LongPressStartDetails) => void;
  onLongPressMoveUpdate?: (d: LongPressMoveUpdateDetails) => void;
  onLongPressEnd?: (d: LongPressEndDetails) => void;

  // Pan / drag (generic)
  onPanStart?: (d: DragStartDetails) => void;
  onPanUpdate?: (d: DragUpdateDetails) => void;
  onPanEnd?: (d: DragEndDetails) => void;

  // Scale (pinch) – optional
  onScaleStart?: (d: ScaleStartDetails) => void;
  onScaleUpdate?: (d: ScaleUpdateDetails) => void;
  onScaleEnd?: (d: ScaleEndDetails) => void;

  // Tunables (in logical CSS pixels / ms)
  longPressDelay?: number; // default 500ms
  doubleTapDelay?: number; // default 300ms
  tapSlop?: number; // default 10px
  panSlop?: number; // default 10px
  longPressMoveTolerance?: number; // default 6px
}

// ===== Internal helpers =====
class VelocityTracker {
  private samples: { t: number; x: number; y: number }[] = [];
  constructor(private windowMs = 120) {}
  push(x: number, y: number) {
    const now = performance.now();
    this.samples.push({ t: now, x, y });
    const cutoff = now - this.windowMs;
    while (this.samples.length && this.samples[0] && this.samples[0].t < cutoff) {
      this.samples.shift();
    }
  }
  getVelocity(): Offset {
    if (this.samples.length < 2) return { dx: 0, dy: 0 };
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    if (!first || !last) return { dx: 0, dy: 0 };
    const dt = Math.max(1, last.t - first.t) / 1000; // seconds, avoid 0
    return { dx: (last.x - first.x) / dt, dy: (last.y - first.y) / dt };
  }
}

function getLocal(div: HTMLDivElement | null, x: number, y: number): Offset {
  if (!div) return { dx: x, dy: y };
  const r = div.getBoundingClientRect();
  return { dx: x - r.left, dy: y - r.top };
}

function distance(a: Offset, b: Offset) {
  const dx = a.dx - b.dx;
  const dy = a.dy - b.dy;
  return Math.hypot(dx, dy);
}

// ===== Component =====
export default function GestureDetector({ children, className, style, behavior = HitTestBehavior.deferToChild, excludeFromSemantics = false, ariaLabel, onTap, onTapDown, onTapUp, onTapCancel, onDoubleTap, onLongPress, onLongPressStart, onLongPressMoveUpdate, onLongPressEnd, onPanStart, onPanUpdate, onPanEnd, onScaleStart, onScaleUpdate, onScaleEnd, longPressDelay = 500, doubleTapDelay = 300, tapSlop = 10, panSlop = 10, longPressMoveTolerance = 6 }: GestureDetectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(false);
  const startGlobal = useRef<Offset | null>(null);
  const lastGlobal = useRef<Offset | null>(null);
  const startTimeRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const waitingSingleTapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPanningRef = useRef(false);
  const isLongPressRef = useRef(false);
  const vTracker = useRef(new VelocityTracker());

  // Multi-pointer for scale
  const activePointers = useRef<Map<number, Offset>>(new Map());
  const scaleActiveRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (waitingSingleTapRef.current) {
      clearTimeout(waitingSingleTapRef.current);
      waitingSingleTapRef.current = null;
    }
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const pointerCount = useCallback(() => activePointers.current.size, []);

  const getFocal = useCallback((): Offset => {
    let sx = 0;
    let sy = 0;
    let n = 0;
    for (const p of activePointers.current.values()) {
      sx += p.dx;
      sy += p.dy;
      n++;
    }
    return n ? { dx: sx / n, dy: sy / n } : { dx: 0, dy: 0 };
  }, []);

  const getScaleRotate = useCallback((prev: Map<number, Offset>, curr: Map<number, Offset>) => {
    // Return average scale and rotation between prev and curr pointers
    const ids = [...curr.keys()].filter((id) => prev.has(id));
    if (ids.length < 2) return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
    // Use first two pointers for simplicity (Flutter does more)
    const id0 = ids[0];
    const id1 = ids[1];
    if (id0 === undefined || id1 === undefined) return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
    const a0 = prev.get(id0);
    const a1 = prev.get(id1);
    const b0 = curr.get(id0);
    const b1 = curr.get(id1);
    if (!a0 || !a1 || !b0 || !b1) return { scale: 1, rotation: 0, hScale: 1, vScale: 1 };
    const da = { dx: a1.dx - a0.dx, dy: a1.dy - a0.dy };
    const db = { dx: b1.dx - b0.dx, dy: b1.dy - b0.dy };
    const la = Math.hypot(da.dx, da.dy) || 1;
    const lb = Math.hypot(db.dx, db.dy) || 1;
    const scale = lb / la;
    const rotA = Math.atan2(da.dy, da.dx);
    const rotB = Math.atan2(db.dy, db.dx);
    const rotation = rotB - rotA; // radians
    // Axis scales (rough): project db onto axes of da
    const cos = Math.cos(rotA);
    const sin = Math.sin(rotA);
    const par = (db.dx * cos + db.dy * sin) / la;
    const perp = (-db.dx * sin + db.dy * cos) / la;
    const hScale = Math.hypot(par, 0) || 1; // magnitude along axis
    const vScale = Math.hypot(perp, 0) || 1; // magnitude perpendicular
    return { scale, rotation, hScale, vScale };
  }, []);

  const fireTapCancel = useCallback(() => {
    onTapCancel?.();
  }, [onTapCancel]);

  // === Pointer Handlers ===
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return; // primary only
      // Respect deferToChild: if direct target is not the container and behavior is deferToChild, ignore
      if (behavior === HitTestBehavior.deferToChild && e.target !== ref.current) {
        // Let child handle; do not start gesture here
        return;
      }
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

      pressedRef.current = true;
      const global = { dx: e.clientX, dy: e.clientY };
      const local = getLocal(ref.current, e.clientX, e.clientY);
      startGlobal.current = global;
      lastGlobal.current = global;
      startTimeRef.current = performance.now();
      vTracker.current = new VelocityTracker();
      vTracker.current.push(global.dx, global.dy);

      // Register pointer for scale
      activePointers.current.set(e.pointerId, local);

      // Long press timer with move tolerance
      clearTimers();
      if (onLongPress || onLongPressStart) {
        longPressTimerRef.current = setTimeout(() => {
          if (!pressedRef.current) return;
          isLongPressRef.current = true;
          onLongPress?.();
          onLongPressStart?.({ globalPosition: global, localPosition: local });
        }, longPressDelay);
      }

      onTapDown?.({ globalPosition: global, localPosition: local });

      // Scale start if two pointers
      if (!scaleActiveRef.current && pointerCount() === 2 && (onScaleStart || onScaleUpdate || onScaleEnd)) {
        scaleActiveRef.current = true;
        const focal = getFocal();
        if (ref.current) {
          onScaleStart?.({ focalPoint: { dx: focal.dx + ref.current.getBoundingClientRect().left, dy: focal.dy + ref.current.getBoundingClientRect().top }, localFocalPoint: focal, pointers: 2 });
        }
      }
    },
    [behavior, clearTimers, getFocal, longPressDelay, onLongPress, onLongPressStart, onTapDown, onScaleStart, onScaleUpdate, onScaleEnd, pointerCount]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!pressedRef.current) return;
      const global = { dx: e.clientX, dy: e.clientY };
      const local = getLocal(ref.current, e.clientX, e.clientY);
      const start = startGlobal.current;
      const last = lastGlobal.current;
      if (!start || !last) return;

      // update trackers
      lastGlobal.current = global;
      vTracker.current.push(global.dx, global.dy);

      // update pointer map
      if (activePointers.current.has(e.pointerId)) {
        activePointers.current.set(e.pointerId, local);
      }

      // Handle scale if active and 2+ pointers
      if (scaleActiveRef.current && pointerCount() >= 2 && onScaleUpdate) {
        // For simplicity, recompute using last snapshot vs current snapshot is complex; we approximate using deltas
        const prev = new Map(activePointers.current);
        prev.set(e.pointerId, last ? getLocal(ref.current, last.dx, last.dy) : local);
        const curr = activePointers.current;
        const focal = getFocal();
        const { scale, rotation, hScale, vScale } = getScaleRotate(prev, curr);
        onScaleUpdate({
          focalPoint: ref.current ? { dx: focal.dx + ref.current.getBoundingClientRect().left, dy: focal.dy + ref.current.getBoundingClientRect().top } : focal,
          localFocalPoint: focal,
          scale,
          rotation,
          horizontalScale: hScale,
          verticalScale: vScale,
          pointers: pointerCount(),
        });
      }

      const movedFromStart = distance(start, global);

      // Cancel long press if exceeded tolerance
      if (!isPanningRef.current && movedFromStart > longPressMoveTolerance && longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      // Start pan if exceed panSlop
      if (!isPanningRef.current && movedFromStart > panSlop) {
        isPanningRef.current = true;
        // cancel long press
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
        onPanStart?.({ globalPosition: start, localPosition: getLocal(ref.current, start.dx, start.dy) });
      }

      if (isPanningRef.current && onPanUpdate) {
        const delta = { dx: global.dx - last.dx, dy: global.dy - last.dy };
        onPanUpdate({ globalPosition: global, localPosition: local, delta });
      }

      if (isLongPressRef.current && onLongPressMoveUpdate) {
        const offsetFromOrigin = { dx: global.dx - start.dx, dy: global.dy - start.dy };
        onLongPressMoveUpdate({ globalPosition: global, localPosition: local, offsetFromOrigin });
      }
    },
    [getFocal, getScaleRotate, longPressMoveTolerance, onLongPressMoveUpdate, onPanStart, onPanUpdate, onScaleUpdate, panSlop, pointerCount]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!pressedRef.current) return;
      const now = performance.now();
      const global = { dx: e.clientX, dy: e.clientY };
      const local = getLocal(ref.current, e.clientX, e.clientY);
      const start = startGlobal.current;
      if (!start) return;

      // Clean long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      // Scale pointer removal
      activePointers.current.delete(e.pointerId);

      // Long press end
      if (isLongPressRef.current) {
        onLongPressEnd?.({ globalPosition: global, localPosition: local });
        isLongPressRef.current = false;
      }

      // Pan end
      if (isPanningRef.current) {
        const vel = vTracker.current.getVelocity();
        onPanEnd?.({ velocity: vel, primaryVelocity: Math.hypot(vel.dx, vel.dy) });
        isPanningRef.current = false;
      } else {
        // Tap logic with double-tap disambiguation
        const moved = distance(start, global);
        if (moved <= tapSlop) {
          onTapUp?.({ globalPosition: global, localPosition: local });
          const since = now - lastTapTimeRef.current;
          if (onDoubleTap) {
            if (since <= doubleTapDelay) {
              // double
              if (waitingSingleTapRef.current) {
                clearTimeout(waitingSingleTapRef.current);
                waitingSingleTapRef.current = null;
              }
              onDoubleTap?.();
              lastTapTimeRef.current = 0;
            } else {
              // maybe single later
              lastTapTimeRef.current = now;
              waitingSingleTapRef.current = setTimeout(() => {
                onTap?.();
                waitingSingleTapRef.current = null;
              }, doubleTapDelay);
            }
          } else {
            onTap?.();
            lastTapTimeRef.current = now;
          }
        } else {
          fireTapCancel();
        }
      }

      // Scale end if no more multi-touch
      if (scaleActiveRef.current && pointerCount() < 2) {
        const vel = vTracker.current.getVelocity();
        onScaleEnd?.({ velocity: vel, pointers: pointerCount() });
        scaleActiveRef.current = false;
      }

      pressedRef.current = false;
      startGlobal.current = null;
      lastGlobal.current = null;
    },
    [doubleTapDelay, fireTapCancel, onDoubleTap, onPanEnd, onScaleEnd, onTap, onTapUp, onLongPressEnd, tapSlop, pointerCount]
  );

  const onPointerCancel = useCallback(() => {
    if (!pressedRef.current) return;
    clearTimers();
    fireTapCancel();
    pressedRef.current = false;
    isPanningRef.current = false;
    isLongPressRef.current = false;
    startGlobal.current = null;
    lastGlobal.current = null;
    activePointers.current.clear();
    if (scaleActiveRef.current) {
      onScaleEnd?.({ velocity: { dx: 0, dy: 0 }, pointers: 0 });
      scaleActiveRef.current = false;
    }
  }, [clearTimers, fireTapCancel, onScaleEnd]);

  // Keyboard accessibility: Space/Enter => onTap
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (excludeFromSemantics) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onTap?.();
      }
    },
    [excludeFromSemantics, onTap]
  );

  // Cancel on window blur / visibility change (closer to Flutter's cancel conditions)
  useEffect(() => {
    const cancel = () => onPointerCancel();
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancel();
    });
    return () => {
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", () => {});
    };
  }, [onPointerCancel]);

  // Styles approximating HitTestBehavior semantics without breaking layout
  const containerStyle = useMemo<React.CSSProperties>(() => {
    const base: React.CSSProperties = { ...style, touchAction: "none" };
    switch (behavior) {
      case HitTestBehavior.opaque:
        // ensure there is a hit area w/o visual change
        return { ...base, position: base.position || "relative", minWidth: base.minWidth || 1, minHeight: base.minHeight || 1 };
      case HitTestBehavior.translucent:
        // do not set pointer-events:none; we still want the container to receive events while letting children work
        return base;
      default:
        return base;
    }
  }, [behavior, style]);

  const commonProps = {
    ref,
    className,
    style: containerStyle,
    role: excludeFromSemantics ? undefined : "button",
    tabIndex: excludeFromSemantics ? undefined : 0,
    "aria-label": excludeFromSemantics ? undefined : ariaLabel,
    onKeyDown,
    // Pointer events
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerCancel,
  } as const;

  return <div {...commonProps}>{children}</div>;
}

// ===== Usage Example =====
/*
<GestureDetector
  behavior={HitTestBehavior.translucent}
  onTap={() => console.log('tap')}
  onDoubleTap={() => console.log('double')}
  onLongPress={() => console.log('long')}
  onPanStart={(d) => console.log('pan start', d)}
  onPanUpdate={(d) => console.log('pan update', d)}
  onPanEnd={(d) => console.log('pan end', d)}
  onScaleStart={(d) => console.log('scale start', d)}
  onScaleUpdate={(d) => console.log('scale update', d)}
  onScaleEnd={(d) => console.log('scale end', d)}
  style={{ userSelect: 'none', width: 300, height: 200, border: '1px dashed #aaa' }}
>
  <div style={{ width: '100%', height: '100%' }}>Interact here</div>
</GestureDetector>
*/
