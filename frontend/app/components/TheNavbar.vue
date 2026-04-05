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

<style scoped lang="scss">
@use "~/assets/styles" as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: $header-height;
  background-color: transparent;
  transition: background-color $duration-medium $ease,
    box-shadow $duration-medium $ease,
    backdrop-filter $duration-medium $ease;
}

.navbar--scrolled {
  background-color: alpha("cream", 0.92);
  box-shadow: $shadow-soft;
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: $spacing-lg;
}

.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  font-family: $font-display;
  font-size: $font-size-lg;
  font-weight: 700;
  color: color("ink");
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
  gap: $spacing-lg;
}

.navbar__link {
  position: relative;
  font-size: $font-size-sm;
  font-weight: 600;
  color: color("ink-soft");
  padding: $spacing-2xs 0;
  transition: color $duration-fast $ease;
}
.navbar__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -4px;
  height: 2px;
  background-color: color("primary");
  border-radius: $radius-pill;
  transition: right $duration-medium $ease;
}
.navbar__link:hover {
  color: color("primary");
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
  border-radius: $radius-pill;
  gap: 5px;
  transition: background-color $duration-fast $ease;
}
.navbar__burger:hover {
  background-color: alpha("primary", 0.08);
}
.navbar__burger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: color("ink");
  border-radius: 2px;
  transition: transform $duration-medium $ease,
    opacity $duration-fast $ease;
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
  top: $header-height;
  left: 0;
  right: 0;
  background-color: color("cream");
  border-top: 1px solid color("border");
  box-shadow: $shadow-medium;
  padding: $spacing-lg;
}

.navbar__drawer-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.navbar__drawer-link {
  display: block;
  padding: $spacing-md;
  font-size: $font-size-md;
  font-weight: 600;
  color: color("ink");
  border-radius: $radius-md;
  transition: background-color $duration-fast $ease,
    color $duration-fast $ease;
}
.navbar__drawer-link:hover {
  background-color: color("sand");
  color: color("primary");
}

.navbar__drawer-cta {
  width: 100%;
  margin-top: $spacing-sm;
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
