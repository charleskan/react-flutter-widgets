// Flutter-React UI Library
// A comprehensive Flutter-style component library for React applications

// Layout Components
export {
  Container,
  Row,
  Column,
  Flex,
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
  TextDirection,
  VerticalDirection,
  TextBaseline,
  type ContainerProps,
  type RowProps,
  type ColumnProps,
  type FlexProps,
} from './components/layout'

// Spacing Components
export {
  SizedBox,
  Spacer,
  type SizedBoxProps,
  type SpacerProps,
} from './components/spacing'

// Data Display Components
export {
  ListView,
  ScrollDirection,
  ScrollPhysics,
  PaddingDirection,
  type ListViewProps,
} from './components/data'

// Interactive Components
export {
  InkWell,
  GestureDetector,
  HitTestBehavior,
  type InkWellProps,
  type GestureDetectorProps,
  type Offset,
  type TapDownDetails,
  type TapUpDetails,
  type LongPressStartDetails,
  type LongPressMoveUpdateDetails,
  type LongPressEndDetails,
  type DragStartDetails,
  type DragUpdateDetails,
  type DragEndDetails,
} from './components/interactive'

// Animation Components
export {
  AnimatedContainer,
  AnimatedOpacity,
  AnimationCurve,
  type AnimatedContainerProps,
  type AnimatedOpacityProps,
} from './components/interactive'

// Responsive Layout Components
export {
  MediaQuery,
  LayoutBuilder,
  OrientationBuilder,
  Orientation,
  Brightness,
  useMediaQuery,
  useBreakpoint,
  useBreakpointMatch,
  useOrientation,
  useOrientationMatch,
  useOrientationValue,
  defaultBreakpoints,
  createBoxConstraints,
  createTightConstraints,
  createLooseConstraints,
  createExpandedConstraints,
  BoxConstraintsUtils,
  OrientationUtils,
  type MediaQueryProps,
  type MediaQueryData,
  type MediaQueryBreakpoints,
  type Size,
  type EdgeInsets as MediaQueryEdgeInsets,
  type LayoutBuilderProps,
  type BoxConstraints,
  type LayoutWidgetBuilder,
  type OrientationBuilderProps,
  type OrientationWidgetBuilder,
} from './components/interactive'

// Transform Components
export {
  Transform,
  Opacity,
  Matrix4,
  Alignment,
  FilterQuality,
  TransformUtils,
  type TransformProps,
  type OpacityProps,
} from './components/interactive'

// Core Utilities and Types
export { EdgeInsets } from './types/Flex.type'

// Note: Enums are already exported via the component exports above
