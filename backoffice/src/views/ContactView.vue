<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Mail, Phone, Save, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import type { ContactContent } from '@/types/contact'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = ref({
  phone: '',
  email: '',
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

const isEmailValid = computed(() => EMAIL_REGEX.test(form.value.email.trim()))

const isFormValid = computed(() =>
  form.value.phone.trim() !== ''
  && form.value.email.trim() !== ''
  && isEmailValid.value,
)

onMounted(async () => {
  try {
    const data = await api.get<ContactContent>('/contact')
    form.value = {
      phone: data.phone,
      email: data.email,
    }
  } catch (error) {
    showToast('error', 'Impossible de charger les informations de contact.')
  } finally {
    loading.value = false
  }
})

const submitted = ref(false)

const onSave = async (): Promise<void> => {
  submitted.value = true

  if (!isFormValid.value) {
    showToast('error', 'Veuillez corriger les erreurs avant d\'enregistrer.')
    return
  }

  saving.value = true
  try {
    await api.put<ContactContent>('/contact', form.value)
    showToast('success', 'Les informations de contact ont été mises à jour.')
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
      <Mail :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Contact</h1>
        <p class="view__description">
          Gérez les informations de contact affichées sur le site.
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
      <form class="contact-form" @submit.prevent="onSave" novalidate>
        <div class="contact-form__field">
          <label for="phone" class="contact-form__label">
            <Phone :size="14" class="contact-form__label-icon" />
            Téléphone
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="contact-form__input"
            :class="{ 'contact-form__input--error': submitted && !form.phone.trim() }"
            placeholder="Ex : 06 12 34 56 78"
          />
          <span v-if="submitted && !form.phone.trim()" class="contact-form__error">Ce champ est requis</span>
        </div>

        <div class="contact-form__field">
          <label for="email" class="contact-form__label">
            <Mail :size="14" class="contact-form__label-icon" />
            Adresse e-mail
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="contact-form__input"
            :class="{ 'contact-form__input--error': submitted && (!form.email.trim() || !isEmailValid) }"
            placeholder="Ex : contact@oser-reussir.fr"
          />
          <span v-if="submitted && !form.email.trim()" class="contact-form__error">Ce champ est requis</span>
          <span v-else-if="submitted && !isEmailValid" class="contact-form__error">Veuillez saisir une adresse e-mail valide</span>
        </div>

        <div class="contact-form__actions">
          <button type="submit" class="contact-form__save" :disabled="saving">
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

.contact-form {
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
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__label-icon {
    color: $color-text-muted;
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

  &__input--error {
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
