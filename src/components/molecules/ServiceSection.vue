<template>
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">Principais Serviços</h2>
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="service-card"
            @click="openServiceModal(service)"
          >
            <div class="service-icon">
              <img :src="service.icon" :alt="service.title" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.shortDescription }}</p>
          </div>
        </div>
        <!-- Botão CTA "Ver Mais" -->
        <div class="cta-container">
          <button class="cta-button" @click="redirectToPortfolio">
            Ver Todos 
          </button>
        </div>
      </div>
  
      <!-- Service Modal -->
      <div v-if="selectedService" class="modal service-modal" @click.self="closeServiceModal">
        <div class="modal-content">
          <button class="close-modal" @click="closeServiceModal">
            <img src="https://api.iconify.design/heroicons:x-mark.svg" alt="Close" />
          </button>
          <div class="service-details">
            <div class="service-icon">
              <img :src="selectedService.icon" :alt="selectedService.title" />
            </div>
            <h2>{{ selectedService.title }}</h2>
            <p class="service-description">{{ selectedService.description }}</p>
            <div class="service-benefits">
              <h3>Benefícios</h3>
              <ul>
                <li v-for="benefit in selectedService.benefits" :key="benefit">{{ benefit }}</li>
              </ul>
            </div>
            <div class="success-cases">
              <h3>Cases de Sucesso</h3>
              <div class="cases-grid">
                <div v-for="serviceCase in selectedService.cases" :key="serviceCase.id" class="case-card">
                  <img :src="serviceCase.image" :alt="serviceCase.title" />
                  <h4>{{ serviceCase.title }}</h4>
                  <p>{{ serviceCase.description }}</p>
                </div>
              </div>
            </div>
            <!-- Botão CTA para a página individual do serviço -->
            <button class="cta-button modal-cta" @click="redirectToServicePage(selectedService.route)">
             Detalhes Serviços
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ServicesGallery',
    setup() {
      const selectedService = ref(null);
      const router = useRouter();
  
      const services = ref([
        {
          id: 1,
          title: 'Desenvolvimento Web',
          shortDescription: 'Websites e aplicações web modernas',
          description: 'Criamos websites e aplicações web responsivas, rápidas e otimizadas para SEO.',
          icon: 'https://api.iconify.design/heroicons:computer-desktop.svg',
          benefits: [
            'Design responsivo para todos os dispositivos',
            'Otimização para mecanismos de busca',
            'Alta performance e velocidade de carregamento',
            'Integrado com Ai e Machine Learning'
          ],
          cases: [
            {
              id: 1,
              title: 'E-commerce Fashion',
              description: 'Aumento de 150% nas vendas online',
              image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D'
            }
          ],
          route: '/ServiceWebsite' // Rota individual
        },
        {
          id: 2,
          title: 'Desenvolvimento Mobile',
          shortDescription: 'Aplicativos iOS e Android',
          description: 'Desenvolvemos aplicativos nativos e híbridos para iOS e Android.',
          icon: 'https://api.iconify.design/heroicons:device-phone-mobile.svg',
          benefits: [
            'Interface intuitiva e moderna',
            'Integração com APIs e serviços',
            'Suporte a recursos nativos dos dispositivos'
          ],
          cases: [
            {
              id: 2,
              title: 'App de Delivery',
              description: 'Mais de 10.000 downloads na primeira semana',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D'
            }
          ],
          route: '/ServiceAplicativo' // Rota individual
        },
        {
          id: 3,
          title: 'Design de Interface',
          shortDescription: 'UI/UX moderno e intuitivo',
          description: 'Criamos interfaces de usuário que combinam beleza e funcionalidade.',
          icon: 'https://api.iconify.design/heroicons:pencil-square.svg',
          benefits: [
            'Design centrado no usuário',
            'Prototipagem rápida e iterativa',
            'Testes de usabilidade'
          ],
          cases: [
            {
              id: 3,
              title: 'Redesign de App Bancário',
              description: 'Aumento de 30% na retenção de usuários',
              image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlc2lnbiUyMGludGVyZmFjZXxlbnwwfHwwfHx8MA%3D%3D'
            }
          ],
          route: '/ServiceInterface' // Rota individual
        },
        {
          id: 4,
          title: 'Marketing de Mídia',
          shortDescription: 'Estratégias de mídia digital',
          description: 'Maximizamos sua presença online com campanhas de mídia eficazes.',
          icon: 'https://api.iconify.design/heroicons:megaphone.svg',
          benefits: [
            'Campanhas personalizadas',
            'Análise de dados em tempo real',
            'Aumento do ROI'
          ],
          cases: [
            {
              id: 4,
              title: 'Campanha de Lançamento',
              description: 'Aumento de 200% no engajamento',
              image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D'
            }
          ],
          route: '/ServiceMidia' // Rota individual
        },
        {
          id: 5,
          title: 'E-commerce Solutions',
          shortDescription: 'Plataformas de vendas online',
          description: 'Soluções completas para lojas virtuais de alto desempenho.',
          icon: 'https://api.iconify.design/heroicons:shopping-cart.svg',
          benefits: [
            'Integração com gateways de pagamento',
            'Gestão de estoque e pedidos',
            'Relatórios de vendas detalhados'
          ],
          cases: [
            {
              id: 5,
              title: 'Loja de Moda Online',
              description: 'Crescimento de 300% nas vendas',
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1dG98ZW58MHx8MHx8fDA%3D'
            }
          ],
          route: '/ServiceEcommece' // Rota individual 
        },
        {
          id: 6,
          title: 'Consultoria em TI',
          shortDescription: 'Soluções personalizadas para sua empresa',
          description: 'Oferecemos consultoria especializada para otimizar sua infraestrutura de TI.',
          icon: 'https://api.iconify.design/heroicons:briefcase.svg',
          benefits: [
            'Análise de infraestrutura',
            'Planejamento estratégico',
            'Implementação de soluções'
          ],
          cases: [
            {
              id: 6,
              title: 'Migração para Cloud',
              description: 'Redução de 40% nos custos de TI',
              image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbnN1bHRpbmd8ZW58MHx8MHx8fDA%3D'
            }
          ],
          route: '/ServiceConsultoria' // Rota individual
        }
      ]);
  
      const openServiceModal = (service) => {
        selectedService.value = service;
        document.body.style.overflow = 'hidden';
      };
  
      const closeServiceModal = () => {
        selectedService.value = null;
        document.body.style.overflow = 'auto';
      };
  
      const redirectToPortfolio = () => {
        router.push('/portifolio');
      };
  
      const redirectToServicePage = (route) => {
        router.push(route);
      };
  
      return {
        services,
        selectedService,
        openServiceModal,
        closeServiceModal,
        redirectToPortfolio,
        redirectToServicePage
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .services-section {
    padding: 4rem 0;
    background: #f8f9fa;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    color: #2064bd;
    margin-bottom: 3rem;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards por linha */
  gap: 2rem; /* Espaçamento entre os cards */
    margin-bottom: 2rem;
  }
  
  .service-card {
    
    background: rgb(255, 255, 255);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
  }
  
  .service-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
  }
  
  .service-icon img {
    width: 100%;
    height: 100%;
  }
  
  /* Botão CTA "Ver Mais" */
  .cta-container {
    text-align: center;
    margin-top: 2rem;
  }
  
  .cta-button {
    padding: 1rem 2rem;
    background: #2064bd;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .cta-button:hover {
    background: #154a8a;
  }
  
  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  /* Estilos modal do cta */
.modal-cta {
    margin-top: 2rem;
    width: 100%;
    padding: 1rem;
    background: #2064bd;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .modal-cta:hover {
    background: #154a8a;
  }
  
  /* Service Modal Specific */
  .service-benefits ul {
    list-style-type: none;
    padding: 0;
  }
  
  .service-benefits li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
  }
  
  .service-benefits li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #2064bd;
  }
  
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .case-card {
    text-align: center;
  }
  
  .case-card img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  
    .modal-content {
      padding: 1rem;
    }
  }
  </style>