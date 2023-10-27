import logoImg from '../../assets/uol-lg.png'
import './styles.scss'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="header-container">
      <Link to="/">
        <img src={logoImg} alt="logo da UOL" />
      </Link>
    </header>
  )
}
