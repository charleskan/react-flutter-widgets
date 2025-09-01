'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface Size {
  width: number
  height: number
}
export interface EdgeInsets {
  top: number
  right: number
  bottom: number
  left: number
}

export enum Orientation {
  portrait = 'portrait',
  landscape = 'landscape',
}
export enum Brightness {
  light = 'light',
  dark = 'dark',
}

export interface MediaQueryData {
  size: Size
  devicePixelRatio: number
  orientation: Orientation
  padding: EdgeInsets
  viewInsets: EdgeInsets
  textScaleFactor: number
  platformBrightness: Brightness
  disableAnimations: boolean
  highContrast: boolean
  supportsTouch: boolean
}

export interface MediaQueryBreakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export const defaultBreakpoints: MediaQueryBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

type MediaQueryContextValue = MediaQueryData & { breakpoints: MediaQueryBreakpoints }

const MediaQueryContext = createContext<MediaQueryContextValue | undefined>(undefined)

export interface MediaQueryProps {
  children: ReactNode
  breakpoints?: MediaQueryBreakpoints
  data?: MediaQueryData
}

const isBrowser = typeof window !== 'undefined'

const DEFAULT_DATA: MediaQueryData = {
  size: { width: 0, height: 0 },
  devicePixelRatio: 1,
  orientation: Orientation.portrait,
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  viewInsets: { top: 0, right: 0, bottom: 0, left: 0 },
  textScaleFactor: 1,
  platformBrightness: Brightness.light,
  disableAnimations: false,
  highContrast: false,
  supportsTouch: false,
}

export default function MediaQuery({
  children,
  breakpoints = defaultBreakpoints,
  data,
}: MediaQueryProps) {
  const [mediaQueryData, setMediaQueryData] = useState<MediaQueryData>(() => data ?? DEFAULT_DATA)

  useEffect(() => {
    if (data) {
      setMediaQueryData(data)
      return
    }
    if (!isBrowser) return

    const root = document.documentElement
    root.style.setProperty(
      '--safe-area-inset-top',
      getComputedStyle(root).getPropertyValue('env(safe-area-inset-top)'),
    )
    root.style.setProperty(
      '--safe-area-inset-right',
      getComputedStyle(root).getPropertyValue('env(safe-area-inset-right)'),
    )
    root.style.setProperty(
      '--safe-area-inset-bottom',
      getComputedStyle(root).getPropertyValue('env(safe-area-inset-bottom)'),
    )
    root.style.setProperty(
      '--safe-area-inset-left',
      getComputedStyle(root).getPropertyValue('env(safe-area-inset-left)'),
    )

    const update = () => setMediaQueryData(readCurrent())

    update()

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    const orientationMQ = window.matchMedia('(orientation: portrait)')
    const darkMQ = window.matchMedia('(prefers-color-scheme: dark)')
    const reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastMQ = window.matchMedia('(prefers-contrast: more), (prefers-contrast: high)')
    const forcedColorsMQ = window.matchMedia('(forced-colors: active)')

    orientationMQ.addEventListener('change', update)
    darkMQ.addEventListener('change', update)
    reduceMotionMQ.addEventListener('change', update)
    highContrastMQ.addEventListener('change', update)
    forcedColorsMQ.addEventListener('change', update)

    const vv = window.visualViewport
    vv?.addEventListener('resize', update)
    vv?.addEventListener('scroll', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      orientationMQ.removeEventListener('change', update)
      darkMQ.removeEventListener('change', update)
      reduceMotionMQ.removeEventListener('change', update)
      highContrastMQ.removeEventListener('change', update)
      forcedColorsMQ.removeEventListener('change', update)
      vv?.removeEventListener('resize', update)
      vv?.removeEventListener('scroll', update)
    }
  }, [data])

  const contextValue = useMemo<MediaQueryContextValue>(
    () => ({ ...mediaQueryData, breakpoints }),
    [mediaQueryData, breakpoints],
  )

  return <MediaQueryContext.Provider value={contextValue}>{children}</MediaQueryContext.Provider>
}

export function useMediaQuery(): MediaQueryContextValue {
  const ctx = useContext(MediaQueryContext)
  if (!ctx) throw new Error('useMediaQuery must be used within a <MediaQuery> provider')
  return ctx
}

export function useBreakpoint(breakpoints?: MediaQueryBreakpoints) {
  const { size, breakpoints: ctxBp } = useMediaQuery()
  const bp = breakpoints || ctxBp
  return useMemo(() => {
    const w = size.width
    if (w >= bp.xl) return 'xl'
    if (w >= bp.lg) return 'lg'
    if (w >= bp.md) return 'md'
    if (w >= bp.sm) return 'sm'
    return 'xs'
  }, [size.width, bp])
}

export function useBreakpointMatch(condition: string, breakpoints?: MediaQueryBreakpoints) {
  const { size, breakpoints: ctxBp } = useMediaQuery()
  const bp = breakpoints || ctxBp
  return useMemo(() => {
    const w = size.width
    switch (condition) {
      case 'xs-only':
        return w < bp.sm
      case 'sm-only':
        return w >= bp.sm && w < bp.md
      case 'md-only':
        return w >= bp.md && w < bp.lg
      case 'lg-only':
        return w >= bp.lg && w < bp.xl
      case 'xl-only':
        return w >= bp.xl
      case 'xs-up':
        return w >= bp.xs
      case 'sm-up':
        return w >= bp.sm
      case 'md-up':
        return w >= bp.md
      case 'lg-up':
        return w >= bp.lg
      case 'xl-up':
        return w >= bp.xl
      case 'sm-down':
        return w < bp.md
      case 'md-down':
        return w < bp.lg
      case 'lg-down':
        return w < bp.xl
      default:
        return false
    }
  }, [condition, size.width, bp])
}

function readCurrent(): MediaQueryData {
  if (!isBrowser) return DEFAULT_DATA

  const width = window.innerWidth
  const height = window.innerHeight
  const devicePixelRatio = window.devicePixelRatio || 1
  const orientation = width > height ? Orientation.landscape : Orientation.portrait

  const padding = readSafeArea()
  const viewInsets = readViewInsets()
  const textScaleFactor = readTextScaleFactor()

  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const highContrast =
    window.matchMedia('(prefers-contrast: more)').matches ||
    window.matchMedia('(prefers-contrast: high)').matches ||
    window.matchMedia('(forced-colors: active)').matches

  const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return {
    size: { width, height },
    devicePixelRatio,
    orientation,
    padding,
    viewInsets,
    textScaleFactor,
    platformBrightness: dark ? Brightness.dark : Brightness.light,
    disableAnimations: reduce,
    highContrast,
    supportsTouch,
  }
}

function readSafeArea(): EdgeInsets {
  const cs = getComputedStyle(document.documentElement)
  const toNum = (v: string) => Number.parseFloat(v || '0') || 0
  const top = toNum(cs.getPropertyValue('--safe-area-inset-top'))
  const right = toNum(cs.getPropertyValue('--safe-area-inset-right'))
  const bottom = toNum(cs.getPropertyValue('--safe-area-inset-bottom'))
  const left = toNum(cs.getPropertyValue('--safe-area-inset-left'))
  return { top, right, bottom, left }
}

function readViewInsets(): EdgeInsets {
  const vv = window.visualViewport
  if (!vv) return { top: 0, right: 0, bottom: 0, left: 0 }
  const bottom = Math.max(0, window.innerHeight - vv.height)
  return { top: 0, right: 0, bottom, left: 0 }
}

function readTextScaleFactor(): number {
  const el = document.createElement('div')
  el.style.fontSize = '16px'
  el.style.position = 'absolute'
  el.style.visibility = 'hidden'
  el.textContent = 'x'
  document.body.appendChild(el)
  const computed = Number.parseFloat(getComputedStyle(el).fontSize)
  document.body.removeChild(el)
  return computed / 16 || 1
}
