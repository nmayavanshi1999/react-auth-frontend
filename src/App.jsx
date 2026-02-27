import { Routes, Route, Link, Outlet, NavLink } from 'react-router-dom'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Signup from './Pages/Signup'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #080b12;
    --card: #0f1219;
    --blue: #63b3ed;
    --blue-dim: rgba(99,179,237,0.1);
    --orange: #ec644b;
    --text: #f0ede8;
    --muted: rgba(255,255,255,0.35);
    --border: rgba(255,255,255,0.07);
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  /* ── BG ORBS ─────────────────────────────── */
  .bg-orb {
    position: fixed; border-radius: 50%;
    pointer-events: none; z-index: 0;
  }
  .bg-orb-1 {
    top: -200px; left: -150px;
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%);
    animation: orb1 9s ease-in-out infinite;
  }
  .bg-orb-2 {
    bottom: -200px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(236,100,75,0.06) 0%, transparent 70%);
    animation: orb2 11s ease-in-out infinite;
  }
  @keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,25px)} }
  @keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-30px)} }

  /* ── NAVBAR ──────────────────────────────── */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 64px;
    background: rgba(8,11,18,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem; font-weight: 800;
    color: var(--text); text-decoration: none;
    letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .logo-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: linear-gradient(135deg, #63b3ed, #ec644b);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
  }

  .nav-links {
    display: flex; align-items: center; gap: 0.3rem;
    list-style: none;
  }
  .nav-links a {
    padding: 0.4rem 0.85rem; border-radius: 8px;
    font-size: 0.88rem; font-weight: 500;
    color: var(--muted); text-decoration: none;
    transition: color 0.2s, background 0.2s;
  }
  .nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .nav-links a.active-link { color: var(--blue); background: var(--blue-dim); }

  /* Nav right: Sign In + Sign Up buttons */
  .nav-actions {
    display: flex; align-items: center; gap: 0.6rem;
  }
  .nav-signin {
    background: transparent; color: var(--muted);
    border: 1px solid var(--border);
    padding: 0.42rem 1rem; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.86rem;
    cursor: pointer; text-decoration: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    display: inline-flex; align-items: center; gap: 0.35rem;
  }
  .nav-signin:hover {
    color: var(--text);
    border-color: rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.05);
  }
  .nav-signup {
    background: var(--blue); color: #000;
    border: none; padding: 0.45rem 1.1rem; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.86rem;
    cursor: pointer; text-decoration: none;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 0.35rem;
  }
  .nav-signup:hover {
    opacity: 0.9; transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99,179,237,0.3);
  }

  /* ── LAYOUT ──────────────────────────────── */
  .layout-root {
    display: flex; flex-direction: column;
    min-height: 100vh; position: relative; z-index: 1;
  }

  .page-main {
    flex: 1; padding: 3.5rem 5vw;
    animation: pageFade 0.35s ease both;
  }
  @keyframes pageFade {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── FOOTER ──────────────────────────────── */
  .site-footer {
    border-top: 1px solid var(--border);
    padding: 1.4rem 5vw;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 0.8rem;
    position: relative; z-index: 1;
  }
  .site-footer p { color: var(--muted); font-size: 0.78rem; }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a {
    color: var(--muted); text-decoration: none; font-size: 0.78rem;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--text); }

  /* ── HOME PAGE ───────────────────────────── */
  .home-hero {
    max-width: 680px; margin: 3rem auto 0;
    text-align: center;
  }
  .home-badge {
    display: inline-flex; align-items: center; gap: 0.45rem;
    background: var(--blue-dim); border: 1px solid rgba(99,179,237,0.22);
    color: var(--blue); padding: 0.35rem 0.9rem; border-radius: 20px;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 1.5rem;
    animation: fadeUp 0.5s ease both;
  }
  .badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--blue); animation: pulse 1.5s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.5)} }

  .home-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 800; line-height: 1.06; letter-spacing: -1px;
    animation: fadeUp 0.5s 0.08s ease both;
  }
  .hero-gradient {
    background: linear-gradient(135deg, #63b3ed 0%, #ec644b 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .home-hero p {
    margin-top: 1.2rem; font-size: 1rem;
    color: var(--muted); line-height: 1.7;
    animation: fadeUp 0.5s 0.16s ease both;
  }

  .home-btns {
    display: flex; gap: 0.8rem; justify-content: center;
    margin-top: 2rem; flex-wrap: wrap;
    animation: fadeUp 0.5s 0.24s ease both;
  }
  .btn-cta {
    background: linear-gradient(135deg, #63b3ed, #4299e1);
    color: #fff; border: none; padding: 0.75rem 1.8rem; border-radius: 10px;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.92rem;
    cursor: pointer; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 0.4rem;
  }
  .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(99,179,237,0.32); }
  .btn-outline {
    background: rgba(255,255,255,0.04); color: var(--text);
    border: 1px solid var(--border); padding: 0.75rem 1.8rem; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.92rem;
    cursor: pointer; text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
    display: inline-flex; align-items: center; gap: 0.4rem;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); }

  .home-cards {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px; margin-top: 4.5rem;
    border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
    animation: fadeUp 0.5s 0.32s ease both;
  }
  .home-card {
    background: var(--card); padding: 1.8rem 1.6rem;
    transition: background 0.25s;
  }
  .home-card:hover { background: #141820; }
  .card-icon {
    width: 42px; height: 42px; border-radius: 10px;
    background: var(--blue-dim); border: 1px solid rgba(99,179,237,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; margin-bottom: 1rem;
    transition: transform 0.3s;
  }
  .home-card:hover .card-icon { transform: scale(1.1) rotate(-5deg); }
  .home-card h3 {
    font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700;
    margin-bottom: 0.4rem;
  }
  .home-card p { color: var(--muted); font-size: 0.82rem; line-height: 1.6; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ──────────────────────────── */
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .nav-signin { display: none; }
    .page-main { padding: 2rem 4vw; }
    .home-hero { margin-top: 1.5rem; }
  }
`

const cards = [
  { icon: '⚡', title: 'Fast & Optimized', desc: 'Built for performance from the ground up.' },
  { icon: '🔒', title: 'JWT Auth', desc: 'Secure token-based authentication flow.' },
  { icon: '🎨', title: 'Polished UI', desc: 'Every pixel crafted with intention.' },
  { icon: '📱', title: 'Responsive', desc: 'Flawless on every screen size.' },
]

function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-badge">
        <span className="badge-dot" /> Live Now
      </div>
      <h1>
        Build Things<br />
        <span className="hero-gradient">People Love</span>
      </h1>
      <p>
        A modern React + Vite starter with routing, auth, and beautiful UI.<br />
        Everything you need to ship something great.
      </p>
      <div className="home-btns">
        <Link to="/signup" className="btn-cta">Get Started →</Link>
        <Link to="/login" className="btn-outline">Sign In</Link>
      </div>
      <div className="home-cards">
        {cards.map((c) => (
          <div className="home-card" key={c.title}>
            <div className="card-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Layout() {
  return (
    <div className="layout-root">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          StudioX
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active-link' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Sign In + Sign Up */}
        <div className="nav-actions">
          <Link to="/login" className="nav-Login">
            Log In
          </Link>
          <Link to="/signup" className="nav-signup">
            Sign Up →
          </Link>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <main className="page-main">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <p>© 2025 StudioX. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>

    </div>
  )
}

function App() {
  return (
    <>
      <style>{css}</style>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <Routes>
        {/* Pages WITH navbar + footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Auth pages — WITHOUT navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App