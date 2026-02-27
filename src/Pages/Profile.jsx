import React from 'react'

import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #06060a;
    --card: #0f0f18;
    --gold: #f5c842;
    --orange: #ff5c2b;
    --text: #f0ede8;
    --muted: #6a6880;
    --border: rgba(255,255,255,0.07);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 5vw;
    background: rgba(6,6,10,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.9rem; letter-spacing: 4px;
    color: var(--gold); text-decoration: none;
  }
  .nav-links { display: flex; gap: 2.2rem; list-style: none; }
  .nav-links a {
    color: var(--muted); text-decoration: none;
    font-size: 0.88rem; font-weight: 500; letter-spacing: 0.5px;
    transition: color 0.2s; position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1.5px; background: var(--gold); transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }
  .btn-nav {
    background: var(--gold); color: #000; border: none;
    padding: 0.55rem 1.4rem; border-radius: 4px;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.88rem;
    cursor: pointer; transition: transform 0.2s, opacity 0.2s;
  }
  .btn-nav:hover { opacity: 0.85; transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 8rem 5vw 5rem; position: relative; overflow: hidden;
  }
  .hero-glow {
    position: absolute; top: -100px; right: -100px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow2 {
    position: absolute; bottom: -150px; left: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,92,43,0.09) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-content { max-width: 680px; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(245,200,66,0.1); border: 1px solid rgba(245,200,66,0.25);
    color: var(--gold); padding: 0.4rem 1rem; border-radius: 20px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 1.8rem;
    animation: fadeUp 0.6s ease both;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    line-height: 0.95; letter-spacing: 2px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero h1 em { color: var(--gold); font-style: normal; }
  .hero h1 .outline { -webkit-text-stroke: 1.5px var(--orange); color: transparent; }
  .hero-sub {
    margin-top: 1.5rem; font-size: 1.05rem; color: var(--muted);
    line-height: 1.7; max-width: 480px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-btns {
    display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-primary {
    background: var(--gold); color: #000; border: none;
    padding: 0.85rem 2rem; border-radius: 5px;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,200,66,0.3); }
  .btn-secondary {
    background: transparent; color: var(--text);
    border: 1px solid var(--border); padding: 0.85rem 2rem; border-radius: 5px;
    font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 0.95rem;
    cursor: pointer; transition: border-color 0.2s, color 0.2s;
  }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
  .hero-stats {
    display: flex; gap: 3rem; margin-top: 3.5rem;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: var(--gold); letter-spacing: 1px; }
  .stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.1rem; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* MARQUEE */
  .marquee-wrap {
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 1rem 0; overflow: hidden; background: var(--card);
  }
  .marquee-track {
    display: flex; gap: 3rem; width: max-content;
    animation: marquee 22s linear infinite;
  }
  .marquee-item {
    display: flex; align-items: center; gap: 0.7rem;
    font-size: 0.82rem; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); white-space: nowrap;
  }
  .marquee-dot { color: var(--gold); }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTIONS */
  .section { padding: 7rem 5vw; }
  .section-label {
    display: inline-block; font-size: 0.75rem; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    letter-spacing: 1px; line-height: 1;
  }
  .section-title span { color: var(--orange); }
  .section-sub { color: var(--muted); margin-top: 0.8rem; font-size: 1rem; max-width: 500px; line-height: 1.6; }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5px; margin-top: 4rem;
    border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden;
  }
  .feature-card {
    background: var(--card); padding: 2.5rem;
    transition: background 0.3s; position: relative; overflow: hidden;
  }
  .feature-card:hover { background: #151522; }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 10px;
    background: rgba(245,200,66,0.1); border: 1px solid rgba(245,200,66,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 1.5rem; transition: transform 0.3s;
  }
  .feature-card:hover .feature-icon { transform: scale(1.1) rotate(-5deg); }
  .feature-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.6rem; }
  .feature-card p { color: var(--muted); font-size: 0.9rem; line-height: 1.65; }

  /* WORKS */
  .works-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem; margin-top: 4rem;
  }
  .work-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
    transition: transform 0.3s, border-color 0.3s; cursor: pointer;
  }
  .work-card:hover { transform: translateY(-6px); border-color: rgba(245,200,66,0.3); }
  .work-thumb {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 3.5rem; position: relative; overflow: hidden;
  }
  .work-body { padding: 1.5rem; }
  .work-tag { font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .work-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.4rem; }
  .work-card p { color: var(--muted); font-size: 0.88rem; }
  .work-arrow {
    margin-top: 1.2rem; color: var(--gold); font-size: 0.82rem; font-weight: 600;
    opacity: 0; transition: opacity 0.3s;
  }
  .work-card:hover .work-arrow { opacity: 1; }

  /* TESTIMONIALS */
  .testi-section { background: var(--card); }
  .testi-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem; margin-top: 4rem;
  }
  .testi-card {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 12px; padding: 2rem; transition: border-color 0.3s;
  }
  .testi-card:hover { border-color: rgba(245,200,66,0.25); }
  .testi-stars { color: var(--gold); margin-bottom: 1rem; letter-spacing: 2px; }
  .testi-text { color: var(--muted); font-size: 0.92rem; line-height: 1.7; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 0.9rem; margin-top: 1.5rem; }
  .testi-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; font-weight: 700; color: #000;
    background: var(--gold); flex-shrink: 0;
  }
  .testi-name { font-weight: 600; font-size: 0.9rem; }
  .testi-role { color: var(--muted); font-size: 0.78rem; }

  /* CTA */
  .cta-banner {
    margin: 0 5vw 7rem;
    background: linear-gradient(135deg, #1a1608 0%, #1a0e08 100%);
    border: 1px solid rgba(245,200,66,0.2);
    border-radius: 20px; padding: 5rem 4rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 2rem; flex-wrap: wrap; position: relative; overflow: hidden;
  }
  .cta-banner::before {
    content: ''; position: absolute; right: -80px; top: -80px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-banner h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem); letter-spacing: 1px;
  }
  .cta-banner h2 span { color: var(--gold); }
  .cta-banner p { color: var(--muted); margin-top: 0.5rem; }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 3rem 5vw 2rem;
  }
  .footer-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 3rem; flex-wrap: wrap; margin-bottom: 3rem;
  }
  .footer-brand { max-width: 280px; }
  .footer-brand p { color: var(--muted); font-size: 0.88rem; margin-top: 0.8rem; line-height: 1.6; }
  .footer-col h4 { font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-col a { color: var(--muted); text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
  .footer-col a:hover { color: var(--text); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 1.5rem;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
  }
  .footer-bottom p { color: var(--muted); font-size: 0.82rem; }
  .social-links { display: flex; gap: 1rem; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); font-size: 0.9rem; cursor: pointer;
    transition: border-color 0.2s, color 0.2s; text-decoration: none;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero-stats { gap: 1.5rem; }
    .cta-banner { padding: 3rem 2rem; text-align: center; justify-content: center; }
    .footer-top { flex-direction: column; }
  }
`;

const features = [
  { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance that loads in milliseconds. Speed is not a luxury, it's a requirement." },
  { icon: "🎨", title: "Beautiful Design", desc: "Pixel-perfect interfaces crafted with intention. Every detail matters, every element has purpose." },
  { icon: "🔒", title: "Secure by Default", desc: "Enterprise-grade security baked in from the start. Your data is protected at every layer." },
  { icon: "📱", title: "Fully Responsive", desc: "Looks stunning on every device — from 4K monitors to mobile phones, flawless every time." },
  { icon: "🤝", title: "Easy Integration", desc: "Plug into your existing stack in minutes. REST APIs, webhooks, and SDKs all ready to go." },
  { icon: "📊", title: "Smart Analytics", desc: "Real-time insights that actually matter. Make decisions backed by meaningful data." },
];

const works = [
  { bg: "linear-gradient(135deg,#1a1a2e,#16213e)", emoji: "🛒", tag: "E-Commerce", title: "ShopFlow Platform", desc: "Modern shopping experience with AI recommendations." },
  { bg: "linear-gradient(135deg,#0d1b2a,#1b4332)", emoji: "📈", tag: "Dashboard", title: "FinTrack Analytics", desc: "Real-time financial data visualization tool." },
  { bg: "linear-gradient(135deg,#1a0e08,#2d1b00)", emoji: "🎵", tag: "Mobile App", title: "Beats Social", desc: "Music sharing platform for indie artists." },
];

const testimonials = [
  { stars: "★★★★★", text: "This transformed our product completely. The design quality is unmatched and our users love every interaction.", name: "Priya Sharma", role: "CEO at TechFlow", initial: "P" },
  { stars: "★★★★★", text: "From concept to launch in record time. The attention to detail and performance optimization is truly impressive.", name: "Rahul Verma", role: "CTO at Startify", initial: "R" },
  { stars: "★★★★★", text: "We saw a 3x increase in conversions after the redesign. Simply outstanding work that exceeded every expectation.", name: "Ananya Singh", role: "Head of Product at Growit", initial: "A" },
];

const marqueeItems = ["Web Design", "UI/UX", "React Development", "Mobile Apps", "Brand Identity", "Motion Design", "E-Commerce", "SaaS Products"];

export default function Profile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav" style={{ boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none" }}>
        <a href="#" className="logo">Studio<span style={{ color: "var(--orange)" }}>X</span></a>
        <ul className="nav-links">
          {["Features", "Work", "Reviews", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="btn-nav">Get Started →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Now Available v2.0
          </div>
          <h1>
            BUILD <em>BOLD</em><br />
            <span className="outline">DIGITAL</span><br />
            EXPERIENCES
          </h1>
          <p className="hero-sub">
            We craft high-performance websites and apps that don't just look good — they convert, engage, and scale with your business.
          </p>
          <div className="hero-btns">
            <button className="btn-primary">Start Your Project →</button>
            <button className="btn-secondary">View Our Work</button>
          </div>
          <div className="hero-stats">
            {[["150+", "Projects Delivered"], ["98%", "Client Satisfaction"], ["5★", "Average Rating"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div className="marquee-item" key={i}>
              <span className="marquee-dot">◆</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Everything You <span>Need</span></h2>
        <p className="section-sub">All the tools and expertise to build something extraordinary — under one roof.</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section className="section" id="work" style={{ paddingTop: 0 }}>
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Recent <span>Work</span></h2>
        <p className="section-sub">A glimpse into our latest projects — built with care, shipped with pride.</p>
        <div className="works-grid">
          {works.map((w, i) => (
            <div className="work-card" key={i}>
              <div className="work-thumb" style={{ background: w.bg }}>{w.emoji}</div>
              <div className="work-body">
                <div className="work-tag">{w.tag}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="work-arrow">View Case Study →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testi-section" id="reviews">
        <div className="section-label">Testimonials</div>
        <h2 className="section-title">What Clients <span>Say</span></h2>
        <p className="section-sub">Real words from real people who trusted us with their vision.</p>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">{t.stars}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initial}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner" id="contact">
        <div>
          <h2>Ready to Build <span>Something Great?</span></h2>
          <p>Let's turn your idea into a product people love.</p>
        </div>
        <button className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem", flexShrink: 0 }}>
          Let's Talk →
        </button>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">Studio<span style={{ color: "var(--orange)" }}>X</span></a>
            <p>We build digital products that are fast, beautiful, and built to last. Based in India, working globally.</p>
          </div>
          {[
            { title: "Services", links: ["Web Design", "App Development", "UI/UX Design", "Brand Identity"] },
            { title: "Company", links: ["About Us", "Our Work", "Blog", "Careers"] },
            { title: "Contact", links: ["hello@studiox.in", "+91 98765 43210", "Vadodara, Gujarat"] },
          ].map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© 2025 StudioX. All rights reserved.</p>
          <div className="social-links">
            {["𝕏", "in", "▶", "◉"].map((s) => (
              <a className="social-btn" href="#" key={s}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
