import { ChevronRight, Pencil, Trash2, X } from 'lucide-react'
import type { Person, Property } from '../types'
import { formatLongDate, formatPrice, formatPricePeriod } from '../utils/format'

export default function PersonDetailsModal({
  person,
  onClose,
  onEdit,
  onDelete,
  onViewProperty,
}: {
  person: Person
  onClose: () => void
  onEdit: (person: Person) => void
  onDelete: (person: Person) => void
  onViewProperty: (property: Property) => void
}) {
  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="person-details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">PEOPLE & ACCESS</span>
            <h2 id="person-details-title">{person.name}</h2>
            <p>Role · {person.role}</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className="pd-cards pd-cards-top">
          <div className="pd-info-card">
            <span className="pd-kicker">Contact</span>
            <strong className="pd-landlord">{person.name}</strong>
            <span className="pd-info-line">{person.email || 'No email provided'}</span>
            <span className="pd-info-line">{person.phone}</span>
          </div>
          <div className="pd-info-card">
            <span className="pd-kicker">Activity</span>
            <span className="pd-info-line">Properties <strong>{person.properties.length}</strong></span>
            <span className="pd-info-line">Applications <strong>{person.applications.length}</strong></span>
            <span className="pd-info-line">Updated <strong>{formatLongDate(person.updatedAt)}</strong></span>
          </div>
        </div>

        <span className="pd-kicker">Owned properties ({person.properties.length})</span>
        {person.properties.length === 0 ? (
          <p className="app-message">None yet.</p>
        ) : (
          <div className="pd-list">
            {person.properties.map((property) => (
              <button type="button" className="pd-row" key={property._id} onClick={() => onViewProperty(property)}>
                <span className="pd-row-main"><strong>{property.title}</strong><small>{formatPrice(property)}{formatPricePeriod(property)} · {property.location.area}, {property.location.city}</small></span>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
        )}

        <span className="pd-kicker">Applications ({person.applications.length})</span>
        {person.applications.length === 0 ? (
          <p className="app-message">None yet.</p>
        ) : (
          <div className="pd-list">
            {person.applications.map((application) => (
              <div className="pd-row pd-row-static" key={application._id}>
                <span className="pd-row-main"><strong>{application.propertyTitle}</strong><small>{new Date(application.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small></span>
                <span className={`record-status ${application.status.toLowerCase()}`}>{application.status}</span>
              </div>
            ))}
          </div>
        )}

        <footer className="pd-actions">
          <button type="button" className="danger-button" onClick={() => onDelete(person)}>
            <Trash2 size={16} />Delete
          </button>
          <button type="button" className="secondary-button" onClick={() => onEdit(person)}>
            <Pencil size={16} />Edit person
          </button>
        </footer>
      </section>
    </div>
  )
}
