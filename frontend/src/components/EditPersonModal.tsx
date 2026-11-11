import { Pencil, X } from 'lucide-react'
import { type FormEvent } from 'react'
import type { Person, PersonUpdate } from '../types'

export default function EditPersonModal({
  person,
  saving,
  error,
  onClose,
  onSave,
}: {
  person: Person
  saving: boolean
  error: string
  onClose: () => void
  onSave: (person: Person, payload: PersonUpdate) => void
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const role = String(form.get('role') ?? person.role)

    if (!name || !phone) return

    const payload: PersonUpdate = { name, phone, role }
    if (email || person.email) {
      payload.email = email || null
    }

    onSave(person, payload)
  }

  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal re-narrow glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-person-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">PEOPLE & ACCESS</span>
            <h2 id="edit-person-title">Edit person</h2>
            <p>Update contact details or role.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="re-form-grid">
            <label className="re-field">
              Full name <span>*</span>
              <input name="name" defaultValue={person.name} required maxLength={80} autoFocus />
            </label>
            <label className="re-field">
              Phone number <span>*</span>
              <input name="phone" defaultValue={person.phone} required maxLength={20} />
            </label>
            <label className="re-field">
              Email address
              <input name="email" type="email" defaultValue={person.email ?? ''} placeholder="name@example.com" maxLength={120} />
            </label>
            <label className="re-field">
              Role <span>*</span>
              <select name="role" defaultValue={person.role} required>
                <option value="Landlord">Landlord</option>
                <option value="Tenant">Tenant</option>
              </select>
            </label>
          </div>

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
