import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const links = [['Home', '/'], ['Organizations', '/organizations'], ['Stories', '/stories'], ['How It Works', '/how-it-works'], ['About', '/about']]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const path = window.location.pathname
  return <header className="site-header"><nav className="nav shell" aria-label="Main navigation">
    <a className="brand" href="/" aria-label="MazingiraHub home"><span className="leaf-mark">⌁</span> MazingiraHub</a>
    <button className="menu-button" type="button" aria-expanded={isOpen} aria-label="Toggle menu" onClick={() => setIsOpen(!isOpen)}>☰</button>
    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
      {links.map(([label, href]) => <a key={href} className={path === href ? 'active' : ''} href={href} onClick={() => setIsOpen(false)}>{label}</a>)}
      {user && <><span className="nav-user">Hi, {user.name?.split(' ')[0] || 'there'}</span><button className="link-button" onClick={logout}>Log out</button></>}
      <a className="nav-login" href="/organizations" onClick={() => setIsOpen(false)}>Donate Now</a>
    </div>
  </nav></header>
}
