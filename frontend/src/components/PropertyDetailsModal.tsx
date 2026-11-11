import {
  Bath,
  BedDouble,
  Building,
  Car,
  Check,
  Eye,
  Heart,
  MapPin,
  Ruler,
  Send,
  Trash2,
  X,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { Property } from '../types'
import { displayStatus, formatLongDate, formatPrice, formatPricePeriod, formatShortDate, statusClass } from '../utils/format'

function SpecTile({ value, label, icon: Icon }: { value: string | number; label: string; icon: ComponentType<{ size: number; strokeWidth?: number }> }) {
  return (
    <div className="pd-spec">
      <Icon size={15} strokeWidth={2} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function PropertyDetailsModal({
  property,
  onClose,
  onApply,
  onDelete,
}: {
  property: Property
  onClose: () => void
  onApply: (property: Property) => void
  onDelete: (property: Property) => void
}) {
  const specs = property.specifications
  const features = property.features
  const featureList: [string, boolean][] = [
    ['Pet friendly', features?.petFriendly ?? false],
    ['Air conditioning', features?.airConditioning ?? false],
    ['WiFi', features?.wifi ?? false],
    ['Attached bathroom', features?.attachedBathroom ?? false],
  ]
  const occupied = property.status.toLowerCase() === 'ocupied'

  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal pd-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header pd-header">
          <div>
            <span className="section-kicker">PROPERTY DETAILS</span>
            <h2 id="property-details-title">{property.title}</h2>
            <p className="pd-location"><MapPin size={13} />{property.location.address}, {property.location.area}, {property.location.city}, {property.location.country}</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className="pd-cover">
          <img src={property.images.cover} alt={`${property.title} cover`} />
          <span className={`status-pill ${statusClass(property.status)}`}>{displayStatus(property.status)}</span>
        </div>

        <div className="pd-meta">
          <div className="pd-price-block">
            <strong>{formatPrice(property)}</strong>
            <span>{formatPricePeriod(property)}</span>
            <em>{property.propertyType} · {property.furnished}</em>
          </div>
          {property.stats && (
            <div className="pd-stats">
              <span><Eye size={13} />{property.stats.views.toLocaleString('en-BD')} views</span>
              <span><Heart size={13} />{property.stats.favorites.toLocaleString('en-BD')} favorites</span>
            </div>
          )}
        </div>

        <p className="pd-desc">{property.description}</p>
        <p className="pd-updated">Listed {formatShortDate(property.createdAt)} · Updated {formatLongDate(property.updatedAt)}</p>

        <span className="pd-kicker">Specifications</span>
        <div className="pd-specs">
          <SpecTile icon={BedDouble} value={specs.bedrooms} label="bedrooms" />
          <SpecTile icon={Bath} value={specs.bathrooms} label="bathrooms" />
          <SpecTile icon={Ruler} value={`${specs.area.toLocaleString('en-BD')} ${specs.areaUnit}`} label="area" />
          <SpecTile icon={MapPin} value={specs.balconies} label="balconies" />
          <SpecTile icon={Building} value={`${specs.floor} / ${specs.totalFloors}`} label="floor" />
          <SpecTile icon={Car} value={specs.parkingSpaces} label="parking spaces" />
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <>
            <span className="pd-kicker">Amenities</span>
            <div className="pd-chips">
              {property.amenities.map((amenity) => (
                <span className="pd-chip" key={amenity}>{amenity}</span>
              ))}
            </div>
          </>
        )}

        <span className="pd-kicker">Features</span>
        <div className="pd-features">
          {featureList.map(([label, enabled]) => (
            <div className={`pd-feature ${enabled ? 'on' : 'off'}`} key={label}>
              {enabled ? <Check size={15} strokeWidth={2.4} /> : <X size={15} />}
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="pd-cards">
          <div className="pd-info-card">
            <span className="pd-kicker">Landlord</span>
            <strong className="pd-landlord">{property.landlord.name}</strong>
            <span className="pd-info-line">{property.landlord.phone}</span>
            {property.landlord.verified && <span className="pd-verified"><Check size={13} />Verified landlord</span>}
          </div>
          <div className="pd-info-card">
            <span className="pd-kicker">Availability</span>
            <span className="pd-info-line">Available from <strong>{formatShortDate(property.availability.availableFrom)}</strong></span>
            <span className="pd-info-line">Minimum stay <strong>{property.availability.minimumStay} months</strong></span>
          </div>
        </div>

        <footer className="pd-actions">
          <button type="button" className="danger-button" onClick={() => onDelete(property)}>
            <Trash2 size={16} />Delete property
          </button>
          <button
            type="button"
            className="primary-button"
            disabled={occupied}
            onClick={() => onApply(property)}
          >
            <Send size={16} />{occupied ? 'Not available' : 'Apply for this property'}
          </button>
        </footer>
      </section>
    </div>
  )
}
