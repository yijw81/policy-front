<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DynamicTextListInput from '@/components/DynamicTextListInput.vue'
import ClauseTreeInput from '@/components/ClauseTreeInput.vue'
import FaqInputList from '@/components/FaqInputList.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { usePolicyStore } from '@/stores/policyStore'

const router = useRouter()
const route = useRoute()
const store = usePolicyStore()

const form = reactive({
  title: '',
  description: '',
  category: '사회',
  author: '',
  summary: '',
  content: '',
  clauses: [{ text: '', children: [] as string[] }],
  expectedEffects: [''],
  faqs: [{ question: '', answer: '' }],
  images: ['']
})

const saving = reactive({ loading: false, error: '' })

function fillForm() {
  const p = store.currentPolicy
  if (!p) return
  form.title = p.title
  form.description = p.description
  form.category = p.category
  form.author = p.author
  form.summary = p.summary
  form.content = p.content
  form.clauses = p.clauses.length ? p.clauses.map((c) => ({ text: c.text, children: [...c.children] })) : [{ text: '', children: [] }]
  form.expectedEffects = p.expectedEffects.length ? [...p.expectedEffects] : ['']
  form.faqs = p.faqs.length ? p.faqs.map((f) => ({ ...f })) : [{ question: '', answer: '' }]
  form.images = p.images?.length ? [...p.images] : ['']
}

onMounted(async () => {
  await store.loadPolicy(route.params.id as string)
  fillForm()
})

watch(() => store.currentPolicy, () => fillForm())

async function onSubmit() {
  saving.loading = true
  saving.error = ''
  try {
    await store.editPolicy(route.params.id as string, {
      title: form.title,
      description: form.description,
      category: form.category,
      author: form.author || '익명 작성자',
      summary: form.summary,
      content: form.content,
      clauses: form.clauses.filter((c) => c.text),
      expectedEffects: form.expectedEffects.filter(Boolean),
      faqs: form.faqs.filter((faq) => faq.question && faq.answer),
      images: form.images.filter(Boolean)
    })
    await router.push(`/policies/${route.params.id}`)
  } catch (e) {
    saving.error = e instanceof Error ? e.message : '저장 중 오류가 발생했습니다.'
  } finally {
    saving.loading = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <div v-if="!store.currentPolicy" class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p class="text-slate-500">정책 정보를 불러오는 중...</p>
    </div>

    <template v-else>
      <div class="mb-6 flex items-center gap-3">
        <RouterLink :to="`/policies/${route.params.id}`" class="text-sm text-slate-500 hover:text-slate-700">← 상세로 돌아가기</RouterLink>
        <h1 class="text-2xl font-bold">정책 수정</h1>
      </div>

      <form class="space-y-4 rounded-xl border border-slate-200 bg-white p-5" @submit.prevent="onSubmit">
        <input v-model="form.title" required type="text" placeholder="정책 제목" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="form.description" required type="text" placeholder="짧은 설명" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <select v-model="form.category" class="w-full rounded-lg border border-slate-300 px-3 py-2">
          <option>사회</option><option>경제</option><option>보건</option><option>주거</option><option>환경</option><option>교육</option>
        </select>
        <input v-model="form.author" type="text" placeholder="작성자" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <textarea v-model="form.summary" required rows="3" placeholder="핵심 요약" class="w-full rounded-lg border border-slate-300 px-3 py-2" />

        <div>
          <p class="mb-2 font-medium">상세 설명</p>
          <RichTextEditor v-model="form.content" />
        </div>

        <div>
          <p class="mb-2 font-medium">핵심 조항</p>
          <ClauseTreeInput v-model="form.clauses" />
        </div>

        <div>
          <p class="mb-2 font-medium">기대 효과</p>
          <DynamicTextListInput v-model="form.expectedEffects" />
        </div>

        <div>
          <p class="mb-2 font-medium">FAQ</p>
          <FaqInputList v-model="form.faqs" />
        </div>

        <div>
          <p class="mb-1 font-medium">이미지</p>
          <p class="mb-2 text-xs text-slate-500">이미지 URL을 입력하세요.</p>
          <DynamicTextListInput v-model="form.images" />
        </div>

        <p v-if="saving.error" class="text-sm text-rose-600">{{ saving.error }}</p>

        <div class="flex gap-3">
          <button
            type="submit"
            :disabled="saving.loading"
            class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-60"
          >
            {{ saving.loading ? '저장 중...' : '저장' }}
          </button>
          <RouterLink
            :to="`/policies/${route.params.id}`"
            class="rounded-lg border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
          >
            취소
          </RouterLink>
        </div>
      </form>
    </template>
  </main>
</template>
