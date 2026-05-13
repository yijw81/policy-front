<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePolicyStore } from '@/stores/policyStore'
import PolicySection from '@/components/PolicySection.vue'
import SupporterList from '@/components/SupporterList.vue'
import SupportSignModal from '@/components/SupportSignModal.vue'
import type { SupportSignPayload } from '@/types/policy'
import DOMPurify from 'dompurify'

const route = useRoute()
const store = usePolicyStore()
const showModal = ref(false)
const submitting = ref(false)
const toast = ref('')
const error = ref('')

const recentSupporters = computed(() => store.currentPolicy?.supporters.slice(0, 6) ?? [])

const safeContent = computed(() =>
  store.currentPolicy
    ? DOMPurify.sanitize(store.currentPolicy.content, {
        ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'br', 'p', 'span', 'ul', 'ol', 'li', 'h3', 'h4', 'a'],
        ALLOWED_ATTR: ['href', 'target', 'style', 'class']
      })
    : ''
)

async function submitSign(payload: SupportSignPayload) {
  if (!store.currentPolicy) return
  submitting.value = true
  error.value = ''
  try {
    await store.signPolicy(store.currentPolicy.id, payload)
    showModal.value = false
    toast.value = '지지 서명이 완료되었습니다.'
    setTimeout(() => { toast.value = '' }, 1800)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '서명 처리 중 오류가 발생했습니다.'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  store.loadPolicy(route.params.id as string)
})
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-8">
    <div v-if="!store.currentPolicy" class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h1 class="mb-2 text-xl font-semibold">정책을 찾을 수 없습니다.</h1>
      <p class="mb-4 text-slate-600">잘못된 접근이거나 삭제된 정책일 수 있습니다.</p>
      <RouterLink to="/policies" class="rounded-lg bg-slate-900 px-4 py-2 text-white">목록으로 돌아가기</RouterLink>
    </div>

    <div v-else class="space-y-4">
      <header class="rounded-xl border border-slate-200 bg-white p-6">
        <p class="text-sm text-blue-600">{{ store.currentPolicy.category }}</p>
        <h1 class="text-2xl font-bold">{{ store.currentPolicy.title }}</h1>
        <p class="mt-1 text-slate-600">{{ store.currentPolicy.description }}</p>

        <div class="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          <span>작성자: {{ store.currentPolicy.author }}</span>
          <span>등록일: {{ new Date(store.currentPolicy.createdAt).toLocaleDateString('ko-KR') }}</span>
        </div>

        <p class="mt-5 text-3xl font-bold text-slate-900">{{ store.currentPolicy.supporters.length }}명 지지</p>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <button
            class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
            @click="showModal = true"
          >
            지지 서명하기
          </button>
          <RouterLink
            :to="`/policies/${store.currentPolicy.id}/edit`"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            수정
          </RouterLink>
          <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
          <p v-if="toast" class="text-sm text-emerald-600">{{ toast }}</p>
        </div>
      </header>

      <PolicySection title="정책 핵심 요약"><p>{{ store.currentPolicy.summary }}</p></PolicySection>

      <!-- 상세 설명: HTML 렌더링 지원 -->
      <PolicySection title="상세 설명">
        <div class="prose prose-slate max-w-none whitespace-pre-line leading-relaxed" v-html="safeContent" />
      </PolicySection>

      <!-- 핵심 조항: 트리 구조 -->
      <PolicySection title="핵심 조항">
        <ul class="space-y-3">
          <li
            v-for="(clause, ci) in store.currentPolicy.clauses"
            :key="ci"
            class="rounded-lg border border-slate-100 bg-slate-50 p-3"
          >
            <div class="flex items-start gap-2">
              <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {{ ci + 1 }}
              </span>
              <span class="font-medium text-slate-800">{{ clause.text }}</span>
            </div>
            <ul v-if="clause.children && clause.children.length" class="mt-2 ml-7 space-y-1">
              <li
                v-for="(child, chi) in clause.children"
                :key="chi"
                class="flex items-start gap-2 text-sm text-slate-600"
              >
                <span class="mt-1 text-slate-400">└</span>
                <span>{{ child }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </PolicySection>

      <!--
      <PolicySection title="기대 효과"><ul class="list-disc space-y-1 pl-5"><li v-for="(item, idx) in store.currentPolicy.expectedEffects" :key="idx">{{ item }}</li></ul></PolicySection>
      <PolicySection title="FAQ / 반대 의견에 대한 답변">
        <div class="space-y-3">
          <div v-for="(faq, idx) in store.currentPolicy.faqs" :key="idx" class="rounded-lg border border-slate-200 p-3">
            <p class="font-semibold">Q. {{ faq.question }}</p>
            <p class="mt-1 text-sm text-slate-600">A. {{ faq.answer }}</p>
          </div>
        </div>
      </PolicySection>
      <PolicySection title="지지자 일부">
        <SupporterList :supporters="recentSupporters" />
      </PolicySection>
      <PolicySection title="공유 카드">
        <div class="rounded-lg bg-gradient-to-r from-blue-50 to-slate-100 p-4">
          <p class="text-sm text-slate-600">{{ store.currentPolicy.category }}</p>
          <p class="text-lg font-semibold">{{ store.currentPolicy.title }}</p>
          <p class="text-sm">현재 {{ store.currentPolicy.supporters.length }}명이 지지 서명했습니다.</p>
        </div>
      </PolicySection>
      -->

      <!-- 이미지 갤러리 -->
      <PolicySection
        v-if="store.currentPolicy.images && store.currentPolicy.images.length"
        title="관련 이미지"
      >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="(imgUrl, idx) in store.currentPolicy.images"
            :key="idx"
            class="overflow-hidden rounded-lg border border-slate-200"
          >
            <img
              :src="imgUrl"
              :alt="`이미지 ${idx + 1}`"
              class="h-56 w-full object-cover"
              loading="lazy"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
          </div>
        </div>
      </PolicySection>
    </div>

    <SupportSignModal
      :open="showModal"
      :loading="submitting"
      :policyId="store.currentPolicy?.id ?? ''"
      @close="showModal = false"
      @submit="submitSign"
    />
  </main>
</template>
