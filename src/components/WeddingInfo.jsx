import { Flower, Leaf } from './Decor.jsx'
import { ceremony, couple, families } from '../data.js'

export default function WeddingInfo() {
  return (
    <section className="paper-section info-section">
      <Flower className="info-flower" mirrored style={{ animationDelay: '0.6s' }} />
      <Leaf className="info-leaf" rotate={10.57} style={{ animationDelay: '0.3s' }} />

      <div className="paper-card info-card">
        <img
          src="/images/themes/minimalism-brown/paper.webp"
          alt=""
          aria-hidden="true"
          className="paper-texture"
        />
        <div className="paper-content">
          <h2 className="paper-title">Thông tin lễ cưới</h2>

          <div className="parents">
            <div className="parents-col">
              <span className="parents-label">{families.left.label}</span>
              <span className="parents-name">{families.left.father}</span>
              <span className="parents-name">{families.left.mother}</span>
              <span className="parents-address">{families.left.address}</span>
            </div>
            <span className="parents-divider" aria-hidden="true" />
            <div className="parents-col">
              <span className="parents-label">{families.right.label}</span>
              <span className="parents-name">{families.right.father}</span>
              <span className="parents-name">{families.right.mother}</span>
              <span className="parents-address">{families.right.address}</span>
            </div>
          </div>

          <p className="info-announce">
            TRÂN TRỌNG BÁO TIN
            <br />
            LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
          </p>

          <div className="info-couple">
            <h3 className="info-groom">{couple.groomFull}</h3>
            <span className="info-order">{couple.groomOrder}</span>
            <span className="info-amp">&amp;</span>
            <h3 className="info-bride">{couple.brideFull}</h3>
            <span className="info-order">{couple.brideOrder}</span>
          </div>

          <div className="ceremony">
            <p className="ceremony-note">{ceremony.note}</p>
            <p className="ceremony-invite">{ceremony.invite}</p>
            <p className="ceremony-time">{ceremony.time}</p>
            <div className="date-row">
              <span className="date-side">{ceremony.weekday}</span>
              <span className="date-bar">|</span>
              <span className="date-day">{ceremony.day}</span>
              <span className="date-bar">|</span>
              <span className="date-side">{ceremony.month}</span>
            </div>
            <p className="ceremony-year">{ceremony.year}</p>
            <p className="ceremony-lunar">{couple.lunarDate}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
