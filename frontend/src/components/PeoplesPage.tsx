import {
  Eye,
  Pencil,
  Users,
} from 'lucide-react'
import { Trash2 } from 'lucide-react'
import type { Person } from '../types'
import { formatShortDate } from '../utils/format'

export default function PeoplesPage({
  peoples,
  loading,
  error,
  onRetry,
  onViewDetails,
  onEdit,
  onDelete,
}: {
  peoples: Person[]
  loading: boolean
  error: string
  onRetry: () => void
  onViewDetails: (person: Person) => void
  onEdit: (person: Person) => void
  onDelete: (person: Person) => void
}) {
  return (
    <>
      <section className="page-title">
        <div>
          <span className="eyebrow"><Users size={14} /></span>
          <h1>People & access</h1>
          <p>{peoples.length} landlords and tenants in your workspace.</p>
        </div>
      </section>

      {loading && <div className="state-message">Loading people…</div>}
      {!loading && error && (
        <div className="state-message state-error">
          {error}
          <button className="period-button" onClick={onRetry}>Retry</button>
        </div>
      )}
      {!loading && !error && peoples.length === 0 && (
        <div className="state-message"><Users size={18} />No people yet.</div>
      )}
      {!loading && !error && peoples.length > 0 && (
        <section className="app-table people-table glass-card">
          <div className="app-header">
            <span>Person</span><span>Role</span><span>Phone</span><span className="people-joined">Joined</span><span>Properties</span><span>Applications</span><span>Actions</span>
          </div>
          {peoples.map((person) => (
            <div className="app-row" key={person._id}>
              <div className="app-person">
                <div className="record-avatar">{person.name.charAt(0).toUpperCase()}</div>
                <div className="app-person-text">
                  <strong>{person.name}</strong>
                  <span>{person.email || person.phone}</span>
                </div>
              </div>
              <span><span className={`record-status ${person.role.toLowerCase()}`}>{person.role}</span></span>
              <span className="app-cell">{person.phone}</span>
              <span className="app-cell app-date people-joined">{formatShortDate(person.createdAt)}</span>
              <span className="app-cell">{person.properties.length}</span>
              <span className="app-cell">{person.applications.length}</span>
              <div className="app-actions">
                <button className="row-action" title="View details" onClick={() => onViewDetails(person)}><Eye size={15} /></button>
                <button className="row-action" title="Edit" onClick={() => onEdit(person)}><Pencil size={15} /></button>
                <button className="row-action danger" title="Delete" onClick={() => onDelete(person)}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  )
}
