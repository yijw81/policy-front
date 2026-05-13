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

    <!-- 에디터 본문: policy-content로 상세 뷰와 동일한 스타일 공유 -->
    <EditorContent
      :editor="editor"
      class="policy-content rich-editor min-h-[160px] px-4 py-3 focus-within:outline-none"
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
/* placeholder */
.rich-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  float: left;
  height: 0;
}
</style>
