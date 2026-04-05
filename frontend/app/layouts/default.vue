<script setup lang="ts">
/**
 * Default layout — navbar + footer wrapping all pages.
 */
</script>

<template>
  <div class="layout">
    <TheNavbar />
    <main class="layout__main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
}
</style>
