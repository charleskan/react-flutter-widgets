import type React from 'react'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import type { TextAlign, TextCapitalization } from '../../types/Text.types'

// ===== Decoration (rough InputDecoration analogue) =====
export interface InputDecoration {
  labelText?: string
  hintText?: string
  helperText?: string
  errorText?: string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  counterText?: string // When set, overrides auto counter
  filled?: boolean // basic filled style
  fillColor?: string
  border?: 'none' | 'outline' | 'underline'
}

// ===== Keyboard type analogue (maps to inputmode/type) =====
export type TextInputType = 'text' | 'emailAddress' | 'number' | 'phone' | 'url' | 'password'

// ===== Text input action analogue (we map Enter behavior) =====
export type TextInputAction = 'done' | 'search' | 'next' | 'send' | 'go' | 'none'

export interface TextFieldProps {
  /** Controls the text being edited (controlled mode). If provided, component is controlled. */
  value?: string
  /** Default text (uncontrolled mode). */
  defaultValue?: string
  /** Equivalent of Flutter's controller.text setter semantics */
  onChangeText?: (text: string) => void // Flutter: onChanged
  onChanged?: (text: string) => void // alias

  // Focus / submit lifecycle
  onEditingComplete?: () => void // Flutter: onEditingComplete (fires on blur or Enter)
  onSubmitted?: (text: string) => void // Flutter: onSubmitted (Enter key)
  onFocus?: () => void
  onBlur?: () => void
  onTap?: () => void // mouse down/click inside field

  // Text appearance/behavior
  style?: React.CSSProperties
  textAlign?: TextAlign // maps to CSS text-align
  textDirection?: 'ltr' | 'rtl' // dir
  textCapitalization?: TextCapitalization // will transform input on-the-fly
  maxLength?: number
  maxLines?: number | null // null => multiline grows (textarea)
  minLines?: number
  expands?: boolean // if true => textarea stretches to container
  obscureText?: boolean // masks characters; if true, uses type="password"
  obscuringCharacter?: string // not fully supported by HTML; we emulate visually

  // Enablement
  enabled?: boolean // maps to disabled
  readOnly?: boolean
  autoFocus?: boolean
  canRequestFocus?: boolean // if false, we prevent focusing by tabIndex=-1

  // Keyboard hints
  keyboardType?: TextInputType // maps to inputmode + type
  textInputAction?: TextInputAction // affects Enter handling & enterKeyHint
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'] // manual override

  // Decoration
  decoration?: InputDecoration

  // Accessibility & id
  id?: string
  name?: string
  placeholder?: string // convenience fallback to hintText

  // Imperative handle options
  /** Forward a ref to access imperative methods like focus/select/clear. */
  forwardedRef?: React.Ref<TextFieldHandle>

  // Class / style hooks
  className?: string
  containerStyle?: React.CSSProperties
}

export interface TextFieldHandle {
  focus: () => void
  blur: () => void
  select: () => void
  clear: () => void
  getValue: () => string
  setValue: (v: string) => void // only works in uncontrolled mode
}

function mapKeyboard(type?: TextInputType): {
  htmlType: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
} {
  switch (type) {
    case 'emailAddress':
      return { htmlType: 'email', inputMode: 'email' }
    case 'number':
      return { htmlType: 'text', inputMode: 'numeric' } // keep text to allow custom validation
    case 'phone':
      return { htmlType: 'tel', inputMode: 'tel' }
    case 'url':
      return { htmlType: 'url', inputMode: 'url' }
    case 'password':
      return { htmlType: 'password' }
    default:
      return { htmlType: 'text' }
  }
}

function applyCapitalization(text: string, mode?: TextCapitalization) {
  if (!mode || mode === 'none') return text
  switch (mode) {
    case 'characters':
      return text.toUpperCase()
    case 'words':
      return text.replace(/(^|\s)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
    case 'sentences':
      return text.replace(/(^|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
    default:
      return text
  }
}

/**
 * A Flutter TextField–inspired React component.
 *
 * NOTE: This mirrors common TextField props & behaviors from Flutter's material.TextField
 * (controller, decoration, obscureText, maxLength, minLines, maxLines, expands, enabled, readOnly,
 * autofocus, textInputAction-like submit on Enter, onEditingComplete, onSubmitted, etc.).
 * Some Flutter features don't map 1:1 to the web; where not possible, we emulate sensible equivalents.
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField
 *   value={text}
 *   onChangeText={setText}
 *   decoration={{
 *     labelText: "Enter your name",
 *     hintText: "Type here..."
 *   }}
 * />
 *
 * // Multiline text field
 * <TextField
 *   maxLines={null}
 *   minLines={3}
 *   decoration={{
 *     labelText: "Description",
 *     border: "outline"
 *   }}
 * />
 *
 * // Password field
 * <TextField
 *   obscureText={true}
 *   keyboardType="password"
 *   decoration={{
 *     labelText: "Password",
 *     suffixIcon: <EyeIcon />
 *   }}
 * />
 * ```
 */
export const TextField = forwardRef<TextFieldHandle, TextFieldProps>(
  function TextField(props, ref) {
    const {
      value,
      defaultValue,
      onChangeText,
      onChanged,
      onEditingComplete,
      onSubmitted,
      onFocus,
      onBlur,
      onTap,
      style,
      textAlign = 'start',
      textDirection,
      textCapitalization = 'none',
      maxLength,
      maxLines = 1,
      minLines,
      expands = false,
      obscureText = false,
      obscuringCharacter: _, // not used directly; browser uses own mask
      enabled = true,
      readOnly = false,
      autoFocus = false,
      canRequestFocus: __ = true,
      keyboardType = 'text',
      textInputAction = 'none',
      inputMode,
      decoration = {},
      id,
      name,
      placeholder,
      forwardedRef,
      className,
      containerStyle,
    } = props

    const [inner, setInner] = useState<string>(defaultValue ?? '')
    const controlled = value !== undefined
    const currentValue = controlled ? (value as string) : inner

    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

    // expose imperative API
    useImperativeHandle(
      ref ?? forwardedRef,
      (): TextFieldHandle => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        select: () => (inputRef.current as HTMLInputElement | HTMLTextAreaElement)?.select?.(),
        clear: () => {
          if (controlled) {
            ;(onChangeText ?? onChanged)?.('')
          } else {
            setInner('')
          }
        },
        getValue: () => currentValue,
        setValue: (v: string) => {
          if (!controlled) setInner(v)
        },
      }),
      [controlled, currentValue, onChangeText, onChanged],
    )

    // map Flutter keyboard type -> HTML
    const { htmlType, inputMode: autoInputMode } = useMemo(
      () => mapKeyboard(obscureText ? 'password' : keyboardType),
      [keyboardType, obscureText],
    )

    // compute props
    const dir = textDirection
    const ta: React.CSSProperties['textAlign'] =
      textAlign === 'start'
        ? undefined
        : textAlign === 'end'
          ? undefined
          : (textAlign as React.CSSProperties['textAlign'])
    // enterKeyHint mapping removed as it's not used in the implementation

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let text = e.target.value
        if (textCapitalization && textCapitalization !== 'none') {
          const target = e.target as HTMLInputElement | HTMLTextAreaElement
          const cursor = target.selectionStart
          text = applyCapitalization(text, textCapitalization)
          // try to restore caret if capitalization changed length (best-effort)
          if (cursor != null) {
            requestAnimationFrame(() => {
              try {
                target.setSelectionRange(cursor, cursor)
              } catch {}
            })
          }
        }
        if (controlled) {
          ;(onChangeText ?? onChanged)?.(text)
        } else {
          setInner(text)
          ;(onChangeText ?? onChanged)?.(text)
        }
      },
      [controlled, onChangeText, onChanged, textCapitalization],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
          onEditingComplete?.()
          onSubmitted?.(currentValue)
          if (textInputAction === 'next') {
            // try to focus next focusable element
            const form = (e.currentTarget as HTMLInputElement).form
            if (form) {
              const elements = Array.from(
                form.querySelectorAll<HTMLElement>('input, textarea, [tabindex]'),
              )
              const idx = elements.indexOf(e.currentTarget as unknown as HTMLElement)
              if (idx >= 0 && idx + 1 < elements.length) elements[idx + 1]?.focus()
            }
          }
        }
      },
      [currentValue, onEditingComplete, onSubmitted, textInputAction],
    )

    const handleBlur = useCallback(() => {
      onEditingComplete?.()
      onBlur?.()
    }, [onEditingComplete, onBlur])

    const disabled = !enabled

    const showTextarea =
      expands || maxLines == null || maxLines > 1 || (minLines != null && minLines > 1)

    const {
      labelText,
      hintText,
      helperText,
      errorText,
      prefixIcon,
      suffixIcon,
      counterText,
      filled,
      fillColor,
      border,
    } = decoration

    const baseField = showTextarea ? (
      <textarea
        ref={inputRef}
        id={id}
        name={name}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={handleBlur}
        onClick={onTap}
        placeholder={placeholder ?? hintText}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        // biome-ignore lint/a11y/noAutofocus: autoFocus is needed for Flutter compatibility
        autoFocus={autoFocus}
        dir={dir}
        rows={minLines ?? 1}
        style={{
          width: '100%',
          resize: expands ? 'none' : 'vertical',
          flex: expands ? 1 : undefined,
          minHeight: expands ? 0 : undefined,
          textAlign: ta,
          ...style,
        }}
        className="rtf-input"
      />
    ) : (
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={obscureText ? 'password' : htmlType}
        inputMode={inputMode ?? autoInputMode}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={handleBlur}
        onClick={onTap}
        placeholder={placeholder ?? hintText}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        // biome-ignore lint/a11y/noAutofocus: autoFocus is needed for Flutter compatibility
        autoFocus={autoFocus}
        dir={dir}
        style={{
          width: '100%',
          textAlign: ta,
          ...style,
        }}
        className="rtf-input"
      />
    )

    const showCounter = maxLength != null || counterText
    const computedCounterText =
      counterText ?? (maxLength != null ? `${currentValue.length} / ${maxLength}` : undefined)

    return (
      <label
        className={`rtf-container ${className ?? ''}`}
        style={{ display: 'block', ...containerStyle }}
        htmlFor={id}
      >
        {labelText && <span className="rtf-label">{labelText}</span>}
        <div
          className={`rtf-wrapper ${errorText ? 'rtf-error ' : ''}${filled ? 'rtf-filled ' : ''}${border ? `rtf-border-${border} ` : 'rtf-border-outline '}`}
          style={{ background: filled ? (fillColor ?? '#f6f6f6') : undefined }}
        >
          {prefixIcon && <span className="rtf-prefix">{prefixIcon}</span>}
          {baseField}
          {suffixIcon && <span className="rtf-suffix">{suffixIcon}</span>}
        </div>
        {helperText && !errorText && <div className="rtf-helper">{helperText}</div>}
        {errorText && <div className="rtf-error-text">{errorText}</div>}
        {showCounter && <div className="rtf-counter">{computedCounterText}</div>}
        <style>{`
        .rtf-container { font: inherit; color: inherit; }
        .rtf-label { display:block; margin-bottom: 4px; font-size: 0.875rem; color: #555; }
        .rtf-wrapper { display:flex; align-items:center; gap:8px; padding: 10px 12px; border-radius: 8px; }
        .rtf-border-outline { border:1px solid #d0d7de; }
        .rtf-border-underline { border-bottom:1px solid #d0d7de; border-radius:0; padding-left:0; padding-right:0; }
        .rtf-border-none { border:none; }
        .rtf-input { background:transparent; border:none; outline:none; font: inherit; color: inherit; }
        .rtf-input:disabled { color:#9aa0a6; }
        .rtf-filled { background: var(--rtf-fill, #f6f6f6); }
        .rtf-helper { margin-top: 4px; font-size: 0.75rem; color: #6b7280; }
        .rtf-error-text { margin-top: 4px; font-size: 0.75rem; color: #b00020; }
        .rtf-error .rtf-border-outline, .rtf-error .rtf-border-underline { border-color:#b00020; }
        .rtf-counter { margin-top: 4px; font-size: 0.75rem; color:#6b7280; text-align:right; }
        .rtf-prefix, .rtf-suffix { display:flex; align-items:center; }
      `}</style>
      </label>
    )
  },
)

export default TextField
