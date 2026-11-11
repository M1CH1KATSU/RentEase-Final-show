import { useState } from 'react'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'

export default function RevenueCard() {
  const [period, setPeriod] = useState('Last 6 months')
  const [periodOpen, setPeriodOpen] = useState(false)
  const periods = ['Last 6 months', 'Last 3 months', 'Last 1 month']

  return (
    <section className="revenue-card glass-card">
      <div className="section-heading">
        <div><span className="section-kicker">Performance</span><h2>Revenue overview</h2></div>
        <div className="period-wrap">
          <button
            type="button"
            className="period-button"
            aria-haspopup="menu"
            aria-expanded={periodOpen}
            onClick={() => setPeriodOpen((open) => !open)}
          >
            {period}<ChevronDown size={14} />
          </button>
          {periodOpen && (
            <div className="period-menu glass-panel" role="menu">
              {periods.map((option) => (
                <button
                  type="button"
                  role="menuitem"
                  key={option}
                  className={period === option ? 'selected' : ''}
                  onClick={() => {
                    setPeriod(option)
                    setPeriodOpen(false)
                  }}
                >
                  <span>{option}</span>
                  {period === option && <Check size={15} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="revenue-meta"><strong>1,20000 tk</strong><span><ArrowUpRight size={14} />14.2%</span></div>
      <div className="chart-wrap">
        <div className="chart-labels"><span>$50k</span><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div>
        <svg viewBox="0 0 650 180" preserveAspectRatio="none" aria-label="Revenue increased from November to April">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#176BFF" stopOpacity=".35" />
              <stop offset="100%" stopColor="#176BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="chart-grid" d="M0 15H650M0 48H650M0 81H650M0 114H650M0 147H650M0 179H650" />
          <path className="chart-area" d="M0 146 C50 139,60 113,110 116 S180 130,220 99 S290 70,330 90 S390 103,435 70 S505 82,540 50 S600 33,650 18 L650 180 L0 180Z" />
          <path className="chart-line" d="M0 146 C50 139,60 113,110 116 S180 130,220 99 S290 70,330 90 S390 103,435 70 S505 82,540 50 S600 33,650 18" />
          <circle cx="650" cy="18" r="5" className="chart-point" />
        </svg>
        <div className="chart-months"><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></div>
      </div>
    </section>
  )
}
