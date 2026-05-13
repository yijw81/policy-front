<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-slate-50 to-sky-50">
    <nav class="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <RouterLink to="/" class="group inline-flex items-center gap-4">
          <span class="text-[2rem] font-black tracking-tight text-slate-900">잘 잘 잘</span>
          <span class="h-6 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400" />
          <span class="text-lg font-semibold text-slate-700">
            정책도 잘, 리더도 잘, 나라도
            <span class="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">잘</span>
          </span>
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
