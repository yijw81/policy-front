import type { Policy } from '@/types/policy'

const POLICY_STORAGE_KEY = 'policies'
const SIGNED_POLICIES_KEY = 'signedPolicies'

export const seedPolicies: Policy[] = [
  {
    id: 'policy-1',
    title: '청년 주거 안정 지원 확대 정책',
    description: '청년 1인 가구를 위한 월세 지원 및 공공임대 연계 정책입니다.',
    category: '주거',
    author: '도시정책연구회',
    summary: '청년의 주거비 부담을 완화하고 안정적인 거주 환경을 확보합니다.',
    content:
      '청년층의 높은 임차비 부담을 해소하기 위해 월세 바우처와 공공임대 매칭을 결합한 정책입니다. 소득 기준 충족 시 월세 일부를 지원하며, 주거상담을 함께 제공합니다.',
    clauses: ['월 최대 20만 원 월세 바우처 제공', '공공임대 우선 연계 시스템 구축', '주거 상담 및 법률 지원 운영'],
    expectedEffects: ['청년 주거비 부담 완화', '주거 불안정 감소', '지역 정착률 향상'],
    faqs: [
      { question: '재정 부담이 큰 것 아닌가요?', answer: '기존 분산된 주거지원 예산을 통합해 효율적으로 운영합니다.' },
      { question: '지원 대상은 어떻게 정하나요?', answer: '연령, 소득, 거주 형태 기준을 공개하고 분기별로 갱신합니다.' }
    ],
    supporters: [
      { id: 'sup-1', name: '김주거', message: '청년에게 꼭 필요한 정책입니다.', isPublic: true, createdAt: '2026-04-21T10:00:00.000Z' }
    ],
    createdAt: '2026-04-20T09:00:00.000Z'
  },
  {
    id: 'policy-2',
    title: '지역 소상공인 디지털 전환 지원 협약',
    description: '소상공인의 온라인 판로 확대를 위한 교육·도구 지원 협약입니다.',
    category: '경제',
    author: '상생경제포럼',
    summary: '지역 소상공인의 매출 다변화를 위해 디지털 역량을 강화합니다.',
    content: '온라인 주문, 결제, 홍보 도구를 지원하고 실습형 교육을 제공합니다. 상권별 컨설턴트를 배치해 실제 도입까지 지원합니다.',
    clauses: ['디지털 마케팅 교육 8주 과정 제공', '스마트스토어 구축 비용 일부 지원', '상권별 전담 컨설턴트 운영'],
    expectedEffects: ['온라인 매출 비중 증가', '지역 상권 경쟁력 강화', '소상공인 운영 효율 개선'],
    faqs: [
      { question: '디지털에 익숙하지 않아도 가능한가요?', answer: '기초부터 단계별로 구성된 교육과 현장 지원을 병행합니다.' }
    ],
    supporters: [],
    createdAt: '2026-03-15T12:30:00.000Z'
  },
  {
    id: 'policy-3',
    title: '학교 급식 잔반 감축 및 친환경 식단 정책',
    description: '학교 급식의 잔반을 줄이고 지역 친환경 식재료 사용을 확대합니다.',
    category: '교육/환경',
    author: '미래교육네트워크',
    summary: '건강한 식습관 형성과 탄소 배출 저감을 동시에 달성합니다.',
    content: '식단 선택형 배식과 잔반 데이터 분석을 도입하여 맞춤형 급식 운영을 추진합니다. 지역 친환경 농가와의 공급 체계를 연계합니다.',
    clauses: ['선택형 배식 시스템 도입', '잔반 데이터 공개 및 피드백 운영', '친환경 식재료 사용률 연 10% 확대'],
    expectedEffects: ['음식물 쓰레기 감소', '학생 만족도 향상', '지역 친환경 농업 활성화'],
    faqs: [
      { question: '학생들이 불편해하지 않을까요?', answer: '시범학교 운영 결과를 반영해 사용자 친화적으로 확산합니다.' }
    ],
    supporters: [],
    createdAt: '2026-02-11T08:10:00.000Z'
  }
]

export function loadPolicies(): Policy[] {
  const raw = localStorage.getItem(POLICY_STORAGE_KEY)
  if (!raw) {
    savePolicies(seedPolicies)
    return seedPolicies
  }

  try {
    const parsed = JSON.parse(raw) as Policy[]
    return parsed
  } catch {
    savePolicies(seedPolicies)
    return seedPolicies
  }
}

export function savePolicies(policies: Policy[]): void {
  localStorage.setItem(POLICY_STORAGE_KEY, JSON.stringify(policies))
}

export function getSignedPolicies(): string[] {
  const raw = localStorage.getItem(SIGNED_POLICIES_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

export function addSignedPolicy(policyId: string): void {
  const current = getSignedPolicies()
  if (current.includes(policyId)) return
  const next = [...current, policyId]
  localStorage.setItem(SIGNED_POLICIES_KEY, JSON.stringify(next))
}
