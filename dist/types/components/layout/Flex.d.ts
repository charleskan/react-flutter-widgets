import type { FlexProps } from '../../types/Flex.type';
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
declare function Flex(props: FlexComponentProps): import("react/jsx-runtime").JSX.Element;
export default Flex;
//# sourceMappingURL=Flex.d.ts.map