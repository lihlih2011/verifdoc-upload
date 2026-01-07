import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="block" aria-label="VerifDoc">
      {/* Utilisation du logo image officiel */}
      <img
        src="/images/verifdoc-logo-real.png"
        alt="VerifDoc"
        className="h-10 w-auto object-contain"
      />
    </Link>
  )
}
