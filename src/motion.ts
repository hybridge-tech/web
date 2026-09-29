import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduced
}

export function useVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

export function usePageMotion() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal], .hero-content > *, .section-top, .section-heading, .solution, .tech-intro, .tech-features article, .faq-grid > div, .contact-inner > div',
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )
    targets.forEach((node, index) => {
      node.classList.add('reveal')
      node.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`)
      observer.observe(node)
    })
    return () => {
      observer.disconnect()
      targets.forEach((node) => node.classList.remove('reveal', 'is-visible'))
    }
  }, [reduced])

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>('.page-progress')
    let frame = 0
    const update = () => {
      frame = 0
      const height = document.documentElement.scrollHeight - window.innerHeight
      progress?.style.setProperty(
        'transform',
        `scaleX(${height > 0 ? window.scrollY / height : 0})`,
      )
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
  }, [])
}
