<script setup lang="ts">
/**
 * @pattern State + Observer
 * @purpose Tracks scroll position to toggle visual state (transparent/opaque)
 *          and manages the mobile drawer state.
 */
interface NavAnchor {
  href: string
  label: string
}

const anchors: readonly NavAnchor[] = [
  { href: '#apropos', label: 'À propos' },
  { href: '#pourqui', label: 'Pour qui ?' },
  { href: '#accompagnement', label: 'Accompagnement' },
  { href: '#valeurs', label: 'Valeurs' },
  { href: '#pourquoi', label: 'Pourquoi ?' },
  { href: '#contact', label: 'Contact' },
] as const

const logoSrc = '/logo.png'
const scrolled = ref<boolean>(false)
const menuOpen = ref<boolean>(false)

const onScroll = (): void => {
  scrolled.value = window.scrollY > 24
}

const toggleMenu = (): void => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = (): void => {
  menuOpen.value = false
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }"
    role="banner"
  >
    <div class="navbar__inner container">
      <a
        href="#hero"
        class="navbar__brand"
        aria-label="Oser Réussir — retour en haut"
        @click="closeMenu"
      >
        <img
          :src="logoSrc"
          alt=""
          aria-hidden="true"
          class="navbar__brand-logo"
          width="40"
          height="40"
        />
        <span class="navbar__brand-text">Oser Réussir</span>
      </a>

      <nav class="navbar__nav" aria-label="Navigation principale">
        <ul class="navbar__list">
          <li v-for="link in anchors" :key="link.href">
            <a :href="link.href" class="navbar__link">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="navbar__burger"
        :aria-expanded="menuOpen"
        aria-controls="mobile-drawer"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="toggleMenu"
      >
        <span class="navbar__burger-bar" aria-hidden="true"></span>
        <span class="navbar__burger-bar" aria-hidden="true"></span>
        <span class="navbar__burger-bar" aria-hidden="true"></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div
      id="mobile-drawer"
      class="navbar__drawer"
      :hidden="!menuOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <ul class="navbar__drawer-list">
        <li v-for="link in anchors" :key="link.href">
          <a :href="link.href" class="navbar__drawer-link" @click="closeMenu">
            {{ link.label }}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            class="btn btn--primary navbar__drawer-cta"
            @click="closeMenu"
          >
            Prendre rendez-vous
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--navbar-height);
  background-color: transparent;
  transition: background-color var(--dur-med) var(--ease),
    box-shadow var(--dur-med) var(--ease),
    backdrop-filter var(--dur-med) var(--ease);
}

.navbar--scrolled {
  background-color: rgba(251, 246, 239, 0.92);
  box-shadow: var(--shadow-soft);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: var(--space-lg);
}

.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-display);
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--color-text);
}
.navbar__brand-logo {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.navbar__brand-text {
  letter-spacing: 0.01em;
}

.navbar__nav {
  display: none;
}

.navbar__list {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.navbar__link {
  position: relative;
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text-soft);
  padding: var(--space-2xs) 0;
  transition: color var(--dur-fast) var(--ease);
}
.navbar__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -4px;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: var(--radius-pill);
  transition: right var(--dur-med) var(--ease);
}
.navbar__link:hover {
  color: var(--color-primary);
}
.navbar__link:hover::after {
  right: 0;
}

/* Burger */
.navbar__burger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-pill);
  gap: 5px;
  transition: background-color var(--dur-fast) var(--ease);
}
.navbar__burger:hover {
  background-color: hsl(var(--h-primary) var(--s-primary) 42% / 0.08);
}
.navbar__burger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: transform var(--dur-med) var(--ease),
    opacity var(--dur-fast) var(--ease);
}
.navbar--open .navbar__burger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar--open .navbar__burger-bar:nth-child(2) {
  opacity: 0;
}
.navbar--open .navbar__burger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Drawer */
.navbar__drawer {
  position: absolute;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  background-color: var(--color-cream);
  border-top: 1px solid var(--color-border);
  box-shadow: var(--shadow-medium);
  padding: var(--space-lg);
}

.navbar__drawer-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.navbar__drawer-link {
  display: block;
  padding: var(--space-md);
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--color-text);
  border-radius: var(--radius-md);
  transition: background-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}
.navbar__drawer-link:hover {
  background-color: var(--color-sand);
  color: var(--color-primary);
}

.navbar__drawer-cta {
  width: 100%;
  margin-top: var(--space-sm);
}

/* Desktop */
@media (min-width: 960px) {
  .navbar__nav {
    display: block;
  }
  .navbar__burger,
  .navbar__drawer {
    display: none;
  }
}
</style>
