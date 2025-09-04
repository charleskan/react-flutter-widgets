import type React from 'react';
import { type CSSProperties, type ReactNode } from 'react';
import type { PageScrollPhysics } from '../../utils/ScrollPhysics';
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
 * Equivalent to Flutter's EdgeInsets class - supports uniform padding or individual sides.
 *
 * @example
 * ```tsx
 * // Uniform padding (equivalent to EdgeInsets.all(16))
 * padding={16}
 *
 * // Individual sides (equivalent to EdgeInsets.only())
 * padding={{ top: 8, bottom: 16, left: 12, right: 12 }}
 *
 * // Symmetric padding can be achieved with:
 * padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
 * ```
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
    /** Scrolling physics behavior (set to NEVER to disable scrolling, or use PageScrollPhysics for snapping) */
    physics?: ScrollPhysics | PageScrollPhysics;
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
 * Flutter-inspired ListView component with multiple variants. Supports basic children, builder pattern, and separated items.
 *
 * @example
 * ```tsx
 * // Basic ListView with children
 * <ListView>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </ListView>
 *
 * // Builder pattern
 * <ListView.builder
 *   itemCount={100}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 * />
 *
 * // With separators
 * <ListView.separated
 *   itemCount={10}
 *   itemBuilder={(index) => <div key={index}>Item {index}</div>}
 *   separatorBuilder={(index) => <hr key={`sep-${index}`} />}
 * />
 * ```
 */
export declare const ListView: React.ForwardRefExoticComponent<ListViewProps & React.RefAttributes<ListViewHandle>> & {
    builder: React.ForwardRefExoticComponent<BuilderProps<unknown> & React.RefAttributes<ListViewHandle>>;
    separated: React.ForwardRefExoticComponent<SeparatedProps<unknown> & React.RefAttributes<ListViewHandle>>;
};
//# sourceMappingURL=ListView.d.ts.map