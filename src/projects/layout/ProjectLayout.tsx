import { useRef, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'
import { motionSystem, useRevealInView } from '../../motion/system'
import ProjectTopBar from './ProjectTopBar'
import styles from './ProjectLayout.module.css'

type ProjectLayoutProps = {
  theme?: 'dark' | 'light'
  topBarLeft: ReactNode
  topBarRight: ReactNode
  leftContent: ReactNode
  rightContent: ReactNode
  bottomContent?: ReactNode
  gridColumns?: string
  leftClassName?: string
  rightClassName?: string
  leftDelay?: number
  rightDelay?: number
  sectionRef?: RefObject<HTMLElement | null>
  inView?: boolean
}

export default function ProjectLayout({
  theme,
  topBarLeft,
  topBarRight,
  leftContent,
  rightContent,
  bottomContent,
  gridColumns = '1.3fr 1px 1fr',
  leftClassName,
  rightClassName,
  leftDelay = 0,
  rightDelay = 0.12,
  sectionRef,
  inView: inViewProp,
}: ProjectLayoutProps) {
  const internalRef = useRef<HTMLElement>(null)
  const ref = sectionRef ?? internalRef
  const internalInView = useRevealInView(ref)
  const inView = inViewProp ?? internalInView

  return (
    <section ref={ref} className={styles.section} data-theme={theme}>
      <ProjectTopBar
        className={styles.topBar}
        inView={inView}
        left={topBarLeft}
        right={topBarRight}
      />

      <div
        className={styles.grid}
        style={{ gridTemplateColumns: gridColumns }}
      >
        <motion.div
          className={leftClassName}
          variants={motionSystem.fadeLeft({ distance: 50, duration: 1.1, delay: leftDelay })}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {leftContent}
        </motion.div>

        <div className={styles.rule} />

        <motion.div
          className={rightClassName}
          variants={motionSystem.fadeRight({ distance: 50, duration: 1.1, delay: rightDelay })}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {rightContent}
        </motion.div>
      </div>

      {bottomContent}
    </section>
  )
}
