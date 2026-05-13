import axios from 'axios'
import type { CreatePolicyPayload, Policy, SupportSignPayload } from '@/types/policy'

// const http = axios.create({ baseURL: 'https://policy-api.firsttree.net/api' })
const http = axios.create({ baseURL: 'http://localhost:3000/api' })

export async function fetchPolicies(): Promise<Policy[]> {
  const { data } = await http.get<Policy[]>('/policies')
  return data
}

export async function fetchPolicyById(id: string): Promise<Policy | null> {
  try {
    const { data } = await http.get<Policy>(`/policies/${id}`)
    return data
  } catch (e: any) {
    if (e.response?.status === 404) return null
    throw e
  }
}

export async function createPolicy(payload: CreatePolicyPayload): Promise<Policy> {
  const { data } = await http.post<Policy>('/policies', payload)
  return data
}

export async function updatePolicy(id: string, payload: CreatePolicyPayload): Promise<Policy> {
  const { data } = await http.put<Policy>(`/policies/${id}`, payload)
  return data
}

export async function supportPolicy(policyId: string, payload: SupportSignPayload): Promise<Policy> {
  const { data } = await http.post<Policy>(`/policies/${policyId}/support`, payload)
  return data
}

export async function requestPhoneVerification(phone: string, policyId: string): Promise<void> {
  await http.post('/phone/request', { phone, policyId })
}

export async function verifyPhone(phone: string, policyId: string, code: string): Promise<string> {
  const { data } = await http.post<{ token: string }>('/phone/verify', { phone, policyId, code })
  return data.token
}

export async function checkDuplicate(policyId: string, phone: string): Promise<boolean> {
  const { data } = await http.get<{ isDuplicate: boolean }>(`/policies/${policyId}/check-duplicate`, { params: { phone } })
  return data.isDuplicate
}
