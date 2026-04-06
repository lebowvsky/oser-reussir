<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { HandHeart, Save, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import type { AccompagnementContent } from '@/types/accompagnement'

const form = ref({
  eyebrow: '',
  title: '',
  lede: '',
  step1Title: '',
  step1Text: '',
  step1Highlight: false,
  step2Title: '',
  step2Text: '',
  step2Highlight: false,
  step3Title: '',
  step3Text: '',
  step3Highlight: false,
  ctaTitle: '',
  ctaText: '',
})

const loading = ref(true)
const saving = ref(false)
const submitted = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(type: 'success' | 'error', message: string): void {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  toastTimer = setTimeout(() => { toast.value = null }, 4000)
}

const isFormValid = computed(() =>
  form.value.eyebrow.trim() !== ''
  && form.value.title.trim() !== ''
  && form.value.lede.trim() !== ''
  && form.value.step1Title.trim() !== ''
  && form.value.step1Text.trim() !== ''
  && form.value.step2Title.trim() !== ''
  && form.value.step2Text.trim() !== ''
  && form.value.step3Title.trim() !== ''
  && form.value.step3Text.trim() !== ''
  && form.value.ctaTitle.trim() !== ''
  && form.value.ctaText.trim() !== '',
)

onMounted(async () => {
  try {
    const data = await api.get<AccompagnementContent>('/accompagnement')
    form.value = {
      eyebrow: data.eyebrow,
      title: data.title,
      lede: data.lede,
      step1Title: data.step1Title,
      step1Text: data.step1Text,
      step1Highlight: data.step1Highlight,
      step2Title: data.step2Title,
      step2Text: data.step2Text,
      step2Highlight: data.step2Highlight,
      step3Title: data.step3Title,
      step3Text: data.step3Text,
      step3Highlight: data.step3Highlight,
      ctaTitle: data.ctaTitle,
      ctaText: data.ctaText,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les données de la section Accompagnement.')
  } finally {
    loading.value = false
  }
})

const onSave = async (): Promise<void> => {
  submitted.value = true

  if (!isFormValid.value) {
    showToast('error', 'Veuillez remplir tous les champs avant d\'enregistrer.')
    return
  }

  saving.value = true
  try {
    await api.put<AccompagnementContent>('/accompagnement', form.value)
    showToast('success', 'Les modifications ont été enregistrées avec succès.')
    submitted.value = false
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
  } finally {
    saving.value = false
  }
}

const stepLabel = (index: number): string => {
  const titleKey = `step${index}Title` as keyof typeof form.value
  const title = form.value[titleKey] as string
  return title.trim() ? `Étape ${index} — ${title}` : `Étape ${index}`
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <HandHeart :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Accompagnement</h1>
        <p class="view__description">
          Modifiez les étapes du processus d'accompagnement et la méthodologie.
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
      <!-- Form -->
      <form class="accompagnement-form" @submit.prevent="onSave" novalidate>
        <!-- En-tête -->
        <fieldset class="accompagnement-form__group">
          <legend class="accompagnement-form__group-title">En-tête</legend>

          <div class="accompagnement-form__field">
            <label for="eyebrow" class="accompagnement-form__label">Sur-titre</label>
            <input
              id="eyebrow"
              v-model="form.eyebrow"
              type="text"
              class="accompagnement-form__input"
              :class="{ 'accompagnement-form__input--error': submitted && !form.eyebrow.trim() }"
              placeholder="Ex : Déroulé"
            />
            <span v-if="submitted && !form.eyebrow.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="title" class="accompagnement-form__label">Titre de section</label>
            <textarea
              id="title"
              v-model="form.title"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.title.trim() }"
              placeholder="Ex : Comment se déroule l'accompagnement ?"
            />
            <span v-if="submitted && !form.title.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="lede" class="accompagnement-form__label">Chapeau</label>
            <textarea
              id="lede"
              v-model="form.lede"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.lede.trim() }"
              placeholder="Ex : Un parcours simple..."
            />
            <span v-if="submitted && !form.lede.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Étape 1 -->
        <fieldset class="accompagnement-form__group">
          <legend class="accompagnement-form__group-title">{{ stepLabel(1) }}</legend>

          <div class="accompagnement-form__field">
            <label for="step1Title" class="accompagnement-form__label">Titre</label>
            <input
              id="step1Title"
              v-model="form.step1Title"
              type="text"
              class="accompagnement-form__input"
              :class="{ 'accompagnement-form__input--error': submitted && !form.step1Title.trim() }"
              placeholder="Ex : Prise de contact"
            />
            <span v-if="submitted && !form.step1Title.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="step1Text" class="accompagnement-form__label">Texte</label>
            <textarea
              id="step1Text"
              v-model="form.step1Text"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.step1Text.trim() }"
            />
            <span v-if="submitted && !form.step1Text.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__checkbox-field">
            <input
              id="step1Highlight"
              v-model="form.step1Highlight"
              type="checkbox"
              class="accompagnement-form__checkbox"
            />
            <label for="step1Highlight" class="accompagnement-form__checkbox-label">Mettre en avant (badge « Gratuit »)</label>
          </div>
        </fieldset>

        <!-- Étape 2 -->
        <fieldset class="accompagnement-form__group">
          <legend class="accompagnement-form__group-title">{{ stepLabel(2) }}</legend>

          <div class="accompagnement-form__field">
            <label for="step2Title" class="accompagnement-form__label">Titre</label>
            <input
              id="step2Title"
              v-model="form.step2Title"
              type="text"
              class="accompagnement-form__input"
              :class="{ 'accompagnement-form__input--error': submitted && !form.step2Title.trim() }"
              placeholder="Ex : Diagnostic"
            />
            <span v-if="submitted && !form.step2Title.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="step2Text" class="accompagnement-form__label">Texte</label>
            <textarea
              id="step2Text"
              v-model="form.step2Text"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.step2Text.trim() }"
            />
            <span v-if="submitted && !form.step2Text.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__checkbox-field">
            <input
              id="step2Highlight"
              v-model="form.step2Highlight"
              type="checkbox"
              class="accompagnement-form__checkbox"
            />
            <label for="step2Highlight" class="accompagnement-form__checkbox-label">Mettre en avant (badge « Gratuit »)</label>
          </div>
        </fieldset>

        <!-- Étape 3 -->
        <fieldset class="accompagnement-form__group">
          <legend class="accompagnement-form__group-title">{{ stepLabel(3) }}</legend>

          <div class="accompagnement-form__field">
            <label for="step3Title" class="accompagnement-form__label">Titre</label>
            <input
              id="step3Title"
              v-model="form.step3Title"
              type="text"
              class="accompagnement-form__input"
              :class="{ 'accompagnement-form__input--error': submitted && !form.step3Title.trim() }"
              placeholder="Ex : Séances de coaching"
            />
            <span v-if="submitted && !form.step3Title.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="step3Text" class="accompagnement-form__label">Texte</label>
            <textarea
              id="step3Text"
              v-model="form.step3Text"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.step3Text.trim() }"
            />
            <span v-if="submitted && !form.step3Text.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__checkbox-field">
            <input
              id="step3Highlight"
              v-model="form.step3Highlight"
              type="checkbox"
              class="accompagnement-form__checkbox"
            />
            <label for="step3Highlight" class="accompagnement-form__checkbox-label">Mettre en avant (badge « Gratuit »)</label>
          </div>
        </fieldset>

        <!-- Appel à l'action -->
        <fieldset class="accompagnement-form__group">
          <legend class="accompagnement-form__group-title">Appel à l'action</legend>

          <div class="accompagnement-form__field">
            <label for="ctaTitle" class="accompagnement-form__label">Titre du CTA</label>
            <input
              id="ctaTitle"
              v-model="form.ctaTitle"
              type="text"
              class="accompagnement-form__input"
              :class="{ 'accompagnement-form__input--error': submitted && !form.ctaTitle.trim() }"
              placeholder="Ex : Prêt à commencer ?"
            />
            <span v-if="submitted && !form.ctaTitle.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>

          <div class="accompagnement-form__field">
            <label for="ctaText" class="accompagnement-form__label">Texte du CTA</label>
            <textarea
              id="ctaText"
              v-model="form.ctaText"
              class="accompagnement-form__textarea"
              :class="{ 'accompagnement-form__textarea--error': submitted && !form.ctaText.trim() }"
            />
            <span v-if="submitted && !form.ctaText.trim()" class="accompagnement-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <div class="accompagnement-form__actions">
          <button type="submit" class="accompagnement-form__save" :disabled="saving">
            <Save :size="16" />
            <span>{{ saving ? 'Enregistrement...' : 'Enregistrer' }}</span>
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

.accompagnement-form {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;

  &__group {
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    padding: $spacing-lg;
    margin-bottom: $spacing-lg;
  }

  &__group-title {
    font-family: $font-display;
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-primary;
    padding: 0 $spacing-sm;
  }

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

  &__checkbox-field {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__checkbox {
    width: 18px;
    height: 18px;
    accent-color: $color-primary;
    cursor: pointer;
  }

  &__checkbox-label {
    font-size: $font-size-sm;
    color: $color-text;
    cursor: pointer;
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
