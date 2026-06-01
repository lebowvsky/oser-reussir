<script setup lang="ts">
/**
 * Témoignages — carrousel accessible (sans librairie externe).
 * Récupère les témoignages depuis l'API. Aucun fallback : si la liste est
 * vide, la section entière est masquée via `v-if`.
 */

interface Temoignage {
  id: string
  authorName: string
  authorContext: string | null
  content: string
  displayOrder: number
}

const config = useRuntimeConfig()
const baseUrl = import.meta.server ? config.apiBaseServer : config.public.apiBase
// Clé explicite : l'URL diffère entre le serveur (réseau Docker interne) et le
// client (localhost), donc sans clé stable le payload SSR n'est pas transféré
// au client → `data` serait null à l'hydratation et le `v-if` masquerait la
// section (mismatch d'hydratation). La clé garantit le transfert SSR → client.
const { data } = await useFetch<Temoignage[]>(`${baseUrl}/temoignages`, {
  key: 'temoignages',
  default: () => [],
})
const temoignages = computed<Temoignage[]>(() => data.value ?? [])

const activeIndex = ref(0)

const hasMultiple = computed(() => temoignages.value.length > 1)

const activeTemoignage = computed<Temoignage | null>(
  () => temoignages.value[activeIndex.value] ?? null,
)

// Garde l'index valide si la liste change/rétrécit.
watch(temoignages, (list) => {
  if (activeIndex.value > list.length - 1) {
    activeIndex.value = Math.max(0, list.length - 1)
  }
})

function goTo(index: number): void {
  const count = temoignages.value.length
  if (count === 0) return
  // Wrap around.
  activeIndex.value = ((index % count) + count) % count
}

function next(): void {
  goTo(activeIndex.value + 1)
}

function prev(): void {
  goTo(activeIndex.value - 1)
}
</script>

<template>
  <section
    v-if="temoignages.length"
    id="temoignages"
    class="temoignages section"
    aria-labelledby="temoignages-title"
  >
    <div class="container">
      <header class="temoignages__header" data-reveal>
        <span class="section__eyebrow">Témoignages</span>
        <h2 id="temoignages-title" class="section__title">
          Ils ont osé réussir
        </h2>
      </header>

      <div
        class="temoignages__carousel"
        role="group"
        aria-roledescription="carrousel"
        aria-label="Témoignages"
        aria-description="Utilisez les flèches gauche et droite pour faire défiler les témoignages."
        tabindex="0"
        data-reveal
        @keydown.left.prevent="prev"
        @keydown.right.prevent="next"
      >
        <div class="temoignages__viewport" aria-live="polite">
          <Transition name="temoignages-fade" mode="out-in">
            <article
              v-if="activeTemoignage"
              :key="activeTemoignage.id"
              class="temoignages__slide"
              role="group"
              aria-roledescription="diapositive"
              :aria-label="`Témoignage ${activeIndex + 1} sur ${temoignages.length}`"
            >
              <blockquote class="temoignages__quote">
                <span class="temoignages__mark" aria-hidden="true">“</span>
                <p class="temoignages__text">{{ activeTemoignage.content }}</p>
                <footer class="temoignages__author">
                  <cite class="temoignages__author-name">
                    {{ activeTemoignage.authorName }}
                  </cite>
                  <span
                    v-if="activeTemoignage.authorContext"
                    class="temoignages__author-context"
                  >
                    {{ activeTemoignage.authorContext }}
                  </span>
                </footer>
              </blockquote>
            </article>
          </Transition>
        </div>

        <div v-if="hasMultiple" class="temoignages__controls">
          <button
            type="button"
            class="temoignages__arrow"
            aria-label="Témoignage précédent"
            @click="prev"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <ul class="temoignages__dots">
            <li v-for="(t, i) in temoignages" :key="t.id">
              <button
                type="button"
                class="temoignages__dot"
                :class="{ 'is-active': i === activeIndex }"
                :aria-label="`Aller au témoignage ${i + 1}`"
                :aria-current="i === activeIndex ? 'true' : undefined"
                @click="goTo(i)"
              />
            </li>
          </ul>

          <button
            type="button"
            class="temoignages__arrow"
            aria-label="Témoignage suivant"
            @click="next"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/styles" as *;

.temoignages {
  // Contraste avec SectionPourquoi (gradient cream→sand) en amont
  // et SectionContact (cream) en aval : surface blanche.
  background-color: color("surface");
}

.temoignages__header {
  max-width: 44rem;
  margin-bottom: $spacing-2xl;
  text-align: center;
  margin-inline: auto;
}

.temoignages__carousel {
  max-width: 48rem;
  margin-inline: auto;
  border-radius: $radius-lg;

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: $shadow-ring;
  }
}

.temoignages__viewport {
  position: relative;
}

.temoignages__slide {
  display: block;
}

.temoignages__quote {
  position: relative;
  margin: 0;
  padding: $spacing-2xl;
  background-color: color("cream");
  border: 1px solid color("border");
  border-radius: $radius-lg;
  box-shadow: $shadow-soft;
  overflow: hidden;
}

.temoignages__mark {
  position: absolute;
  top: -0.35em;
  left: $spacing-lg;
  font-family: $font-display;
  font-size: 6rem;
  line-height: 1;
  color: alpha("primary", 0.16);
  pointer-events: none;
  user-select: none;
}

.temoignages__text {
  position: relative;
  margin: 0 0 $spacing-lg;
  font-size: $font-size-md;
  line-height: $line-height-relaxed;
  color: color("ink-soft");
}

.temoignages__author {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xs;
}

.temoignages__author-name {
  font-family: $font-display;
  font-style: normal;
  font-weight: 700;
  font-size: $font-size-md;
  color: color("ink");
}

.temoignages__author-context {
  font-size: $font-size-sm;
  color: shade("muted", 6);
}

.temoignages__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  margin-top: $spacing-xl;
}

.temoignages__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid color("border");
  background-color: color("surface");
  color: shade("primary", 4);
  cursor: pointer;
  transition: background-color $duration-fast $ease,
    border-color $duration-fast $ease,
    color $duration-fast $ease,
    transform $duration-fast $ease;

  &:hover {
    background-color: alpha("sage-soft", 0.18);
    border-color: color("primary");
    color: shade("primary", 16);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: $shadow-ring;
  }
}

.temoignages__dots {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.temoignages__dot {
  position: relative;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: color("muted", $lightness: 50);
    transform: translate(-50%, -50%);
    transition: background-color $duration-fast $ease,
      transform $duration-fast $ease;
  }

  &:hover::before {
    background-color: alpha("primary", 0.5);
  }

  &.is-active::before {
    background-color: color("primary");
    transform: translate(-50%, -50%) scale(1.25);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: $shadow-ring;
    border-radius: 50%;
  }
}

// Transition douce entre les diapositives.
.temoignages-fade-enter-active,
.temoignages-fade-leave-active {
  transition: opacity $duration-medium $ease,
    transform $duration-medium $ease;
}
.temoignages-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.temoignages-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .temoignages-fade-enter-active,
  .temoignages-fade-leave-active {
    transition: none;
  }
  .temoignages-fade-enter-from,
  .temoignages-fade-leave-to {
    opacity: 1;
    transform: none;
  }
  .temoignages__arrow:hover {
    transform: none;
  }
  .temoignages__dot.is-active::before {
    transform: translate(-50%, -50%);
  }
}

@include respond-above($breakpoint-md) {
  .temoignages__quote {
    padding: $spacing-2xl $spacing-3xl;
  }
  .temoignages__text {
    font-size: $font-size-lg;
  }
  .temoignages__mark {
    font-size: 8rem;
  }
}
</style>
