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
    snapAlign?: 'start' | 'center' | 'end';
    /** Snap strictness for scroll-snap-type */
    snapType?: 'mandatory' | 'proximity';
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
export declare class PageScrollPhysics {
    readonly config: Required<ScrollPhysicsConfig>;
    constructor(config?: ScrollPhysicsConfig);
    /**
     * Returns the CSS classes needed for scroll snapping behavior.
     * Uses CSS scroll-snap for optimal performance.
     *
     * @param direction - Scroll direction ('horizontal' or 'vertical')
     * @returns Array of CSS classes to apply
     */
    getClasses(direction?: 'horizontal' | 'vertical'): string[];
    /**
     * Returns the CSS classes for scroll snap items.
     * Applied to each child item in the scroll container.
     *
     * @returns Array of CSS classes for items
     */
    getItemClasses(): string[];
    /**
     * Creates a PageScrollPhysics instance with default settings optimized for carousels
     */
    static carousel(config?: Partial<ScrollPhysicsConfig>): PageScrollPhysics;
    /**
     * Creates a PageScrollPhysics instance with settings optimized for full-page scrolling
     */
    static page(config?: Partial<ScrollPhysicsConfig>): PageScrollPhysics;
}
/**
 * Utility function to create PageScrollPhysics with common presets
 */
export declare function createPageScrollPhysics(preset?: 'carousel' | 'page' | 'custom', config?: ScrollPhysicsConfig): PageScrollPhysics;
//# sourceMappingURL=ScrollPhysics.d.ts.map