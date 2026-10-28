export default function Navbar() {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="TaskMate home"><span className="brand-mark">✓</span><span>Task<span className="brand-accent">Mate</span></span></a>
      <div className="topbar-note"><span className="live-dot" /> YOUR PERSONAL WORKSPACE</div>
    </header>
  )
}
