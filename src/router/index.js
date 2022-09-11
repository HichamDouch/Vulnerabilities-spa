import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home.vue')
    },
    {
      path: '/posts/:id',
      name: 'page-details',
      component: () => import('../pages/detailsPage.vue')
    },
    {
      path: '/post/create',
      name: 'create',
      component: () => import('../pages/update.vue')
    },
    {
      path: '/post/update/:id',
      name: 'update',
      component: () => import('../pages/update.vue')
    },
  ]
})

export default router
