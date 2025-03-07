// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    heroConfig: {
      images: [
        { src: require('@/assets/images/banners/hero6.jpg'), alt: 'Team' },
        { src: require('@/assets/images/banners/hero2.jpg'), alt: 'Collaboration' },
        { src: require('@/assets/images/banners/hero3.jpg'), alt: 'Team Meeting' },
        { src: require('@/assets/images/banners/hero4.jpg'), alt: 'Innovation' }
      ],
      texts: [
        { 
          h1: 'Transformando Ideias Em <span class="highlight">Soluções Inovadoras</span>', 
          p: 'Soluções de TI e design personalizados para o seu <span class="highlight">negócio</span>.' 
        },
        { 
          h1: 'A <span class="highlight">Colaboração</span> é o Futuro para sua Empresa', 
          p: 'Trabalhando juntos para criar soluções de <span class="highlight">sucesso</span>.' 
        },
        { 
          h1: 'Inovação e o <span class="highlight">Futuro para sua empresa </span>', 
          p: 'Melhore a performance com novas soluções <span class="highlight">tecnológicas</span>.' 
        },
        { 
          h1: 'Transforme sua Empresa com <span class="highlight">Tecnologia</span>', 
          p: 'Criamos a tecnologia de amanhã para o seu <span class="highlight">negócio</span> de hoje.' 
        }
      ],
      showButtons: true
    }
  },
  mutations: {
    updateHeroConfig(state, newConfig) {
      state.heroConfig = newConfig;
    },
    toggleButtons(state) {
      state.heroConfig.showButtons = !state.heroConfig.showButtons;
    }
  },
  actions: {
    updateHeroConfig({ commit }, newConfig) {
      commit('updateHeroConfig', newConfig);
    },
    toggleButtons({ commit }) {
      commit('toggleButtons');
    }
  }
});