import { Pencil, X } from 'lucide-react'
import { type FormEvent } from 'react'
import type { Application, ApplicationStatus } from '../types'

export interface ApplicationEditInput {
  status: ApplicationStatus
  applicant: {
    name: string
    email: string
    phone: string
  }
  message: string | null
}

const STATUSES: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected']

export default function EditApplicationModal({
  application,
  saving,
  error,
  onClose,
  onSave,
}: {
  application: Application
  saving: boolean
  error: string
  onClose: () => void
  onSave: (application: Application, payload: ApplicationEditInput) => void
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = (key: string) => String(form.get(key) ?? '').trim()

    const status = text('status') as ApplicationStatus
    const applicant = {
      name: text('name'),
      email: text('email'),
      phone: text('phone'),
    }
    const message = text('message') || null

    if (!applicant.name || !applicant.email || !applicant.phone) return

    onSave(application, { status, applicant, message })
  }

  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-application-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">EDIT APPLICATION</span>
            <h2 id="edit-application-title">{application.propertyTitle}</h2>
            <p>Update application status or applicant details.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <span className="re-group-kicker">Status</span>
          <div className="re-form-grid">
            <label className="re-field">
              Application status <span>*</span>
              <select name="status" defaultValue={application.status} required>
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
          </div>

          <span className="re-group-kicker">Applicant</span>
          <div className="re-form-grid">
            <label className="re-field">
              Full name <span>*</span>
              <input name="name" defaultValue={application.applicant.name} required maxLength={80} autoFocus />
            </label>
            <label className="re-field">
              Email address <span>*</span>
              <input name="email" type="email" defaultValue={application.applicant.email} required maxLength={120} />
            </label>
            <label className="re-field">
              Phone number <span>*</span>
              <input name="phone" defaultValue={application.applicant.phone} required maxLength={20} />
            </label>
          </div>

          <span className="re-group-kicker">Message</span>
          <label className="re-field re-textarea">
            Message (optional)
            <textarea name="message" rows={3} defaultValue={application.message ?? ''} placeholder="Notes for the landlord…" maxLength={400} />
          </label>

          {error && <p className="re-form-error">{error}</p>}

          <div className="re-modal-actions">
            <button type="button" className="filter-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              <Pencil size={17} />{saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
