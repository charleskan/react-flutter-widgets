import type React from 'react';
import { type CSSProperties, type ReactNode } from 'react';
import { type AlignmentGeometry } from '../../utils/Alignment';
/**
 * Properties for the Align widget.
 * Equivalent to Flutter's Align widget properties.
 */
export interface AlignProps {
    /** How to align the child within the container. Defaults to Alignment.center */
    alignment?: AlignmentGeometry;
    /** If non-null, sets the width to the child's width multiplied by this factor */
    widthFactor?: number;
    /** If non-null, sets the height to the child's height multiplied by this factor */
    heightFactor?: number;
    /** The child widget to be aligned */
    child?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * A widget that aligns its child within itself and optionally sizes itself based on the child's size.
 *
 * This is equivalent to Flutter's Align widget, providing precise control over child positioning
 * within a container using the Flutter alignment coordinate system.
 *
 * @example
 * ```tsx
 * // Align to top-right corner
 * <Align alignment={Alignment.topRight}>
 *   <div>Top Right Content</div>
 * </Align>
 *
 * // Custom alignment with size factors
 * <Align
 *   alignment={new Alignment(0.2, 0.6)}
 *   widthFactor={2.0}
 *   heightFactor={1.5}
 * >
 *   <div>Custom positioned content</div>
 * </Align>
 * ```
 */
export declare function Align({ alignment, widthFactor, heightFactor, child, className, style, }: AlignProps): React.JSX.Element;
export default Align;
//# sourceMappingURL=Align.d.ts.map