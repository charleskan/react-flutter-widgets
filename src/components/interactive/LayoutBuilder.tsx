import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * BoxConstraints interface equivalent to Flutter's BoxConstraints
 */
export interface BoxConstraints {
  /** Minimum width constraint */
  minWidth: number
  /** Maximum width constraint */
  maxWidth: number
  /** Minimum height constraint */
  minHeight: number
  /** Maximum height constraint */
  maxHeight: number

  /** Whether the width is bounded (has a finite maximum) */
  hasBoundedWidth: boolean
  /** Whether the height is bounded (has a finite maximum) */
  hasBoundedHeight: boolean
  /** Whether the width is tightly constrained (min equals max) */
  hasTightWidth: boolean
  /** Whether the height is tightly constrained (min equals max) */
  hasTightHeight: boolean
  /** Whether both dimensions are tightly constrained */
  isTight: boolean
  /** Whether the constraints allow any size */
  isNormalized: boolean
}

/**
 * Builder function type that receives constraints and returns content
 */
export type LayoutWidgetBuilder = (constraints: BoxConstraints) => ReactNode

/**
 * LayoutBuilder component equivalent to Flutter's LayoutBuilder widget.
 * Builds content based on the available space constraints.
 *
 * @example
 * ```tsx
 * <LayoutBuilder builder={(constraints) => {
 *   if (constraints.maxWidth > 600) {
 *     return <DesktopLayout />
 *   } else {
 *     return <MobileLayout />
 *   }
 * }} />
 * ```
 */
export interface LayoutBuilderProps {
  /** Builder function that receives constraints and returns content */
  builder: LayoutWidgetBuilder

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

function LayoutBuilder({ builder, className = '', style = {} }: LayoutBuilderProps) {
  const [constraints, setConstraints] = useState<BoxConstraints>(() => createDefaultConstraints())
  const containerRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver>()

  // Calculate constraints from element
  const calculateConstraints = (element: HTMLElement): BoxConstraints => {
    const computedStyle = getComputedStyle(element)

    // Get the parent's constraints or use viewport
    const parentElement = element.parentElement
    let maxWidth = window.innerWidth
    let maxHeight = window.innerHeight

    if (parentElement) {
      const parentRect = parentElement.getBoundingClientRect()
      maxWidth = parentRect.width
      maxHeight = parentRect.height
    }

    // Parse CSS constraints if any
    const minWidthPx = Number.parseFloat(computedStyle.minWidth) || 0
    const maxWidthPx =
      computedStyle.maxWidth === 'none'
        ? maxWidth
        : Number.parseFloat(computedStyle.maxWidth) || maxWidth
    const minHeightPx = Number.parseFloat(computedStyle.minHeight) || 0
    const maxHeightPx =
      computedStyle.maxHeight === 'none'
        ? maxHeight
        : Number.parseFloat(computedStyle.maxHeight) || maxHeight

    return createBoxConstraints({
      minWidth: minWidthPx,
      maxWidth: maxWidthPx,
      minHeight: minHeightPx,
      maxHeight: maxHeightPx,
    })
  }

  // Set up resize observer
  useEffect(() => {
    if (!containerRef.current) return

    const element = containerRef.current

    // Initial calculation
    setConstraints(calculateConstraints(element))

    // Set up ResizeObserver for dynamic updates
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement
          setConstraints(calculateConstraints(target))
        }
      })

      resizeObserverRef.current.observe(element)
    } else {
      // Fallback for browsers without ResizeObserver
      const handleResize = () => {
        setConstraints(calculateConstraints(element))
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  // Memoize the built content
  const content = useMemo(() => {
    return builder(constraints)
  }, [builder, constraints])

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...style,
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {content}
    </div>
  )
}

// Helper functions for creating BoxConstraints
export function createBoxConstraints({
  minWidth = 0,
  maxWidth = Number.POSITIVE_INFINITY,
  minHeight = 0,
  maxHeight = Number.POSITIVE_INFINITY,
}: {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}): BoxConstraints {
  const hasBoundedWidth = maxWidth !== Number.POSITIVE_INFINITY
  const hasBoundedHeight = maxHeight !== Number.POSITIVE_INFINITY
  const hasTightWidth = minWidth === maxWidth
  const hasTightHeight = minHeight === maxHeight
  const isTight = hasTightWidth && hasTightHeight
  const isNormalized = minWidth <= maxWidth && minHeight <= maxHeight

  return {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    hasBoundedWidth,
    hasBoundedHeight,
    hasTightWidth,
    hasTightHeight,
    isTight,
    isNormalized,
  }
}

export function createTightConstraints(width: number, height: number): BoxConstraints {
  return createBoxConstraints({
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
  })
}

export function createLooseConstraints(maxWidth?: number, maxHeight?: number): BoxConstraints {
  return createBoxConstraints({
    minWidth: 0,
    maxWidth: maxWidth ?? Number.POSITIVE_INFINITY,
    minHeight: 0,
    maxHeight: maxHeight ?? Number.POSITIVE_INFINITY,
  })
}

export function createExpandedConstraints(): BoxConstraints {
  return createBoxConstraints({
    minWidth: Number.POSITIVE_INFINITY,
    maxWidth: Number.POSITIVE_INFINITY,
    minHeight: Number.POSITIVE_INFINITY,
    maxHeight: Number.POSITIVE_INFINITY,
  })
}

function createDefaultConstraints(): BoxConstraints {
  return createBoxConstraints({
    minWidth: 0,
    maxWidth: window.innerWidth,
    minHeight: 0,
    maxHeight: window.innerHeight,
  })
}

// Utility functions for working with constraints
export const BoxConstraintsUtils = {
  /**
   * Returns the biggest size that satisfies the constraints
   */
  biggest(constraints: BoxConstraints): { width: number; height: number } {
    return {
      width: constraints.hasBoundedWidth ? constraints.maxWidth : 0,
      height: constraints.hasBoundedHeight ? constraints.maxHeight : 0,
    }
  },

  /**
   * Returns the smallest size that satisfies the constraints
   */
  smallest(constraints: BoxConstraints): { width: number; height: number } {
    return {
      width: constraints.minWidth,
      height: constraints.minHeight,
    }
  },

  /**
   * Returns a size that attempts to be the specified size within the constraints
   */
  constrain(
    constraints: BoxConstraints,
    width: number,
    height: number,
  ): { width: number; height: number } {
    return {
      width: Math.max(constraints.minWidth, Math.min(constraints.maxWidth, width)),
      height: Math.max(constraints.minHeight, Math.min(constraints.maxHeight, height)),
    }
  },

  /**
   * Returns constraints with width constrained to the given value
   */
  tighten(constraints: BoxConstraints, width?: number, height?: number): BoxConstraints {
    return createBoxConstraints({
      minWidth: width !== undefined ? width : constraints.minWidth,
      maxWidth: width !== undefined ? width : constraints.maxWidth,
      minHeight: height !== undefined ? height : constraints.minHeight,
      maxHeight: height !== undefined ? height : constraints.maxHeight,
    })
  },

  /**
   * Returns constraints with the width and height loosened
   */
  loosen(constraints: BoxConstraints): BoxConstraints {
    return createBoxConstraints({
      minWidth: 0,
      maxWidth: constraints.maxWidth,
      minHeight: 0,
      maxHeight: constraints.maxHeight,
    })
  },

  /**
   * Returns constraints with the width tightened to the given value
   */
  tightenWidth(constraints: BoxConstraints, width: number): BoxConstraints {
    return createBoxConstraints({
      minWidth: width,
      maxWidth: width,
      minHeight: constraints.minHeight,
      maxHeight: constraints.maxHeight,
    })
  },

  /**
   * Returns constraints with the height tightened to the given value
   */
  tightenHeight(constraints: BoxConstraints, height: number): BoxConstraints {
    return createBoxConstraints({
      minWidth: constraints.minWidth,
      maxWidth: constraints.maxWidth,
      minHeight: height,
      maxHeight: height,
    })
  },
}

export default LayoutBuilder
