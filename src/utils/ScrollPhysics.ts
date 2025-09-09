/**
 * Scroll physics utility classes for implementing various scrolling behaviors.
 * Inspired by Flutter's ScrollPhysics API to provide consistent behavior across platforms.
 * Uses CSS scroll-snap for optimal performance.
 */

/**
 * Configuration for scroll physics implementations
 */
export interface ScrollPhysicsConfig {
  /** Snap alignment for scroll-snap-align */
  snapAlign?: 'start' | 'center' | 'end'
  /** Snap strictness for scroll-snap-type */
  snapType?: 'mandatory' | 'proximity'
}

/**
 * PageScrollPhysics implementation that provides page-like snapping behavior.
 * Equivalent to Flutter's PageScrollPhysics class.
 *
 * This physics causes the scroll view to snap to item boundaries,
 * making it ideal for implementing carousel-like behavior.
 * Uses CSS scroll-snap for optimal performance.
 *
 * @example
 * ```tsx
 * const physics = new PageScrollPhysics({
 *   snapAlign: 'start',
 *   snapType: 'mandatory'
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
      snapAlign: 'start',
      snapType: 'mandatory',
      ...config,
    }
  }

  /**
   * Returns the CSS classes needed for scroll snapping behavior.
   * Uses CSS scroll-snap for optimal performance.
   *
   * @param direction - Scroll direction ('horizontal' or 'vertical')
   * @returns Array of CSS classes to apply
   */
  public getClasses(direction: 'horizontal' | 'vertical' = 'horizontal'): string[] {
    const classes: string[] = []

    // Add scroll-snap-type based on direction and type
    if (direction === 'horizontal') {
      classes.push('snap-x')
    } else {
      classes.push('snap-y')
    }

    // Add snap strictness
    if (this.config.snapType === 'mandatory') {
      classes.push('snap-mandatory')
    } else {
      classes.push('snap-proximity')
    }

    return classes
  }

  /**
   * Returns the CSS classes for scroll snap items.
   * Applied to each child item in the scroll container.
   *
   * @returns Array of CSS classes for items
   */
  public getItemClasses(): string[] {
    const classes: string[] = []

    // Add scroll-snap-align based on config
    switch (this.config.snapAlign) {
      case 'start':
        classes.push('snap-start')
        break
      case 'center':
        classes.push('snap-center')
        break
      case 'end':
        classes.push('snap-end')
        break
    }

    return classes
  }

  /**
   * Creates a PageScrollPhysics instance with default settings optimized for carousels
   */
  public static carousel(config: Partial<ScrollPhysicsConfig> = {}): PageScrollPhysics {
    return new PageScrollPhysics({
      snapAlign: 'center', // Changed to center for better carousel UX
      snapType: 'mandatory',
      ...config,
    })
  }

  /**
   * Creates a PageScrollPhysics instance with settings optimized for full-page scrolling
   */
  public static page(config: Partial<ScrollPhysicsConfig> = {}): PageScrollPhysics {
    return new PageScrollPhysics({
      snapAlign: 'start',
      snapType: 'mandatory',
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
