<script setup lang="ts">
/**
 * Pourquoi Oser Réussir — section éditoriale avec bénéfices du coaching.
 * Fetches content from the backend API with a hardcoded fallback.
 */

interface PourquoiData {
  eyebrow: string
  title: string
  lede: string
  paragraph: string
  cardTitle: string
  benefice1: string
  benefice2: string
  benefice3: string
  benefice4: string
  benefice5: string
}

const DEFAULT_POURQUOI: PourquoiData = {
  eyebrow: 'Pourquoi Oser Réussir ?',
  title: 'Parce que chaque jeune possède des ressources souvent insoupçonnées.',
  lede: 'Parfois, il suffit d\'un espace d\'écoute, d\'un accompagnement bienveillant et de quelques clés pour reprendre confiance et oser avancer.',
  paragraph: 'Le coaching scolaire propose une approche différente du soutien scolaire : il ne s\'agit pas de refaire les cours, mais d\'aider le jeune à mieux se connaître, à comprendre ce qui bloque et à retrouver une dynamique positive.',
  cardTitle: 'Ce que le coaching apporte',
  benefice1: 'Reprendre confiance en soi',
  benefice2: 'Retrouver la motivation',
  benefice3: 'Mieux s\'organiser au quotidien',
  benefice4: 'Identifier des méthodes adaptées',
  benefice5: 'Dépasser les croyances limitantes',
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: pourquoiRaw } = await useFetch<PourquoiData>(`${baseUrl}/pourquoi`)
const pourquoiData = computed(() => pourquoiRaw.value ?? DEFAULT_POURQUOI)

const benefices = computed(() => [
  { id: 'confiance', texte: pourquoiData.value.benefice1 },
  { id: 'motivation', texte: pourquoiData.value.benefice2 },
  { id: 'organisation', texte: pourquoiData.value.benefice3 },
  { id: 'methodes', texte: pourquoiData.value.benefice4 },
  { id: 'croyances', texte: pourquoiData.value.benefice5 },
])
</script>

<template>
  <section
    id="pourquoi"
    class="pourquoi section"
    aria-labelledby="pourquoi-title"
  >
    <div class="container pourquoi__inner">
      <div class="pourquoi__content" data-reveal>
        <span class="section__eyebrow">{{ pourquoiData.eyebrow }}</span>
        <h2 id="pourquoi-title" class="section__title">
          {{ pourquoiData.title }}
        </h2>
        <p class="pourquoi__lede">
          {{ pourquoiData.lede }}
        </p>
        <p>{{ pourquoiData.paragraph }}</p>
      </div>

      <div class="pourquoi__card" data-reveal>
        <h3 class="pourquoi__card-title">{{ pourquoiData.cardTitle }}</h3>
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
