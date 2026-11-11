import { Pencil, Trash2, X } from 'lucide-react'
import type { Application } from '../types'
import { formatLongDate, formatShortDate } from '../utils/format'

export default function ApplicationDetailsModal({
  application,
  onClose,
  onEdit,
  onDelete,
}: {
  application: Application
  onClose: () => void
  onEdit: (application: Application) => void
  onDelete: (application: Application) => void
}) {
  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">APPLICATION DETAILS</span>
            <h2 id="application-details-title">{application.propertyTitle}</h2>
            <p>Applicant · {application.applicant.name}</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className="pd-cards pd-cards-top">
          <div className="pd-info-card">
            <span className="pd-kicker">Applicant</span>
            <strong className="pd-landlord">{application.applicant.name}</strong>
            <span className="pd-info-line">{application.applicant.email}</span>
            <span className="pd-info-line">{application.applicant.phone}</span>
          </div>
          <div className="pd-info-card">
            <span className="pd-kicker">Status</span>
            <span className={`record-status ${application.status.toLowerCase()}`}>{application.status}</span>
            <span className="pd-info-line">Applied <strong>{formatShortDate(application.createdAt)}</strong></span>
            <span className="pd-info-line">Updated <strong>{formatLongDate(application.updatedAt)}</strong></span>
          </div>
        </div>

        <div className="pd-info-card" style={{ marginTop: 12 }}>
          <span className="pd-kicker">Message</span>
          <p className="app-message">{application.message || '—'}</p>
        </div>

        <footer className="pd-actions">
          <button type="button" className="danger-button" onClick={() => onDelete(application)}>
            <Trash2 size={16} />Delete
          </button>
          <button type="button" className="secondary-button" onClick={() => onEdit(application)}>
            <Pencil size={16} />Edit application
          </button>
        </footer>
      </section>
    </div>
  )
}
