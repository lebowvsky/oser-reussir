<script setup lang="ts">
/**
 * Pourquoi Oser Réussir — section éditoriale avec bénéfices + citation.
 */
interface Benefice {
  readonly id: string
  readonly texte: string
}

const benefices: readonly Benefice[] = [
  { id: 'confiance', texte: 'Reprendre confiance en soi' },
  { id: 'motivation', texte: 'Retrouver la motivation' },
  { id: 'organisation', texte: 'Mieux s\'organiser au quotidien' },
  { id: 'methodes', texte: 'Identifier des méthodes adaptées' },
  { id: 'croyances', texte: 'Dépasser les croyances limitantes' },
] as const
</script>

<template>
  <section
    id="pourquoi"
    class="pourquoi section"
    aria-labelledby="pourquoi-title"
  >
    <div class="container pourquoi__inner">
      <div class="pourquoi__content" data-reveal>
        <span class="section__eyebrow">Pourquoi Oser Réussir&nbsp;?</span>
        <h2 id="pourquoi-title" class="section__title">
          Parce que chaque jeune possède des ressources souvent insoupçonnées.
        </h2>
        <p class="pourquoi__lede">
          Parfois, il suffit d'un espace d'écoute, d'un accompagnement
          bienveillant et de quelques clés pour reprendre confiance et oser
          avancer.
        </p>
        <p>
          Le coaching scolaire propose une approche différente du soutien
          scolaire&nbsp;: il ne s'agit pas de refaire les cours, mais
          d'aider le jeune à mieux se connaître, à comprendre ce qui bloque
          et à retrouver une dynamique positive.
        </p>

        <h3 class="pourquoi__subtitle">Ce que le coaching apporte</h3>
        <ul class="pourquoi__list">
          <li v-for="benefice in benefices" :key="benefice.id">
            <span class="pourquoi__check" aria-hidden="true">
              <svg
                viewBox="0 0 20 20"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 10l4 4 8-8" />
              </svg>
            </span>
            <span>{{ benefice.texte }}</span>
          </li>
        </ul>
      </div>

      <figure class="pourquoi__quote" data-reveal>
        <svg
          class="pourquoi__quote-mark"
          viewBox="0 0 48 48"
          width="48"
          height="48"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M14 10c-5 0-9 4-9 9v19h14V19H10c0-2 2-4 4-4zm24 0c-5 0-9 4-9 9v19h14V19H34c0-2 2-4 4-4z"
          />
        </svg>
        <blockquote>
          <p>
            Oser Réussir, c'est croire que chaque jeune a le droit d'apprendre
            à son rythme, avec ses propres outils et toute sa singularité.
          </p>
        </blockquote>
        <figcaption class="pourquoi__quote-author">
          — Oser Réussir, coaching scolaire
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.pourquoi {
  position: relative;
  background: linear-gradient(
    180deg,
    var(--color-bg) 0%,
    var(--color-sand) 100%
  );
  overflow: hidden;
}

.pourquoi::before {
  content: '';
  position: absolute;
  top: 10%;
  right: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(201, 123, 91, 0.14),
    transparent 70%
  );
  pointer-events: none;
}

.pourquoi__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

.pourquoi__content {
  max-width: 40rem;
}

.pourquoi__lede {
  font-size: var(--fs-md);
  color: var(--color-text);
  margin-bottom: var(--space-md);
  font-weight: 500;
}

.pourquoi__content p {
  font-size: var(--fs-md);
  margin-bottom: var(--space-md);
}

.pourquoi__subtitle {
  font-size: var(--fs-lg);
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
}

.pourquoi__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.pourquoi__list li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--fs-md);
  color: var(--color-text);
  font-weight: 500;
}

.pourquoi__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: var(--color-sage);
  color: var(--color-white);
  border-radius: 50%;
  flex-shrink: 0;
}

.pourquoi__quote {
  position: relative;
  padding: var(--space-2xl);
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-medium);
  margin: 0;
}

.pourquoi__quote-mark {
  color: var(--color-terracotta-soft);
  opacity: 0.45;
  margin-bottom: var(--space-md);
}

.pourquoi__quote blockquote p {
  font-family: var(--font-display);
  font-size: var(--fs-xl);
  line-height: 1.4;
  color: var(--color-text);
  font-style: italic;
  margin-bottom: var(--space-lg);
}

.pourquoi__quote-author {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-terracotta-dark);
  letter-spacing: 0.02em;
}

@media (min-width: 960px) {
  .pourquoi__inner {
    grid-template-columns: 6fr 5fr;
    gap: var(--space-3xl);
    align-items: center;
  }
}

@media (max-width: 640px) {
  .pourquoi__quote {
    padding: var(--space-xl);
  }
  .pourquoi__quote blockquote p {
    font-size: var(--fs-lg);
  }
}
</style>
