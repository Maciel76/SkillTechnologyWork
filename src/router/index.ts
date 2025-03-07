import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboadView from'@/components/views/DashboadView.vue'
import Heroconfig from'@/components/Dashboad/HeroConfig.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/Dashboad', component: DashboadView },
  { path: '/Heroconfig', component: Heroconfig },
]

const router = createRouter({
  history: createWebHistory(), // Alterado para remover o "#"
  routes
})

export default router
