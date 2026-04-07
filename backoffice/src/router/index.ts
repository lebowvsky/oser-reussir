import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: { name: 'hero' },
      },
      {
        path: 'hero',
        name: 'hero',
        component: () => import('@/views/HeroView.vue'),
      },
      {
        path: 'apropos',
        name: 'apropos',
        component: () => import('@/views/AproposView.vue'),
      },
      {
        path: 'pour-qui',
        name: 'pour-qui',
        component: () => import('@/views/PourQuiView.vue'),
      },
      {
        path: 'accompagnement',
        name: 'accompagnement',
        component: () => import('@/views/AccompagnementView.vue'),
      },
      {
        path: 'valeurs',
        name: 'valeurs',
        component: () => import('@/views/ValeursView.vue'),
      },
      {
        path: 'pourquoi',
        name: 'pourquoi',
        component: () => import('@/views/PourquoiView.vue'),
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/ContactView.vue'),
      },
      {
        path: 'reseaux-sociaux',
        name: 'reseaux-sociaux',
        component: () => import('@/views/ReseauxSociauxView.vue'),
      },
      {
        path: 'parametres',
        name: 'parametres',
        component: () => import('@/views/ParametresView.vue'),
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

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return { name: 'hero' }
  }
})

export default router
