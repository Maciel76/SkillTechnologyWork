import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboadView from'@/components/views/DashboadView.vue'
import Heroconfig from'@/components/Dashboad/HeroConfig.vue'
import SobreView from '@/components/views/SobreView.vue'
import TermosView from '@/components/views/TermosView.vue'
import EventosView from '@/components/views/EventosView.vue'
import PoliticasView from '@/components/views/PoliticasView.vue'
import MissionView from '@/components/views/MissionView.vue'
import ServiceView from '@/components/views/ServiceView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/Dashboad', component: DashboadView },
  { path: '/Heroconfig', component: Heroconfig },
  { path: '/Sobre', component: SobreView },
  { path: '/Termos', component: TermosView},
  { path: '/Eventos', component: EventosView},
  { path: '/Privacidade', component: PoliticasView},
  { path: '/Missao', component: MissionView},
  { path: '/Services', component: ServiceView},
  
]

const router = createRouter({
  history: createWebHistory(), // Alterado para remover o "#"
  routes
})

export default router
