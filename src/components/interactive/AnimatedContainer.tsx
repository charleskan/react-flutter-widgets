import { useEffect, useRef, useState } from 'react'
import type { ContainerProps } from '../layout/Container'

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
  duration: number

  /** Animation curve/timing function */
  curve?: AnimationCurve | string

  /** Delay before starting the animation in milliseconds */
  delay?: number

  /** Callback function called when the animation starts */
  onStart?: () => void

  /** Callback function called when the animation completes */
  onEnd?: () => void

  /** Custom inline styles (will be merged with animated styles) */
  style?: React.CSSProperties
}

export enum AnimationCurve {
  /** Linear animation curve */
  linear = 'linear',
  /** Ease animation curve (default) */
  ease = 'ease',
  /** Ease-in animation curve */
  easeIn = 'ease-in',
  /** Ease-out animation curve */
  easeOut = 'ease-out',
  /** Ease-in-out animation curve */
  easeInOut = 'ease-in-out',
  /** Bounce animation curve */
  bounceIn = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  /** Elastic animation curve */
  elasticIn = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  /** Fast out slow in (Material Design) */
  fastOutSlowIn = 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Decelerate (Material Design) */
  decelerate = 'cubic-bezier(0, 0, 0.2, 1)',
}

interface AnimatedStyles {
  width?: string | number
  height?: string | number
  padding?: string
  margin?: string
  backgroundColor?: string
  borderRadius?: string | number
  borderWidth?: number
  borderColor?: string
  borderStyle?: string
  opacity?: number
  transform?: string
}

function AnimatedContainer(props: AnimatedContainerProps) {
  const {
    children,
    duration,
    curve = AnimationCurve.ease,
    delay = 0,
    onStart,
    onEnd,
    style = {},
    // Container props
    width,
    height,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    borderWidth = 0,
    borderColor,
    borderStyle = 'solid',
    flex,
    expanded,
    flexible,
    flexShrink,
    alignSelf,
    className = '',
  } = props

  const [currentStyles, setCurrentStyles] = useState<AnimatedStyles>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const previousPropsRef = useRef<AnimatedContainerProps>(props)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout>()

  // Helper function to normalize values for comparison and animation
  const normalizeValue = (value: string | number | undefined): string => {
    if (value === undefined) return ''
    if (typeof value === 'number') return `${value}px`
    return value
  }

  // Padding is now directly provided as EdgeInsets result
  const calculateEffectivePadding = (): string => {
    return padding || '0'
  }

  // Calculate animated styles based on current props
  const calculateTargetStyles = (): AnimatedStyles => {
    const effectivePadding = calculateEffectivePadding()

    return {
      width: normalizeValue(width),
      height: normalizeValue(height),
      padding: effectivePadding,
      margin: normalizeValue(margin),
      backgroundColor: backgroundColor || 'transparent',
      borderRadius: normalizeValue(borderRadius),
      borderWidth: borderWidth || 0,
      borderColor: borderColor || 'transparent',
      borderStyle: borderStyle || 'solid',
    }
  }

  // Check if props have changed and need animation
  const hasStyleChanged = (): boolean => {
    const prev = previousPropsRef.current

    return (
      width !== prev.width ||
      height !== prev.height ||
      padding !== prev.padding ||
      margin !== prev.margin ||
      backgroundColor !== prev.backgroundColor ||
      borderRadius !== prev.borderRadius ||
      borderWidth !== prev.borderWidth ||
      borderColor !== prev.borderColor ||
      borderStyle !== prev.borderStyle
    )
  }

  // Apply animation
  useEffect(() => {
    if (!hasStyleChanged()) return

    const targetStyles = calculateTargetStyles()

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Start animation
    const startAnimation = () => {
      setIsAnimating(true)
      setCurrentStyles(targetStyles)
      onStart?.()

      // Animation complete callback
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
        onEnd?.()
      }, duration + delay)
    }

    if (delay > 0) {
      animationTimeoutRef.current = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    // Update previous props
    previousPropsRef.current = props

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [
    width,
    height,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
    duration,
    delay,
    onStart,
    onEnd,
  ])

  // Initialize styles on mount
  useEffect(() => {
    setCurrentStyles(calculateTargetStyles())
  }, [])

  // Build flex styles (same logic as Container)
  const buildFlexStyles = (): React.CSSProperties => {
    const flexStyles: React.CSSProperties = {}

    if (expanded) {
      flexStyles.flex = '1 1 0'
    } else if (flexible) {
      flexStyles.flex = `${flex || 1} 1 auto`
    } else if (flex !== undefined) {
      flexStyles.flex = `${flex} 0 auto`
    }

    if (width !== undefined) {
      flexStyles.width = typeof width === 'number' ? `${width}px` : width
    }

    if (height !== undefined) {
      flexStyles.height = typeof height === 'number' ? `${height}px` : height
    }

    if (flexShrink === false) {
      flexStyles.flexShrink = 0
    }

    return flexStyles
  }

  // Combine all styles
  const containerStyle: React.CSSProperties = {
    ...buildFlexStyles(),
    ...currentStyles,
    borderRadius:
      typeof currentStyles.borderRadius === 'number'
        ? `${currentStyles.borderRadius}px`
        : currentStyles.borderRadius,
    borderWidth:
      currentStyles.borderWidth && currentStyles.borderWidth > 0
        ? `${currentStyles.borderWidth}px`
        : undefined,
    borderColor:
      currentStyles.borderWidth && currentStyles.borderWidth > 0
        ? currentStyles.borderColor
        : undefined,
    borderStyle:
      currentStyles.borderWidth && currentStyles.borderWidth > 0
        ? currentStyles.borderStyle
        : undefined,
    alignSelf,
    transition: isAnimating || hasStyleChanged() ? `all ${duration}ms ${curve}` : undefined,
    ...style,
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {children}
    </div>
  )
}

export default AnimatedContainer
