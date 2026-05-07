<template>
  <footer class="mt-auto border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-4 py-10">
      <div class="grid gap-8 md:grid-cols-3">
        <!-- 회사 정보 -->
        <div class="space-y-2">
          <h3 class="text-base font-bold text-slate-900">정책 지지 선언 플랫폼</h3>
          <p class="text-sm leading-relaxed text-slate-500">
            시민이 직접 정책을 제안하고 지지하는<br />
            민주적 참여 플랫폼입니다.
          </p>
        </div>

        <!-- 회사 정보 상세 -->
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-slate-700">회사 정보</h4>
          <ul class="space-y-1 text-sm text-slate-500">
            <li>상호: 주식회사 퍼스트트리</li>
            <li>대표자: 이재환</li>
            <li>사업자등록번호: 419-88-01327</li>
            <li>주소: 서울특별시 강남구 강남대로 84길 33, 1213호</li>
            <li>이메일: contact@firsttree.net</li>
            <li>전화: 070-4156-4156</li>
          </ul>
        </div>

        <!-- 법적 링크 -->
        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-slate-700">이용 안내</h4>
          <ul class="space-y-1 text-sm">
            <li>
              <RouterLink to="/terms" class="text-slate-500 transition-colors hover:text-blue-600">
                이용약관
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/privacy" class="font-medium text-blue-600 transition-colors hover:text-blue-700">
                개인정보처리방침
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
        © {{ currentYear }} 주식회사 퍼스트트리. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
