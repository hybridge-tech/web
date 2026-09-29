import { useEffect, useRef } from 'react'
import { drawBook, drawStrategy } from './charts'
import { useReducedMotion } from './motion'

type Props = {
  kind: 'hero' | 'strategy' | 'book'
  strategy?: number
  runner?: string
  active?: boolean
}

export default function AnimatedChart({
  kind,
  strategy = 0,
  runner = 'MM-AL30',
  active = true,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let visible = false
    const start = performance.now()
    const draw = (now: number) => {
      frame = 0
      const w = canvas.clientWidth,
        h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (!w || !h) return
      if (
        canvas.width !== Math.round(w * dpr) ||
        canvas.height !== Math.round(h * dpr)
      ) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const t = reduced ? 20 : (now - start) / 1000
      const amp = reduced ? 0 : 1
      if (kind === 'strategy') drawStrategy(ctx, w, h, t, amp, strategy)
      else if (kind === 'book') drawBook(ctx, w, h, t, amp, runner, active)
      else {
        const base = h * 0.77,
          peak = 0.72,
          maxH = h * 0.6
        const count = Math.ceil(w / 10)
        const entrance = reduced ? 1 : Math.min(1, t / 1.8)
        const grow = 1 - Math.pow(1 - entrance, 3)
        for (let i = 0; i <= count; i++) {
          const x = i * 10,
            nx = i / count
          const profile =
            nx < peak
              ? 0.08 + 0.92 * Math.pow(nx / peak, 1.7)
              : 1 - Math.pow((nx - peak) / (1 - peak), 0.9) * 0.84
          const pulse =
            Math.max(0, 1 - Math.abs(nx - (((t * 0.08) % 1.6) - 0.3)) / 0.065) *
            amp
          const height =
            maxH *
            profile *
            grow *
            (1 + Math.sin(t * 0.8 + i * 0.3) * 0.018 * amp)
          ctx.strokeStyle =
            Math.abs(nx - 0.69) < 0.006
              ? '#b5f5c6'
              : `rgba(220,238,224,${0.09 + profile * 0.26 + pulse * 0.4})`
          ctx.lineWidth = Math.abs(nx - 0.69) < 0.006 ? 2 : 1
          ctx.beginPath()
          ctx.moveTo(x, base)
          ctx.lineTo(x, base - height)
          ctx.stroke()
          ctx.globalAlpha = 0.15
          ctx.beginPath()
          ctx.moveTo(x, base + 5)
          ctx.lineTo(x, base + 5 + height * 0.16)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
      if (!reduced && visible && !document.hidden)
        frame = requestAnimationFrame(draw)
    }
    const restart = () => {
      cancelAnimationFrame(frame)
      frame = 0
      if (visible && !document.hidden) draw(performance.now())
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      restart()
    })
    observer.observe(canvas)
    const resize = new ResizeObserver(restart)
    resize.observe(canvas)
    document.addEventListener('visibilitychange', restart)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resize.disconnect()
      document.removeEventListener('visibilitychange', restart)
    }
  }, [kind, strategy, runner, active, reduced])

  return (
    <canvas
      ref={ref}
      className={`animated-chart chart-${kind}`}
      aria-hidden="true"
    />
  )
}
