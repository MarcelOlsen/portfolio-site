import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'
import { ease } from '../styles/tokens'

const styles = stylex.create({
  section: {
    minHeight: '100vh',
    backgroundColor: 'oklch(97% 0.015 85)',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    paddingTop: 'clamp(1.5rem, 2.5vw, 2rem)',
    paddingBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
    paddingLeft: 'clamp(2rem, 7vw, 8rem)',
    paddingRight: 'clamp(2rem, 7vw, 8rem)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.2em',
    color: 'oklch(18% 0.05 250)',
    textTransform: 'uppercase',
  },
  status: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    color: 'oklch(18% 0.05 250 / 38%)',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'oklch(68% 0.24 40)',
    flexShrink: 0,
    display: 'inline-block',
  },
  headlineArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
    perspective: '1400px',
  },
  eyebrow: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'oklch(18% 0.05 250 / 28%)',
    marginBottom: '1.75rem',
    display: 'block',
  },
  headline: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(3rem, 6.5vw, 7rem)',
    fontWeight: 300,
    lineHeight: 1.0,
    color: 'oklch(18% 0.05 250)',
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid oklch(18% 0.05 250 / 12%)',
    paddingTop: '1.25rem',
  },
  scrollHint: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'oklch(18% 0.05 250 / 32%)',
  },
  disciplines: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'oklch(18% 0.05 250 / 32%)',
    textAlign: 'right',
    display: {
      default: 'block',
      '@media (max-width: 600px)': 'none',
    },
  },
})

const words = ["Engineer.", "Designer.", "Builder", "of", "things", "that", "move."]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease } },
}

export default function Hero() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 55, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 55, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <section
      {...stylex.props(styles.section)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.name)}>Marcel Olsen</span>
        <div {...stylex.props(styles.status)}>
          <motion.span
            {...stylex.props(styles.dot)}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          Available for work
        </div>
      </div>

      <div {...stylex.props(styles.headlineArea)}>
        <span {...stylex.props(styles.eyebrow)}>Portfolio · 2025</span>
        <motion.h1
          {...stylex.props(styles.headline)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ rotateX, rotateY }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <div {...stylex.props(styles.footerRow)}>
        <span {...stylex.props(styles.scrollHint)}>↓ Scroll</span>
        <span {...stylex.props(styles.disciplines)}>
          Frontend Engineering · Motion · Design Systems
        </span>
      </div>
    </section>
  )
}
