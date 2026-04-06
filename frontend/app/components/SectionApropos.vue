<script setup lang="ts">
/**
 * À propos — bio de la coach, mise en page 2 colonnes desktop / 1 col mobile.
 * Fetches content from the backend API with a hardcoded fallback.
 */

interface AproposData {
  eyebrow: string
  title: string
  paragraph1: string
  paragraph2: string
  paragraph3: string
  badgeNumber: string
  badgeLabel: string
  highlight1: string
  highlight2: string
  highlight3: string
}

const DEFAULT_APROPOS: AproposData = {
  eyebrow: 'À propos',
  title: 'Accompagner autrement, au plus près de chaque jeune.',
  paragraph1: "Enseignante d'anglais depuis plus de vingt ans en lycée professionnel, j'ai accompagné des élèves aux profils très divers, avec leurs forces, leurs doutes et leurs histoires.",
  paragraph2: "Au fil des années, j'ai ressenti l'envie d'aller plus loin que le cadre de la classe — d'offrir un espace dédié, centré sur le jeune, où écouter, comprendre et accompagner deviennent un vrai métier. C'est ainsi qu'est né <strong>Oser Réussir</strong>.",
  paragraph3: "Mon objectif\u00a0: aider chaque jeune à reprendre confiance, à mieux comprendre son fonctionnement, à dépasser ses blocages et à trouver des stratégies d'apprentissage qui lui correspondent vraiment.",
  badgeNumber: '20+',
  badgeLabel: "années\nd'expérience",
  highlight1: 'Enseignante en lycée professionnel',
  highlight2: 'Formée au coaching scolaire',
  highlight3: 'Approche bienveillante et individualisée',
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: aproposRaw } = await useFetch<AproposData>(`${baseUrl}/apropos`)
const apropos = computed(() => aproposRaw.value ?? DEFAULT_APROPOS)

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
            <span class="apropos__badge-number">{{ apropos.badgeNumber }}</span>
            <span class="apropos__badge-label" v-html="apropos.badgeLabel.replace('\n', '<br>')"></span>
          </div>
        </div>
      </div>

      <div class="apropos__content" data-reveal>
        <span class="section__eyebrow">{{ apropos.eyebrow }}</span>
        <h2 id="apropos-title" class="section__title">
          {{ apropos.title }}
        </h2>
        <p v-html="apropos.paragraph1"></p>
        <p v-html="apropos.paragraph2"></p>
        <p v-html="apropos.paragraph3"></p>

        <ul class="apropos__highlights">
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            {{ apropos.highlight1 }}
          </li>
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            {{ apropos.highlight2 }}
          </li>
          <li>
            <span class="apropos__dot" aria-hidden="true"></span>
            {{ apropos.highlight3 }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.apropos {
  background-color: color("cream");
}

.apropos__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2xl;
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
  border-radius: $radius-xl;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: linear-gradient(
    135deg,
    color("sand") 0%,
    tint("terracotta", 14) 100%
  );
  box-shadow: $shadow-medium;
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
    color("sand") 0%,
    tint("terracotta", 14) 100%
  );
  display: block;
}

.apropos__badge {
  position: absolute;
  right: -20px;
  bottom: 32px;
  background-color: color("surface");
  border-radius: $radius-lg;
  padding: $spacing-md $spacing-lg;
  box-shadow: $shadow-medium;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}
.apropos__badge-number {
  font-family: $font-display;
  font-size: $font-size-2xl;
  color: color("terracotta");
  font-weight: 700;
  line-height: 1;
}
.apropos__badge-label {
  font-size: $font-size-xs;
  font-weight: 600;
  color: color("muted");
  line-height: 1.3;
}

.apropos__content p {
  margin-bottom: $spacing-md;
  font-size: $font-size-md;
}

.apropos__content strong {
  color: shade("terracotta", 16);
  font-weight: 700;
}

.apropos__highlights {
  margin-top: $spacing-xl;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}
.apropos__highlights li {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  font-weight: 600;
  color: color("ink");
}
.apropos__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: color("primary");
  flex-shrink: 0;
}

@media (min-width: 880px) {
  .apropos__inner {
    grid-template-columns: 5fr 6fr;
    gap: $spacing-3xl;
  }
}

@media (max-width: 560px) {
  .apropos__badge {
    right: 12px;
    bottom: 12px;
    padding: $spacing-sm $spacing-md;
  }
  .apropos__badge-number {
    font-size: $font-size-xl;
  }
}
</style>
