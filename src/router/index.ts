import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/policies' },
    { path: '/policies', component: () => import('@/pages/PolicyListView.vue') },
    { path: '/policies/new', component: () => import('@/pages/PolicyCreateView.vue') },
    { path: '/policies/:id', component: () => import('@/pages/PolicyDetailView.vue') }
  ]
})

export default router
