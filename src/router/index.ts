import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { isAuthenticated, isAdmin } from '@/services/authService';
import { aplicarSeo, seoDaRota } from "@/seo/aplicarSeo";
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
  // Portfolios pessoais: a lista do time e a pagina de cada autor.
  {
    path: "/portfolio/autores",
    name: "autores",
    component: () => import("@/components/views/AutoresView.vue"),
  },
  {
    path: "/portfolio/autor/:slug",
    name: "autorportfolio",
    component: () => import("@/components/views/AuthorPortfolioView.vue"),
    props: true,
  },
  // Página de planos e preços desativada: quem chegava nela saía sem falar com a gente.
  // O link antigo agora leva direto para o contato (o componente segue em PricinglogView.vue).
  { path: "/Planos/precos", redirect: "/contato" },
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
  { path: "/servicos/desenvolvimento-mobile", redirect: "/services" },
  { path: "/servicos/consultoria", redirect: "/services" },
  { path: "/servicos/doacoes", redirect: "/services" },
  { path: "/servicos/ecommerce", redirect: "/services" },
  { path: "/servicos/interface-ux-ui", redirect: "/services" },
  { path: "/servicos/desenvolvimento-websites", redirect: "/services" },
  { path: "/servicos/edicao-de-imagem", redirect: "/services" },

  // 🎨 PORTFÓLIO
  { path: "/portfolio/site-institucional", redirect: "/portfolio" },
  { path: "/portfolio/lojas-virtuais", redirect: "/portfolio" },
  { path: "/portfolio/blogs-personalizados", redirect: "/portfolio" },
  { path: "/service/mascotes-personalizados", redirect: "/portfolio" },
  { path: "/portfolio/sistemas-web", redirect: "/portfolio" },
  { path: "/portfolio/landing-pages", redirect: "/portfolio" },

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

/**
 * Reescreve titulo, descricao, canonical, Open Graph e JSON-LD a cada troca de
 * rota. Vai no afterEach (e nao no beforeEach) porque so depois da navegacao
 * confirmada a URL do canonical corresponde ao que o visitante esta vendo.
 */
router.afterEach((to) => {
  aplicarSeo(seoDaRota(to.name as string | undefined), to.path);
});

export default router;
