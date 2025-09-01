import type { MouseEvent, ReactNode, TouchEvent } from 'react'
import { useCallback, useRef, useState } from 'react'

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
  children?: ReactNode

  /** Callback function when a tap is detected */
  onTap?: () => void

  /** Callback function when the gesture starts (mouse/touch down) */
  onTapDown?: (details: TapDownDetails) => void

  /** Callback function when the gesture is released */
  onTapUp?: (details: TapUpDetails) => void

  /** Callback function when a tap is cancelled */
  onTapCancel?: () => void

  /** Callback function when a double tap is detected */
  onDoubleTap?: () => void

  /** Callback function when a long press is detected */
  onLongPress?: () => void

  /** Callback function when a long press starts */
  onLongPressStart?: (details: LongPressStartDetails) => void

  /** Callback function when a long press moves */
  onLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void

  /** Callback function when a long press ends */
  onLongPressEnd?: (details: LongPressEndDetails) => void

  /** Callback function when a pan/drag starts */
  onPanStart?: (details: DragStartDetails) => void

  /** Callback function when a pan/drag updates */
  onPanUpdate?: (details: DragUpdateDetails) => void

  /** Callback function when a pan/drag ends */
  onPanEnd?: (details: DragEndDetails) => void

  /** Whether the gesture detector should exclude semantics */
  excludeFromSemantics?: boolean

  /** Behavior for hit testing */
  behavior?: HitTestBehavior

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

export enum HitTestBehavior {
  /** Only hit test if the widget has content */
  deferToChild = 'deferToChild',
  /** Always hit test, even if no visible content */
  opaque = 'opaque',
  /** Never hit test */
  translucent = 'translucent',
}

export interface Offset {
  dx: number
  dy: number
}

export interface TapDownDetails {
  globalPosition: Offset
  localPosition: Offset
}

export interface TapUpDetails {
  globalPosition: Offset
  localPosition: Offset
}

export interface LongPressStartDetails {
  globalPosition: Offset
  localPosition: Offset
}

export interface LongPressMoveUpdateDetails {
  globalPosition: Offset
  localPosition: Offset
  offsetFromOrigin: Offset
}

export interface LongPressEndDetails {
  globalPosition: Offset
  localPosition: Offset
}

export interface DragStartDetails {
  globalPosition: Offset
  localPosition: Offset
}

export interface DragUpdateDetails {
  globalPosition: Offset
  localPosition: Offset
  delta: Offset
}

export interface DragEndDetails {
  velocity: Offset
  primaryVelocity?: number
}

interface GestureState {
  isPressed: boolean
  startPosition?: Offset
  lastPosition?: Offset
  startTime: number
  lastTapTime: number
  tapCount: number
}

function GestureDetector(props: GestureDetectorProps) {
  const {
    children,
    onTap,
    onTapDown,
    onTapUp,
    onTapCancel,
    onDoubleTap,
    onLongPress,
    onLongPressStart,
    onLongPressMoveUpdate,
    onLongPressEnd,
    onPanStart,
    onPanUpdate,
    onPanEnd,
    excludeFromSemantics = false,
    behavior = HitTestBehavior.deferToChild,
    className = '',
    style = {},
  } = props

  const [gestureState, setGestureState] = useState<GestureState>({
    isPressed: false,
    startTime: 0,
    lastTapTime: 0,
    tapCount: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout>()
  const tapTimerRef = useRef<NodeJS.Timeout>()
  const isLongPressRef = useRef(false)
  const isPanningRef = useRef(false)

  // Constants
  const LONG_PRESS_TIMEOUT = 500 // ms
  const DOUBLE_TAP_TIMEOUT = 300 // ms
  const PAN_THRESHOLD = 10 // pixels
  const TAP_THRESHOLD = 10 // pixels

  const getLocalPosition = useCallback((globalX: number, globalY: number): Offset => {
    if (!containerRef.current) return { dx: globalX, dy: globalY }

    const rect = containerRef.current.getBoundingClientRect()
    return {
      dx: globalX - rect.left,
      dy: globalY - rect.top,
    }
  }, [])

  const getDistance = useCallback((pos1: Offset, pos2: Offset): number => {
    const dx = pos1.dx - pos2.dx
    const dy = pos1.dy - pos2.dy
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  const clearTimers = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = undefined
    }
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current)
      tapTimerRef.current = undefined
    }
  }, [])

  const handlePointerDown = useCallback(
    (globalX: number, globalY: number) => {
      const now = Date.now()
      const globalPosition: Offset = { dx: globalX, dy: globalY }
      const localPosition = getLocalPosition(globalX, globalY)

      clearTimers()
      isLongPressRef.current = false
      isPanningRef.current = false

      setGestureState((prev) => ({
        ...prev,
        isPressed: true,
        startPosition: globalPosition,
        lastPosition: globalPosition,
        startTime: now,
      }))

      onTapDown?.({ globalPosition, localPosition })

      // Start long press timer
      if (onLongPress || onLongPressStart) {
        longPressTimerRef.current = setTimeout(() => {
          isLongPressRef.current = true
          if (onLongPress) {
            onLongPress()
          }
          if (onLongPressStart) {
            onLongPressStart({ globalPosition, localPosition })
          }
        }, LONG_PRESS_TIMEOUT)
      }
    },
    [getLocalPosition, onTapDown, onLongPress, onLongPressStart, clearTimers],
  )

  const handlePointerMove = useCallback(
    (globalX: number, globalY: number) => {
      if (!gestureState.isPressed || !gestureState.startPosition) return

      const globalPosition: Offset = { dx: globalX, dy: globalY }
      const localPosition = getLocalPosition(globalX, globalY)
      const distance = getDistance(gestureState.startPosition, globalPosition)

      // Check if we should start panning
      if (!isPanningRef.current && distance > PAN_THRESHOLD) {
        isPanningRef.current = true
        clearTimers() // Cancel long press

        if (onPanStart) {
          onPanStart({
            globalPosition: gestureState.startPosition,
            localPosition: getLocalPosition(
              gestureState.startPosition.dx,
              gestureState.startPosition.dy,
            ),
          })
        }
      }

      // Handle panning
      if (isPanningRef.current && onPanUpdate && gestureState.lastPosition) {
        const delta: Offset = {
          dx: globalPosition.dx - gestureState.lastPosition.dx,
          dy: globalPosition.dy - gestureState.lastPosition.dy,
        }

        onPanUpdate({ globalPosition, localPosition, delta })
      }

      // Handle long press move
      if (isLongPressRef.current && onLongPressMoveUpdate && gestureState.startPosition) {
        const offsetFromOrigin: Offset = {
          dx: globalPosition.dx - gestureState.startPosition.dx,
          dy: globalPosition.dy - gestureState.startPosition.dy,
        }

        onLongPressMoveUpdate({ globalPosition, localPosition, offsetFromOrigin })
      }

      setGestureState((prev) => ({
        ...prev,
        lastPosition: globalPosition,
      }))
    },
    [
      gestureState,
      getLocalPosition,
      getDistance,
      onPanStart,
      onPanUpdate,
      onLongPressMoveUpdate,
      clearTimers,
    ],
  )

  const handlePointerUp = useCallback(
    (globalX: number, globalY: number) => {
      const now = Date.now()
      const globalPosition: Offset = { dx: globalX, dy: globalY }
      const localPosition = getLocalPosition(globalX, globalY)

      clearTimers()

      if (!gestureState.isPressed) return

      // Handle long press end
      if (isLongPressRef.current && onLongPressEnd) {
        onLongPressEnd({ globalPosition, localPosition })
      }

      // Handle pan end
      if (isPanningRef.current && onPanEnd) {
        // Calculate velocity (simplified)
        const timeDelta = now - gestureState.startTime
        const velocity: Offset =
          gestureState.lastPosition && timeDelta > 0
            ? {
                dx: ((globalPosition.dx - gestureState.lastPosition.dx) / timeDelta) * 1000,
                dy: ((globalPosition.dy - gestureState.lastPosition.dy) / timeDelta) * 1000,
              }
            : { dx: 0, dy: 0 }

        onPanEnd({ velocity })
      }

      // Handle tap
      if (!isPanningRef.current && !isLongPressRef.current && gestureState.startPosition) {
        const distance = getDistance(gestureState.startPosition, globalPosition)

        if (distance <= TAP_THRESHOLD) {
          onTapUp?.({ globalPosition, localPosition })

          // Handle double tap detection
          const timeSinceLastTap = now - gestureState.lastTapTime

          if (timeSinceLastTap < DOUBLE_TAP_TIMEOUT && gestureState.tapCount === 1) {
            // Double tap
            if (tapTimerRef.current) {
              clearTimeout(tapTimerRef.current)
              tapTimerRef.current = undefined
            }
            onDoubleTap?.()

            setGestureState((prev) => ({
              ...prev,
              isPressed: false,
              tapCount: 0,
              lastTapTime: 0,
            }))
          } else {
            // Single tap (potentially)
            setGestureState((prev) => ({
              ...prev,
              isPressed: false,
              tapCount: 1,
              lastTapTime: now,
            }))

            if (onDoubleTap) {
              // Wait to see if there's a double tap
              tapTimerRef.current = setTimeout(() => {
                onTap?.()
                setGestureState((prev) => ({ ...prev, tapCount: 0 }))
              }, DOUBLE_TAP_TIMEOUT)
            } else {
              // No double tap expected, fire immediately
              onTap?.()
            }
          }
        } else {
          onTapCancel?.()
        }
      }

      if (!onDoubleTap || isPanningRef.current || isLongPressRef.current) {
        setGestureState((prev) => ({
          ...prev,
          isPressed: false,
          startPosition: undefined,
          lastPosition: undefined,
        }))
      }

      isLongPressRef.current = false
      isPanningRef.current = false
    },
    [
      gestureState,
      getLocalPosition,
      getDistance,
      onTapUp,
      onTapCancel,
      onTap,
      onDoubleTap,
      onLongPressEnd,
      onPanEnd,
      clearTimers,
    ],
  )

  const handlePointerCancel = useCallback(() => {
    clearTimers()

    if (gestureState.isPressed) {
      onTapCancel?.()
    }

    setGestureState((prev) => ({
      ...prev,
      isPressed: false,
      startPosition: undefined,
      lastPosition: undefined,
    }))

    isLongPressRef.current = false
    isPanningRef.current = false
  }, [gestureState.isPressed, onTapCancel, clearTimers])

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      handlePointerDown(event.clientX, event.clientY)
    },
    [handlePointerDown],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      handlePointerMove(event.clientX, event.clientY)
    },
    [handlePointerMove],
  )

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      handlePointerUp(event.clientX, event.clientY)
    },
    [handlePointerUp],
  )

  // Touch event handlers
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        if (touch) {
          handlePointerDown(touch.clientX, touch.clientY)
        }
      }
    },
    [handlePointerDown],
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        if (touch) {
          handlePointerMove(touch.clientX, touch.clientY)
        }
      }
    },
    [handlePointerMove],
  )

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (event.changedTouches.length === 1) {
        const touch = event.changedTouches[0]
        if (touch) {
          handlePointerUp(touch.clientX, touch.clientY)
        }
      }
    },
    [handlePointerUp],
  )

  // Determine container style based on behavior
  const getContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      ...style,
    }

    switch (behavior) {
      case HitTestBehavior.opaque:
        return {
          ...baseStyle,
          display: 'block',
          width: '100%',
          height: '100%',
        }
      case HitTestBehavior.translucent:
        return {
          ...baseStyle,
          pointerEvents: 'none',
        }
      case HitTestBehavior.deferToChild:
      default:
        return baseStyle
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={getContainerStyle()}
      onMouseDown={handleMouseDown}
      onMouseMove={gestureState.isPressed ? handleMouseMove : undefined}
      onMouseUp={gestureState.isPressed ? handleMouseUp : undefined}
      onMouseLeave={gestureState.isPressed ? handlePointerCancel : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handlePointerCancel}
      role={excludeFromSemantics ? undefined : 'button'}
      tabIndex={excludeFromSemantics ? undefined : -1}
    >
      {children}
    </div>
  )
}

export default GestureDetector
