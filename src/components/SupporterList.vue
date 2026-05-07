<script setup lang="ts">
import type { Supporter } from '@/types/policy'

defineProps<{ supporters: Supporter[] }>()
</script>

<template>
  <ul class="space-y-3">
    <li v-for="supporter in supporters" :key="supporter.id" class="rounded-lg border border-slate-200 p-3">
      <div class="flex items-center justify-between">
        <p class="font-medium text-slate-900">{{ supporter.isPublic ? supporter.name : '익명 지지자' }}</p>
        <p class="text-xs text-slate-500">{{ new Date(supporter.createdAt).toLocaleDateString('ko-KR') }}</p>
      </div>
      <p class="mt-1 text-sm text-slate-600">{{ supporter.message || '이 정책을 지지합니다.' }}</p>
    </li>
  </ul>
</template>
