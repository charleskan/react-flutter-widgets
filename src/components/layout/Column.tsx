import type { ColumnProps } from '../../types/Flex.type'
import {
  CrossAxisAlignment,
  Flex,
  MainAxisAlignment,
  VerticalDirection,
} from '../../types/Flex.type'

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
function Column(props: ColumnProps) {
  const {
    children,
    mainAxisAlignment = MainAxisAlignment.START,
    crossAxisAlignment = CrossAxisAlignment.CENTER,
    mainAxisSize,
    verticalDirection = VerticalDirection.DOWN,
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

  const effectivePadding = Flex.calculatePadding({
    paddingAll,
    paddingHorizontal,
    paddingVertical,
    padding,
  })

  const effectiveMargin = Flex.calculateMargin(margin)

  const flexStyles = Flex.buildFlexStyles({
    flex,
    expanded,
    flexible,
    width,
    height,
  })

  const mainAxisClass = Flex.getMainAxisAlignmentClass(mainAxisAlignment)
  const crossAxisClass = Flex.getCrossAxisAlignmentClass(crossAxisAlignment)
  const sizeClass = mainAxisSize ? Flex.getMainAxisSizeClass(mainAxisSize) : ''

  const containerClasses = ['flex', 'flex-col', mainAxisClass, crossAxisClass, sizeClass]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    padding: effectivePadding,
    margin: effectiveMargin,
    flexDirection: verticalDirection,
    alignItems:
      textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      {children}
    </div>
  )
}

export default Column
