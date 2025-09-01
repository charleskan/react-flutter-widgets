import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Key, CSSProperties } from 'react';

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
 * EdgeInsets provides methods for creating spacing values (padding/margin) in different configurations
 */
declare const EdgeInsets$1: {
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
declare function AnimatedContainer(props: AnimatedContainerProps): react_jsx_runtime.JSX.Element;

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

export { Alignment, AnimatedContainer, AnimatedOpacity, AnimationCurve, BoxConstraintsUtils, Brightness, Column, Container, CrossAxisAlignment, EdgeInsets$1 as EdgeInsets, FilterQuality, Flex, GestureDetector, HitTestBehavior, InkWell, LayoutBuilder, ListView, MainAxisAlignment, MainAxisSize, Matrix4, MediaQuery, Opacity, Orientation, OrientationBuilder, OrientationUtils, PaddingDirection, Row, ScrollDirection, ScrollPhysics, SizedBox, Spacer, TextBaseline, TextDirection, Transform, TransformUtils, VerticalDirection, createBoxConstraints, createExpandedConstraints, createLooseConstraints, createTightConstraints, defaultBreakpoints, useBreakpoint, useBreakpointMatch, useMediaQuery, useOrientation, useOrientationMatch, useOrientationValue };
export type { AnimatedContainerProps, AnimatedOpacityProps, BoxConstraints, ColumnProps, ContainerProps, DragEndDetails, DragStartDetails, DragUpdateDetails, FlexProps, GestureDetectorProps, InkWellProps, LayoutBuilderProps, LayoutWidgetBuilder, ListViewProps, LongPressEndDetails, LongPressMoveUpdateDetails, LongPressStartDetails, MediaQueryBreakpoints, MediaQueryData, EdgeInsets as MediaQueryEdgeInsets, MediaQueryProps, Offset, OpacityProps, OrientationBuilderProps, OrientationWidgetBuilder, RowProps, Size, SizedBoxProps, SpacerProps, TapDownDetails, TapUpDetails, TransformProps };
