import type React from 'react';
import { type CSSProperties, type ReactNode } from 'react';
/**
 * Defines the scroll direction for ListView components.
 * @enum {string}
 */
export declare enum Axis {
    /** Vertical scrolling (default) */
    VERTICAL = "vertical",
    /** Horizontal scrolling */
    HORIZONTAL = "horizontal"
}
/**
 * Defines the scroll physics behavior for ListView components.
 * @enum {string}
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
 * Defines padding values that can be applied to ListView components.
 * Can be a single number for uniform padding or an object specifying individual sides.
 */
export type EdgeInsets = number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};
/**
 * Base properties shared by all ListView variants.
 * Provides common configuration options for scrolling behavior, styling, and accessibility.
 */
export interface BaseProps {
    /** Scroll direction (default: vertical) */
    scrollDirection?: Axis;
    /** Reverse the order of items visually and logically (note: affects accessibility) */
    reverse?: boolean;
    /** Size to content instead of filling available space (disables scrolling) */
    shrinkWrap?: boolean;
    /** Mark this ListView as primary (semantic only on Web; doesn't affect behavior) */
    primary?: boolean;
    /** Scrolling physics behavior (set to NEVER to disable scrolling) */
    physics?: ScrollPhysics;
    /** Internal padding (supports number or individual sides) */
    padding?: EdgeInsets;
    /** Fixed height/width for child items (corresponds to itemExtent) */
    itemExtent?: number;
    /** Template item to derive itemExtent from (measures first item only) */
    prototypeItem?: ReactNode;
    /** Clipping behavior for overflow content */
    clipBehavior?: 'visible' | 'hidden';
    /** Additional CSS class name */
    className?: string;
    /** Additional CSS styles */
    style?: CSSProperties;
    /** Accessible label for the list */
    'aria-label'?: string;
    /** ID of element that labels this list */
    'aria-labelledby'?: string;
}
/**
 * Props for the main ListView component that accepts children directly.
 * This is the equivalent of Flutter's ListView(...) constructor.
 */
export interface ListViewProps extends BaseProps {
    /** Array of child elements to render */
    children?: ReactNode[];
    /** Semantic child count for accessibility (equivalent to semanticChildCount) */
    semanticChildCount?: number;
}
/**
 * Props for ListView.builder - creates items dynamically using a builder function.
 * @template T - Type parameter for future extensibility
 */
export interface BuilderProps<_T> extends BaseProps {
    /** Total number of items to build */
    itemCount: number;
    /** Function that builds an item at the given index */
    itemBuilder: (index: number) => ReactNode;
}
/**
 * Props for ListView.separated - like builder but with separators between items.
 * @template T - Type parameter for future extensibility
 */
export interface SeparatedProps<T> extends BuilderProps<T> {
    /** Function that builds a separator at the given index */
    separatorBuilder: (index: number) => ReactNode;
}
/**
 * Handle interface for imperative ListView operations.
 * Equivalent to a subset of Flutter's ScrollController functionality.
 */
export interface ListViewHandle {
    /** Scroll to a specific position with animation options */
    scrollTo: (options: ScrollToOptions) => void;
    /** Get the underlying scroll element for advanced operations */
    getScrollElement: () => HTMLUListElement | null;
}
/**
 * Flutter-inspired ListView component with multiple variants.
 * Supports basic children, builder pattern, and separated items.
 */
export declare const ListView: React.ForwardRefExoticComponent<ListViewProps & React.RefAttributes<ListViewHandle>> & {
    builder: React.ForwardRefExoticComponent<BuilderProps<unknown> & React.RefAttributes<ListViewHandle>>;
    separated: React.ForwardRefExoticComponent<SeparatedProps<unknown> & React.RefAttributes<ListViewHandle>>;
};
//# sourceMappingURL=ListView.d.ts.map