<script setup lang="ts">
/**
 * Pour qui ? — cards with inline SVG icons for target profiles.
 * Fetches content from the backend API with a hardcoded fallback.
 */

interface PourquiData {
  eyebrow: string
  title: string
  lede: string
  card1Title: string
  card1Text: string
  card1Icon: string
  card2Title: string
  card2Text: string
  card2Icon: string
  card3Title: string
  card3Text: string
  card3Icon: string
  card4Title: string
  card4Text: string
  card4Icon: string
  card5Title: string
  card5Text: string
  card5Icon: string
  noteTag: string
  noteMessage: string
}

const DEFAULT_POURQUI: PourquiData = {
  eyebrow: 'Pour qui ?',
  title: 'Un accompagnement pour les coll\u00e9giens, lyc\u00e9ens et \u00e9tudiants.',
  lede: 'Le coaching scolaire s\u2019adresse aux jeunes qui traversent un moment plus difficile, et qui ont besoin d\u2019un espace d\u00e9di\u00e9 pour retrouver leur \u00e9lan.',
  card1Title: 'Manque de confiance',
  card1Text: 'Quand la peur de se tromper ou le regard des autres prend le dessus sur l\u2019envie d\u2019avancer.',
  card1Icon: 'heart',
  card2Title: 'D\u00e9motivation',
  card2Text: 'Quand l\u2019\u00e9cole a perdu son sens et que la motivation s\u2019est \u00e9teinte au fil du temps.',
  card2Icon: 'spark',
  card3Title: 'Difficult\u00e9s d\u2019organisation',
  card3Text: 'Quand g\u00e9rer son travail, ses r\u00e9visions et son temps devient une source de stress.',
  card3Icon: 'grid',
  card4Title: 'Doute sur ses capacit\u00e9s',
  card4Text: 'Quand le jeune se compare, se d\u00e9valorise et n\u2019ose plus croire en ses propres ressources.',
  card4Icon: 'question',
  card5Title: 'Perte de sens',
  card5Text: 'Quand l\u2019orientation ou les apprentissages semblent flous, et que l\u2019on ne sait plus o\u00f9 aller.',
  card5Icon: 'compass',
  noteTag: 'Important',
  noteMessage: '<strong>Le coaching n\u2019est pas du soutien scolaire.</strong> Il ne remplace pas les cours particuliers ni l\u2019aide aux devoirs\u00a0: il aide le jeune \u00e0 mieux se conna\u00eetre, \u00e0 identifier ce qui bloque et \u00e0 retrouver sa propre dynamique d\u2019apprentissage.',
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
const { data: pourquiRaw } = await useFetch<PourquiData>(`${baseUrl}/pourqui`)
const pourqui = computed(() => pourquiRaw.value ?? DEFAULT_POURQUI)

const profils = computed(() => [
  { id: 'card1', titre: pourqui.value.card1Title, texte: pourqui.value.card1Text, icon: pourqui.value.card1Icon },
  { id: 'card2', titre: pourqui.value.card2Title, texte: pourqui.value.card2Text, icon: pourqui.value.card2Icon },
  { id: 'card3', titre: pourqui.value.card3Title, texte: pourqui.value.card3Text, icon: pourqui.value.card3Icon },
  { id: 'card4', titre: pourqui.value.card4Title, texte: pourqui.value.card4Text, icon: pourqui.value.card4Icon },
  { id: 'card5', titre: pourqui.value.card5Title, texte: pourqui.value.card5Text, icon: pourqui.value.card5Icon },
])
</script>

<template>
  <section id="pourqui" class="pourqui section" aria-labelledby="pourqui-title">
    <div class="container">
      <header class="pourqui__header" data-reveal>
        <span class="section__eyebrow">{{ pourqui.eyebrow }}</span>
        <h2 id="pourqui-title" class="section__title">
          {{ pourqui.title }}
        </h2>
        <p class="section__lede">
          {{ pourqui.lede }}
        </p>
      </header>

      <ul class="pourqui__grid">
        <li
          v-for="profil in profils"
          :key="profil.id"
          class="pourqui__card"
          data-reveal
        >
          <span class="pourqui__icon" aria-hidden="true">
            <!-- heart -->
            <svg
              v-if="profil.icon === 'heart'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
            <!-- spark -->
            <svg
              v-else-if="profil.icon === 'spark'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 2v6M12 16v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M2 12h6M16 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3" />
            </svg>
            <!-- grid -->
            <svg
              v-else-if="profil.icon === 'grid'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <!-- question -->
            <svg
              v-else-if="profil.icon === 'question'"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
              <path d="M12 17h.01" />
            </svg>
            <!-- compass -->
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
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          <h3 class="pourqui__card-title">{{ profil.titre }}</h3>
          <p class="pourqui__card-text">{{ profil.texte }}</p>
        </li>
      </ul>

      <aside class="pourqui__note" data-reveal>
        <span class="pourqui__note-tag" aria-hidden="true">{{ pourqui.noteTag }}</span>
        <p v-html="pourqui.noteMessage"></p>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.pourqui {
  background-color: color("surface");
}

.pourqui__header {
  max-width: 44rem;
  margin-bottom: $spacing-2xl;
}

.pourqui__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
  margin-bottom: $spacing-2xl;
}

.pourqui__card {
  background-color: color("cream");
  border: 1px solid color("border");
  border-radius: $radius-lg;
  padding: $spacing-xl;
  transition: transform $duration-medium $ease,
    box-shadow $duration-medium $ease,
    border-color $duration-medium $ease;
}

.pourqui__card:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-medium;
  border-color: tint("terracotta", 14);
}

.pourqui__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: $radius-md;
  background-color: alpha("terracotta", 0.12);
  color: color("terracotta");
  margin-bottom: $spacing-md;
}

.pourqui__card-title {
  font-size: $font-size-lg;
  margin-bottom: $spacing-xs;
}

.pourqui__card-text {
  font-size: $font-size-sm;
  color: color("ink-soft");
}

.pourqui__note {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
  padding: $spacing-lg $spacing-xl;
  background: linear-gradient(
    135deg,
    color("sand") 0%,
    alpha("sage-soft", 0.2) 100%
  );
  border-left: 4px solid color("primary");
  border-radius: $radius-md;
}

.pourqui__note-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background-color: shade("primary", 16);
  color: color("surface");
  font-size: $font-size-xs;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: $radius-pill;
  flex-shrink: 0;
}

.pourqui__note p {
  font-size: $font-size-md;
  color: color("ink");
  margin: 0;
}

.pourqui__note strong {
  color: shade("primary", 16);
  font-weight: 700;
}

@include respond-above($breakpoint-sm) {
  .pourqui__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 980px) {
  .pourqui__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 560px) {
  .pourqui__note {
    flex-direction: column;
    padding: $spacing-lg;
  }
}
</style>
