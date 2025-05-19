<template>
  <section id="servicos" class="premium-services">
    <div class="services-container">
      <!-- Elemento decorativo de fundo -->
      <div class="services-background">
        <div class="bg-shape bg-shape-1"></div>
        <div class="bg-shape bg-shape-2"></div>
      </div>

      <div class="container">
        <!-- Cabeçalho -->
        <div class="services-header">
          <h2 class="section-title">
            <span class="title-text">Áreas de Atuação</span>
            <span class="title-highlight"></span>
          </h2>
          <p class="section-subtitle">
            Nossa expertise jurídica para proteger seus direitos
          </p>
        </div>

        <!-- Cards de Serviços -->
        <div class="services-grid">
          <div
            class="service-card"
            v-for="(service, index) in services"
            :key="index"
            @mouseenter="activeCard = index"
            @mouseleave="activeCard = null"
            :class="{ active: activeCard === index }"
          >
            <!-- Ícone e Efeito -->
            <div class="card-icon-container">
              <div class="icon-background"></div>
              <div class="service-icon">
                <img :src="service.icon" :alt="service.title" />
              </div>
              <div class="icon-effect"></div>
            </div>

            <!-- Conteúdo do Card -->
            <div class="card-content">
              <h3 class="card-title">{{ service.title }}</h3>
              <p class="card-description">{{ service.description }}</p>

              <!-- Lista de Benefícios (aparece no hover) -->
              <ul class="benefits-list">
                <li v-for="(benefit, i) in service.benefits" :key="i">
                  <span class="benefit-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  {{ benefit }}
                </li>
              </ul>

              <!-- Botão Saiba Mais -->
              <a href="#" class="learn-more">
                Saiba mais
                <span class="arrow-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <!-- Efeito de Destaque -->
            <div class="card-highlight"></div>
          </div>
        </div>

        <!-- Rodapé da Seção -->
        <div class="services-footer">
          <p class="footer-text">
            Não encontrou o que precisa? Entre em contato para uma consulta
            personalizada.
          </p>
          <a href="#contato" class="contact-button">
            Fale com um especialista
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PremiumServices",
  data() {
    return {
      activeCard: null,
      services: [
        {
          title: "Direito Civil",
          description: "Proteção jurídica para questões civis e contratuais",
          icon: "https://api.iconify.design/mdi:scale-balance.svg",
          benefits: [
            "Contratos e obrigações",
            "Responsabilidade civil",
            "Direitos do consumidor",
            "Indenizações e danos morais",
          ],
        },
        {
          title: "Direito Trabalhista",
          description:
            "Defesa dos direitos trabalhistas e relações empregatícias",
          icon: "https://api.iconify.design/mdi:briefcase.svg",
          benefits: [
            "Ações trabalhistas",
            "Rescisões contratuais",
            "Assédio moral",
            "Horas extras e benefícios",
          ],
        },
        {
          title: "Direito de Família",
          description: "Assessoria em questões familiares e sucessórias",
          icon: "https://api.iconify.design/mdi:account.svg",
          benefits: [
            "Divórcios e separações",
            "Guarda de menores",
            "Pensão alimentícia",
            "Inventários e partilhas",
          ],
        },
        {
          title: "Direito Imobiliário",
          description: "Soluções jurídicas para transações imobiliárias",
          icon: "https://api.iconify.design/mdi:home.svg",
          benefits: [
            "Compra e venda de imóveis",
            "Regularização de propriedades",
            "Contratos de locação",
            "Conflitos condominiais",
          ],
        },
        {
          title: "Direito Empresarial",
          description: "Assessoria jurídica para empresas e negócios",
          icon: "https://api.iconify.design/mdi:office-building.svg",
          benefits: [
            "Constituição de empresas",
            "Contratos societários",
            "Fusões e aquisições",
            "Recuperação judicial",
          ],
        },
        {
          title: "Direito Digital",
          description: "Proteção jurídica no ambiente digital",
          icon: "https://api.iconify.design/mdi:laptop.svg",
          benefits: [
            "Proteção de dados",
            "Contratos eletrônicos",
            "Crimes cibernéticos",
            "Propriedade intelectual digital",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
:root {
  --primary: #1a3e72;
  --primary-light: #2a4e82;
  --secondary: #d4af37;
  --secondary-light: #e4bf47;
  --dark: #0a192f;
  --light: #f8f9fa;
  --lighter: #ffffff;
  --gray: #6c757d;
  --gray-light: #e9ecef;
}

.premium-services {
  position: relative;
  padding: 120px 0;
  background: var(--light);
  overflow: hidden;
}

.services-container {
  position: relative;
  z-index: 2;
}

.services-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(26, 62, 114, 0.03);
}

.bg-shape-1 {
  width: 600px;
  height: 600px;
  top: -300px;
  right: -300px;
}

.bg-shape-2 {
  width: 400px;
  height: 400px;
  bottom: -200px;
  left: -200px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Cabeçalho */
.services-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.title-highlight {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(212, 175, 55, 0.3);
  z-index: -1;
  transform-origin: left;
  transform: scaleX(0.8);
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.section-title:hover .title-highlight {
  transform: scaleX(1);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
}

/* Grid de Serviços */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.service-card {
  position: relative;
  background: var(--lighter);
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  z-index: 1;
}

.service-card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-light) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.service-card.active {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.service-card.active:before {
  opacity: 1;
}

/* Ícone do Card */
.card-icon-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
}

.icon-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 50%;
  transform: scale(1);
  transition: transform 0.4s ease, background 0.4s ease;
}

.service-card.active .icon-background {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.service-icon {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.service-icon img {
  width: 36px;
  height: 36px;
  transition: all 0.4s ease;
}

.service-card.active .service-icon img {
  filter: brightness(0) invert(1);
  transform: scale(1.1);
}

.icon-effect {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s ease;
}

.service-card.active .icon-effect {
  opacity: 1;
  transform: scale(1);
}

/* Conteúdo do Card */
.card-content {
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 15px;
  transition: color 0.4s ease;
}

.service-card.active .card-title {
  color: var(--lighter);
}

.card-description {
  color: var(--gray);
  margin-bottom: 20px;
  transition: color 0.4s ease;
}

.service-card.active .card-description {
  color: rgba(255, 255, 255, 0.8);
}

.benefits-list {
  list-style: none;
  margin: 25px 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s ease, margin 0.4s ease;
}

.service-card.active .benefits-list {
  max-height: 200px;
  margin: 25px 0;
}

.benefits-list li {
  padding: 8px 0;
  color: var(--gray);
  display: flex;
  align-items: center;
  transition: color 0.4s ease;
}

.service-card.active .benefits-list li {
  color: var(--lighter);
}

.benefit-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: var(--secondary);
  transition: color 0.4s ease;
}

.service-card.active .benefit-icon {
  color: var(--lighter);
}

.learn-more {
  display: inline-flex;
  align-items: center;
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  margin-top: 15px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.service-card.active .learn-more {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.learn-more:hover .arrow-icon {
  transform: translateX(3px);
}

/* Destaque do Card */
.card-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--secondary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.service-card.active .card-highlight {
  transform: scaleX(1);
}

/* Rodapé da Seção */
.services-footer {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.footer-text {
  color: var(--gray);
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.contact-button {
  display: inline-block;
  background: var(--secondary);
  color: var(--dark);
  padding: 14px 30px;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

/* Responsividade */
@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .premium-services {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .services-header {
    margin-bottom: 50px;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .service-card {
    padding: 30px 20px;
  }
}
</style>
