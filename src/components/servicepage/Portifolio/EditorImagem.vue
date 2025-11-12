<template>
  <div class="editing-page">
    <!-- Hero Section Impactante -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">Edição Profissional</span>
          <span class="title-line highlight">
            <span class="tech-text">de Imagens</span>
            <span class="pulse-dot"></span>
          </span>
        </h1>
        <p class="hero-subtitle">Transformamos suas fotos com técnicas avançadas de Photoshop e IA para resultados que impressionam</p>
        <div class="cta-container">
          <button class="cta-button" @click="scrollToShowcase">Ver Transformações</button>
          <button class="cta-button secondary" @click="scrollToPricing">Solicitar Orçamento</button>
        </div>
        <div class="tech-stack">
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg" alt="Photoshop" title="Adobe Photoshop">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/adobe-lightroom-cc-2.svg" alt="Lightroom" title="Adobe Lightroom">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg" alt="Illustrator" title="Adobe Illustrator">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/adobe-firefly.svg" alt="Firefly" title="Adobe Firefly (IA)">
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="image-comparison">
          <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Antes" class="before">
          <img src="https://images.unsplash.com/photo-1530785602389-07594beb8b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Depois" class="after">
          <div class="slider-handle" @mousedown="startDrag"></div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Explore nossos serviços</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- USP Section -->
    <section class="usp-section">
      <div class="usp-container">
        <h2>Por que escolher nosso serviço?</h2>
        <p class="section-description">Combinação perfeita entre arte humana e tecnologia avançada</p>
        
        <div class="usp-grid">
          <div class="usp-card">
            <div class="usp-icon">🎯</div>
            <h3>Precisão Pixel-Perfect</h3>
            <p>Edição minuciosa com atenção a cada detalhe para resultados impecáveis</p>
          </div>
          <div class="usp-card">
            <div class="usp-icon">🤖</div>
            <h3>IA Generativa</h3>
            <p>Utilizamos Adobe Firefly para expandir criativamente suas imagens</p>
          </div>
          <div class="usp-card">
            <div class="usp-icon">⚡</div>
            <h3>Entrega Rápida</h3>
            <p>Processamento prioritário para clientes com prazos apertados</p>
          </div>
          <div class="usp-card">
            <div class="usp-icon">🔄</div>
            <h3>Revisões Ilimitadas</h3>
            <p>Ajustamos até você ficar 100% satisfeito com o resultado</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Before/After Showcase -->
    <section class="showcase-section" id="showcase">
      <div class="showcase-container">
        <h2>Transformações Impressionantes</h2>
        <p class="section-description">Veja a mágica que podemos fazer com suas imagens</p>
        
        <div class="showcase-tabs">
          <button 
            v-for="(category, index) in showcaseCategories" 
            :key="index"
            :class="{ active: activeCategory === index }"
            @click="activeCategory = index"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="showcase-content">
          <div class="comparison-grid">
            <div class="comparison-item" v-for="(item, index) in showcaseCategories[activeCategory].items" :key="index">
              <div class="comparison-container">
                <div class="image-wrapper">
                  <img :src="item.before" alt="Antes" class="before">
                  <img :src="item.after" alt="Depois" class="after" :style="{ clipPath: `polygon(0 0, ${item.sliderPosition}% 0, ${item.sliderPosition}% 100%, 0 100%)` }">
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  v-model="item.sliderPosition" 
                  class="slider" 
                  @input="updateSlider(index)"
                >
                <div class="slider-handle" :style="{ left: `${item.sliderPosition}%` }">
                  <div class="handle-icon">↔️</div>
                </div>
              </div>
              <div class="comparison-info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <div class="techniques-used">
                  <span v-for="(tech, techIndex) in item.techniques" :key="techIndex">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="services-container">
        <h2>Nossos Serviços de Edição</h2>
        <p class="section-description">Soluções completas para todas as necessidades de imagem</p>
        
        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="service-header">
              <div class="service-icon">{{ service.icon }}</div>
              <h3>{{ service.name }}</h3>
            </div>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="(feature, fIndex) in service.features" :key="fIndex">{{ feature }}</li>
            </ul>
            <div class="service-pricing">
              <span class="price">A partir de {{ service.price }}</span>
              <span class="time">Entrega: {{ service.deliveryTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Workflow Section -->
    <section class="workflow-section">
      <div class="workflow-container">
        <h2>Nosso Processo de Trabalho</h2>
        <p class="section-description">Fluxo otimizado para máxima qualidade e eficiência</p>
        
        <div class="workflow-steps">
          <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
            <div class="step-tools" v-if="step.tools">
              <span v-for="(tool, tIndex) in step.tools" :key="tIndex">{{ tool }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section" id="pricing">
      <div class="pricing-container">
        <h2>Planos e Preços</h2>
        <p class="section-description">Opções flexíveis para diferentes necessidades</p>
        
        <div class="pricing-grid">
          <div class="pricing-card" v-for="(plan, index) in pricingPlans" :key="index" :class="{ popular: plan.popular }">
            <div class="card-header">
              <h3>{{ plan.name }}</h3>
              <div class="price">{{ plan.price }}</div>
              <div class="best-value" v-if="plan.popular">Melhor Custo-Benefício</div>
            </div>
            <ul class="features">
              <li v-for="(feature, fIndex) in plan.features" :key="fIndex">
                <span class="check-icon">✓</span>{{ feature }}
              </li>
            </ul>
            <button class="select-plan" @click="openContactModal(plan.name, plan.price)">Selecionar Plano</button>
          </div>
        </div>

        <div class="custom-project">
          <h3>Projeto Personalizado?</h3>
          <p>Temos soluções sob medida para necessidades específicas</p>
          <button class="cta-button" @click="openContactModal('Projeto Personalizado', 'A definir')">Fale com nosso time</button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="testimonials-container">
        <h2>O que nossos clientes dizem</h2>
        <p class="section-description">Depoimentos reais de quem já experimentou nosso trabalho</p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="client-info">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="client-avatar">
              <div class="client-details">
                <h3>{{ testimonial.name }}</h3>
                <span>{{ testimonial.role }} • {{ testimonial.business }}</span>
              </div>
            </div>
            <div class="testimonial-text">
              <p>"{{ testimonial.text }}"</p>
            </div>
            <div class="client-rating">
              <span v-for="star in 5" :key="star">★</span>
              <span class="rating-value">{{ testimonial.rating }}/5</span>
            </div>
            <div class="project-link" v-if="testimonial.project">
              <a :href="testimonial.project.link" target="_blank">Ver projeto →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta">
      <div class="cta-container">
        <h2>Pronto para elevar suas imagens ao próximo nível?</h2>
        <p>Envie seus arquivos agora e receba uma amostra grátis em 24 horas</p>
        <div class="cta-actions">
          <button class="cta-button" @click="openContactModal('Amostra Grátis', 'Gratuito')">Enviar Imagens</button>
          <button class="secondary-button" @click="openContactModal('Consulta', 'A definir')">Falar com Especialista</button>
        </div>
      </div>
    </section>

    <!-- Contact Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">×</button>
        <div class="modal-header">
          <h2>Solicitar {{ selectedPlan }}</h2>
          <p class="plan-price-modal">{{ selectedPrice }}</p>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitPlanRequest">
            <div class="form-group">
              <input
                type="text"
                v-model="planForm.name"
                placeholder="Seu nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="planForm.email"
                placeholder="Seu e-mail"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="tel"
                v-model="planForm.phone"
                placeholder="Seu telefone"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="planForm.message"
                placeholder="Descreva seu projeto de edição de imagens"
              ></textarea>
            </div>
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Enviando..." : "Enviar Solicitação" }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="modal-fade">
      <div class="success-modal-overlay" v-if="showSuccess" @click="closeSuccessModal">
        <div class="success-modal-content" @click.stop>
          <div class="success-checkmark">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2 class="success-title">Solicitação Enviada!</h2>
          <p class="success-message">
            Recebemos sua solicitação de edição de imagens. Nossa equipe entrará em contato em breve para discutir os detalhes!
          </p>
          <button class="success-button" @click="closeSuccessModal">Fechar</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import serviceRequestService from "@/services/serviceRequestService";

export default {
  name: 'ProfessionalEditingPage',
  data() {
    return {
      activeCategory: 0,
      isDragging: false,
      showModal: false,
      showSuccess: false,
      isSubmitting: false,
      selectedPlan: '',
      selectedPrice: '',
      planForm: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      showcaseCategories: [
        {
          name: 'Retoques',
          items: [
            {
              before: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Retoque Profissional',
              description: 'Correção de pele, olhos e características faciais',
              techniques: ['Suavização de pele', 'Clareamento de olhos', 'Correção de assimetrias'],
              sliderPosition: 50
            },
            {
              before: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Correção de Cores',
              description: 'Ajuste profissional de tons e temperatura',
              techniques: ['Balanço de branco', 'Correção de tons', 'Harmonização'],
              sliderPosition: 50
            }
          ]
        },
        {
          name: 'Manipulações',
          items: [
            {
              before: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Composição Digital',
              description: 'Combinação perfeita de múltiplos elementos',
              techniques: ['Máscaras avançadas', 'Perspectiva realista', 'Sombreamento'],
              sliderPosition: 50
            },
            {
              before: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Background Replacement',
              description: 'Substituição de fundo com corte preciso',
              techniques: ['Seleção de cabelo', 'Sombras naturais', 'Harmonização'],
              sliderPosition: 50
            }
          ]
        },
        {
          name: 'IA Generativa',
          items: [
            {
              before: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Expansão Criativa',
              description: 'Ampliação de cenário usando IA generativa',
              techniques: ['Adobe Firefly', 'Preenchimento contextual', 'Texturização'],
              sliderPosition: 50
            },
            {
              before: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              after: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              title: 'Restauração com IA',
              description: 'Reconstrução de fotos antigas e danificadas',
              techniques: ['Remoção de danos', 'Colorização', 'Aumento de resolução'],
              sliderPosition: 50
            }
          ]
        }
      ],
      services: [
        {
          icon: '🖼️',
          name: 'Retoque Profissional',
          description: 'Correção avançada de retratos e imagens de produtos',
          features: [
            'Suavização de pele natural',
            'Correção de olhos vermelhos',
            'Remoção de imperfeições',
            'Ajuste de iluminação'
          ],
          price: 'R$ 25/imagem',
          deliveryTime: '24-48h'
        },
        {
          icon: '✂️',
          name: 'Recorte de Imagem',
          description: 'Remoção de fundo com precisão profissional',
          features: [
            'Corte de cabelo detalhado',
            'Transparência PNG',
            'Sombras realistas',
            'Formato para e-commerce'
          ],
          price: 'R$ 15/imagem',
          deliveryTime: '12-24h'
        },
        {
          icon: '🎨',
          name: 'Correção de Cores',
          description: 'Ajuste profissional de tons e balanço de cor',
          features: [
            'Correção de temperatura',
            'Harmonização de tons',
            'Realce seletivo',
            'Perfil de cor específico'
          ],
          price: 'R$ 20/imagem',
          deliveryTime: '24h'
        },
        {
          icon: '🏙️',
          name: 'Manipulação de Imagem',
          description: 'Composições criativas e montagens realistas',
          features: [
            'Combinação de múltiplas imagens',
            'Perspectiva correta',
            'Sombreamento profissional',
            'Efeitos especiais'
          ],
          price: 'R$ 50/imagem',
          deliveryTime: '48-72h'
        },
        {
          icon: '🤖',
          name: 'Edição com IA',
          description: 'Utilização de inteligência artificial generativa',
          features: [
            'Expansão de cenário',
            'Remoção de objetos',
            'Restauração de fotos',
            'Geração de elementos'
          ],
          price: 'R$ 40/imagem',
          deliveryTime: '24-48h'
        },
        {
          icon: '📦',
          name: 'Pacote Completo',
          description: 'Solução all-in-one para imagens profissionais',
          features: [
            'Recorte preciso',
            'Retoque avançado',
            'Correção de cores',
            'Otimização para web'
          ],
          price: 'R$ 75/imagem',
          deliveryTime: '48h'
        }
      ],
      workflowSteps: [
        {
          title: 'Upload Seguro',
          description: 'Envie suas imagens através de nossa plataforma criptografada',
          tools: ['Google Drive', 'Dropbox', 'WeTransfer']
        },
        {
          title: 'Briefing Detalhado',
          description: 'Especifique suas necessidades e preferências',
          tools: ['Formulário', 'Chamada', 'Exemplos']
        },
        {
          title: 'Edição Profissional',
          description: 'Processamento com Photoshop e ferramentas de IA',
          tools: ['Photoshop', 'Lightroom', 'Firefly']
        },
        {
          title: 'Revisão de Qualidade',
          description: 'Inspeção pixel por pixel por nosso time',
          tools: ['Zoom 400%', 'Monitores calibrados']
        },
        {
          title: 'Entrega e Feedback',
          description: 'Receba seus arquivos e solicite ajustes se necessário',
          tools: ['WeTransfer', 'Google Drive', 'E-mail']
        }
      ],
      pricingPlans: [
        {
          name: 'Básico',
          price: 'R$ 2,90/img',
          features: [
            'Até 100 imagens/mês',
            'Correção básica de cor',
            'Recorte simples',
            'Entrega em 72h',
            '1 revisão por imagem'
          ],
          popular: false
        },
        {
          name: 'Profissional',
          price: 'R$ 4,90/img',
          features: [
            'Até 500 imagens/mês',
            'Retoque profissional',
            'Recorte complexo',
            'Manipulação básica',
            'Entrega em 48h',
            '2 revisões por imagem'
          ],
          popular: true
        },
        {
          name: 'Premium',
          price: 'R$ 7,90/img',
          features: [
            'Volume ilimitado',
            'Edição avançada',
            'Manipulação criativa',
            'Edição com IA',
            'Entrega em 24h',
            'Revisões ilimitadas'
          ],
          popular: false
        }
      ],
      testimonials: [
        {
          name: 'Ana Carolina',
          role: 'Fotógrafa',
          business: 'Estúdio Lumière',
          text: 'O trabalho de pós-produção que recebi superou todas as expectativas. As imagens ficaram com um ar profissional que meus clientes amaram!',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          project: {
            name: 'Portfólio de Moda',
            link: '#'
          }
        },
        {
          name: 'Ricardo Almeida',
          role: 'E-commerce',
          business: 'Moda Masculina Premium',
          text: 'A edição dos nossos produtos aumentou em 30% a taxa de conversão. O recorte perfeito e os fundos personalizados fizeram toda diferença.',
          rating: 4.5,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          project: {
            name: 'Catálogo de Produtos',
            link: '#'
          }
        },
        {
          name: 'Fernanda Gomes',
          role: 'Marketing Digital',
          business: 'Agência Criativa',
          text: 'Precisávamos de manipulações complexas em tempo recorde. Não só entregaram antes do prazo como a qualidade foi excepcional.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          project: {
            name: 'Campanha de Verão',
            link: '#'
          }
        }
      ]
    }
  },
  methods: {
    scrollToShowcase() {
      const element = document.getElementById('showcase');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    scrollToPricing() {
      const element = document.getElementById('pricing');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    startDrag(e) {
      this.isDragging = true;
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    handleDrag(e) {
      if (!this.isDragging) return;
      
      const container = document.querySelector('.image-comparison');
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      // Calcula a porcentagem baseada na posição x
const rawPercentage = (x / rect.width) * 100;
// Garante que o valor fique entre 0 e 100
const percentage = Math.min(Math.max(rawPercentage, 0), 100);
      
      const afterImg = document.querySelector('.image-comparison .after');
      afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      
      const handle = document.querySelector('.slider-handle');
      handle.style.left = `${percentage}%`;
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    updateSlider(index) {
      // Atualiza a posição do slider para o item específico
      const item = this.showcaseCategories[this.activeCategory].items[index];
      // A animação é feita via CSS com transition
    },
    openContactModal(planName, planPrice) {
      this.selectedPlan = planName;
      this.selectedPrice = planPrice;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = 'auto';
      this.planForm = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    },
    closeSuccessModal() {
      this.showSuccess = false;
      document.body.style.overflow = 'auto';
    },
    async submitPlanRequest() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        await serviceRequestService.create({
          nome: this.planForm.name,
          email: this.planForm.email,
          telefone: this.planForm.phone,
          mensagem: this.planForm.message || `Solicitação do plano ${this.selectedPlan}`,
          planName: this.selectedPlan,
          planPrice: this.selectedPrice,
          billingType: 'mensal',
          serviceName: 'Edição de Imagens'
        });

        this.closeModal();
        this.showSuccess = true;

        setTimeout(() => {
          this.closeSuccessModal();
        }, 400);

      } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        alert('Erro ao enviar solicitação. Por favor, tente novamente.');
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  mounted() {
    // Inicializa os sliders
    this.showcaseCategories.forEach(category => {
      category.items.forEach(item => {
        item.sliderPosition = 50;
      });
    });
  }
}
</script>

<style scoped>
/* Estilos Base */
.editing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.tech-text {
  position: relative;
  display: inline-block;
}

.tech-text::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(99, 102, 241, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cta-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tech-icon img {
  height: 40px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.tech-icon img:hover {
  opacity: 1;
  transform: translateY(-3px);
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.image-comparison {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.image-comparison img {
  width: 100%;
  height: auto;
  display: block;
}

.image-comparison .after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}

.slider-handle {
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  width: 4px;
  background: white;
  z-index: 3;
  transform: translateX(-2px);
  cursor: ew-resize;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.slider-handle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: #6366f1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  margin-top: 8px;
  animation: bounce 2s infinite;
}

/* USP Section */
.usp-section {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.usp-container {
  max-width: 1200px;
  margin: 0 auto;
}

.usp-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.usp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.usp-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.usp-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1);
}

.usp-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.usp-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.usp-card p {
  color: #64748b;
  line-height: 1.7;
}

/* Showcase Section */
.showcase-section {
  padding: 6rem 2rem;
  background: white;
}

.showcase-container {
  max-width: 1200px;
  margin: 0 auto;
}

.showcase-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.showcase-tabs button {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  color: #64748b;
  transition: all 0.3s ease;
}

.showcase-tabs button.active {
  background: #6366f1;
  color: white;
}

.showcase-tabs button:hover {
  background: #e0e7ff;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 3rem;
}

.comparison-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.comparison-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.comparison-container {
  position: relative;
  width: 100%;
  height: 400px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.comparison-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 3;
  cursor: ew-resize;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  z-index: 2;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transform: translateX(-2px);
  transition: left 0.3s ease;
}

.handle-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #6366f1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.comparison-info {
  padding: 2rem;
}

.comparison-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.comparison-info p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.techniques-used {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.techniques-used span {
  background: #e0e7ff;
  color: #6366f1;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Services Section */
.services-section {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1);
}

.service-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-icon {
  font-size: 2.5rem;
  background: #e0e7ff;
  color: #6366f1;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-card h3 {
  font-size: 1.5rem;
  color: #1e293b;
}

.service-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.service-features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.service-features li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  color: #475569;
}

.service-features li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: bold;
}

.service-pricing {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.price {
  font-weight: 700;
  color: #1e293b;
  font-size: 1.1rem;
}

.time {
  color: #64748b;
  font-size: 0.9rem;
}

/* Workflow Section */
.workflow-section {
  padding: 6rem 2rem;
  background: white;
}

.workflow-container {
  max-width: 1200px;
  margin: 0 auto;
}

.workflow-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.workflow-step {
  flex: 1;
  min-width: 200px;
  max-width: 220px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.workflow-step:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1);
}

.workflow-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.step-number {
  width: 50px;
  height: 50px;
  background: #e0e7ff;
  color: #6366f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.step-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.step-content p {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.step-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step-tools span {
  background: #f1f5f9;
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1);
}

.pricing-card.popular {
  border: 2px solid #6366f1;
  transform: translateY(-10px);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.card-header h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.best-value {
  color: #64748b;
  font-size: 0.9rem;
}

.features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: #475569;
}

.features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: bold;
}

.select-plan {
  width: 100%;
  padding: 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-plan:hover {
  background: #4f46e5;
}

.custom-project {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  margin-top: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.custom-project h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.custom-project p {
  color: #64748b;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  background: white;
}

.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1);
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.client-details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.client-details span {
  color: #64748b;
  font-size: 0.9rem;
}

.testimonial-text {
  font-style: italic;
  color: #475569;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.5rem;
}

.testimonial-text::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -10px;
  font-size: 3rem;
  color: #e2e8f0;
  z-index: 0;
}

.testimonial-text p {
  position: relative;
  z-index: 1;
}

.client-rating {
  color: #fbbf24;
  margin-bottom: 1.5rem;
}

.rating-value {
  color: #64748b;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.project-link a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-link a:hover {
  color: #4f46e5;
  text-decoration: underline;
}

/* Final CTA Section */
.final-cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  text-align: center;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.final-cta p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.secondary-button {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }
  
  .hero-visual {
    order: -1;
    margin-bottom: 3rem;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-card.popular {
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .cta-container {
    flex-direction: column;
  }
  
  .cta-button, .cta-button.secondary {
    width: 100%;
  }
  
  .workflow-steps {
    flex-direction: column;
  }
  
  .workflow-step {
    max-width: 100%;
  }
  
  .cta-actions {
    flex-direction: column;
  }
  
  .secondary-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }
  
  .showcase-tabs {
    flex-direction: column;
  }
  
  .showcase-tabs button {
    width: 100%;
  }
  
  .comparison-container {
    height: 300px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal:hover {
  color: #1e293b;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.plan-price-modal {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
}

.modal-body form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #4f46e5;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success Modal Styles */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
}

.success-modal-content {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-checkmark {
  margin-bottom: 1.5rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.checkmark-circle {
  stroke: #6366f1;
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: checkmark-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke: #6366f1;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkmark-check 0.3s 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.success-title {
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 1rem;
}

.success-message {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.success-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.success-button:hover {
  background: #4f46e5;
}

/* Transition Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .success-modal-content {
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes checkmark-circle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark-check {
  to {
    stroke-dashoffset: 0;
  }
}
</style>