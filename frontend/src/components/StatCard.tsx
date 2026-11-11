import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import type { Icon } from '../types'

export default function StatCard({ item, index }: { item: [string, string, string, Icon]; index: number }) {
  const [label, value, delta, IconComponent] = item
  return (
    <article className="stat-card glass-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="stat-head"><span>{label}</span><div className="stat-icon"><IconComponent size={19} /></div></div>
      <strong className="stat-value">{value}</strong>
      <div className={`stat-delta ${delta.includes('-') || delta.includes('urgent') ? 'warning' : ''}`}>
        {delta.includes('-') ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        <span>{delta}</span><em>from last month</em>
      </div>
    </article>
  )
}
