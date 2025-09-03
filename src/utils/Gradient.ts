import type { AlignmentGeometry } from './Alignment'

export interface GradientStop {
  color: string
  stop?: number
}

export abstract class Gradient {
  colors: string[]
  stops?: number[]

  constructor(options: { colors: string[]; stops?: number[] }) {
    this.colors = options.colors
    this.stops = options.stops
  }

  abstract toCSS(): string
}

export class LinearGradient extends Gradient {
  begin: AlignmentGeometry
  end: AlignmentGeometry
  tileMode?: 'clamp' | 'repeat' | 'mirror'

  constructor(options: {
    colors: string[]
    stops?: number[]
    begin?: AlignmentGeometry
    end?: AlignmentGeometry
    tileMode?: 'clamp' | 'repeat' | 'mirror'
  }) {
    super({ colors: options.colors, stops: options.stops })
    this.begin = options.begin || { x: -1, y: 0 }
    this.end = options.end || { x: 1, y: 0 }
    this.tileMode = options.tileMode || 'clamp'
  }

  private alignmentToAngle(begin: AlignmentGeometry, end: AlignmentGeometry): number {
    const dx = end.x - begin.x
    const dy = end.y - begin.y
    return Math.atan2(dy, dx) * (180 / Math.PI) + 90
  }

  toCSS(): string {
    const angle = this.alignmentToAngle(this.begin, this.end)

    let colorStops: string[]
    if (this.stops && this.stops.length === this.colors.length) {
      const stops = this.stops // TypeScript narrowing
      colorStops = this.colors.map((color, index) => {
        const stop = stops[index] ?? 0
        return `${color} ${stop * 100}%`
      })
    } else {
      colorStops = this.colors.map((color, index) => {
        const percentage = this.colors.length === 1 ? 0 : (index / (this.colors.length - 1)) * 100
        return `${color} ${percentage}%`
      })
    }

    return `linear-gradient(${angle}deg, ${colorStops.join(', ')})`
  }
}

export class RadialGradient extends Gradient {
  center: AlignmentGeometry
  radius: number
  focal?: AlignmentGeometry
  focalRadius: number
  tileMode: 'clamp' | 'repeat' | 'mirror'

  constructor(options: {
    colors: string[]
    stops?: number[]
    center?: AlignmentGeometry
    radius?: number
    focal?: AlignmentGeometry
    focalRadius?: number
    tileMode?: 'clamp' | 'repeat' | 'mirror'
  }) {
    super({ colors: options.colors, stops: options.stops })
    this.center = options.center || { x: 0, y: 0 }
    this.radius = options.radius || 0.5
    this.focal = options.focal
    this.focalRadius = options.focalRadius || 0
    this.tileMode = options.tileMode || 'clamp'
  }

  private alignmentToPercentage(alignment: AlignmentGeometry): { x: string; y: string } {
    const x = (((alignment.x + 1) / 2) * 100).toFixed(1)
    const y = (((alignment.y + 1) / 2) * 100).toFixed(1)
    return { x: `${x}%`, y: `${y}%` }
  }

  toCSS(): string {
    const centerPos = this.alignmentToPercentage(this.center)

    let colorStops: string[]
    if (this.stops && this.stops.length === this.colors.length) {
      const stops = this.stops // TypeScript narrowing
      colorStops = this.colors.map((color, index) => {
        const stop = stops[index] ?? 0
        return `${color} ${stop * 100}%`
      })
    } else {
      colorStops = this.colors.map((color, index) => {
        const percentage = this.colors.length === 1 ? 0 : (index / (this.colors.length - 1)) * 100
        return `${color} ${percentage}%`
      })
    }

    const radiusValue = `${this.radius * 100}%`

    return `radial-gradient(circle ${radiusValue} at ${centerPos.x} ${centerPos.y}, ${colorStops.join(', ')})`
  }
}

export class SweepGradient extends Gradient {
  center: AlignmentGeometry
  startAngle: number
  endAngle: number
  tileMode: 'clamp' | 'repeat' | 'mirror'

  constructor(options: {
    colors: string[]
    stops?: number[]
    center?: AlignmentGeometry
    startAngle?: number
    endAngle?: number
    tileMode?: 'clamp' | 'repeat' | 'mirror'
  }) {
    super({ colors: options.colors, stops: options.stops })
    this.center = options.center || { x: 0, y: 0 }
    this.startAngle = options.startAngle || 0
    this.endAngle = options.endAngle || Math.PI * 2
    this.tileMode = options.tileMode || 'clamp'
  }

  private alignmentToPercentage(alignment: AlignmentGeometry): { x: string; y: string } {
    const x = (((alignment.x + 1) / 2) * 100).toFixed(1)
    const y = (((alignment.y + 1) / 2) * 100).toFixed(1)
    return { x: `${x}%`, y: `${y}%` }
  }

  toCSS(): string {
    const centerPos = this.alignmentToPercentage(this.center)
    const startAngleDeg = this.startAngle * (180 / Math.PI)

    let colorStops: string[]
    if (this.stops && this.stops.length === this.colors.length) {
      const stops = this.stops // TypeScript narrowing
      colorStops = this.colors.map((color, index) => {
        const stop = stops[index] ?? 0
        const angle = startAngleDeg + stop * (this.endAngle - this.startAngle) * (180 / Math.PI)
        return `${color} ${angle}deg`
      })
    } else {
      colorStops = this.colors.map((color, index) => {
        const progress = this.colors.length === 1 ? 0 : index / (this.colors.length - 1)
        const angle = startAngleDeg + progress * (this.endAngle - this.startAngle) * (180 / Math.PI)
        return `${color} ${angle}deg`
      })
    }

    return `conic-gradient(from ${startAngleDeg}deg at ${centerPos.x} ${centerPos.y}, ${colorStops.join(', ')})`
  }
}
