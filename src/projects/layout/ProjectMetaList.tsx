type MetaRow = {
  keyLabel: string
  value: string
}

type ProjectMetaListProps = {
  rows: MetaRow[]
  classNames: {
    group: string
    row: string
    key: string
    value: string
  }
}

export default function ProjectMetaList({ rows, classNames }: ProjectMetaListProps) {
  return (
    <div className={classNames.group}>
      {rows.map((row) => (
        <div className={classNames.row} key={row.keyLabel}>
          <span className={classNames.key}>{row.keyLabel}</span>
          <span className={classNames.value}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}
