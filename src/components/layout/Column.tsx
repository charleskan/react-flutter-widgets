import type { ColumnProps } from '../../types/Flex.type'
import { Flex } from '../../types/Flex.type'
import { CrossAxisAlignment, MainAxisAlignment, MainAxisSize, Clip, VerticalDirection } from '../../types/Layout'

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
    mainAxisSize = MainAxisSize.MAX,
    textBaseline,
    verticalDirection = VerticalDirection.DOWN,
    spacing = 0,
    clipBehavior = Clip.NONE,
  } = props

  const flexStyles = Flex.buildFlexStyles({
    spacing,
    clipBehavior,
  })

  const mainAxisSizeStyles = Flex.getMainAxisSizeStyles(mainAxisSize, 'column')

  const mainAxisClass = Flex.getMainAxisAlignmentClass(mainAxisAlignment)
  const crossAxisClass = Flex.getCrossAxisAlignmentClass(crossAxisAlignment)

  const containerClasses = ['flex', 'flex-col', mainAxisClass, crossAxisClass]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    ...mainAxisSizeStyles,
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
