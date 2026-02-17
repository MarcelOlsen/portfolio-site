import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  wrapper: {
    padding: '0 clamp(2.5rem, 6vw, 7rem)',
  },
  line: {
    height: '1px',
    backgroundColor: 'oklch(18% 0.05 250 / 18%)',
    width: '100%',
    transformOrigin: 'left center',
  },
})

export default function SectionDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div {...stylex.props(styles.wrapper)}>
      <motion.div
        ref={ref}
        {...stylex.props(styles.line)}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
