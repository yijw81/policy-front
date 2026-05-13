<script setup lang="ts">
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false }),
    TextAlign.configure({ types: ['heading', 'paragraph'] })
  ],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val, false)
  }
})

function setLink() {
  const url = window.prompt('링크 URL 입력:')
  if (!url) return
  editor.value?.chain().focus().setLink({ href: url, target: '_blank' }).run()
}
</script>

<template>
  <div class="rounded-lg border border-slate-300 overflow-hidden">
    <!-- 툴바 -->
    <div class="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('bold') }]"
        title="굵게"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('italic') }]"
        title="기울임"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('underline') }]"
        title="밑줄"
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <span class="underline">U</span>
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('strike') }]"
        title="취소선"
        @click="editor?.chain().focus().toggleStrike().run()"
      >
        <s>S</s>
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('heading', { level: 2 }) }]"
        title="제목 2"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('heading', { level: 3 }) }]"
        title="제목 3"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('bulletList') }]"
        title="글머리 목록"
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        ≡
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('orderedList') }]"
        title="번호 목록"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        1≡
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive({ textAlign: 'left' }) }]"
        title="왼쪽 정렬"
        @click="editor?.chain().focus().setTextAlign('left').run()"
      >
        ◧
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive({ textAlign: 'center' }) }]"
        title="가운데 정렬"
        @click="editor?.chain().focus().setTextAlign('center').run()"
      >
        ◫
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive({ textAlign: 'right' }) }]"
        title="오른쪽 정렬"
        @click="editor?.chain().focus().setTextAlign('right').run()"
      >
        ◨
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('link') }]"
        title="링크"
        @click="setLink"
      >
        🔗
      </button>
      <button
        v-if="editor?.isActive('link')"
        type="button"
        class="toolbar-btn"
        title="링크 제거"
        @click="editor?.chain().focus().unsetLink().run()"
      >
        ✕
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('blockquote') }]"
        title="인용구"
        @click="editor?.chain().focus().toggleBlockquote().run()"
      >
        "
      </button>
      <button
        type="button"
        :class="['toolbar-btn', { active: editor?.isActive('codeBlock') }]"
        title="코드 블록"
        @click="editor?.chain().focus().toggleCodeBlock().run()"
      >
        &lt;/&gt;
      </button>

      <span class="mx-1 border-l border-slate-300" />

      <button
        type="button"
        class="toolbar-btn"
        title="실행 취소"
        @click="editor?.chain().focus().undo().run()"
      >
        ↩
      </button>
      <button
        type="button"
        class="toolbar-btn"
        title="다시 실행"
        @click="editor?.chain().focus().redo().run()"
      >
        ↪
      </button>
    </div>

    <!-- 에디터 본문 -->
    <EditorContent
      :editor="editor"
      class="rich-editor min-h-[160px] px-4 py-3 focus-within:outline-none"
    />
  </div>
</template>

<style scoped>
.toolbar-btn {
  @apply rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-200 transition-colors;
}
.toolbar-btn.active {
  @apply bg-slate-200 text-slate-900 font-semibold;
}
</style>

<style>
.rich-editor .ProseMirror {
  outline: none;
  min-height: 140px;
}
.rich-editor .ProseMirror h2 { @apply text-xl font-bold mt-3 mb-1; }
.rich-editor .ProseMirror h3 { @apply text-lg font-semibold mt-2 mb-1; }
.rich-editor .ProseMirror p { @apply my-1 leading-relaxed; }
.rich-editor .ProseMirror ul { @apply list-disc pl-5 my-1; }
.rich-editor .ProseMirror ol { @apply list-decimal pl-5 my-1; }
.rich-editor .ProseMirror blockquote { @apply border-l-4 border-slate-300 pl-3 text-slate-500 italic my-2; }
.rich-editor .ProseMirror code { @apply bg-slate-100 rounded px-1 text-sm font-mono; }
.rich-editor .ProseMirror pre { @apply bg-slate-100 rounded p-3 my-2 font-mono text-sm overflow-x-auto; }
.rich-editor .ProseMirror a { @apply text-blue-600 underline; }
.rich-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  @apply text-slate-400 pointer-events-none float-left h-0;
}
</style>
