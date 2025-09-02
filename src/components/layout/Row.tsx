import type { RowProps } from '../../types/Flex.type'
import { Flex } from '../../types/Flex.type'
import { CrossAxisAlignment, MainAxisAlignment } from '../../types/Layout'
import { TextDirection } from '../../types/Text'

/**
 * Row component that arranges children horizontally, equivalent to Flutter's Row widget.
 *
 * @example
 * ```tsx
 * <Row
 *   mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
 *   crossAxisAlignment={CrossAxisAlignment.CENTER}
 *   padding={EdgeInsets.symmetric({ horizontal: 16 })}
 * >
 *   <div>Left Item</div>
 *   <div>Center Item</div>
 *   <div>Right Item</div>
 * </Row>
 * ```
 */
function Row(props: RowProps) {
  const {
    children,
    mainAxisAlignment = MainAxisAlignment.START,
    crossAxisAlignment = CrossAxisAlignment.CENTER,
    mainAxisSize,
    textDirection = TextDirection.LTR,
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

  const containerClasses = ['flex', 'flex-row', mainAxisClass, crossAxisClass, sizeClass]
    .filter(Boolean)
    .join(' ')

  // Convert TextDirection enum to CSS direction value
  const cssDirection =
    textDirection === TextDirection.AUTO
      ? undefined
      : (textDirection?.toLowerCase() as 'ltr' | 'rtl' | undefined)

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    padding,
    margin,
    direction: cssDirection,
    flexDirection: textDirection === TextDirection.RTL ? 'row-reverse' : 'row',
    alignItems:
      textBaseline === 'alphabetic' || textBaseline === 'ideographic' ? 'baseline' : undefined,
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      {children}
    </div>
  )
}

export default Row
