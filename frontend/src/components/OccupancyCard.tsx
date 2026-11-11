export default function OccupancyCard() {
  return (
    <section className="occupancy-card glass-card">
      <div className="section-heading">
        <div><span className="section-kicker">Overview</span><h2>Occupancy</h2></div>
      </div>
      <div className="ring-wrap">
        <div className="ring"><div><strong>92%</strong><span>occupied</span></div></div>
      </div>
      <div className="occupancy-legend">
        <div><span className="legend-dot occupied" /><span>Occupied</span><strong>118</strong></div>
        <div><span className="legend-dot vacant" /><span>Vacant</span><strong>10</strong></div>
      </div>
    </section>
  )
}
