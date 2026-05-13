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

export interface ClauseNode {
  text: string
  children: string[]
}

export interface Policy {
  id: string
  title: string
  description: string
  category: string
  author: string
  summary: string
  content: string
  clauses: ClauseNode[]
  expectedEffects: string[]
  faqs: PolicyFaq[]
  images: string[]
  supporters: Supporter[]
  createdAt: string
}

export interface SupportSignPayload {
  name: string
  phone: string
  message: string
  agreedPrivacy: boolean
  verificationToken: string
}

export interface CreatePolicyPayload {
  title: string
  description: string
  category: string
  author: string
  summary: string
  content: string
  clauses: ClauseNode[]
  expectedEffects: string[]
  faqs: PolicyFaq[]
  images: string[]
}
