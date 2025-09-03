export interface AlignmentGeometry {
  x: number
  y: number
}

export const Alignment = {
  topLeft: { x: -1, y: -1 } as const,
  topCenter: { x: 0, y: -1 } as const,
  topRight: { x: 1, y: -1 } as const,
  centerLeft: { x: -1, y: 0 } as const,
  center: { x: 0, y: 0 } as const,
  centerRight: { x: 1, y: 0 } as const,
  bottomLeft: { x: -1, y: 1 } as const,
  bottomCenter: { x: 0, y: 1 } as const,
  bottomRight: { x: 1, y: 1 } as const,
} as const

/**
 * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
 */
export function alignmentToCSS(alignment: AlignmentGeometry): { x: string; y: string } {
  const x = (((alignment.x + 1) / 2) * 100).toFixed(1)
  const y = (((alignment.y + 1) / 2) * 100).toFixed(1)
  return { x: `${x}%`, y: `${y}%` }
}

/**
 * Converts alignment to CSS justify-content and align-items classes for flexbox
 */
export function alignmentToFlexClasses(alignment: AlignmentGeometry): string[] {
  const classes: string[] = ['flex']

  // Justify content (x-axis)
  if (alignment.x === -1) classes.push('justify-start')
  else if (alignment.x === 0) classes.push('justify-center')
  else if (alignment.x === 1) classes.push('justify-end')

  // Align items (y-axis)
  if (alignment.y === -1) classes.push('items-start')
  else if (alignment.y === 0) classes.push('items-center')
  else if (alignment.y === 1) classes.push('items-end')

  return classes
}

/**
 * Converts alignment to CSS transform-origin property
 */
export function alignmentToTransformOrigin(alignment: AlignmentGeometry): string {
  const originX = alignment.x === -1 ? 'left' : alignment.x === 0 ? 'center' : 'right'
  const originY = alignment.y === -1 ? 'top' : alignment.y === 0 ? 'center' : 'bottom'
  return `${originX} ${originY}`
}
