<script setup lang="ts">
/**
 * Hero section — organic gradient background, image-ready structure.
 * Fetches hero content from the backend API with a hardcoded fallback.
 */
import { parseAccentTitle } from '~/utils/parse-accent'

interface HeroData {
  eyebrow: string
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText: string
}

const DEFAULT_HERO: HeroData = {
  eyebrow: 'Coaching scolaire individuel',
  title: 'Retrouver confiance, **dépasser les blocages** et avancer dans son parcours scolaire.',
  subtitle:
    "Enseignante et coach depuis plus de 20 ans, j'accompagne les jeunes avec bienveillance pour qu'ils reprennent confiance et trouvent leur propre chemin.",
  primaryButtonText: 'Prendre rendez-vous',
  secondaryButtonText: 'En savoir plus',
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: heroRaw } = await useFetch<HeroData>(`${baseUrl}/hero`)

const hero = computed(() => heroRaw.value ?? DEFAULT_HERO)
const titleSegments = computed(() => parseAccentTitle(hero.value.title))
</script>

<template>
  <section id="hero" class="hero" aria-labelledby="hero-title">
    <!-- Organic gradient background with blobs -->
    <div class="hero__bg" aria-hidden="true">
      <!-- <slot name="hero-bg" /> Future image slot: <NuxtImg src="..." /> + overlay -->
      <div class="hero__blob hero__blob--1"></div>
      <div class="hero__blob hero__blob--2"></div>
      <div class="hero__blob hero__blob--3"></div>
    </div>

    <div class="container hero__inner">
      <div class="hero__content" data-reveal>
        <span class="hero__eyebrow">{{ hero.eyebrow }}</span>
        <h1 id="hero-title" class="hero__title">
          <template v-for="(seg, i) in titleSegments" :key="i">
            <span v-if="seg.accent" class="hero__title-accent">{{ seg.text }}</span>
            <template v-else>{{ seg.text }}</template>
          </template>
        </h1>
        <p class="hero__subtitle">
          {{ hero.subtitle }}
        </p>
        <div class="hero__actions">
          <a href="#contact" class="btn btn--primary">
            {{ hero.primaryButtonText }}
            <svg
              viewBox="0 0 20 20"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 10h10M11 5l5 5-5 5" />
            </svg>
          </a>
          <a href="#apropos" class="btn btn--ghost">{{ hero.secondaryButtonText }}</a>
        </div>
      </div>

      <a href="#apropos" class="hero__scroll" aria-label="Faire défiler vers la section À propos">
        <span>Découvrir</span>
        <svg
          viewBox="0 0 20 20"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10 4v12M5 11l5 5 5-5" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: $header-height;
  overflow: hidden;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    135deg,
    color("cream") 0%,
    color("sand") 55%,
    color("peach") 100%
  );
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
}
.hero__blob--1 {
  width: 520px;
  height: 520px;
  top: -120px;
  right: -120px;
  background: radial-gradient(circle, tint("terracotta", 14), transparent 70%);
}
.hero__blob--2 {
  width: 460px;
  height: 460px;
  bottom: -160px;
  left: -80px;
  background: radial-gradient(circle, color("primary"), transparent 70%);
  opacity: 0.35;
}
.hero__blob--3 {
  width: 320px;
  height: 320px;
  top: 40%;
  left: 45%;
  background: radial-gradient(circle, color("amber-soft"), transparent 70%);
  opacity: 0.4;
}

.hero__inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: $spacing-2xl;
  padding-block: $spacing-2xl;
}

.hero__content {
  max-width: 52rem;
}

.hero__eyebrow {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background-color: alpha("surface", 0.7);
  border-radius: $radius-pill;
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: shade("terracotta", 16);
  margin-bottom: $spacing-lg;
}

.hero__title {
  font-size: clamp(2rem, 5.5vw, $font-size-4xl);
  line-height: 1.15;
  color: color("ink");
  margin-bottom: $spacing-lg;
}

.hero__title-accent {
  color: color("terracotta");
  font-style: italic;
}

.hero__subtitle {
  font-size: $font-size-md;
  color: color("ink-soft");
  max-width: 38rem;
  margin-bottom: $spacing-xl;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
}

.hero__scroll {
  position: absolute;
  bottom: $spacing-xl;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2xs;
  font-size: $font-size-xs;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color("muted");
  animation: bounce 2.4s $ease infinite;
}
.hero__scroll:hover {
  color: color("terracotta");
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -8px);
  }
}

@media (max-width: 720px) {
  .hero__scroll {
    display: none;
  }
}
</style>
