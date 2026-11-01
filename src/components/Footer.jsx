import { gift } from '../data.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-message">{gift.message}</p>
      <p className="footer-credit">Thiệp cưới online</p>
    </footer>
  )
}
