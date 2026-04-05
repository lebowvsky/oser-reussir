<script setup lang="ts">
interface NavLink {
  to: string
  label: string
}

const links: NavLink[] = [
  { to: '/', label: 'Accueil' },
]
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand" aria-label="Oser Réussir - Accueil">
        <img src="/logo.png" alt="" class="app-header__logo" width="48" height="48">
        <span class="app-header__title">Oser Réussir</span>
      </NuxtLink>

      <nav class="app-header__nav" aria-label="Navigation principale">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app-header__link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: $header-height;
  background-color: color("surface");
  border-bottom: 1px solid color("border");
  box-shadow: $shadow-sm;

  &__inner {
    @include container;
    @include flex-between;
    height: 100%;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    color: color("text");
    font-weight: 700;
    text-decoration: none;

    &:hover {
      color: color("primary");
      text-decoration: none;
    }

    &:focus-visible {
      @include focus-ring;
      border-radius: $radius-sm;
    }
  }

  &__logo {
    display: block;
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  &__title {
    font-size: $font-size-xl;
    letter-spacing: 0.01em;

    @include respond-below($breakpoint-sm) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
  }

  &__link {
    position: relative;
    padding: $spacing-xs 0;
    color: color("text-muted");
    font-weight: 500;
    text-decoration: none;
    transition: color 150ms ease;

    &:hover,
    &.router-link-active {
      color: color("primary");
      text-decoration: none;
    }

    &.router-link-active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -#{$spacing-xs};
      height: 2px;
      background-color: color("primary");
      border-radius: $radius-sm;
    }

    &:focus-visible {
      @include focus-ring;
      border-radius: $radius-sm;
    }
  }
}
</style>
