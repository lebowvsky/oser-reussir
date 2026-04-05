<script setup lang="ts">
useHead({
  titleTemplate: "%s — Oser Réussir",
  meta: [{ name: "description", content: "Plateforme Oser Réussir" }],
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
