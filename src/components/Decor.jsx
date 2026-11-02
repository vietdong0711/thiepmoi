const LEAF_PATH =
  'M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z'

const LEAF_COLORS = ['#c9a97e', '#918077', '#b89b78', '#e6d6c4']

const leaves = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: (i * 37.7 + 8.9) % 94,
  size: 13 + ((i * 7) % 12),
  color: LEAF_COLORS[i % LEAF_COLORS.length],
  duration: 19 + ((i * 3) % 7),
  delay: -((i * 2.7) % 20),
  sway: ((i % 2 === 0 ? 1 : -1) * (7 + ((i * 5) % 18))).toFixed(2),
}))

export function FallingLeaves() {
  return (
    <div className="env-leaves" aria-hidden="true">
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="env-leaf"
          style={{
            left: `${leaf.left}%`,
            fontSize: `${leaf.size}px`,
            color: leaf.color,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            '--sway': `${leaf.sway}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
            <path d={LEAF_PATH} />
          </svg>
        </span>
      ))}
    </div>
  )
}

export function Flower({ className = '', mirrored = false, style }) {
  return (
    <span className={`deco ${className}`} style={style} aria-hidden="true">
      <img
        src="/images/themes/minimalism-brown/flower2-decoration.webp"
        alt=""
        className={`deco-img ${mirrored ? 'deco-flip-x' : ''}`}
      />
    </span>
  )
}

export function Leaf({ className = '', style, rotate = 0, flipX = false, flipY = false }) {
  const transform = [
    `rotate(${rotate}deg)`,
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={`deco ${className}`} style={style} aria-hidden="true">
      <img
        src="/images/themes/minimalism-brown/leaf-background.webp"
        alt=""
        className="deco-img"
        style={{ transform }}
      />
    </span>
  )
}

export function HeartIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function NoteIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  )
}

export function MessageIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 11H6v-2h12v2zm0-4H6V7h12v2z" />
    </svg>
  )
}

export function PinIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  )
}

export function CalendarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
    </svg>
  )
}

export function ChevronIcon({ className = '', direction = 'right' }) {
  const rotation = direction === 'left' ? 180 : 0
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  )
}
