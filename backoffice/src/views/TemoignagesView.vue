<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  MessageSquareQuote,
  Save,
  Plus,
  X,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from 'lucide-vue-next'
import { api } from '@/lib/api'

interface Temoignage {
  id: string
  authorName: string
  authorContext: string | null
  content: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

const temoignages = ref<Temoignage[]>([])
const loading = ref(true)
const saving = ref(false)
const deletingId = ref<string | null>(null)
const reordering = ref(false)

const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(type: 'success' | 'error', message: string): void {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  toastTimer = setTimeout(() => { toast.value = null }, 4000)
}

const form = ref<{ authorName: string; authorContext: string; content: string }>({
  authorName: '',
  authorContext: '',
  content: '',
})
const editingId = ref<string | null>(null)
const submitted = ref(false)

const isFormValid = computed(() =>
  form.value.authorName.trim() !== ''
  && form.value.content.trim() !== '',
)

const isEditing = computed(() => editingId.value !== null)

async function load(): Promise<void> {
  loading.value = true
  try {
    temoignages.value = await api.get<Temoignage[]>('/temoignages')
  } catch (error) {
    showToast('error', 'Impossible de charger les témoignages.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
})

function resetForm(): void {
  form.value = { authorName: '', authorContext: '', content: '' }
  editingId.value = null
  submitted.value = false
}

function startEdit(t: Temoignage): void {
  form.value = {
    authorName: t.authorName,
    authorContext: t.authorContext ?? '',
    content: t.content,
  }
  editingId.value = t.id
  submitted.value = false
}

function cancelEdit(): void {
  resetForm()
}

async function save(): Promise<void> {
  submitted.value = true

  if (!isFormValid.value) {
    showToast('error', 'Veuillez renseigner l\'auteur et le contenu du témoignage.')
    return
  }

  const payload = {
    authorName: form.value.authorName.trim(),
    authorContext: form.value.authorContext.trim() || null,
    content: form.value.content.trim(),
  }

  saving.value = true
  try {
    if (editingId.value) {
      await api.put<Temoignage>(`/temoignages/${editingId.value}`, payload)
      showToast('success', 'Le témoignage a été modifié avec succès.')
    } else {
      await api.post<Temoignage>('/temoignages', {
        ...payload,
        displayOrder: temoignages.value.length,
      })
      showToast('success', 'Le témoignage a été ajouté avec succès.')
    }
    await load()
    resetForm()
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
  } finally {
    saving.value = false
  }
}

async function remove(t: Temoignage): Promise<void> {
  if (!window.confirm('Supprimer ce témoignage ?')) return

  deletingId.value = t.id
  try {
    await api.del<void>(`/temoignages/${t.id}`)
    if (editingId.value === t.id) {
      resetForm()
    }
    await load()
    showToast('success', 'Le témoignage a été supprimé.')
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de la suppression.')
  } finally {
    deletingId.value = null
  }
}

async function swap(indexA: number, indexB: number): Promise<void> {
  const a = temoignages.value[indexA]
  const b = temoignages.value[indexB]
  if (!a || !b) return

  reordering.value = true
  try {
    await Promise.all([
      api.put<Temoignage>(`/temoignages/${a.id}`, { displayOrder: b.displayOrder }),
      api.put<Temoignage>(`/temoignages/${b.id}`, { displayOrder: a.displayOrder }),
    ])
    await load()
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors du réordonnancement.')
  } finally {
    reordering.value = false
  }
}

function moveUp(index: number): void {
  if (index <= 0) return
  swap(index, index - 1)
}

function moveDown(index: number): void {
  if (index >= temoignages.value.length - 1) return
  swap(index, index + 1)
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <MessageSquareQuote :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Témoignages</h1>
        <p class="view__description">
          Ajoutez, modifiez, réordonnez et supprimez les témoignages affichés sur le site.
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
      <!-- Add / Edit form -->
      <form class="temoignage-form" @submit.prevent="save" novalidate>
        <div class="temoignage-form__head">
          <h2 class="temoignage-form__title">
            {{ isEditing ? 'Modifier le témoignage' : 'Ajouter un témoignage' }}
          </h2>
        </div>

        <div class="temoignage-form__field">
          <label for="authorName" class="temoignage-form__label">Auteur</label>
          <input
            id="authorName"
            v-model="form.authorName"
            type="text"
            class="temoignage-form__input"
            :class="{ 'temoignage-form__input--error': submitted && !form.authorName.trim() }"
            placeholder="Ex : Sophie D."
          />
          <span v-if="submitted && !form.authorName.trim()" class="temoignage-form__error">Ce champ est requis</span>
        </div>

        <div class="temoignage-form__field">
          <label for="authorContext" class="temoignage-form__label">
            Contexte de l'auteur <span class="temoignage-form__optional">(optionnel)</span>
          </label>
          <input
            id="authorContext"
            v-model="form.authorContext"
            type="text"
            class="temoignage-form__input"
            placeholder="Ex : Maman de Léa, 15 ans"
          />
        </div>

        <div class="temoignage-form__field">
          <label for="content" class="temoignage-form__label">Témoignage</label>
          <textarea
            id="content"
            v-model="form.content"
            class="temoignage-form__textarea"
            :class="{ 'temoignage-form__textarea--error': submitted && !form.content.trim() }"
            placeholder="Ex : L'accompagnement a permis à ma fille de reprendre confiance…"
          />
          <span v-if="submitted && !form.content.trim()" class="temoignage-form__error">Ce champ est requis</span>
        </div>

        <div class="temoignage-form__actions">
          <button
            v-if="isEditing"
            type="button"
            class="temoignage-form__cancel"
            :disabled="saving"
            @click="cancelEdit"
          >
            <X :size="16" />
            <span>Annuler</span>
          </button>
          <button type="submit" class="temoignage-form__save" :disabled="saving">
            <Save v-if="isEditing" :size="16" />
            <Plus v-else :size="16" />
            <span>
              {{ saving ? 'Enregistrement…' : (isEditing ? 'Enregistrer' : 'Ajouter') }}
            </span>
          </button>
        </div>
      </form>

      <!-- List -->
      <section class="temoignage-list">
        <p v-if="temoignages.length === 0" class="temoignage-list__empty">
          Aucun témoignage pour le moment.
        </p>

        <ul v-else class="temoignage-list__items">
          <li
            v-for="(t, index) in temoignages"
            :key="t.id"
            class="temoignage-card"
            :class="{ 'temoignage-card--editing': editingId === t.id }"
          >
            <div class="temoignage-card__body">
              <div class="temoignage-card__head">
                <span class="temoignage-card__author">{{ t.authorName }}</span>
                <span v-if="t.authorContext" class="temoignage-card__context">— {{ t.authorContext }}</span>
              </div>
              <p class="temoignage-card__content">{{ t.content }}</p>
            </div>

            <div class="temoignage-card__actions">
              <button
                type="button"
                class="icon-btn"
                title="Monter"
                aria-label="Monter le témoignage"
                :disabled="index === 0 || reordering"
                @click="moveUp(index)"
              >
                <ChevronUp :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn"
                title="Descendre"
                aria-label="Descendre le témoignage"
                :disabled="index === temoignages.length - 1 || reordering"
                @click="moveDown(index)"
              >
                <ChevronDown :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn icon-btn--edit"
                title="Modifier"
                aria-label="Modifier le témoignage"
                @click="startEdit(t)"
              >
                <Pencil :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn icon-btn--delete"
                title="Supprimer"
                aria-label="Supprimer le témoignage"
                :disabled="deletingId === t.id"
                @click="remove(t)"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </li>
        </ul>
      </section>
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

.temoignage-form {
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;
  margin-bottom: $spacing-xl;

  &__head {
    margin-bottom: $spacing-md;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-primary;
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

  &__optional {
    font-weight: 400;
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

  &__textarea {
    padding: $spacing-sm $spacing-md;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text;
    background-color: $color-background;
    min-height: 100px;
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
    gap: $spacing-sm;
    padding-top: $spacing-md;
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

  &__cancel {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-lg;
    background-color: $color-background;
    color: $color-text;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-sm;
    font-weight: 600;
    cursor: pointer;
    transition: all $duration-fast $ease;

    &:hover:not(:disabled) {
      border-color: $color-text-muted;
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

.temoignage-list {
  &__empty {
    background-color: $color-surface;
    border: 1px dashed $color-border;
    border-radius: $radius-md;
    padding: $spacing-xl;
    text-align: center;
    font-size: $font-size-sm;
    color: $color-text-muted;
  }

  &__items {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin: 0;
    padding: 0;
  }
}

.temoignage-card {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  background-color: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;
  transition: border-color $duration-fast $ease, box-shadow $duration-fast $ease;

  &--editing {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.12);
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: $spacing-xs;
    margin-bottom: $spacing-xs;
  }

  &__author {
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-text;
  }

  &__context {
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  &__content {
    font-size: $font-size-sm;
    color: $color-text-muted;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    flex-shrink: 0;
  }
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background-color: $color-background;
  color: $color-text-muted;
  cursor: pointer;
  transition: all $duration-fast $ease;

  &:hover:not(:disabled) {
    border-color: $color-primary;
    color: $color-primary;
  }

  &:focus-visible {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.15);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &--edit {
    &:hover:not(:disabled) {
      border-color: $color-primary;
      color: $color-primary;
    }
  }

  &--delete {
    &:hover:not(:disabled) {
      border-color: hsl(0, 65%, 55%);
      color: hsl(0, 65%, 55%);
      background-color: hsla(0, 65%, 55%, 0.08);
    }

    &:focus-visible {
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
