<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UserRound, Save, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import type { AproposContent } from '@/types/apropos'

const form = ref({
  eyebrow: '',
  title: '',
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  badgeNumber: '',
  badgeLabel: '',
  highlight1: '',
  highlight2: '',
  highlight3: '',
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
  && form.value.paragraph1.trim() !== ''
  && form.value.paragraph2.trim() !== ''
  && form.value.paragraph3.trim() !== ''
  && form.value.badgeNumber.trim() !== ''
  && form.value.badgeLabel.trim() !== ''
  && form.value.highlight1.trim() !== ''
  && form.value.highlight2.trim() !== ''
  && form.value.highlight3.trim() !== '',
)

onMounted(async () => {
  try {
    const data = await api.get<AproposContent>('/apropos')
    form.value = {
      eyebrow: data.eyebrow,
      title: data.title,
      paragraph1: data.paragraph1,
      paragraph2: data.paragraph2,
      paragraph3: data.paragraph3,
      badgeNumber: data.badgeNumber,
      badgeLabel: data.badgeLabel,
      highlight1: data.highlight1,
      highlight2: data.highlight2,
      highlight3: data.highlight3,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les données de la section À propos.')
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
    await api.put<AproposContent>('/apropos', form.value)
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
      <UserRound :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">À propos</h1>
        <p class="view__description">
          Modifiez la biographie, la photo et les éléments clés de la section « À propos ».
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
      <form class="apropos-form" @submit.prevent="onSave" novalidate>
        <div class="apropos-form__field">
          <label for="eyebrow" class="apropos-form__label">Sur-titre</label>
          <input
            id="eyebrow"
            v-model="form.eyebrow"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.eyebrow.trim() }"
            placeholder="Ex : À propos"
          />
          <span v-if="submitted && !form.eyebrow.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="title" class="apropos-form__label">Titre de section</label>
          <textarea
            id="title"
            v-model="form.title"
            class="apropos-form__textarea"
            :class="{ 'apropos-form__textarea--error': submitted && !form.title.trim() }"
            placeholder="Ex : Accompagner autrement..."
          />
          <span v-if="submitted && !form.title.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="paragraph1" class="apropos-form__label">Premier paragraphe</label>
          <textarea
            id="paragraph1"
            v-model="form.paragraph1"
            class="apropos-form__textarea"
            :class="{ 'apropos-form__textarea--error': submitted && !form.paragraph1.trim() }"
          />
          <span v-if="submitted && !form.paragraph1.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="paragraph2" class="apropos-form__label">Deuxième paragraphe</label>
          <textarea
            id="paragraph2"
            v-model="form.paragraph2"
            class="apropos-form__textarea"
            :class="{ 'apropos-form__textarea--error': submitted && !form.paragraph2.trim() }"
          />
          <span v-if="submitted && !form.paragraph2.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="paragraph3" class="apropos-form__label">Troisième paragraphe</label>
          <textarea
            id="paragraph3"
            v-model="form.paragraph3"
            class="apropos-form__textarea"
            :class="{ 'apropos-form__textarea--error': submitted && !form.paragraph3.trim() }"
          />
          <span v-if="submitted && !form.paragraph3.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="badgeNumber" class="apropos-form__label">Badge — chiffre</label>
          <input
            id="badgeNumber"
            v-model="form.badgeNumber"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.badgeNumber.trim() }"
            placeholder="Ex : 20+"
          />
          <span v-if="submitted && !form.badgeNumber.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="badgeLabel" class="apropos-form__label">Badge — libellé</label>
          <input
            id="badgeLabel"
            v-model="form.badgeLabel"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.badgeLabel.trim() }"
            placeholder="Ex : années d'expérience"
          />
          <span v-if="submitted && !form.badgeLabel.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="highlight1" class="apropos-form__label">Point clé 1</label>
          <input
            id="highlight1"
            v-model="form.highlight1"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.highlight1.trim() }"
            placeholder="Ex : Enseignante en lycée professionnel"
          />
          <span v-if="submitted && !form.highlight1.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="highlight2" class="apropos-form__label">Point clé 2</label>
          <input
            id="highlight2"
            v-model="form.highlight2"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.highlight2.trim() }"
          />
          <span v-if="submitted && !form.highlight2.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__field">
          <label for="highlight3" class="apropos-form__label">Point clé 3</label>
          <input
            id="highlight3"
            v-model="form.highlight3"
            type="text"
            class="apropos-form__input"
            :class="{ 'apropos-form__input--error': submitted && !form.highlight3.trim() }"
          />
          <span v-if="submitted && !form.highlight3.trim()" class="apropos-form__error">Ce champ est requis</span>
        </div>

        <div class="apropos-form__actions">
          <button type="submit" class="apropos-form__save" :disabled="saving">
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

.apropos-form {
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
