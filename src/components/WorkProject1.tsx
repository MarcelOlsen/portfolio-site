import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'
import { ease } from '../styles/tokens'

const styles = stylex.create({
  section: {
    backgroundColor: 'oklch(18% 0.05 250)',
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
    borderBottom: '1px solid oklch(97% 0.015 85 / 12%)',
  },
  indexLabel: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'oklch(68% 0.24 40)',
  },
  awardBadge: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'oklch(68% 0.24 40)',
    border: '1px solid oklch(68% 0.24 40 / 40%)',
    paddingTop: '0.3rem',
    paddingBottom: '0.3rem',
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
  },
  year: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    color: 'oklch(97% 0.015 85 / 22%)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1.3fr 1fr',
      '@media (max-width: 768px)': '1fr',
    },
    gap: 'clamp(3rem, 7vw, 8rem)',
    alignItems: 'end',
  },
  titleWrap: {
    display: 'block',
  },
  title: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(3.5rem, 6vw, 7.5rem)',
    fontWeight: 300,
    lineHeight: 0.93,
    color: 'oklch(97% 0.015 85)',
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    display: 'block',
  },
  rightCol: {
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
    borderBottom: '1px solid oklch(97% 0.015 85 / 8%)',
  },
  metaKey: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'oklch(97% 0.015 85 / 25%)',
  },
  metaVal: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.02em',
    color: 'oklch(97% 0.015 85 / 60%)',
  },
  linkWrap: {
    position: 'relative',
    display: 'inline-block',
  },
  link: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.05em',
    color: 'oklch(68% 0.24 40)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  underline: {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    height: '1px',
    width: '100%',
    backgroundColor: 'oklch(68% 0.24 40)',
    transformOrigin: 'left center',
  },
})

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: ease } },
}
const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: ease, delay: 0.12 } },
}

export default function WorkProject1() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [linkHovered, setLinkHovered] = useState(false)

  return (
    <section ref={ref} {...stylex.props(styles.section)} data-theme="dark">
      <div {...stylex.props(styles.topBar)}>
        <span {...stylex.props(styles.indexLabel)}>Selected Work — 01</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span {...stylex.props(styles.awardBadge)}>Awwwards Honorable Mention</span>
          <span {...stylex.props(styles.year)}>2025</span>
        </div>
      </div>

      <div {...stylex.props(styles.grid)}>
        <motion.div
          {...stylex.props(styles.titleWrap)}
          variants={leftVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span
            {...stylex.props(styles.title)}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: ease }}
          >
            State of AI<br />at Work
          </motion.span>
        </motion.div>

        <motion.div
          {...stylex.props(styles.rightCol)}
          variants={rightVariants}
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
              <span {...stylex.props(styles.metaVal)}>React · GSAP · Lottie</span>
            </div>
            <div {...stylex.props(styles.metaRow)}>
              <span {...stylex.props(styles.metaKey)}>Type</span>
              <span {...stylex.props(styles.metaVal)}>Microsite · Asana</span>
            </div>
          </div>

          <div {...stylex.props(styles.linkWrap)}>
            <a
              href="https://asana.com/resources/state-of-ai-work"
              {...stylex.props(styles.link)}
              onMouseEnter={() => setLinkHovered(true)}
              onMouseLeave={() => setLinkHovered(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View site
              <motion.span
                style={{ display: 'inline-block' }}
                animate={{ x: linkHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </a>
            <motion.span
              {...stylex.props(styles.underline)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: linkHovered ? 1 : 0 }}
              transition={{ duration: 0.35, ease: ease }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
