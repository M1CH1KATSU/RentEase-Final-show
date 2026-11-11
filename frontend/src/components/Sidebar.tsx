import { House, MoreHorizontal } from 'lucide-react'
import { navItems } from '../data/mock'
import AppIcon from './AppIcon'

export default function Sidebar({ active, onChange, applicationCount, peopleCount }: { active: string; onChange: (value: string) => void; applicationCount?: number; peopleCount?: number }) {
  return (
    <aside className="sidebar glass-panel">
      <div className="brand">
        <div className="brand-mark"><House size={21} strokeWidth={2.2} /></div>
        <span>RentEase</span>
      </div>
      <nav className="nav-list" aria-label="Primary navigation">
        <span className="nav-caption">Workspace</span>
        {navItems.map((item) => (
          <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => onChange(item.label)}>
            <AppIcon icon={item.icon} size={19} />
            <span>{item.label}</span>
            {item.label === 'Applications' && typeof applicationCount === 'number' && <span className="nav-count">{applicationCount}</span>}
            {item.label === 'People' && typeof peopleCount === 'number' && <span className="nav-count">{peopleCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="profile-tile">
          <div className="avatar">MK</div>
          <div><strong>Michikatsu</strong><span>admin.michikatsu@rentease.com</span></div>
          <MoreHorizontal size={18} />
        </div>
      </div>
    </aside>
  )
}
