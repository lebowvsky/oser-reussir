<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

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
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

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
    }
  }
}
</style>
