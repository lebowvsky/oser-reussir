<script setup lang="ts">
import { ref } from 'vue'
import {
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Music2,
  Save,
} from 'lucide-vue-next'
import type { Component } from 'vue'

interface SocialLink {
  key: string
  label: string
  icon: Component
  placeholder: string
}

const platforms: readonly SocialLink[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: Facebook,
    placeholder: 'https://facebook.com/oser-reussir',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'https://instagram.com/oser-reussir',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: Music2,
    placeholder: 'https://tiktok.com/@oser-reussir',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/in/oser-reussir',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: Youtube,
    placeholder: 'https://youtube.com/@oser-reussir',
  },
]

const urls = ref<Record<string, string>>(
  Object.fromEntries(platforms.map((p) => [p.key, ''])),
)

const saving = ref(false)

const onSave = async (): Promise<void> => {
  saving.value = true
  // TODO: appel API pour sauvegarder les liens
  await new Promise((resolve) => setTimeout(resolve, 600))
  saving.value = false
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <Share2 :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Réseaux sociaux</h1>
        <p class="view__description">
          Définissez les liens vers vos réseaux sociaux. Ils apparaîtront dans le pied de page du site.
        </p>
      </div>
    </header>

    <form class="social-form" @submit.prevent="onSave">
      <div
        v-for="platform in platforms"
        :key="platform.key"
        class="social-form__row"
      >
        <label :for="platform.key" class="social-form__label">
          <component :is="platform.icon" :size="20" />
          <span>{{ platform.label }}</span>
        </label>
        <input
          :id="platform.key"
          v-model="urls[platform.key]"
          type="url"
          :placeholder="platform.placeholder"
          class="social-form__input"
        />
      </div>

      <div class="social-form__actions">
        <button
          type="submit"
          class="social-form__save"
          :disabled="saving"
        >
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

.social-form {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;

  &__row {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md 0;

    &:not(:last-child) {
      border-bottom: 1px solid $color-border;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    min-width: 140px;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
  }

  &__input {
    flex: 1;
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
}
</style>
