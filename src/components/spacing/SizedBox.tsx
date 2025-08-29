export interface SizedBoxProps {
  width?: number | string
  height?: number | string
}

function SizedBox({ width, height }: SizedBoxProps) {
  const style: React.CSSProperties = {}
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }
  return <div style={style} />
}

export default SizedBox
