<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { HelpCircle, Save, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import type { PourquoiContent } from '@/types/pourquoi'

const form = ref({
  eyebrow: '',
  title: '',
  lede: '',
  paragraph: '',
  cardTitle: '',
  benefice1: '',
  benefice2: '',
  benefice3: '',
  benefice4: '',
  benefice5: '',
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

const isFormValid = computed(() =>
  form.value.eyebrow.trim() !== ''
  && form.value.title.trim() !== ''
  && form.value.lede.trim() !== ''
  && form.value.paragraph.trim() !== ''
  && form.value.cardTitle.trim() !== ''
  && form.value.benefice1.trim() !== ''
  && form.value.benefice2.trim() !== ''
  && form.value.benefice3.trim() !== ''
  && form.value.benefice4.trim() !== ''
  && form.value.benefice5.trim() !== '',
)

onMounted(async () => {
  try {
    const data = await api.get<PourquoiContent>('/pourquoi')
    form.value = {
      eyebrow: data.eyebrow,
      title: data.title,
      lede: data.lede,
      paragraph: data.paragraph,
      cardTitle: data.cardTitle,
      benefice1: data.benefice1,
      benefice2: data.benefice2,
      benefice3: data.benefice3,
      benefice4: data.benefice4,
      benefice5: data.benefice5,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les données de la section Pourquoi.')
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
    await api.put<PourquoiContent>('/pourquoi', form.value)
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
      <HelpCircle :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Pourquoi ?</h1>
        <p class="view__description">
          Modifiez les arguments et la citation de la section « Pourquoi Oser Réussir ? ».
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
      <form class="pourquoi-form" @submit.prevent="onSave" novalidate>
        <!-- En-tête -->
        <fieldset class="pourquoi-form__group">
          <legend class="pourquoi-form__group-title">En-tête</legend>

          <div class="pourquoi-form__field">
            <label for="eyebrow" class="pourquoi-form__label">Sur-titre</label>
            <input
              id="eyebrow"
              v-model="form.eyebrow"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.eyebrow.trim() }"
              placeholder="Ex : Pourquoi Oser Réussir ?"
            />
            <span v-if="submitted && !form.eyebrow.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="title" class="pourquoi-form__label">Titre de section</label>
            <textarea
              id="title"
              v-model="form.title"
              class="pourquoi-form__textarea"
              :class="{ 'pourquoi-form__textarea--error': submitted && !form.title.trim() }"
              placeholder="Ex : Parce que chaque jeune possède des ressources souvent insoupçonnées."
            />
            <span v-if="submitted && !form.title.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="lede" class="pourquoi-form__label">Chapeau</label>
            <textarea
              id="lede"
              v-model="form.lede"
              class="pourquoi-form__textarea"
              :class="{ 'pourquoi-form__textarea--error': submitted && !form.lede.trim() }"
              placeholder="Ex : Parfois, il suffit d'un espace d'écoute..."
            />
            <span v-if="submitted && !form.lede.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="paragraph" class="pourquoi-form__label">Paragraphe</label>
            <textarea
              id="paragraph"
              v-model="form.paragraph"
              class="pourquoi-form__textarea"
              :class="{ 'pourquoi-form__textarea--error': submitted && !form.paragraph.trim() }"
              placeholder="Ex : Le coaching scolaire propose une approche différente..."
            />
            <span v-if="submitted && !form.paragraph.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Carte bénéfices -->
        <fieldset class="pourquoi-form__group">
          <legend class="pourquoi-form__group-title">Carte bénéfices</legend>

          <div class="pourquoi-form__field">
            <label for="cardTitle" class="pourquoi-form__label">Titre de la carte</label>
            <input
              id="cardTitle"
              v-model="form.cardTitle"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.cardTitle.trim() }"
              placeholder="Ex : Ce que le coaching apporte"
            />
            <span v-if="submitted && !form.cardTitle.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="benefice1" class="pourquoi-form__label">Bénéfice 1</label>
            <input
              id="benefice1"
              v-model="form.benefice1"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.benefice1.trim() }"
              placeholder="Ex : Reprendre confiance en soi"
            />
            <span v-if="submitted && !form.benefice1.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="benefice2" class="pourquoi-form__label">Bénéfice 2</label>
            <input
              id="benefice2"
              v-model="form.benefice2"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.benefice2.trim() }"
              placeholder="Ex : Retrouver la motivation"
            />
            <span v-if="submitted && !form.benefice2.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="benefice3" class="pourquoi-form__label">Bénéfice 3</label>
            <input
              id="benefice3"
              v-model="form.benefice3"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.benefice3.trim() }"
              placeholder="Ex : Mieux s'organiser au quotidien"
            />
            <span v-if="submitted && !form.benefice3.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="benefice4" class="pourquoi-form__label">Bénéfice 4</label>
            <input
              id="benefice4"
              v-model="form.benefice4"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.benefice4.trim() }"
              placeholder="Ex : Identifier des méthodes adaptées"
            />
            <span v-if="submitted && !form.benefice4.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>

          <div class="pourquoi-form__field">
            <label for="benefice5" class="pourquoi-form__label">Bénéfice 5</label>
            <input
              id="benefice5"
              v-model="form.benefice5"
              type="text"
              class="pourquoi-form__input"
              :class="{ 'pourquoi-form__input--error': submitted && !form.benefice5.trim() }"
              placeholder="Ex : Dépasser les croyances limitantes"
            />
            <span v-if="submitted && !form.benefice5.trim()" class="pourquoi-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <div class="pourquoi-form__actions">
          <button type="submit" class="pourquoi-form__save" :disabled="saving">
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

.pourquoi-form {
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
