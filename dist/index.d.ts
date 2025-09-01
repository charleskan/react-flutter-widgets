import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { ReactNode, CSSProperties, Key } from 'react';

interface ContainerProps {
    /** Child content to render inside the container */
    children?: ReactNode;
    /** Fixed width of the container */
    width?: number | string;
    /** Fixed height of the container */
    height?: number | string;
    /** Padding inside the container - must use EdgeInsets methods */
    padding?: string;
    /** Margin outside the container - must use EdgeInsets methods */
    margin?: string;
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
 *
 * EdgeInsets methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 */
declare function Container(props: ContainerProps): react_jsx_runtime.JSX.Element;

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
 * Cross axis alignment controls how children are positioned perpendicular to the main axis
 */
declare enum CrossAxisAlignment {
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
    RTL = "rtl",
    AUTO = "auto"
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
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 */
declare const EdgeInsets$2: {
    /**
     * Creates uniform spacing for all sides
     * @param value - The spacing value (number will be converted to px)
     */
    readonly all: (value: number | string) => string;
    /**
     * Creates symmetric spacing for horizontal and/or vertical sides
     * @param options - Object containing horizontal and/or vertical spacing values
     */
    readonly symmetric: (options: {
        horizontal?: number | string;
        vertical?: number | string;
    }) => string;
    /**
     * Creates spacing with individual control for each side
     * @param options - Object containing left, top, right, and/or bottom spacing values
     */
    readonly only: (options: {
        left?: number | string;
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
    }) => string;
    /**
     * Creates zero spacing for all sides
     */
    readonly zero: () => string;
};
/**
 * Common flex container props interface following Flutter's layout model
 */
interface FlexProps {
    /** Child elements to render inside the flex container */
    children: ReactNode;
    /** Main axis alignment of children */
    mainAxisAlignment?: MainAxisAlignment;
    /** Cross axis alignment of children */
    crossAxisAlignment?: CrossAxisAlignment;
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
    /** Padding inside the container - must use EdgeInsets methods */
    padding?: string;
    /** Margin outside the container - must use EdgeInsets methods */
    margin?: string;
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
 *   padding={EdgeInsets.symmetric({ horizontal: 16 })}
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
 *   padding={EdgeInsets.all(16)}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Column>
 * ```
 */
declare function Column(props: ColumnProps): react_jsx_runtime.JSX.Element;
//# sourceMappingURL=Column.d.ts.map

interface FlexComponentProps extends FlexProps {
    /** Direction of the flex layout */
    direction: 'row' | 'column';
}
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
 *   padding={EdgeInsets.all(16)}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
declare function Flex(props: FlexComponentProps): react_jsx_runtime.JSX.Element;
//# sourceMappingURL=Flex.d.ts.map

/**
 * SizedBox component equivalent to Flutter's SizedBox widget.
 * Creates a box with specific width and/or height dimensions.
 *
 * @example
 * ```tsx
 * // Fixed size box
 * <SizedBox width={100} height={50} />
 *
 * // Width only
 * <SizedBox width="100%" />
 *
 * // Height only
 * <SizedBox height={20} />
 *
 * // Using string values
 * <SizedBox width="200px" height="10rem" />
 * ```
 */
interface SizedBoxProps {
    /** Width of the box - number is treated as pixels, string passed directly to CSS */
    width?: number | string;
    /** Height of the box - number is treated as pixels, string passed directly to CSS */
    height?: number | string;
}
declare function SizedBox({ width, height }: SizedBoxProps): react_jsx_runtime.JSX.Element;

/**
 * Spacer component equivalent to Flutter's Spacer widget.
 * Creates flexible space that expands to fill available space in a flex container.
 *
 * @example
 * ```tsx
 * <Row>
 *   <div>Left content</div>
 *   <Spacer />
 *   <div>Right content</div>
 * </Row>
 *
 * // With custom flex value
 * <Column>
 *   <div>Top content</div>
 *   <Spacer flex={2} />
 *   <div>Bottom content</div>
 * </Column>
 * ```
 */
interface SpacerProps {
    /** Flex factor controlling how much space this widget takes relative to other flex children */
    flex?: number;
}
declare function Spacer({ flex }: SpacerProps): react_jsx_runtime.JSX.Element;

/**
 * Defines the scroll direction for ListView components.
 * @enum {string}
 */
declare enum Axis {
    /** Vertical scrolling (default) */
    VERTICAL = "vertical",
    /** Horizontal scrolling */
    HORIZONTAL = "horizontal"
}
/**
 * Defines the scroll physics behavior for ListView components.
 * @enum {string}
 */
declare enum ScrollPhysics$1 {
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
type EdgeInsets$1 = number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};
/**
 * Base properties shared by all ListView variants.
 * Provides common configuration options for scrolling behavior, styling, and accessibility.
 */
interface BaseProps {
    /** Scroll direction (default: vertical) */
    scrollDirection?: Axis;
    /** Reverse the order of items visually and logically (note: affects accessibility) */
    reverse?: boolean;
    /** Size to content instead of filling available space (disables scrolling) */
    shrinkWrap?: boolean;
    /** Mark this ListView as primary (semantic only on Web; doesn't affect behavior) */
    primary?: boolean;
    /** Scrolling physics behavior (set to NEVER to disable scrolling) */
    physics?: ScrollPhysics$1;
    /** Internal padding (supports number or individual sides) */
    padding?: EdgeInsets$1;
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
interface ListViewProps$1 extends BaseProps {
    /** Array of child elements to render */
    children?: ReactNode[];
    /** Semantic child count for accessibility (equivalent to semanticChildCount) */
    semanticChildCount?: number;
}
/**
 * Props for ListView.builder - creates items dynamically using a builder function.
 * @template T - Type parameter for future extensibility
 */
interface BuilderProps<_T> extends BaseProps {
    /** Total number of items to build */
    itemCount: number;
    /** Function that builds an item at the given index */
    itemBuilder: (index: number) => ReactNode;
}
/**
 * Props for ListView.separated - like builder but with separators between items.
 * @template T - Type parameter for future extensibility
 */
interface SeparatedProps<T> extends BuilderProps<T> {
    /** Function that builds a separator at the given index */
    separatorBuilder: (index: number) => ReactNode;
}
/**
 * Handle interface for imperative ListView operations.
 * Equivalent to a subset of Flutter's ScrollController functionality.
 */
interface ListViewHandle {
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
declare const ListView: React$1.ForwardRefExoticComponent<ListViewProps$1 & React$1.RefAttributes<ListViewHandle>> & {
    builder: React$1.ForwardRefExoticComponent<BuilderProps<unknown> & React$1.RefAttributes<ListViewHandle>>;
    separated: React$1.ForwardRefExoticComponent<SeparatedProps<unknown> & React$1.RefAttributes<ListViewHandle>>;
};

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

/**
 * InkWell component equivalent to Flutter's InkWell widget.
 * Provides Material Design ink splash effects on user interaction.
 *
 * @example
 * ```tsx
 * <InkWell onTap={() => console.log('Tapped!')} splashColor="#e3f2fd">
 *   <Container padding="16px" backgroundColor="#f5f5f5">
 *     <span>Click me!</span>
 *   </Container>
 * </InkWell>
 * ```
 */
interface InkWellProps {
    /** Child content to render inside the InkWell */
    children?: ReactNode;
    /** Callback function when the InkWell is tapped/clicked */
    onTap?: () => void;
    /** Callback function when the InkWell is double-tapped */
    onDoubleTap?: () => void;
    /** Callback function when the InkWell is long-pressed */
    onLongPress?: () => void;
    /** Callback function when hover starts */
    onHover?: (hovering: boolean) => void;
    /** Callback function when focus changes */
    onFocusChange?: (focused: boolean) => void;
    /** Color of the splash effect */
    splashColor?: string;
    /** Color of the hover effect */
    hoverColor?: string;
    /** Color of the focus effect */
    focusColor?: string;
    /** Color of the highlight when pressed */
    highlightColor?: string;
    /** Border radius for the splash effect */
    borderRadius?: number | string;
    /** Whether the InkWell should be enabled */
    enabled?: boolean;
    /** Whether to exclude this widget from semantics */
    excludeFromSemantics?: boolean;
    /** Duration of the splash animation in milliseconds */
    splashDuration?: number;
    /** Duration of the hover animation in milliseconds */
    hoverDuration?: number;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
    /** Accessibility role */
    role?: string;
    /** Tab index for keyboard navigation */
    tabIndex?: number;
}
declare function InkWell(props: InkWellProps): react_jsx_runtime.JSX.Element;

/**
 * GestureDetector component equivalent to Flutter's GestureDetector widget.
 * Detects various gestures like tap, double tap, long press, and provides callbacks.
 *
 * @example
 * ```tsx
 * <GestureDetector
 *   onTap={() => console.log('Tapped!')}
 *   onDoubleTap={() => console.log('Double tapped!')}
 *   onLongPress={() => console.log('Long pressed!')}
 * >
 *   <div>Gesture detection area</div>
 * </GestureDetector>
 * ```
 */
interface GestureDetectorProps {
    /** Child content to render inside the GestureDetector */
    children?: ReactNode;
    /** Callback function when a tap is detected */
    onTap?: () => void;
    /** Callback function when the gesture starts (mouse/touch down) */
    onTapDown?: (details: TapDownDetails) => void;
    /** Callback function when the gesture is released */
    onTapUp?: (details: TapUpDetails) => void;
    /** Callback function when a tap is cancelled */
    onTapCancel?: () => void;
    /** Callback function when a double tap is detected */
    onDoubleTap?: () => void;
    /** Callback function when a long press is detected */
    onLongPress?: () => void;
    /** Callback function when a long press starts */
    onLongPressStart?: (details: LongPressStartDetails) => void;
    /** Callback function when a long press moves */
    onLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void;
    /** Callback function when a long press ends */
    onLongPressEnd?: (details: LongPressEndDetails) => void;
    /** Callback function when a pan/drag starts */
    onPanStart?: (details: DragStartDetails) => void;
    /** Callback function when a pan/drag updates */
    onPanUpdate?: (details: DragUpdateDetails) => void;
    /** Callback function when a pan/drag ends */
    onPanEnd?: (details: DragEndDetails) => void;
    /** Whether the gesture detector should exclude semantics */
    excludeFromSemantics?: boolean;
    /** Behavior for hit testing */
    behavior?: HitTestBehavior;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare enum HitTestBehavior {
    /** Only hit test if the widget has content */
    deferToChild = "deferToChild",
    /** Always hit test, even if no visible content */
    opaque = "opaque",
    /** Never hit test */
    translucent = "translucent"
}
interface Offset {
    dx: number;
    dy: number;
}
interface TapDownDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
interface TapUpDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
interface LongPressStartDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
interface LongPressMoveUpdateDetails {
    globalPosition: Offset;
    localPosition: Offset;
    offsetFromOrigin: Offset;
}
interface LongPressEndDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
interface DragStartDetails {
    globalPosition: Offset;
    localPosition: Offset;
}
interface DragUpdateDetails {
    globalPosition: Offset;
    localPosition: Offset;
    delta: Offset;
}
interface DragEndDetails {
    velocity: Offset;
    primaryVelocity?: number;
}
declare function GestureDetector(props: GestureDetectorProps): react_jsx_runtime.JSX.Element;

interface AnimatedContainerProps extends Omit<ContainerProps, 'style'> {
    /** Duration of the animation in milliseconds */
    duration: number;
    /** Animation curve/timing function */
    curve?: AnimationCurve | string;
    /** Delay before starting the animation in milliseconds */
    delay?: number;
    /** Callback function called when the animation starts */
    onStart?: () => void;
    /** Callback function called when the animation completes */
    onEnd?: () => void;
    /** Custom inline styles (will be merged with animated styles) */
    style?: React.CSSProperties;
}
declare enum AnimationCurve {
    /** Linear animation curve */
    linear = "linear",
    /** Ease animation curve (default) */
    ease = "ease",
    /** Ease-in animation curve */
    easeIn = "ease-in",
    /** Ease-out animation curve */
    easeOut = "ease-out",
    /** Ease-in-out animation curve */
    easeInOut = "ease-in-out",
    /** Bounce animation curve */
    bounceIn = "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    /** Elastic animation curve */
    elasticIn = "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    /** Fast out slow in (Material Design) */
    fastOutSlowIn = "cubic-bezier(0.4, 0, 0.2, 1)",
    /** Decelerate (Material Design) */
    decelerate = "cubic-bezier(0, 0, 0.2, 1)"
}
/**
 * AnimatedContainer component equivalent to Flutter's AnimatedContainer widget.
 * Automatically animates changes to its properties over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedContainer
 *   width={isExpanded ? 200 : 100}
 *   height={isExpanded ? 200 : 100}
 *   backgroundColor={isExpanded ? '#ff0000' : '#0000ff'}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Animation completed')}
 * >
 *   <span>Animated content</span>
 * </AnimatedContainer>
 * ```
 */
declare function AnimatedContainer(props: AnimatedContainerProps): react_jsx_runtime.JSX.Element;

interface AnimatedOpacityProps {
    /** Child content to render */
    children?: ReactNode;
    /** Target opacity value (0.0 to 1.0) */
    opacity: number;
    /** Duration of the animation in milliseconds */
    duration: number;
    /** Animation curve/timing function */
    curve?: AnimationCurve | string;
    /** Delay before starting the animation in milliseconds */
    delay?: number;
    /** Callback function called when the animation starts */
    onStart?: () => void;
    /** Callback function called when the animation completes */
    onEnd?: () => void;
    /** Whether the widget should always maintain its size */
    alwaysIncludeSemantics?: boolean;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
/**
 * AnimatedOpacity component equivalent to Flutter's AnimatedOpacity widget.
 * Animates the opacity of its child over a specified duration.
 *
 * @example
 * ```tsx
 * <AnimatedOpacity
 *   opacity={isVisible ? 1.0 : 0.0}
 *   duration={300}
 *   curve="ease-in-out"
 *   onEnd={() => console.log('Fade completed')}
 * >
 *   <div>Content to fade</div>
 * </AnimatedOpacity>
 * ```
 */
declare function AnimatedOpacity(props: AnimatedOpacityProps): react_jsx_runtime.JSX.Element;

interface Size {
    width: number;
    height: number;
}
interface EdgeInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
declare enum Orientation {
    portrait = "portrait",
    landscape = "landscape"
}
declare enum Brightness {
    light = "light",
    dark = "dark"
}
interface MediaQueryData {
    size: Size;
    devicePixelRatio: number;
    orientation: Orientation;
    padding: EdgeInsets;
    viewInsets: EdgeInsets;
    textScaleFactor: number;
    platformBrightness: Brightness;
    disableAnimations: boolean;
    highContrast: boolean;
    supportsTouch: boolean;
}
interface MediaQueryBreakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}
declare const defaultBreakpoints: MediaQueryBreakpoints;
type MediaQueryContextValue = MediaQueryData & {
    breakpoints: MediaQueryBreakpoints;
};
interface MediaQueryProps {
    children: ReactNode;
    breakpoints?: MediaQueryBreakpoints;
    data?: MediaQueryData;
}
declare function MediaQuery({ children, breakpoints, data, }: MediaQueryProps): react_jsx_runtime.JSX.Element;
declare function useMediaQuery(): MediaQueryContextValue;
declare function useBreakpoint(breakpoints?: MediaQueryBreakpoints): "xl" | "lg" | "md" | "sm" | "xs";
declare function useBreakpointMatch(condition: string, breakpoints?: MediaQueryBreakpoints): boolean;

/**
 * BoxConstraints interface equivalent to Flutter's BoxConstraints
 */
interface BoxConstraints {
    /** Minimum width constraint */
    minWidth: number;
    /** Maximum width constraint */
    maxWidth: number;
    /** Minimum height constraint */
    minHeight: number;
    /** Maximum height constraint */
    maxHeight: number;
    /** Whether the width is bounded (has a finite maximum) */
    hasBoundedWidth: boolean;
    /** Whether the height is bounded (has a finite maximum) */
    hasBoundedHeight: boolean;
    /** Whether the width is tightly constrained (min equals max) */
    hasTightWidth: boolean;
    /** Whether the height is tightly constrained (min equals max) */
    hasTightHeight: boolean;
    /** Whether both dimensions are tightly constrained */
    isTight: boolean;
    /** Whether the constraints allow any size */
    isNormalized: boolean;
}
/**
 * Builder function type that receives constraints and returns content
 */
type LayoutWidgetBuilder = (constraints: BoxConstraints) => ReactNode;
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
interface LayoutBuilderProps {
    /** Builder function that receives constraints and returns content */
    builder: LayoutWidgetBuilder;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function LayoutBuilder({ builder, className, style }: LayoutBuilderProps): react_jsx_runtime.JSX.Element;
declare function createBoxConstraints({ minWidth, maxWidth, minHeight, maxHeight, }: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}): BoxConstraints;
declare function createTightConstraints(width: number, height: number): BoxConstraints;
declare function createLooseConstraints(maxWidth?: number, maxHeight?: number): BoxConstraints;
declare function createExpandedConstraints(): BoxConstraints;
declare const BoxConstraintsUtils: {
    /**
     * Returns the biggest size that satisfies the constraints
     */
    biggest(constraints: BoxConstraints): {
        width: number;
        height: number;
    };
    /**
     * Returns the smallest size that satisfies the constraints
     */
    smallest(constraints: BoxConstraints): {
        width: number;
        height: number;
    };
    /**
     * Returns a size that attempts to be the specified size within the constraints
     */
    constrain(constraints: BoxConstraints, width: number, height: number): {
        width: number;
        height: number;
    };
    /**
     * Returns constraints with width constrained to the given value
     */
    tighten(constraints: BoxConstraints, width?: number, height?: number): BoxConstraints;
    /**
     * Returns constraints with the width and height loosened
     */
    loosen(constraints: BoxConstraints): BoxConstraints;
    /**
     * Returns constraints with the width tightened to the given value
     */
    tightenWidth(constraints: BoxConstraints, width: number): BoxConstraints;
    /**
     * Returns constraints with the height tightened to the given value
     */
    tightenHeight(constraints: BoxConstraints, height: number): BoxConstraints;
};

/**
 * Builder function type that receives orientation and returns content
 */
type OrientationWidgetBuilder = (orientation: Orientation) => ReactNode;
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
interface OrientationBuilderProps {
    /** Builder function that receives orientation and returns content */
    builder: OrientationWidgetBuilder;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function OrientationBuilder({ builder, className, style }: OrientationBuilderProps): react_jsx_runtime.JSX.Element;
/**
 * Hook to get the current screen orientation
 */
declare function useOrientation(): Orientation;
/**
 * Hook to check if the current orientation matches the specified orientation
 */
declare function useOrientationMatch(targetOrientation: Orientation): boolean;
/**
 * Hook that returns different values based on orientation
 */
declare function useOrientationValue<T>(portraitValue: T, landscapeValue: T): T;
/**
 * Utility functions for working with orientation
 */
declare const OrientationUtils: {
    /**
     * Check if the current orientation is portrait
     */
    isPortrait(): boolean;
    /**
     * Check if the current orientation is landscape
     */
    isLandscape(): boolean;
    /**
     * Get the rotation angle (if supported)
     */
    getRotationAngle(): number;
    /**
     * Get aspect ratio of the screen
     */
    getAspectRatio(): number;
    /**
     * Check if the device is likely a mobile device based on orientation capabilities
     */
    isMobileDevice(): boolean;
};

/**
 * Matrix4 class for 4x4 transformation matrices
 */
declare class Matrix4 {
    storage: Float64Array;
    constructor(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number);
    /**
     * Creates an identity matrix
     */
    static identity(): Matrix4;
    /**
     * Creates a translation matrix
     */
    static translationValues(x: number, y: number, z?: number): Matrix4;
    /**
     * Creates a scale matrix
     */
    static diagonal3Values(x: number, y: number, z?: number): Matrix4;
    /**
     * Creates a rotation matrix around Z axis (degrees)
     */
    static rotationZ(radians: number): Matrix4;
    /**
     * Creates a rotation matrix around X axis (radians)
     */
    static rotationX(radians: number): Matrix4;
    /**
     * Creates a rotation matrix around Y axis (radians)
     */
    static rotationY(radians: number): Matrix4;
    /**
     * Creates a skew matrix
     */
    static skewX(radians: number): Matrix4;
    static skewY(radians: number): Matrix4;
    /**
     * Multiplies this matrix by another matrix
     */
    multiply(other: Matrix4): Matrix4;
    /**
     * Converts to CSS transform matrix3d string
     */
    toCssMatrix3d(): string;
    /**
     * Converts to CSS transform matrix string (2D)
     */
    toCssMatrix(): string;
    /**
     * Creates a copy of this matrix
     */
    clone(): Matrix4;
}
/**
 * Alignment enumeration for transform origin
 */
declare enum Alignment {
    topLeft = "top left",
    topCenter = "top center",
    topRight = "top right",
    centerLeft = "center left",
    center = "center",
    centerRight = "center right",
    bottomLeft = "bottom left",
    bottomCenter = "bottom center",
    bottomRight = "bottom right"
}
/**
 * Transform component equivalent to Flutter's Transform widget.
 * Applies 2D and 3D transformations to its child.
 *
 * @example
 * ```tsx
 * <Transform
 *   transform={Matrix4.rotationZ(Math.PI / 4)}
 *   alignment={Alignment.center}
 * >
 *   <div>Rotated content</div>
 * </Transform>
 * ```
 */
interface TransformProps {
    /** Child content to transform */
    children?: ReactNode;
    /** 4x4 transformation matrix */
    transform: Matrix4;
    /** Alignment point for the transformation */
    alignment?: Alignment | string;
    /** Transform origin as CSS string (e.g., "50% 50%") */
    transformOrigin?: string;
    /** Whether to filter the quality of the transformation */
    filterQuality?: FilterQuality;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare enum FilterQuality {
    /** Use browser default */
    none = "auto",
    /** Low quality, fast */
    low = "crisp-edges",
    /** Medium quality */
    medium = "auto",
    /** High quality, slower */
    high = "smooth"
}
declare function Transform({ children, transform, alignment, transformOrigin, filterQuality, className, style, }: TransformProps): react_jsx_runtime.JSX.Element;
declare namespace Transform {
    var rotate: ({ angle, children, alignment, className, style, }: {
        angle: number;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var scale: ({ scale, scaleX, scaleY, children, alignment, className, style, }: {
        scale?: number;
        scaleX?: number;
        scaleY?: number;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var translate: ({ offset, x, y, children, className, style, }: {
        offset?: {
            x: number;
            y: number;
        };
        x?: number;
        y?: number;
        children?: ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
    var flip: ({ flipX, flipY, children, alignment, className, style, }: {
        flipX?: boolean;
        flipY?: boolean;
        children?: ReactNode;
        alignment?: Alignment | string;
        className?: string;
        style?: React.CSSProperties;
    }) => react_jsx_runtime.JSX.Element;
}
/**
 * Utility functions for creating common transformations
 */
declare const TransformUtils: {
    /**
     * Convert degrees to radians
     */
    degreesToRadians(degrees: number): number;
    /**
     * Convert radians to degrees
     */
    radiansToDegrees(radians: number): number;
    /**
     * Create a combined transformation matrix
     */
    combine(...matrices: Matrix4[]): Matrix4;
    /**
     * Create a rotation transformation from degrees
     */
    rotationFromDegrees(degrees: number): Matrix4;
    /**
     * Create a complex transformation with translation, rotation, and scale
     */
    createComplex({ translateX, translateY, rotation, scaleX, scaleY, }: {
        translateX?: number;
        translateY?: number;
        rotation?: number;
        scaleX?: number;
        scaleY?: number;
    }): Matrix4;
};

/**
 * Opacity component equivalent to Flutter's Opacity widget.
 * Makes its child partially transparent.
 *
 * @example
 * ```tsx
 * <Opacity opacity={0.5}>
 *   <div>Semi-transparent content</div>
 * </Opacity>
 * ```
 */
interface OpacityProps {
    /** Child content to make transparent */
    children?: ReactNode;
    /** The opacity value (0.0 to 1.0) */
    opacity: number;
    /** Whether the widget should always maintain its size */
    alwaysIncludeSemantics?: boolean;
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
}
declare function Opacity({ children, opacity, alwaysIncludeSemantics, className, style, }: OpacityProps): react_jsx_runtime.JSX.Element;

/**
 * Shared text-related type definitions for Flutter-React UI components
 */
/** Text alignment options compatible with Flutter's TextAlign enum */
type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
/** Text overflow handling options compatible with Flutter's TextOverflow enum */
type TextOverflow = 'clip' | 'ellipsis' | 'fade';
/** Text capitalization options for form inputs */
type TextCapitalization = 'none' | 'characters' | 'words' | 'sentences';

interface InputDecoration {
    labelText?: string;
    hintText?: string;
    helperText?: string;
    errorText?: string;
    prefixIcon?: React$1.ReactNode;
    suffixIcon?: React$1.ReactNode;
    counterText?: string;
    filled?: boolean;
    fillColor?: string;
    border?: 'none' | 'outline' | 'underline';
}
type TextInputType = 'text' | 'emailAddress' | 'number' | 'phone' | 'url' | 'password';
type TextInputAction = 'done' | 'search' | 'next' | 'send' | 'go' | 'none';
interface TextFieldProps {
    /** Controls the text being edited (controlled mode). If provided, component is controlled. */
    value?: string;
    /** Default text (uncontrolled mode). */
    defaultValue?: string;
    /** Equivalent of Flutter's controller.text setter semantics */
    onChangeText?: (text: string) => void;
    onChanged?: (text: string) => void;
    onEditingComplete?: () => void;
    onSubmitted?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onTap?: () => void;
    style?: React$1.CSSProperties;
    textAlign?: TextAlign;
    textDirection?: 'ltr' | 'rtl';
    textCapitalization?: TextCapitalization;
    maxLength?: number;
    maxLines?: number | null;
    minLines?: number;
    expands?: boolean;
    obscureText?: boolean;
    obscuringCharacter?: string;
    enabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    canRequestFocus?: boolean;
    keyboardType?: TextInputType;
    textInputAction?: TextInputAction;
    inputMode?: React$1.HTMLAttributes<HTMLInputElement>['inputMode'];
    decoration?: InputDecoration;
    id?: string;
    name?: string;
    placeholder?: string;
    /** Forward a ref to access imperative methods like focus/select/clear. */
    forwardedRef?: React$1.Ref<TextFieldHandle>;
    className?: string;
    containerStyle?: React$1.CSSProperties;
}
interface TextFieldHandle {
    focus: () => void;
    blur: () => void;
    select: () => void;
    clear: () => void;
    getValue: () => string;
    setValue: (v: string) => void;
}
/**
 * A Flutter TextField–inspired React component.
 *
 * NOTE: This mirrors common TextField props & behaviors from Flutter's material.TextField
 * (controller, decoration, obscureText, maxLength, minLines, maxLines, expands, enabled, readOnly,
 * autofocus, textInputAction-like submit on Enter, onEditingComplete, onSubmitted, etc.).
 * Some Flutter features don't map 1:1 to the web; where not possible, we emulate sensible equivalents.
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField
 *   value={text}
 *   onChangeText={setText}
 *   decoration={{
 *     labelText: "Enter your name",
 *     hintText: "Type here..."
 *   }}
 * />
 *
 * // Multiline text field
 * <TextField
 *   maxLines={null}
 *   minLines={3}
 *   decoration={{
 *     labelText: "Description",
 *     border: "outline"
 *   }}
 * />
 *
 * // Password field
 * <TextField
 *   obscureText={true}
 *   keyboardType="password"
 *   decoration={{
 *     labelText: "Password",
 *     suffixIcon: <EyeIcon />
 *   }}
 * />
 * ```
 */
declare const TextField: React$1.ForwardRefExoticComponent<TextFieldProps & React$1.RefAttributes<TextFieldHandle>>;

/**
 * A minimal TextStyle interface mapped to CSSProperties
 * Aligns with Flutter's TextStyle common properties
 */
interface TextStyle {
    /** Text color */
    color?: string;
    /** Font size in pixels */
    fontSize?: number;
    /** Font weight (CSS values or numeric) */
    fontWeight?: CSSProperties['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    /** Font style (normal, italic, etc.) */
    fontStyle?: CSSProperties['fontStyle'];
    /** Font family name */
    fontFamily?: string;
    /** Letter spacing in pixels */
    letterSpacing?: number;
    /** Word spacing in pixels */
    wordSpacing?: number;
    /** Line height multiplier (e.g., 1.2) */
    height?: number;
    /** Text decoration (underline, strikethrough, etc.) */
    decoration?: CSSProperties['textDecoration'];
    /** Text decoration color */
    decorationColor?: string;
    /** Text decoration style */
    decorationStyle?: CSSProperties['textDecorationStyle'];
    /** Text decoration thickness in pixels */
    decorationThickness?: number;
}
/**
 * Props interface aligning with Flutter's Text widget
 * - data: Text string (equivalent to Flutter's data parameter)
 * - children: Equivalent to Flutter's Text.rich with InlineSpan (use React spans and styles)
 */
interface TextProps {
    /** Text string to display (Flutter Text(data)) */
    data?: string;
    /** Rich text content (Flutter Text.rich equivalent) */
    children?: ReactNode;
    /** Text styling options */
    style?: TextStyle;
    /** Text alignment within its container */
    textAlign?: TextAlign;
    /** Whether text should wrap to new lines (default: true) */
    softWrap?: boolean;
    /** How to handle text overflow (default: "clip") */
    overflow?: TextOverflow;
    /** Maximum number of lines to display */
    maxLines?: number;
    /** Text scale factor (deprecated in Flutter, kept for compatibility) */
    textScaleFactor?: number;
    /**
     * Text scaler equivalent to Flutter's TextScaler
     * Simple multiplier implementation (non-linear scaling can be customized)
     * Takes precedence over textScaleFactor if both provided
     */
    textScaler?: number;
    /** Locale for the text (maps to HTML lang attribute) */
    locale?: string;
    /** Text direction control (maps to HTML dir attribute) */
    textDirection?: TextDirection;
    /** Semantic label for screen readers (maps to aria-label) */
    semanticsLabel?: string;
    /** Semantic identifier (maps to HTML id or data attribute) */
    semanticsIdentifier?: string;
    /** Background color for text selection */
    selectionColor?: string;
    /** How to measure text width - "parent" or "longestLine" */
    textWidthBasis?: 'parent' | 'longestLine';
    /** Custom CSS class name (use sparingly) */
    className?: string;
}
/**
 * A Flutter Text widget-inspired React component for displaying text with advanced styling and layout options.
 *
 * NOTE: This mirrors Flutter's Text widget behavior including text overflow handling, line clamping,
 * text scaling, and advanced typography features. Some Flutter features are adapted for web compatibility
 * using modern CSS techniques like -webkit-line-clamp and CSS mask-image for fade effects.
 *
 * Key implementation details:
 * - maxLines: Uses -webkit-line-clamp for multi-line truncation or single-line techniques
 * - overflow: "ellipsis" uses text-overflow; "fade" uses CSS mask-image for fade effect
 * - softWrap: Controls white-space and word-wrap behavior
 * - textAlign: "start"/"end" converts to left/right based on text direction
 * - textScaleFactor/textScaler: Multiplies font-size by the scale factor
 * - selectionColor: Creates dynamic CSS class with ::selection rules
 *
 * @example
 * ```tsx
 * // Basic text display
 * <Text data="Hello, World!" />
 *
 * // Styled text with custom styling
 * <Text
 *   data="Styled Text"
 *   style={{
 *     fontSize: 18,
 *     fontWeight: 600,
 *     color: '#2563eb'
 *   }}
 *   textAlign="center"
 * />
 *
 * // Rich text with children
 * <Text>
 *   Hello <span style={{ fontWeight: 'bold' }}>World</span>!
 * </Text>
 *
 * // Text with line clamping and overflow
 * <Text
 *   data="This is a very long text that will be truncated after 2 lines with an ellipsis..."
 *   maxLines={2}
 *   overflow="ellipsis"
 *   softWrap={true}
 * />
 *
 * // Text with fade overflow effect
 * <Text
 *   data="This text will fade out at the end instead of being cut off abruptly"
 *   maxLines={1}
 *   overflow="fade"
 * />
 *
 * // Scaled text
 * <Text
 *   data="Large text"
 *   textScaler={1.5}
 *   style={{ fontSize: 16 }}
 * />
 *
 * // Text with custom selection color
 * <Text
 *   data="Select this text to see custom selection color"
 *   selectionColor="#fbbf24"
 * />
 * ```
 */
declare const Text: ({ data, children, style, textAlign, softWrap, overflow, maxLines, textScaleFactor, textScaler, locale, textDirection, semanticsLabel, semanticsIdentifier, selectionColor, textWidthBasis, className, }: TextProps) => react_jsx_runtime.JSX.Element;

export { Alignment, AnimatedContainer, AnimatedOpacity, AnimationCurve, Axis, BoxConstraintsUtils, Brightness, Column, Container, CrossAxisAlignment, EdgeInsets$2 as EdgeInsets, FilterQuality, Flex, GestureDetector, HitTestBehavior, InkWell, LayoutBuilder, ListView, ScrollPhysics$1 as ListViewScrollPhysics, MainAxisAlignment, MainAxisSize, Matrix4, MediaQuery, Opacity, Orientation, OrientationBuilder, OrientationUtils, PaddingDirection, Row, ScrollDirection, ScrollPhysics, SizedBox, Spacer, Text, TextBaseline, TextDirection, TextField, Transform, TransformUtils, VerticalDirection, createBoxConstraints, createExpandedConstraints, createLooseConstraints, createTightConstraints, defaultBreakpoints, useBreakpoint, useBreakpointMatch, useMediaQuery, useOrientation, useOrientationMatch, useOrientationValue };
export type { AnimatedContainerProps, AnimatedOpacityProps, BaseProps, BoxConstraints, BuilderProps, ColumnProps, ContainerProps, DragEndDetails, DragStartDetails, DragUpdateDetails, FlexProps, GestureDetectorProps, InkWellProps, InputDecoration, LayoutBuilderProps, LayoutWidgetBuilder, ListViewProps$1 as ListViewComponentProps, ListViewHandle, ListViewProps, LongPressEndDetails, LongPressMoveUpdateDetails, LongPressStartDetails, MediaQueryBreakpoints, MediaQueryData, EdgeInsets as MediaQueryEdgeInsets, MediaQueryProps, Offset, OpacityProps, OrientationBuilderProps, OrientationWidgetBuilder, RowProps, SeparatedProps, Size, SizedBoxProps, SpacerProps, TapDownDetails, TapUpDetails, TextAlign, TextCapitalization, TextFieldHandle, TextFieldProps, TextInputAction, TextInputType, TextOverflow, TextProps, TextStyle, TransformProps };
