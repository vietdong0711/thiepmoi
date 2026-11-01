import { Flower } from './Decor.jsx'
import { timeline } from '../data.js'

export default function Timeline() {
  return (
    <section className="paper-section timeline-section">
      <Flower
        className="timeline-flower"
        mirrored
        style={{ animationDelay: '0.7s' }}
      />

      <div className="paper-card timeline-card">
        <img
          src="/images/themes/minimalism-brown/paper.webp"
          alt=""
          aria-hidden="true"
          className="paper-texture"
        />
        <div className="paper-content timeline-content">
          <h2 className="paper-title timeline-title">Lịch trình ngày cưới</h2>

          <ol className="timeline">
            {timeline.map((item, i) => {
              const first = i === 0
              const last = i === timeline.length - 1
              return (
                <li className="timeline-item" key={item.time}>
                  <span className="timeline-time-cell">
                    {item.icon ? (
                      <img
                        src={`/images/themes/minimalism-brown/${item.icon}.webp`}
                        alt=""
                        aria-hidden="true"
                        className="timeline-icon"
                      />
                    ) : null}
                    <span className="timeline-time">{item.time}</span>
                  </span>

                  <span className="timeline-rail">
                    {!first ? <i className="timeline-line timeline-line-up" /> : null}
                    {!last ? <i className="timeline-line timeline-line-down" /> : null}
                    <i className="timeline-dot" />
                  </span>

                  <span className="timeline-label">{item.label}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
