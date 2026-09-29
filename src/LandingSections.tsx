import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import AnimatedChart from './AnimatedChart'
import { useReducedMotion, useVisible } from './motion'

const markets = [
  { name: 'BYMA', kind: 'Renta variable y fija' },
  { name: 'ROFEX / MATBA', kind: 'Futuros y opciones' },
  { name: 'XMEV', kind: 'Mercado de valores' },
]

function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string
  label: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div
      className={`feature-heading${children ? ' feature-heading-split' : ''}`}
    >
      <div data-reveal>
        <p className="eyebrow">
          {number} — {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && (
        <p data-reveal className="feature-description">
          {children}
        </p>
      )}
    </div>
  )
}

function FlowLink({ branch = false }: { branch?: boolean }) {
  return (
    <div
      className={`flow-link${branch ? ' flow-branch' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 300" preserveAspectRatio="none">
        {!branch && (
          <g className="flow-bridge">
            <path d="M0 60 Q100 204 200 60" />
            {Array.from({ length: 21 }, (_, index) => {
              const x = index * 10
              return (
                <path
                  key={x}
                  d={`M${x} 150 V${132 - 72 * Math.pow(x / 100 - 1, 2)}`}
                />
              )
            })}
          </g>
        )}
        {(branch ? [42, 150, 258] : [150]).map((y, i) => (
          <g key={y}>
            <path
              className="flow-path"
              d={`M0 150 C90 150 110 ${y} 200 ${y}`}
            />
            <path
              className="flow-signal"
              style={{ animationDelay: `${i * -1.4}s` }}
              d={`M0 150 C90 150 110 ${y} 200 ${y}`}
            />
          </g>
        ))}
      </svg>
      <span>{branch ? 'FIX NATIVO' : 'CONSOLA WEB'}</span>
    </div>
  )
}

export function Connectivity() {
  return (
    <section
      className="feature-section connectivity"
      id="conectividad"
      aria-label="Conectividad"
    >
      <div className="container">
        <SectionHeading
          number="01"
          label="CONECTIVIDAD"
          title={
            <>
              Un puente directo entre
              <br />
              <span>tu mesa y los mercados.</span>
            </>
          }
        >
          HyBridge se conecta por FIX nativo a cada mercado. La orden viaja
          desde la estrategia hasta el mercado sin capas intermedias.
        </SectionHeading>
        <div className="architecture" data-reveal>
          <article className="architecture-node">
            <span className="mono-label">CLIENTE</span>
            <h3>Tu mesa</h3>
            <p>
              ALyC · Mesa de trading
              <br />
              Family office
            </p>
          </article>
          <FlowLink />
          <article className="architecture-node architecture-engine">
            <span className="mono-label">MOTOR</span>
            <img
              src="/hybridge-logo.png"
              alt="HyBridge"
              width="650"
              height="350"
              loading="lazy"
            />
            <p>
              Instancia dedicada
              <br />
              Estrategias · Riesgo
            </p>
          </article>
          <FlowLink branch />
          <div className="market-nodes">
            {markets.map((market) => (
              <article className="market-node" key={market.name}>
                <div>
                  <h3>{market.name}</h3>
                  <p>{market.kind}</p>
                </div>
                <span className="fix-badge">
                  <i className="live-dot" />
                  FIX
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const strategies = [
  {
    name: 'Market Making',
    path: 'M11 5v16H7m14 6V11h4',
    viz: 'Libro de órdenes · puntas propias en cian',
    desc: 'Cotización continua de puntas con control de inventario y spreads dinámicos.',
    tags: [
      'Spreads y tamaños por instrumento',
      'Sesgo por inventario',
      'Corte por límites',
    ],
  },
  {
    name: 'Rolleo de futuros',
    path: 'M3.5 9.5h9v13h-9zm16 0h9v13h-9zm-7 6.5h7m-2.5-2.5 2.5 2.5-2.5 2.5',
    viz: 'Posición · vencimiento actual → siguiente',
    desc: 'Pasaje automático de posiciones entre vencimientos, con reglas de precio y ritmo definidas.',
    tags: [
      'Ventana de rolleo configurable',
      'Patas coordinadas',
      'Referencia de tasa implícita',
    ],
  },
  {
    name: 'Arbitraje sintético',
    path: 'M16 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 22a2 2 0 1 0 0 4 2 2 0 0 0 0-4m18 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M15 9 8 22m9-13 7 13M9 24h14',
    viz: 'Spread contado / sintético · ejecución en cian',
    desc: 'Detección y ejecución de spreads entre contado, futuros y posiciones sintéticas.',
    tags: [
      'Monitoreo continuo de bases',
      'Ejecución simultánea de patas',
      'Umbrales de entrada y salida',
    ],
  },
  {
    name: 'FX',
    path: 'M12 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16m8 0a8 8 0 1 0 0 16 8 8 0 0 0 0-16',
    viz: 'Dos patas · ejecuciones coordinadas en cian',
    desc: 'Operatoria de moneda con ejecución coordinada entre instrumentos y plazos.',
    tags: ['MEP, CCL y futuros', 'Patas simultáneas', 'Exposición por moneda'],
  },
  {
    name: 'Opciones',
    path: 'M3 23h12L29 7M3 27h26',
    viz: 'Perfil de resultado · subyacente en cian',
    desc: 'Cotización y cobertura de opciones con gestión de griegas por estrategia.',
    tags: [
      'Cotización sobre cadenas',
      'Cobertura de delta automática',
      'Límites por griega',
    ],
  },
]

export function Strategies() {
  const [selected, setSelected] = useState(0)
  const [auto, setAuto] = useState(true)
  const [focused, setFocused] = useState(false)
  const { ref, visible } = useVisible<HTMLDivElement>()
  const reduced = useReducedMotion()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = strategies[selected]
  const cycling = auto && visible && !reduced && !focused

  useEffect(() => {
    if (!cycling) return
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setSelected((index) => (index + 1) % strategies.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [cycling, selected])

  const choose = (index: number) => {
    setSelected(index)
    setAuto(false)
  }
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next: number
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      next = (index + 1) % strategies.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (index + strategies.length - 1) % strategies.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = strategies.length - 1
    else return
    event.preventDefault()
    choose(next)
    tabs.current[next]?.focus()
  }

  return (
    <section
      className="feature-section strategies-section light-section"
      id="estrategias"
      aria-label="Estrategias"
    >
      <div className="container">
        <SectionHeading
          number="02"
          label="ESTRATEGIAS"
          title={
            <>
              Estrategias automáticas,
              <br />
              <span>configuradas para tu operatoria.</span>
            </>
          }
        />
        <div
          className="strategies-layout"
          ref={ref}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFocused(false)
          }}
        >
          <div data-reveal>
            <div
              className="strategy-tabs"
              role="tablist"
              aria-label="Estrategias"
              aria-orientation="vertical"
            >
              {strategies.map((strategy, index) => (
                <button
                  key={strategy.name}
                  role="tab"
                  id={`strategy-tab-${index}`}
                  aria-controls="strategy-panel"
                  aria-selected={selected === index}
                  tabIndex={selected === index ? 0 : -1}
                  ref={(node) => {
                    tabs.current[index] = node
                  }}
                  onClick={() => choose(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="strategy-tick" />
                  <span className="number">0{index + 1}</span>
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path d={strategy.path} />
                  </svg>
                  <span>{strategy.name}</span>
                </button>
              ))}
            </div>
            {!reduced && (
              <button
                className="cycle-toggle"
                aria-pressed={auto}
                onClick={() => setAuto((value) => !value)}
              >
                {auto ? 'Ⅱ Pausar recorrido' : '▷ Recorrer estrategias'}
              </button>
            )}
          </div>
          <div className="strategy-preview" data-reveal>
            <div
              role="tabpanel"
              id="strategy-panel"
              aria-labelledby={`strategy-tab-${selected}`}
              tabIndex={0}
            >
              <div key={selected} className="strategy-content">
                <div className="preview-top">
                  <span>{current.viz}</span>
                  <span>Vista ilustrativa</span>
                  {cycling && <i className="strategy-progress" />}
                </div>
                <AnimatedChart kind="strategy" strategy={selected} />
                <div className="strategy-copy">
                  <p>{current.desc}</p>
                  <div className="feature-tags">
                    {current.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: 'Instancia dedicada',
    short: 'Instancia',
    desc: 'Desplegamos un motor HyBridge exclusivo para tu operatoria, aislado del resto de los clientes.',
    tags: ['Servidor propio', 'Sesiones FIX propias'],
  },
  {
    title: 'Estrategias y configuración a medida',
    short: 'Configuración',
    desc: 'Configuramos estrategias, parámetros y límites de riesgo según los instrumentos y el estilo de tu mesa.',
    tags: ['Parámetros', 'Límites de riesgo', 'Instrumentos'],
  },
  {
    title: 'Operación y monitoreo',
    short: 'Operación',
    desc: 'Iniciá, ajustá y supervisá cada estrategia en tiempo real desde una consola web.',
    tags: ['Runners', 'Logs en vivo', 'Sesiones FIX'],
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    const list = ref.current
    if (!list) return
    let frame = 0
    const update = () => {
      frame = 0
      const bounds = list.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.5 - bounds.top) / bounds.height),
      )
      fill.current?.style.setProperty(
        'transform',
        `scaleY(${reduced ? 1 : progress})`,
      )
      setActive(Math.min(2, Math.floor(progress * 3)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [reduced])

  return (
    <section
      className="feature-section how-section"
      id="como"
      aria-label="Cómo funciona"
    >
      <div className="container how-layout">
        <div className="how-sticky">
          <SectionHeading
            number="03"
            label="CÓMO FUNCIONA"
            title={
              <>
                De la instalación
                <br />a la operación,
                <br />
                <span>en tres pasos.</span>
              </>
            }
          />
          <div className="step-progress" aria-hidden="true">
            <div className="step-track">
              <div ref={fill} />
            </div>
            <div className="step-labels">
              {steps.map((step, index) => (
                <span
                  key={step.short}
                  className={active === index ? 'active' : ''}
                >
                  0{index + 1} — {step.short}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ol className="how-steps" ref={ref}>
          {steps.map((step, index) => (
            <li
              id={`paso-${index + 1}`}
              key={step.title}
              className={active === index ? 'step-active' : ''}
            >
              <div data-reveal>
                <span className="mono-label">PASO 0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="feature-tags">
                  {step.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function WhyHybridge() {
  return (
    <section
      className="feature-section why-section light-section"
      id="por-que"
      aria-label="Por qué HyBridge"
    >
      <div className="container">
        <SectionHeading
          number="04"
          label="POR QUÉ HYBRIDGE"
          title={
            <>
              Precisión, control y una
              <br />
              <span>infraestructura que es solo tuya.</span>
            </>
          }
        />
        <div className="why-layout">
          <article className="latency-card" data-reveal>
            <span className="mono-label">A / INGENIERÍA</span>
            <h3>Baja latencia</h3>
            <p>
              Motor optimizado para el camino crítico de la orden, desde la
              señal de la estrategia hasta el mercado.
            </p>
            <div className="latency-visual" aria-hidden="true">
              {Array.from({ length: 35 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    height: `${15 + Math.pow(index / 34, 2) * 70}%`,
                    animationDelay: `${index * -0.12}s`,
                  }}
                />
              ))}
            </div>
            <div className="latency-footer">
              <span className="mono-label">DEL MOTOR AL MERCADO</span>
              <strong>Cada instante cuenta.</strong>
              <span>Menos capas. Más capacidad de ejecución.</span>
            </div>
          </article>
          <div className="why-features">
            {[
              [
                'B',
                'Control del riesgo desde la estrategia',
                'Límites, tamaños y condiciones de corte se definen dentro de cada estrategia.',
              ],
              [
                'C',
                'Infraestructura aislada por cliente',
                'Cada cliente opera sobre su propia instancia, sin recursos compartidos.',
              ],
              [
                'D',
                'Soporte local',
                'Un equipo en Argentina, en tu mismo horario y con conocimiento del mercado local.',
              ],
            ].map(([letter, title, desc]) => (
              <article key={letter} data-reveal>
                <span className="mono-label">{letter}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const runners = [
  {
    id: 'MM-AL30',
    strat: 'Market Making',
    inst: 'AL30 · BYMA',
    mkt: 'BYMA',
    mode: 'Cotización continua',
    book: 'AL30',
  },
  {
    id: 'ROLL-DLR',
    strat: 'Rolleo de futuros',
    inst: 'DLR OCT→NOV',
    mkt: 'ROFEX / MATBA',
    mode: 'Ventana de rolleo',
    book: 'DLR NOV',
  },
  {
    id: 'ARB-GGAL',
    strat: 'Arbitraje sintético',
    inst: 'GGAL / GGAL FUT',
    mkt: 'BYMA · ROFEX / MATBA',
    mode: 'Umbral de spread',
    book: 'GGAL',
  },
  {
    id: 'FX-MEP',
    strat: 'FX',
    inst: 'AL30 / AL30D',
    mkt: 'BYMA',
    mode: 'Ejecución coordinada',
    book: 'AL30D',
  },
  {
    id: 'OPT-GFG',
    strat: 'Opciones',
    inst: 'GFG · calls',
    mkt: 'BYMA',
    mode: 'Cobertura de delta',
    book: 'GFGC',
  },
]
const messages = [
  ['MM-AL30', '35=D NewOrderSingle · compra enviada'],
  ['BYMA', '35=8 ExecutionReport · OrdStatus=New'],
  ['MM-AL30', '35=G OrderCancelReplace · punta actualizada'],
  ['ROLL-DLR', 'Rolleo OCT→NOV · pata 1 ejecutada'],
  ['ROFEX', '35=8 ExecutionReport · OrdStatus=Filled'],
  ['ARB-GGAL', 'Spread dentro de rango · sin acción'],
  ['RISK', 'Límites por estrategia verificados'],
  ['XMEV', '35=0 Heartbeat'],
  ['OPT-GFG', 'Cobertura de delta recalculada'],
  ['FX-MEP', 'Patas AL30 / AL30D enviadas en simultáneo'],
  ['ROLL-DLR', 'Rolleo OCT→NOV · pata 2 ejecutada'],
  ['BYMA', '35=0 Heartbeat'],
  ['MM-AL30', '35=F OrderCancelRequest · venta retirada'],
]
const timeFormatter = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'America/Argentina/Buenos_Aires',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})
type Log = { id: number; time: string; src: string; message: string }

export function ConsolePreview() {
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState<Record<string, boolean>>({
    'FX-MEP': true,
  })
  const [live, setLive] = useState(true)
  const [tick, setTick] = useState(0)
  const [clock, setClock] = useState(() => timeFormatter.format(new Date()))
  const [logs, setLogs] = useState<Log[]>(() =>
    messages
      .slice(0, 7)
      .map(([src, message], index) => ({
        id: index,
        time: timeFormatter.format(new Date()),
        src,
        message,
      })),
  )
  const sequence = useRef(7)
  const { ref, visible } = useVisible<HTMLDivElement>()
  const reduced = useReducedMotion()
  const runner = runners[selected]
  const isPaused = !!paused[runner.id]

  useEffect(() => {
    if (!visible || reduced || !live) return
    const timer = window.setInterval(() => {
      if (document.hidden) return
      const now = timeFormatter.format(new Date())
      setClock(now)
      setTick((value) => value + 1)
      for (let i = 0; i < messages.length; i++) {
        const id = sequence.current++
        const [src, message] = messages[id % messages.length]
        if (paused[src]) continue
        setLogs((previous) => [
          ...previous.slice(-6),
          { id, time: now, src, message },
        ])
        break
      }
    }, 1300)
    return () => window.clearInterval(timer)
  }, [visible, reduced, live, paused])

  const toggleRunner = () => {
    setPaused((previous) => ({
      ...previous,
      [runner.id]: !previous[runner.id],
    }))
    setLogs((previous) => [
      ...previous.slice(-6),
      {
        id: sequence.current++,
        time: timeFormatter.format(new Date()),
        src: runner.id,
        message: isPaused
          ? 'Runner reanudado · estrategia activa'
          : 'Runner pausado · envío de órdenes detenido',
      },
    ])
  }

  return (
    <section
      className="feature-section console-section"
      id="consola"
      aria-label="Consola"
    >
      <div className="container">
        <SectionHeading
          number="05"
          label="CONSOLA"
          title={
            <>
              Toda la operación,
              <br />
              <span>en una sola pantalla.</span>
            </>
          }
        >
          Runners, sesiones FIX y logs en vivo desde el navegador. Seleccioná un
          runner para ver su detalle o pausarlo.
        </SectionHeading>
        <div className="console-window" ref={ref} data-reveal>
          <div className="console-titlebar">
            <div>
              <i className="live-dot" />
              <strong>HyBridge Console</strong>
              <span>/ runners</span>
            </div>
            <div>
              <span>Cliente: Mesa demo</span>
              <span>ART {clock}</span>
            </div>
          </div>
          <div className="console-body">
            <aside
              className="console-sidebar"
              aria-label="Módulos de la consola ilustrativa"
            >
              {[
                'Runners',
                'Órdenes',
                'Posiciones',
                'Riesgo',
                'Sesiones FIX',
                'Logs',
              ].map((label, index) => (
                <span key={label} className={index === 0 ? 'current' : ''}>
                  {label}
                </span>
              ))}
              <span className="console-demo-label">ENTORNO DEMO</span>
            </aside>
            <div className="console-main">
              <div className="runner-layout">
                <div className="runner-list">
                  <div className="runner-list-heading">
                    <span className="mono-label">RUNNERS</span>
                    <span>
                      {runners.filter((r) => !paused[r.id]).length} activos /{' '}
                      {runners.length}
                    </span>
                  </div>
                  {runners.map((item, index) => (
                    <button
                      key={item.id}
                      className={`runner-row${selected === index ? ' selected' : ''}`}
                      aria-pressed={selected === index}
                      onClick={() => setSelected(index)}
                      aria-label={`Ver ${item.id}, ${paused[item.id] ? 'pausado' : 'activo'}`}
                    >
                      <span className="runner-identity">
                        <strong>{item.id}</strong>
                        <span>{item.strat}</span>
                      </span>
                      <span className="activity-bars" aria-hidden="true">
                        {Array.from({ length: 16 }, (_, k) => (
                          <i
                            key={k}
                            style={{
                              height: paused[item.id]
                                ? '2px'
                                : `${4 + Math.round((Math.sin((k + index * 3 + tick) * 1.9) + 1) * 7)}px`,
                            }}
                          />
                        ))}
                      </span>
                      <span
                        className={`runner-status${paused[item.id] ? ' paused' : ''}`}
                      >
                        <i />
                        {paused[item.id] ? 'Pausado' : 'Activo'}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="runner-detail">
                  <div className="runner-detail-top">
                    <div>
                      <span className="mono-label">DETALLE</span>
                      <h3>{runner.id}</h3>
                      <p>
                        {runner.strat} · {runner.inst}
                      </p>
                    </div>
                    <button className="console-control" onClick={toggleRunner}>
                      {isPaused ? 'Reanudar' : 'Pausar'}
                    </button>
                  </div>
                  <span className="book-label">
                    Profundidad · {runner.book}
                  </span>
                  <AnimatedChart
                    kind="book"
                    runner={runner.id}
                    active={!isPaused}
                  />
                  <dl>
                    <div>
                      <dt>Estado</dt>
                      <dd className={isPaused ? '' : 'status-active'}>
                        {isPaused ? 'Pausado' : 'Activo'}
                      </dd>
                    </div>
                    <div>
                      <dt>Modo</dt>
                      <dd>{runner.mode}</dd>
                    </div>
                    <div>
                      <dt>Sesión FIX</dt>
                      <dd>{runner.mkt}</dd>
                    </div>
                    <div>
                      <dt>Límites de riesgo</dt>
                      <dd>Activos</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="console-sessions">
                {markets.map((market) => (
                  <div key={market.name}>
                    <span>
                      {market.name}
                      <small>Sesión FIX · conectada</small>
                    </span>
                    <span>
                      <i className="live-dot" />
                      Logon OK
                    </span>
                  </div>
                ))}
              </div>
              <div className="console-logs">
                <div className="log-heading">
                  <span className="mono-label">LOG EN VIVO</span>
                  {!reduced && (
                    <button
                      className="console-control"
                      aria-pressed={live}
                      onClick={() => setLive((value) => !value)}
                    >
                      {live ? 'Pausar logs' : 'Reanudar logs'}
                    </button>
                  )}
                </div>
                <div className="log-lines" aria-label="Mensajes de ejemplo">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`log-line${log.src === runner.id ? ' highlighted' : ''}`}
                    >
                      <time>{log.time}</time>
                      <span>{log.src}</span>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="console-caption">
          Vista ilustrativa. Instrumentos, estados y mensajes de ejemplo.
        </p>
      </div>
    </section>
  )
}
