<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Users, Save, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import type { PourquiContent } from '@/types/pourqui'
import RichTextEditor from '@/components/RichTextEditor.vue'

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim()

const iconOptions = [
  { value: 'heart', label: 'Cœur' },
  { value: 'spark', label: 'Étoile' },
  { value: 'grid', label: 'Grille' },
  { value: 'question', label: 'Question' },
  { value: 'compass', label: 'Boussole' },
]

const form = ref({
  eyebrow: '',
  title: '',
  lede: '',
  card1Title: '',
  card1Text: '',
  card1Icon: 'heart',
  card2Title: '',
  card2Text: '',
  card2Icon: 'spark',
  card3Title: '',
  card3Text: '',
  card3Icon: 'grid',
  card4Title: '',
  card4Text: '',
  card4Icon: 'question',
  card5Title: '',
  card5Text: '',
  card5Icon: 'compass',
  noteTag: '',
  noteMessage: '',
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
  && form.value.card1Title.trim() !== ''
  && form.value.card1Text.trim() !== ''
  && form.value.card1Icon.trim() !== ''
  && form.value.card2Title.trim() !== ''
  && form.value.card2Text.trim() !== ''
  && form.value.card2Icon.trim() !== ''
  && form.value.card3Title.trim() !== ''
  && form.value.card3Text.trim() !== ''
  && form.value.card3Icon.trim() !== ''
  && form.value.card4Title.trim() !== ''
  && form.value.card4Text.trim() !== ''
  && form.value.card4Icon.trim() !== ''
  && form.value.card5Title.trim() !== ''
  && form.value.card5Text.trim() !== ''
  && form.value.card5Icon.trim() !== ''
  && form.value.noteTag.trim() !== ''
  && stripHtml(form.value.noteMessage) !== '',
)

onMounted(async () => {
  try {
    const data = await api.get<PourquiContent>('/pourqui')
    form.value = {
      eyebrow: data.eyebrow,
      title: data.title,
      lede: data.lede,
      card1Title: data.card1Title,
      card1Text: data.card1Text,
      card1Icon: data.card1Icon,
      card2Title: data.card2Title,
      card2Text: data.card2Text,
      card2Icon: data.card2Icon,
      card3Title: data.card3Title,
      card3Text: data.card3Text,
      card3Icon: data.card3Icon,
      card4Title: data.card4Title,
      card4Text: data.card4Text,
      card4Icon: data.card4Icon,
      card5Title: data.card5Title,
      card5Text: data.card5Text,
      card5Icon: data.card5Icon,
      noteTag: data.noteTag,
      noteMessage: data.noteMessage,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les données de la section Pour qui.')
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
    await api.put<PourquiContent>('/pourqui', form.value)
    showToast('success', 'Les modifications ont été enregistrées avec succès.')
    submitted.value = false
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
  } finally {
    saving.value = false
  }
}

const cardLabel = (index: number): string => {
  const titleKey = `card${index}Title` as keyof typeof form.value
  const title = form.value[titleKey] as string
  return title.trim() ? `Carte ${index} — ${title}` : `Carte ${index}`
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <Users :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Pour qui ?</h1>
        <p class="view__description">
          Gérez les profils cibles et les cartes de la section « Pour qui ? ».
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
      <form class="pourqui-form" @submit.prevent="onSave" novalidate>
        <!-- En-tete -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">En-tête</legend>

          <div class="pourqui-form__field">
            <label for="eyebrow" class="pourqui-form__label">Sur-titre</label>
            <input
              id="eyebrow"
              v-model="form.eyebrow"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.eyebrow.trim() }"
              placeholder="Ex : Pour qui ?"
            />
            <span v-if="submitted && !form.eyebrow.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="title" class="pourqui-form__label">Titre de section</label>
            <textarea
              id="title"
              v-model="form.title"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.title.trim() }"
              placeholder="Ex : Un accompagnement pour les collégiens, lycéens et étudiants."
            />
            <span v-if="submitted && !form.title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="lede" class="pourqui-form__label">Chapeau</label>
            <textarea
              id="lede"
              v-model="form.lede"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.lede.trim() }"
              placeholder="Ex : Le coaching scolaire s'adresse aux jeunes..."
            />
            <span v-if="submitted && !form.lede.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Card 1 -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">{{ cardLabel(1) }}</legend>

          <div class="pourqui-form__field">
            <label for="card1Title" class="pourqui-form__label">Titre</label>
            <input
              id="card1Title"
              v-model="form.card1Title"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card1Title.trim() }"
              placeholder="Ex : Manque de confiance"
            />
            <span v-if="submitted && !form.card1Title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card1Text" class="pourqui-form__label">Texte</label>
            <textarea
              id="card1Text"
              v-model="form.card1Text"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.card1Text.trim() }"
            />
            <span v-if="submitted && !form.card1Text.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card1Icon" class="pourqui-form__label">Icône</label>
            <select
              id="card1Icon"
              v-model="form.card1Icon"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card1Icon.trim() }"
            >
              <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <span v-if="submitted && !form.card1Icon.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Card 2 -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">{{ cardLabel(2) }}</legend>

          <div class="pourqui-form__field">
            <label for="card2Title" class="pourqui-form__label">Titre</label>
            <input
              id="card2Title"
              v-model="form.card2Title"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card2Title.trim() }"
              placeholder="Ex : Démotivation"
            />
            <span v-if="submitted && !form.card2Title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card2Text" class="pourqui-form__label">Texte</label>
            <textarea
              id="card2Text"
              v-model="form.card2Text"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.card2Text.trim() }"
            />
            <span v-if="submitted && !form.card2Text.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card2Icon" class="pourqui-form__label">Icône</label>
            <select
              id="card2Icon"
              v-model="form.card2Icon"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card2Icon.trim() }"
            >
              <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <span v-if="submitted && !form.card2Icon.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Card 3 -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">{{ cardLabel(3) }}</legend>

          <div class="pourqui-form__field">
            <label for="card3Title" class="pourqui-form__label">Titre</label>
            <input
              id="card3Title"
              v-model="form.card3Title"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card3Title.trim() }"
              placeholder="Ex : Difficultés d'organisation"
            />
            <span v-if="submitted && !form.card3Title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card3Text" class="pourqui-form__label">Texte</label>
            <textarea
              id="card3Text"
              v-model="form.card3Text"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.card3Text.trim() }"
            />
            <span v-if="submitted && !form.card3Text.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card3Icon" class="pourqui-form__label">Icône</label>
            <select
              id="card3Icon"
              v-model="form.card3Icon"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card3Icon.trim() }"
            >
              <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <span v-if="submitted && !form.card3Icon.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Card 4 -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">{{ cardLabel(4) }}</legend>

          <div class="pourqui-form__field">
            <label for="card4Title" class="pourqui-form__label">Titre</label>
            <input
              id="card4Title"
              v-model="form.card4Title"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card4Title.trim() }"
              placeholder="Ex : Doute sur ses capacités"
            />
            <span v-if="submitted && !form.card4Title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card4Text" class="pourqui-form__label">Texte</label>
            <textarea
              id="card4Text"
              v-model="form.card4Text"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.card4Text.trim() }"
            />
            <span v-if="submitted && !form.card4Text.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card4Icon" class="pourqui-form__label">Icône</label>
            <select
              id="card4Icon"
              v-model="form.card4Icon"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card4Icon.trim() }"
            >
              <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <span v-if="submitted && !form.card4Icon.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Card 5 -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">{{ cardLabel(5) }}</legend>

          <div class="pourqui-form__field">
            <label for="card5Title" class="pourqui-form__label">Titre</label>
            <input
              id="card5Title"
              v-model="form.card5Title"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card5Title.trim() }"
              placeholder="Ex : Perte de sens"
            />
            <span v-if="submitted && !form.card5Title.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card5Text" class="pourqui-form__label">Texte</label>
            <textarea
              id="card5Text"
              v-model="form.card5Text"
              class="pourqui-form__textarea"
              :class="{ 'pourqui-form__textarea--error': submitted && !form.card5Text.trim() }"
            />
            <span v-if="submitted && !form.card5Text.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label for="card5Icon" class="pourqui-form__label">Icône</label>
            <select
              id="card5Icon"
              v-model="form.card5Icon"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.card5Icon.trim() }"
            >
              <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <span v-if="submitted && !form.card5Icon.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <!-- Note importante -->
        <fieldset class="pourqui-form__group">
          <legend class="pourqui-form__group-title">Note importante</legend>

          <div class="pourqui-form__field">
            <label for="noteTag" class="pourqui-form__label">Tag</label>
            <input
              id="noteTag"
              v-model="form.noteTag"
              type="text"
              class="pourqui-form__input"
              :class="{ 'pourqui-form__input--error': submitted && !form.noteTag.trim() }"
              placeholder="Ex : Important"
            />
            <span v-if="submitted && !form.noteTag.trim()" class="pourqui-form__error">Ce champ est requis</span>
          </div>

          <div class="pourqui-form__field">
            <label class="pourqui-form__label">Message</label>
            <RichTextEditor
              v-model="form.noteMessage"
              :class="{ 'rich-editor--error': submitted && !stripHtml(form.noteMessage) }"
            />
            <span v-if="submitted && !stripHtml(form.noteMessage)" class="pourqui-form__error">Ce champ est requis</span>
          </div>
        </fieldset>

        <div class="pourqui-form__actions">
          <button type="submit" class="pourqui-form__save" :disabled="saving">
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

.pourqui-form {
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
