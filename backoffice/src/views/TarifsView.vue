<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BadgeEuro,
  Save,
  Plus,
  X,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-vue-next'
import { api } from '@/lib/api'

interface Tarif {
  id: string
  title: string
  price: string
  description: string
  displayOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const MAX_TARIFS = 5

const tarifs = ref<Tarif[]>([])
const loading = ref(true)
const saving = ref(false)
const deletingId = ref<string | null>(null)
const reordering = ref(false)
const togglingId = ref<string | null>(null)

const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(type: 'success' | 'error', message: string): void {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  toastTimer = setTimeout(() => { toast.value = null }, 4000)
}

const form = ref<{ title: string; price: string; description: string; isActive: boolean }>({
  title: '',
  price: '',
  description: '',
  isActive: true,
})
const editingId = ref<string | null>(null)
const submitted = ref(false)

const isFormValid = computed(() =>
  form.value.title.trim() !== ''
  && form.value.price.trim() !== ''
  && form.value.description.trim() !== '',
)

const isEditing = computed(() => editingId.value !== null)

// Dérivé du maximum et non du nombre de tarifs : après une suppression au
// milieu de la liste, `tarifs.value.length` réattribue un displayOrder déjà
// pris, ce qui rendait le réordonnancement silencieusement inopérant.
const nextDisplayOrder = computed(() =>
  tarifs.value.length ? Math.max(...tarifs.value.map((t) => t.displayOrder)) + 1 : 0,
)

// Plafond de 5 tarifs : le serveur reste la source de vérité (il renvoie 400),
// l'UI empêche simplement l'ajout d'un 6e tarif. L'édition reste toujours possible.
const canAdd = computed(() => tarifs.value.length < MAX_TARIFS)
const isLimitReached = computed(() => !canAdd.value && !isEditing.value)

async function load(): Promise<void> {
  loading.value = true
  try {
    tarifs.value = await api.get<Tarif[]>('/tarifs/all')
  } catch (error) {
    showToast('error', 'Impossible de charger les tarifs.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
})

function resetForm(): void {
  form.value = { title: '', price: '', description: '', isActive: true }
  editingId.value = null
  submitted.value = false
}

function startEdit(t: Tarif): void {
  form.value = {
    title: t.title,
    price: t.price,
    description: t.description,
    isActive: t.isActive,
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
    showToast('error', 'Veuillez renseigner le titre, le prix et la description du tarif.')
    return
  }

  if (isLimitReached.value) {
    showToast('error', `Vous avez atteint le maximum de ${MAX_TARIFS} tarifs.`)
    return
  }

  const payload = {
    title: form.value.title.trim(),
    price: form.value.price.trim(),
    description: form.value.description.trim(),
    isActive: form.value.isActive,
  }

  saving.value = true
  try {
    if (editingId.value) {
      await api.put<Tarif>(`/tarifs/${editingId.value}`, payload)
      showToast('success', 'Le tarif a été modifié avec succès.')
    } else {
      await api.post<Tarif>('/tarifs', {
        ...payload,
        displayOrder: nextDisplayOrder.value,
      })
      showToast('success', 'Le tarif a été ajouté avec succès.')
    }
    await load()
    resetForm()
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de l\'enregistrement.')
  } finally {
    saving.value = false
  }
}

async function remove(t: Tarif): Promise<void> {
  if (!window.confirm('Supprimer ce tarif ?')) return

  deletingId.value = t.id
  try {
    await api.del<void>(`/tarifs/${t.id}`)
    if (editingId.value === t.id) {
      resetForm()
    }
    await load()
    showToast('success', 'Le tarif a été supprimé.')
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors de la suppression.')
  } finally {
    deletingId.value = null
  }
}

async function toggleActive(t: Tarif): Promise<void> {
  togglingId.value = t.id
  try {
    await api.put<Tarif>(`/tarifs/${t.id}`, { isActive: !t.isActive })
    await load()
    showToast(
      'success',
      t.isActive ? 'Le tarif est désormais masqué sur le site.' : 'Le tarif est désormais visible sur le site.',
    )
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors du changement de visibilité.')
  } finally {
    togglingId.value = null
  }
}

async function swap(indexA: number, indexB: number): Promise<void> {
  const next = [...tarifs.value]
  const a = next[indexA]
  const b = next[indexB]
  if (!a || !b) return
  next[indexA] = b
  next[indexB] = a

  reordering.value = true
  try {
    // Réindexation complète plutôt qu'un échange de valeurs : immunise contre
    // d'éventuels displayOrder dupliqués en base.
    for (const [i, t] of next.entries()) {
      if (t.displayOrder !== i) {
        await api.put<Tarif>(`/tarifs/${t.id}`, { displayOrder: i })
      }
    }
    await load()
  } catch (error) {
    showToast('error', 'Une erreur est survenue lors du réordonnancement.')
    // Resynchronise l'affichage après un échec partiel.
    await load()
  } finally {
    reordering.value = false
  }
}

function moveUp(index: number): void {
  if (index <= 0) return
  swap(index, index - 1)
}

function moveDown(index: number): void {
  if (index >= tarifs.value.length - 1) return
  swap(index, index + 1)
}
</script>

<template>
  <div class="view">
    <header class="view__header">
      <BadgeEuro :size="28" class="view__icon" />
      <div>
        <h1 class="view__title">Tarifs</h1>
        <p class="view__description">
          Ajoutez, modifiez, réordonnez et supprimez les tarifs affichés sur le site,
          dans la limite de {{ MAX_TARIFS }} tarifs. Seuls les tarifs actifs apparaissent sur le site.
        </p>
      </div>
    </header>

    <!-- Toast notification -->
    <Transition name="toast">
      <div
        v-if="toast"
        :class="['toast', `toast--${toast.type}`]"
        role="status"
        aria-live="polite"
      >
        <CheckCircle v-if="toast.type === 'success'" :size="18" />
        <AlertCircle v-else :size="18" />
        <span>{{ toast.message }}</span>
      </div>
    </Transition>

    <template v-if="!loading">
      <!-- Add / Edit form -->
      <form class="tarif-form" @submit.prevent="save" novalidate>
        <div class="tarif-form__head">
          <h2 class="tarif-form__title">
            {{ isEditing ? 'Modifier le tarif' : 'Ajouter un tarif' }}
          </h2>
        </div>

        <p v-if="isLimitReached" class="tarif-form__limit">
          <AlertCircle :size="16" />
          <span>
            Vous avez atteint le maximum de {{ MAX_TARIFS }} tarifs.
            Supprimez-en un pour pouvoir en ajouter un nouveau.
          </span>
        </p>

        <div class="tarif-form__field">
          <label for="title" class="tarif-form__label">Titre</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            maxlength="120"
            class="tarif-form__input"
            :class="{ 'tarif-form__input--error': submitted && !form.title.trim() }"
            :aria-invalid="submitted && !form.title.trim() ? 'true' : undefined"
            :aria-describedby="submitted && !form.title.trim() ? 'title-error' : undefined"
            placeholder="Ex : Séance individuelle"
          />
          <span v-if="submitted && !form.title.trim()" id="title-error" class="tarif-form__error">
            Ce champ est requis
          </span>
        </div>

        <div class="tarif-form__field">
          <label for="price" class="tarif-form__label">Prix</label>
          <input
            id="price"
            v-model="form.price"
            type="text"
            maxlength="50"
            class="tarif-form__input"
            :class="{ 'tarif-form__input--error': submitted && !form.price.trim() }"
            :aria-invalid="submitted && !form.price.trim() ? 'true' : undefined"
            :aria-describedby="submitted && !form.price.trim() ? 'price-hint price-error' : 'price-hint'"
            placeholder="Ex : 55 € / séance"
          />
          <span id="price-hint" class="tarif-form__hint">
            Texte libre : vous pouvez écrire « 55 € / séance », mais aussi « Offerte » ou « Sur devis ».
          </span>
          <span v-if="submitted && !form.price.trim()" id="price-error" class="tarif-form__error">
            Ce champ est requis
          </span>
        </div>

        <div class="tarif-form__field">
          <label for="description" class="tarif-form__label">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            maxlength="400"
            class="tarif-form__textarea"
            :class="{ 'tarif-form__textarea--error': submitted && !form.description.trim() }"
            :aria-invalid="submitted && !form.description.trim() ? 'true' : undefined"
            :aria-describedby="submitted && !form.description.trim() ? 'description-error' : undefined"
            placeholder="Ex : Un accompagnement d'une heure pour aider votre enfant à retrouver méthode et confiance…"
          />
          <span v-if="submitted && !form.description.trim()" id="description-error" class="tarif-form__error">
            Ce champ est requis
          </span>
        </div>

        <div class="tarif-form__field tarif-form__field--checkbox">
          <label for="isActive" class="tarif-form__checkbox-label">
            <input
              id="isActive"
              v-model="form.isActive"
              type="checkbox"
              class="tarif-form__checkbox"
              aria-describedby="isActive-hint"
            />
            <span>Tarif visible sur le site</span>
          </label>
          <span id="isActive-hint" class="tarif-form__hint">
            Décochez pour préparer un tarif sans l'afficher publiquement.
          </span>
        </div>

        <div class="tarif-form__actions">
          <button
            v-if="isEditing"
            type="button"
            class="tarif-form__cancel"
            :disabled="saving"
            @click="cancelEdit"
          >
            <X :size="16" />
            <span>Annuler</span>
          </button>
          <button
            type="submit"
            class="tarif-form__save"
            :disabled="saving || isLimitReached"
          >
            <Save v-if="isEditing" :size="16" />
            <Plus v-else :size="16" />
            <span>
              {{ saving ? 'Enregistrement…' : (isEditing ? 'Enregistrer' : 'Ajouter') }}
            </span>
          </button>
        </div>
      </form>

      <!-- List -->
      <section class="tarif-list">
        <div class="tarif-list__head">
          <h2 class="tarif-list__heading">Tarifs enregistrés</h2>
          <span class="tarif-list__counter">{{ tarifs.length }} / {{ MAX_TARIFS }} tarifs</span>
        </div>

        <p v-if="tarifs.length === 0" class="tarif-list__empty">
          Aucun tarif pour le moment.
        </p>

        <ul v-else class="tarif-list__items">
          <li
            v-for="(t, index) in tarifs"
            :key="t.id"
            class="tarif-card"
            :class="{
              'tarif-card--editing': editingId === t.id,
              'tarif-card--inactive': !t.isActive,
            }"
          >
            <div class="tarif-card__body">
              <div class="tarif-card__head">
                <span class="tarif-card__title">{{ t.title }}</span>
                <span class="tarif-card__price">{{ t.price }}</span>
                <span v-if="!t.isActive" class="tarif-card__badge">Masqué</span>
              </div>
              <p class="tarif-card__description">{{ t.description }}</p>
            </div>

            <div class="tarif-card__actions">
              <button
                type="button"
                class="icon-btn"
                title="Monter"
                aria-label="Monter le tarif"
                :disabled="index === 0 || reordering"
                @click="moveUp(index)"
              >
                <ChevronUp :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn"
                title="Descendre"
                aria-label="Descendre le tarif"
                :disabled="index === tarifs.length - 1 || reordering"
                @click="moveDown(index)"
              >
                <ChevronDown :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn"
                :title="t.isActive ? 'Masquer sur le site' : 'Afficher sur le site'"
                :aria-label="t.isActive ? 'Masquer le tarif sur le site' : 'Afficher le tarif sur le site'"
                :disabled="togglingId === t.id"
                @click="toggleActive(t)"
              >
                <Eye v-if="t.isActive" :size="16" />
                <EyeOff v-else :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn icon-btn--edit"
                title="Modifier"
                aria-label="Modifier le tarif"
                @click="startEdit(t)"
              >
                <Pencil :size="16" />
              </button>
              <button
                type="button"
                class="icon-btn icon-btn--delete"
                title="Supprimer"
                aria-label="Supprimer le tarif"
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

.tarif-form {
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

  &__limit {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    margin-bottom: $spacing-md;
    border: 1px solid hsla(38, 92%, 50%, 0.4);
    background-color: hsla(38, 92%, 50%, 0.1);
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    color: hsl(30, 70%, 32%);

    svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-md;

    &--checkbox {
      margin-bottom: $spacing-sm;
    }
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

  &__checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
    cursor: pointer;
  }

  &__checkbox {
    width: 16px;
    height: 16px;
    accent-color: $color-primary;
    cursor: pointer;

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.25);
    }
  }

  &__hint {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-top: $spacing-xs;
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

.tarif-list {
  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__heading {
    font-family: $font-display;
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text;
  }

  &__counter {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-text-muted;
  }

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

.tarif-card {
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

  &--inactive {
    background-color: $color-background;
    opacity: 0.65;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: $spacing-sm;
    margin-bottom: $spacing-xs;
  }

  &__title {
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-text;
  }

  &__price {
    font-size: $font-size-xs;
    font-weight: 700;
    color: $color-primary;
    background-color: $color-primary-light;
    border-radius: $radius-sm;
    padding: 2px $spacing-sm;
  }

  &__badge {
    font-size: $font-size-xs;
    font-weight: 700;
    color: $color-text-muted;
    background-color: $color-sand;
    border-radius: $radius-sm;
    padding: 2px $spacing-sm;
  }

  &__description {
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
