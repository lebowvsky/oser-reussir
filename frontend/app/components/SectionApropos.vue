<script setup lang="ts">
/**
 * À propos — bio de la coach, mise en page 2 colonnes desktop / 1 col mobile.
 */
const photoSrc = '/images/coach-placeholder.jpg'
</script>

<template>
  <section id="apropos" class="apropos section" aria-labelledby="apropos-title">
    <div class="container apropos__inner">
      <div class="apropos__media" data-reveal>
        <div class="apropos__photo-frame">
          <img
            :src="photoSrc"
            alt="Portrait de la coach"
            class="apropos__photo"
            loading="lazy"
            width="520"
            height="620"
          />
          <div class="apropos__badge" aria-hidden="true">
            <span class="apropos__badge-number">20+</span>
            <span class="apropos__badge-label">années<br />d'expérience</span>
          </div>
        </div>
      </div>

      <div class="apropos__content" data-reveal>
        <span class="section__eyebrow">À propos</span>
        <h2 id="apropos-title" class="section__title">
          Accompagner autrement, au plus près de chaque jeune.
        </h2>
        <p>
          Enseignante d'anglais depuis plus de vingt ans en lycée professionnel,
          j'ai accompagné des élèves aux profils très divers, avec leurs forces,
          leurs doutes et leurs histoires.
        </p>
        <p>
          Au fil des années, j'ai ressenti l'envie d'aller plus loin que le cadre
          de la classe — d'offrir un espace dédié, centré sur le jeune, où
          écouter, comprendre et accompagner deviennent un vrai métier. C'est
          ainsi qu'est né <strong>Oser Réussir</strong>.
        </p>
        <p>
          Mon objectif&nbsp;: aider chaque jeune à reprendre confiance, à mieux
          comprendre son fonctionnement, à dépasser ses blocages et à trouver
          des stratégies d'apprentissage qui lui correspondent vraiment.
        </p>

        <ul class="apropos__highlights">
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            Enseignante en lycée professionnel
          </li>
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            Formée au coaching scolaire
          </li>
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            Approche bienveillante et individualisée
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apropos {
  background-color: var(--color-bg);
}

.apropos__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

.apropos__media {
  position: relative;
  max-width: 520px;
  margin-inline: auto;
  width: 100%;
}

.apropos__photo-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: linear-gradient(
    135deg,
    var(--color-sand) 0%,
    var(--color-terracotta-soft) 100%
  );
  box-shadow: var(--shadow-medium);
}

.apropos__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* Fallback if placeholder image is missing */
.apropos__photo[alt]::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--color-sand) 0%,
    var(--color-terracotta-soft) 100%
  );
  display: block;
}

.apropos__badge {
  position: absolute;
  right: -20px;
  bottom: 32px;
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-md) var(--space-lg);
  box-shadow: var(--shadow-medium);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.apropos__badge-number {
  font-family: var(--font-display);
  font-size: var(--fs-2xl);
  color: var(--color-terracotta);
  font-weight: 700;
  line-height: 1;
}
.apropos__badge-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.apropos__content p {
  margin-bottom: var(--space-md);
  font-size: var(--fs-md);
}

.apropos__content strong {
  color: var(--color-terracotta-dark);
  font-weight: 700;
}

.apropos__highlights {
  margin-top: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.apropos__highlights li {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--color-text);
}
.apropos__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-sage);
  flex-shrink: 0;
}

@media (min-width: 880px) {
  .apropos__inner {
    grid-template-columns: 5fr 6fr;
    gap: var(--space-3xl);
  }
}

@media (max-width: 560px) {
  .apropos__badge {
    right: 12px;
    bottom: 12px;
    padding: var(--space-sm) var(--space-md);
  }
  .apropos__badge-number {
    font-size: var(--fs-xl);
  }
}
</style>
