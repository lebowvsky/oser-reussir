<script setup lang="ts">
/**
 * Hero section — organic gradient background, image-ready structure.
 */
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
        <span class="hero__eyebrow">Coaching scolaire individuel</span>
        <h1 id="hero-title" class="hero__title">
          Retrouver confiance,
          <span class="hero__title-accent">dépasser les blocages</span>
          et avancer dans son parcours scolaire.
        </h1>
        <p class="hero__subtitle">
          Enseignante et coach depuis plus de 20 ans, j'accompagne les jeunes
          avec bienveillance pour qu'ils reprennent confiance et trouvent leur
          propre chemin.
        </p>
        <div class="hero__actions">
          <a href="#contact" class="btn btn--primary">
            Prendre rendez-vous
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
          <a href="#apropos" class="btn btn--ghost">En savoir plus</a>
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

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--navbar-height);
  overflow: hidden;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    135deg,
    var(--color-cream) 0%,
    var(--color-sand) 55%,
    #f5c9b0 100%
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
  background: radial-gradient(circle, var(--color-terracotta-soft), transparent 70%);
}
.hero__blob--2 {
  width: 460px;
  height: 460px;
  bottom: -160px;
  left: -80px;
  background: radial-gradient(circle, var(--color-sage), transparent 70%);
  opacity: 0.35;
}
.hero__blob--3 {
  width: 320px;
  height: 320px;
  top: 40%;
  left: 45%;
  background: radial-gradient(circle, #f3d3a8, transparent 70%);
  opacity: 0.4;
}

.hero__inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-2xl);
  padding-block: var(--space-2xl);
}

.hero__content {
  max-width: 52rem;
}

.hero__eyebrow {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-terracotta-dark);
  margin-bottom: var(--space-lg);
}

.hero__title {
  font-size: clamp(2rem, 5.5vw, var(--fs-4xl));
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.hero__title-accent {
  color: var(--color-terracotta);
  font-style: italic;
}

.hero__subtitle {
  font-size: var(--fs-md);
  color: var(--color-text-soft);
  max-width: 38rem;
  margin-bottom: var(--space-xl);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2xs);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  animation: bounce 2.4s var(--ease) infinite;
}
.hero__scroll:hover {
  color: var(--color-terracotta);
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
