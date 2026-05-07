<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <RouterLink to="/policies" class="text-lg font-bold text-slate-900">정책 지지 선언 플랫폼</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
