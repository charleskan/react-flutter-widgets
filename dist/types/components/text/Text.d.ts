import type { CSSProperties, ReactNode } from 'react';
import { TextDirection } from '../../types/Flex.type';
import type { TextAlign, TextOverflow } from '../../types/Text.types';
/**
 * A minimal TextStyle interface mapped to CSSProperties
 * Aligns with Flutter's TextStyle common properties
 */
export interface TextStyle {
    /** Text color */
    color?: string;
    /** Font size in pixels */
    fontSize?: number;
    /** Font weight (CSS values or numeric) */
    fontWeight?: CSSProperties['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    /** Font style (normal, italic, etc.) */
    fontStyle?: CSSProperties['fontStyle'];
    /** Font family name */
    fontFamily?: string;
    /** Letter spacing in pixels */
    letterSpacing?: number;
    /** Word spacing in pixels */
    wordSpacing?: number;
    /** Line height multiplier (e.g., 1.2) */
    height?: number;
    /** Text decoration (underline, strikethrough, etc.) */
    decoration?: CSSProperties['textDecoration'];
    /** Text decoration color */
    decorationColor?: string;
    /** Text decoration style */
    decorationStyle?: CSSProperties['textDecorationStyle'];
    /** Text decoration thickness in pixels */
    decorationThickness?: number;
}
/**
 * Props interface aligning with Flutter's Text widget
 * - data: Text string (equivalent to Flutter's data parameter)
 * - children: Equivalent to Flutter's Text.rich with InlineSpan (use React spans and styles)
 */
export interface TextProps {
    /** Text string to display (Flutter Text(data)) */
    data?: string;
    /** Rich text content (Flutter Text.rich equivalent) */
    children?: ReactNode;
    /** Text styling options */
    style?: TextStyle;
    /** Text alignment within its container */
    textAlign?: TextAlign;
    /** Whether text should wrap to new lines (default: true) */
    softWrap?: boolean;
    /** How to handle text overflow (default: "clip") */
    overflow?: TextOverflow;
    /** Maximum number of lines to display */
    maxLines?: number;
    /** Text scale factor (deprecated in Flutter, kept for compatibility) */
    textScaleFactor?: number;
    /**
     * Text scaler equivalent to Flutter's TextScaler
     * Simple multiplier implementation (non-linear scaling can be customized)
     * Takes precedence over textScaleFactor if both provided
     */
    textScaler?: number;
    /** Locale for the text (maps to HTML lang attribute) */
    locale?: string;
    /** Text direction control (maps to HTML dir attribute) */
    textDirection?: TextDirection;
    /** Semantic label for screen readers (maps to aria-label) */
    semanticsLabel?: string;
    /** Semantic identifier (maps to HTML id or data attribute) */
    semanticsIdentifier?: string;
    /** Background color for text selection */
    selectionColor?: string;
    /** How to measure text width - "parent" or "longestLine" */
    textWidthBasis?: 'parent' | 'longestLine';
    /** Custom CSS class name (use sparingly) */
    className?: string;
}
/**
 * A Flutter Text widget-inspired React component for displaying text with advanced styling and layout options.
 *
 * NOTE: This mirrors Flutter's Text widget behavior including text overflow handling, line clamping,
 * text scaling, and advanced typography features. Some Flutter features are adapted for web compatibility
 * using modern CSS techniques like -webkit-line-clamp and CSS mask-image for fade effects.
 *
 * Key implementation details:
 * - maxLines: Uses -webkit-line-clamp for multi-line truncation or single-line techniques
 * - overflow: "ellipsis" uses text-overflow; "fade" uses CSS mask-image for fade effect
 * - softWrap: Controls white-space and word-wrap behavior
 * - textAlign: "start"/"end" converts to left/right based on text direction
 * - textScaleFactor/textScaler: Multiplies font-size by the scale factor
 * - selectionColor: Creates dynamic CSS class with ::selection rules
 *
 * @example
 * ```tsx
 * // Basic text display
 * <Text data="Hello, World!" />
 *
 * // Styled text with custom styling
 * <Text
 *   data="Styled Text"
 *   style={{
 *     fontSize: 18,
 *     fontWeight: 600,
 *     color: '#2563eb'
 *   }}
 *   textAlign="center"
 * />
 *
 * // Rich text with children
 * <Text>
 *   Hello <span style={{ fontWeight: 'bold' }}>World</span>!
 * </Text>
 *
 * // Text with line clamping and overflow
 * <Text
 *   data="This is a very long text that will be truncated after 2 lines with an ellipsis..."
 *   maxLines={2}
 *   overflow="ellipsis"
 *   softWrap={true}
 * />
 *
 * // Text with fade overflow effect
 * <Text
 *   data="This text will fade out at the end instead of being cut off abruptly"
 *   maxLines={1}
 *   overflow="fade"
 * />
 *
 * // Scaled text
 * <Text
 *   data="Large text"
 *   textScaler={1.5}
 *   style={{ fontSize: 16 }}
 * />
 *
 * // Text with custom selection color
 * <Text
 *   data="Select this text to see custom selection color"
 *   selectionColor="#fbbf24"
 * />
 * ```
 */
export declare const Text: ({ data, children, style, textAlign, softWrap, overflow, maxLines, textScaleFactor, textScaler, locale, textDirection, semanticsLabel, semanticsIdentifier, selectionColor, textWidthBasis, className, }: TextProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Text.d.ts.map