import { MessageIcon, NoteIcon } from './Decor.jsx'

export default function MusicButton({ playing, onToggle, onMessage }) {
  return (
    <div className="music-dock">
      <button
        type="button"
        className="music-btn message-btn"
        onClick={onMessage}
        aria-label="Viết lời chúc"
      >
        <span className="music-btn-fill" aria-hidden="true">
          <span className="music-btn-ring" />
          <span className="music-btn-gloss" />
        </span>
        <span className="music-btn-icon">
          <MessageIcon className="music-note" />
        </span>
      </button>
      <button
        type="button"
        className={`music-btn ${playing ? 'is-playing' : ''}`}
        onClick={onToggle}
        aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
        aria-pressed={playing}
      >
        <span className="music-btn-fill" aria-hidden="true">
          <span className="music-btn-ring" />
          <span className="music-btn-gloss" />
        </span>
        <span className="music-btn-icon">
          <NoteIcon className="music-note" />
          {playing ? (
            <span className="music-wave" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          ) : null}
        </span>
      </button>
    </div>
  )
}
