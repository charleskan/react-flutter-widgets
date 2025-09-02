import type { FlexProps } from '../../types/Flex.type'
import { Flex as FlexUtils } from '../../types/Flex.type'
import { CrossAxisAlignment, MainAxisAlignment } from '../../types/Layout'
import { TextDirection } from '../../types/Text'

interface FlexComponentProps extends FlexProps {
  /** Direction of the flex layout */
  direction: 'row' | 'column'
}

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
    flex,
    expanded,
    flexible,
    width,
    height,
  } = props

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
