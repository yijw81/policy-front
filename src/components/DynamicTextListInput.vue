<script setup lang="ts">
const modelValue = defineModel<string[]>({ required: true })

function addItem() {
  modelValue.value.push('')
}

function removeItem(index: number) {
  modelValue.value.splice(index, 1)
}
</script>

<template>
  <div class="space-y-2">
    <div v-for="(_, index) in modelValue" :key="index" class="flex gap-2">
      <input v-model="modelValue[index]" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
      <button type="button" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" @click="removeItem(index)">삭제</button>
    </div>
    <button type="button" class="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white" @click="addItem">항목 추가</button>
  </div>
</template>
