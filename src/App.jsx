import { useCallback, useEffect, useRef, useState } from 'react'
import Envelope from './components/Envelope.jsx'
import Invitation from './components/Invitation.jsx'
import MusicButton from './components/MusicButton.jsx'

export default function App() {
  const [opened, setOpened] = useState(
    () => new URLSearchParams(window.location.search).has('open'),
  )
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!opened) {
      document.body.classList.add('is-locked')
    } else {
      document.body.classList.remove('is-locked')
    }
    return () => document.body.classList.remove('is-locked')
  }, [opened])

  const handleOpen = useCallback(() => {
    setOpened(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.65
      const attempt = audio.play()
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        setPlaying(true)
      }
    }
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/la-anh.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!opened && <Envelope onOpen={handleOpen} />}

      {opened && <Invitation />}

      {opened && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </>
  )
}
