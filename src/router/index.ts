import { createRouter, createWebHistory } from 'vue-router'
import SwapyDemo from '@/views/SwapyDemo.vue'
import Dice from '@/views/Dice.vue'
import DiceTwo from '@/views/DiceTwo.vue'
import DiceThree from '@/views/DiceThree.vue'
import DiceSetDemo from '@/views/DiceSetDemo.vue'
import AboutView from '../views/AboutView.vue'
import Zindex from '@/views/Zindex.vue'

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
    },
    {
      path: '/dicetwo',
      name: 'dicetwo',
      component: DiceTwo
    },
    {
      path: '/dicethree',
      name: 'dicethree',
      component: DiceThree
    },
    {
      path: '/zindex',
      name: 'zindex',
      component: Zindex
    },
    {
      path: '/setdice',
      name: 'setdice',
      component: DiceSetDemo
    }
  ]
})

export default router
