// Flutter-React UI Library
// A comprehensive Flutter-style component library for React applications

// Import CSS for Tailwind
import './index.css'

// Layout Components
export {
  Container,
  Divider,
  Row,
  Column,
  Flex,
  type ContainerProps,
  type DividerProps,
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
  Axis,
  ScrollPhysics,
  type BaseProps,
  type ListViewProps as ListViewComponentProps,
  type BuilderProps,
  type SeparatedProps,
  type ListViewHandle,
} from './components/data'

// Legacy exports for backward compatibility
export {
  ScrollDirection,
  PaddingDirection,
  type ListViewProps,
} from './types/ListView.type'

// Interactive Components
export {
  InkWell,
  GestureDetector,
  HitTestBehavior,
  type InkWellProps,
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
  type MediaQueryEdgeInsets,
  type LayoutBuilderProps,
  type LayoutWidgetBuilder,
  type OrientationBuilderProps,
  type OrientationWidgetBuilder,
} from './components/interactive'

// Transform Components
export {
  Transform,
  Opacity,
  FilterQuality,
  TransformUtils,
  type TransformProps,
  type OpacityProps,
} from './components/interactive'

// Form Components
export {
  TextField,
  type TextFieldProps,
  type TextFieldHandle,
  type InputDecoration,
  type TextInputType,
  type TextInputAction,
  type TextCapitalization,
} from './components/form'

// Text Components
export {
  Text,
  type TextProps,
  type TextStyle,
  type TextAlign,
  type TextOverflow,
} from './components/text'

// Core Utilities and Types
export { EdgeInsets } from './types/EdgeInsets'

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
  // Box Constraints and Decoration
  BoxConstraints,
  Decoration,
  type BoxDecoration,
  type Clip,
  // Matrix and Transforms
  Matrix4,
  type Matrix4Interface,
  // Gradients
  Gradient,
  LinearGradient,
  RadialGradient,
  SweepGradient,
  type GradientStop,
} from './utils'

// Layout System Types
export {
  MainAxisAlignment,
  CrossAxisAlignment,
  MainAxisSize,
  VerticalDirection,
} from './types/Layout'

// Text System Types
export {
  TextBaseline,
} from './types/Text'

// Note: Enums are already exported via the component exports above
