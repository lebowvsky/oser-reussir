import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
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
