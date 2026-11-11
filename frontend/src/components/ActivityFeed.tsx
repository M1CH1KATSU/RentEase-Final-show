import { activities } from '../data/mock'

export default function ActivityFeed() {
  return (
    <section className="activity-card glass-card">
      <div className="section-heading">
        <div><span className="section-kicker">Live updates</span><h2>Recent activity</h2></div>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.title}>
            <div className={`activity-icon ${activity.tone}`}><activity.icon size={17} /></div>
            <div><strong>{activity.title}</strong><span>{activity.detail}</span></div>
            <time>{activity.time}</time>
          </div>
        ))}
      </div>
    </section>
  )
}
