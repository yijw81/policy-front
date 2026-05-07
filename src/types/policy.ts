export interface Supporter {
  id: string
  name: string
  message: string
  isPublic: boolean
  createdAt: string
}

export interface PolicyFaq {
  question: string
  answer: string
}

export interface Policy {
  id: string
  title: string
  description: string
  category: string
  author: string
  summary: string
  content: string
  clauses: string[]
  expectedEffects: string[]
  faqs: PolicyFaq[]
  supporters: Supporter[]
  createdAt: string
}

export interface SupportSignPayload {
  name: string
  message: string
  isPublic: boolean
  agreedPrivacy: boolean
}

export interface CreatePolicyPayload {
  title: string
  description: string
  category: string
  author: string
  summary: string
  content: string
  clauses: string[]
  expectedEffects: string[]
  faqs: PolicyFaq[]
}
