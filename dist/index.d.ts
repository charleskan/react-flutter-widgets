import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties, Key } from 'react';

/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   backgroundColor="#f5f5f5"
 *   borderRadius={8}
 * >
 *   <div>Content goes here</div>
 * </Container>
 * ```
 */
interface ContainerProps {
    /** Child content to render inside the container */
    children?: ReactNode;
    /** Fixed width of the container */
    width?: number | string;
    /** Fixed height of the container */
    height?: number | string;
    /** Padding inside the container */
    padding?: string;
    /** Margin outside the container */
    margin?: string;
    /** Convenience prop for uniform padding on all sides */
    paddingAll?: number | string;
    /** Convenience prop for horizontal padding */
    paddingHorizontal?: number | string;
    /** Convenience prop for vertical padding */
    paddingVertical?: number | string;
    /** Background color of the container */
    backgroundColor?: string;
    /** Border radius for rounded corners */
    borderRadius?: number | string;
    /** Border width */
    borderWidth?: number;
    /** Border color */
    borderColor?: string;
    /** Border style */
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    /** Flex factor for this widget (equivalent to CSS flex-grow) */
    flex?: number;
    /** Whether this widget should expand to fill available space */
    expanded?: boolean;
    /** Whether this widget should be flexible in the flex layout */
    flexible?: boolean;
    /** Whether this widget should not shrink */
    flexShrink?: boolean;
    /** Align self in cross axis when inside a flex container */
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    /** Custom CSS class name (use sparingly) */
    className?: string;
    /** Custom inline styles (use sparingly) */
    style?: React.CSSProperties;
}
declare function Container(props: ContainerProps): react_jsx_runtime.JSX.Element;

/**
 * Main axis alignment controls how children are positioned along the main axis
 */
declare enum MainAxisAlignment$1 {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly"
}
/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
declare enum CrossAxisAlignment$1 {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    STRETCH = "stretch",
    BASELINE = "baseline"
}
/**
 * Main axis size controls how much space the flex container should occupy
 */
declare enum MainAxisSize {
    MIN = "min-content",
    MAX = "max-content"
}
/**
 * Text direction for layout purposes
 */
declare enum TextDirection {
    LTR = "ltr",
    RTL = "rtl"
}
/**
 * Vertical direction for column layout
 */
declare enum VerticalDirection {
    UP = "column-reverse",
    DOWN = "column"
}
/**
 * Text baseline for alignment
 */
declare enum TextBaseline {
    ALPHABETIC = "alphabetic",
    IDEOGRAPHIC = "ideographic"
}
/**
 * EdgeInsets provides methods for creating padding values in different configurations
 */
declare const EdgeInsets: {
    /**
     * Creates uniform padding for all sides
     * @param value - The padding value (number will be converted to px)
     */
    readonly all: (value: number | string) => CSSProperties["padding"];
    /**
     * Creates symmetric padding for horizontal and/or vertical sides
     * @param options - Object containing horizontal and/or vertical padding values
     */
    readonly symmetric: (options: {
        horizontal?: number | string;
        vertical?: number | string;
    }) => CSSProperties["padding"];
    /**
     * Creates padding with individual control for each side
     * @param options - Object containing left, top, right, and/or bottom padding values
     */
    readonly only: (options: {
        left?: number | string;
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
    }) => CSSProperties["padding"];
    /**
     * Creates zero padding for all sides
     */
    readonly zero: () => CSSProperties["padding"];
};
/**
 * Common flex container props interface following Flutter's layout model
 */
interface FlexProps {
    /** Child elements to render inside the flex container */
    children: ReactNode;
    /** Main axis alignment of children */
    mainAxisAlignment?: MainAxisAlignment$1;
    /** Cross axis alignment of children */
    crossAxisAlignment?: CrossAxisAlignment$1;
    /** How much space the flex container should occupy along the main axis */
    mainAxisSize?: MainAxisSize;
    /** Text direction for layout */
    textDirection?: TextDirection;
    /** Text baseline for cross-axis alignment */
    textBaseline?: TextBaseline;
    /** Flex factor for this widget (equivalent to CSS flex-grow) */
    flex?: number;
    /** Whether this widget should expand to fill available space */
    expanded?: boolean;
    /** Whether this widget should be flexible in the flex layout */
    flexible?: boolean;
    /** Fixed width of the container */
    width?: number | string;
    /** Fixed height of the container */
    height?: number | string;
    /** Padding inside the container */
    padding?: CSSProperties['padding'];
    /** Margin outside the container */
    margin?: CSSProperties['margin'];
    /** Convenience prop for uniform padding on all sides */
    paddingAll?: number | string;
    /** Convenience prop for horizontal padding */
    paddingHorizontal?: number | string;
    /** Convenience prop for vertical padding */
    paddingVertical?: number | string;
}
/**
 * Column component props extending FlexProps with column-specific options
 */
interface ColumnProps extends FlexProps {
    /** Vertical direction for the column */
    verticalDirection?: VerticalDirection;
}
/**
 * Row component props extending FlexProps with row-specific options
 */
interface RowProps extends FlexProps {
    /** Text direction affects the horizontal direction in a row */
    textDirection?: TextDirection;
}

/**
 * Row component that arranges children horizontally, equivalent to Flutter's Row widget.
 *
 * @example
 * ```tsx
 * <Row
 *   mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
 *   crossAxisAlignment={CrossAxisAlignment.CENTER}
 *   paddingHorizontal={16}
 * >
 *   <div>Left Item</div>
 *   <div>Center Item</div>
 *   <div>Right Item</div>
 * </Row>
 * ```
 */
declare function Row(props: RowProps): react_jsx_runtime.JSX.Element;
//# sourceMappingURL=Row.d.ts.map

/**
 * Column component that arranges children vertically, equivalent to Flutter's Column widget.
 *
 * @example
 * ```tsx
 * <Column
 *   mainAxisAlignment={MainAxisAlignment.CENTER}
 *   crossAxisAlignment={CrossAxisAlignment.START}
 *   paddingAll={16}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Column>
 * ```
 */
declare function Column(props: ColumnProps): react_jsx_runtime.JSX.Element;
//# sourceMappingURL=Column.d.ts.map

/**
 * Flex component that provides flexible layout container, equivalent to Flutter's Flex widget.
 * This is the base component that both Column and Row extend from.
 *
 * @example
 * ```tsx
 * <Flex
 *   direction="row"
 *   mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
 *   crossAxisAlignment={CrossAxisAlignment.CENTER}
 *   paddingAll={16}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
interface FlexComponentProps extends FlexProps {
    /** Direction of the flex layout */
    direction: 'row' | 'column';
}
declare function Flex(props: FlexComponentProps): react_jsx_runtime.JSX.Element;
//# sourceMappingURL=Flex.d.ts.map

interface SizedBoxProps {
    width?: number | string;
    height?: number | string;
}
declare function SizedBox({ width, height }: SizedBoxProps): react_jsx_runtime.JSX.Element;

interface SpacerProps {
    flex?: number;
}
declare function Spacer({ flex }: SpacerProps): react_jsx_runtime.JSX.Element;

/**
 * Scroll direction for ListView
 */
declare enum ScrollDirection {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal"
}
/**
 * Scroll physics behavior controls how the list responds to user scroll gestures
 */
declare enum ScrollPhysics {
    BOUNCING = "bouncing",
    CLAMPING = "clamping",
    NEVER_SCROLLABLE = "never_scrollable",
    ALWAYS_SCROLLABLE = "always_scrollable"
}
/**
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
declare enum CrossAxisAlignment {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    STRETCH = "stretch"
}
/**
 * Main axis alignment controls how children are positioned along the main axis
 */
declare enum MainAxisAlignment {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    SPACE_BETWEEN = "space-between",
    SPACE_AROUND = "space-around",
    SPACE_EVENLY = "space-evenly"
}
/**
 * Padding direction options for convenience methods
 */
declare enum PaddingDirection {
    ALL = "all",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    NONE = "none"
}

/**
 * Core ListView builder interface defining how items are rendered
 */
interface ListViewBuilder<T> {
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
interface ListViewProps<T> extends ListViewBuilder<T> {
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

declare function ListView<T>(props: ListViewProps<T>): react_jsx_runtime.JSX.Element;
declare namespace ListView {
    var builder: <T>(props: ListViewProps<T>) => react_jsx_runtime.JSX.Element;
    var separated: <T>(props: ListViewProps<T> & {
        separatorBuilder: (index: number) => ReactNode;
    }) => react_jsx_runtime.JSX.Element;
}
//# sourceMappingURL=ListView.d.ts.map

export { Column, Container, CrossAxisAlignment$1 as CrossAxisAlignment, EdgeInsets, Flex, ListView, MainAxisAlignment$1 as MainAxisAlignment, MainAxisSize, PaddingDirection, Row, ScrollDirection, ScrollPhysics, SizedBox, Spacer, TextBaseline, TextDirection, VerticalDirection };
export type { ColumnProps, ContainerProps, FlexProps, ListViewProps, RowProps, SizedBoxProps, SpacerProps };
