<script setup lang="ts">
import { ref, computed } from 'vue'
import { Settings, Save, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = ref({
  email: authStore.user?.email ?? '',
  newPassword: '',
  confirmPassword: '',
  currentPassword: '',
})

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showCurrentPassword = ref(false)

const saving = ref(false)
const submitted = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(type: 'success' | 'error', message: string): void {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  toastTimer = setTimeout(() => { toast.value = null }, 4000)
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailError = computed(() => {
  if (!submitted.value) return ''
  if (!form.value.email.trim()) return 'Ce champ est requis'
  if (!emailRegex.test(form.value.email)) return 'Adresse e-mail invalide'
  return ''
})

const newPasswordError = computed(() => {
  if (!submitted.value) return ''
  if (form.value.newPassword && form.value.newPassword.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères'
  }
  return ''
})

const confirmPasswordError = computed(() => {
  if (!submitted.value) return ''
  if (form.value.newPassword && form.value.confirmPassword !== form.value.newPassword) {
    return 'Les mots de passe ne correspondent pas'
  }
  return ''
})

const currentPasswordError = computed(() => {
  if (!submitted.value) return ''
  if (!form.value.currentPassword.trim()) return 'Ce champ est requis'
  return ''
})

const isFormValid = computed(() =>
  !emailError.value
  && !newPasswordError.value
  && !confirmPasswordError.value
  && !currentPasswordError.value,
)

const onSave = async (): Promise<void> => {
  submitted.value = true

  if (!isFormValid.value) {
    showToast('error', 'Veuillez corriger les erreurs avant d\'enregistrer.')
    return
  }

  saving.value = true
  try {
    const payload: { email: string; currentPassword: string; newPassword?: string } = {
      email: form.value.email,
      currentPassword: form.value.currentPassword,
    }
    if (form.value.newPassword) {
      payload.newPassword = form.value.newPassword
    }

    await api.put<{ message: string }>('/auth/credentials', payload)

    if (form.value.email !== authStore.user?.email) {
      authStore.user = { email: form.value.email }
    }

    form.value.newPassword = ''
    form.value.confirmPassword = ''
    form.value.currentPassword = ''
    submitted.value = false

    showToast('success', 'Vos paramètres ont été mis à jour.')
  } catch (err) {
    const error = err as Error
    if (error.message.includes('401')) {
      showToast('error', 'Mot de passe actuel incorrect.')
    } else {
      showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
    }
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <Settings :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Paramètres</h1>
        <p class="view__description">
          Modifiez votre adresse e-mail et votre mot de passe.
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

    <!-- Form -->
    <form class="settings-form" @submit.prevent="onSave" novalidate>
      <!-- Email -->
      <div class="settings-form__field">
        <label for="email" class="settings-form__label">Adresse e-mail</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="settings-form__input"
          :class="{ 'settings-form__input--error': emailError }"
          placeholder="admin@oser-reussir.fr"
        />
        <span v-if="emailError" class="settings-form__error">{{ emailError }}</span>
      </div>

      <!-- New password -->
      <div class="settings-form__field">
        <label for="newPassword" class="settings-form__label">Nouveau mot de passe</label>
        <span class="settings-form__hint">Laissez vide pour ne pas modifier le mot de passe (min. 8 caractères)</span>
        <div class="settings-form__input-wrapper">
          <input
            id="newPassword"
            v-model="form.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            class="settings-form__input settings-form__input--password"
            :class="{ 'settings-form__input--error': newPasswordError }"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="settings-form__toggle-password"
            :aria-label="showNewPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
            @click="showNewPassword = !showNewPassword"
          >
            <component :is="showNewPassword ? EyeOff : Eye" :size="18" />
          </button>
        </div>
        <span v-if="newPasswordError" class="settings-form__error">{{ newPasswordError }}</span>
      </div>

      <!-- Confirm password -->
      <div class="settings-form__field">
        <label for="confirmPassword" class="settings-form__label">Confirmer le nouveau mot de passe</label>
        <div class="settings-form__input-wrapper">
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="settings-form__input settings-form__input--password"
            :class="{ 'settings-form__input--error': confirmPasswordError }"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="settings-form__toggle-password"
            :aria-label="showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <component :is="showConfirmPassword ? EyeOff : Eye" :size="18" />
          </button>
        </div>
        <span v-if="confirmPasswordError" class="settings-form__error">{{ confirmPasswordError }}</span>
      </div>

      <!-- Current password -->
      <div class="settings-form__field">
        <label for="currentPassword" class="settings-form__label">Mot de passe actuel</label>
        <div class="settings-form__input-wrapper">
          <input
            id="currentPassword"
            v-model="form.currentPassword"
            :type="showCurrentPassword ? 'text' : 'password'"
            class="settings-form__input settings-form__input--password"
            :class="{ 'settings-form__input--error': currentPasswordError }"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="settings-form__toggle-password"
            :aria-label="showCurrentPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <component :is="showCurrentPassword ? EyeOff : Eye" :size="18" />
          </button>
        </div>
        <span v-if="currentPasswordError" class="settings-form__error">{{ currentPasswordError }}</span>
      </div>

      <div class="settings-form__actions">
        <button type="submit" class="settings-form__save" :disabled="saving">
          <Save :size="16" />
          <span>{{ saving ? 'Enregistrement…' : 'Enregistrer' }}</span>
        </button>
      </div>
    </form>
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

.settings-form {
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

  &__input-wrapper {
    position: relative;
  }

  &__input {
    width: 100%;
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

    &--password {
      padding-right: 2.75rem;
    }
  }

  &__toggle-password {
    position: absolute;
    right: $spacing-sm;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    color: $color-text-muted;
    cursor: pointer;
    border-radius: $radius-sm;
    transition: color $duration-fast $ease;

    &:hover {
      color: $color-text;
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
