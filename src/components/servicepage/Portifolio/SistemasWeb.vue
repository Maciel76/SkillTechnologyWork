<template>
  <div class="systems-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Sistemas Web <span class="highlight">Personalizados</span></h1>
        <p class="subtitle">
          Soluções sob medida para automatizar processos e melhorar a eficiência
          do seu negócio
        </p>
        <button class="cta-button" @click="scrollToPortfolio">
          Ver Exemplos
        </button>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-section">
      <h2>Por que investir em um sistema personalizado?</h2>
      <div class="value-grid">
        <div class="value-card">
          <div class="value-icon">⚙️</div>
          <h3>Automatização</h3>
          <p>
            Elimine tarefas repetitivas e reduza erros manuais com processos
            automatizados
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon">📊</div>
          <h3>Tomada de Decisão</h3>
          <p>
            Relatórios em tempo real com os dados mais relevantes para seu
            negócio
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon">🔗</div>
          <h3>Integração</h3>
          <p>
            Conecte todos os sistemas que sua empresa já utiliza em uma única
            plataforma
          </p>
        </div>
      </div>
    </section>

    <!-- Portfolio Showcase -->
    <section class="portfolio-section" id="portfolio">
      <h2>Nossos Sistemas Desenvolvidos</h2>
      <p class="section-description">
        Soluções reais criadas para otimizar os negócios de nossos clientes
      </p>

      <div class="portfolio-grid">
        <div
          class="portfolio-item"
          v-for="(project, index) in portfolio"
          :key="index"
        >
          <div
            class="portfolio-image"
            :style="{ backgroundImage: 'url(' + project.image + ')' }"
          >
            <div class="overlay">
              <h3>{{ project.client }}</h3>
              <p>{{ project.industry }}</p>
              <a :href="project.link" class="view-button" target="_blank"
                >Ver Detalhes</a
              >
            </div>
          </div>
          <div class="portfolio-info">
            <h4>{{ project.title }}</h4>
            <div class="features">
              <span
                v-for="(feature, fIndex) in project.features"
                :key="fIndex"
                >{{ feature }}</span
              >
            </div>
            <p class="description">{{ project.description }}</p>
            <div class="results">
              <div class="result-item">
                <span class="result-value">{{
                  project.results.efficiency
                }}</span>
                <span class="result-label">de eficiência</span>
              </div>
              <div class="result-item">
                <span class="result-value">{{ project.results.time }}%</span>
                <span class="result-label">tempo economizado</span>
              </div>
              <div class="result-item">
                <span class="result-value">{{
                  project.results.development
                }}</span>
                <span class="result-label">prazo (semanas)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2>Tecnologias e Funcionalidades</h2>
      <p class="section-description">
        Nossos sistemas incluem as melhores tecnologias do mercado
      </p>

      <div class="features-grid">
        <div class="features-card">
          <div class="features-icon">💻</div>
          <h3>Front-end Moderno</h3>
          <ul>
            <li>Vue.js / React</li>
            <li>Design responsivo</li>
            <li>UX otimizado</li>
            <li>PWA (Apps instaláveis)</li>
          </ul>
        </div>

        <div class="features-card">
          <div class="features-icon">🔐</div>
          <h3>Back-end Robusto</h3>
          <ul>
            <li>Node.js / Laravel</li>
            <li>APIs RESTful</li>
            <li>Autenticação segura</li>
            <li>Escalabilidade</li>
          </ul>
        </div>

        <div class="features-card">
          <div class="features-icon">📱</div>
          <h3>Mobile</h3>
          <ul>
            <li>Aplicativos nativos</li>
            <li>Responsividade</li>
            <li>Offline-first</li>
            <li>Notificações push</li>
          </ul>
        </div>

        <div class="features-card">
          <div class="features-icon">📈</div>
          <h3>Business Intelligence</h3>
          <ul>
            <li>Dashboards interativos</li>
            <li>Relatórios personalizados</li>
            <li>Exportação de dados</li>
            <li>Gráficos avançados</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <h2>Nosso Processo de Desenvolvimento</h2>
      <p class="section-description">
        Metodologia ágil para garantir os melhores resultados
      </p>

      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>Análise de Requisitos</h3>
          <p>Entendemos profundamente suas necessidades e processos atuais</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>Prototipação</h3>
          <p>
            Criamos protótipos interativos para validação antes do
            desenvolvimento
          </p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>Desenvolvimento Iterativo</h3>
          <p>
            Entregas parciais a cada 2 semanas para acompanhamento e ajustes
          </p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h3>Implantação e Treinamento</h3>
          <p>Instalação do sistema e capacitação da equipe para utilização</p>
        </div>
        <div class="process-step">
          <div class="step-number">5</div>
          <h3>Manutenção</h3>
          <p>Acompanhamento pós-implantação e melhorias contínuas</p>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <h2>Modelos de Contratação</h2>
      <p class="section-description">
        Soluções flexíveis para diferentes necessidades
      </p>

      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Sistema Básico</h3>
          <div class="price">R$ 15.000+</div>
          <ul class="features">
            <li>Até 3 módulos principais</li>
            <li>Painel administrativo</li>
            <li>Relatórios básicos</li>
            <li>1 integração externa</li>
            <li>3 meses de suporte</li>
          </ul>
          <button
            class="price-button"
            @click="openContactModal('Sistema Básico', 'R$ 15.000+')"
          >
            Quero este
          </button>
        </div>

        <div class="pricing-card featured">
          <div class="popular-tag">MAIS POPULAR</div>
          <h3>Sistema Corporativo</h3>
          <div class="price">R$ 35.000+</div>
          <ul class="features">
            <li>Até 8 módulos</li>
            <li>Dashboards completos</li>
            <li>Múltiplas integrações</li>
            <li>App mobile básico</li>
            <li>6 meses de suporte</li>
          </ul>
          <button
            class="price-button"
            @click="openContactModal('Sistema Corporativo', 'R$ 35.000+')"
          >
            Quero este
          </button>
        </div>

        <div class="pricing-card">
          <h3>ERP Customizado</h3>
          <div class="price">R$ 80.000+</div>
          <ul class="features">
            <li>Sistema completo</li>
            <li>Módulos ilimitados</li>
            <li>App mobile nativo</li>
            <li>Business Intelligence</li>
            <li>1 ano de suporte</li>
          </ul>
          <button
            class="price-button"
            @click="openContactModal('ERP Customizado', 'R$ 80.000+')"
          >
            Quero este
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Pronto para transformar seus processos?</h2>
        <p>Agende uma consultoria gratuita para discutir seu projeto</p>
        <button
          class="cta-button"
          @click="openContactModal('Consultoria Gratuita', 'Gratuito')"
        >
          Agendar Consultoria
        </button>
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
                placeholder="Conte-nos sobre seu projeto de sistema web"
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
          <h2 class="success-title">Proposta Enviada!</h2>
          <p class="success-message">
            Recebemos sua solicitação para o sistema web personalizado. Nossa equipe entrará em contato em breve para discutir os detalhes do projeto!
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
  name: "SystemsPage",
  data() {
    return {
      showModal: false,
      showSuccess: false,
      isSubmitting: false,
      selectedPlan: "",
      selectedPrice: "",
      planForm: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      serviceName: "Sistema Web", // Nome do serviço desta página

      portfolio: [
        {
          client: "Rede de Farmácias Saúde Total",
          title: "Sistema de gestão farmacêutica",
          industry: "Saúde",
          image:
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "#",
          features: [
            "Controle de estoque",
            "Vendas integradas",
            "Receituário digital",
            "Relatórios ANVISA",
          ],
          description:
            "Sistema completo para gestão de farmácias com controle de medicamentos controlados e integração com os principais planos de saúde.",
          results: {
            efficiency: "40%",
            time: 70,
            development: 12,
          },
        },
        {
          client: "Transportadora LogFácil",
          title: "Sistema de rastreamento de frota",
          industry: "Logística",
          image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "#",
          features: [
            "Rastreamento GPS",
            "Gestão de motoristas",
            "OTM (Otimização de rotas)",
            "Integração com SEFAZ",
          ],
          description:
            "Plataforma de gestão logística com rastreamento em tempo real, cálculo automático de rotas e emissão de documentos fiscais.",
          results: {
            efficiency: "35%",
            time: 60,
            development: 16,
          },
        },
        {
          client: "Escola Futuro Brillante",
          title: "Plataforma de gestão educacional",
          industry: "Educação",
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "#",
          features: [
            "Diário de classe digital",
            "Portal do aluno",
            "Financeiro escolar",
            "Comunicação pais-escola",
          ],
          description:
            "Sistema completo para administração escolar com aplicativo para pais acompanharem desempenho dos alunos e pagamentos.",
          results: {
            efficiency: "50%",
            time: 75,
            development: 14,
          },
        },
        {
          client: "Construtora Edifício Alto",
          title: "ERP para construção civil",
          industry: "Engenharia",
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "#",
          features: [
            "Gestão de obras",
            "Controle de insumos",
            "Orçamentos",
            "Integração com Sienge",
          ],
          description:
            "ERP especializado para construtoras com controle de custos por etapa da obra e integração com sistemas contábeis.",
          results: {
            efficiency: "45%",
            time: 65,
            development: 20,
          },
        },
      ],
    };
  },
  methods: {
    scrollToPortfolio() {
      document
        .getElementById("portfolio")
        .scrollIntoView({ behavior: "smooth" });
    },

    openContactModal(plan, price) {
      this.selectedPlan = plan;
      this.selectedPrice = price;
      this.showModal = true;
      document.body.style.overflow = "hidden";
    },

    closeModal() {
      this.showModal = false;
      document.body.style.overflow = "auto";
    },

    closeSuccessModal() {
      this.showSuccess = false;
      document.body.style.overflow = "auto";
    },

    async submitPlanRequest() {
      try {
        this.isSubmitting = true;

        const requestData = {
          nome: this.planForm.name,
          email: this.planForm.email,
          telefone: this.planForm.phone,
          mensagem: this.planForm.message,
          planName: this.selectedPlan,
          planPrice: this.selectedPrice,
          billingType: "mensal",
          serviceName: this.serviceName,
        };

        await serviceRequestService.create(requestData);

        // Limpa o formulário
        this.planForm = {
          name: "",
          email: "",
          phone: "",
          message: "",
        };

        // Fecha o modal de contato
        this.closeModal();

        // Aguarda um pouco para suavizar a transição
        setTimeout(() => {
          // Mostra o modal de sucesso
          this.showSuccess = true;
          document.body.style.overflow = "hidden";
        }, 300);
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        alert("Erro ao enviar solicitação. Por favor, tente novamente.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.systems-page {
  font-family: "Inter", sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.highlight {
  color: #48bb78;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-button {
  background: #48bb78;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.cta-button:hover {
  background: #38a169;
  transform: translateY(-2px);
}

/* Value Section */
.value-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.value-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.value-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.value-card p {
  color: #4a5568;
}

/* Portfolio Section */
.portfolio-section {
  padding: 6rem 2rem;
  background: #f7fafc;
}

.portfolio-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.portfolio-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.portfolio-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
}

.overlay h3 {
  font-size: 1.75rem;
  margin: 0;
}

.overlay p {
  margin: 0.5rem 0 1.5rem;
  font-size: 1rem;
  opacity: 0.9;
}

.view-button {
  align-self: flex-start;
  background: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.view-button:hover {
  background: #38a169;
}

.portfolio-info {
  padding: 2rem;
}

.portfolio-info h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.features span {
  background: #edf2f7;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.description {
  color: #4a5568;
  margin-bottom: 2rem;
}

.results {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}

.result-item {
  text-align: center;
}

.result-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #48bb78;
}

.result-label {
  font-size: 0.9rem;
  color: #718096;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.features-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.features-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.features-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.features-card ul {
  list-style-type: none;
  padding: 0;
}

.features-card li {
  margin-bottom: 0.75rem;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.features-card li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #48bb78;
}

/* Process Section */
.process-section {
  padding: 6rem 2rem;
  background: #f7fafc;
}

.process-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.process-step {
  flex: 1;
  min-width: 200px;
  max-width: 220px;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #48bb78;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
}

.process-step h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.process-step p {
  color: #4a5568;
  font-size: 0.95rem;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
}

.pricing-card.featured {
  border: 2px solid #48bb78;
  transform: scale(1.05);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #48bb78;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #48bb78;
  margin-bottom: 1.5rem;
}

.price::before {
  content: "R$ ";
  font-size: 1.5rem;
}

.features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features li {
  margin-bottom: 0.75rem;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #48bb78;
}

.price-button {
  width: 100%;
  padding: 1rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.price-button:hover {
  background: #38a169;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-section p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  position: relative;
  padding: 2rem;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.close-modal:hover {
  color: #1e293b;
  transform: scale(1.1);
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.plan-price-modal {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success Modal */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-modal-content {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.success-checkmark {
  margin: 0 auto 2rem;
  width: 80px;
  height: 80px;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #10b981;
  stroke-miterlimit: 10;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #10b981;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #10b981;
  stroke-width: 3;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.success-title {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 700;
}

.success-message {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.success-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
}

.success-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

/* Smooth Animations */
.modal-fade-enter-active {
  transition: all 0.3s ease;
}

.modal-fade-leave-active {
  transition: all 0.2s ease;
}

.modal-fade-enter-from {
  opacity: 0;
}

.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .success-modal-content {
  transform: scale(0.9) translateY(20px);
}

.modal-fade-leave-to .success-modal-content {
  transform: scale(0.9) translateY(20px);
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

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #10b981;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-item {
    max-width: 100%;
  }

  .value-card,
  .features-card,
  .process-step,
  .pricing-card {
    padding: 1.5rem;
  }

  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .process-step {
    max-width: 100%;
  }
}
</style>
