/**
 * Scroll physics utility classes for implementing various scrolling behaviors.
 * Inspired by Flutter's ScrollPhysics API to provide consistent behavior across platforms.
 */

/**
 * Base interface for scroll physics implementations
 */
export interface ScrollPhysicsConfig {
  /** Enable snapping behavior */
  snapping?: boolean
  /** Snap threshold (0-1, where 0.5 means snap when scrolled more than half way) */
  snapThreshold?: number
  /** Animation duration for snapping in milliseconds */
  snapDuration?: number
  /** Animation easing function for snapping */
  snapEasing?: string
  /** Item size for calculating snap positions */
  itemSize?: number | (() => number)
}

/**
 * PageScrollPhysics implementation that provides page-like snapping behavior.
 * Equivalent to Flutter's PageScrollPhysics class.
 *
 * This physics causes the scroll view to snap to item boundaries,
 * making it ideal for implementing carousel-like behavior.
 *
 * @example
 * ```tsx
 * const physics = new PageScrollPhysics({
 *   snapThreshold: 0.3,
 *   snapDuration: 300
 * })
 *
 * <ListView.builder
 *   scrollDirection={Axis.HORIZONTAL}
 *   physics={physics}
 *   itemCount={items.length}
 *   itemBuilder={(index) => <Card key={index} />}
 * />
 * ```
 */
export class PageScrollPhysics {
  public readonly config: Required<ScrollPhysicsConfig>

  constructor(config: ScrollPhysicsConfig = {}) {
    this.config = {
      snapping: true,
      snapThreshold: 0.5,
      snapDuration: 300,
      snapEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      itemSize: () => 0,
      ...config,
    }
  }

  /**
   * Applies snapping behavior to a scroll element.
   * This method sets up event listeners and handles the snapping logic.
   *
   * @param element - The scrollable element to apply physics to
   * @param direction - Scroll direction ('horizontal' or 'vertical')
   * @param itemSize - Size of each item in pixels
   */
  public applyTo(
    element: HTMLElement,
    direction: 'horizontal' | 'vertical' = 'horizontal',
    itemSize?: number,
  ): () => void {
    if (!this.config.snapping) {
      return () => {} // No-op cleanup function
    }

    const actualItemSize =
      itemSize ??
      (typeof this.config.itemSize === 'function' ? this.config.itemSize() : this.config.itemSize)

    if (actualItemSize <= 0) {
      console.warn('PageScrollPhysics: itemSize must be greater than 0 for snapping to work')
      return () => {}
    }

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      if (isScrolling) return

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        this.snapToNearestItem(element, direction, actualItemSize)
      }, 150) // Wait 150ms after scroll stops
    }

    const handleScrollStart = () => {
      isScrolling = true
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
        scrollTimeout = null
      }
    }

    const handleScrollEnd = () => {
      isScrolling = false
    }

    // Add event listeners
    element.addEventListener('scroll', handleScroll, { passive: true })
    element.addEventListener('scrollstart', handleScrollStart, { passive: true })
    element.addEventListener('scrollend', handleScrollEnd, { passive: true })

    // For browsers that don't support scrollend, use touchend and mouseup
    element.addEventListener('touchend', handleScrollEnd, { passive: true })
    element.addEventListener('mouseup', handleScrollEnd, { passive: true })

    // Cleanup function
    return () => {
      element.removeEventListener('scroll', handleScroll)
      element.removeEventListener('scrollstart', handleScrollStart)
      element.removeEventListener('scrollend', handleScrollEnd)
      element.removeEventListener('touchend', handleScrollEnd)
      element.removeEventListener('mouseup', handleScrollEnd)

      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }

  /**
   * Snaps to the nearest item based on current scroll position
   */
  private snapToNearestItem(
    element: HTMLElement,
    direction: 'horizontal' | 'vertical',
    itemSize: number,
  ): void {
    const isHorizontal = direction === 'horizontal'
    const currentScroll = isHorizontal ? element.scrollLeft : element.scrollTop

    // Calculate which item we're closest to
    const currentIndex = currentScroll / itemSize
    const floorIndex = Math.floor(currentIndex)
    const remainder = currentIndex - floorIndex

    // Determine target index based on threshold
    let targetIndex: number
    if (remainder > this.config.snapThreshold) {
      targetIndex = floorIndex + 1
    } else {
      targetIndex = floorIndex
    }

    // Calculate target scroll position
    const targetScroll = targetIndex * itemSize

    // Only snap if we're not already at the target
    if (Math.abs(currentScroll - targetScroll) > 1) {
      const scrollOptions: ScrollToOptions = {
        [isHorizontal ? 'left' : 'top']: targetScroll,
        behavior: 'smooth',
      }

      element.scrollTo(scrollOptions)
    }
  }

  /**
   * Calculates the item size automatically based on the first child element
   */
  public static calculateItemSize(
    element: HTMLElement,
    direction: 'horizontal' | 'vertical' = 'horizontal',
  ): number {
    const firstChild = element.firstElementChild as HTMLElement
    if (!firstChild) return 0

    const rect = firstChild.getBoundingClientRect()
    return direction === 'horizontal' ? rect.width : rect.height
  }

  /**
   * Creates a PageScrollPhysics instance with default settings optimized for carousels
   */
  public static carousel(config: Partial<ScrollPhysicsConfig> = {}): PageScrollPhysics {
    return new PageScrollPhysics({
      snapThreshold: 0.3,
      snapDuration: 250,
      snapEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      ...config,
    })
  }

  /**
   * Creates a PageScrollPhysics instance with settings optimized for full-page scrolling
   */
  public static page(config: Partial<ScrollPhysicsConfig> = {}): PageScrollPhysics {
    return new PageScrollPhysics({
      snapThreshold: 0.5,
      snapDuration: 400,
      snapEasing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      ...config,
    })
  }
}

/**
 * Utility function to create PageScrollPhysics with common presets
 */
export function createPageScrollPhysics(
  preset: 'carousel' | 'page' | 'custom' = 'carousel',
  config?: ScrollPhysicsConfig,
): PageScrollPhysics {
  switch (preset) {
    case 'carousel':
      return PageScrollPhysics.carousel(config)
    case 'page':
      return PageScrollPhysics.page(config)
    default:
      return new PageScrollPhysics(config)
  }
}
