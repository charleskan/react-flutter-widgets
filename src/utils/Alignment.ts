export interface AlignmentGeometry {
  x: number
  y: number
}

export class Alignment {
  static readonly topLeft: AlignmentGeometry = { x: -1, y: -1 }
  static readonly topCenter: AlignmentGeometry = { x: 0, y: -1 }
  static readonly topRight: AlignmentGeometry = { x: 1, y: -1 }
  static readonly centerLeft: AlignmentGeometry = { x: -1, y: 0 }
  static readonly center: AlignmentGeometry = { x: 0, y: 0 }
  static readonly centerRight: AlignmentGeometry = { x: 1, y: 0 }
  static readonly bottomLeft: AlignmentGeometry = { x: -1, y: 1 }
  static readonly bottomCenter: AlignmentGeometry = { x: 0, y: 1 }
  static readonly bottomRight: AlignmentGeometry = { x: 1, y: 1 }
  /**
   * Converts Flutter-style alignment (-1 to 1) to CSS percentage values
   */
  static toCSS(alignment: AlignmentGeometry): { x: string; y: string } {
    const x = (((alignment.x + 1) / 2) * 100).toFixed(1)
    const y = (((alignment.y + 1) / 2) * 100).toFixed(1)
    return { x: `${x}%`, y: `${y}%` }
  }

  /**
   * Converts alignment to CSS justify-content and align-items classes for flexbox
   */
  static toFlexClasses(alignment: AlignmentGeometry): string[] {
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
  static toTransformOrigin(alignment: AlignmentGeometry): string {
    const originX = alignment.x === -1 ? 'left' : alignment.x === 0 ? 'center' : 'right'
    const originY = alignment.y === -1 ? 'top' : alignment.y === 0 ? 'center' : 'bottom'
    return `${originX} ${originY}`
  }
}
