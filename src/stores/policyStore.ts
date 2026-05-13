import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreatePolicyPayload, Policy, SupportSignPayload } from '@/types/policy'
import { createPolicy, fetchPolicies, fetchPolicyById, supportPolicy, updatePolicy } from '@/api/policyApi'

export const usePolicyStore = defineStore('policy', () => {
  const policies = ref<Policy[]>([])
  const currentPolicy = ref<Policy | null>(null)
  const loading = ref(false)

  async function loadPolicies() {
    loading.value = true
    try {
      policies.value = await fetchPolicies()
    } finally {
      loading.value = false
    }
  }

  async function loadPolicy(id: string) {
    loading.value = true
    try {
      currentPolicy.value = await fetchPolicyById(id)
    } finally {
      loading.value = false
    }
  }

  async function addPolicy(payload: CreatePolicyPayload): Promise<Policy> {
    const created = await createPolicy(payload)
    policies.value.unshift(created)
    return created
  }

  async function editPolicy(policyId: string, payload: CreatePolicyPayload): Promise<Policy> {
    const updated = await updatePolicy(policyId, payload)
    currentPolicy.value = updated
    const idx = policies.value.findIndex((p) => p.id === policyId)
    if (idx >= 0) policies.value[idx] = updated
    return updated
  }

  async function signPolicy(policyId: string, payload: SupportSignPayload): Promise<Policy> {
    const updated = await supportPolicy(policyId, payload)
    currentPolicy.value = updated
    const idx = policies.value.findIndex((policy) => policy.id === policyId)
    if (idx >= 0) policies.value[idx] = updated
    return updated
  }

  return { policies, currentPolicy, loading, loadPolicies, loadPolicy, addPolicy, editPolicy, signPolicy }
})
