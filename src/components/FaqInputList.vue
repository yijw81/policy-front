<script setup lang="ts">
import type { PolicyFaq } from '@/types/policy'

const modelValue = defineModel<PolicyFaq[]>({ required: true })

function addItem() {
  modelValue.value.push({ question: '', answer: '' })
}

function removeItem(index: number) {
  modelValue.value.splice(index, 1)
}
</script>

<template>
  <div class="space-y-3">
    <div v-for="(faq, index) in modelValue" :key="index" class="rounded-lg border border-slate-200 p-3">
      <input v-model="faq.question" type="text" placeholder="질문" class="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2" />
      <textarea v-model="faq.answer" placeholder="답변" rows="3" class="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2" />
      <button type="button" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" @click="removeItem(index)">삭제</button>
    </div>
    <button type="button" class="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white" @click="addItem">FAQ 추가</button>
  </div>
</template>
