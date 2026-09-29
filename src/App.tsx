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
          </div>
          <div className="art-caption" aria-hidden="true">
            <span className="caption-rule"></span>
            <span>
              PRECISIÓN EN CADA DECISIÓN.
              <br />
              VELOCIDAD EN CADA EJECUCIÓN.
            </span>
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
              <i></i>A3
            </span>
            <span>
              <i></i>XMEV
            </span>
          </div>
        </div>

        <Connectivity />
        <Strategies />


          {/*        <section
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
        */}

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
                className="button button-dark contact-whatsapp"
                href="https://wa.me/5493584301636"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablemos de tu proyecto por WhatsApp"
              >
                <svg
                  viewBox="0 0 16 16"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 8.004 0C3.64 0 .087 3.552.083 7.918c0 1.395.364 2.757 1.057 3.965L.016 16l4.2-1.102a7.933 7.933 0 0 0 3.784.964h.004c4.368 0 7.92-3.552 7.924-7.922a7.898 7.898 0 0 0-2.327-5.614zM8.004 14.523a6.573 6.573 0 0 1-3.352-.918l-.24-.144-2.492.654.665-2.433-.157-.25A6.56 6.56 0 0 1 1.42 7.918c0-3.626 2.953-6.579 6.588-6.579a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.67c-.004 3.63-2.957 6.583-6.592 6.583zm3.615-4.928c-.197-.099-1.17-.578-1.352-.644-.182-.066-.314-.099-.446.099-.132.198-.512.644-.628.776-.116.132-.231.149-.429.05-.198-.1-.837-.308-1.595-.984-.59-.526-.988-1.176-1.104-1.374-.116-.198-.013-.305.087-.403.089-.088.198-.231.297-.347.099-.116.132-.198.198-.33.066-.133.033-.248-.017-.347-.05-.099-.446-1.075-.611-1.472-.16-.387-.324-.334-.446-.34-.116-.006-.248-.007-.38-.007a.728.728 0 0 0-.529.248c-.182.198-.694.678-.694 1.653 0 .976.71 1.918.809 2.05.1.133 1.397 2.134 3.385 2.992.473.204.842.326 1.13.417.474.15.906.129 1.247.078.38-.057 1.17-.48 1.335-.943.166-.462.166-.859.116-.942-.05-.082-.182-.132-.38-.23z" />
                </svg>
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
