import { MapPin } from 'lucide-react'
import type { Property } from '../types'
import { displayStatus, formatPrice, formatPricePeriod, statusClass } from '../utils/format'

export default function PropertyCard({
  property,
  onViewDetails,
}: {
  property: Property
  onViewDetails: (property: Property) => void
}) {
  const { specifications: specs, location } = property
  return (
    <article className="property-card glass-card">
      <div className="property-image">
        <img src={property.images.cover} alt={`${property.title} interior`} />
        <span className={`status-pill ${statusClass(property.status)}`}>{displayStatus(property.status)}</span>
      </div>
      <div className="property-content">
        <div>
          <h3>{property.title}</h3>
          <strong>{formatPrice(property)}<small>{formatPricePeriod(property)}</small></strong>
        </div>
        <p><MapPin size={14} />{location.area}, {location.city}</p>
        <span>{specs.bedrooms} beds · {specs.bathrooms} baths · {specs.area.toLocaleString('en-BD')} {specs.areaUnit}</span>
        <button className="card-details-button" onClick={() => onViewDetails(property)}>View details</button>
      </div>
    </article>
  )
}
