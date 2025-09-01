import type { ReactNode } from 'react'
import { Flex } from '../../types/Flex.type'

/**
 * Container component equivalent to Flutter's Container widget.
 * Provides a convenient way to create a widget with common painting, positioning, and sizing properties.
 *
 * @example
 * ```tsx
 * <Container
 *   padding={EdgeInsets.all(16)}
 *   margin={EdgeInsets.symmetric({ horizontal: 8 })}
 *   width="100%"
 *   backgroundColor="#f5f5f5"
 *   borderRadius={8}
 * >
 *   <div>Content goes here</div>
 * </Container>
 * ```
 *
 * EdgeInsets methods:
 * - EdgeInsets.all(16) - uniform spacing on all sides
 * - EdgeInsets.symmetric({ horizontal: 8, vertical: 16 }) - symmetric spacing
 * - EdgeInsets.only({ left: 8, top: 16 }) - individual side control
 * - EdgeInsets.zero() - no spacing
 */
export interface ContainerProps {
  /** Child content to render inside the container */
  children?: ReactNode

  // Flutter sizing
  /** Fixed width of the container */
  width?: number | string
  /** Fixed height of the container */
  height?: number | string

  // Flutter spacing (using EdgeInsets)
  /** Padding inside the container - must use EdgeInsets methods */
  padding?: string
  /** Margin outside the container - must use EdgeInsets methods */
  margin?: string

  // Flutter decoration
  /** Background color of the container */
  backgroundColor?: string
  /** Border radius for rounded corners */
  borderRadius?: number | string
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: string
  /** Border style */
  borderStyle?: 'solid' | 'dashed' | 'dotted'

  // Flutter flex properties
  /** Flex factor for this widget (equivalent to CSS flex-grow) */
  flex?: number
  /** Whether this widget should expand to fill available space */
  expanded?: boolean
  /** Whether this widget should be flexible in the flex layout */
  flexible?: boolean
  /** Whether this widget should not shrink */
  flexShrink?: boolean

  // CSS alignment when used as flex child
  /** Align self in cross axis when inside a flex container */
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

  // Additional CSS properties for edge cases
  /** Custom CSS class name (use sparingly) */
  className?: string
  /** Custom inline styles (use sparingly) */
  style?: React.CSSProperties
}

function Container(props: ContainerProps) {
  const {
    children,
    width,
    height,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    borderWidth = 0,
    borderColor,
    borderStyle = 'solid',
    flex,
    expanded,
    flexible,
    flexShrink,
    alignSelf,
    className = '',
    style = {},
  } = props

  // Build flex styles
  const flexStyles = Flex.buildFlexStyles({
    flex,
    expanded,
    flexible,
    width,
    height,
  })

  // Handle flex shrink
  if (flexShrink === false) {
    flexStyles.flexShrink = 0
  }

  // Container styles combining all properties
  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    padding,
    margin,
    backgroundColor,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    borderWidth: borderWidth > 0 ? `${borderWidth}px` : undefined,
    borderColor: borderWidth > 0 ? borderColor : undefined,
    borderStyle: borderWidth > 0 ? borderStyle : undefined,
    alignSelf,
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  )
}

export default Container
