import { Building2, Plus, Sparkles } from 'lucide-react'
import type { Property } from '../types'
import PropertyCard from './PropertyCard'

export default function PropertiesPage({
  properties,
  loading,
  error,
  onRetry,
  onAddProperty,
  onViewDetails,
}: {
  properties: Property[]
  loading: boolean
  error: string
  onRetry: () => void
  onAddProperty: () => void
  onViewDetails: (property: Property) => void
}) {
  return (
    <>
      <section className="page-title">
        <div>
          <span className="eyebrow"><Building2 size={14} /></span>
          <h1>Properties</h1>
          <p>{properties.length} properties in your portfolio.</p>
        </div>
        <button className="primary-button" onClick={onAddProperty}>
          <Plus size={18} />Add property
        </button>
      </section>

      {loading && <div className="state-message">Loading properties…</div>}
      {!loading && error && (
        <div className="state-message state-error">
          {error}
          <button className="period-button" onClick={onRetry}>Retry</button>
        </div>
      )}
      {!loading && !error && properties.length === 0 && (
        <div className="state-message"><Sparkles size={18} />No properties yet — add your first one.</div>
      )}
      {!loading && !error && properties.length > 0 && (
        <div className="property-grid large-grid">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </>
  )
}
