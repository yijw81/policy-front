import axios from 'axios'
import type { CreatePolicyPayload, Policy, SupportSignPayload, Supporter } from '@/types/policy'
import { addSignedPolicy, getSignedPolicies, loadPolicies, savePolicies } from '@/utils/storage'

const http = axios.create({ baseURL: '/mock-api' })
void http

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchPolicies(): Promise<Policy[]> {
  await wait()
  return loadPolicies().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
}

export async function fetchPolicyById(id: string): Promise<Policy | null> {
  await wait()
  return loadPolicies().find((policy) => policy.id === id) ?? null
}

export async function createPolicy(payload: CreatePolicyPayload): Promise<Policy> {
  await wait()
  const policies = loadPolicies()
  const newPolicy: Policy = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    supporters: [],
    ...payload
  }

  policies.unshift(newPolicy)
  savePolicies(policies)
  return newPolicy
}

export async function supportPolicy(policyId: string, payload: SupportSignPayload): Promise<Policy> {
  await wait()

  if (!payload.agreedPrivacy) {
    throw new Error('개인정보 수집 동의가 필요합니다.')
  }

  const signed = getSignedPolicies()
  if (signed.includes(policyId)) {
    throw new Error('이미 지지 서명한 정책입니다.')
  }

  const policies = loadPolicies()
  const target = policies.find((policy) => policy.id === policyId)

  if (!target) {
    throw new Error('정책을 찾을 수 없습니다.')
  }

  const supporter: Supporter = {
    id: crypto.randomUUID(),
    name: payload.name.trim(),
    message: payload.message.trim() || '이 정책을 지지합니다.',
    isPublic: payload.isPublic,
    createdAt: new Date().toISOString()
  }

  target.supporters.unshift(supporter)
  savePolicies(policies)
  addSignedPolicy(policyId)

  return target
}
