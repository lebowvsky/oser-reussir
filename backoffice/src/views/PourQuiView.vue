<script setup lang="ts">
import { Users } from 'lucide-vue-next'
</script>

<template>
  <div class="view">
    <header class="view__header">
      <Users :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Pour qui ?</h1>
        <p class="view__description">
          Gérez les profils cibles et les cartes de la section « Pour qui ? ».
        </p>
      </div>
    </header>
    <div class="view__placeholder">
      <p>Les formulaires d'édition seront disponibles une fois l'API connectée.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view {
  max-width: 800px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }

  &__icon {
    color: $color-primary;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__placeholder {
    background-color: $color-surface;
    border: 1px dashed $color-border;
    border-radius: $radius-md;
    padding: $spacing-xl;
    text-align: center;
    color: $color-text-muted;
    font-size: $font-size-sm;
  }
}
</style>
