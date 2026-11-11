import { Trash2, X } from 'lucide-react'
import type { ReactNode } from 'react'

export default function ConfirmDeleteModal({
  title,
  description,
  confirmLabel = 'Yes, delete',
  saving,
  error,
  onClose,
  onConfirm,
}: {
  title: string
  description: ReactNode
  confirmLabel?: string
  saving: boolean
  error: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal re-narrow glass-panel"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">CONFIRM DELETE</span>
            <h2 id="confirm-delete-title">{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <p className="cf-text">{description}</p>

        {error && <p className="re-form-error">{error}</p>}

        <div className="re-modal-actions">
          <button type="button" className="filter-button" onClick={onClose}>Cancel</button>
          <button type="button" className="danger-button" disabled={saving} onClick={onConfirm}>
            <Trash2 size={16} />{saving ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
