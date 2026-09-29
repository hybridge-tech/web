import { useEffect, useRef, useState } from 'react'
import AnimatedChart from './AnimatedChart'
import {
  Connectivity,
  Strategies,
  HowItWorks,
  WhyHybridge,
  ConsolePreview,
} from './LandingSections'
import { usePageMotion } from './motion'

const currentYear = new Date().getFullYear()

export default function App() {
  usePageMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.header')) {
        setMenuOpen(false)
      }
    }
    const desktop = window.matchMedia('(min-width: 801px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('click', closeOnOutsideClick)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('click', closeOnOutsideClick)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip" href="#contenido">
        Ir al contenido
      </a>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#inicio" aria-label="Hybridge, inicio">
            <img
              src="/hybridge-logo.png"
              width="650"
              height="350"
              alt="Hybridge"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#conectividad">Conectividad</a>
            <a href="#estrategias">Estrategias</a>
            <a href="#como">Cómo funciona</a>
            <a href="#consola">Consola</a>
          </nav>
          <a
            className="button button-small button-outline nav-contact"
            href="#contacto"
          >
            Hablemos
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            ref={menuButtonRef}
            aria-controls="mobile-nav"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label="Navegación móvil"
          hidden={!menuOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) setMenuOpen(false)
          }}
        >
          <a href="#conectividad">Conectividad</a>
          <a href="#estrategias">Estrategias</a>
          <a href="#como">Cómo funciona</a>
          <a href="#por-que">Por qué HyBridge</a>
          <a href="#consola">Consola</a>
          <a href="#preguntas">Preguntas frecuentes</a>
          <a href="#contacto">Hablemos</a>
        </nav>
        <div className="page-progress" aria-hidden="true" />
      </header>
      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <AnimatedChart kind="hero" />
          </div>
          <div className="container hero-content">
            <p className="eyebrow">
              <span className="eyebrow-line"></span> MOTOR DE EJECUCIÓN · FIX
              NATIVO
            </p>
            <h1 id="hero-title">
              La velocidad
              <br />
              de tu próxima
              <br />
              <span>ventaja.</span>
            </h1>
            <p className="hero-description">
              Transformá la complejidad del mercado en capacidad operativa.
              Tecnología de punta para ejecutar tus estrategias con rapidez,
              precisión y control.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contacto">
                Potenciá tu mesa
              </a>
              <a className="text-link" href="#soluciones">
                Explorá las soluciones<span className="link-line"></span>
              </a>
            </div>
            <div className="hero-note">
              <span className="note-symbol">+</span>
              <span>
                Ingeniería de sistemas.
                <br />
                Experiencia en mercados financieros.
              </span>
            </div>
          </div>
          <div className="art-caption" aria-hidden="true">
            <span className="caption-rule"></span>
            <span>
              PRECISIÓN EN CADA DECISIÓN.
              <br />
              VELOCIDAD EN CADA EJECUCIÓN.
            </span>
          </div>
          <div className="container hero-bottom">
            <span>EL MERCADO SE MUEVE. VOS TAMBIÉN.</span>
            <a href="#soluciones" aria-label="Descubrir soluciones">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14m-6-6 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </a>
            <span className="hero-index">01 / HYBRIDGE</span>
          </div>
        </section>
        <div className="proof-band">
          <div className="container proof-grid">
            <span>
              <i></i>FIX nativo
            </span>
            <span>
              <i></i>BYMA
            </span>
            <span>
              <i></i>ROFEX / MATBA
            </span>
            <span>
              <i></i>XMEV
            </span>
          </div>
        </div>

        <Connectivity />
        <Strategies />

        <section
          className="solutions light-section"
          id="soluciones"
          aria-labelledby="solutions-title"
        >
          <div className="container">
            <div className="section-top">
              <p className="eyebrow">SOLUCIONES A TU MEDIDA</p>
              <span className="section-aside">
                Más posibilidades.
                <br />
                Menos fricción.
              </span>
            </div>
            <div className="section-heading">
              <h2 id="solutions-title">
                Menos tareas manuales.
                <br />
                <span>Más capacidad operativa.</span>
              </h2>
              <p>
                Una infraestructura flexible para tu forma de operar, desde la
                automatización diaria hasta las estrategias más complejas.
              </p>
            </div>
            <div className="solution-grid">
              <article className="solution">
                <div className="solution-top">
                  <span className="number">01</span>
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d="m18 3-11 15h8l-1 11 11-16h-8z" />
                  </svg>
                </div>
                <h3>
                  Automatización
                  <br />
                  operativa
                </h3>
                <p>
                  Liberá a tu equipo de tareas repetitivas. Automatizá pases,
                  controles de saldos y otras operaciones de tu mesa.
                </p>
                <span className="solution-tag">MÁS FOCO EN DECIDIR</span>
              </article>
              <article className="solution">
                <div className="solution-top">
                  <span className="number">02</span>
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M5 26V6m0 20h23M11 19V13m6 9V8m6 10V4" />
                  </svg>
                </div>
                <h3>
                  Market making
                  <br />y estrategias
                </h3>
                <p>
                  Implementá estrategias algorítmicas y operá en múltiples
                  mercados con una infraestructura preparada para la
                  complejidad.
                </p>
                <span className="solution-tag">AMPLIÁ TU ALCANCE</span>
              </article>
              <article className="solution">
                <div className="solution-top">
                  <span className="number">03</span>
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d="m11 8-8 8 8 8m10-16 8 8-8 8m-3-20-4 24" />
                  </svg>
                </div>
                <h3>
                  Desarrollo
                  <br />a tu medida
                </h3>
                <p>
                  Integrá tus propios algoritmos en Python y adaptá la
                  tecnología a los objetivos y necesidades de tu organización.
                </p>
                <span className="solution-tag">
                  TU LÓGICA. NUESTRA TECNOLOGÍA.
                </span>
              </article>
            </div>
          </div>
        </section>

        <HowItWorks />
        <WhyHybridge />

        <section
          className="technology"
          id="tecnologia"
          aria-labelledby="technology-title"
        >
          <div className="container tech-grid">
            <div className="tech-intro">
              <p className="eyebrow">INGENIERÍA Y MERCADOS</p>
              <h2 id="technology-title">
                Cada oportunidad
                <br />
                tiene su <em>momento.</em>
              </h2>
              <p>
                Tu infraestructura tiene que estar a la altura. Combinamos
                conocimiento del mercado con ingeniería para acompañar cada
                etapa de tu operación.
              </p>
              <a className="text-link" href="#contacto">
                Conocé cómo podemos ayudarte<span className="link-line"></span>
              </a>
            </div>
            <div className="tech-features">
              <article>
                <span className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m13 3-7 10h6l-1 8 7-11h-6z" />
                  </svg>
                </span>
                <div>
                  <h3>Velocidad que cuenta</h3>
                  <p>
                    Baja latencia para procesar información y ejecutar
                    estrategias cuando el mercado lo requiere.
                  </p>
                </div>
              </article>
              <article>
                <span className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM8 12l3 3 5-6" />
                  </svg>
                </span>
                <div>
                  <h3>Preparada para lo imprevisible</h3>
                  <p>
                    Una arquitectura pensada para escenarios de volatilidad y
                    cambios en las condiciones del mercado.
                  </p>
                </div>
              </article>
              <article>
                <span className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M17.5 14v7M14 17.5h7" />
                  </svg>
                </span>
                <div>
                  <h3>Crece con tu operación</h3>
                  <p>
                    Herramientas modulares que se adaptan a distintos niveles de
                    usuarios, equipos y proyectos.
                  </p>
                </div>
              </article>
              <article>
                <span className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v6h4v-6zm16 0h2v6h-4v-6zm0 6c0 3-4 3-7 3" />
                  </svg>
                </span>
                <div>
                  <h3>Un equipo detrás de la tecnología</h3>
                  <p>
                    Especialistas en ingeniería y finanzas para acompañarte
                    antes, durante y después de la rueda.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <ConsolePreview />

        <section
          className="faq light-section"
          id="preguntas"
          aria-labelledby="faq-title"
        >
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">PREGUNTAS FRECUENTES</p>
              <h2 id="faq-title">
                Lo esencial,
                <br />
                sin vueltas.
              </h2>
              <p className="faq-intro">
                La tecnología es compleja.
                <br />
                Empezar no tiene por qué serlo.
              </p>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  ¿Necesito saber programar?
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  No para usar las herramientas básicas. Para desarrollar e
                  integrar algoritmos propios, necesitás conocimientos de
                  Python.
                </div>
              </details>
              <details>
                <summary>
                  ¿Para quién está pensada Hybridge?
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  Para traders, mesas de operaciones e instituciones financieras
                  que buscan automatizar tareas o implementar estrategias
                  algorítmicas. La tecnología se adapta a distintos niveles de
                  uso.
                </div>
              </details>
              <details>
                <summary>
                  ¿Puedo desarrollar mis propias estrategias?
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  Sí. Los módulos avanzados permiten trabajar con algoritmos
                  propios y solicitar desarrollos específicos. El alcance
                  depende de las necesidades de tu proyecto y del servicio
                  contratado.
                </div>
              </details>
              <details>
                <summary>
                  ¿El trading algorítmico garantiza ganancias?
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-answer">
                  No. Los algoritmos ejecutan reglas definidas y las operaciones
                  financieras implican riesgo. Hybridge aporta infraestructura y
                  herramientas; el resultado depende de la estrategia y de las
                  condiciones del mercado.
                </div>
              </details>
            </div>
          </div>
        </section>

        <section
          className="contact"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="container contact-inner">
            <div>
              <p className="eyebrow">TU PRÓXIMO PASO</p>
              <h2 id="contact-title">
                El mercado no espera.
                <br />
                Tu tecnología tampoco.
              </h2>
              <p>
                Contanos cómo opera tu mesa.
                <br />
                Encontremos la tecnología que necesitás.
              </p>
            </div>
            <div className="contact-actions">
              <a
                className="button button-dark"
                href="mailto:soporte@hybridge.com.ar?subject=Consulta%20sobre%20tecnolog%C3%ADa%20Hybridge"
              >
                Hablemos de tu proyecto
              </a>
              <a
                className="contact-email"
                href="mailto:soporte@hybridge.com.ar"
              >
                soporte@hybridge.com.ar
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <a className="brand" href="#inicio" aria-label="Hybridge, inicio">
            <img
              src="/hybridge-logo.png"
              width="650"
              height="350"
              alt="Hybridge"
              loading="lazy"
            />
          </a>
          <p>
            Ingeniería y finanzas.
            <br />A la velocidad del mercado.
          </p>
          <a
            className="footer-social"
            href="https://www.linkedin.com/company/hybridge-technologies"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M3 9h4v12H3zm6 0h4v2c1-3 8-4 8 3v7h-4v-6c0-4-4-3-4 0v6H9z" />
            </svg>
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © <span>{currentYear}</span> Hybridge. Todos los derechos
            reservados.
          </span>
          <span>TECNOLOGÍA HECHA EN ARGENTINA</span>
        </div>
      </footer>
    </>
  )
}
