import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboadView from "@/components/views/DashboadView.vue";
import Heroconfig from "@/components/Dashboad/HeroConfig.vue";
import SobreView from "@/components/views/SobreView.vue";
import TermosView from "@/components/views/TermosView.vue";
import EventosView from "@/components/views/EventosView.vue";
import PoliticasView from "@/components/views/PoliticasView.vue";
import MissionView from "@/components/views/MissionView.vue";
import ServiceView from "@/components/views/ServiceView.vue";
import PortfolioView from "@/components/views/PortfolioView.vue";
import PrecingView from "@/components/views/PrecingView.vue";
import ClientesView from "@/components/views/ClientesView.vue";
import LojaView from "@/components/views/LojaView.vue";
import BlogView from "@/components/views/BlogView.vue";
import BlogpostView from "@/components/views/BlogpostView.vue";
// Serviços importação
import DesevolvimentoMobile from "@/components/servicepage/DesenvolvimentoMobile.vue";
import PageConsultoria from "@/components/servicepage/PageConsultoria.vue";
import PageDoacoes from "@/components/servicepage/PageDoacoes.vue";
import PageEcommerce from "@/components/servicepage/PageEcommerce.vue";
import PageInterface from "@/components/servicepage/PageInterface.vue";
import PageMidia from "@/components/servicepage/PageMidia.vue";
import PageWebsite from "@/components/servicepage/PageWebsite.vue";
import SiteInstucional from "@/components/servicepage/Portifolio/SiteInstucional.vue";
import LojasVirtuais from "@/components/servicepage/Portifolio/lojasVirtuais.vue";
import BlogsPesonalizado from "@/components/servicepage/Portifolio/BlogsPesonalizado.vue";
import MascotePesonalizados from "@/components/servicepage/Portifolio/MascotePesonalizados.vue";
import EditorImagem from "@/components/servicepage/Portifolio/EditorImagem.vue";
import SistemasWeb from "@/components/servicepage/Portifolio/SistemasWeb..vue";
import LandingPages from "@/components/servicepage/Portifolio/LandingPages.vue";
import ProjectSection from "@/components/molecules/ProjectSection.vue";
import ContatoView from "@/components/views/ContatoView.vue";
import Testimonials from "@/components/views/ClientesView.vue";
import PageNotFound from "@/components/views/PageNotFound.vue";

// Demonstração
import ConstrutoraAlpha from "@/ConstrutortaAlpha.vue";

// ========== 🛣️ CONFIGURAÇÃO DAS ROTAS ========== //
const routes: Array<RouteRecordRaw> = [
  // 🔵 PÁGINA INICIAL
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Página Inicial" },
  },

  // 📌 PÁGINAS PRINCIPAIS
  { path: "/sobre", name: "sobre", component: SobreView },
  { path: "/termos", name: "termos", component: TermosView },
  { path: "/eventos", name: "eventos", component: EventosView },
  { path: "/privacidade", name: "privacidade", component: PoliticasView },
  { path: "/missao", name: "missao", component: MissionView },
  { path: "/servicos", name: "servicos", component: ServiceView },
  { path: "/portfolio", name: "portfolio", component: PortfolioView },
  { path: "/precos", name: "precos", component: PrecingView },
  { path: "/clientes", name: "clientes", component: ClientesView },
  { path: "/loja", name: "loja", component: LojaView },
  { path: "/contato", name: "contato", component: ContatoView },

  // ✨ BLOG
  { path: "/blog", name: "blog", component: BlogView },
  {
    path: "/blog/:slug",
    name: "blogpost",
    component: BlogpostView,
    props: true,
  },

  // 🛠️ SERVIÇOS (DETALHES)
  { path: "/servicos/desenvolvimento-mobile", component: DesevolvimentoMobile },
  { path: "/servicos/consultoria", component: PageConsultoria },
  { path: "/servicos/doacoes", component: PageDoacoes },
  { path: "/servicos/ecommerce", component: PageEcommerce },
  { path: "/servicos/interface-ux-ui", component: PageInterface },
  { path: "/servicos/midia-social", component: PageMidia },
  { path: "/servicos/desenvolvimento-websites", component: PageWebsite },

  // 🎨 PORTFÓLIO
  { path: "/portfolio/site-institucional", component: SiteInstucional },
  { path: "/portfolio/lojas-virtuais", component: LojasVirtuais },
  { path: "/portfolio/blogs-personalizados", component: BlogsPesonalizado },
  {
    path: "/portfolio/mascotes-personalizados",
    component: MascotePesonalizados,
  },
  { path: "/portfolio/edicao-de-imagem", component: EditorImagem },
  { path: "/portfolio/sistemas-web", component: SistemasWeb },
  { path: "/portfolio/landing-pages", component: LandingPages },

  // 🎈Outros componente
  {
    path: "/projectsection",
    name: "projectsection",
    component: ProjectSection,
  },
  { path: "/feedback", name: "testimonials", component: Testimonials },

  // 👨‍💻 PAINEL ADMIN (DASHBOARD)
  {
    path: "/admin",
    name: "dashboard",
    component: DashboadView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/hero",
    name: "heroconfig",
    component: Heroconfig,
    meta: { requiresAuth: true },
  },

  // 🎭 PÁGINAS DE DEMO (SEM HEADER/FOOTER)
  {
    path: "/demo/construtora-alpha",
    name: "construtoraAlphaDemo",
    component: ConstrutoraAlpha,
    meta: { noLayout: true }, // ✅ NÃO MOSTRA HEADER/FOOTER
  },

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

export default router;
