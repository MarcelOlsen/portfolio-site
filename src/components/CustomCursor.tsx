import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'

const STUCK_PX = 28

type SectionTheme = 'light' | 'dark'

const styles = stylex.create({
  dot: {
    position: 'fixed',
    width: '11px',
    height: '11px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    top: 0,
    left: 0,
  },
})

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 600, damping: 45 })
  const springY = useSpring(y, { stiffness: 600, damping: 45 })

  const [isHovered, setIsHovered] = useState(false)
  const [theme, setTheme] = useState<SectionTheme>('light')

  const themeRef = useRef<SectionTheme>('light')
  const pendingTheme = useRef<SectionTheme>('light')
  const entryPoint = useRef({ x: -100, y: -100 })
  const committed = useRef(true)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      x.set(mx)
      y.set(my)

      // Hide cursor element so elementFromPoint can't return it
      const cursor = cursorRef.current
      if (cursor) cursor.style.display = 'none'
      const el = document.elementFromPoint(mx, my)
      if (cursor) cursor.style.display = ''

      const detected: SectionTheme =
        el?.closest('[data-theme]')?.getAttribute('data-theme') === 'dark'
          ? 'dark'
          : 'light'

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
    }

    const onOver = (e: MouseEvent) => {
      setIsHovered(!!(e.target as Element).closest('a, button'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  const color = isHovered
    ? 'oklch(68% 0.24 40)'
    : theme === 'dark'
      ? 'oklch(97% 0.015 85)'
      : 'oklch(18% 0.05 250)'

  return (
    <motion.div
      ref={cursorRef}
      {...stylex.props(styles.dot)}
      style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ scale: isHovered ? 3.5 : 1, backgroundColor: color }}
      transition={{
        scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.12, ease: 'easeOut' },
      }}
    />
  )
}
