import type { CSSProperties, Key, ReactNode } from 'react';
import { CrossAxisAlignment, MainAxisAlignment } from './Flex.type';
export { MainAxisAlignment, CrossAxisAlignment };
/**
 * Scroll direction for ListView
 */
export declare enum ScrollDirection {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal"
}
/**
 * Scroll physics behavior controls how the list responds to user scroll gestures
 */
export declare enum ScrollPhysics {
    /** Default scrolling behavior (allows scrolling) */
    DEFAULT = "default",
    /** Disables user scrolling (equivalent to NeverScrollableScrollPhysics) */
    NEVER = "never",
    /** iOS-style bouncing scrolling (Safari supports; other browsers ignore) */
    BOUNCING = "bouncing",
    /** Android/desktop-style clamping scrolling (Web roughly equivalent to default) */
    CLAMPING = "clamping"
}
/**
 * Padding direction options for convenience methods
 */
export declare enum PaddingDirection {
    ALL = "all",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    NONE = "none"
}
import { EdgeInsets } from './Flex.type';
export { EdgeInsets };
/**
 * Core ListView builder interface defining how items are rendered
 */
export interface ListViewBuilder<T> {
    /** Total number of items (used when items array is not provided) */
    itemCount?: number;
    /** Array of items to render */
    items?: T[];
    /** Function that builds each item widget */
    itemBuilder: (item: T | null, index: number) => ReactNode;
    /** Optional function that builds separators between items */
    separatorBuilder?: (index: number) => ReactNode;
    /** Optional function to extract unique keys for each item */
    keyExtractor?: (item: T | null, index: number) => Key;
}
/**
 * Main ListView component props interface
 */
export interface ListViewProps<T> extends ListViewBuilder<T> {
    /** Direction of scrolling (vertical or horizontal) */
    scrollDirection?: ScrollDirection;
    /** Whether to reverse the scroll order */
    reverse?: boolean;
    /** Whether the list should shrink-wrap its content */
    shrinkWrap?: boolean;
    /** Scroll physics behavior */
    physics?: ScrollPhysics;
    /** Cross axis alignment of items */
    crossAxisAlignment?: CrossAxisAlignment;
    /** Main axis alignment of items */
    mainAxisAlignment?: MainAxisAlignment;
    /** Whether this widget should be flexible in the flex layout */
    flexible?: boolean;
    /** Whether this widget should expand to fill available space */
    expanded?: boolean;
    /** Flex factor for this widget */
    flex?: number;
    /** Padding for the list container (supports EdgeInsets or CSS values) */
    padding?: CSSProperties['padding'];
    /** Convenience prop for uniform padding on all sides */
    paddingAll?: number | string;
    /** Convenience prop for horizontal padding */
    paddingHorizontal?: number | string;
    /** Convenience prop for vertical padding */
    paddingVertical?: number | string;
    /** Whether content should be clipped to container bounds */
    clipBehavior?: 'hidden' | 'visible';
    /** Whether to add automatic keep alives for off-screen items */
    addAutomaticKeepAlives?: boolean;
    /** Whether to add repaint boundaries for performance */
    addRepaintBoundaries?: boolean;
    /** Whether to add semantic indexes for accessibility */
    addSemanticIndexes?: boolean;
    /** Cache extent for performance optimization */
    cacheExtent?: number | string;
    /** Number of semantic children for accessibility */
    semanticChildCount?: number;
}
export interface ListViewSeparatedProps<T> extends Omit<ListViewProps<T>, 'separatorBuilder'> {
    separatorBuilder: (index: number) => ReactNode;
}
export interface ScrollController {
    scrollToIndex?: (index: number) => void;
    scrollToTop?: () => void;
    scrollToBottom?: () => void;
    animateTo?: (offset: number) => void;
}
export interface ListViewController extends ScrollController {
    itemCount: number;
    isScrollable: boolean;
    hasScrolledToEnd: boolean;
}
export declare namespace ListView {
    interface BuilderProps<T> extends ListViewBuilder<T> {
        scrollDirection?: ScrollDirection;
        reverse?: boolean;
        shrinkWrap?: boolean;
        physics?: ScrollPhysics;
        crossAxisAlignment?: CrossAxisAlignment;
        mainAxisAlignment?: MainAxisAlignment;
        className?: string;
        style?: CSSProperties;
        padding?: CSSProperties['padding'];
    }
    interface SeparatedProps<T> extends ListViewSeparatedProps<T> {
    }
    function getPhysicsClassName(physics: ScrollPhysics): string;
    function getScrollDirectionClasses(direction: ScrollDirection): string;
    function getCrossAxisAlignmentClass(alignment: CrossAxisAlignment, direction: ScrollDirection): string;
    function getMainAxisAlignmentClass(alignment: MainAxisAlignment, direction: ScrollDirection): string;
    function calculatePadding(options: {
        paddingAll?: number | string;
        paddingHorizontal?: number | string;
        paddingVertical?: number | string;
        padding?: CSSProperties['padding'];
    }): CSSProperties['padding'];
}
//# sourceMappingURL=ListView.type.d.ts.map