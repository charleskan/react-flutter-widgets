/**
 * Spacer component equivalent to Flutter's Spacer widget.
 * Creates flexible space that expands to fill available space in a flex container.
 *
 * @example
 * ```tsx
 * <Row>
 *   <div>Left content</div>
 *   <Spacer />
 *   <div>Right content</div>
 * </Row>
 * 
 * // With custom flex value
 * <Column>
 *   <div>Top content</div>
 *   <Spacer flex={2} />
 *   <div>Bottom content</div>
 * </Column>
 * ```
 */
export interface SpacerProps {
  /** Flex factor controlling how much space this widget takes relative to other flex children */
  flex?: number
}

function Spacer({ flex = 1 }: SpacerProps) {
  return <div style={{ flex, flexShrink: 1 }} />
}

export default Spacer
