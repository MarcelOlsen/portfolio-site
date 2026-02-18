import ProjectLayout from '../layout/ProjectLayout'
import ProjectMetaList from '../layout/ProjectMetaList'
import ExternalTextLink from '../../ui/ExternalTextLink/ExternalTextLink'
import Badge from '../../ui/Badge/Badge'
import layoutStyles from '../layout/ProjectLayout.module.css'
import styles from './MiniReact.module.css'

const metaRows = [
  { keyLabel: 'Role', value: 'Author' },
  { keyLabel: 'Stack', value: 'TypeScript · Bun · Biome' },
  { keyLabel: 'Type', value: 'Library · Side Project' },
]

export default function MiniReact() {
  return (
    <ProjectLayout
      theme="dark"
      topBarLeft={<span className={layoutStyles.indexLabel}>Selected Work — 03</span>}
      topBarRight={
        <div className={styles.topBarRight}>
          <Badge>Open Source</Badge>
          <span className={layoutStyles.year}>Ongoing</span>
        </div>
      }
      leftContent={
        <div className={styles.titleWrap}>
          <div className={styles.titleLead}>
            <span className={styles.title}>
              Mini-<br />React
            </span>
            <p className={styles.description}>
              A simplified React-like library built from scratch — virtual DOM,
              reconciliation, hooks, context, portals, and memoization. Currently being
              rewritten with a fiber-based architecture focused on scheduling and render
              consistency.
            </p>
          </div>
        </div>
      }
      rightContent={
        <div className={layoutStyles.rightCol}>
          <div className={layoutStyles.sectionMeta}>
            <span>Technology desk</span>
            <span>Independent publication</span>
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
            href="https://github.com/MarcelOlsen/mini-react"
            label="View on GitHub"
          />
        </div>
      }
    />
  )
}
