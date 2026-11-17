<template>
  <section v-if="carregando || itens.length" class="depoimentos" aria-labelledby="home-reviews-title">
    <div class="depoimentos-inner">
      <div class="depoimentos-header">
        <h2 id="home-reviews-title">O que dizem <span class="highlight">nossos clientes</span></h2>
      </div>

      <p v-if="carregando" class="depoimentos-carregando" role="status">Carregando…</p>
      <div v-else class="depoimentos-grid">
        <article v-for="item in itens" :key="item.id" class="depoimento-card">
          <div v-if="item.portfolio" class="depoimento-projeto">{{ item.projeto }}</div>
          <div v-else-if="item.nota" class="estrelas" :aria-label="`${item.nota} de 5 estrelas`" role="img">
            <font-awesome-icon v-for="estrela in 5" :key="estrela" icon="star" :class="{ apagada: estrela > item.nota }" />
          </div>

          <span class="depoimento-aspas" aria-hidden="true"><font-awesome-icon icon="quote-left" /></span>
          <p class="depoimento-texto">{{ item.texto }}</p>

          <div class="depoimento-autor">
            <img v-if="item.foto && !fotosIndisponiveis[item.id]" :src="item.foto" :alt="item.marca ? `Logo da ${item.nome}` : `Foto de ${item.nome}`" class="avatar" :class="{ 'avatar-marca': item.marca }" width="48" height="48" loading="lazy" decoding="async" @error="fotosIndisponiveis[item.id] = true" />
            <span v-else class="avatar avatar-iniciais" aria-hidden="true">{{ iniciais(item.nome) }}</span>
            <div class="autor-dados">
              <h3>{{ item.nome }}</h3>
              <span v-if="item.cargo || item.empresa" class="empresa">{{ [item.cargo, item.empresa].filter(Boolean).join(', ') }}</span>
            </div>
            <a v-if="item.url" :href="item.url" class="projeto-link" target="_blank" rel="noopener noreferrer" :aria-label="`Abrir ${item.projeto}`">Ver projeto <font-awesome-icon icon="arrow-up-right-from-square" /></a>
          </div>
        </article>
      </div>
      <router-link v-if="!carregando" to="/clientes" class="depoimentos-link">Compartilhe sua experiência <font-awesome-icon icon="arrow-right" /></router-link>
    </div>
  </section>
</template>

<script>
import avaliacaoService from '@/services/avaliacaoService';
import recentProjectService from '@/services/recentProjectService';
import logoSkill from '@/assets/testimonials/skill-technology-rammis.png';
import fotoMarcio from '@/assets/testimonials/marcio-sena.png';

// Identificações e imagens fornecidas pelo responsável pelo site.
const AVALIACOES_DO_PORTFOLIO = [
  {
    projetoId: '6a9647188638b3408bcdc947',
    nome: 'Skill Technology', foto: logoSkill, empresa: 'Projeto Rammis', marca: true,
    texto: 'Ter promotores, produtos e alertas de validade no mesmo painel ajuda a organizar a operação e acompanhar o que precisa de atenção.',
  },
  {
    projetoId: '6a9773b9c413975d18cabd26',
    nome: 'Marcio Sena', foto: fotoMarcio, empresa: 'IB2 Publicidade',
    texto: 'Vendas, estoque e caixa conectados deixam a rotina do balcão mais organizada. O painel reúne as informações para acompanhar o negócio.',
  },
  {
    projetoId: '6ae76bbe0e1fee4290162a1c',
    nome: 'Marcio Sena', foto: fotoMarcio, empresa: 'IB2 Publicidade',
    texto: 'Reunir divulgação, campanhas e conexões em um só lugar facilita a rotina de quem quer apresentar seu blog e acompanhar as visitas.',
  },
];

export default {
  name: 'TestimonialsPage',
  data: () => ({ depoimentos: [], projetos: [], carregando: true, fotosIndisponiveis: {} }),
  computed: {
    usandoPortfolio() { return this.depoimentos.length === 0; },
    itens() {
      if (!this.usandoPortfolio) return this.depoimentos.slice(0, 3);
      return AVALIACOES_DO_PORTFOLIO.flatMap(avaliacao => {
        const projeto = this.projetos.find(item => item._id === avaliacao.projetoId);
        if (!projeto) return [];
        return [{ ...avaliacao, id: `portfolio-${projeto._id}`, portfolio: true,
          projeto: String(projeto.title || '').split(/\s[—–-]\s/)[0],
          url: this.urlSegura(projeto.liveUrl),
        }];
      });
    },
  },
  async mounted() {
    const [avaliacoes, projetos] = await Promise.allSettled([
      avaliacaoService.getAprovadas(),
      recentProjectService.getPublishedProjects({ limit: 100 }),
    ]);
    if (avaliacoes.status === 'fulfilled') {
      this.depoimentos = (avaliacoes.value?.data || [])
        .filter(item => item.aprovado === true && item.nome?.trim() && item.avaliacao?.trim())
        .map(item => ({ id: item._id, nome: item.nome, cargo: item.cargo || '', empresa: item.empresa || '',
          texto: item.avaliacao, foto: this.urlSegura(recentProjectService.resolveImageUrl(item.foto || '')),
          nota: Number.isInteger(item.nota) && item.nota >= 1 && item.nota <= 5 ? item.nota : null,
        }));
    }
    if (projetos.status === 'fulfilled') this.projetos = projetos.value?.data || [];
    this.carregando = false;
  },
  methods: {
    iniciais(nome) {
      return String(nome || '').split(/\s+/).filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase();
    },
    urlSegura(url) { return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : ''; },
  },
};
</script>

<style scoped>
.depoimentos, .depoimentos * { box-sizing: border-box; }
.depoimentos { padding: 64px 30px; background: #fff; font-family: 'Inter', sans-serif; text-align: center; }
.depoimentos-inner { max-width: 1180px; margin: 0 auto; }
.depoimentos-header { margin-bottom: 40px; }
.depoimentos-header h2 { margin: 0; color: #131a4d; font-size: 40px; line-height: 1.2; font-weight: 800; letter-spacing: -0.025em; }
.highlight { background: linear-gradient(90deg, #0052ff, #7c6ef2); -webkit-background-clip: text; background-clip: text; color: transparent; }
.depoimentos-link { display: inline-flex; align-items: center; gap: 8px; justify-content: center; margin-top: 28px; padding: 6px 0; color: #0052ff; font-size: 14px; line-height: 1.5; font-weight: 650; text-decoration: none; }
.depoimentos-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.depoimento-card { display: flex; flex-direction: column; min-width: 0; padding: 26px 22px 20px; border: 1px solid #dde3ef; border-radius: 14px; background: #fff; }
.depoimento-projeto { margin-bottom: 14px; color: #0052ff; font-size: 17px; line-height: 1.3; font-weight: 700; }
.estrelas { display: flex; justify-content: center; gap: 3px; margin-bottom: 14px; color: #b86d00; font-size: 13px; }
.estrelas .apagada { color: #dce2ed; }
.depoimento-aspas { margin-bottom: 10px; color: #9caef0; font-size: 18px; }
.depoimento-texto { flex: 1; margin: 0 0 24px; color: #566079; font-size: 15px; line-height: 1.7; overflow-wrap: anywhere; }
.depoimento-autor { display: flex; flex-direction: column; align-items: center; gap: 11px; padding-top: 18px; border-top: 1px solid #edf0f5; }
.avatar { display: block; flex: 0 0 48px; width: 48px; height: 48px; border-radius: 50%; object-fit: cover; background: #f5f7fb; }
.avatar-marca { object-fit: contain; border-radius: 0; background: transparent; }
.avatar-iniciais { display: flex; align-items: center; justify-content: center; color: #566079; font-size: 15px; font-weight: 650; }
.autor-dados { min-width: 0; }
.autor-dados h3 { margin: 0 0 4px; color: #131a4d; font-size: 14px; line-height: 1.4; font-weight: 700; overflow-wrap: anywhere; }
.empresa { display: block; color: #68738a; font-size: 12px; line-height: 1.5; overflow-wrap: anywhere; }
.projeto-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex-shrink: 0; padding: 6px 0; color: #0052ff; font-size: 12px; line-height: 1.5; font-weight: 650; text-decoration: none; }
.projeto-link svg { width: 11px; height: 11px; }
.depoimentos-link:hover, .projeto-link:hover { text-decoration: underline; text-underline-offset: 4px; }
.depoimentos-link:focus-visible, .projeto-link:focus-visible { outline: 3px solid #0052ff; outline-offset: 4px; }
.depoimentos-carregando { margin: 0; padding: 30px 0; color: #566079; }
@media (max-width: 768px) {
  .depoimentos { padding: 40px 20px; }
  .depoimentos-header { margin-bottom: 28px; }
  .depoimentos-header h2 { font-size: 30px; }
  .depoimentos-grid { grid-template-columns: 1fr; gap: 18px; }
  .depoimento-card { padding: 24px 20px 20px; }
}
</style>
