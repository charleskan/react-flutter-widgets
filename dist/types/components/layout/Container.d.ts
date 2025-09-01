import type { ReactNode } from 'react';
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
export interface ContainerProps {
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
declare function Container(props: ContainerProps): import("react/jsx-runtime").JSX.Element;
export default Container;
//# sourceMappingURL=Container.d.ts.map