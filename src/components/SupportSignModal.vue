<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { SupportSignPayload } from '@/types/policy'
import { requestPhoneVerification, verifyPhone } from '@/api/policyApi'

const props = defineProps<{ open: boolean; loading?: boolean; policyId: string }>()
const emit = defineEmits<{ close: []; submit: [payload: SupportSignPayload] }>()

const form = reactive({ name: '', phone: '', code: '', message: '', agreedPrivacy: false })
const otpState = reactive({ sending: false, sent: false, verifying: false, verified: false, token: '' })
const alreadyDeclared = ref(false)
const error = ref('')

watch(() => props.open, (val) => {
  if (!val) {
    form.name = ''
    form.phone = ''
    form.code = ''
    form.message = ''
    form.agreedPrivacy = false
    otpState.sending = false
    otpState.sent = false
    otpState.verifying = false
    otpState.verified = false
    otpState.token = ''
    alreadyDeclared.value = false
    error.value = ''
  }
})

async function onRequestOtp() {
  error.value = ''
  alreadyDeclared.value = false
  const phone = form.phone.replace(/-/g, '')
  if (!phone) { error.value = '전화번호를 입력해 주세요.'; return }
  otpState.sending = true
  try {
    await requestPhoneVerification(phone, props.policyId)
    otpState.sent = true
  } catch (e: any) {
    if (e.response?.status === 409) {
      alreadyDeclared.value = true
    } else {
      error.value = e.response?.data?.message ?? '인증번호 발송에 실패했습니다.'
    }
  } finally {
    otpState.sending = false
  }
}

async function onVerify() {
  error.value = ''
  otpState.verifying = true
  try {
    const token = await verifyPhone(form.phone.replace(/-/g, ''), props.policyId, form.code)
    otpState.verified = true
    otpState.token = token
  } catch (e: any) {
    error.value = e.response?.data?.message ?? '인증번호가 올바르지 않습니다.'
  } finally {
    otpState.verifying = false
  }
}

function onSubmit() {
  error.value = ''
  if (!form.name.trim()) { error.value = '이름을 입력해 주세요.'; return }
  if (!otpState.verified) { error.value = '휴대폰 인증 후 서명해 주세요.'; return }
  if (!form.agreedPrivacy) { error.value = '개인정보 수집 동의가 필요합니다.'; return }
  emit('submit', {
    name: form.name.trim(),
    phone: form.phone.replace(/-/g, ''),
    message: form.message.trim(),
    agreedPrivacy: form.agreedPrivacy,
    verificationToken: otpState.token
  })
}
</script>

<template>
  <div v-if="props.open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
    <div class="w-full max-w-lg rounded-xl bg-white p-5">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">지지 서명하기</h3>
        <button class="text-slate-500" @click="$emit('close')">✕</button>
      </div>

      <div v-if="alreadyDeclared" class="rounded-lg bg-amber-50 border border-amber-200 p-4 text-center">
        <p class="font-medium text-amber-700">이미 지지선언을 하셨습니다.</p>
        <p class="mt-1 text-sm text-amber-600">이 정책에 대한 지지선언이 이미 완료되었습니다.</p>
        <button class="mt-3 rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800" @click="$emit('close')">
          닫기
        </button>
      </div>

      <div v-else class="space-y-3">
        <input v-model="form.name" type="text" placeholder="이름" class="w-full rounded-lg border border-slate-300 px-3 py-2" />

        <div class="flex gap-2">
          <input
            v-model="form.phone"
            type="tel"
            placeholder="전화번호 (숫자만)"
            :disabled="otpState.verified"
            class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 disabled:bg-slate-50"
          />
          <button
            :disabled="otpState.sending || otpState.verified"
            class="shrink-0 rounded-lg bg-slate-700 px-3 py-2 text-sm text-white disabled:opacity-50"
            @click="onRequestOtp"
          >{{ otpState.sent && !otpState.verified ? '재발송' : '인증요청' }}</button>
        </div>

        <div v-if="otpState.sent && !otpState.verified" class="flex gap-2">
          <input
            v-model="form.code"
            type="text"
            placeholder="인증번호 6자리"
            maxlength="6"
            class="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            :disabled="otpState.verifying || !form.code"
            class="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
            @click="onVerify"
          >인증하기</button>
        </div>
        <p v-if="otpState.verified" class="text-sm font-medium text-emerald-600">✓ 휴대폰 인증 완료</p>

        <input v-model="form.message" type="text" placeholder="한 줄 지지 메시지 (선택)" class="w-full rounded-lg border border-slate-300 px-3 py-2" />

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
