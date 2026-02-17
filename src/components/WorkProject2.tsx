import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'
import { ease } from '../styles/tokens'

const styles = stylex.create({
  section: {
    backgroundColor: 'oklch(97% 0.015 85)',
    paddingTop: 'clamp(5rem, 10vw, 9rem)',
    paddingBottom: 'clamp(5rem, 10vw, 9rem)',
    paddingLeft: 'clamp(2rem, 7vw, 8rem)',
    paddingRight: 'clamp(2rem, 7vw, 8rem)',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1.5rem',
    marginBottom: 'clamp(3rem, 6vw, 6rem)',
    borderBottom: '1px solid oklch(18% 0.05 250 / 10%)',
  },
  indexLabel: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'oklch(68% 0.24 40)',
  },
  year: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    color: 'oklch(18% 0.05 250 / 22%)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr 1.3fr',
      '@media (max-width: 768px)': '1fr',
    },
    gap: 'clamp(3rem, 7vw, 8rem)',
    alignItems: 'end',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    paddingBottom: '0.25rem',
  },
  metaGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  metaRow: {
    display: 'grid',
    gridTemplateColumns: '4rem 1fr',
    gap: '1.25rem',
    alignItems: 'baseline',
    paddingTop: '0.7rem',
    paddingBottom: '0.7rem',
    borderBottom: '1px solid oklch(18% 0.05 250 / 8%)',
  },
  metaKey: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'oklch(18% 0.05 250 / 25%)',
  },
  metaVal: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.02em',
    color: 'oklch(18% 0.05 250 / 55%)',
  },
  title: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(3.5rem, 6vw, 7.5rem)',
    fontWeight: 300,
    lineHeight: 0.93,
    color: 'oklch(18% 0.05 250)',
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    display: 'block',
    marginBottom: '2.5rem',
  },
  videoBg: {
    width: '100%',
    aspectRatio: '16 / 10',
    backgroundColor: 'oklch(18% 0.05 250 / 4%)',
    border: '1px solid oklch(18% 0.05 250 / 8%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLabel: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.6rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'oklch(18% 0.05 250 / 22%)',
  },
})

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: ease, delay: 0.1 } },
}
const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: ease } },
}

export default function WorkProject2() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.topBar)}>
        <span {...stylex.props(styles.indexLabel)}>Selected Work — 02</span>
        <span {...stylex.props(styles.year)}>2024</span>
      </div>

      <div {...stylex.props(styles.grid)}>
        <motion.div
          {...stylex.props(styles.leftCol)}
          variants={leftVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div {...stylex.props(styles.metaGroup)}>
            <div {...stylex.props(styles.metaRow)}>
              <span {...stylex.props(styles.metaKey)}>Role</span>
              <span {...stylex.props(styles.metaVal)}>Frontend Engineer</span>
            </div>
            <div {...stylex.props(styles.metaRow)}>
              <span {...stylex.props(styles.metaKey)}>Stack</span>
              <span {...stylex.props(styles.metaVal)}>React · Three.js · GSAP</span>
            </div>
            <div {...stylex.props(styles.metaRow)}>
              <span {...stylex.props(styles.metaKey)}>Type</span>
              <span {...stylex.props(styles.metaVal)}>Interactive · Asana</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span
            {...stylex.props(styles.title)}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: ease }}
          >
            Asana<br />Year in<br />Review
          </motion.span>
          <div {...stylex.props(styles.videoBg)}>
            <span {...stylex.props(styles.videoLabel)}>Project video</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
