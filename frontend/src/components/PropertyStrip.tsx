import { ArrowRight } from 'lucide-react'
import type { Property } from '../types'
import PropertyCard from './PropertyCard'

export default function PropertyStrip({
  properties,
  onViewAll,
  onViewDetails,
  loading,
  error,
  onRetry,
}: {
  properties: Property[]
  onViewAll: () => void
  onViewDetails: (property: Property) => void
  loading: boolean
  error: string
  onRetry: () => void
}) {
  return (
    <section className="property-section">
      <div className="section-heading property-heading">
        <div><span className="section-kicker">Our services</span><h2>Featured properties</h2></div>
        <button className="text-button" onClick={onViewAll}>View all<ArrowRight size={16} /></button>
      </div>
      {loading && <div className="state-message">Loading properties…</div>}
      {!loading && error && (
        <div className="state-message state-error">
          {error}
          <button className="period-button" onClick={onRetry}>Retry</button>
        </div>
      )}
      {!loading && !error && (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </section>
  )
}
