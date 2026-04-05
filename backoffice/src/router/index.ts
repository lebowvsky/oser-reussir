import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/admin',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
