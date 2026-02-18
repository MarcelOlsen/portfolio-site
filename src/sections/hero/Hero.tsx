import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { animate, motion, useAnimate } from 'framer-motion'
import { ease } from '../../styles/tokens'
import styles from './Hero.module.css'

const line1 = ["Things", "that", "move."]
const line2 = ["Built", "to", "be", "remembered."]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease } },
}
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease } },
}
const fadeRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.95, ease: ease, delay: 0.06 } },
}
const fadeLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.95, ease: ease, delay: 0.06 } },
}

const SWIPE_DURATION = 0.35
const SWIPE_LINEAR: [number, number, number, number] = [0, 0, 1, 1]
const DOT_GAP = 12
const DOT_SIZE = 6
const DOT_HOLD_REVEAL_MS = 1500

type StatusPositions = {
  mainLeft: number
  mainRight: number
  eggLeft: number
  eggRight: number
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = headlineRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = headlineRef.current
    if (!el) return
    el.style.setProperty('--glow-x', '-999px')
    el.style.setProperty('--glow-y', '-999px')
  }, [])

  const [statusScope, animateStatus] = useAnimate()
  const textMainRef = useRef<HTMLSpanElement>(null)
  const textEggRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const isRevealed = useRef(false)
  const animating = useRef(false)
  const holdRafRef = useRef<number | null>(null)
  const holdStartRef = useRef<number | null>(null)
  const [isDotHovering, setIsDotHovering] = useState(false)
  const [dotHoldProgress, setDotHoldProgress] = useState(0)

  const measureStatusPositions = useCallback((): StatusPositions | null => {
    const mainWidth = textMainRef.current?.offsetWidth
    const eggWidth = textEggRef.current?.offsetWidth
    const containerWidth = wrapRef.current?.offsetWidth

    if (!mainWidth || !eggWidth || !containerWidth) return null

    // Text is right-aligned inside a shared container, so each text has its own left edge.
    const mainStart = containerWidth - mainWidth
    const eggStart = containerWidth - eggWidth

    return {
      // Resting gap is measured from dot's right edge to text's left edge.
      mainLeft: mainStart - DOT_GAP - DOT_SIZE,
      // Keep the right sweep tight to the text edge to avoid overshooting.
      mainRight: mainStart + mainWidth - DOT_SIZE,
      eggLeft: eggStart - DOT_GAP - DOT_SIZE,
      eggRight: eggStart + eggWidth - DOT_SIZE,
    }
  }, [])

  const syncDotToCurrentState = useCallback(() => {
    const next = measureStatusPositions()
    if (!next || !dotRef.current) return

    const activeText = isRevealed.current ? textEggRef.current : textMainRef.current
    if (activeText) {
      dotRef.current.style.top = `${activeText.offsetTop + activeText.offsetHeight / 2 - DOT_SIZE / 2}px`
    }

    dotRef.current.style.left = `${isRevealed.current ? next.eggLeft : next.mainLeft}px`
  }, [measureStatusPositions])

  const animateCharacterClip = useCallback(
    (
      el: HTMLSpanElement | null,
      fromHiddenChars: number,
      toHiddenChars: number,
      totalChars: number,
    ) => {
      if (!el || totalChars <= 0) return Promise.resolve()

      const control = animate(fromHiddenChars, toHiddenChars, {
        duration: SWIPE_DURATION,
        ease: 'linear',
        onUpdate: (value) => {
          const hidden = Math.max(0, Math.min(totalChars, Math.round(value)))
          const hiddenPercent = (hidden / totalChars) * 100
          el.style.clipPath = `inset(0 0 0 ${hiddenPercent}%)`
        },
      })

      return control.finished
    },
    [],
  )

  useEffect(() => {
    syncDotToCurrentState()
    const rafId = window.requestAnimationFrame(syncDotToCurrentState)
    void document.fonts?.ready.then(() => {
      if (!animating.current) syncDotToCurrentState()
    })

    const handleResize = () => {
      if (animating.current) return
      syncDotToCurrentState()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [syncDotToCurrentState])


  const handleStatusEnter = useCallback(async () => {
    if (isRevealed.current || animating.current) return
    animating.current = true

    const positions = measureStatusPositions()
    const mainChars = textMainRef.current?.textContent?.length ?? 0
    const eggChars = textEggRef.current?.textContent?.length ?? 0
    if (!positions) {
      animating.current = false
      return
    }

    // Phase 1: dot sweeps right to end of main text, hiding it
    await Promise.all([
      animateStatus('[data-dot]', { left: positions.mainRight }, { duration: SWIPE_DURATION, ease: SWIPE_LINEAR }),
      animateCharacterClip(textMainRef.current, 0, mainChars, mainChars),
    ])

    // Phase 2: dot sweeps back left, revealing easter egg
    await Promise.all([
      animateStatus('[data-dot]', { left: positions.eggLeft }, { duration: SWIPE_DURATION, ease: SWIPE_LINEAR }),
      animateCharacterClip(textEggRef.current, eggChars, 0, eggChars),
    ])

    isRevealed.current = true
    animating.current = false
    syncDotToCurrentState()
  }, [animateCharacterClip, animateStatus, measureStatusPositions, syncDotToCurrentState])

  const handleStatusLeave = useCallback(async () => {
    if (!isRevealed.current || animating.current) return
    animating.current = true

    const positions = measureStatusPositions()
    const mainChars = textMainRef.current?.textContent?.length ?? 0
    const eggChars = textEggRef.current?.textContent?.length ?? 0
    if (!positions) {
      animating.current = false
      return
    }

    // Phase 1: dot sweeps right to end of easter egg text, hiding it
    await Promise.all([
      animateStatus('[data-dot]', { left: positions.eggRight }, { duration: SWIPE_DURATION, ease: SWIPE_LINEAR }),
      animateCharacterClip(textEggRef.current, 0, eggChars, eggChars),
    ])

    // Phase 2: dot sweeps back left, revealing main text
    await Promise.all([
      animateStatus('[data-dot]', { left: positions.mainLeft }, { duration: SWIPE_DURATION, ease: SWIPE_LINEAR }),
      animateCharacterClip(textMainRef.current, mainChars, 0, mainChars),
    ])

    isRevealed.current = false
    animating.current = false
    syncDotToCurrentState()
  }, [animateCharacterClip, animateStatus, measureStatusPositions, syncDotToCurrentState])

  const clearHoldProgress = useCallback(() => {
    if (holdRafRef.current !== null) {
      window.cancelAnimationFrame(holdRafRef.current)
      holdRafRef.current = null
    }
    holdStartRef.current = null
    setDotHoldProgress(0)
  }, [])

  const handleDotEnter = useCallback(() => {
    setIsDotHovering(true)
    if (isRevealed.current || animating.current || holdRafRef.current !== null) return

    holdStartRef.current = performance.now()

    const tick = (ts: number) => {
      if (holdStartRef.current === null) return
      const elapsed = ts - holdStartRef.current
      const progress = Math.max(0, Math.min(1, elapsed / DOT_HOLD_REVEAL_MS))
      setDotHoldProgress(progress)

      if (progress >= 1) {
        holdRafRef.current = null
        holdStartRef.current = null
        void handleStatusEnter()
        return
      }

      holdRafRef.current = window.requestAnimationFrame(tick)
    }

    holdRafRef.current = window.requestAnimationFrame(tick)
  }, [handleStatusEnter])

  const handleDotLeave = useCallback(() => {
    setIsDotHovering(false)
    clearHoldProgress()
  }, [clearHoldProgress])

  const handleStatusContainerLeave = useCallback(() => {
    setIsDotHovering(false)
    clearHoldProgress()
    void handleStatusLeave()
  }, [clearHoldProgress, handleStatusLeave])

  useEffect(() => {
    return () => clearHoldProgress()
  }, [clearHoldProgress])

  return (
    <section
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.header}>
        <motion.span
          className={styles.name}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          Marcel Olsen
        </motion.span>
        <motion.div
          ref={statusScope}
          className={styles.status}
          data-cursor-compact
          variants={fadeRightVariants}
          initial="hidden"
          animate="visible"
          onMouseLeave={handleStatusContainerLeave}
        >
          <span ref={wrapRef} className={styles.statusTextWrap}>
            <span
              ref={dotRef}
              data-dot
              className={styles.dotHitArea}
              style={{ '--dot-hold-progress': dotHoldProgress } as CSSProperties}
              onMouseEnter={handleDotEnter}
              onMouseLeave={handleDotLeave}
            >
              <span className={`${styles.dot} ${isDotHovering ? styles.dotActive : ''}`} />
            </span>
            <span
              ref={textMainRef}
              data-text-main
              className={styles.statusText}
              style={{ clipPath: 'inset(0 0 0 0%)' }}
            >
              Available for work
            </span>
            <span
              ref={textEggRef}
              data-text-egg
              className={`${styles.statusText} ${styles.easterEgg}`}
              style={{ clipPath: 'inset(0 0 0 100%)' }}
            >
              This is actually the colour of my couch!
            </span>
          </span>
        </motion.div>
      </div>

      <div className={styles.headlineArea}>
        <motion.span
          className={styles.eyebrow}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          Portfolio · 2025
        </motion.span>
        <motion.h1
          ref={headlineRef}
          className={styles.headline}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          data-hide-cursor
        >
          {line1.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className={styles.word}>
              {word}
            </motion.span>
          ))}
          <br />
          {line2.map((word, i) => (
            <motion.span key={`l2-${i}`} variants={wordVariants} className={styles.word}>
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <div className={styles.footerRow}>
        <motion.span
          className={styles.scrollHint}
          variants={fadeLeftVariants}
          initial="hidden"
          animate="visible"
        >
          ↓ Scroll
        </motion.span>
        <motion.span
          className={styles.disciplines}
          variants={fadeRightVariants}
          initial="hidden"
          animate="visible"
        >
          Frontend Engineering · Motion · Interactive Experiences
        </motion.span>
      </div>
    </section>
  )
}
