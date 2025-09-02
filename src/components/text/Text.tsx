import type { CSSProperties, ReactNode } from 'react'
import { useId, useMemo } from 'react'

import { TextDirection } from '../../types/Text'
import type { TextAlign, TextOverflow } from '../../types/Text.types'

/**
 * A minimal TextStyle interface mapped to CSSProperties
 * Aligns with Flutter's TextStyle common properties
 */
export interface TextStyle {
  /** Text color */
  color?: string
  /** Font size in pixels */
  fontSize?: number
  /** Font weight (CSS values or numeric) */
  fontWeight?: CSSProperties['fontWeight'] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  /** Font style (normal, italic, etc.) */
  fontStyle?: CSSProperties['fontStyle']
  /** Font family name */
  fontFamily?: string
  /** Letter spacing in pixels */
  letterSpacing?: number
  /** Word spacing in pixels */
  wordSpacing?: number
  /** Line height multiplier (e.g., 1.2) */
  height?: number
  /** Text decoration (underline, strikethrough, etc.) */
  decoration?: CSSProperties['textDecoration']
  /** Text decoration color */
  decorationColor?: string
  /** Text decoration style */
  decorationStyle?: CSSProperties['textDecorationStyle']
  /** Text decoration thickness in pixels */
  decorationThickness?: number
}

/**
 * Props interface aligning with Flutter's Text widget
 * - data: Text string (equivalent to Flutter's data parameter)
 * - children: Equivalent to Flutter's Text.rich with InlineSpan (use React spans and styles)
 */
export interface TextProps {
  /** Text string to display (Flutter Text(data)) */
  data?: string
  /** Rich text content (Flutter Text.rich equivalent) */
  children?: ReactNode
  /** Text styling options */
  style?: TextStyle

  // Layout and behavior options
  /** Text alignment within its container */
  textAlign?: TextAlign
  /** Whether text should wrap to new lines (default: true) */
  softWrap?: boolean
  /** How to handle text overflow (default: "clip") */
  overflow?: TextOverflow
  /** Maximum number of lines to display */
  maxLines?: number

  // Text scaling options
  /** Text scale factor (deprecated in Flutter, kept for compatibility) */
  textScaleFactor?: number
  /**
   * Text scaler equivalent to Flutter's TextScaler
   * Simple multiplier implementation (non-linear scaling can be customized)
   * Takes precedence over textScaleFactor if both provided
   */
  textScaler?: number

  // Internationalization and direction
  /** Locale for the text (maps to HTML lang attribute) */
  locale?: string
  /** Text direction control (maps to HTML dir attribute) */
  textDirection?: TextDirection

  // Accessibility and semantics
  /** Semantic label for screen readers (maps to aria-label) */
  semanticsLabel?: string
  /** Semantic identifier (maps to HTML id or data attribute) */
  semanticsIdentifier?: string

  // Text selection styling
  /** Background color for text selection */
  selectionColor?: string

  // Width basis control (placeholder for Flutter compatibility)
  /** How to measure text width - "parent" or "longestLine" */
  textWidthBasis?: 'parent' | 'longestLine'

  // Additional CSS properties for edge cases
  /** Custom CSS class name (use sparingly) */
  className?: string
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
export const Text = ({
  data,
  children,
  style,
  textAlign,
  softWrap = true,
  overflow = 'clip',
  maxLines,
  textScaleFactor,
  textScaler,
  locale,
  textDirection = TextDirection.AUTO,
  semanticsLabel,
  semanticsIdentifier,
  selectionColor,
  textWidthBasis = 'parent',
  className,
}: TextProps) => {
  const id = useId() // Used for selectionColor class generation

  // Calculate scaled style with font-size scaling
  const scaledStyle = useMemo<CSSProperties>(() => {
    const css: CSSProperties = {}

    if (style) {
      const {
        color,
        fontSize,
        fontWeight,
        fontStyle,
        fontFamily,
        letterSpacing,
        wordSpacing,
        height,
        decoration,
        decorationColor,
        decorationStyle,
        decorationThickness,
      } = style

      Object.assign(css, {
        color,
        fontStyle,
        fontFamily,
        fontWeight,
        letterSpacing,
        wordSpacing,
        textDecoration: decoration,
        textDecorationColor: decorationColor,
        textDecorationStyle: decorationStyle,
        textDecorationThickness: decorationThickness,
      })

      if (height !== undefined) {
        // Flutter's height is a line-height multiplier
        css.lineHeight = height
      }

      // Text scaling: textScaler takes precedence over textScaleFactor
      const scale = textScaler ?? textScaleFactor ?? 1
      if (fontSize !== undefined) {
        css.fontSize = Math.max(0, fontSize * scale)
      } else if (scale !== 1) {
        // Use relative scaling (em) when no explicit fontSize
        css.fontSize = `${scale}em`
      }
    }

    // textAlign: map start/end based on text direction
    if (textAlign) {
      if (textAlign === 'start')
        css.textAlign = textDirection === TextDirection.RTL ? 'right' : 'left'
      else if (textAlign === 'end')
        css.textAlign = textDirection === TextDirection.RTL ? 'left' : 'right'
      else css.textAlign = textAlign
    }

    // softWrap and white-space control
    // - softWrap=true: normal line wrapping
    // - softWrap=false: single line, no wrapping (or with maxLines=1)
    if (!softWrap) {
      css.whiteSpace = 'nowrap'
    } else {
      // Allow text to wrap at whitespace and within words, closer to Flutter behavior
      css.whiteSpace = 'pre-wrap'
      css.overflowWrap = 'anywhere'
    }

    // overflow and maxLines handling
    if (maxLines && maxLines > 0) {
      // Multi-line clamp using webkit-line-clamp
      css.display = '-webkit-box'
      Object.assign(css, {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
      })
      css.overflow = 'hidden'

      if (overflow === 'ellipsis') {
        // -webkit-line-clamp provides built-in ellipsis
      } else if (overflow === 'clip') {
        // Already set to hidden
      } else if (overflow === 'fade') {
        // Use mask-image for bottom fade effect
        // Note: Some browsers may not support line-clamp + mask combination well
        Object.assign(css, {
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        })
      }
    } else {
      // Single line or unlimited lines scenario
      if (!softWrap || maxLines === 1) {
        css.whiteSpace = 'nowrap'
        if (overflow === 'ellipsis') {
          css.overflow = 'hidden'
          css.textOverflow = 'ellipsis'
        } else if (overflow === 'clip') {
          css.overflow = 'hidden'
        } else if (overflow === 'fade') {
          // Right-side fade effect
          css.overflow = 'hidden'
          Object.assign(css, {
            WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(90deg, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
          })
        }
      } else {
        // Multi-line without line limit
        if (overflow === 'clip') {
          // Default behavior, no special handling
        } else if (overflow === 'ellipsis') {
          // HTML has no native multi-line ellipsis without line-clamp
        } else if (overflow === 'fade') {
          // Multi-line fade effect without clamp (visual only)
          Object.assign(css, {
            WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
          })
        }
      }
    }

    // textWidthBasis: Web has no direct equivalent for Flutter's behavior
    // "longestLine" behavior is complex to implement accurately in web
    if (textWidthBasis === 'longestLine') {
      // Could use inline-block + content-box approximation, but it's unstable
      // Left as no-op for now
    }

    return css
  }, [
    style,
    textAlign,
    softWrap,
    overflow,
    maxLines,
    textScaleFactor,
    textScaler,
    textDirection,
    textWidthBasis,
  ])

  // Generate unique class name for selection color
  const selectionClass = useMemo(() => {
    if (!selectionColor) return undefined
    // Use useId to generate collision-resistant class name
    return `text-selection-${id.replace(/[:]/g, '-')}`
  }, [selectionColor, id])

  // Dynamic style injection for selection color
  const selectionStyleTag =
    selectionColor && selectionClass ? (
      <style>{`
      .${selectionClass}::selection { background: ${selectionColor}; }
      .${selectionClass}::-moz-selection { background: ${selectionColor}; }
    `}</style>
    ) : null

  // Accessibility and semantic attributes
  const ariaLabel = semanticsLabel
  const elemId = semanticsIdentifier || undefined

  // Combine CSS classes
  const combinedClassName = [selectionClass, className].filter(Boolean).join(' ') || undefined

  // Render the text component using span element
  return (
    <>
      {selectionStyleTag}
      <span
        id={elemId}
        className={combinedClassName}
        style={scaledStyle}
        lang={locale}
        dir={textDirection === TextDirection.AUTO ? 'auto' : textDirection.toLowerCase()}
        aria-label={ariaLabel}
      >
        {children ?? data}
      </span>
    </>
  )
}
