import { useState } from 'react'
import { motion } from 'framer-motion'
import { motionSystem } from '../../motion/system'
import styles from './ExternalTextLink.module.css'

type ExternalTextLinkProps = {
  href: string
  label: string
}

export default function ExternalTextLink({ href, label }: ExternalTextLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className={styles.wrap}>
      <a
        href={href}
        className={styles.link}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        <motion.span
          style={{ display: 'inline-block' }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={motionSystem.arrowNudge}
        >
          →
        </motion.span>
      </a>
      <motion.span
        className={styles.underline}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={motionSystem.underline}
      />
    </div>
  )
}
