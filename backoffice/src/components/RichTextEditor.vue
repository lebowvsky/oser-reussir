<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showLinkInput = ref(false)
const linkUrl = ref('')
const linkInputRef = ref<HTMLInputElement | null>(null)

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: false,
      bulletList: false,
      orderedList: false,
      blockquote: false,
      codeBlock: false,
      code: false,
      horizontalRule: false,
      listItem: false,
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

function openLinkInput() {
  if (!editor.value) return
  const existingHref = editor.value.getAttributes('link').href
  linkUrl.value = existingHref || ''
  showLinkInput.value = true
  setTimeout(() => linkInputRef.value?.focus(), 0)
}

function applyLink() {
  if (!editor.value) return
  const url = linkUrl.value.trim()
  if (url) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  } else {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  }
  closeLinkInput()
}

function removeLink() {
  if (!editor.value) return
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  closeLinkInput()
}

function closeLinkInput() {
  showLinkInput.value = false
  linkUrl.value = ''
}

watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue, { emitUpdate: false })
  }
})
</script>

<template>
  <div class="rich-editor">
    <div v-if="editor" class="rich-editor__toolbar">
      <button
        type="button"
        class="rich-editor__button"
        :class="{ 'rich-editor__button--active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
        title="Gras"
      >
        B
      </button>
      <button
        type="button"
        class="rich-editor__button"
        :class="{ 'rich-editor__button--active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
        title="Italique"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        class="rich-editor__button"
        :class="{ 'rich-editor__button--active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
        title="Souligné"
      >
        <u>U</u>
      </button>

      <span class="rich-editor__separator" />

      <div class="rich-editor__link-wrapper">
        <button
          type="button"
          class="rich-editor__button"
          :class="{ 'rich-editor__button--active': editor.isActive('link') }"
          @click="openLinkInput"
          title="Lien"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>

        <div v-if="showLinkInput" class="rich-editor__link-popover">
          <input
            ref="linkInputRef"
            v-model="linkUrl"
            type="url"
            class="rich-editor__link-input"
            placeholder="https://example.com"
            @keydown.enter.prevent="applyLink"
            @keydown.escape="closeLinkInput"
          />
          <button type="button" class="rich-editor__link-action rich-editor__link-action--apply" @click="applyLink" title="Appliquer">
            ✓
          </button>
          <button
            v-if="editor.isActive('link')"
            type="button"
            class="rich-editor__link-action rich-editor__link-action--remove"
            @click="removeLink"
            title="Supprimer le lien"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
    <EditorContent :editor="editor" class="rich-editor__content" />
  </div>
</template>

<style lang="scss" scoped>
.rich-editor {
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background-color: $color-background;
  transition: border-color $duration-fast $ease;

  &:focus-within {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px hsla(140, 38%, 42%, 0.15);
  }

  &--error {
    border-color: hsl(0, 65%, 55%);

    &:focus-within {
      border-color: hsl(0, 65%, 55%);
      box-shadow: 0 0 0 3px hsla(0, 65%, 55%, 0.15);
    }
  }

  &__toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-xs $spacing-sm;
    border-bottom: 1px solid $color-border;
    background-color: $color-surface;
    border-radius: $radius-sm $radius-sm 0 0;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: $radius-sm;
    background: transparent;
    font-family: $font-body;
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-text;
    cursor: pointer;
    transition: background-color $duration-fast $ease, color $duration-fast $ease;

    &:hover {
      background-color: $color-border;
    }

    &--active {
      background-color: $color-primary;
      color: $color-white;

      &:hover {
        background-color: $color-primary;
        color: $color-white;
      }
    }
  }

  &__separator {
    width: 1px;
    height: 18px;
    background-color: $color-border;
    margin: 0 $spacing-xs;
  }

  &__link-wrapper {
    position: relative;
  }

  &__link-popover {
    position: absolute;
    top: calc(100% + $spacing-xs);
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-xs;
    background: $color-background;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__link-input {
    width: 220px;
    padding: 4px $spacing-xs;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-family: $font-body;
    font-size: $font-size-xs;
    color: $color-text;
    outline: none;

    &:focus {
      border-color: $color-primary;
    }
  }

  &__link-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: $radius-sm;
    font-size: 12px;
    cursor: pointer;
    line-height: 1;

    &--apply {
      background-color: $color-primary;
      color: $color-white;

      &:hover {
        opacity: 0.9;
      }
    }

    &--remove {
      background-color: hsl(0, 65%, 55%);
      color: $color-white;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  &__content {
    :deep(.ProseMirror) {
      min-height: 100px;
      padding: $spacing-sm $spacing-md;
      font-family: $font-body;
      font-size: $font-size-sm;
      color: $color-text;
      outline: none;

      p {
        margin: 0 0 $spacing-xs;

        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        color: $color-primary;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
