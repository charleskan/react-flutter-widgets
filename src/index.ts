// Flutter-React UI Library
// A comprehensive Flutter-style component library for React applications

// Import CSS for Tailwind
import './index.css'

// Layout Components
export { default as Container } from './components/layout/Container'
export type { ContainerProps } from './components/layout/Container'
export { Divider } from './components/layout/Divider'
export type { DividerProps } from './components/layout/Divider'
export { default as Row } from './components/layout/Row'
export { default as Column } from './components/layout/Column'
export { default as Flex } from './components/layout/Flex'
export type {
  RowProps,
  ColumnProps,
  FlexProps,
} from './types/Flex.type'

// Spacing Components
export { default as SizedBox } from './components/spacing/SizedBox'
export { default as Spacer } from './components/spacing/Spacer'
export type { SizedBoxProps } from './components/spacing/SizedBox'
export type { SpacerProps } from './components/spacing/Spacer'

// Data Display Components
export {
  ListView,
  Axis,
  ScrollPhysics,
  type BaseProps,
  type ListViewProps as ListViewComponentProps,
  type BuilderProps,
  type SeparatedProps,
  type ListViewHandle,
} from './components/data/ListView'

// Legacy exports for backward compatibility
export {
  ScrollDirection,
  PaddingDirection,
  type ListViewProps,
} from './types/ListView.type'

// Interactive Components
export { default as InkWell, type InkWellProps } from './components/interactive/InkWell'
export {
  default as GestureDetector,
  HitTestBehavior,
  type GestureDetectorProps,
  type TapDownDetails,
  type TapUpDetails,
  type LongPressStartDetails,
  type LongPressMoveUpdateDetails,
  type LongPressEndDetails,
  type DragStartDetails,
  type DragUpdateDetails,
  type DragEndDetails,
  type ScaleStartDetails,
  type ScaleUpdateDetails,
  type ScaleEndDetails,
} from './components/interactive/GestureDetector'

// Animation Components
export {
  default as AnimatedContainer,
  AnimationCurve,
  type AnimatedContainerProps,
} from './components/interactive/AnimatedContainer'
export {
  default as AnimatedOpacity,
  type AnimatedOpacityProps,
} from './components/interactive/AnimatedOpacity'

// Responsive Layout Components
export {
  default as MediaQuery,
  Orientation,
  Brightness,
  useMediaQuery,
  useBreakpoint,
  useBreakpointMatch,
  defaultBreakpoints,
  type MediaQueryProps,
  type MediaQueryData,
  type MediaQueryBreakpoints,
  type MediaQueryEdgeInsets,
} from './components/interactive/MediaQuery'

export {
  default as LayoutBuilder,
  createBoxConstraints,
  createTightConstraints,
  createLooseConstraints,
  createExpandedConstraints,
  BoxConstraintsUtils,
  type LayoutBuilderProps,
  type LayoutWidgetBuilder,
} from './components/interactive/LayoutBuilder'

export {
  default as OrientationBuilder,
  useOrientation,
  useOrientationMatch,
  useOrientationValue,
  OrientationUtils,
  type OrientationBuilderProps,
  type OrientationWidgetBuilder,
} from './components/interactive/OrientationBuilder'

// Transform Components
export {
  default as Transform,
  FilterQuality,
  TransformUtils,
  type TransformProps,
} from './components/interactive/Transform'

export { default as Opacity, type OpacityProps } from './components/interactive/Opacity'

// Form Components
export { default as TextField } from './components/form/TextField'
export type {
  TextFieldProps,
  TextFieldHandle,
  InputDecoration,
  TextInputType,
  TextInputAction,
} from './components/form/TextField'
export type { TextCapitalization } from './types/Text.types'

// Text Components
export { Text } from './components/text/Text'
export type { TextProps, TextStyle } from './components/text/Text'
export type { TextAlign, TextOverflow } from './types/Text.types'

// All Flutter-style utilities
export {
  // Alignment and Geometry
  Alignment,
  AlignmentDirectional,
  alignmentToFlexClasses,
  alignmentToCSS,
  alignmentToTransformOrigin,
  type AlignmentGeometry,
  type Size,
  type Offset,
  type Rect,
  TextDirection,
} from './utils/Alignment'
export { EdgeInsets } from './utils/EdgeInsets'
export { BoxConstraints } from './utils/BoxConstraints'
export { Matrix4, type Matrix4 as Matrix4Interface } from './utils/Matrix4'
export {
  Decoration,
  type BoxDecoration,
  type DecorationImage,
  type BoxFit,
  type ImageRepeat,
  type Clip,
} from './utils/Decoration'
export {
  Gradient,
  LinearGradient,
  RadialGradient,
  SweepGradient,
  type GradientStop,
} from './utils/Gradient'
export { BorderRadius, Radius } from './utils/BorderRadius'
export {
  PageScrollPhysics,
  createPageScrollPhysics,
  type ScrollPhysicsConfig,
} from './utils/ScrollPhysics'

// Layout System Types
export {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
  VerticalDirection,
} from './types/Layout'

// Text System Types
export { TextBaseline } from './types/Text'

// Note: Enums are already exported via the component exports above
