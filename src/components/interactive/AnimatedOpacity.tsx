import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimationCurve } from './AnimatedContainer'

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
export interface AnimatedOpacityProps {
  /** Child content to render */
  children?: ReactNode

  /** Target opacity value (0.0 to 1.0) */
  opacity: number

  /** Duration of the animation in milliseconds */
  duration: number

  /** Animation curve/timing function */
  curve?: AnimationCurve | string

  /** Delay before starting the animation in milliseconds */
  delay?: number

  /** Callback function called when the animation starts */
  onStart?: () => void

  /** Callback function called when the animation completes */
  onEnd?: () => void

  /** Whether the widget should always maintain its size */
  alwaysIncludeSemantics?: boolean

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

function AnimatedOpacity(props: AnimatedOpacityProps) {
  const {
    children,
    opacity,
    duration,
    curve = AnimationCurve.ease,
    delay = 0,
    onStart,
    onEnd,
    alwaysIncludeSemantics = false,
    className = '',
    style = {},
  } = props

  const [currentOpacity, setCurrentOpacity] = useState(opacity)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousOpacityRef = useRef(opacity)
  const animationTimeoutRef = useRef<NodeJS.Timeout>()
  const startTimeoutRef = useRef<NodeJS.Timeout>()

  // Clamp opacity value between 0 and 1
  const clampedOpacity = Math.max(0, Math.min(1, opacity))

  // Check if opacity has changed
  const hasOpacityChanged = (): boolean => {
    return Math.abs(clampedOpacity - previousOpacityRef.current) > 0.001
  }

  // Apply opacity animation
  useEffect(() => {
    if (!hasOpacityChanged()) return

    // Clear any existing timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current)
    }

    // Start animation
    const startAnimation = () => {
      setIsAnimating(true)
      setCurrentOpacity(clampedOpacity)
      onStart?.()

      // Animation complete callback
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
        onEnd?.()
      }, duration)
    }

    if (delay > 0) {
      startTimeoutRef.current = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    // Update previous opacity
    previousOpacityRef.current = clampedOpacity

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current)
      }
    }
  }, [clampedOpacity, duration, delay, onStart, onEnd])

  // Initialize opacity on mount
  useEffect(() => {
    setCurrentOpacity(clampedOpacity)
    previousOpacityRef.current = clampedOpacity
  }, [])

  // Determine if content should be visible to screen readers
  const shouldIncludeSemantics = alwaysIncludeSemantics || currentOpacity > 0

  // Container styles
  const containerStyle: React.CSSProperties = {
    opacity: currentOpacity,
    transition: isAnimating || hasOpacityChanged() ? `opacity ${duration}ms ${curve}` : undefined,
    // Maintain layout space even when opacity is 0
    visibility: shouldIncludeSemantics ? 'visible' : 'hidden',
    ...style,
  }

  return (
    <div className={className} style={containerStyle} aria-hidden={!shouldIncludeSemantics}>
      {children}
    </div>
  )
}

export default AnimatedOpacity
