import { useState } from 'react'
import { approach, company, services } from './content'

const currentYear = new Date().getFullYear()

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="Hybridge Technologies home">
      <svg className="brand-symbol" width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="currentColor" />
        <path d="M12 34V14M36 34V14M12 26C18 16 30 16 36 26M12 30H36" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span>hybridge<span className="brand-subtitle">TECHNOLOGIES</span></span>
    </a>
  )
}

function ServiceIcon({ type }: { type: typeof services[number]['icon'] }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {type === 'code' && <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>}
      {type === 'cloud' && <><path d="M6 18a4 4 0 0 1-.7-7.9A7 7 0 0 1 19 9a4.5 4.5 0 0 1-.5 9" /><path d="M12 14v7m-3-4 3-3 3 3" /></>}
      {type === 'compass' && <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" /></>}
    </svg>
  )
}

function BridgeIllustration() {
  return (
    <div className="bridge-illustration" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="bridge-label label-ideas"><span /> Your vision</div>
      <div className="bridge-label label-engineering"><span /> Our expertise</div>
      <svg className="bridge-art" viewBox="0 0 600 480" fill="none">
        <defs>
          <linearGradient id="bridge-gradient" x1="160" y1="100" x2="480" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6A94FF" /><stop offset="1" stopColor="#144BEA" />
          </linearGradient>
          <linearGradient id="deck-gradient" x1="60" y1="320" x2="550" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2259E8" /><stop offset="1" stopColor="#81ADFF" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="414" rx="220" ry="22" fill="#144BEA" opacity=".07" />
        <path d="m64 312 102-59 385 79-102 59L64 312Z" fill="#D5E2FF" />
        <path d="M64 312v18l385 79v-18L64 312Z" fill="url(#deck-gradient)" />
        <path d="m449 391 102-59v18l-102 59v-18Z" fill="#194BC5" />
        <path d="M170 330V134l23-13 22 5v213l-45-9Z" fill="url(#bridge-gradient)" />
        <path d="m170 134 23-13v204l-23 5V134Z" fill="#A7C3FF" />
        <path d="M403 378V182l23-13 22 5v213l-45-9Z" fill="url(#bridge-gradient)" />
        <path d="m403 182 23-13v204l-23 5V182Z" fill="#A7C3FF" />
        <path d="M194 150c63 150 149 167 234 47" stroke="#AEC7FF" strokeWidth="7" />
        <path d="M173 163c65 152 149 168 233 46" stroke="#2159E6" strokeWidth="7" />
        {[0, 1, 2, 3, 4, 5, 6].map((index) => {
          const x = 213 + index * 29
          const y = [220, 254, 277, 291, 289, 276, 254][index]
          return <path key={x} d={`M${x} ${y}v${324 + index * 6 - y}`} stroke="#5E8CF2" strokeWidth="2.5" />
        })}
        <path d="m87 306 353 73m-312-96 353 73" stroke="white" strokeWidth="2" strokeDasharray="10 9" opacity=".8" />
        <path d="m64 305 385 79 102-59" stroke="#9AB9F9" strokeWidth="3" />
      </svg>
      <div className="bridge-caption"><span className="small-cross">+</span> Connecting possibility</div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="home">
        <div className="container header-inner">
          <Brand />
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
            <span className={menuOpen ? 'menu-lines is-open' : 'menu-lines'} />
          </button>
          <nav id="main-nav" className={`navigation${menuOpen ? ' navigation-open' : ''}`} aria-label="Main navigation">
            <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
            <a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <Arrow diagonal /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> TECHNOLOGY WITH PURPOSE</p>
            <h1 id="hero-title">Bridging ideas.<br /><span>Building<br className="desktop-break" /> possibility.</span></h1>
            <p className="hero-description">We connect your vision with the technology to make it happen. Thoughtful software. Solid infrastructure. A partner for the journey.</p>
            <div className="hero-actions">
              <a className="button" href="#contact">Build with us <Arrow diagonal /></a>
              <a className="text-link" href="#services">Explore our services <Arrow /></a>
            </div>
            <p className="hero-note"><span className="small-cross">+</span> From the first idea to what comes next.</p>
          </div>
          <BridgeIllustration />
        </section>

        <div className="principles-strip">
          <div className="container principles-inner">
            <span>Built on good foundations.</span>
            <p>Clear thinking <span>+</span> Thoughtful engineering <span>+</span> Shared ambition</p>
          </div>
        </div>

        <section className="section container" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div><p className="eyebrow">WHAT WE DO</p><h2 id="services-title">The right technology.<br />Real possibilities.</h2></div>
            <p>We bring the pieces together to help your business move forward, wherever you are in your journey.</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top"><span className="service-icon"><ServiceIcon type={service.icon} /></span><span className="service-number">/{service.number}</span></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-tags">{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="container about-inner">
            <div><p className="eyebrow">WHY HYBRIDGE</p><h2 id="about-title">{company.tagline}</h2></div>
            <div className="about-copy"><p>Technology works best when it connects people, ideas, and opportunities. That belief is at the heart of Hybridge.</p><p>We bring curiosity, care, and practical thinking to every challenge. Working alongside you, we build solutions with a clear purpose and a foundation for growth.</p><a className="text-link" href="#contact">Meet your next technology partner <Arrow diagonal /></a></div>
          </div>
        </section>

        <section className="section container" id="approach" aria-labelledby="approach-title">
          <div className="section-heading"><div><p className="eyebrow">OUR APPROACH</p><h2 id="approach-title">A shared vision.<br />A clear path forward.</h2></div><p>Good partnerships start with listening. Here’s how we turn a conversation into progress.</p></div>
          <div className="approach-grid">{approach.map((step, index) => <article className="approach-step" key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
        </section>

        <section className="contact-section container" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div className="contact-copy"><p className="eyebrow">LET’S BUILD SOMETHING</p><h2 id="contact-title">What’s on<br />your horizon?</h2><p>A new idea. A complex challenge. A next step.<br />We’d love to hear what you have in mind.</p></div>
            <div className="contact-action"><a className="button button-white" href={`mailto:${company.email}`}>Start a conversation <Arrow diagonal /></a><a className="contact-email" href={`mailto:${company.email}`}>{company.email}</a></div>
            <div className="contact-orbit" aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><Brand footer /><p>© {currentYear} {company.name}.</p><a className="back-top" href="#home">Back to top <span aria-hidden="true">↑</span></a></div></footer>
    </>
  )
}
