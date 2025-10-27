import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { type AlignmentGeometry } from '../../utils/Alignment';
import type { TextDirection } from '../../utils/Alignment';
import { type Clip } from '../../utils/Decoration';
/**
 * How to size the non-positioned children in the stack.
 * Equivalent to Flutter's StackFit enum.
 */
export declare enum StackFit {
    /** The constraints passed to the stack from its parent are loosened. */
    loose = "loose",
    /** The constraints passed to the stack from its parent are tightened to the biggest size allowed. */
    expand = "expand",
    /** The constraints passed to the stack from its parent are passed unmodified to the non-positioned children. */
    passthrough = "passthrough"
}
/**
 * Properties for the Stack component.
 * Equivalent to Flutter's Stack widget properties.
 */
export interface StackProps {
    /** How to align the non-positioned and partially-positioned children in the stack */
    alignment?: AlignmentGeometry;
    /** The text direction with which to resolve alignment */
    textDirection?: TextDirection;
    /** How to size the non-positioned children in the stack */
    fit?: StackFit;
    /** The clip behavior when content overflows */
    clipBehavior?: Clip;
    /** The child widgets (Flutter-style prop) */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
/**
 * A widget that positions its children relative to the edges of its box.
 *
 * Equivalent to Flutter's Stack widget. This class is useful if you want to overlap
 * several children in a simple way.
 *
 * Each child of a Stack is either positioned or non-positioned. Positioned children
 * are those wrapped in a Positioned widget that has at least one non-null property.
 * The stack sizes itself to contain all the non-positioned children, which are
 * positioned according to alignment. The positioned children are then placed relative
 * to the stack according to their top, right, bottom, and left properties.
 *
 * @example
 * ```tsx
 * // Basic stack with overlapping children
 * <Stack>
 *   <Container width={100} height={100} color="red" />
 *   <Container width={90} height={90} color="green" />
 *   <Container width={80} height={80} color="blue" />
 * </Stack>
 *
 * // Stack with positioned children
 * <Stack alignment={Alignment.center}>
 *   <Container width={250} height={250} color="white" />
 *   <Positioned
 *     bottom={0}
 *     left={0}
 *     right={0}
 *   >
 *     <Container
 *       padding={EdgeInsets.all(5)}
 *       decoration={{
 *         gradient: new LinearGradient({
 *           begin: Alignment.topCenter,
 *           end: Alignment.bottomCenter,
 *           colors: ['transparent', 'rgba(0,0,0,0.5)']
 *         })
 *       }}
 *     >
 *       <Text style={{ color: 'white' }}>Foreground Text</Text>
 *     </Container>
 *   </Positioned>
 * </Stack>
 *
 * // Stack with custom alignment and fit
 * <Stack
 *   alignment={Alignment.bottomRight}
 *   fit={StackFit.expand}
 * >
 *   <Image src="background.jpg" />
 *   <Positioned
 *     top={10}
 *     right={10}
 *   >
 *     <Icon name="close" />
 *   </Positioned>
 * </Stack>
 * ```
 */
export declare function Stack({ alignment, textDirection, fit, clipBehavior, children, className, style, }: StackProps): ReactElement;
export declare namespace Stack {
    var displayName: string;
}
export default Stack;
//# sourceMappingURL=Stack.d.ts.map