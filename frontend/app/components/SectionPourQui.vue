<script setup lang="ts">
/**
 * Pour qui ? — cards with inline SVG icons for target profiles.
 */
interface ProfilCard {
  readonly id: string
  readonly titre: string
  readonly texte: string
  readonly icon: 'heart' | 'spark' | 'grid' | 'question' | 'compass'
}

const profils: readonly ProfilCard[] = [
  {
    id: 'confiance',
    titre: 'Manque de confiance',
    texte:
      'Quand la peur de se tromper ou le regard des autres prend le dessus sur l\'envie d\'avancer.',
    icon: 'heart',
  },
  {
    id: 'demotivation',
    titre: 'Démotivation',
    texte:
      'Quand l\'école a perdu son sens et que la motivation s\'est éteinte au fil du temps.',
    icon: 'spark',
  },
  {
    id: 'organisation',
    titre: 'Difficultés d\'organisation',
    texte:
      'Quand gérer son travail, ses révisions et son temps devient une source de stress.',
    icon: 'grid',
  },
  {
    id: 'doute',
    titre: 'Doute sur ses capacités',
    texte:
      'Quand le jeune se compare, se dévalorise et n\'ose plus croire en ses propres ressources.',
    icon: 'question',
  },
  {
    id: 'sens',
    titre: 'Perte de sens',
    texte:
      'Quand l\'orientation ou les apprentissages semblent flous, et que l\'on ne sait plus où aller.',
    icon: 'compass',
  },
] as const
</script>

<template>
  <section id="pourqui" class="pourqui section" aria-labelledby="pourqui-title">
    <div class="container">
      <header class="pourqui__header" data-reveal>
        <span class="section__eyebrow">Pour qui ?</span>
        <h2 id="pourqui-title" class="section__title">
          Un accompagnement pour les collégiens, lycéens et étudiants.
        </h2>
        <p class="section__lede">
          Le coaching scolaire s'adresse aux jeunes qui traversent un moment
          plus difficile, et qui ont besoin d'un espace dédié pour retrouver
          leur élan.
        </p>
      </header>

      <ul class="pourqui__grid">
        <li
          v-for="profil in profils"
          :key="profil.id"
          class="pourqui__card"
          data-reveal
        >
          <span class="pourqui__icon" aria-hidden="true">
            <!-- heart -->
            <svg
              v-if="profil.icon === 'heart'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
            <!-- spark -->
            <svg
              v-else-if="profil.icon === 'spark'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2v6M12 16v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M2 12h6M16 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3" />
            </svg>
            <!-- grid -->
            <svg
              v-else-if="profil.icon === 'grid'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <!-- question -->
            <svg
              v-else-if="profil.icon === 'question'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
              <path d="M12 17h.01" />
            </svg>
            <!-- compass -->
            <svg
              v-else
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          <h3 class="pourqui__card-title">{{ profil.titre }}</h3>
          <p class="pourqui__card-text">{{ profil.texte }}</p>
        </li>
      </ul>

      <aside class="pourqui__note" data-reveal>
        <span class="pourqui__note-tag" aria-hidden="true">Important</span>
        <p>
          <strong>Le coaching n'est pas du soutien scolaire.</strong>
          Il ne remplace pas les cours particuliers ni l'aide aux devoirs&nbsp;:
          il aide le jeune à mieux se connaître, à identifier ce qui bloque et à
          retrouver sa propre dynamique d'apprentissage.
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.pourqui {
  background-color: color("surface");
}

.pourqui__header {
  max-width: 44rem;
  margin-bottom: $spacing-2xl;
}

.pourqui__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
  margin-bottom: $spacing-2xl;
}

.pourqui__card {
  background-color: color("cream");
  border: 1px solid color("border");
  border-radius: $radius-lg;
  padding: $spacing-xl;
  transition: transform $duration-medium $ease,
    box-shadow $duration-medium $ease,
    border-color $duration-medium $ease;
}

.pourqui__card:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-medium;
  border-color: tint("terracotta", 14);
}

.pourqui__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: $radius-md;
  background-color: alpha("terracotta", 0.12);
  color: color("terracotta");
  margin-bottom: $spacing-md;
}

.pourqui__card-title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-xs;
}

.pourqui__card-text {
  font-size: $font-size-sm;
  color: color("ink-soft");
}

.pourqui__note {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
  padding: $spacing-lg $spacing-xl;
  background: linear-gradient(
    135deg,
    color("sand") 0%,
    alpha("sage-soft", 0.2) 100%
  );
  border-left: 4px solid color("primary");
  border-radius: $radius-md;
}

.pourqui__note-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background-color: shade("primary", 16);
  color: color("surface");
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: $radius-pill;
  flex-shrink: 0;
}

.pourqui__note p {
  font-size: $font-size-md;
  color: color("ink");
  margin: 0;
}

.pourqui__note strong {
  color: shade("primary", 16);
  font-weight: 700;
}

@include respond-above($breakpoint-sm) {
  .pourqui__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 980px) {
  .pourqui__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 560px) {
  .pourqui__note {
    flex-direction: column;
    padding: $spacing-lg;
  }
}
</style>
