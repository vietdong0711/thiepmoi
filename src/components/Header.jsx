import { Flower } from './Decor.jsx'
import { couple } from '../data.js'

export default function Header() {
  return (
    <header className="hero">
      <img
        src="/images/themes/minimalism-brown/leaf-background.webp"
        alt=""
        aria-hidden="true"
        className="hero-leaf"
      />
      <img
        src="/images/themes/minimalism-brown/house-background.webp"
        alt=""
        aria-hidden="true"
        className="hero-house"
      />

      <p className="hero-eyebrow">The Wedding Of</p>

      <div className="hero-names">
        <span className="hero-name">{couple.groom}</span>
        <span className="hero-amp">&amp;</span>
        <span className="hero-name">{couple.bride}</span>
      </div>

      <div className="hero-photo-wrap">
        <div className="hero-photo">
          <img
            src="/images/themes/minimalism-brown/hero.jpg"
            alt={`${couple.groom} và ${couple.bride}`}
            className="hero-photo-img"
          />
        </div>
        <img
          src="/images/themes/minimalism-brown/frame-avatar.webp"
          alt=""
          aria-hidden="true"
          className="hero-frame"
        />
        <Flower className="hero-flower" />
      </div>
    </header>
  )
}
