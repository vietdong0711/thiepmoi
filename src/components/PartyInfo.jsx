import { Flower, Leaf } from './Decor.jsx'
import {couple, families, party, venue} from '../data.js'

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const CALENDAR_YEAR = 2026
const CALENDAR_MONTH = 10
const SPECIAL_DAY = 14
const DAYS_IN_MONTH = new Date(CALENDAR_YEAR, CALENDAR_MONTH + 1, 0).getDate()
const FIRST_OFFSET = (new Date(CALENDAR_YEAR, CALENDAR_MONTH, 1).getDay() + 6) % 7
const DAYS = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1)
const BLANKS = Array.from({ length: FIRST_OFFSET }, (_, i) => i)

const ICS = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Thiep Cuoi//Hoang Nam Thao Vy//VI',
  'BEGIN:VEVENT',
  'UID:vietdong-tranhang-20260103@thiepcuoi',
  'DTSTAMP:20260101T000000Z',
  'DTSTART:20260103T020000Z',
  'DTEND:20260103T150000Z',
  'SUMMARY:Lễ cưới Viết Đồng & Trần Hằng',
  `LOCATION:${venue.name}, ${venue.address}`,
  'DESCRIPTION:Trân trọng kính mời bạn đến dự lễ cưới của Viết Đồng và Trần Hằng.',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

function downloadCalendar() {
  const blob = new Blob([ICS], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'le-cuoi-viet-dong-tran-hang.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function scrollToGuestbook() {
  const section = document.getElementById('guestbook')
  if (!section) return
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.setTimeout(() => {
    const input = section.querySelector('input')
    if (input) input.focus({ preventScroll: true })
  }, 650)
}

export default function PartyInfo() {
  return (
    <>
      <section className="paper-section party-section">
        <Leaf className="party-leaf" rotate={169.43} flipY style={{ animationDelay: '0.9s' }} />
        <Flower className="party-flower" style={{ animationDelay: '0.2s' }} />

        <div className="paper-card party-card">
          <img
            src="/images/themes/minimalism-brown/paper.webp"
            alt=""
            aria-hidden="true"
            className="paper-texture"
          />
          <div className="paper-content">
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
            <h2 className="paper-title">LỄ THÀNH HÔN</h2>

            <div className="party-body">
              <h3 className="party-heading">Tiệc cưới sẽ diễn ra vào lúc:</h3>
              <p className="party-time">{party.time}</p>

              <div className="party-date-row">
                <span className="party-side">{party.weekday}</span>
                <span className="party-bar" aria-hidden="true" />
                <span className="party-day">{party.day}</span>
                <span className="party-bar" aria-hidden="true" />
                <span className="party-side">{party.month}</span>
              </div>

              <p className="party-year">{party.year}</p>
              <p className="party-lunar">{couple.lunarDate}</p>

              <div className="party-times">
                <div className="party-time-item">
                  <span className="party-time-label">{party.welcome}</span>
                  <span className="party-time-value">{party.welcomeTime}</span>
                </div>
                <div className="party-time-item">
                  <span className="party-time-label">{party.open}</span>
                  <span className="party-time-value">{party.openTime}</span>
                </div>
              </div>

              <div className="calendar">
                <div className="calendar-head">Tháng 11 / 2026</div>
                <div className="calendar-week">
                  {WEEKDAYS.map((day) => (
                    <span className="calendar-weekday" key={day}>
                      {day}
                    </span>
                  ))}
                </div>
                <div className="calendar-grid">
                  {BLANKS.map((blank) => (
                    <span className="calendar-cell" key={`b-${blank}`} />
                  ))}
                  {DAYS.map((day) => (
                    <span
                      className={`calendar-cell ${day === SPECIAL_DAY ? 'is-special' : ''}`}
                      key={day}
                    >
                      {day === SPECIAL_DAY ? (
                        <span className="calendar-heart">
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <b>{SPECIAL_DAY}</b>
                        </span>
                      ) : (
                        day
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <button type="button" className="calendar-add" onClick={downloadCalendar}>
                Thêm vào lịch
              </button>
            </div>
          </div>
        </div>

        {/*<div className="confirm-wrap">*/}
        {/*  <button type="button" className="confirm-btn" onClick={scrollToGuestbook}>*/}
        {/*    Xác nhận tham dự*/}
        {/*  </button>*/}
        {/*</div>*/}
      </section>
    </>
  )
}
