import ProjectLayout from '../layout/ProjectLayout'
import ProjectMetaList from '../layout/ProjectMetaList'
import ExternalTextLink from '../../ui/ExternalTextLink/ExternalTextLink'
import layoutStyles from '../layout/ProjectLayout.module.css'
import styles from './StateOfAi.module.css'

const metaRows = [
  { keyLabel: 'Role', value: 'Creative Technologist' },
  { keyLabel: 'Stack', value: 'React · Framer Motion · SCSS Modules' },
  { keyLabel: 'Type', value: 'Microsite · Asana' },
]

export default function StateOfAi() {
  return (
    <ProjectLayout
      theme="dark"
      topBarLeft={<span className={layoutStyles.indexLabel}>Selected Work — 01</span>}
      topBarRight={<span className={layoutStyles.year}>2025</span>}
      leftContent={
        <div className={styles.titleWrap}>
          <div className={styles.titleLead}>
            <span className={styles.title}>
              State of AI<br />at Work
            </span>
            <p className={styles.dek}>
              Interactive report for Asana's AI-at-work research, with long-form storytelling
              designed to stay fast and readable. Built to handle dense content without losing
              pacing or visual clarity.
            </p>
          </div>
          <a
            href="https://www.awwwards.com/sites/the-state-of-ai-at-work"
            className={styles.awardCallout}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.awardIcon}>★</span>
            <div className={styles.awardText}>
              <span className={styles.awardTitle}>Awwwards</span>
              <span className={styles.awardSubtitle}>Honorable Mention</span>
            </div>
          </a>
        </div>
      }
      rightContent={
        <div className={layoutStyles.rightCol}>
          <div className={layoutStyles.sectionMeta}>
            <span>Front page feature</span>
            <span>Edition 2025</span>
          </div>
          <ProjectMetaList
            rows={metaRows}
            classNames={{
              group: layoutStyles.metaGroup,
              row: layoutStyles.metaRow,
              key: layoutStyles.metaKey,
              value: layoutStyles.metaVal,
            }}
          />
          <ExternalTextLink
            href="https://asana.com/resources/state-of-ai-work"
            label="View site"
          />
        </div>
      }
    />
  )
}
