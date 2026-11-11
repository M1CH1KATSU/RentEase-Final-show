import {
  Eye,
  FileText,
  Sparkles,
  Trash2,
} from 'lucide-react'
import type { Application } from '../types'
import { formatShortDate } from '../utils/format'

export default function ApplicationsPage({
  applications,
  loading,
  error,
  onRetry,
  onViewDetails,
  onEdit,
  onDelete,
}: {
  applications: Application[]
  loading: boolean
  error: string
  onRetry: () => void
  onViewDetails: (application: Application) => void
  onEdit: (application: Application) => void
  onDelete: (application: Application) => void
}) {
  return (
    <>
      <section className="page-title">
        <div>
          <span className="eyebrow"><Sparkles size={14} /></span>
          <h1>Rental applications</h1>
          <p>{applications.length} applications to review.</p>
        </div>
      </section>

      {loading && <div className="state-message">Loading applications…</div>}
      {!loading && error && (
        <div className="state-message state-error">
          {error}
          <button className="period-button" onClick={onRetry}>Retry</button>
        </div>
      )}
      {!loading && !error && applications.length === 0 && (
        <div className="state-message"><FileText size={18} />No applications yet.</div>
      )}
      {!loading && !error && applications.length > 0 && (
        <section className="app-table glass-card">
          <div className="app-header">
            <span>Applicant</span><span>Property</span><span className="app-phone">Phone</span><span className="app-date">Applied</span><span>Status</span><span>Actions</span>
          </div>
          {applications.map((application) => (
            <div className="app-row" key={application._id}>
              <div className="app-person">
                <div className="record-avatar">{application.applicant.name.charAt(0).toUpperCase()}</div>
                <div className="app-person-text">
                  <strong>{application.applicant.name}</strong>
                  <span>{application.applicant.email}</span>
                </div>
              </div>
              <span className="app-cell">{application.propertyTitle}</span>
              <span className="app-cell app-phone">{application.applicant.phone}</span>
              <span className="app-cell app-date">{formatShortDate(application.createdAt)}</span>
              <span><span className={`record-status ${application.status.toLowerCase()}`}>{application.status}</span></span>
              <div className="app-actions">
                <button className="row-action" title="View details" onClick={() => onViewDetails(application)}><Eye size={15} /></button>
                <button className="row-action" title="Edit" onClick={() => onEdit(application)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg></button>
                <button className="row-action danger" title="Delete" onClick={() => onDelete(application)}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  )
}
