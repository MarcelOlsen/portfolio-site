import { useRef } from 'react'
import { motion } from 'framer-motion'
import { motionSystem, useRevealInView } from '../../motion/system'
import ContactLink from './ContactLink'
import styles from './Contact.module.css'

// Split into parts so bots can't scrape complete addresses from source
const links = [
  { label: 'Email', parts: ['hi', 'marcelolsen', 'dev'], build: (p: string[]) => `mailto:${p[0]}@${p[1]}.${p[2]}`, display: (p: string[]) => `${p[0]}@${p[1]}.${p[2]}` },
  { label: 'LinkedIn', parts: ['linkedin.com', 'in', 'marcel-olsen'], build: (p: string[]) => `https://${p[0]}/${p[1]}/${p[2]}`, display: (p: string[]) => `/${p[1]}/${p[2]}` },
  { label: 'GitHub', parts: ['github.com', 'marcelolsen'], build: (p: string[]) => `https://${p[0]}/${p[1]}`, display: (p: string[]) => `/${p[1]}` },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useRevealInView(ref)

  return (
    <section className={styles.section} data-theme="dark">
      <div className={styles.topBar}>
        <span className={styles.label}>Contact</span>
        <span className={styles.index}>04</span>
      </div>

      <motion.div
        ref={ref}
        variants={motionSystem.stagger(0.12)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2 className={styles.headline} variants={motionSystem.fadeUp({ distance: 30, duration: 1.0 })}>
          Let's build<br />something.
        </motion.h2>

        <motion.div className={styles.linksGrid} variants={motionSystem.fadeUp({ distance: 30, duration: 1.0 })}>
          {links.map((link) => (
            <ContactLink key={link.label} {...link} />
          ))}
        </motion.div>
      </motion.div>

      <div className={styles.footer}>
        <span className={styles.footerText}>© 2026 Marcel Olsen</span>
        <span className={styles.footerText}>React · Framer Motion · CSS Modules</span>
      </div>
    </section>
  )
}
