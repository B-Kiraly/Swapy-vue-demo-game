import { createRouter, createWebHistory } from 'vue-router'
import SwapyDemo from '@/views/SwapyDemo.vue'
import Dice from '@/views/Dice.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dice
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/swapy',
      name: 'swapy',
      component: SwapyDemo
    },
    {
      path: '/dice',
      name: 'dice',
      component: Dice
    }
  ]
})

export default router
