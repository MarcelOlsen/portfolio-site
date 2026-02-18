import { useRef } from 'react'
import { motion } from 'framer-motion'
import ProjectLayout from '../layout/ProjectLayout'
import ProjectMetaList from '../layout/ProjectMetaList'
import { useVideoPlayer } from './useVideoPlayer'
import { motionSystem, useRevealInView } from '../../motion/system'
import layoutStyles from '../layout/ProjectLayout.module.css'
import styles from './YearInReview.module.css'

const metaRows = [
  { keyLabel: 'Role', value: 'Creative Technologist' },
  { keyLabel: 'Stack', value: 'React · Framer Motion · SCSS Modules · Custom 2D Physics' },
  { keyLabel: 'Type', value: 'Interactive · Asana' },
]

export default function YearInReview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useRevealInView(ref)
  const { videoRef, videoReady, muted, barLevels, handleCanPlay, toggleMute } = useVideoPlayer(inView)

  return (
    <ProjectLayout
      sectionRef={ref}
      inView={inView}
      gridColumns="1fr 1px 1.3fr"
      leftDelay={0.1}
      rightDelay={0}
      topBarLeft={<span className={layoutStyles.indexLabel}>Selected Work — 02</span>}
      topBarRight={<span className={layoutStyles.year}>2025</span>}
      leftContent={
        <div className={styles.leftCol}>
          <ProjectMetaList
            rows={metaRows}
            classNames={{
              group: layoutStyles.metaGroup,
              row: layoutStyles.metaRow,
              key: layoutStyles.metaKey,
              value: layoutStyles.metaVal,
            }}
          />
        </div>
      }
      rightContent={
        <div className={styles.titleCol}>
          <div className={styles.titleLead}>
            <span className={styles.title}>
              Asana<br />Year in<br />Review
            </span>
            <p className={styles.dek}>
              Personalized annual recap for Asana users across a 12-slide, reels-like
              experience with themed color transitions between sections. Built the motion
              system end-to-end: custom 2D physics, choreographed character animation,
              interactive parallax, animated data visuals, and reduced-motion fallbacks.
            </p>
          </div>
        </div>
      }
      bottomContent={
        <motion.div
          className={styles.videoBg}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.1, ease: motionSystem.easing, delay: 0.2 }}
          onClick={toggleMute}
        >
          <video
            ref={videoRef}
            className={`${styles.video} ${videoReady ? styles.videoVisible : ''}`}
            src="/videos/yir-award.mp4"
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={handleCanPlay}
          />
          <motion.div
            className={styles.soundHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <span className={styles.soundHintText}>
              {muted ? 'Click for sound' : 'Sound on'}
            </span>
            <span className={styles.soundBars}>
              {barLevels.map((level, i) => (
                <span
                  key={i}
                  className={styles.soundBar}
                  style={{ transform: `scaleY(${level})` }}
                />
              ))}
            </span>
          </motion.div>
        </motion.div>
      }
    />
  )
}
