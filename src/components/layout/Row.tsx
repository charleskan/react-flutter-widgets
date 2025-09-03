import type { RowProps } from '../../types/Flex.type'
import { Flex } from '../../types/Flex.type'
import { Clip, CrossAxisAlignment, MainAxisAlignment, MainAxisSize } from '../../types/Layout'
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
    mainAxisSize = MainAxisSize.MAX,
    textDirection = TextDirection.LTR,
    textBaseline,
    spacing = 0,
    clipBehavior = Clip.NONE,
  } = props

  const flexStyles = Flex.buildFlexStyles({
    spacing,
    clipBehavior,
  })

  const mainAxisSizeStyles = Flex.getMainAxisSizeStyles(mainAxisSize, 'row')

  const mainAxisClass = Flex.getMainAxisAlignmentClass(mainAxisAlignment)
  const crossAxisClass = Flex.getCrossAxisAlignmentClass(crossAxisAlignment)

  const containerClasses = ['flex', 'flex-row', mainAxisClass, crossAxisClass]
    .filter(Boolean)
    .join(' ')

  // Convert TextDirection enum to CSS direction value
  const cssDirection =
    textDirection === TextDirection.AUTO
      ? undefined
      : (textDirection?.toLowerCase() as 'ltr' | 'rtl' | undefined)

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    ...mainAxisSizeStyles,
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
