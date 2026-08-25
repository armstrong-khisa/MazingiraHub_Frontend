export default function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <div><a className="brand" href="/"><span>✦</span> MazingiraHub</a><p>Making it easier to support the organisations creating stronger, greener communities.</p></div>
    <div><h3>Explore</h3><a href="/organizations">Organizations</a><a href="/stories">Impact stories</a><a href="/how-it-works">How it works</a></div>
    <div><h3>Get involved</h3><a href="/apply">Apply as an organisation</a><a href="/register">Create an account</a><a href="/about">About us</a></div>
  </div><div className="shell copyright">© {new Date().getFullYear()} MazingiraHub. Built for community impact.</div></footer>
}
