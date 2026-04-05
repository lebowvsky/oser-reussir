<script setup lang="ts">
const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Dashboard</h1>
    <p class="dashboard__api">API : {{ apiBase }}</p>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  &__title {
    font-size: $font-size-2xl;
    color: $color-text;
    margin-bottom: $spacing-md;
  }

  &__api {
    color: $color-text-muted;
  }
}
</style>
