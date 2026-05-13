<script setup lang="ts">
import type { ClauseNode } from '@/types/policy'

const modelValue = defineModel<ClauseNode[]>({ required: true })

function addClause() {
  modelValue.value.push({ text: '', children: [] })
}

function removeClause(index: number) {
  modelValue.value.splice(index, 1)
}

function addChild(clauseIndex: number) {
  modelValue.value[clauseIndex].children.push('')
}

function removeChild(clauseIndex: number, childIndex: number) {
  modelValue.value[clauseIndex].children.splice(childIndex, 1)
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(clause, ci) in modelValue"
      :key="ci"
      class="rounded-lg border border-slate-200 bg-slate-50 p-3"
    >
      <!-- 상위 조항 -->
      <div class="flex gap-2">
        <span class="mt-2 text-sm font-semibold text-slate-500">{{ ci + 1 }}.</span>
        <input
          v-model="modelValue[ci].text"
          type="text"
          placeholder="조항 내용"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
        />
        <button
          type="button"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          @click="removeClause(ci)"
        >
          삭제
        </button>
      </div>

      <!-- 하위 조항 -->
      <div class="mt-2 ml-6 space-y-2">
        <div
          v-for="(child, chi) in clause.children"
          :key="chi"
          class="flex gap-2 items-center"
        >
          <span class="text-xs text-slate-400">└</span>
          <input
            v-model="modelValue[ci].children[chi]"
            type="text"
            placeholder="세부 조항"
            class="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-white"
          />
          <button
            type="button"
            class="rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-500 hover:bg-slate-100"
            @click="removeChild(ci, chi)"
          >
            삭제
          </button>
        </div>
        <button
          type="button"
          class="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:bg-slate-100"
          @click="addChild(ci)"
        >
          + 세부 조항 추가
        </button>
      </div>
    </div>

    <button
      type="button"
      class="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
      @click="addClause"
    >
      조항 추가
    </button>
  </div>
</template>
