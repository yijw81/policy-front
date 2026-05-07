<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { SupportSignPayload } from '@/types/policy'

const props = defineProps<{ open: boolean; loading?: boolean }>()
const emit = defineEmits<{ close: []; submit: [payload: SupportSignPayload] }>()

const form = reactive<SupportSignPayload>({ name: '', message: '', isPublic: true, agreedPrivacy: false })
const error = ref('')

function onSubmit() {
  error.value = ''
  if (!form.name.trim()) {
    error.value = '이름 또는 닉네임을 입력해 주세요.'
    return
  }
  if (!form.agreedPrivacy) {
    error.value = '개인정보 수집 동의가 필요합니다.'
    return
  }
  emit('submit', { ...form })
}

function close() {
  error.value = ''
  emit('close')
}
</script>

<template>
  <div v-if="props.open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
    <div class="w-full max-w-lg rounded-xl bg-white p-5">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">지지 서명하기</h3>
        <button class="text-slate-500" @click="close">✕</button>
      </div>

      <div class="space-y-3">
        <input v-model="form.name" type="text" placeholder="이름 또는 닉네임" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <input v-model="form.message" type="text" placeholder="한 줄 지지 메시지" class="w-full rounded-lg border border-slate-300 px-3 py-2" />

        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input v-model="form.isPublic" type="checkbox" />
          공개 서명으로 표시
        </label>

        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input v-model="form.agreedPrivacy" type="checkbox" />
          개인정보 수집에 동의합니다.
        </label>

        <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>

        <button :disabled="props.loading" class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50" @click="onSubmit">
          지지 서명 완료
        </button>
      </div>
    </div>
  </div>
</template>
