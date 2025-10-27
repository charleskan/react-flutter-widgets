import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * InkWell component equivalent to Flutter's InkWell widget.
 * Provides Material Design ink splash effects on user interaction.
 *
 * @example
 * ```tsx
 * <InkWell onTap={() => console.log('Tapped!')} splashColor="#e3f2fd">
 *   <Container padding="16px" backgroundColor="#f5f5f5">
 *     <span>Click me!</span>
 *   </Container>
 * </InkWell>
 * ```
 */
export interface InkWellProps {
  /** Child content to render inside the InkWell */
  children?: ReactNode

  /** Callback function when the InkWell is tapped/clicked */
  onTap?: () => void

  /** Callback function when the InkWell is double-tapped */
  onDoubleTap?: () => void

  /** Callback function when the InkWell is long-pressed */
  onLongPress?: () => void

  /** Callback function when hover starts */
  onHover?: (hovering: boolean) => void

  /** Callback function when focus changes */
  onFocusChange?: (focused: boolean) => void

  /** Color of the splash effect */
  splashColor?: string

  /** Color of the hover effect */
  hoverColor?: string

  /** Color of the focus effect */
  focusColor?: string

  /** Color of the highlight when pressed */
  highlightColor?: string

  /** Border radius for the splash effect */
  borderRadius?: number | string

  /** Whether the InkWell should be enabled */
  enabled?: boolean

  /** Whether to exclude this widget from semantics */
  excludeFromSemantics?: boolean

  /** Duration of the splash animation in milliseconds */
  splashDuration?: number

  /** Duration of the hover animation in milliseconds */
  hoverDuration?: number

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties

  /** Accessibility role */
  role?: string

  /** Tab index for keyboard navigation */
  tabIndex?: number

  /** Accessibility label for screen readers */
  'aria-label'?: string

  /** ID of element that labels this component */
  'aria-labelledby'?: string

  /** ID of element that describes this component */
  'aria-describedby'?: string

  /** Indicates if the element is pressed (for toggle buttons) */
  'aria-pressed'?: boolean | 'mixed'

  /** Indicates if the element is expanded (for collapsible content) */
  'aria-expanded'?: boolean

  /** Indicates if the element controls another element */
  'aria-controls'?: string

  /** Indicates if the element has a popup */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
}

interface RippleEffect {
  id: string
  x: number
  y: number
  size: number
  opacity: number
}

function InkWell(props: InkWellProps) {
  const {
    children,
    onTap,
    onDoubleTap,
    onLongPress,
    onHover,
    onFocusChange,
    splashColor = 'rgba(0, 0, 0, 0.12)',
    hoverColor = 'rgba(0, 0, 0, 0.04)',
    focusColor = 'rgba(0, 0, 0, 0.12)',
    highlightColor = 'rgba(0, 0, 0, 0.08)',
    borderRadius = 0,
    enabled = true,
    excludeFromSemantics = false,
    splashDuration = 300,
    hoverDuration = 200,
    className = '',
    style = {},
    role,
    tabIndex,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-pressed': ariaPressed,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-haspopup': ariaHaspopup,
  } = props

  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<RippleEffect[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout>()
  const doubleTapTimerRef = useRef<NodeJS.Timeout>()
  const lastTapRef = useRef<number>(0)

  // Determine semantic role and interactivity
  const hasInteraction = Boolean(onTap || onDoubleTap || onLongPress)
  const semanticRole = role || (hasInteraction ? 'button' : 'presentation')
  const isInteractive = hasInteraction && enabled
  const shouldBeAccessible = !excludeFromSemantics && isInteractive

  // Determine appropriate tabIndex
  const effectiveTabIndex = (() => {
    if (excludeFromSemantics || !enabled) return -1
    if (tabIndex !== undefined) return tabIndex
    return hasInteraction ? 0 : -1
  })()

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      if (doubleTapTimerRef.current) {
        clearTimeout(doubleTapTimerRef.current)
      }
    }
  }, [])

  const createRipple = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Calculate ripple size based on distance to furthest corner
      const maxX = Math.max(x, rect.width - x)
      const maxY = Math.max(y, rect.height - y)
      const size = Math.sqrt(maxX * maxX + maxY * maxY) * 2

      const newRipple: RippleEffect = {
        id: `ripple-${Date.now()}-${Math.random()}`,
        x,
        y,
        size,
        opacity: 1,
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, splashDuration)
    },
    [splashDuration],
  )

  const handleMouseEnter = useCallback(() => {
    if (!enabled) return
    setIsHovered(true)
    onHover?.(true)
  }, [enabled, onHover])

  const handleMouseLeave = useCallback(() => {
    if (!enabled) return
    setIsHovered(false)
    setIsPressed(false)
    onHover?.(false)

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
  }, [enabled, onHover])

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!enabled) return

      // Only prevent default for interactive elements to avoid interfering with text selection
      if (isInteractive) {
        event.preventDefault()
      }

      setIsPressed(true)
      createRipple(event)

      // Start long press timer
      longPressTimerRef.current = setTimeout(() => {
        onLongPress?.()
      }, 500) // 500ms for long press
    },
    [enabled, isInteractive, createRipple, onLongPress],
  )

  const handleMouseUp = useCallback(() => {
    if (!enabled) return
    setIsPressed(false)

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
  }, [enabled])

  const handleClick = useCallback(() => {
    if (!enabled) return

    const now = Date.now()
    const timeSinceLastTap = now - lastTapRef.current

    if (timeSinceLastTap < 300 && onDoubleTap) {
      // Double tap detected
      if (doubleTapTimerRef.current) {
        clearTimeout(doubleTapTimerRef.current)
      }
      onDoubleTap()
      lastTapRef.current = 0 // Reset to prevent triple tap
    } else {
      // Single tap - delay execution to check for double tap
      lastTapRef.current = now
      doubleTapTimerRef.current = setTimeout(
        () => {
          onTap?.()
        },
        onDoubleTap ? 300 : 0,
      )
    }
  }, [enabled, onTap, onDoubleTap])

  const handleFocus = useCallback(() => {
    if (!enabled) return
    setIsFocused(true)
    onFocusChange?.(true)
  }, [enabled, onFocusChange])

  const handleBlur = useCallback(() => {
    if (!enabled) return
    setIsFocused(false)
    onFocusChange?.(false)
  }, [enabled, onFocusChange])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !isInteractive) return

      // Handle activation keys
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsPressed(true)
        onTap?.()
      }
    },
    [enabled, isInteractive, onTap],
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !isInteractive) return

      if (event.key === 'Enter' || event.key === ' ') {
        setIsPressed(false)
      }
    },
    [enabled, isInteractive],
  )

  // Combine all overlay colors
  const overlayColor = (() => {
    if (isPressed) return highlightColor
    if (isFocused) return focusColor
    if (isHovered) return hoverColor
    return 'transparent'
  })()

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    cursor: enabled && isInteractive ? 'pointer' : 'default',
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    outline: 'none',
    userSelect: isInteractive ? 'none' : undefined,
    touchAction: isInteractive ? 'manipulation' : undefined,
    ...style,
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    transition: `background-color ${hoverDuration}ms ease`,
    pointerEvents: 'none',
    borderRadius: 'inherit',
  }

  const rippleStyle = (ripple: RippleEffect): React.CSSProperties => ({
    position: 'absolute',
    left: ripple.x - ripple.size / 2,
    top: ripple.y - ripple.size / 2,
    width: ripple.size,
    height: ripple.size,
    backgroundColor: splashColor,
    borderRadius: '50%',
    opacity: ripple.opacity,
    transform: 'scale(0)',
    animation: `inkwell-ripple ${splashDuration}ms ease-out`,
    pointerEvents: 'none',
  })

  // Build ARIA attributes object
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const ariaAttributes: Record<string, any> = {}

  if (shouldBeAccessible) {
    // Only add aria-disabled if the component is interactive
    ariaAttributes['aria-disabled'] = !enabled

    // Add provided ARIA attributes
    if (ariaLabel) ariaAttributes['aria-label'] = ariaLabel
    if (ariaLabelledby) ariaAttributes['aria-labelledby'] = ariaLabelledby
    if (ariaDescribedby) ariaAttributes['aria-describedby'] = ariaDescribedby
    if (ariaPressed !== undefined) ariaAttributes['aria-pressed'] = ariaPressed
    if (ariaExpanded !== undefined) ariaAttributes['aria-expanded'] = ariaExpanded
    if (ariaControls) ariaAttributes['aria-controls'] = ariaControls
    if (ariaHaspopup !== undefined) ariaAttributes['aria-haspopup'] = ariaHaspopup

    // Add pressed state for screen readers during interaction
    if (isPressed && semanticRole === 'button' && ariaPressed === undefined) {
      ariaAttributes['aria-pressed'] = 'true'
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      onFocus={shouldBeAccessible ? handleFocus : undefined}
      onBlur={shouldBeAccessible ? handleBlur : undefined}
      onKeyDown={shouldBeAccessible ? handleKeyDown : undefined}
      onKeyUp={shouldBeAccessible ? handleKeyUp : undefined}
      role={excludeFromSemantics ? undefined : semanticRole}
      tabIndex={effectiveTabIndex}
      {...ariaAttributes}
    >
      {/* Overlay for hover, focus, and pressed states */}
      <div style={overlayStyle} />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div key={ripple.id} style={rippleStyle(ripple)} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>

      {/* CSS Animation */}
      <style>{`
        @keyframes inkwell-ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default InkWell
