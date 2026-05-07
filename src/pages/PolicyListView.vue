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
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">공개 정책 목록</h1>
      <p class="text-sm text-slate-600">정책을 확인하고 지지 서명을 남겨보세요.</p>
    </div>

    <div v-if="!store.loading && store.policies.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      아직 등록된 정책이 없습니다.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PolicyCard v-for="policy in store.policies" :key="policy.id" :policy="policy" />
    </div>
  </main>
</template>
