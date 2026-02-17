import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'
import { ease } from '../styles/tokens'

const styles = stylex.create({
  section: {
    backgroundColor: 'oklch(18% 0.05 250)',
    paddingTop: 'clamp(6rem, 12vw, 11rem)',
    paddingBottom: 'clamp(6rem, 12vw, 11rem)',
    paddingLeft: 'clamp(2rem, 7vw, 8rem)',
    paddingRight: 'clamp(2rem, 7vw, 8rem)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '70vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1.5rem',
    marginBottom: 'clamp(4rem, 8vw, 8rem)',
    borderBottom: '1px solid oklch(97% 0.015 85 / 10%)',
  },
  label: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'oklch(68% 0.24 40)',
  },
  index: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    color: 'oklch(97% 0.015 85 / 22%)',
  },
  headline: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)',
    fontWeight: 300,
    lineHeight: 0.93,
    color: 'oklch(97% 0.015 85)',
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    marginBottom: 'clamp(4rem, 8vw, 8rem)',
  },
  linksGrid: {
    display: 'flex',
    flexDirection: {
      default: 'row',
      '@media (max-width: 600px)': 'column',
    },
    gap: {
      default: '4rem',
      '@media (max-width: 600px)': '2.5rem',
    },
    borderTop: '1px solid oklch(97% 0.015 85 / 10%)',
    paddingTop: '2rem',
  },
  linkItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  linkLabel: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'oklch(97% 0.015 85 / 22%)',
  },
  linkWrap: {
    position: 'relative',
    display: 'inline-block',
  },
  linkAnchor: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.8rem',
    letterSpacing: '0.03em',
    textDecoration: 'none',
    display: 'inline-block',
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
  footer: {
    marginTop: 'auto',
    paddingTop: 'clamp(5rem, 10vw, 7rem)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerText: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'oklch(97% 0.015 85 / 18%)',
  },
})

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: ease } },
}

function ContactLink({ href, label, text }: { href: string; label: string; text: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div {...stylex.props(styles.linkItem)}>
      <span {...stylex.props(styles.linkLabel)}>{label}</span>
      <div {...stylex.props(styles.linkWrap)}>
        <motion.a
          href={href}
          {...stylex.props(styles.linkAnchor)}
          animate={{ color: hovered ? 'oklch(68% 0.24 40)' : 'oklch(97% 0.015 85 / 55%)' }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {text}
        </motion.a>
        <motion.span
          {...stylex.props(styles.underline)}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.38, ease: ease }}
        />
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section {...stylex.props(styles.section)} data-theme="dark">
      <div {...stylex.props(styles.topBar)}>
        <span {...stylex.props(styles.label)}>Contact</span>
        <span {...stylex.props(styles.index)}>03</span>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2 {...stylex.props(styles.headline)} variants={itemVariants}>
          Let's build<br />something.
        </motion.h2>

        <motion.div {...stylex.props(styles.linksGrid)} variants={itemVariants}>
          <ContactLink href="mailto:hello@marcelolsen.com" label="Email" text="hello@marcelolsen.com" />
          <ContactLink href="https://linkedin.com/in/marcelolsen" label="LinkedIn" text="/in/marcelolsen" />
          <ContactLink href="https://github.com/marcelolsen" label="GitHub" text="/marcelolsen" />
        </motion.div>
      </motion.div>

      <div {...stylex.props(styles.footer)}>
        <span {...stylex.props(styles.footerText)}>© 2026 Marcel Olsen</span>
        <span {...stylex.props(styles.footerText)}>React · Framer Motion · StyleX</span>
      </div>
    </section>
  )
}
