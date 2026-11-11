import { Plus, Sparkles } from 'lucide-react'
import type { Property, Role } from '../types'
import { roleData } from '../data/mock'
import PropertyStrip from './PropertyStrip'
import StatCard from './StatCard'
import RevenueCard from './RevenueCard'
import OccupancyCard from './OccupancyCard'
import ActivityFeed from './ActivityFeed'

export default function Dashboard({
  role,
  properties,
  onNavigate,
  onAddProperty,
  onViewDetails,
  loading,
  error,
  onRetry,
}: {
  role: Role
  properties: Property[]
  onNavigate: (page: string) => void
  onAddProperty: () => void
  onViewDetails: (property: Property) => void
  loading: boolean
  error: string
  onRetry: () => void
}) {
  const data = roleData[role]
  return (
    <>
      <section className="welcome">
        <div>
          <span className="eyebrow"><Sparkles size={14} />{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
        <button className="primary-button" onClick={onAddProperty}><Plus size={18} />Add property</button>
      </section>
      <section className="stats-grid">
        {data.stats.map((item, index) => <StatCard key={item[0]} item={item} index={index} />)}
      </section>
      <section className="analytics-grid"><RevenueCard /><OccupancyCard /></section>
      <PropertyStrip
        properties={properties}
        onViewAll={() => onNavigate('Properties')}
        onViewDetails={onViewDetails}
        loading={loading}
        error={error}
        onRetry={onRetry}
      />
      <ActivityFeed />
    </>
  )
}
