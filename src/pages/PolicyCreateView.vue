<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import DynamicTextListInput from '@/components/DynamicTextListInput.vue'
import FaqInputList from '@/components/FaqInputList.vue'
import { usePolicyStore } from '@/stores/policyStore'

const router = useRouter()
const store = usePolicyStore()

const form = reactive({
  title: '',
  description: '',
  category: '사회',
  author: '',
  summary: '',
  content: '',
  clauses: [''],
  expectedEffects: [''],
  faqs: [{ question: '', answer: '' }]
})

async function onSubmit() {
  const created = await store.addPolicy({
    title: form.title,
    description: form.description,
    category: form.category,
    author: form.author || '익명 작성자',
    summary: form.summary,
    content: form.content,
    clauses: form.clauses.filter(Boolean),
    expectedEffects: form.expectedEffects.filter(Boolean),
    faqs: form.faqs.filter((faq) => faq.question && faq.answer)
  })

  await router.push(`/policies/${created.id}`)
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="mb-6 text-2xl font-bold">새 정책 만들기</h1>
    <form class="space-y-4 rounded-xl border border-slate-200 bg-white p-5" @submit.prevent="onSubmit">
      <input v-model="form.title" required type="text" placeholder="정책 제목" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <input v-model="form.description" required type="text" placeholder="짧은 설명" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <select v-model="form.category" class="w-full rounded-lg border border-slate-300 px-3 py-2">
        <option>사회</option><option>경제</option><option>보건</option><option>주거</option><option>환경</option><option>교육</option>
      </select>
      <input v-model="form.author" type="text" placeholder="작성자" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <textarea v-model="form.summary" required rows="3" placeholder="핵심 요약" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <textarea v-model="form.content" required rows="5" placeholder="상세 설명" class="w-full rounded-lg border border-slate-300 px-3 py-2" />

      <div>
        <p class="mb-2 font-medium">핵심 조항</p>
        <DynamicTextListInput v-model="form.clauses" />
      </div>

      <div>
        <p class="mb-2 font-medium">기대 효과</p>
        <DynamicTextListInput v-model="form.expectedEffects" />
      </div>

      <div>
        <p class="mb-2 font-medium">FAQ</p>
        <FaqInputList v-model="form.faqs" />
      </div>

      <button class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white">저장</button>
    </form>
  </main>
</template>
