import { Menu } from 'lucide-react'
import { navItems } from '../data/mock'

export default function MobileNav({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  const items = navItems.slice(0, 4)
  return (
    <nav className="mobile-nav glass-panel">
      {items.map((item) => <button key={item.label} className={active === item.label ? 'active' : ''} onClick={() => onChange(item.label)}><item.icon size={20} /><span>{item.label}</span></button>)}
      <button onClick={() => onChange('Settings')}><Menu size={20} /><span>More</span></button>
    </nav>
  )
}
