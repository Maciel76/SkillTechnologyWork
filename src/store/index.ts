import { defineStore } from 'pinia';
import hero6 from '@/assets/images/banners/hero6.jpg';
import hero2 from '@/assets/images/banners/hero2.jpg';
import hero3 from '@/assets/images/banners/hero3.jpg';
import hero4 from '@/assets/images/banners/hero4.jpg';

export const useHeroStore = defineStore('hero', {
  state: () => ({
    heroConfig: {
      images: [
        { src: hero6, alt: 'Team' },
        { src: hero2, alt: 'Collaboration' },
        { src: hero3, alt: 'Team Meeting' },
        { src: hero4, alt: 'Innovation' }
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
  }),
  actions: {
    updateHeroConfig(newConfig: any) {
      this.heroConfig = newConfig;
    },
    toggleButtons() {
      this.heroConfig.showButtons = !this.heroConfig.showButtons;
    }
  }
});