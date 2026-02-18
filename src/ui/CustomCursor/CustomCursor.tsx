import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import cursorStyles from './CustomCursor.module.css'

const STUCK_PX = 28

type SectionTheme = 'light' | 'dark'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 600, damping: 45 })
  const springY = useSpring(y, { stiffness: 600, damping: 45 })

  const [isHovered, setIsHovered] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [theme, setTheme] = useState<SectionTheme>('light')

  const themeRef = useRef<SectionTheme>('light')
  const pendingTheme = useRef<SectionTheme>('light')
  const entryPoint = useRef({ x: -100, y: -100 })
  const committed = useRef(true)
  const lastMouse = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const detectTheme = (mx: number, my: number) => {
      const cursor = cursorRef.current
      if (cursor) cursor.style.display = 'none'
      const el = document.elementFromPoint(mx, my)
      if (cursor) cursor.style.display = ''

      return (
        el?.closest('[data-theme]')?.getAttribute('data-theme') === 'dark'
          ? 'dark'
          : 'light'
      ) as SectionTheme
    }

    const onMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      lastMouse.current = { x: mx, y: my }
      x.set(mx)
      y.set(my)

      const cursor = cursorRef.current
      if (cursor) cursor.style.display = 'none'
      const el = document.elementFromPoint(mx, my)
      if (cursor) cursor.style.display = ''

      const detected = (
        el?.closest('[data-theme]')?.getAttribute('data-theme') === 'dark'
          ? 'dark'
          : 'light'
      ) as SectionTheme

      // New section boundary — start distance tracking
      if (detected !== pendingTheme.current) {
        pendingTheme.current = detected
        entryPoint.current = { x: mx, y: my }
        committed.current = false
      }

      // Commit color change after cursor travels STUCK_PX into new section
      if (!committed.current) {
        const dist = Math.hypot(mx - entryPoint.current.x, my - entryPoint.current.y)
        if (dist >= STUCK_PX && pendingTheme.current !== themeRef.current) {
          committed.current = true
          themeRef.current = pendingTheme.current
          setTheme(pendingTheme.current)
        }
      }

      if (el) {
        setIsHovered(!!el.closest('a, button'))
        setIsHidden(!!el.closest('[data-hide-cursor]'))
        setIsCompact(!!el.closest('[data-cursor-compact]'))
      }
    }

    const onScroll = () => {
      const { x: mx, y: my } = lastMouse.current
      if (mx < 0) return

      const detected = detectTheme(mx, my)
      if (detected !== themeRef.current) {
        themeRef.current = detected
        pendingTheme.current = detected
        committed.current = true
        setTheme(detected)
      }

      // Also re-check hover/hidden state
      const cursor = cursorRef.current
      if (cursor) cursor.style.display = 'none'
      const el = document.elementFromPoint(mx, my)
      if (cursor) cursor.style.display = ''
      if (el) {
        setIsHovered(!!el.closest('a, button'))
        setIsHidden(!!el.closest('[data-hide-cursor]'))
        setIsCompact(!!el.closest('[data-cursor-compact]'))
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      setIsHovered(!!target.closest('a, button'))
      setIsHidden(!!target.closest('[data-hide-cursor]'))
      setIsCompact(!!target.closest('[data-cursor-compact]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('scroll', onScroll)
    }
  }, [x, y])

  const color = isHovered
    ? 'var(--color-rust)'
    : theme === 'dark'
      ? 'var(--color-bg)'
      : 'var(--color-ink)'

  const baseScale = isCompact ? 0.58 : 1
  const hoverScale = isCompact ? 2.2 : 3.5
  const baseOpacity = isCompact ? 0.55 : 1
  const hoverOpacity = isCompact ? 0.28 : 0.35

  return (
    <motion.div
      ref={cursorRef}
      className={cursorStyles.dot}
      style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        scale: isHovered ? hoverScale : baseScale,
        backgroundColor: color,
        opacity: isHidden ? 0 : isHovered ? hoverOpacity : baseOpacity,
      }}
      transition={{
        scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.12, ease: 'easeOut' },
      }}
    />
  )
}
