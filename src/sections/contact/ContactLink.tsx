import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { motionSystem } from '../../motion/system'
import styles from './Contact.module.css'

type ContactLinkProps = {
  label: string
  parts: string[]
  build: (p: string[]) => string
  display: (p: string[]) => string
}

export default function ContactLink({ label, parts, build, display }: ContactLinkProps) {
  const [hovered, setHovered] = useState(false)
  const text = useMemo(() => display(parts), [parts, display])
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open(build(parts), '_blank', 'noopener,noreferrer')
  }, [parts, build])

  return (
    <div className={styles.linkItem}>
      <span className={styles.linkLabel}>{label}</span>
      <div className={styles.linkWrap}>
        <motion.a
          href="#"
          className={styles.linkAnchor}
          onClick={handleClick}
          animate={{ color: hovered ? 'var(--color-rust)' : 'var(--color-bg-55)' }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {text}
        </motion.a>
        <motion.span
          className={styles.underline}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={motionSystem.underline}
        />
      </div>
    </div>
  )
}
