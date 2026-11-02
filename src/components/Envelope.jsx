import { FallingLeaves, HeartIcon } from './Decor.jsx'

export default function Envelope({ onOpen }) {
  return (
    <div className="env-overlay" role="dialog" aria-label="Thiệp mời cưới Viết Đồng và Trần Hằng">
      <div className="env-glow" aria-hidden="true" />
      <FallingLeaves />
      <div className="env-stage">
        <div className="env-seal" aria-hidden="true">
          <HeartIcon className="env-seal-icon" />
        </div>

        <div className="env-card">
          <div className="env-card-clip">
            <img
              src="/images/themes/minimalism-brown/flower2-decoration.webp"
              alt=""
              aria-hidden="true"
              className="env-flower env-flower-tl"
            />
            <img
              src="/images/themes/minimalism-brown/flower2-decoration.webp"
              alt=""
              aria-hidden="true"
              className="env-flower env-flower-br"
            />
          </div>

          <div className="env-content">
            <h1 className="env-names">
              <span className="env-name">Viết Đồng</span>
              <span className="env-amp">&amp;</span>
              <span className="env-name">Trần Hằng</span>
            </h1>

            <div className="env-divider" aria-hidden="true">
              <span className="env-divider-line" />
              <span className="env-divider-mark">❦</span>
              <span className="env-divider-line env-divider-line-r" />
            </div>

            <p className="env-date">14 tháng 11, 2026</p>
            <p className="env-invite">Thân Mời</p>

            <button type="button" className="env-open-btn" onClick={onOpen}>
              <span>Mở thiệp</span>
              <span className="env-shine" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
