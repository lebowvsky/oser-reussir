/**
 * @pattern Observer Pattern
 * @category Behavioral
 * @purpose Reveals elements marked with `data-reveal` as they enter the viewport,
 *          using a single shared IntersectionObserver for performance.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * useScrollReveal()
 * </script>
 *
 * <template>
 *   <div data-reveal>I fade in on scroll</div>
 * </template>
 * ```
 */
export interface ScrollRevealOptions {
  /** Root margin passed to IntersectionObserver. */
  rootMargin?: string
  /** Intersection threshold ratio (0..1). */
  threshold?: number
  /** CSS class added when the element enters the viewport. */
  visibleClass?: string
  /** Attribute used to identify targets. */
  selector?: string
  /** Unobserve after first reveal (default: true). */
  once?: boolean
}

export function useScrollReveal(options: ScrollRevealOptions = {}): void {
  const {
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.12,
    visibleClass = 'is-visible',
    selector = '[data-reveal]',
    once = true,
  } = options

  let observer: IntersectionObserver | null = null

  const reduceMotion = (): boolean => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const init = (): void => {
    if (typeof window === 'undefined') return

    const targets = document.querySelectorAll<HTMLElement>(selector)

    if (reduceMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add(visibleClass))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass)
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove(visibleClass)
          }
        })
      },
      { rootMargin, threshold },
    )

    targets.forEach((el) => observer?.observe(el))
  }

  onMounted(() => {
    // Defer to next tick so freshly rendered DOM nodes are picked up.
    nextTick(init)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
