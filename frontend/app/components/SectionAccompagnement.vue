<script setup lang="ts">
/**
 * Comment se déroule l'accompagnement — timeline en 3 étapes.
 * Fetches content from the backend API with a hardcoded fallback.
 */

interface AccompagnementData {
  eyebrow: string
  title: string
  lede: string
  step1Title: string
  step1Text: string
  step1Highlight: boolean
  step2Title: string
  step2Text: string
  step2Highlight: boolean
  step3Title: string
  step3Text: string
  step3Highlight: boolean
  ctaTitle: string
  ctaText: string
}

const DEFAULT_ACCOMPAGNEMENT: AccompagnementData = {
  eyebrow: 'Déroulé',
  title: 'Comment se déroule l\'accompagnement ?',
  lede: 'Un parcours simple, respectueux du rythme du jeune et construit avec lui, étape après étape.',
  step1Title: 'Première séance bilan offerte',
  step1Text: 'Un temps d\'échange gratuit pour faire connaissance, comprendre la situation du jeune, ses besoins, et poser ensemble les premières bases.',
  step1Highlight: true,
  step2Title: 'Accompagnement individualisé',
  step2Text: 'Pas de forfait imposé : la durée et le rythme s\'adaptent à l\'avancement, aux objectifs et aux besoins spécifiques de chaque jeune.',
  step2Highlight: false,
  step3Title: 'L\'accord du jeune',
  step3Text: 'L\'engagement du jeune est indispensable. C\'est sa démarche : il doit y adhérer pleinement pour que l\'accompagnement porte ses fruits.',
  step3Highlight: false,
  ctaTitle: 'Première séance offerte',
  ctaText: 'Pour découvrir l\'accompagnement sans engagement, réservez votre séance bilan gratuite.',
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: accompagnementRaw } = await useFetch<AccompagnementData>(`${baseUrl}/accompagnement`)
const accompagnement = computed(() => accompagnementRaw.value ?? DEFAULT_ACCOMPAGNEMENT)

const steps = computed(() => [
  {
    number: '01',
    titre: accompagnement.value.step1Title,
    texte: accompagnement.value.step1Text,
    highlight: accompagnement.value.step1Highlight,
  },
  {
    number: '02',
    titre: accompagnement.value.step2Title,
    texte: accompagnement.value.step2Text,
    highlight: accompagnement.value.step2Highlight,
  },
  {
    number: '03',
    titre: accompagnement.value.step3Title,
    texte: accompagnement.value.step3Text,
    highlight: accompagnement.value.step3Highlight,
  },
])
</script>

<template>
  <section
    id="accompagnement"
    class="accompagnement section"
    aria-labelledby="accompagnement-title"
  >
    <div class="container">
      <header class="accompagnement__header" data-reveal>
        <span class="section__eyebrow">{{ accompagnement.eyebrow }}</span>
        <h2 id="accompagnement-title" class="section__title">
          {{ accompagnement.title }}
        </h2>
        <p class="section__lede">
          {{ accompagnement.lede }}
        </p>
      </header>

      <ol class="accompagnement__timeline">
        <li
          v-for="step in steps"
          :key="step.number"
          class="accompagnement__step"
          :class="{ 'accompagnement__step--highlight': step.highlight }"
          data-reveal
        >
          <div class="accompagnement__number" aria-hidden="true">
            {{ step.number }}
          </div>
          <div class="accompagnement__body">
            <h3 class="accompagnement__step-title">
              {{ step.titre }}
              <span v-if="step.highlight" class="accompagnement__badge">
                Gratuit
              </span>
            </h3>
            <p>{{ step.texte }}</p>
          </div>
        </li>
      </ol>

      <div class="accompagnement__cta" data-reveal>
        <div class="accompagnement__cta-content">
          <span class="accompagnement__cta-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <div>
            <h3 class="accompagnement__cta-title">{{ accompagnement.ctaTitle }}</h3>
            <p class="accompagnement__cta-text">
              {{ accompagnement.ctaText }}
            </p>
          </div>
        </div>
        <a href="#contact" class="btn btn--primary">Prendre rendez-vous</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.accompagnement {
  background-color: color("cream");
}

.accompagnement__header {
  max-width: 44rem;
  margin-bottom: $spacing-2xl;
}

.accompagnement__timeline {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  margin-bottom: $spacing-2xl;
  counter-reset: step;
  position: relative;
}

.accompagnement__step {
  display: flex;
  gap: $spacing-lg;
  padding: $spacing-xl;
  background-color: color("surface");
  border-radius: $radius-lg;
  border: 1px solid color("border");
  transition: transform $duration-medium $ease,
    box-shadow $duration-medium $ease;
}
.accompagnement__step:hover {
  transform: translateX(4px);
  box-shadow: $shadow-soft;
}

.accompagnement__step--highlight {
  background: linear-gradient(
    135deg,
    color("surface") 0%,
    alpha("terracotta", 0.08) 100%
  );
  border-color: tint("terracotta", 14);
}

.accompagnement__number {
  flex-shrink: 0;
  font-family: $font-display;
  font-size: $font-size-3xl;
  font-weight: 700;
  color: color("terracotta");
  line-height: 1;
  min-width: 72px;
}

.accompagnement__body {
  flex: 1;
}

.accompagnement__step-title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-xs;
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.accompagnement__badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background-color: color("primary");
  color: color("surface");
  font-family: $font-body;
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: $radius-pill;
}

.accompagnement__body p {
  font-size: $font-size-md;
  color: color("ink-soft");
}

/* CTA card */
.accompagnement__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xl;
  padding: $spacing-xl $spacing-2xl;
  background: linear-gradient(
    135deg,
    color("terracotta") 0%,
    shade("terracotta", 16) 100%
  );
  color: color("surface");
  border-radius: $radius-xl;
  box-shadow: $shadow-medium;
  flex-wrap: wrap;
}

.accompagnement__cta-content {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  flex: 1;
  min-width: 260px;
}

.accompagnement__cta-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: alpha("surface", 0.15);
  border-radius: $radius-md;
  color: color("surface");
  flex-shrink: 0;
}

.accompagnement__cta-title {
  font-size: $font-size-xl;
  color: color("surface");
  margin-bottom: $spacing-2xs;
}

.accompagnement__cta-text {
  color: alpha("surface", 0.88);
  margin: 0;
  font-size: $font-size-sm;
}

.accompagnement__cta .btn--primary {
  background-color: color("surface");
  color: shade("terracotta", 16);
}
.accompagnement__cta .btn--primary:hover {
  background-color: color("cream");
  color: shade("terracotta", 16);
}

@include respond-below($breakpoint-sm) {
  .accompagnement__step {
    flex-direction: column;
    gap: $spacing-sm;
    padding: $spacing-lg;
  }
  .accompagnement__number {
    font-size: $font-size-2xl;
    min-width: 0;
  }
  .accompagnement__cta {
    padding: $spacing-lg;
    flex-direction: column;
    align-items: flex-start;
  }
  .accompagnement__cta-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
