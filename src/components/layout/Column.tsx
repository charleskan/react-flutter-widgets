import type { ColumnProps } from '../../types/Flex.type'
import { Flex } from '../../types/Flex.type'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
  VerticalDirection,
} from '../../types/Layout'

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
    flex,
    expanded,
    flexible,
    width,
    height,
  } = props

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
    padding,
    margin,
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
