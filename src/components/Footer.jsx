import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand" to="/"><Leaf size={18} aria-hidden="true" /> MazingiraHub</Link>
          <p>Making it easier to support the organisations creating stronger, greener communities.</p>
        </div>
        <div><h3>Explore</h3><Link to="/organizations">Organizations</Link><Link to="/stories">Impact stories</Link><Link to="/how-it-works">How it works</Link></div>
        <div><h3>Get involved</h3><Link to="/apply-organization">Apply as an organisation</Link><Link to="/organizations">Create an account</Link><Link to="/about">About us</Link></div>
      </div>
      <div className="shell copyright">© {new Date().getFullYear()} MazingiraHub. Built for community impact.</div>
    </footer>
  )
}
