import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'
import { ease } from '../styles/tokens'

const styles = stylex.create({
  section: {
    backgroundColor: 'oklch(97% 0.015 85)',
    paddingTop: 'clamp(6rem, 12vw, 11rem)',
    paddingBottom: 'clamp(6rem, 12vw, 11rem)',
    paddingLeft: 'clamp(2rem, 7vw, 8rem)',
    paddingRight: 'clamp(2rem, 7vw, 8rem)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '10rem 1fr',
      '@media (max-width: 700px)': '1fr',
    },
    gap: 'clamp(3rem, 6vw, 6rem)',
    alignItems: 'start',
  },
  labelCol: {
    paddingTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'oklch(68% 0.24 40)',
    display: 'block',
  },
  indexNum: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(5rem, 10vw, 9rem)',
    fontWeight: 300,
    lineHeight: 0.85,
    color: 'oklch(18% 0.05 250 / 7%)',
    fontStyle: 'italic',
    display: 'block',
    userSelect: 'none',
    letterSpacing: '-0.03em',
  },
  quote: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
    fontWeight: 300,
    lineHeight: 1.45,
    color: 'oklch(18% 0.05 250)',
    fontStyle: 'italic',
    marginBottom: '2.5rem',
    letterSpacing: '-0.01em',
  },
  body: {
    fontFamily: '"DM Mono", monospace',
    fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
    lineHeight: 1.9,
    color: 'oklch(18% 0.05 250 / 50%)',
    maxWidth: '54ch',
  },
})

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: ease } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.labelCol)}>
          <span {...stylex.props(styles.label)}>About</span>
          <span {...stylex.props(styles.indexNum)}>01</span>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p {...stylex.props(styles.quote)} variants={itemVariants}>
            I build interfaces that feel as considered as they look — where motion
            is intentional, typography is architecture, and every interaction earns its place.
          </motion.p>
          <motion.p {...stylex.props(styles.body)} variants={itemVariants}>
            Currently at Asana, building experiences shipped to millions — from annual reports
            and award-winning microsites to design systems that scale. I work at the
            intersection of engineering and design, where precision meets a point of view.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
