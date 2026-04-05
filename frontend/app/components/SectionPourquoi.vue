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

<style scoped lang="scss">
@use "~/assets/styles" as *;

.pourquoi {
  position: relative;
  background: linear-gradient(
    180deg,
    color("cream") 0%,
    color("sand") 100%
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
    alpha("terracotta", 0.14),
    transparent 70%
  );
  pointer-events: none;
}

.pourquoi__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2xl;
  align-items: start;
}

.pourquoi__content {
  max-width: 40rem;
}

.pourquoi__lede {
  font-size: $font-size-md;
  color: color("ink");
  margin-bottom: $spacing-md;
  font-weight: 500;
}

.pourquoi__content p {
  font-size: $font-size-md;
  margin-bottom: $spacing-md;
}

.pourquoi__subtitle {
  font-size: $font-size-lg;
  margin-top: $spacing-xl;
  margin-bottom: $spacing-md;
}

.pourquoi__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.pourquoi__list li {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-md;
  color: color("ink");
  font-weight: 500;
}

.pourquoi__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: color("primary");
  color: color("surface");
  border-radius: 50%;
  flex-shrink: 0;
}

.pourquoi__quote {
  position: relative;
  padding: $spacing-2xl;
  background-color: color("surface");
  border-radius: $radius-xl;
  box-shadow: $shadow-medium;
  margin: 0;
}

.pourquoi__quote-mark {
  color: tint("terracotta", 14);
  opacity: 0.45;
  margin-bottom: $spacing-md;
}

.pourquoi__quote blockquote p {
  font-family: $font-display;
  font-size: $font-size-xl;
  line-height: 1.4;
  color: color("ink");
  font-style: italic;
  margin-bottom: $spacing-lg;
}

.pourquoi__quote-author {
  font-size: $font-size-sm;
  font-weight: 600;
  color: shade("terracotta", 16);
  letter-spacing: 0.02em;
}

@media (min-width: 960px) {
  .pourquoi__inner {
    grid-template-columns: 6fr 5fr;
    gap: $spacing-3xl;
    align-items: center;
  }
}

@include respond-below($breakpoint-sm) {
  .pourquoi__quote {
    padding: $spacing-xl;
  }
  .pourquoi__quote blockquote p {
    font-size: $font-size-lg;
  }
}
</style>
