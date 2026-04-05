<script setup lang="ts">
/**
 * Page d'accueil — one-pager Oser Réussir.
 * Scroll reveal activé globalement pour toute la page.
 */
definePageMeta({
  title: 'Accueil',
  layout: 'default',
})

useHead({
  title: 'Oser Réussir — Coaching scolaire individuel',
  meta: [
    {
      name: 'description',
      content:
        "Oser Réussir : coaching scolaire individuel pour collégiens, lycéens et étudiants. Retrouver confiance, dépasser les blocages et avancer dans son parcours. Première séance offerte.",
    },
    {
      property: 'og:title',
      content: 'Oser Réussir — Coaching scolaire individuel',
    },
    {
      property: 'og:description',
      content:
        "Accompagnement bienveillant pour les jeunes qui manquent de confiance, se démotivent ou cherchent du sens dans leur parcours scolaire.",
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
  ],
})

useScrollReveal()
</script>

<template>
  <div class="home">
    <SectionHero />
    <SectionApropos />
    <SectionPourQui />
    <SectionAccompagnement />
    <SectionValeurs />
    <SectionPourquoi />
    <SectionContact />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
