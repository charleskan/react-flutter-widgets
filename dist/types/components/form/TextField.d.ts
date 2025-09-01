import React from "react";
export interface InputDecoration {
    labelText?: string;
    hintText?: string;
    helperText?: string;
    errorText?: string;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    counterText?: string;
    filled?: boolean;
    fillColor?: string;
    border?: "none" | "outline" | "underline";
}
export type TextInputType = "text" | "emailAddress" | "number" | "phone" | "url" | "password";
export type TextInputAction = "done" | "search" | "next" | "send" | "go" | "none";
export type TextAlign = "start" | "end" | "left" | "right" | "center";
export type TextCapitalization = "none" | "characters" | "words" | "sentences";
export interface TextFieldProps {
    /** Controls the text being edited (controlled mode). If provided, component is controlled. */
    value?: string;
    /** Default text (uncontrolled mode). */
    defaultValue?: string;
    /** Equivalent of Flutter's controller.text setter semantics */
    onChangeText?: (text: string) => void;
    onChanged?: (text: string) => void;
    onEditingComplete?: () => void;
    onSubmitted?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onTap?: () => void;
    style?: React.CSSProperties;
    textAlign?: TextAlign;
    textDirection?: "ltr" | "rtl";
    textCapitalization?: TextCapitalization;
    maxLength?: number;
    maxLines?: number | null;
    minLines?: number;
    expands?: boolean;
    obscureText?: boolean;
    obscuringCharacter?: string;
    enabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    canRequestFocus?: boolean;
    keyboardType?: TextInputType;
    textInputAction?: TextInputAction;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    decoration?: InputDecoration;
    id?: string;
    name?: string;
    placeholder?: string;
    /** Forward a ref to access imperative methods like focus/select/clear. */
    forwardedRef?: React.Ref<TextFieldHandle>;
    className?: string;
    containerStyle?: React.CSSProperties;
}
export interface TextFieldHandle {
    focus: () => void;
    blur: () => void;
    select: () => void;
    clear: () => void;
    getValue: () => string;
    setValue: (v: string) => void;
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
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<TextFieldHandle>>;
export default TextField;
//# sourceMappingURL=TextField.d.ts.map