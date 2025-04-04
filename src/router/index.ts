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
import PortfolioView from '@/components/views/PortfolioView.vue'
import PrecingView from '@/components/views/PrecingView.vue'
import ClientesView from '@/components/views/ClientesView.vue'
import LojaView from '@/components/views/LojaView.vue'
import BlogView from '@/components/views/BlogView.vue'
import BlogpostView from '@/components/views/BlogpostView.vue'
// Serviços importação
import DesevovimentoMobile from '@/components/servicepage/DesenvolvimentoMobile.vue'
import PageConsultoria from '@/components/servicepage/PageConsultoria.vue'
import PageDoacoes from '@/components/servicepage/PageDoacoes.vue'
import PageEcommerce from '@/components/servicepage/PageEcommerce.vue'
import PageInterface from '@/components/servicepage/PageInterface.vue'
import PageMidia from '@/components/servicepage/PageMidia.vue'
import PageWebsite from '@/components/servicepage/PageWebsite.vue'
import SiteInstucional from '@/components/servicepage/Portifolio/SiteInstucional.vue'
import LojasVirtuais from '@/components/servicepage/Portifolio/lojasVirtuais.vue'
import BlogsPesonalizado from '@/components/servicepage/Portifolio/BlogsPesonalizado.vue'
import MascotePesonalizados from '@/components/servicepage/Portifolio/MascotePesonalizados.vue'
import EditorImagem from '@/components/servicepage/Portifolio/EditorImagem.vue'
import SistemasWeb from '@/components/servicepage/Portifolio/SistemasWeb..vue'
import LandingPages from '@/components/servicepage/Portifolio/LandingPages.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  // seção serviços
  { path: '/DesenvolvimentoMobile', component: DesevovimentoMobile },
  { path: '/ServiceConsultoria', component: PageConsultoria },
  { path: '/Doacao', component: PageDoacoes },
  { path: '/ServiceEcommece', component: PageEcommerce },
  { path: '/ServiceInterface', component: PageInterface },
  { path: '/ServiceMidia', component: PageMidia },
  { path: '/ServiceWebsite', component: PageWebsite },
  { path: '/siteInstitucional', component: SiteInstucional },
  { path: '/lojasvituais', component: LojasVirtuais },
  { path: '/blogsPesonalizado', component: BlogsPesonalizado },
  { path: '/mascotePersonalizados', component: MascotePesonalizados },
  { path: '/EditorImagem', component: EditorImagem },
  { path: '/sistemasweb', component: SistemasWeb },
  { path: '/landingpages', component: LandingPages },



  


  // ========================
  { path: '/Dashboad', component: DashboadView },
  { path: '/Heroconfig', component: Heroconfig },
  { path: '/Sobre', component: SobreView },
  { path: '/Termos', component: TermosView},
  { path: '/Eventos', component: EventosView},
  { path: '/Privacidade', component: PoliticasView},
  { path: '/Missao', component: MissionView},
  { path: '/Services', component: ServiceView},
  { path: '/Portfolio', component: PortfolioView},
  { path: '/Precing', component: PrecingView},
  { path: '/Clientes', component: ClientesView},
  { path: '/Loja', component: LojaView},
  { path: '/blog', component: BlogView},
  { path: '/blog/:id', component: BlogpostView, props: true},
  


  {
    path: '/produtos/:id',
    name: 'ProdutoPage',
    component: () => import('@/components/views/ProdutoView.vue'),
    props: true
  }, // Rota para a página de produtos



  
]

const router = createRouter({
  history: createWebHistory(), // Alterado para remover o "#"
  routes
})

export default router
