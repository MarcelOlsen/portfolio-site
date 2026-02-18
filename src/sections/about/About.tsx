import { useRef } from 'react'
import { motion } from 'framer-motion'
import { motionSystem, useRevealInView } from '../../motion/system'
import styles from './About.module.css'

export default function About() {
  const ref = useRef(null)
  const inView = useRevealInView(ref)

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.labelCol}>
          <span className={styles.label}>About</span>
          <span className={styles.indexNum}>01</span>
        </div>

        <div className={styles.rule} />

        <motion.div
          ref={ref}
          variants={motionSystem.stagger(0.18)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className={styles.copyMeta} variants={motionSystem.fadeUp({ duration: 1.0 })}>
            <span>Feature</span>
            <span>Desk: Frontend</span>
            <span>By Marcel Olsen</span>
          </motion.div>
          <motion.p className={styles.quote} variants={motionSystem.fadeUp({ duration: 1.0 })}>
            I build the interactive layer where design meets engineering — focusing on
            high-fidelity motion and performance that never flinches.
          </motion.p>
          <motion.div className={styles.bodyColumns} variants={motionSystem.fadeUp({ duration: 1.0 })}>
            <p className={styles.bodyLead}>
              Currently a Creative Technologist @ Asana, shipping work for millions — from
              award-winning microsites to the design systems that scale them.
            </p>
            <p className={styles.body}>
              I specialize in bridging design intent with technical rigor, shaping interfaces
              where motion, hierarchy, and performance all work in concert to build pages
              people remember.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
