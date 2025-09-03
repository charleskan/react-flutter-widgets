import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Orientation } from './MediaQuery'

/**
 * Builder function type that receives orientation and returns content
 */
export type OrientationWidgetBuilder = (orientation: Orientation) => ReactNode

/**
 * OrientationBuilder component equivalent to Flutter's OrientationBuilder widget.
 * Builds content based on the current screen orientation.
 *
 * @example
 * ```tsx
 * <OrientationBuilder builder={(orientation) => {
 *   if (orientation === Orientation.landscape) {
 *     return <LandscapeLayout />
 *   } else {
 *     return <PortraitLayout />
 *   }
 * }} />
 * ```
 */
export interface OrientationBuilderProps {
  /** Builder function that receives orientation and returns content */
  builder: OrientationWidgetBuilder

  /** Custom CSS class name */
  className?: string

  /** Custom inline styles */
  style?: React.CSSProperties
}

function OrientationBuilder({ builder, className = '', style = {} }: OrientationBuilderProps) {
  const [orientation, setOrientation] = useState<Orientation>(() => getCurrentOrientation())

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(getCurrentOrientation())
    }

    // Listen for orientation changes
    const mediaQueryList = window.matchMedia('(orientation: portrait)')

    // For modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateOrientation)
    } else {
      // For older browsers
      mediaQueryList.addListener(updateOrientation)
    }

    // Also listen for resize events as a fallback
    window.addEventListener('resize', updateOrientation)

    // Listen for orientationchange event on mobile devices
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure the orientation change is complete
      setTimeout(updateOrientation, 100)
    })

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', updateOrientation)
      } else {
        mediaQueryList.removeListener(updateOrientation)
      }

      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  const content = builder(orientation)

  return (
    <div className={className} style={style}>
      {content}
    </div>
  )
}

/**
 * Hook to get the current screen orientation
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() => getCurrentOrientation())

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(getCurrentOrientation())
    }

    const mediaQueryList = window.matchMedia('(orientation: portrait)')

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateOrientation)
    } else {
      mediaQueryList.addListener(updateOrientation)
    }

    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', () => {
      setTimeout(updateOrientation, 100)
    })

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', updateOrientation)
      } else {
        mediaQueryList.removeListener(updateOrientation)
      }

      window.removeEventListener('resize', updateOrientation)
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [])

  return orientation
}

/**
 * Hook to check if the current orientation matches the specified orientation
 */
export function useOrientationMatch(targetOrientation: Orientation): boolean {
  const currentOrientation = useOrientation()
  return currentOrientation === targetOrientation
}

/**
 * Hook that returns different values based on orientation
 */
export function useOrientationValue<T>(portraitValue: T, landscapeValue: T): T {
  const orientation = useOrientation()
  return orientation === Orientation.portrait ? portraitValue : landscapeValue
}

// Helper functions
function getCurrentOrientation(): Orientation {
  // First try to use the Screen Orientation API if available
  if (
    typeof window !== 'undefined' &&
    'screen' in window &&
    window.screen &&
    'orientation' in window.screen
  ) {
    const screenWithOrientation = window.screen as Screen & {
      orientation?: { angle?: number; type?: string }
    }
    const screenOrientation = screenWithOrientation.orientation
    if (screenOrientation && typeof screenOrientation.angle === 'number') {
      // The Screen Orientation API provides more detailed orientation info
      return screenOrientation.angle === 0 || screenOrientation.angle === 180
        ? Orientation.portrait
        : Orientation.landscape
    }
  }

  // Fallback to checking window dimensions
  return typeof window !== 'undefined' && window.innerHeight >= window.innerWidth
    ? Orientation.portrait
    : Orientation.landscape
}

/**
 * Utility functions for working with orientation
 */
export const OrientationUtils = {
  /**
   * Check if the current orientation is portrait
   */
  isPortrait(): boolean {
    return getCurrentOrientation() === Orientation.portrait
  },

  /**
   * Check if the current orientation is landscape
   */
  isLandscape(): boolean {
    return getCurrentOrientation() === Orientation.landscape
  },

  /**
   * Get the rotation angle (if supported)
   */
  getRotationAngle(): number {
    if ('screen' in window && 'orientation' in window.screen && window.screen.orientation) {
      return window.screen.orientation.angle
    }

    // Fallback to deprecated window.orientation
    if ('orientation' in window) {
      const windowWithOrientation = window as Window & { orientation?: number }
      return windowWithOrientation.orientation || 0
    }

    return 0
  },

  /**
   * Get aspect ratio of the screen
   */
  getAspectRatio(): number {
    return window.innerWidth / window.innerHeight
  },

  /**
   * Check if the device is likely a mobile device based on orientation capabilities
   */
  isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false
    
    const windowWithOrientation = window as Window & { orientation?: number }
    if ('orientation' in windowWithOrientation) return true
    
    if ('screen' in window && window.screen && 'orientation' in window.screen) {
      return true
    }
    
    return false
  },
}

export default OrientationBuilder
