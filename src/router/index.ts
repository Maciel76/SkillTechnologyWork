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
import ProdutoView from "@/components/views/ProdutoView.vue";
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
import SistemasWeb from "@/components/servicepage/Portifolio/SistemasWeb..vue";
import LandingPages from "@/components/servicepage/Portifolio/LandingPages.vue";
import ProjectSection from "@/components/molecules/ProjectSection.vue";
import ContatoView from "@/components/views/ContatoView.vue";
import Testimonials from "@/components/views/ClientesView.vue";
import PageNotFound from "@/components/views/PageNotFound.vue";

// Demonstração
import ConstrutoraAlpha from "@/ConstrutortaAlpha.vue";
import DemoEbookpage from "@/components/templates/DemoEbookpage.vue";
import InstitutoEducar from "@/InstitutoEducar.vue";
import AppAdvocaciaSilva from "@/components/servicepage/AdvocaciaSilva/AppAdvocaciaSilva.vue";
import DemoCursosonline from "@/components/templates/DemoCursosonline.vue";
import DemoCapLeads from "@/components/templates/DemoCapLeads.vue";

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
  { path: "/sobre", name: "sobre", component: SobreView }, //finalizado
  { path: "/termos", name: "termos", component: TermosView }, // finalizado
  { path: "/eventos", name: "eventos", component: EventosView }, // finalizado
  { path: "/privacidade", name: "privacidade", component: PoliticasView }, // finalizado
  { path: "/missao", name: "missao", component: MissionView }, // finalizado
  { path: "/services", name: "servicos", component: ServiceView }, // finalizado
  { path: "/portfolio", name: "portfolio", component: PortfolioView },
  { path: "/Planos/precos", name: "precos", component: PrecingView }, // finalizado
  { path: "/clientes", name: "clientes", component: ClientesView }, // falta adcionar alguns projetos reais
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
    path: "/portfolio/mascotes-personalizados",
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
  //=========================================================================================================
  // 🎭 PÁGINAS DE DEMO (SEM HEADER/FOOTER)
  {
    path: "/demo/construtora-alpha",
    name: "construtoraAlphaDemo",
    component: ConstrutoraAlpha,
    meta: {
      hideHeader: true,
      hideFooter: true, // ✅ NÃO MOSTRA O FOOTER
      // WhatsApp permanece visível (a menos que você defina hideWhatsApp)
    },
  },
  //📗landing page ebook
  {
    path: "/demo/ebookpage",
    component: DemoEbookpage,
    meta: {
      hideHeader: true,
      hideFooter: true, // ✅ NÃO MOSTRA O FOOTER
      // WhatsApp permanece visível (a menos que você defina hideWhatsApp)
    },
  },
  //📗Instituto Educar
  {
    path: "/demo/institutoeducar",
    component: InstitutoEducar,
    meta: {
      hideHeader: true,
      hideFooter: true, // ✅ NÃO MOSTRA O FOOTER
      // WhatsApp permanece visível (a menos que você defina hideWhatsApp)
    },
  },
  //📗Advocaci Silva
  {
    path: "/demo/advocaciasilva",
    component: AppAdvocaciaSilva,
    meta: { hideHeader: true, hideFooter: true }, // ✅ NÃO MOSTRA O FOOTER
  },
  //📗Cursos online
  {
    path: "/demo/cursosonline",
    component: DemoCursosonline,
    meta: { hideHeader: true, hideFooter: true },
  }, // ✅ NÃO MOSTRA O FOOTER
  //📗CapLeads ll
  {
    path: "/demo/capleads",
    component: DemoCapLeads,
    meta: { hideHeader: true, hideFooter: true },
  }, // ✅ NÃO MOSTRA O FOOTER

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

export default router;
