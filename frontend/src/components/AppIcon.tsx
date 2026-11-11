import type { Icon } from '../types'

export default function AppIcon({ icon: IconComponent, size = 20 }: { icon: Icon; size?: number }) {
  return <IconComponent size={size} strokeWidth={1.9} />
}
