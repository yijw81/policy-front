<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <RouterLink
            to="/"
            class="text-lg font-bold text-slate-900"
        >
          우리는 좋은 정책을 지지합니다.
        </RouterLink>
      </div>
    </nav>

    <div style="min-height: calc(100vh - 300px)">
      <RouterView />
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
</script>