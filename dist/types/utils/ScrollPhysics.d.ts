/**
 * Scroll physics utility classes for implementing various scrolling behaviors.
 * Inspired by Flutter's ScrollPhysics API to provide consistent behavior across platforms.
 */
/**
 * Base interface for scroll physics implementations
 */
export interface ScrollPhysicsConfig {
    /** Enable snapping behavior */
    snapping?: boolean;
    /** Snap threshold (0-1, where 0.5 means snap when scrolled more than half way) */
    snapThreshold?: number;
    /** Animation duration for snapping in milliseconds */
    snapDuration?: number;
    /** Animation easing function for snapping */
    snapEasing?: string;
    /** Item size for calculating snap positions */
    itemSize?: number | (() => number);
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
export declare class PageScrollPhysics {
    readonly config: Required<ScrollPhysicsConfig>;
    constructor(config?: ScrollPhysicsConfig);
    /**
     * Applies snapping behavior to a scroll element.
     * This method sets up event listeners and handles the snapping logic.
     *
     * @param element - The scrollable element to apply physics to
     * @param direction - Scroll direction ('horizontal' or 'vertical')
     * @param itemSize - Size of each item in pixels
     */
    applyTo(element: HTMLElement, direction?: 'horizontal' | 'vertical', itemSize?: number): () => void;
    /**
     * Snaps to the nearest item based on current scroll position
     */
    private snapToNearestItem;
    /**
     * Calculates the item size automatically based on the first child element
     */
    static calculateItemSize(element: HTMLElement, direction?: 'horizontal' | 'vertical'): number;
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