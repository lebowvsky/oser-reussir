<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-layout__sidebar">
      <nav>
        <RouterLink to="/admin" class="admin-layout__link">
          Dashboard
        </RouterLink>
      </nav>
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

  &__sidebar {
    width: 240px;
    background-color: $color-sidebar-bg;
    padding: $spacing-lg;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    padding: $spacing-xl;
    background-color: $color-background;
  }

  &__link {
    display: block;
    color: $color-sidebar-text;
    text-decoration: none;
    padding: $spacing-sm $spacing-md;
    border-radius: 6px;

    &:hover,
    &.router-link-active {
      background-color: $color-primary;
      color: $color-white;
    }
  }
}
</style>
