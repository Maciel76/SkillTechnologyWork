import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuthenticated, isAdmin } from '@/services/authService';
import HomeView from "../views/HomeView.vue";
import Heroconfig from "@/components/Dashboad/HeroConfig.vue";
import SobreView from "@/components/views/SobreView.vue";
import TermosView from "@/components/views/TermosView.vue";
import EventosView from "@/components/views/EventosView.vue";
import PoliticasView from "@/components/views/PoliticasView.vue";
import MissionView from "@/components/views/MissionView.vue";
import ServiceView from "@/components/views/ServiceView.vue";
import PortfolioView from "@/components/views/PortfolioView.vue";
import PricinglogView from "@/components/views/PricinglogView.vue";
import ClientesView from "@/components/views/ClientesView.vue";
import LojaView from "@/components/views/LojaView.vue";
import BlogView from "@/components/views/BlogView.vue";
import BlogpostView from "@/components/views/BlogpostView.vue";
//import ProdutoView from "@/components/views/ProdutoView.vue";
// Serviços importação
import DesevolvimentoMobile from "@/components/servicepage/DesenvolvimentoMobile.vue";
import PageConsultoria from "@/components/servicepage/PageConsultoria.vue";
import PageDoacoes from "@/components/servicepage/PageDoacoes.vue";
import PageEcommerce from "@/components/servicepage/PageEcommerce.vue";
import PageInterface from "@/components/servicepage/PageInterface.vue";
import PageWebsite from "@/components/servicepage/PageWebsite.vue";
import SiteInstucional from "@/components/servicepage/Portifolio/SiteInstucional.vue";
import LojasVirtuais from "@/components/servicepage/Portifolio/lojasVirtuais.vue";
import BlogsPesonalizado from "@/components/servicepage/Portifolio/BlogsPesonalizado.vue";
import MascotePesonalizados from "@/components/servicepage/Portifolio/MascotePesonalizados.vue";
import EditorImagem from "@/components/servicepage/Portifolio/EditorImagem.vue";
import SistemasWeb from "@/components/servicepage/Portifolio/SistemasWeb.vue";
import LandingPages from "@/components/servicepage/Portifolio/LandingPages.vue";
import ProjectSection from "@/components/molecules/ProjectSection.vue";
import ContatoView from "@/components/views/ContatoView.vue";
import Testimonials from "@/components/views/ClientesView.vue";
import PageNotFound from "@/components/views/PageNotFound.vue";
import Dashboad from "@/views/DashboadView.vue";
import Login from "@/components/Login/PageLogin.vue";

// pagina de ajuste
import PaginaAjuste from "@/paginaAjuste.vue";

// ========== 🛣️ CONFIGURAÇÃO DAS ROTAS ========== //
const routes: Array<RouteRecordRaw> = [
  // 🔵 PÁGINA INICIAL
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Página Inicial" },
  },
  //pagina de Ajuste
  { path: "/paginaajuste", name: "paginaajuste", component: PaginaAjuste },
  // 📌 PÁGINAS PRINCIPAIS

  { path: "/sobre", name: "sobre", component: SobreView }, //✅ok
  { path: "/termos", name: "termos", component: TermosView }, // ✅ok
  { path: "/eventos", name: "eventos", component: EventosView }, // ✅ok
  { path: "/privacidade", name: "privacidade", component: PoliticasView }, //✅ok
  { path: "/missao", name: "missao", component: MissionView }, //✅ok
  { path: "/services", name: "servicos", component: ServiceView }, // finalizado
  { path: "/portfolio", name: "portfolio", component: PortfolioView },
  { path: "/Planos/precos", name: "precos", component: PricinglogView }, //💛 falta so muda a hero do site
  { path: "/clientes", name: "clientes", component: ClientesView }, // ✅ok
  { path: "/contato", name: "contato", component: ContatoView },

  { path: "/Loja", component: LojaView }, //finalizado
  {
    path: "/produtos/:id",
    name: "ProdutoPage",
    component: () => import("@/components/views/ProdutoView.vue"),
    props: true,
  }, // Rota para a página de produtos

  // ✨ BLOG - VERSÃO ANTERIOR
  { path: "/blog", component: BlogView },
  {
    path: "/blog/:id",
    component: BlogpostView,
    props: true,
  },

  // 🛠️ SERVIÇOS (DETALHES)
  { path: "/servicos/desenvolvimento-mobile", component: DesevolvimentoMobile },
  { path: "/servicos/consultoria", component: PageConsultoria },
  { path: "/servicos/doacoes", component: PageDoacoes },
  { path: "/servicos/ecommerce", component: PageEcommerce },
  { path: "/servicos/interface-ux-ui", component: PageInterface },
  { path: "/servicos/desenvolvimento-websites", component: PageWebsite },
  { path: "/servicos/edicao-de-imagem", component: EditorImagem },

  // 🎨 PORTFÓLIO
  { path: "/portfolio/site-institucional", component: SiteInstucional },
  { path: "/portfolio/lojas-virtuais", component: LojasVirtuais },
  { path: "/portfolio/blogs-personalizados", component: BlogsPesonalizado },
  {
    path: "/service/mascotes-personalizados",
    component: MascotePesonalizados,
  },

  { path: "/portfolio/sistemas-web", component: SistemasWeb },
  { path: "/portfolio/landing-pages", component: LandingPages },

  // 🎈Outros componente
  {
    path: "/projectsection",
    name: "projectsection",
    component: ProjectSection,
  },
  { path: "/feedback", name: "testimonials", component: Testimonials },

  {
    path: "/admin/hero",
    name: "heroconfig",
    component: Heroconfig,
    meta: { requiresAuth: true },
  },
  //=========================================================================================================
  //📗Dashboard
  {
    path: "/dashboard",
    component: Dashboad,
    meta: {
      hideHeader: true,
      hideFooter: true, // ✅ NÃO MOSTRA O FOOTER
      requiresAuth: true, // Require authentication
      requiresAdmin: true, // Require admin role
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      noLayout: true, // Don't use the main layout for login page
    },
  },

  //=========================================================================================================

  // 🛑 PÁGINA 404 (SEM HEADER/FOOTER)
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: PageNotFound,
    meta: { noLayout: true },
  },
];

// ========== ⚙️ CRIAÇÃO DO ROUTER ========== //
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Remove o # da URL
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { top: 0 }; // Rolagem suave para o topo
  },
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth) {
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      next({
        name: 'login',
        query: { redirect: to.fullPath } // Store the original route to redirect after login
      });
      return;
    }

    if (requiresAdmin && !isAdmin()) {
      // If route requires admin and user is not admin, show unauthorized or redirect
      next('/'); // Redirect to home page
      return;
    }
  }

  // If authenticated and trying to access login page, redirect to dashboard
  if (to.name === 'login' && isAuthenticated()) {
    next('/dashboard');
    return;
  }

  next();
});

export default router;
