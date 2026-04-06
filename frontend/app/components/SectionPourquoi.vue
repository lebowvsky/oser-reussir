<script setup lang="ts">
/**
 * Pourquoi Oser Réussir — section éditoriale avec bénéfices du coaching.
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
      </div>

      <div class="pourquoi__card" data-reveal>
        <h3 class="pourquoi__card-title">Ce que le coaching apporte</h3>
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

.pourquoi__card {
  position: relative;
  padding: $spacing-2xl;
  background-color: color("surface");
  border-radius: $radius-xl;
  box-shadow: $shadow-medium;
}

.pourquoi__card-title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-lg;
  color: color("ink");
}

.pourquoi__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
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

@media (min-width: 960px) {
  .pourquoi__inner {
    grid-template-columns: 6fr 5fr;
    gap: $spacing-3xl;
    align-items: center;
  }
}

@include respond-below($breakpoint-sm) {
  .pourquoi__card {
    padding: $spacing-xl;
  }
}
</style>
