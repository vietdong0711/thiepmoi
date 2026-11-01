import Header from './Header.jsx'
import WeddingInfo from './WeddingInfo.jsx'
import BrideVenue from './BrideVenue.jsx'
import Album from './Album.jsx'
import PartyInfo from './PartyInfo.jsx'
import Venue from './Venue.jsx'
import DressCode from './DressCode.jsx'
import Timeline from './Timeline.jsx'
import Guestbook from './Guestbook.jsx'
import GiftBox from './GiftBox.jsx'
import Footer from './Footer.jsx'

export default function Invitation() {
  return (
    <main className="site">
      <div className="site-frame">
        <div className="paper-bg" aria-hidden="true" />
        <Header />
        <WeddingInfo />
        <BrideVenue />
        <Album />
        <PartyInfo />
        <Venue />
        <Guestbook />
        <Footer />
      </div>
    </main>
  )
}
