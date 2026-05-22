import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal – attaches a GSAP ScrollTrigger fade+rise animation
 * to every element with class "reveal" inside the given container ref.
 */
export function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll('.reveal')
    if (!els.length) return

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: (el.dataset.delay || 0) + i * 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
