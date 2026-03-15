import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuthenticated, isAdmin } from '@/services/authService';
import HomeView from "../views/HomeView.vue";

// ========== 🛣️ CONFIGURAÇÃO DAS ROTAS ========== //
const routes: Array<RouteRecordRaw> = [
  // 🔵 PÁGINA INICIAL
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Página Inicial" },
  },

  // pagina de Ajuste
  {
    path: "/paginaajuste",
    name: "paginaajuste",
    component: () => import("@/paginaAjuste.vue"),
  },

  // 📌 PÁGINAS PRINCIPAIS
  { path: "/sobre", name: "sobre", component: () => import("@/components/views/SobreView.vue") },
  { path: "/termos", name: "termos", component: () => import("@/components/views/TermosView.vue") },
  { path: "/eventos", name: "eventos", component: () => import("@/components/views/EventosView.vue") },
  { path: "/privacidade", name: "privacidade", component: () => import("@/components/views/PoliticasView.vue") },
  { path: "/missao", name: "missao", component: () => import("@/components/views/MissionView.vue") },
  { path: "/services", name: "servicos", component: () => import("@/components/views/ServiceView.vue") },
  { path: "/portfolio", name: "portfolio", component: () => import("@/components/views/PortfolioView.vue") },
  { path: "/Planos/precos", name: "precos", component: () => import("@/components/views/PricinglogView.vue") },
  { path: "/clientes", name: "clientes", component: () => import("@/components/views/ClientesView.vue") },
  { path: "/contato", name: "contato", component: () => import("@/components/views/ContatoView.vue") },

  { path: "/Loja", name: "loja", component: () => import("@/components/views/LojaView.vue") },
  {
    path: "/produtos/:id",
    name: "ProdutoPage",
    component: () => import("@/components/views/ProdutoView.vue"),
    props: true,
  },

  // ✨ BLOG
  { path: "/blog", name: "blog", component: () => import("@/components/views/BlogView.vue") },
  {
    path: "/blog/post/:id",
    name: "htmlpost",
    component: () => import("@/components/views/HtmlPostView.vue"),
    props: true,
    meta: { hideHeader: true, hideFooter: true, hideWhatsApp: true },
  },
  {
    path: "/blog/:id",
    name: "blogpost",
    component: () => import("@/components/views/BlogpostView.vue"),
    props: true,
  },

  // 🛠️ SERVIÇOS (DETALHES)
  { path: "/servicos/desenvolvimento-mobile", name: "servico-mobile", component: () => import("@/components/servicepage/DesenvolvimentoMobile.vue") },
  { path: "/servicos/consultoria", name: "servico-consultoria", component: () => import("@/components/servicepage/PageConsultoria.vue") },
  { path: "/servicos/doacoes", name: "servico-doacoes", component: () => import("@/components/servicepage/PageDoacoes.vue") },
  { path: "/servicos/ecommerce", name: "servico-ecommerce", component: () => import("@/components/servicepage/PageEcommerce.vue") },
  { path: "/servicos/interface-ux-ui", name: "servico-interface", component: () => import("@/components/servicepage/PageInterface.vue") },
  { path: "/servicos/desenvolvimento-websites", name: "servico-websites", component: () => import("@/components/servicepage/PageWebsite.vue") },
  { path: "/servicos/edicao-de-imagem", name: "servico-edicao-imagem", component: () => import("@/components/servicepage/Portifolio/EditorImagem.vue") },

  // 🎨 PORTFÓLIO
  { path: "/portfolio/site-institucional", name: "portfolio-institucional", component: () => import("@/components/servicepage/Portifolio/SiteInstucional.vue") },
  { path: "/portfolio/lojas-virtuais", name: "portfolio-lojas", component: () => import("@/components/servicepage/Portifolio/lojasVirtuais.vue") },
  { path: "/portfolio/blogs-personalizados", name: "portfolio-blogs", component: () => import("@/components/servicepage/Portifolio/BlogsPesonalizado.vue") },
  { path: "/service/mascotes-personalizados", name: "portfolio-mascotes", component: () => import("@/components/servicepage/Portifolio/MascotePesonalizados.vue") },
  { path: "/portfolio/sistemas-web", name: "portfolio-sistemas", component: () => import("@/components/servicepage/Portifolio/SistemasWeb.vue") },
  { path: "/portfolio/landing-pages", name: "portfolio-landing", component: () => import("@/components/servicepage/Portifolio/LandingPages.vue") },

  // 🎈 Outros componentes
  {
    path: "/projectsection",
    name: "projectsection",
    component: () => import("@/components/molecules/ProjectSection.vue"),
  },
  {
    path: "/feedback",
    name: "testimonials",
    component: () => import("@/components/views/ClientesView.vue"),
  },

  {
    path: "/admin/hero",
    name: "heroconfig",
    component: () => import("@/components/Dashboad/HeroConfig.vue"),
    meta: { requiresAuth: true },
  },

  // 📗 Dashboard
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboadView.vue"),
    meta: {
      hideHeader: true,
      hideFooter: true,
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login/PageLogin.vue"),
    meta: {
      hideHeader: true,
      hideFooter: true,
    },
  },

  // 🛑 PÁGINA 404 (SEM HEADER/FOOTER)
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/components/views/PageNotFound.vue"),
    meta: { noLayout: true },
  },
];

// ========== ⚙️ CRIAÇÃO DO ROUTER ========== //
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Remove o # da URL
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
