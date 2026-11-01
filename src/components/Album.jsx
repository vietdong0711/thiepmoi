import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronIcon, Leaf } from './Decor.jsx'
import { gallery } from '../data.js'

export default function Album() {
  const [index, setIndex] = useState(null)
  const [savedOverflow, setSavedOverflow] = useState('')
  const isOpen = index !== null
  const visible = gallery.slice(0, 4)

  const close = useCallback(() => setIndex(null), [])
  const move = useCallback(
    (step) => {
      setIndex((current) => {
        if (current === null) return current
        return (current + step + gallery.length) % gallery.length
      })
    },
    [],
  )

  useEffect(() => {
    if (!isOpen) return undefined
    setSavedOverflow(document.body.style.overflow)
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = savedOverflow
    }
  }, [isOpen, close, move, savedOverflow])

  return (
    <section className="album-section">
      <Leaf className="album-leaf" rotate={38} />

      <div className="album-inner">
        <h2 className="album-title">Album ảnh</h2>

        <div className="album-grid">
          {visible.map((src, i) => {
            const isLast = i === visible.length - 1 && gallery.length > 4
            return (
              <button
                type="button"
                className="album-thumb"
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <img src={src} alt="" className="album-img" loading="lazy" />
                {isLast ? (
                  <span className="album-more">+{gallery.length - 4}</span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {isOpen
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Album ảnh cưới"
              onClick={close}
            >
              <button type="button" className="lightbox-close" onClick={close} aria-label="Đóng">
                ✕
              </button>
              <span className="lightbox-counter">
                {index + 1} / {gallery.length}
              </span>

              <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="lightbox-nav lightbox-prev"
                  onClick={() => move(-1)}
                  aria-label="Ảnh trước"
                >
                  <ChevronIcon direction="left" className="lightbox-nav-icon" />
                </button>
                <img
                  src={gallery[index]}
                  alt={`Ảnh cưới ${index + 1}`}
                  className="lightbox-img"
                />
                <button
                  type="button"
                  className="lightbox-nav lightbox-next"
                  onClick={() => move(1)}
                  aria-label="Ảnh sau"
                >
                  <ChevronIcon className="lightbox-nav-icon" />
                </button>
              </div>

              <div className="lightbox-thumbs" onClick={(event) => event.stopPropagation()}>
                {gallery.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className={`lightbox-thumb ${i === index ? 'is-active' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Ảnh ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
