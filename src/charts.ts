export type ChartPalette = {
  accent: string
  muted: string
  lineRgb: string
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const rnd = (g: number) => {
  const v = Math.sin(g * 12.9898) * 43758.5453
  return v - Math.floor(v)
}
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
const MONO = '10px ui-monospace, monospace'

function vline(
  ctx: CanvasRenderingContext2D,
  x: number,
  y1: number,
  y2: number,
  c: string,
  lw = 1,
) {
  ctx.strokeStyle = c
  ctx.lineWidth = lw
  ctx.beginPath()
  ctx.moveTo(x, y1)
  ctx.lineTo(x, y2)
  ctx.stroke()
}

export function drawStrategy(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  amp: number,
  s: number,
  palette: ChartPalette,
) {
  const ACCENT = palette.accent
  const L = (a: number | string) => `rgba(${palette.lineRgb},${a})`
  const top = 28,
    base = h - 36,
    H = base - top
  ctx.globalAlpha = amp ? clamp01(t / 0.5) : 1
  ctx.font = MONO
  ctx.fillStyle = palette.muted
  const lab = (txt: string, x: number, align: CanvasTextAlign, c?: string) => {
    ctx.fillStyle = c || palette.muted
    ctx.textAlign = align
    ctx.fillText(txt, x, h - 14)
  }
  if (s === 0) {
    const cx = w / 2 + Math.sin(t * 0.4) * 12 * amp,
      lv = Math.max(10, Math.floor((w / 2 - 40) / 11)),
      step = (w / 2 - 40) / lv,
      gap = 14
    for (let k = 0; k < lv; k++) {
      const d =
        (0.16 + 0.84 * Math.pow((k + 1) / lv, 0.7)) *
        (0.86 + 0.14 * Math.sin(t * 1.4 + k * 1.9))
      const a = (0.18 + 0.34 * (1 - k / lv)).toFixed(3)
      const b0 = k === 0 ? ACCENT : L(a)
      vline(
        ctx,
        cx - gap - k * step,
        base,
        base - H * d * (0.9 + 0.1 * rnd(k + 1)),
        b0,
        k === 0 ? 2 : 1,
      )
      vline(
        ctx,
        cx + gap + k * step,
        base,
        base - H * d * (0.9 + 0.1 * rnd(k + 50)),
        b0,
        k === 0 ? 2 : 1,
      )
    }
    ctx.setLineDash([2, 4])
    vline(ctx, cx, top, base, L(0.22))
    ctx.setLineDash([])
    lab('BID', 20, 'left')
    lab('ASK', w - 20, 'right')
    lab('MID', cx, 'center')
  } else if (s === 1) {
    const q = amp ? (t * 0.11) % 1 : 0.55,
      f = ease((q - 0.1) / 0.65),
      n = 16,
      gw = w * 0.28,
      g1 = w * 0.1,
      g2 = w * 0.62,
      st = gw / n
    for (let k = 0; k < n; k++) {
      const sh = 0.35 + 0.65 * Math.sin((Math.PI * (k + 0.5)) / n)
      vline(ctx, g1 + k * st, base, base - 2 - H * 0.9 * sh * (1 - f), L(0.5))
      vline(ctx, g2 + k * st, base, base - 2 - H * 0.9 * sh * f, L(0.5))
    }
    if (amp && f > 0.02 && f < 0.98)
      for (let j = 0; j < 5; j++) {
        const p = (t * 0.9 + j / 5) % 1,
          x = g1 + gw + (g2 - g1 - gw) * p,
          y = base - H * 0.35
        vline(ctx, x, y - 7, y + 7, ACCENT, 2)
      }
    ctx.strokeStyle = L(0.2)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(g1 - 10, base + 0.5)
    ctx.lineTo(g2 + gw + 10, base + 0.5)
    ctx.stroke()
    lab('OCT', g1 + gw / 2, 'center')
    lab('→', w / 2, 'center')
    lab('NOV', g2 + gw / 2, 'center')
  } else if (s === 2) {
    const sp = 6,
      off = amp ? t * 16 : 40,
      i0 = Math.floor(off),
      fr = off - i0,
      n = Math.ceil(w / sp) + 1,
      mid = top + H * 0.5
    for (let j = 0; j < n; j++) {
      const g = i0 + j,
        x = j * sp - fr * sp
      const a =
        mid + H * 0.16 * Math.sin(g * 0.045) + H * 0.06 * Math.sin(g * 0.13)
      const spr =
          H * (0.13 + 0.13 * Math.sin(g * 0.027) + 0.05 * Math.sin(g * 0.09)),
        ex = spr > H * 0.25
      vline(ctx, x, a - spr / 2, a + spr / 2, ex ? ACCENT : L(0.26), ex ? 2 : 1)
      ctx.fillStyle = L(0.7)
      ctx.fillRect(x - 1, a - spr / 2 - 1, 2, 2)
      ctx.fillRect(x - 1, a + spr / 2 - 1, 2, 2)
    }
    lab('SPREAD OBSERVADO', 20, 'left')
    lab('EJECUCIÓN', w - 20, 'right', ACCENT)
  } else if (s === 3) {
    const x0 = 72,
      y1 = top + H * 0.28,
      y2 = top + H * 0.72
    ctx.strokeStyle = L(0.22)
    ctx.lineWidth = 1
    ;[y1, y2].forEach((y) => {
      ctx.beginPath()
      ctx.moveTo(x0, y + 0.5)
      ctx.lineTo(w - 16, y + 0.5)
      ctx.stroke()
    })
    ctx.fillStyle = palette.muted
    ctx.textAlign = 'left'
    ctx.fillText('AL30', 18, y1 + 3)
    ctx.fillText('AL30D', 18, y2 + 3)
    const sp = 8,
      off = amp ? t * 12 : 30,
      i0 = Math.floor(off),
      fr = off - i0,
      n = Math.ceil((w - x0) / sp) + 1
    for (let j = 0; j < n; j++) {
      const g = i0 + j,
        x = x0 + j * sp - fr * sp
      if (x < x0 || x > w - 16) continue
      if (rnd(g) < 0.07) {
        vline(ctx, x, y1 - 9, y1 + 9, ACCENT, 2)
        vline(ctx, x, y2 - 9, y2 + 9, ACCENT, 2)
        ctx.setLineDash([2, 3])
        vline(ctx, x, y1 + 10, y2 - 10, L(0.5))
        ctx.setLineDash([])
      } else {
        if (rnd(g + 7) < 0.3) vline(ctx, x, y1 - 4, y1 + 4, L(0.4))
        if (rnd(g + 13) < 0.3) vline(ctx, x, y2 - 4, y2 + 4, L(0.4))
      }
    }
    lab('OPERACIONES DE MERCADO', 20, 'left')
    lab('EJECUCIÓN COORDINADA', w - 20, 'right', ACCENT)
  } else {
    const y0 = top + H * 0.72,
      K = 0.5,
      tau = 0.07 + 0.035 * Math.sin(t * 0.35),
      prem = 0.06,
      sc = H * 1.3
    for (let x = 12; x < w - 12; x += 6) {
      const S = x / w,
        v = tau * Math.log(1 + Math.exp((S - K) / tau)) - prem
      vline(ctx, x, y0, y0 - v * sc, v >= 0 ? L(0.42) : L(0.2))
    }
    ctx.setLineDash([3, 4])
    ctx.strokeStyle = L(0.55)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(12, y0 + prem * sc)
    ctx.lineTo(K * w, y0 + prem * sc)
    ctx.lineTo(w - 12, y0 + prem * sc - (1 - 12 / w - K) * sc)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.strokeStyle = L(0.3)
    ctx.beginPath()
    ctx.moveTo(12, y0 + 0.5)
    ctx.lineTo(w - 12, y0 + 0.5)
    ctx.stroke()
    const xu = (0.5 + (amp ? 0.2 * Math.sin(t * 0.45) : 0.12)) * w
    vline(ctx, xu, top, base, ACCENT, 2)
    ctx.fillStyle = ACCENT
    ctx.textAlign = 'left'
    ctx.fillText('SUBYACENTE', xu + 8, top + 10)
    lab('K', K * w, 'center')
    lab('RESULTADO AL VENCIMIENTO', 20, 'left')
    lab('CON VALOR TIEMPO', w - 20, 'right')
  }
  ctx.globalAlpha = 1
}
export function drawBook(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  amp: number,
  id: string,
  on: boolean,
  palette: ChartPalette,
) {
  const ACCENT = palette.accent
  const L = (a: number | string) => `rgba(${palette.lineRgb},${a})`
  const seed = id.length * 13 + id.charCodeAt(0)
  const cx = w / 2,
    lv = Math.max(8, Math.floor((w / 2 - 16) / 8)),
    step = (w / 2 - 16) / lv,
    base = h - 2,
    H = h - 10
  for (let k = 0; k < lv; k++) {
    const d =
      (0.2 + 0.8 * Math.pow((k + 1) / lv, 0.6)) *
      (0.8 + 0.2 * rnd(seed + k)) *
      (0.9 + 0.1 * Math.sin(t * 1.5 * amp + k * 2.1))
    const d2 =
      (0.2 + 0.8 * Math.pow((k + 1) / lv, 0.6)) *
      (0.8 + 0.2 * rnd(seed + k + 99)) *
      (0.9 + 0.1 * Math.sin(t * 1.3 * amp + k * 1.7))
    const a = L((0.2 + 0.35 * (1 - k / lv)).toFixed(3)),
      c0 = k === 0 && on ? ACCENT : a,
      lw = k === 0 && on ? 2 : 1
    vline(ctx, cx - 8 - k * step, base, base - H * d, c0, lw)
    vline(ctx, cx + 8 + k * step, base, base - H * d2, c0, lw)
  }
}
