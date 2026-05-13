import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/pages/PolicyListView.vue') },
    { path: '/policies', redirect: '/' },
    { path: '/policies/new', component: () => import('@/pages/PolicyCreateView.vue') },
    { path: '/policies/:id', component: () => import('@/pages/PolicyDetailView.vue') },
    { path: '/policies/:id/edit', component: () => import('@/pages/PolicyEditView.vue') },
    { path: '/terms', component: () => import('@/pages/TermsView.vue') },
    { path: '/privacy', component: () => import('@/pages/PrivacyView.vue') }
  ]
})

export default router
