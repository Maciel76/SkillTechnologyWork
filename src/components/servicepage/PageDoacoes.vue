<template>
  <div class="donation-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Invista no Futuro Digital</h1>
        <p class="subtitle">Sua doação financia projetos inovadores que transformam ideias em realidade</p>
        <div class="cta-container">
          <button class="cta-button" @click="scrollToDonation">Doar Agora</button>
          <button class="secondary-button" @click="scrollToProjects">Ver Projetos</button>
        </div>
      </div>
      <div class="hero-illustration">
        <img src="https://via.placeholder.com/500x400?text=Web+Development" alt="Desenvolvimento Web">
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-section">
      <h2>Por que apoiar nossos projetos?</h2>
      <div class="value-grid">
        <div class="value-card">
          <div class="value-icon">🚀</div>
          <h3>Inovação Contínua</h3>
          <p>Financiamos projetos experimentais que testam novas tecnologias web</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌐</div>
          <h3>Impacto Global</h3>
          <p>Nossas soluções são open-source e acessíveis mundialmente</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🎯</div>
          <h3>Foco em Resultados</h3>
          <p>Relatórios trimestrais mostram como seu dinheiro foi investido</p>
        </div>
      </div>
    </section>

    <!-- Projects Roadmap -->
    <section class="roadmap-section" id="projects">
      <h2>Nossa Pipeline de Projetos</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(project, index) in projects" :key="index">
          <div class="timeline-content">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-meta">
              <span class="status" :class="project.status">{{ project.status }}</span>
              <span class="funding">Arrecadado: {{ project.raised }} de {{ project.goal }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: project.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Section -->
    <section class="donation-section" id="donation">
      <div class="donation-container">
        <div class="donation-info">
          <h2>Sua doação faz a diferença</h2>
          <p>Escolha como deseja contribuir para o futuro do desenvolvimento web:</p>
          
          <div class="donation-options">
            <div class="option-card" 
                 v-for="option in donationOptions" 
                 :key="option.value"
                 :class="{ 'active': selectedOption === option.value }"
                 @click="selectOption(option.value)">
              <h3>{{ option.label }}</h3>
              <p>{{ option.description }}</p>
              <span class="amount">{{ option.amount }}</span>
            </div>
          </div>
        </div>

        <div class="donation-form">
          <h3>Complete sua doação</h3>
          <form @submit.prevent="processDonation">
            <div class="form-group">
              <label for="amount">Valor</label>
              <input type="number" 
                     id="amount" 
                     v-model="donationAmount" 
                     placeholder="R$ 0,00"
                     min="10"
                     required>
            </div>

            <div class="form-group">
              <label>Frequência</label>
              <div class="frequency-options">
                <button type="button" 
                        :class="{ 'active': donationFrequency === 'once' }"
                        @click="donationFrequency = 'once'">
                  Única
                </button>
                <button type="button" 
                        :class="{ 'active': donationFrequency === 'monthly' }"
                        @click="donationFrequency = 'monthly'">
                  Mensal
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="name">Nome completo</label>
              <input type="text" id="name" v-model="donorName" required>
            </div>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email" v-model="donorEmail" required>
            </div>

            <div class="form-group">
              <label for="payment">Método de pagamento</label>
              <select id="payment" v-model="paymentMethod" required>
                <option value="credit">Cartão de crédito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto bancário</option>
              </select>
            </div>

            <div class="form-group" v-if="paymentMethod === 'credit'">
              <label>Dados do cartão</label>
              <div class="card-form">
                <input type="text" placeholder="Número do cartão" required>
                <input type="text" placeholder="Nome no cartão" required>
                <div class="card-details">
                  <input type="text" placeholder="MM/AA" required>
                  <input type="text" placeholder="CVV" required>
                </div>
              </div>
            </div>

            <button type="submit" class="submit-button">
              Confirmar Doação
            </button>

            <div class="security-info">
              <span>🔒 Pagamento seguro</span>
              <span>💳 Dados criptografados</span>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="impact-section">
      <h2>O impacto das suas doações</h2>
      <div class="impact-stats">
        <div class="stat">
          <h3>+{{ completedProjects }}</h3>
          <p>Projetos concluídos</p>
        </div>
        <div class="stat">
          <h3>R$ {{ totalRaised }}</h3>
          <p>Investidos em tecnologia</p>
        </div>
        <div class="stat">
          <h3>{{ contributors }}</h3>
          <p>Apoiadores</p>
        </div>
      </div>
      
      <div class="testimonials">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <div class="avatar">{{ testimonial.initials }}</div>
          <div class="content">
            <p>"{{ testimonial.text }}"</p>
            <span class="author">{{ testimonial.name }}, {{ testimonial.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h2>Perguntas frequentes</h2>
      <div class="faq-container">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <span class="toggle-icon">{{ activeFaq === index ? '−' : '+' }}</span>
          </div>
          <div class="answer" v-show="activeFaq === index">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DonationPage',
  data() {
    return {
      projects: [
        {
          name: "Web Components Library",
          description: "Biblioteca open-source de componentes reutilizáveis para Vue e React",
          status: "em desenvolvimento",
          raised: "R$ 8.500",
          goal: "R$ 15.000",
          progress: 56
        },
        {
          name: "Acessibilidade Web Toolkit",
          description: "Ferramentas para tornar sites mais acessíveis",
          status: "planejamento",
          raised: "R$ 2.300",
          goal: "R$ 10.000",
          progress: 23
        },
        {
          name: "Web Performance Benchmark",
          description: "Plataforma de teste de performance para frameworks JS",
          status: "concluído",
          raised: "R$ 12.000",
          goal: "R$ 12.000",
          progress: 100
        }
      ],
      donationOptions: [
        {
          value: "basic",
          label: "Apoiador",
          description: "Ajuda a manter um projeto pequeno",
          amount: "R$ 50"
        },
        {
          value: "standard",
          label: "Patrocinador",
          description: "Financia um desenvolvedor por uma semana",
          amount: "R$ 200"
        },
        {
          value: "premium",
          label: "Visionário",
          description: "Permite o início de um novo projeto",
          amount: "R$ 1.000"
        }
      ],
      selectedOption: "standard",
      donationAmount: 200,
      donationFrequency: "once",
      donorName: "",
      donorEmail: "",
      paymentMethod: "credit",
      completedProjects: 12,
      totalRaised: "85.000",
      contributors: "342",
      testimonials: [
        {
          initials: "AM",
          name: "Ana Martins",
          role: "Desenvolvedora Front-end",
          text: "Graças aos componentes open-source financiados, pude entregar meu projeto 3x mais rápido."
        },
        {
          initials: "CR",
          name: "Carlos Ribeiro",
          role: "CTO",
          text: "Nossa empresa doa mensalmente porque acreditamos no impacto coletivo desses projetos."
        }
      ],
      faqs: [
        {
          question: "Como meu dinheiro será utilizado?",
          answer: "80% vai diretamente para o desenvolvimento, 15% para infraestrutura e 5% para divulgação."
        },
        {
          question: "Posso sugerir um projeto?",
          answer: "Sim! Temos um formulário para sugestões que são avaliadas trimestralmente."
        },
        {
          question: "Recebo algo em troca?",
          answer: "Doadores recebem relatórios exclusivos e acesso antecipado às novidades."
        }
      ],
      activeFaq: null
    }
  },
  methods: {
    scrollToDonation() {
      document.getElementById('donation').scrollIntoView({ behavior: 'smooth' });
    },
    scrollToProjects() {
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    },
    selectOption(option) {
      this.selectedOption = option;
      this.donationAmount = this.donationOptions.find(o => o.value === option).amount.replace('R$ ', '');
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
    processDonation() {
      // Lógica de processamento de pagamento
      alert(`Obrigado por doar R$ ${this.donationAmount}!`);
      // Resetar formulário
      this.donorName = "";
      this.donorEmail = "";
    }
  }
}
</script>

<style scoped>
.donation-page {
  font-family: 'Inter', sans-serif;
  color: #1a1d1f;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
  gap: 60px;
}

.hero-content {
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: #4b5563;
  margin-bottom: 30px;
}

.cta-container {
  display: flex;
  gap: 16px;
}

.cta-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.secondary-button {
  background: white;
  color: #2563eb;
  border: 1px solid #2563eb;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background: #f0f4ff;
  transform: translateY(-2px);
}

.hero-illustration img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Value Proposition */
.value-section {
  padding: 80px 0;
  text-align: center;
}

.value-section h2 {
  font-size: 2.2rem;
  margin-bottom: 60px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.value-card {
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.value-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
}

.value-card p {
  color: #4b5563;
  line-height: 1.6;
}

/* Projects Roadmap */
.roadmap-section {
  padding: 80px 0;
  background: #f9fafb;
}

.roadmap-section h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 60px;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: #e5e7eb;
  transform: translateX(-50%);
}

.timeline-item {
  padding: 20px 0;
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-right: auto;
}

.timeline-content {
  max-width: 45%;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.timeline-item h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2563eb;
}

.timeline-item p {
  color: #4b5563;
  margin-bottom: 12px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.status.em {
  background: #dbeafe;
  color: #1e40af;
}

.status.planejamento {
  background: #f3e8ff;
  color: #6b21a8;
}

.status.concluído {
  background: #dcfce7;
  color: #166534;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}

/* Donation Section */
.donation-section {
  padding: 80px 0;
}

.donation-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.donation-info {
  flex: 1;
}

.donation-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.donation-info p {
  color: #4b5563;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.donation-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.option-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #2563eb;
}

.option-card.active {
  border-color: #2563eb;
  background: #f0f4ff;
}

.option-card h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.option-card p {
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 12px;
}

.amount {
  font-weight: 700;
  color: #2563eb;
}

.donation-form {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.donation-form h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.frequency-options {
  display: flex;
  gap: 8px;
}

.frequency-options button {
  flex: 1;
  padding: 10px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.frequency-options button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.card-form {
  display: grid;
  gap: 12px;
}

.card-details {
  display: flex;
  gap: 12px;
}

.card-details input {
  flex: 1;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-button:hover {
  background: #1d4ed8;
}

.security-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #4b5563;
}

/* Impact Section */
.impact-section {
  padding: 80px 0;
  text-align: center;
  background: #f9fafb;
}

.impact-section h2 {
  font-size: 2.2rem;
  margin-bottom: 60px;
}

.impact-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 60px;
}

.stat h3 {
  font-size: 3rem;
  color: #2563eb;
  margin-bottom: 8px;
}

.stat p {
  color: #4b5563;
  font-size: 1.1rem;
}

.testimonials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  gap: 20px;
  text-align: left;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 50px;
  height: 50px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.testimonial-card p {
  font-style: italic;
  margin-bottom: 10px;
  color: #4b5563;
}

.author {
  font-size: 0.9rem;
  color: #6b7280;
}

/* FAQ Section */
.faq-section {
  padding: 80px 0;
  max-width: 800px;
  margin: 0 auto;
}

.faq-section h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 60px;
}

.faq-container {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
}

.faq-item:last-child {
  border-bottom: none;
}

.question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.question:hover {
  background: #f9fafb;
}

.question h3 {
  font-size: 1.1rem;
  font-weight: 500;
}

.toggle-icon {
  font-size: 1.5rem;
  color: #2563eb;
}

.answer {
  padding: 0 20px 20px;
  color: #4b5563;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .cta-container {
    justify-content: center;
  }
  
  .value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    margin-left: 60px;
    text-align: left;
  }
  
  .timeline-content {
    max-width: calc(100% - 80px);
  }
  
  .donation-container {
    flex-direction: column;
  }
  
  .testimonials {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .value-grid,
  .donation-options {
    grid-template-columns: 1fr;
  }
  
  .impact-stats {
    flex-direction: column;
    gap: 30px;
  }
  
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-section,
  .value-section,
  .roadmap-section,
  .donation-section,
  .impact-section,
  .faq-section {
    padding: 60px 0;
  }
}
</style>