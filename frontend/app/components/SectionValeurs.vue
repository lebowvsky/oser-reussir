<script setup lang="ts">
/**
 * Valeurs — 4 blocs : Écoute, Confiance, Autonomie, Connaissance du système.
 */
interface Valeur {
  readonly id: string
  readonly titre: string
  readonly texte: string
  readonly icon: 'ear' | 'shield' | 'wings' | 'book'
}

const valeurs: readonly Valeur[] = [
  {
    id: 'ecoute',
    titre: 'Écoute',
    texte:
      'Chaque jeune est accueilli avec son histoire, son rythme, ses émotions et ses propres mots.',
    icon: 'ear',
  },
  {
    id: 'confiance',
    titre: 'Confiance',
    texte:
      'Retrouver confiance en ses capacités, en son jugement et en sa propre façon d\'apprendre.',
    icon: 'shield',
  },
  {
    id: 'autonomie',
    titre: 'Autonomie',
    texte:
      'Transmettre des outils durables, des repères et des méthodes que le jeune pourra mobiliser seul.',
    icon: 'wings',
  },
  {
    id: 'systeme',
    titre: 'Connaissance du système scolaire',
    texte:
      'Plus de vingt ans d\'expérience d\'enseignante pour comprendre les réalités concrètes du parcours.',
    icon: 'book',
  },
] as const
</script>

<template>
  <section id="valeurs" class="valeurs section" aria-labelledby="valeurs-title">
    <div class="container">
      <header class="valeurs__header" data-reveal>
        <span class="section__eyebrow">Valeurs</span>
        <h2 id="valeurs-title" class="section__title">
          Quatre valeurs au cœur de chaque accompagnement.
        </h2>
      </header>

      <ul class="valeurs__grid">
        <li
          v-for="valeur in valeurs"
          :key="valeur.id"
          class="valeurs__card"
          data-reveal
        >
          <span class="valeurs__icon" aria-hidden="true">
            <!-- ear -->
            <svg
              v-if="valeur.icon === 'ear'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8.5a6.5 6.5 0 0 1 13 0c0 6-6 6-6 10a3.5 3.5 0 0 1-7 0" />
              <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
            </svg>
            <!-- shield -->
            <svg
              v-else-if="valeur.icon === 'shield'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <!-- wings -->
            <svg
              v-else-if="valeur.icon === 'wings'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2v20" />
              <path d="M12 7c-3 0-7 1-9 4 2 1 5 2 9 2" />
              <path d="M12 7c3 0 7 1 9 4-2 1-5 2-9 2" />
              <path d="M12 14c-2 0-5 .5-7 2 1.5 1 4 2 7 2" />
              <path d="M12 14c2 0 5 .5 7 2-1.5 1-4 2-7 2" />
            </svg>
            <!-- book -->
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
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </span>
          <h3 class="valeurs__card-title">{{ valeur.titre }}</h3>
          <p class="valeurs__card-text">{{ valeur.texte }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.valeurs {
  background-color: var(--color-surface);
}

.valeurs__header {
  max-width: 44rem;
  margin-bottom: var(--space-2xl);
  text-align: center;
  margin-inline: auto;
}

.valeurs__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.valeurs__card {
  position: relative;
  padding: var(--space-xl);
  background-color: var(--color-cream);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: transform var(--dur-med) var(--ease),
    box-shadow var(--dur-med) var(--ease);
  overflow: hidden;
}
.valeurs__card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle at top right,
    rgba(138, 163, 139, 0.18),
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
}
.valeurs__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.valeurs__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background-color: rgba(138, 163, 139, 0.18);
  color: var(--color-sage-dark);
  margin-bottom: var(--space-md);
}

.valeurs__card-title {
  font-size: var(--fs-lg);
  margin-bottom: var(--space-xs);
}

.valeurs__card-text {
  font-size: var(--fs-sm);
  color: var(--color-text-soft);
}

@media (min-width: 640px) {
  .valeurs__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .valeurs__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
