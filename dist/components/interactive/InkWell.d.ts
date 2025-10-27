import type { ReactNode } from 'react';
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
export interface InkWellProps {
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
    /** Accessibility label for screen readers */
    'aria-label'?: string;
    /** ID of element that labels this component */
    'aria-labelledby'?: string;
    /** ID of element that describes this component */
    'aria-describedby'?: string;
    /** Indicates if the element is pressed (for toggle buttons) */
    'aria-pressed'?: boolean | 'mixed';
    /** Indicates if the element is expanded (for collapsible content) */
    'aria-expanded'?: boolean;
    /** Indicates if the element controls another element */
    'aria-controls'?: string;
    /** Indicates if the element has a popup */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}
declare function InkWell(props: InkWellProps): import("react/jsx-runtime").JSX.Element;
export default InkWell;
//# sourceMappingURL=InkWell.d.ts.map