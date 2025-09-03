// Layout Components - Flutter-style layout primitives
export { default as Container } from './Container'
export type { ContainerProps } from './Container'

export { Divider } from './Divider'
export type { DividerProps } from './Divider'

export { default as Row } from './Row'
export { default as Column } from './Column'
export { default as Flex } from './Flex'

// Export layout types
export type {
  RowProps,
  ColumnProps,
  FlexProps,
} from '../../types/Flex.type'

// Export layout enums from their dedicated files
export {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
  VerticalDirection,
} from '../../types/Layout'

export {
  TextDirection,
  TextBaseline,
} from '../../types/Text'

// Export Flutter-style utilities
export {
  Alignment,
  EdgeInsets,
  BoxConstraints,
  Matrix4,
  Decoration,
  LinearGradient,
  RadialGradient,
  SweepGradient,
} from '../../utils'

export type {
  AlignmentGeometry,
  BoxDecoration,
  Clip,
  Matrix4Interface,
  GradientStop,
} from '../../utils'
