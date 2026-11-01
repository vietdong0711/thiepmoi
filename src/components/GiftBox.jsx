import { useMemo, useState } from 'react'
import { gift } from '../data.js'

const DECOR = [
  { src: 'porcelain_blue', left: -20, top: 10, width: 34, rotate: -22, z: 1 },
  { src: 'royal_v2_purple', left: 168, top: 2, width: 38, rotate: 20, z: 1 },
  { src: 'baroque_v2_darkblue', left: -16, top: 120, width: 26, rotate: -18, z: 1 },
  { src: 'minimalism_darkblue', left: 182, top: 114, width: 24, rotate: 14, z: 1 },
  { src: 'royal', left: -8, top: 172, width: 44, rotate: 8, z: 3 },
  { src: 'glass_garden_green', left: 26, top: 182, width: 26, rotate: -10, z: 3 },
  { src: 'porcelain_v2_red', left: 118, top: 176, width: 40, rotate: -14, z: 3 },
]

const COLORS = ['#ec4899', '#918077', '#22c55e', '#3b82f6', '#a855f7', '#f97316', '#7c6a60', '#e1bc7c']

function buildConfetti() {
  return Array.from({ length: 30 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.4
    const distance = 60 + Math.random() * 90
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40,
      rot: Math.random() * 540 - 270,
      color: COLORS[i % COLORS.length],
      round: i % 3 === 0,
      delay: Math.random() * 0.15,
    }
  })
}

export default function GiftBox() {
  const [opened, setOpened] = useState(false)
  const confetti = useMemo(() => buildConfetti(), [])

  const handleOpen = () => {
    if (!opened) setOpened(true)
  }

  return (
    <div className="gift-outer">
      <img
        src="/images/themes/minimalism-brown/house-background.webp"
        alt=""
        aria-hidden="true"
        className="gift-house"
      />

      <div className="gift-section">
        <h2 className="gift-title">{gift.title}</h2>

        <button
          type="button"
          className={`gift-box ${opened ? 'is-open' : ''}`}
          onClick={handleOpen}
          aria-label={opened ? gift.openedHint : gift.title}
        >
          <span className="gift-stage">
            <span className="igb-sparkle igb-s1">✦</span>
            <span className="igb-sparkle igb-s2">✦</span>
            <span className="igb-sparkle igb-s3">✦</span>
            <span className="igb-sparkle igb-s4">✦</span>

            <span className="igb-confetti-wrap" aria-hidden="true">
              {opened
                ? confetti.map((piece) => (
                    <span
                      key={piece.id}
                      className={`igb-confetti ${piece.round ? 'is-round' : ''}`}
                      style={{
                        '--tx': `${piece.x}px`,
                        '--ty': `${piece.y}px`,
                        '--rot': `${piece.rot}deg`,
                        '--delay': `${piece.delay}s`,
                        backgroundColor: piece.color,
                      }}
                    />
                  ))
                : null}
            </span>

            <span className={`gift-bob ${opened ? 'is-open' : ''}`}>
              <span className="gift-shadow" />

              {DECOR.filter((d) => d.z === 1).map((decor) => (
                <img
                  key={decor.src}
                  src={`/images/giftbox/mini/${decor.src}.webp`}
                  alt=""
                  aria-hidden="true"
                  className="gift-decor"
                  style={{
                    left: decor.left,
                    top: decor.top,
                    width: decor.width,
                    transform: `rotate(${decor.rotate}deg)`,
                    zIndex: decor.z,
                  }}
                />
              ))}

              <img
                src="/images/giftbox/minimalism_brown.webp"
                alt="Hộp quà mừng cưới"
                className="gift-chest"
              />

              {DECOR.filter((d) => d.z === 3).map((decor) => (
                <img
                  key={decor.src}
                  src={`/images/giftbox/mini/${decor.src}.webp`}
                  alt=""
                  aria-hidden="true"
                  className="gift-decor"
                  style={{
                    left: decor.left,
                    top: decor.top,
                    width: decor.width,
                    transform: `rotate(${decor.rotate}deg)`,
                    zIndex: decor.z,
                  }}
                />
              ))}
            </span>
          </span>

          <span className="gift-hint">{opened ? gift.openedHint : gift.hint}</span>
        </button>

        <p className={`gift-thanks ${opened ? 'is-visible' : ''}`}>
          {opened
            ? 'Tình cảm và sự chúc phúc của bạn là món quà quý giá nhất đối với chúng tôi.'
            : ''}
        </p>
      </div>
    </div>
  )
}
