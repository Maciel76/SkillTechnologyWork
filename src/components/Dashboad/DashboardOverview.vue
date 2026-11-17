<template>
  <div class="content-overview">
    <div class="overview-heading"><div><h1>Visão geral</h1><p>Seu conteúdo, organizado para o próximo passo.</p></div><button class="admin-refresh" :disabled="loading" @click="loadData"><i class="fas fa-rotate-right" :class="{ 'fa-spin': loading }" aria-hidden="true"></i>{{ loading ? 'Atualizando…' : 'Atualizar' }}</button></div>
    <div v-if="failed.length" class="overview-error" role="status">Não foi possível carregar {{ failed.join(', ') }}. <button :disabled="loading" @click="loadData">Tentar novamente</button></div>
    <section class="content-summary" aria-label="Resumo do conteúdo" :aria-busy="loading">
      <button v-for="item in summary" :key="item.id" class="summary-item" @click="$emit('navigate', item.id)"><span class="summary-label"><i :class="item.icon" aria-hidden="true"></i>{{ item.label }}</span><strong>{{ loading ? '—' : item.total ?? '—' }}</strong><span class="summary-description">{{ loading ? 'Carregando' : item.detail }}</span><i class="fas fa-chevron-right summary-chevron" aria-hidden="true"></i></button>
    </section>
    <div class="overview-columns">
      <section class="overview-panel projects-panel">
        <div class="overview-panel-heading"><div><h2>Projetos do portfólio</h2><p>Trabalhos cadastrados e suas publicações.</p></div><button class="admin-text-button" @click="$emit('navigate', 'projects')">Gerenciar projetos<i class="fas fa-arrow-right" aria-hidden="true"></i></button></div>
        <p v-if="loading" class="overview-placeholder" role="status">Carregando projetos…</p>
        <p v-else-if="failed.includes('projetos')" class="overview-placeholder">Os projetos não puderam ser carregados.</p>
        <div v-else-if="projects.length" class="overview-project-list">
          <button v-for="project in projects" :key="project._id" class="overview-project" @click="$emit('navigate', 'projects')"><img v-if="project.thumbnail" :src="project.thumbnail" alt="" loading="lazy" /><span v-else class="project-image-fallback"><i class="fas fa-layer-group" aria-hidden="true"></i></span><span class="overview-project-name"><strong>{{ project.title }}</strong><small>{{ project.category }}<template v-if="project.year"> · {{ project.year }}</template></small></span><span class="overview-publish-state" :class="{ live: isVisible(project) }">{{ projectStatus(project) }}</span><i class="fas fa-chevron-right" aria-hidden="true"></i></button>
        </div>
        <div v-else class="overview-placeholder"><p>Nenhum projeto cadastrado.</p><button class="admin-text-button" @click="$emit('navigate', 'projects')">Adicionar seu primeiro projeto</button></div>
        <div class="project-panel-footer"><a href="/portfolio" target="_blank" rel="noopener">Ver portfólio no site<i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
      </section>
      <section class="overview-panel publication-panel">
        <div class="overview-panel-heading"><div><h2>Publicação</h2><p>Continue de onde parou.</p></div></div>
        <button class="publication-row" @click="$emit('navigate', 'blog')"><span class="publication-icon"><i class="fas fa-pen-nib" aria-hidden="true"></i></span><span><strong>Blog</strong><small>{{ loading ? 'Carregando…' : draftLabel(blog?.rascunhos, 'artigo') }}</small></span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
        <button class="publication-row" @click="$emit('navigate', 'ecommerce')"><span class="publication-icon"><i class="fas fa-bag-shopping" aria-hidden="true"></i></span><span><strong>Loja</strong><small>{{ loading ? 'Carregando…' : draftLabel(productsStats?.draft, 'produto') }}</small></span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
        <button class="publication-row" @click="$emit('navigate', 'autores')"><span class="publication-icon"><i class="fas fa-code" aria-hidden="true"></i></span><span><strong>Desenvolvedores</strong><small>Perfis e projetos da equipe</small></span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
        <div class="publication-note"><i class="fas fa-circle-info" aria-hidden="true"></i><p>Revise os rascunhos antes de publicar no site.</p></div>
      </section>
    </div>
    <section class="overview-panel editorial-panel">
      <div class="overview-panel-heading"><div><h2>No blog</h2><p>Publicações e rascunhos mais recentes.</p></div><button class="admin-text-button" @click="$emit('navigate', 'blog')">Gerenciar blog<i class="fas fa-arrow-right" aria-hidden="true"></i></button></div>
      <p v-if="loading" class="overview-placeholder" role="status">Carregando artigos…</p><p v-else-if="failed.includes('artigos')" class="overview-placeholder">Os artigos não puderam ser carregados.</p>
      <div v-else-if="articles.length" class="overview-article-list"><button v-for="article in articles" :key="article._id" class="overview-article" @click="$emit('navigate', 'blog')"><span class="article-symbol"><i class="fas fa-file-lines" aria-hidden="true"></i></span><strong>{{ article.titulo || article.title }}</strong><span class="overview-publish-state" :class="{ live: article.status === 'published' }">{{ article.status === 'published' ? 'Publicado' : article.status === 'archived' ? 'Arquivado' : 'Rascunho' }}</span><i class="fas fa-chevron-right" aria-hidden="true"></i></button></div>
      <div v-else class="overview-placeholder"><p>Seu próximo artigo começa aqui.</p><button class="admin-text-button" @click="$emit('navigate', 'blog')">Criar conteúdo no blog</button></div>
    </section>
  </div>
</template>
<script>
import api from '@/services/api';
export default {
  name: 'DashboardOverview', emits: ['navigate'],
  data: () => ({ loading: true, failed: [], blog: null, projectsStats: null, productsStats: null, authorsTotal: null, projects: [], articles: [] }),
  computed: {
    summary() { return [
      { id: 'blog', label: 'Artigos', icon: 'fas fa-pen-nib', total: this.blog?.total, detail: this.blog ? `${this.blog.publicados} publicados` : 'Dados indisponíveis' },
      { id: 'projects', label: 'Projetos', icon: 'fas fa-layer-group', total: this.projectsStats?.total, detail: this.projectsStats ? `${this.projectsStats.published} no portfólio da agência` : 'Dados indisponíveis' },
      { id: 'ecommerce', label: 'Produtos', icon: 'fas fa-bag-shopping', total: this.productsStats?.total, detail: this.productsStats ? `${this.productsStats.published} publicados na loja` : 'Dados indisponíveis' },
      { id: 'autores', label: 'Desenvolvedores', icon: 'fas fa-code', total: this.authorsTotal, detail: this.authorsTotal === null ? 'Dados indisponíveis' : 'Perfis cadastrados' },
    ]; },
  },
  mounted() { this.loadData(); },
  methods: {
    async loadData() {
      this.loading = true; this.failed = [];
      const requests = [
        ['resumo do blog', '/blog/admin/posts/stats', data => { this.blog = data; }],
        ['resumo dos projetos', '/admin/recent-projects/stats', data => { this.projectsStats = data.data; }],
        ['resumo da loja', '/products/stats', data => { this.productsStats = data.data; }],
        ['desenvolvedores', '/admin/authors?limit=1', data => { this.authorsTotal = data.pagination?.total ?? null; }],
        ['projetos', '/admin/recent-projects?limit=4', data => { this.projects = data.data || []; }],
        ['artigos', '/blog/admin/posts?limite=3&pagina=1', data => { this.articles = data.artigos || []; }],
      ];
      const results = await Promise.allSettled(requests.map(async ([, url, assign]) => { const response = await api.get(url); assign(response.data); }));
      results.forEach((result, index) => { if (result.status === 'rejected') this.failed.push(requests[index][0]); });
      this.loading = false;
    },
    draftLabel(count, name) { return count == null ? 'Dados indisponíveis' : count === 0 ? 'Nenhum rascunho pendente' : `${count} ${name}${count === 1 ? '' : 's'} em rascunho`; },
    isVisible(project) { return project.published || (project.authorPublished !== false && project.authors?.some(author => author.published)); },
    projectStatus(project) { return project.published ? 'Na agência' : this.isVisible(project) ? 'No perfil' : 'Oculto'; },
  },
};
</script>
