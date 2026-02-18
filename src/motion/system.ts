import type { RefObject } from 'react'
import { useInView, type Variants } from 'framer-motion'
import { ease } from '../styles/tokens'

type RevealOptions = {
  distance?: number
  duration?: number
  delay?: number
}

const revealTransition = (duration = 1, delay = 0) => ({
  duration,
  delay,
  ease,
})

const axisReveal = (axis: 'x' | 'y', from: number, opts?: RevealOptions): Variants => {
  const { duration = 1, delay = 0 } = opts ?? {}
  if (axis === 'x') {
    return {
      hidden: { opacity: 0, x: from },
      visible: { opacity: 1, x: 0, transition: revealTransition(duration, delay) },
    }
  }
  return {
    hidden: { opacity: 0, y: from },
    visible: { opacity: 1, y: 0, transition: revealTransition(duration, delay) },
  }
}

export const REVEAL_MARGIN = '-140px 0px -140px 0px'
export const DIVIDER_REVEAL_MARGIN = '-100px 0px -100px 0px'

export function useRevealInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  margin = REVEAL_MARGIN,
) {
  return useInView(ref, { once: true, margin: margin as `${number}px` })
}

export const motionSystem = {
  easing: ease,
  fadeUp: (opts?: RevealOptions) => axisReveal('y', opts?.distance ?? 28, opts),
  fadeLeft: (opts?: RevealOptions) => axisReveal('x', -(opts?.distance ?? 50), opts),
  fadeRight: (opts?: RevealOptions) => axisReveal('x', opts?.distance ?? 50, opts),
  stagger: (staggerChildren = 0.12): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren } },
  }),
  underline: { duration: 0.35, ease },
  arrowNudge: { duration: 0.2 },
}
