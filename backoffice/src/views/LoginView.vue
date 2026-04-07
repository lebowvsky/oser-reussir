<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/lib/api'
import { LogIn, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

const onSubmit = async (): Promise<void> => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }

  loading.value = true

  try {
    const data = await api.post<{ access_token: string }>('/auth/login', {
      email: email.value,
      password: password.value,
    })
    authStore.login(email.value, data.access_token)
    router.push('/admin')
  } catch {
    error.value = 'Identifiants incorrects. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Brand -->
      <div class="login-card__brand">
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="login-card__logo"
          width="56"
          height="56"
        />
        <h1 class="login-card__title">Oser Réussir</h1>
        <p class="login-card__subtitle">Administration</p>
      </div>

      <!-- Form -->
      <form class="login-card__form" @submit.prevent="onSubmit">
        <!-- Error -->
        <div v-if="error" class="login-card__error" role="alert">
          {{ error }}
        </div>

        <!-- Email -->
        <div class="login-card__field">
          <label for="email" class="login-card__label">Adresse e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="admin@oser-reussir.fr"
            class="login-card__input"
            required
          />
        </div>

        <!-- Password -->
        <div class="login-card__field">
          <label for="password" class="login-card__label">Mot de passe</label>
          <div class="login-card__input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••••"
              class="login-card__input login-card__input--password"
              required
            />
            <button
              type="button"
              class="login-card__toggle-password"
              :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
              @click="showPassword = !showPassword"
            >
              <component :is="showPassword ? EyeOff : Eye" :size="18" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="login-card__submit"
          :disabled="loading"
        >
          <LogIn v-if="!loading" :size="18" />
          <span>{{ loading ? 'Connexion…' : 'Se connecter' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $color-background;
  padding: $spacing-lg;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  padding: $spacing-2xl;
  box-shadow: $shadow-md;

  &__brand {
    text-align: center;
    margin-bottom: $spacing-xl;
  }

  &__logo {
    width: 56px;
    height: 56px;
    object-fit: contain;
    margin: 0 auto $spacing-md;
    border-radius: $radius-sm;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__subtitle {
    font-size: $font-size-sm;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  &__error {
    background-color: hsl(0, 72%, 96%);
    color: $color-danger;
    border: 1px solid hsl(0, 72%, 88%);
    border-radius: $radius-sm;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: 600;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
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
    font-size: $font-size-base;
    color: $color-text;
    background-color: $color-background;
    transition: border-color $duration-fast $ease,
      box-shadow $duration-fast $ease;

    &::placeholder {
      color: $color-text-muted;
      opacity: 0.5;
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

  &__submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-md;
    background-color: $color-primary;
    color: $color-white;
    border: none;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-base;
    font-weight: 700;
    cursor: pointer;
    transition: background-color $duration-fast $ease;
    margin-top: $spacing-sm;

    &:hover:not(:disabled) {
      background-color: $color-primary-dark;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
