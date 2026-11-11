import { CheckCircle2, Send, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { Property } from '../types'

export default function ApplyPropertyModal({
  property,
  onClose,
  onApply,
}: {
  property: Property
  onClose: () => void
  onApply: (payload: { applicant: { name: string; email: string; phone: string }; message?: string }) => void
}) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()

    if (!name || !email || !phone) return

    const applicant = { name, email, phone }
    setSaving(true)
    setError('')
    try {
      await onApply({ applicant, message: message || undefined })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application')
    } finally {
      setSaving(false)
    }
  }

  if (submitted) {
    return (
      <div className="re-modal-backdrop" onMouseDown={onClose}>
        <section
          className="re-modal re-narrow glass-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-success-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button type="button" className="icon-button re-close-corner" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <div className="re-success">
            <div className="re-success-icon"><CheckCircle2 size={26} /></div>
            <h2 id="apply-success-title">Application submitted</h2>
            <p>
              Your application for <strong>{property.title}</strong> was sent to the landlord.
              Currently it is <strong>Pending</strong> review.
            </p>
            <button type="button" className="primary-button" onClick={onClose}>Done</button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-property-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">RENTAL APPLICATION</span>
            <h2 id="apply-property-title">Apply for this property</h2>
            <p>{property.title}</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="re-form-grid">
            <label className="re-field">
              Full name <span>*</span>
              <input name="name" placeholder="e.g. Ayesha Rahman" required maxLength={80} autoFocus />
            </label>
            <label className="re-field">
              Email address <span>*</span>
              <input name="email" type="email" placeholder="name@example.com" required maxLength={120} />
            </label>
            <label className="re-field">
              Phone number <span>*</span>
              <input name="phone" placeholder="e.g. 01912345678" required maxLength={20} />
            </label>
          </div>

          <label className="re-field re-textarea">
            Message (optional)
            <textarea name="message" rows={3} placeholder="Introduce yourself to the landlord…" maxLength={400} />
          </label>

          {error && <p className="re-form-error">{error}</p>}

          <div className="re-modal-actions">
            <button type="button" className="filter-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              <Send size={17} />{saving ? 'Submitting…' : 'Submit application'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
