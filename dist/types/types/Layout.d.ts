/**
 * Layout alignment and sizing enums following Flutter's layout system
 */
/**
 * Main axis alignment controls how children are positioned along the main axis
 */
export declare enum MainAxisAlignment {
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
export declare enum CrossAxisAlignment {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    STRETCH = "stretch",
    BASELINE = "baseline"
}
/**
 * Main axis size controls how much space the flex container should occupy
 */
export declare enum MainAxisSize {
    MIN = "min",
    MAX = "max"
}
/**
 * Vertical direction for column layout
 */
export declare enum VerticalDirection {
    UP = "column-reverse",
    DOWN = "column"
}
/**
 * Clip behavior for overflow handling
 */
export declare enum Clip {
    NONE = "visible",
    HARD_EDGE = "hidden",
    ANTI_ALIAS = "hidden",
    ANTI_ALIAS_WITH_SAVE_LAYER = "hidden"
}
//# sourceMappingURL=Layout.d.ts.map