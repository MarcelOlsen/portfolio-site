import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { motionSystem } from '../../motion/system'

type ProjectTopBarProps = {
  className: string
  inView: boolean
  left: ReactNode
  right: ReactNode
}

export default function ProjectTopBar({ className, inView, left, right }: ProjectTopBarProps) {
  return (
    <motion.div
      className={className}
      variants={motionSystem.fadeUp({ distance: 20, duration: 0.9 })}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {left}
      {right}
    </motion.div>
  )
}
