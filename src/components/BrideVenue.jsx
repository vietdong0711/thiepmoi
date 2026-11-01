import { PinIcon } from './Decor.jsx'
import { brideVenue } from '../data.js'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  brideVenue.mapQuery,
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  brideVenue.mapQuery,
)}`

export default function BrideVenue() {
  return (
    <div className="venue-outer venue-outer--bride">
      <img
        src="/images/themes/minimalism-brown/house-background.webp"
        alt=""
        aria-hidden="true"
        className="venue-house"
      />
      <section className="venue-section">
        <div className="venue-heading">
          <h3 className="venue-title">Địa chỉ nhà gái</h3>
          <p className="venue-address">
            {brideVenue.name}, {brideVenue.address}
          </p>
        </div>

        <div className="venue-body">
          <iframe
            className="venue-map"
            title={`Bản đồ ${brideVenue.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="venue-directions"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <PinIcon className="venue-pin" />
            <span>Chỉ đường</span>
          </a>
        </div>
      </section>
    </div>
  )
}
