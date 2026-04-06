<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Sparkles, Save, Eye, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { parseAccentTitle } from '@/lib/parse-accent'
import type { HeroContent } from '@/types/hero'

const form = ref({
  eyebrow: '',
  title: '',
  subtitle: '',
  primaryButtonText: '',
  secondaryButtonText: '',
})

const loading = ref(true)
const saving = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(type: 'success' | 'error', message: string): void {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  toastTimer = setTimeout(() => { toast.value = null }, 4000)
}

const titleSegments = computed(() => parseAccentTitle(form.value.title))

const isFormValid = computed(() =>
  form.value.eyebrow.trim() !== ''
  && form.value.title.trim() !== ''
  && form.value.subtitle.trim() !== ''
  && form.value.primaryButtonText.trim() !== ''
  && form.value.secondaryButtonText.trim() !== '',
)

onMounted(async () => {
  try {
    const data = await api.get<HeroContent>('/hero')
    form.value = {
      eyebrow: data.eyebrow,
      title: data.title,
      subtitle: data.subtitle,
      primaryButtonText: data.primaryButtonText,
      secondaryButtonText: data.secondaryButtonText,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les données du hero.')
  } finally {
    loading.value = false
  }
})

const submitted = ref(false)

const onSave = async (): Promise<void> => {
  submitted.value = true

  if (!isFormValid.value) {
    showToast('error', 'Veuillez remplir tous les champs avant d\'enregistrer.')
    return
  }

  saving.value = true
  try {
    await api.put<HeroContent>('/hero', form.value)
    showToast('success', 'Les modifications ont été enregistrées avec succès.')
    submitted.value = false
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <Sparkles :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Hero</h1>
        <p class="view__description">
          Gérez le titre principal, le sous-titre et l'appel à l'action de la section hero.
        </p>
      </div>
    </header>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast" :class="['toast', `toast--${toast.type}`]">
        <CheckCircle v-if="toast.type === 'success'" :size="18" />
        <AlertCircle v-else :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <template v-if="!loading">
      <!-- Live preview card -->
      <div class="hero-form__preview">
        <div class="hero-form__preview-label">
          <Eye :size="16" />
          <span>Aperçu du titre</span>
        </div>
        <p class="hero-form__preview-title">
          <template v-for="(seg, i) in titleSegments" :key="i">
            <span v-if="seg.accent" class="hero-form__preview-accent">{{ seg.text }}</span>
            <template v-else>{{ seg.text }}</template>
          </template>
        </p>
      </div>

      <!-- Form -->
      <form class="hero-form" @submit.prevent="onSave" novalidate>
        <div class="hero-form__field">
          <label for="eyebrow" class="hero-form__label">Sur-titre</label>
          <input
            id="eyebrow"
            v-model="form.eyebrow"
            type="text"
            class="hero-form__input"
            :class="{ 'hero-form__input--error': submitted && !form.eyebrow.trim() }"
            placeholder="Ex : Coaching scolaire"
          />
          <span v-if="submitted && !form.eyebrow.trim()" class="hero-form__error">Ce champ est requis</span>
        </div>

        <div class="hero-form__field">
          <label for="title" class="hero-form__label">Titre principal</label>
          <span class="hero-form__hint">
            Entourez de **double astérisques** les mots à accentuer
          </span>
          <textarea
            id="title"
            v-model="form.title"
            class="hero-form__textarea"
            :class="{ 'hero-form__textarea--error': submitted && !form.title.trim() }"
            placeholder="Ex : Donnez à votre enfant les **clés de la réussite**"
          />
          <span v-if="submitted && !form.title.trim()" class="hero-form__error">Ce champ est requis</span>
        </div>

        <div class="hero-form__field">
          <label for="subtitle" class="hero-form__label">Sous-titre</label>
          <textarea
            id="subtitle"
            v-model="form.subtitle"
            class="hero-form__textarea"
            :class="{ 'hero-form__textarea--error': submitted && !form.subtitle.trim() }"
            placeholder="Ex : Un accompagnement personnalisé pour révéler le potentiel de chaque élève."
          />
          <span v-if="submitted && !form.subtitle.trim()" class="hero-form__error">Ce champ est requis</span>
        </div>

        <div class="hero-form__field">
          <label for="primaryButtonText" class="hero-form__label">Texte du bouton principal</label>
          <input
            id="primaryButtonText"
            v-model="form.primaryButtonText"
            type="text"
            class="hero-form__input"
            :class="{ 'hero-form__input--error': submitted && !form.primaryButtonText.trim() }"
            placeholder="Ex : Prendre rendez-vous"
          />
          <span v-if="submitted && !form.primaryButtonText.trim()" class="hero-form__error">Ce champ est requis</span>
        </div>

        <div class="hero-form__field">
          <label for="secondaryButtonText" class="hero-form__label">Texte du bouton secondaire</label>
          <input
            id="secondaryButtonText"
            v-model="form.secondaryButtonText"
            type="text"
            class="hero-form__input"
            :class="{ 'hero-form__input--error': submitted && !form.secondaryButtonText.trim() }"
            placeholder="Ex : En savoir plus"
          />
          <span v-if="submitted && !form.secondaryButtonText.trim()" class="hero-form__error">Ce champ est requis</span>
        </div>

        <div class="hero-form__actions">
          <button type="submit" class="hero-form__save" :disabled="saving">
            <Save :size="16" />
            <span>{{ saving ? 'Enregistrement…' : 'Enregistrer' }}</span>
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.view {
  max-width: 800px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
  }

  &__icon {
    color: $color-primary;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-muted;
  }
}

.hero-form__preview {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-left: 3px solid $color-accent;
  border-radius: $radius-md;
  padding: $spacing-md $spacing-lg;
  margin-bottom: $spacing-lg;
}

.hero-form__preview-label {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  font-size: $font-size-xs;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $color-text-muted;
  margin-bottom: $spacing-sm;
}

.hero-form__preview-title {
  font-family: $font-display;
  font-size: $font-size-2xl;
  color: $color-text;
  line-height: 1.3;
}

.hero-form__preview-accent {
  color: $color-accent;
  font-style: italic;
}

.hero-form {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;

  &__field {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-md;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__hint {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-bottom: $spacing-xs;
  }

  &__input {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text;
    background-color: $color-background;
    transition: border-color $duration-fast $ease;

    &::placeholder {
      color: $color-text-muted;
      opacity: 0.6;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.15);
    }
  }

  &__textarea {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text;
    background-color: $color-background;
    min-height: 80px;
    resize: vertical;
    transition: border-color $duration-fast $ease;

    &::placeholder {
      color: $color-text-muted;
      opacity: 0.6;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.15);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding-top: $spacing-lg;
  }

  &__save {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-lg;
    background-color: $color-primary;
    color: $color-white;
    border: none;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-sm;
    font-weight: 600;
    cursor: pointer;
    transition: background-color $duration-fast $ease;

    &:hover:not(:disabled) {
      background-color: $color-primary-dark;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__error {
    font-size: $font-size-xs;
    color: hsl(0, 65%, 55%);
    margin-top: $spacing-xs;
  }

  &__input--error,
  &__textarea--error {
    border-color: hsl(0, 65%, 55%);

    &:focus {
      border-color: hsl(0, 65%, 55%);
      box-shadow: 0 0 0 3px hsla(0, 65%, 55%, 0.15);
    }
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: 600;
  margin-bottom: $spacing-lg;

  &--success {
    background-color: hsla(140, 38%, 42%, 0.1);
    border: 1px solid hsla(140, 38%, 42%, 0.3);
    color: $color-primary;
  }

  &--error {
    background-color: hsla(0, 65%, 55%, 0.1);
    border: 1px solid hsla(0, 65%, 55%, 0.3);
    color: hsl(0, 65%, 55%);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity $duration-fast $ease, transform $duration-fast $ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
