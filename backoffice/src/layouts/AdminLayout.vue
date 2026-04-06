<script setup lang="ts">
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Sparkles,
  UserRound,
  Users,
  HandHeart,
  Heart,
  HelpCircle,
  Mail,
  Share2,
  LogOut,
} from 'lucide-vue-next'
import type { Component } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface NavItem {
  label: string
  to: string
  icon: Component
}

const sectionLinks: readonly NavItem[] = [
  { label: 'Hero', to: '/admin/hero', icon: Sparkles },
  { label: 'À propos', to: '/admin/apropos', icon: UserRound },
  { label: 'Pour qui ?', to: '/admin/pour-qui', icon: Users },
  { label: 'Accompagnement', to: '/admin/accompagnement', icon: HandHeart },
  { label: 'Valeurs', to: '/admin/valeurs', icon: Heart },
  { label: 'Pourquoi ?', to: '/admin/pourquoi', icon: HelpCircle },
  { label: 'Contact', to: '/admin/contact', icon: Mail },
]

const utilLinks: readonly NavItem[] = [
  { label: 'Réseaux sociaux', to: '/admin/reseaux-sociaux', icon: Share2 },
]

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const onLogout = (): void => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <!-- Brand -->
      <div class="sidebar__brand">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="sidebar__logo"
          width="40"
          height="40"
        />
        <span class="sidebar__title">Oser Réussir</span>
      </div>

      <!-- Section nav -->
      <nav class="sidebar__nav" aria-label="Navigation sections">
        <RouterLink
          v-for="item in sectionLinks"
          :key="item.to"
          :to="item.to"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': route.path === item.to }"
        >
          <component :is="item.icon" :size="18" :stroke-width="2" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Separator -->
      <hr class="sidebar__separator" />

      <!-- Utility nav -->
      <nav class="sidebar__nav" aria-label="Navigation utilitaires">
        <RouterLink
          v-for="item in utilLinks"
          :key="item.to"
          :to="item.to"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': route.path === item.to }"
        >
          <component :is="item.icon" :size="18" :stroke-width="2" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Logout -->
      <div class="sidebar__footer">
        <button class="sidebar__logout" @click="onLogout">
          <LogOut :size="18" :stroke-width="2" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <main class="admin-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;

  &__content {
    flex: 1;
    padding: $spacing-xl;
    background-color: $color-background;
    min-width: 0;
  }
}

.sidebar {
  width: $sidebar-width;
  background-color: $color-sidebar-bg;
  padding: $spacing-lg;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &__brand {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm;
    margin-bottom: $spacing-xl;
  }

  &__logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: $radius-sm;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-white;
    letter-spacing: 0.01em;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    color: $color-sidebar-text;
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    font-weight: 600;
    transition: background-color $duration-fast $ease,
      color $duration-fast $ease;

    &:hover {
      background-color: $color-sidebar-hover;
      color: $color-white;
    }

    &--active {
      background-color: $color-primary;
      color: $color-white;
    }
  }

  &__separator {
    border: none;
    border-top: 1px solid $color-sidebar-hover;
    margin: $spacing-md 0;
  }

  &__footer {
    margin-top: auto;
    padding-top: $spacing-md;
    border-top: 1px solid $color-sidebar-hover;
  }

  &__logout {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    color: $color-sidebar-text;
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-md;
    border: none;
    background: none;
    font-family: $font-body;
    font-size: $font-size-sm;
    font-weight: 600;
    cursor: pointer;
    transition: background-color $duration-fast $ease,
      color $duration-fast $ease;

    &:hover {
      background-color: hsla(0, 72%, 51%, 0.15);
      color: hsl(0, 72%, 70%);
    }
  }
}
</style>
