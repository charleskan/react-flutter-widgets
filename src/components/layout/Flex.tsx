import type { FlexProps } from '../../types/Flex.type'
import { CrossAxisAlignment, Flex as FlexUtils, MainAxisAlignment } from '../../types/Flex.type'

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
  direction: 'row' | 'column'
}

function Flex(props: FlexComponentProps) {
  const {
    children,
    direction,
    mainAxisAlignment = MainAxisAlignment.START,
    crossAxisAlignment = CrossAxisAlignment.CENTER,
    mainAxisSize,
    textDirection,
    textBaseline,
    padding,
    margin,
    paddingAll,
    paddingHorizontal,
    paddingVertical,
    flex,
    expanded,
    flexible,
    width,
    height,
  } = props

  const effectivePadding = FlexUtils.calculatePadding({
    paddingAll,
    paddingHorizontal,
    paddingVertical,
    padding,
  })

  const effectiveMargin = FlexUtils.calculateMargin(margin)

  const flexStyles = FlexUtils.buildFlexStyles({
    flex,
    expanded,
    flexible,
    width,
    height,
  })

  const mainAxisClass = FlexUtils.getMainAxisAlignmentClass(mainAxisAlignment)
  const crossAxisClass = FlexUtils.getCrossAxisAlignmentClass(crossAxisAlignment)
  const sizeClass = mainAxisSize ? FlexUtils.getMainAxisSizeClass(mainAxisSize) : ''
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row'

  const containerClasses = ['flex', directionClass, mainAxisClass, crossAxisClass, sizeClass]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    padding: effectivePadding,
    margin: effectiveMargin,
    direction: textDirection,
    alignItems:
      textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      {children}
    </div>
  )
}

export default Flex
