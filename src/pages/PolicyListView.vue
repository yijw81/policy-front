<script setup lang="ts">
import { onMounted } from 'vue'
import { usePolicyStore } from '@/stores/policyStore'
import PolicyCard from '@/components/PolicyCard.vue'

const store = usePolicyStore()

onMounted(() => {
  store.loadPolicies()
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10">
    <section class="mb-10 overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-8 shadow-sm md:p-12">
      <p class="mb-4 text-lg font-semibold text-slate-600">정책이 바뀌면, 삶이 바뀝니다</p>
      <div class="mb-8 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-300" />

      <h1 class="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
        우리는
        <span class="block py-2">
          <span class="bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-300 bg-clip-text text-transparent">(</span>
          <span class="mx-2 inline-block h-2 w-48 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-300 align-middle md:w-80" />
          <span class="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">)</span>
          정책을
        </span>
        지지합니다
      </h1>

      <p class="mt-6 text-lg text-slate-600">좋은 정책이 좋은 리더를 만들고, 좋은 나라를 만듭니다</p>

      <div class="mt-8 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20">
        정책 지지 선언하기
        <span aria-hidden="true" class="text-2xl">→</span>
      </div>
    </section>

    <div v-if="!store.loading && store.policies.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      아직 등록된 정책이 없습니다.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PolicyCard v-for="policy in store.policies" :key="policy.id" :policy="policy" />
    </div>
  </main>
</template>
