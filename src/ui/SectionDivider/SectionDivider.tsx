import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SectionDivider.module.css'
import { DIVIDER_REVEAL_MARGIN } from '../../motion/system'

export default function SectionDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: DIVIDER_REVEAL_MARGIN })

  return (
    <div ref={ref} className={styles.wrapper}>
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
