<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-5">
    <h2 class="mb-3 text-lg font-semibold text-slate-900">{{ title }}</h2>
    <div class="text-slate-700">
      <slot />
    </div>
  </section>
</template>
