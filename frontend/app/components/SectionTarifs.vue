<script setup lang="ts">
/**
 * Tarifs — grille de 1 à 5 tarifs éditables depuis le backoffice.
 * Les données proviennent du composable partagé `useTarifs()` (également
 * consommé par TheNavbar pour l'affichage conditionnel de l'ancre) :
 * l'endpoint public `GET /tarifs` ne renvoie que les tarifs actifs, déjà
 * triés, aucun filtre ni tri n'est refait ici. Aucun fallback : si la liste
 * est vide (ou l'API en erreur), la section entière est masquée via `v-if`.
 */

const { data: tarifs } = await useTarifs()
</script>

<template>
  <section
    v-if="tarifs.length"
    id="tarifs"
    class="tarifs section"
    aria-labelledby="tarifs-title"
  >
    <div class="container">
      <header class="tarifs__header" data-reveal>
        <span class="section__eyebrow">Tarifs</span>
        <h2 id="tarifs-title" class="section__title">
          Des tarifs clairs, sans engagement
        </h2>
        <p class="section__lede">
          La première séance bilan est offerte. Ensuite, chaque accompagnement
          se construit au rythme du jeune : vous savez toujours à quoi vous
          attendre, sans forfait imposé.
        </p>
      </header>

      <ul class="tarifs__grid">
        <li
          v-for="tarif in tarifs"
          :key="tarif.id"
          class="tarifs__card"
          data-reveal
        >
          <h3 class="tarifs__card-title">{{ tarif.title }}</h3>
          <p class="tarifs__card-price">{{ tarif.price }}</p>
          <p class="tarifs__card-text">{{ tarif.description }}</p>
        </li>
      </ul>

      <div class="tarifs__cta" data-reveal>
        <a href="#contact" class="btn btn--primary">
          Réserver la séance offerte
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.tarifs {
  // Transition douce entre SectionTemoignages (surface blanche, en amont)
  // et SectionContact (cream, en aval).
  background: linear-gradient(
    180deg,
    color("surface") 0%,
    color("cream") 100%
  );
}

.tarifs__header {
  max-width: 44rem;
  margin-bottom: $spacing-2xl;
  text-align: center;
  margin-inline: auto;
}

.tarifs__header .section__lede {
  margin-inline: auto;
}

// Flex wrap centré plutôt qu'une grille figée : le nombre de cartes varie de
// 1 à 5, la dernière ligne reste ainsi toujours centrée et équilibrée.
.tarifs__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-lg;
  margin: 0;
}

.tarifs__card {
  display: flex;
  flex-direction: column;
  flex: 1 1 260px;
  max-width: 320px;
  padding: $spacing-xl $spacing-lg;
  background-color: color("surface");
  border: 1px solid color("border");
  border-radius: $radius-lg;
  transition: transform $duration-medium $ease,
    box-shadow $duration-medium $ease;
}

.tarifs__card:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-medium;
}

.tarifs__card-title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-xs;
}

.tarifs__card-price {
  font-family: $font-display;
  font-size: $font-size-2xl;
  font-weight: 700;
  line-height: $line-height-tight;
  color: color("primary");
  margin-bottom: $spacing-md;
}

// `margin-top: auto` aligne les descriptions en bas de carte lorsque les
// titres n'ont pas la même hauteur sur une ligne.
.tarifs__card-text {
  margin-top: auto;
  font-size: $font-size-sm;
  color: color("ink-soft");
}

.tarifs__cta {
  display: flex;
  justify-content: center;
  margin-top: $spacing-2xl;
}

@media (prefers-reduced-motion: reduce) {
  .tarifs__card:hover {
    transform: none;
  }
}

@include respond-above($breakpoint-lg) {
  .tarifs__grid {
    gap: $spacing-xl;
  }
  .tarifs__card {
    padding: $spacing-xl;
  }
}
</style>
