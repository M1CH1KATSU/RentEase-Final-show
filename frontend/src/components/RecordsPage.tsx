import { ChevronRight, Sparkles } from 'lucide-react'
import { records } from '../data/mock'

export default function RecordsPage({
  page,
}: {
  page: string
}) {
  const data = records[page] || records.People
  const rows = data.rows

  return (
    <>
      <section className="page-title">
        <div><span className="eyebrow"><Sparkles size={14} />RentEase workspace</span><h1>{data.title}</h1><p>{data.subtitle}</p></div>
      </section>
      <section className="records-card glass-card">
        <div className="records-list">
          {rows.map((row, index) => (
            <div className="record-row" key={`${row[0]}-${index}`}>
              <div className="record-avatar">{row[0].charAt(0).toUpperCase()}</div>
              <div className="record-main"><strong>{row[0]}</strong><span>{row[1]}</span></div>
              <span className="record-date">{row[2]}</span>
              <span className={`record-status ${row[3].toLowerCase().replace(' ', '-')}`}>{row[3]}</span>
              <ChevronRight size={17} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
