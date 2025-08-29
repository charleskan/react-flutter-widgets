export interface SpacerProps {
  flex?: number
}

function Spacer({ flex = 1 }: SpacerProps) {
  return <div style={{ flex, flexShrink: 1 }} />
}

export default Spacer
