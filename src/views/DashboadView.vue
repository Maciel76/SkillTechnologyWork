<template>
  <div class="dashboard-container" :class="{ 'admin-nav-open': mobileMenuOpen }" @keydown.esc="closeMobileMenu">
    <a class="admin-skip" href="#admin-content">Ir para o conteúdo</a>
    <button v-if="mobileMenuOpen" class="admin-overlay" aria-label="Fechar navegação" @click="closeMobileMenu"></button>
    <aside id="admin-navigation" class="admin-sidebar" :inert="mobileViewport && !mobileMenuOpen ? true : undefined" aria-label="Navegação do painel">
      <router-link class="admin-brand" to="/" aria-label="Skill Technology Work, abrir site">
        <img src="@/assets/svg/icons/logo.svg" alt="" /><span>Skill Technology<small>Administração do site</small></span>
      </router-link>
      <nav class="admin-navigation">
        <button :class="{ selected: activeMenu === 'dashboard' }" :aria-current="activeMenu === 'dashboard' ? 'page' : undefined" @click="setActiveMenu('dashboard')"><i class="fas fa-border-all" aria-hidden="true"></i><span>Visão geral</span></button>
        <p class="admin-nav-label">Conteúdo do site</p>
        <button v-for="item in coreMenu" :key="item.id" :class="{ selected: activeMenu === item.id }" :aria-current="activeMenu === item.id ? 'page' : undefined" @click="setActiveMenu(item.id)"><i :class="item.icon" aria-hidden="true"></i><span>{{ item.name }}</span></button>
        <details class="admin-more" :open="secondaryActive || undefined">
          <summary>Outras ferramentas<i class="fas fa-chevron-down" aria-hidden="true"></i></summary>
          <button v-for="item in secondaryMenu" :key="item.id" :class="{ selected: activeMenu === item.id }" :aria-current="activeMenu === item.id ? 'page' : undefined" @click="setActiveMenu(item.id)"><i :class="item.icon" aria-hidden="true"></i><span>{{ item.name }}</span></button>
        </details>
        <button :class="{ selected: activeMenu === 'integrations' }" :aria-current="activeMenu === 'integrations' ? 'page' : undefined" @click="setActiveMenu('integrations')"><i class="fas fa-plug" aria-hidden="true"></i><span>Integrações</span></button>
      </nav>
      <div class="admin-sidebar-footer"><a href="/" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>Ver site</a><button @click="signOut"><i class="fas fa-arrow-right-from-bracket" aria-hidden="true"></i>Sair da conta</button></div>
    </aside>
    <div class="admin-main">
      <header class="admin-topbar">
        <div class="admin-topbar-title"><button ref="menuButton" class="admin-menu-button" :aria-expanded="mobileMenuOpen" aria-controls="admin-navigation" aria-label="Abrir navegação" @click="mobileMenuOpen = !mobileMenuOpen"><i class="fas fa-bars" aria-hidden="true"></i></button><span>Seu site</span><span class="admin-breadcrumb" aria-hidden="true">/</span><strong>{{ activeTitle }}</strong></div>
        <a class="admin-site-link" href="/" target="_blank" rel="noopener">Abrir site <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
      </header>
      <main id="admin-content" ref="content" class="admin-content" tabindex="-1"><DashboardOverview v-if="activeMenu === 'dashboard'" @navigate="setActiveMenu" /><component v-else :is="activeComponent" :key="activeMenu" /></main>
      <footer class="admin-bottom">Skill Technology Work<span>Painel de conteúdo</span></footer>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, h } from 'vue';
import DashboardOverview from '@/components/Dashboad/DashboardOverview.vue';
import { logout } from '@/services/authService';
const loadManager = loader => defineAsyncComponent({
  loader, delay: 120, timeout: 60000,
  loadingComponent: { render: () => h('div', { class: 'admin-module-loading', role: 'status' }, [h('i', { class: 'fas fa-spinner fa-spin', 'aria-hidden': 'true' }), h('p', 'Carregando editor…')]) },
  errorComponent: { render: () => h('div', { class: 'admin-module-error', role: 'alert' }, 'Não foi possível abrir o editor. Atualize a página para tentar novamente.') },
});
const managers = {
  integrations: loadManager(() => import('@/components/Dashboad/McpIntegration.vue')),
  blog: loadManager(() => import('@/components/Dashboad/BlogManagement.vue')),
  projects: loadManager(() => import('@/components/Dashboad/ProjectsManagement.vue')),
  ecommerce: loadManager(() => import('@/components/Dashboad/EcommerceManagement.vue')),
  autores: loadManager(() => import('@/components/Dashboad/AuthorsManagement.vue')),
  portfolio: loadManager(() => import('@/components/Dashboad/PortfolioManagement.vue')),
  contato: loadManager(() => import('@/components/Dashboad/ContactManagement.vue')),
  leads: loadManager(() => import('@/components/Dashboad/LeadsManagement.vue')),
  propostas: loadManager(() => import('@/components/Dashboad/ProposalsManagement.vue')),
  testimonials: loadManager(() => import('@/components/Dashboad/TestimonialsManagement.vue')),
  events: loadManager(() => import('@/components/Dashboad/EventsManagement.vue')),
  ia: loadManager(() => import('@/components/Dashboad/AiIntegration.vue')),
  'ia-leads': loadManager(() => import('@/components/Dashboad/AiLeads.vue')),
};
export default {
  name: 'DashboardView', components: { DashboardOverview },
  data: () => ({ activeMenu: 'dashboard', mobileMenuOpen: false, mobileViewport: false,
    coreMenu: [
      { id: 'blog', name: 'Blog', icon: 'fas fa-pen-nib' },
      { id: 'projects', name: 'Projetos', icon: 'fas fa-layer-group' },
      { id: 'ecommerce', name: 'Loja', icon: 'fas fa-bag-shopping' },
      { id: 'autores', name: 'Desenvolvedores', icon: 'fas fa-code' },
    ],
    secondaryMenu: [
      { id: 'portfolio', name: 'Portfólio da agência', icon: 'fas fa-images' },
      { id: 'contato', name: 'Mensagens do site', icon: 'fas fa-envelope' },
      { id: 'leads', name: 'Leads', icon: 'fas fa-users' },
      { id: 'propostas', name: 'Propostas', icon: 'fas fa-file-lines' },
      { id: 'testimonials', name: 'Depoimentos', icon: 'fas fa-comment' },
      { id: 'events', name: 'Eventos', icon: 'fas fa-calendar' },
      { id: 'ia', name: 'Configuração de IA', icon: 'fas fa-sliders' },
      { id: 'ia-leads', name: 'Leads da IA', icon: 'fas fa-user-tie' },
    ],
  }),
  computed: {
    activeTitle() { if (this.activeMenu === 'integrations') return 'Integrações'; return [...this.coreMenu, ...this.secondaryMenu].find(item => item.id === this.activeMenu)?.name || 'Visão geral'; },
    activeComponent() { return managers[this.activeMenu]; },
    secondaryActive() { return this.secondaryMenu.some(item => item.id === this.activeMenu); },
  },
  watch: { '$route.query.area': 'restoreArea' },
  mounted() {
    this.restoreArea();
    this.mediaQuery = window.matchMedia('(max-width: 900px)');
    this.updateViewport = () => { this.mobileViewport = this.mediaQuery.matches; if (!this.mobileViewport) this.mobileMenuOpen = false; };
    this.updateViewport(); this.mediaQuery.addEventListener('change', this.updateViewport);
  },
  beforeUnmount() { this.mediaQuery?.removeEventListener('change', this.updateViewport); },
  methods: {
    restoreArea() { const area = this.$route.query.area; this.activeMenu = managers[area] ? area : 'dashboard'; },
    closeMobileMenu() { this.mobileMenuOpen = false; this.$nextTick(() => this.$refs.menuButton?.focus()); },
    setActiveMenu(id) {
      this.activeMenu = id; this.mobileMenuOpen = false;
      const query = { ...this.$route.query };
      if (id === 'dashboard') delete query.area; else query.area = id;
      this.$router.replace({ query });
      this.$nextTick(() => this.$refs.content?.focus({ preventScroll: true }));
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    signOut() { logout(); this.$router.push('/login'); },
  },
};
</script>
<style src="@/assets/css/admin.css"></style>
