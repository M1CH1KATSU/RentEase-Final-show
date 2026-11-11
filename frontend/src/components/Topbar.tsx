import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { Role } from '../types'

export default function Topbar({ role, setRole, onMenu }: { role: Role; setRole: (role: Role) => void; onMenu: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
      <div className="topbar-actions">
        <div className="role-wrap">
          <button className="role-switcher" onClick={() => setOpen(!open)}>
            <span className="live-dot" />{role}<ChevronDown size={15} />
          </button>
          {open && (
            <div className="role-menu glass-panel">
              {(['Admin', 'Landlord', 'Tenant'] as Role[]).map((item) => (
                <button key={item} onClick={() => { setRole(item); setOpen(false) }}>
                  <span>{item}</span>{role === item && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
