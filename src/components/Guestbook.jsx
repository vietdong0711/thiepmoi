import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { HeartIcon, Leaf } from './Decor.jsx'

const WISHES_API =
  'https://script.google.com/macros/s/AKfycby1Fwec7Ew5mxYArZYnSCGC5NLv7Hgx0oz8PJhsLo6e3-34cg-iYr760WRhme9hf9DZ/exec'
const REFRESH_INTERVAL = 60_000

function formatCreatedAt(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value ?? '')
  const pad = (number) => String(number).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

async function loadWishes(signal) {
  const response = await fetch(WISHES_API, { signal })
  if (!response.ok) throw new Error('Không thể tải lời chúc.')

  const result = await response.json()
  if (result.success !== true || !Array.isArray(result.data)) {
    throw new Error('Dữ liệu lời chúc từ máy chủ không hợp lệ.')
  }

  return result.data.map((wish) => ({
    id: wish.id,
    name: String(wish.name ?? ''),
    message: String(wish.message ?? ''),
    time: formatCreatedAt(wish.createdAt),
  }))
}

export default function Guestbook() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [liked, setLiked] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let disposed = false
    let timeoutId
    let controller

    const refresh = async () => {
      controller = new AbortController()
      try {
        const latestWishes = await loadWishes(controller.signal)
        if (!disposed) {
          setWishes(latestWishes)
          setError('')
        }
      } catch (requestError) {
        if (!disposed && requestError.name !== 'AbortError') {
          setError('Không tải được lời chúc. Vui lòng thử tải lại trang.')
        }
      } finally {
        if (!disposed) {
          timeoutId = window.setTimeout(refresh, REFRESH_INTERVAL)
        }
      }
    }

    refresh()
    return () => {
      disposed = true
      window.clearTimeout(timeoutId)
      controller?.abort()
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Vui lòng nhập tên và lời chúc của bạn.')
      return
    }
    setIsSubmitting(true)
    setError('')
    let wasSubmitted = false
    try {
      const response = await fetch(WISHES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      })
      if (!response.ok) throw new Error('Không gửi được lời chúc.')

      const result = await response.json()
      if (result.success !== true) {
        throw new Error(result.message || 'Không gửi được lời chúc.')
      }

      wasSubmitted = true
      setName('')
      setMessage('')
      setLiked(false)
      setWishes(await loadWishes())
      setError('')
    } catch (requestError) {
      setError(
        wasSubmitted
          ? 'Đã gửi lời chúc, nhưng chưa tải lại được danh sách.'
          : requestError.message ||
              'Không gửi được lời chúc. Vui lòng thử lại sau.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="guestbook-outer">
      <Leaf className="guestbook-leaf" rotate={38} />
      <img
        src="/images/themes/minimalism-brown/paper-note.webp"
        alt=""
        aria-hidden="true"
        className="guestbook-note"
      />

      <section className="guestbook" id="guestbook">
        <div className="guestbook-head">
          <h2 className="guestbook-title">Sổ lưu bút</h2>
        </div>

        <form className="wish-form" onSubmit={handleSubmit}>
          <div className="wish-fields">
            <div className="wish-field">
              <input
                className="wish-input"
                type="text"
                placeholder="Tên của bạn"
                value={name}
                maxLength={40}
                onChange={(event) => setName(event.target.value)}
                aria-label="Tên của bạn"
              />
            </div>
            <textarea
              className="wish-textarea"
              placeholder="Viết lời chúc cho cô dâu chú rể..."
              value={message}
              maxLength={300}
              onChange={(event) => setMessage(event.target.value)}
              aria-label="Lời chúc"
            />
            <div className="wish-actions">
              <button
                type="button"
                className={`wish-like ${liked ? 'is-liked' : ''}`}
                onClick={() => setLiked((v) => !v)}
                aria-label="Thả tim"
                aria-pressed={liked}
              >
                <HeartIcon className="wish-like-icon" />
              </button>
              <button
                type="submit"
                className="wish-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
              </button>
            </div>
            {error ? <p className="wish-error">{error}</p> : null}
          </div>
        </form>

      </section>
      {createPortal(
        <aside className="wish-panel" aria-label="Danh sách lời chúc">
          <div className="wish-list">
            <div className="wish-track">
              {[0, 1].map((copy) => (
                <div
                  className="wish-loop"
                  key={copy}
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  {wishes.map((wish, i) => (
                    <article
                      className="wish-card"
                      key={`${copy}-${wish.id ?? `${wish.name}-${i}`}`}
                    >
                      <div className="wish-card-head">
                        <span className="wish-name">{wish.name}</span>
                      </div>
                      <p className="wish-message">{wish.message}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>,
        document.body,
      )}
    </div>
  )
}
