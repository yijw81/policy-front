<script setup lang="ts">
import type { Policy } from '@/types/policy'

defineProps<{ policy: Policy }>()
</script>

<template>
  <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="mb-2 flex items-center justify-between gap-3">
      <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{{ policy.category }}</span>
      <span class="text-sm text-slate-500">지지 {{ policy.supporters.length }}명</span>
    </div>
    <h3 class="mb-2 text-lg font-semibold text-slate-900">{{ policy.title }}</h3>
    <p class="mb-4 line-clamp-2 text-sm text-slate-600">{{ policy.description }}</p>
    <RouterLink :to="`/policies/${policy.id}`" class="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
      자세히 보기
    </RouterLink>
  </article>
</template>
