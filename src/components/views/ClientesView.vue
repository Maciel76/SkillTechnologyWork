<template>
  <div class="feedback-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          O Que Nossos <span class="highlight">Clientes </span>dizem
        </h1>
        <p class="hero-subtitle">
          Descubra por que empresas confiam em nossas soluções digitais
        </p>
        <div class="rating-overview">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star">★</span>
          </div>
          <span class="average">4.9</span>
          <span class="count">(+128 avaliações)</span>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="stat-number" :ref="(el) => (statRefs[index] = el)">
            {{ stat.prefix }}
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Testimonials Carousel -->
    <section class="testimonials-section">
      <div class="section-header">
        <h2>Avaliações do Nossos <span class="highlight">Clientes</span></h2>
        <p>Depoimentos de clientes que já trabalharam conosco</p>
      </div>

      <div class="carousel-wrapper">
        <div
          class="testimonials-carousel"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonial-card"
            :class="{ active: currentSlide === index }"
          >
            <div class="testimonial-content">
              <div class="quote-icon">“</div>
              <div class="rating">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="star"
                  :class="{ filled: i <= testimonial.rating }"
                  >★</span
                >
              </div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-author">
                <img
                  :src="testimonial.photo"
                  :alt="testimonial.name"
                  class="author-photo"
                />
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <p>{{ testimonial.position }}, {{ testimonial.company }}</p>
                  <div
                    class="project-badge"
                    @click="showProject(testimonial.project)"
                  >
                    Ver Projeto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-nav prev" @click="prevSlide">
          <svg viewBox="0 0 24 24">
            <path
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            />
          </svg>
        </button>
        <button class="carousel-nav next" @click="nextSlide">
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>

        <div class="carousel-dots">
          <span
            v-for="(dot, index) in testimonials.length"
            :key="index"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Projects Showcase -->
    <section class="projects-section">
      <div class="section-header">
        <h2>Projetos com <span class="highlight">Avaliações </span></h2>
        <p>Conheça alguns trabalhos que receberam feedbacks excelentes</p>
      </div>

      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
        >
          <div class="project-image" @click="openProjectModal(project)">
            <img :src="project.image" :alt="project.title" />
            <div class="project-rating">
              <span
                v-for="i in 5"
                :key="i"
                class="stars"
                :class="{ filled: i <= project.rating }"
                >★</span
              >
            </div>
          </div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p class="project-short-desc">{{ project.shortDescription }}</p>
            <div class="client-info">
              <img
                :src="project.clientPhoto"
                :alt="project.clientName"
                class="client-photo"
              />
              <div>
                <p class="client-name">{{ project.clientName }}</p>
                <p class="client-position">{{ project.clientPosition }}</p>
              </div>
            </div>
            <button class="view-project-btn" @click="openProjectModal(project)">
              Ver descrição completa
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Share Experience Section -->
    <section class="share-section">
      <div class="share-content">
        <h2>Compartilhe sua <span class="highlight">Experiência</span></h2>
        <p>
          Nos conte como foi trabalhar conosco e apareça em nossa página de
          avaliações
        </p>
        <button class="share-btn" @click="openFeedbackModal">
          <svg viewBox="0 0 24 24">
            <path
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
            />
          </svg>
          Avaliar Experiência
        </button>
      </div>
    </section>

    <!-- Feedback Modal -->
    <div
      v-if="showFeedbackModal"
      class="feedback-modal"
      @click.self="closeFeedbackModal"
    >
      <div class="modal-container">
        <button class="close-modal" @click="closeFeedbackModal">
          <svg viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>

        <div class="modal-content" :class="{ submitted: formSubmitted }">
          <div class="modal-image-section" v-if="!formSubmitted">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Equipe feliz"
              class="modal-image"
            />
            <div class="image-overlay">
              <div class="overlay-content">
                <h3>Sua opinião é importante!</h3>
                <p>Ajude outras empresas a conhecerem nosso trabalho</p>
              </div>
            </div>
          </div>

          <div class="form-section" v-if="!formSubmitted">
            <h2>Avalie sua <span class="highlight">Experiência</span></h2>
            <p>Nos conte como foi trabalhar com nossa equipe</p>

            <form @submit.prevent="submitFeedback">
              <div class="form-group">
                <label>Seu nome</label>
                <input type="text" v-model="feedbackForm.name" required />
              </div>

              <div class="form-group">
                <label>Seu cargo</label>
                <input type="text" v-model="feedbackForm.position" required />
              </div>

              <div class="form-group">
                <label>Nome da empresa</label>
                <input type="text" v-model="feedbackForm.company" required />
              </div>

              <div class="form-group">
                <label>Sua avaliação (1-5 estrelas)</label>
                <div class="rating-input">
                  <span
                    v-for="i in 5"
                    :key="i"
                    class="star"
                    :class="{ selected: i <= feedbackForm.rating }"
                    @click="feedbackForm.rating = i"
                    >★</span
                  >
                </div>
              </div>

              <div class="form-group">
                <label>Seu depoimento</label>
                <textarea
                  v-model="feedbackForm.testimonial"
                  required
                ></textarea>
              </div>

              <div class="form-group photo-upload">
                <label>
                  <input
                    type="file"
                    @change="handlePhotoUpload"
                    accept="image/*"
                  />
                  <span class="upload-btn">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
                      />
                    </svg>
                    Adicionar foto
                  </span>
                  <span v-if="feedbackForm.photo" class="file-name">{{
                    feedbackForm.photo.name
                  }}</span>
                </label>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? "Enviando..." : "Enviar Avaliação" }}
              </button>
            </form>
          </div>

          <div class="success-section" v-else>
            <div class="success-animation">
              <svg class="checkmark" viewBox="0 0 52 52">
                <circle
                  class="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class="checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <h2>Avaliação enviada!</h2>
            <p>Muito obrigado por compartilhar sua experiência conosco.</p>
            <button class="close-btn" @click="closeFeedbackModal">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div
      v-if="selectedProject"
      class="project-modal"
      @click.self="closeProjectModal"
    >
      <div class="modal-container">
        <button class="close-modal" @click="closeProjectModal">
          <svg viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>

        <div class="modal-content">
          <div class="project-gallery">
            <img
              :src="selectedProject.image"
              :alt="selectedProject.title"
              class="main-image"
            />
            <div class="thumbnails">
              <img
                v-for="(img, index) in selectedProject.images"
                :key="index"
                :src="img"
                :alt="'Thumbnail ' + (index + 1)"
                @click="selectedProject.image = img"
                :class="{ active: selectedProject.image === img }"
              />
            </div>
          </div>

          <div class="project-details">
            <div class="project-header">
              <h2>{{ selectedProject.title }}</h2>
              <div class="project-rating">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="star"
                  :class="{ filled: i <= selectedProject.rating }"
                  >★</span
                >
                <span class="rating-value">{{ selectedProject.rating }}.0</span>
              </div>
            </div>

            <p class="project-description">{{ selectedProject.description }}</p>

            <div class="client-testimonial">
              <div class="testimonial-content">
                <div class="quote-icon">“</div>
                <p>{{ selectedProject.testimonial }}</p>
                <div class="client-info">
                  <img
                    :src="selectedProject.clientPhoto"
                    :alt="selectedProject.clientName"
                    class="client-photo"
                  />
                  <div>
                    <h4>{{ selectedProject.clientName }}</h4>
                    <p>
                      {{ selectedProject.clientPosition }},
                      {{ selectedProject.clientCompany }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="project-tech">
              <h3>Tecnologias utilizadas</h3>
              <div class="tech-tags">
                <span
                  v-for="(tech, index) in selectedProject.technologies"
                  :key="index"
                  >{{ tech }}</span
                >
              </div>
            </div>

            <a :href="selectedProject.link" target="_blank" class="project-link"
              >Visitar Projeto</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "FeedbackView",
  setup() {
    // Dados reativos
    const currentSlide = ref(0);
    const selectedProject = ref(null);
    const showFeedbackModal = ref(false);
    const formSubmitted = ref(false);
    const isSubmitting = ref(false);
    const statRefs = ref([]);

    // Formulário de feedback
    const feedbackForm = ref({
      name: "",
      position: "",
      company: "",
      rating: 0,
      testimonial: "",
      photo: null,
    });

    // Estatísticas
    const stats = ref([
      { value: 150, prefix: "150+", label: "Clientes Satisfeitos" },
      { value: 200, prefix: "200+", label: "Projetos Entregues" },
      { value: 98, prefix: "97%", label: "Taxa de Satisfação" },
      { value: 24, prefix: "24/7", label: "Suporte Dedicado" },
    ]);

    // Depoimentos
    const testimonials = ref([
      {
        name: "João Silva",
        position: "CEO",
        company: "Fashion Store",
        rating: 5,
        text: "A equipe foi incrível! Entregaram um e-commerce moderno e funcional que superou nossas expectativas. As vendas aumentaram 60% no primeiro trimestre!",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        project: 0,
      },
      {
        name: "Maria Souza",
        position: "Fundadora",
        company: "FastDelivery",
        rating: 5,
        text: "O aplicativo revolucionou nosso negócio. Agora temos controle total sobre as entregas e nossos clientes podem acompanhar tudo em tempo real.",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        project: 1,
      },
      {
        name: "Carlos Oliveira",
        position: "Diretor",
        company: "Global Corp",
        rating: 4,
        text: "O portal corporativo reflete perfeitamente nossa marca. A equipe captou nossa essência e transformou em um site moderno que recebe elogios constantemente.",
        photo: "https://randomuser.me/api/portraits/men/75.jpg",
        project: 2,
      },
      {
        name: "Ana Paula Santos",
        position: "Diretora",
        company: "Colégio Excelência",
        rating: 5,
        text: "A plataforma transformou completamente nossa gestão escolar. Tudo centralizado em um só lugar. Professores e pais adoraram a facilidade!",
        photo: "https://randomuser.me/api/portraits/women/65.jpg",
        project: 3,
      },
      {
        name: "Ricardo Ferreira",
        position: "Proprietário",
        company: "FitLife Academia",
        rating: 5,
        text: "O app superou nossas expectativas! Nossos alunos estão muito mais engajados. A taxa de retenção aumentou 45% desde o lançamento.",
        photo: "https://randomuser.me/api/portraits/men/46.jpg",
        project: 4,
      },
      {
        name: "Luciana Martins",
        position: "CEO",
        company: "IndustryConnect",
        rating: 5,
        text: "Revolucionamos nosso modelo de negócio com este marketplace. Conectamos centenas de fornecedores e compradores. ROI positivo já no terceiro mês!",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        project: 5,
      },
      {
        name: "Eduardo Costa",
        position: "Gerente Geral",
        company: "Hotel Paradise",
        rating: 4,
        text: "Excelente sistema! Automatizou toda nossa operação hoteleira. As reservas diretas aumentaram 60% e reduzimos custos com comissões de OTAs.",
        photo: "https://randomuser.me/api/portraits/men/52.jpg",
        project: 6,
      },
    ]);

    // Projetos
    const projects = ref([
      {
        id: 0,
        title: "E-commerce Premium",
        shortDescription: "Plataforma de vendas online completa",
        description:
          "Desenvolvimento de uma plataforma de e-commerce com integração de pagamentos, gestão de estoque em tempo real e dashboard analítico para acompanhamento de métricas.",
        image:
          "https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbWVyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        images: [
          "https://images.unsplash.com/photo-1658297063569-162817482fb6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvbWVyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=5006",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
          "https://plus.unsplash.com/premium_photo-1683758344058-60a1506db480?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        ],
        rating: 5,
        testimonial:
          "O e-commerce que desenvolvemos com a equipe superou todas nossas expectações. A plataforma é intuitiva, rápida e já nos trouxe um aumento de 60% nas vendas no primeiro trimestre.",
        clientName: "João Silva",
        clientPosition: "CEO",
        clientCompany: "Fashion Store",
        clientPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe", "AWS"],
        link: "#",
      },
      {
        id: 1,
        title: "App de Delivery",
        shortDescription: "Aplicativo para entregas em tempo real",
        description:
          "Desenvolvimento de aplicativo mobile para gestão e rastreamento de entregas com integração ao Google Maps e notificações em tempo real para clientes e entregadores.",
        image:
          "https://images.unsplash.com/photo-1587813369290-091c9d432daf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        images: [
          "https://images.unsplash.com/photo-1614976523626-d598aafd4fda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1471",
          "https://images.unsplash.com/photo-1665521032636-e8d2f6927053?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
          "https://plus.unsplash.com/premium_photo-1661907153090-93759d68acb1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaXZlcnklMjB2YW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        ],
        rating: 5,
        testimonial:
          "O aplicativo revolucionou nosso negócio. Agora temos controle total sobre as entregas e nossos clientes podem acompanhar em tempo real. A equipe foi extremamente profissional em todo o processo.",
        clientName: "Maria Souza",
        clientPosition: "Fundadora",
        clientCompany: "FastDelivery",
        clientPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        technologies: ["React Native", "Firebase", "Google Maps API", "Redux"],
        link: "#",
      },

      {
        id: 2,
        title: "Portal Corporativo",
        shortDescription: "Website institucional moderno",
        description:
          "Desenvolvimento de portal corporativo com gestão de conteúdo, blog integrado e área restrita para clientes com documentos e relatórios personalizados.",
        image:
          "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?w=1060",
        images: [
          "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?w=1060",
          "https://img.freepik.com/free-photo/business-people-analyzing-statistics-financial-concept_53876-14081.jpg?w=996",
          "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041859.jpg?w=996",
        ],
        rating: 4,
        testimonial:
          "O portal reflete perfeitamente nossa marca e valores. A equipe captou nossa essência e transformou em um site moderno e funcional que recebe elogios constantemente.",
        clientName: "Carlos Oliveira",
        clientPosition: "Diretor",
        clientCompany: "Global Corp",
        clientPhoto: "https://randomuser.me/api/portraits/men/75.jpg",
        technologies: ["Nuxt.js", "WordPress API", "Tailwind CSS", "GraphQL"],
        link: "#",
      },
      {
        id: 3,
        title: "Sistema de Gestão Escolar",
        shortDescription: "Plataforma completa para escolas e alunos",
        description:
          "Sistema web completo para gestão escolar com painel administrativo, portal do aluno, controle de notas, presença, calendário acadêmico e comunicação entre professores e responsáveis.",
        image:
          "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472",
        images: [
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1532",
          "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072",
          "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1476",
        ],
        rating: 5,
        testimonial:
          "A plataforma transformou completamente nossa gestão escolar. Agora temos tudo centralizado: notas, frequência, comunicação com pais. Os professores e pais adoraram!",
        clientName: "Ana Paula Santos",
        clientPosition: "Diretora",
        clientCompany: "Colégio Excelência",
        clientPhoto: "https://randomuser.me/api/portraits/women/65.jpg",
        technologies: ["Laravel", "Vue.js", "MySQL", "Socket.io", "AWS S3"],
        link: "#",
      },
      {
        id: 4,
        title: "App de Fitness & Treinos",
        shortDescription: "Aplicativo mobile para academias",
        description:
          "Aplicativo mobile com planos de treino personalizados, acompanhamento de evolução, integração com wearables, nutrição e gamificação para engajamento dos usuários.",
        image:
          "https://plus.unsplash.com/premium_photo-1674059549221-e2943b475f62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
        images: [
          "https://images.unsplash.com/photo-1627483298606-cf54c61779a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTF8fGZpdG5lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpdG5lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zml0bmVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
          "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        ],
        rating: 5,
        testimonial:
          "O app superou nossas expectativas! Nossos alunos estão muito mais engajados. A taxa de retenção aumentou 45% desde o lançamento. Interface linda e funcional!",
        clientName: "Ricardo Ferreira",
        clientPosition: "Proprietário",
        clientCompany: "FitLife Academia",
        clientPhoto: "https://randomuser.me/api/portraits/men/46.jpg",
        technologies: [
          "Flutter",
          "Node.js",
          "PostgreSQL",
          "HealthKit",
          "Firebase",
        ],
        link: "#",
      },
      {
        id: 5,
        title: "Marketplace B2B",
        shortDescription: "Plataforma de vendas entre empresas",
        description:
          "Marketplace B2B completo conectando fornecedores e compradores com sistema de cotações, negociação, pagamentos seguros, logística integrada e dashboard analítico.",
        image:
          "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
        images: [
          "https://plus.unsplash.com/premium_photo-1661544641499-e12fd5efeea4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
          "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
          "https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        rating: 5,
        testimonial:
          "Revolucionamos nosso modelo de negócio com este marketplace. Conectamos centenas de fornecedores e compradores. O ROI foi positivo já no terceiro mês!",
        clientName: "Luciana Martins",
        clientPosition: "CEO",
        clientCompany: "IndustryConnect",
        clientPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
        technologies: [
          "Vue.js",
          "Vuex",
          "Node.js",
          "MongoDB",
          "Docker",
          "Stripe",
        ],
        link: "#",
      },
      {
        id: 6,
        title: "Sistema de Reservas para Hotéis",
        shortDescription: "Plataforma de gestão hoteleira",
        description:
          "Desenvolvimento de sistema completo para gestão hoteleira com reservas online, controle de quartos, check-in/check-out, faturamento e integração com OTAs. ",
        image:
          //imagem principal
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        images: [
          //imagem1
          "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
          //imagem2
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
          //imagem3
          "https://plus.unsplash.com/premium_photo-1678297269980-16f4be3a15a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        rating: 4,
        testimonial:
          "Excelente sistema! Automatizou toda nossa operação. As reservas diretas aumentaram 60% e reduzimos custos com comissões de OTAs. Suporte impecável!",
        clientName: "Eduardo Costa",
        clientPosition: "Gerente Geral",
        clientCompany: "Hotel Paradise",
        clientPhoto: "https://randomuser.me/api/portraits/men/52.jpg",
        technologies: ["Vue.js", "Node.js+Express", "MongoDB", "AWS", "Docker"],
        link: "#",
      },
    ]);

    // Métodos
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % testimonials.value.length;
    };

    const prevSlide = () => {
      currentSlide.value =
        (currentSlide.value - 1 + testimonials.value.length) %
        testimonials.value.length;
    };

    const goToSlide = (index) => {
      currentSlide.value = index;
    };

    const openProjectModal = (project) => {
      selectedProject.value = project;
      document.body.style.overflow = "hidden";
    };

    const closeProjectModal = () => {
      selectedProject.value = null;
      document.body.style.overflow = "auto";
    };

    const openFeedbackModal = () => {
      showFeedbackModal.value = true;
      document.body.style.overflow = "hidden";
    };

    const closeFeedbackModal = () => {
      showFeedbackModal.value = false;
      formSubmitted.value = false;
      document.body.style.overflow = "auto";
    };

    const handlePhotoUpload = (event) => {
      feedbackForm.value.photo = event.target.files[0];
    };

    const submitFeedback = async () => {
      try {
        isSubmitting.value = true;

        // Prepara os dados para envio
        const avaliacaoData = {
          nome: feedbackForm.value.name,
          empresa: feedbackForm.value.company,
          avaliacao: feedbackForm.value.testimonial,
        };

        // Envia para o backend
        const response = await fetch('http://localhost:3000/api/avaliacoes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(avaliacaoData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao enviar avaliação');
        }

        // Adiciona o novo depoimento à lista local (apenas para visualização imediata)
        testimonials.value.unshift({
          name: feedbackForm.value.name,
          position: feedbackForm.value.position,
          company: feedbackForm.value.company,
          rating: feedbackForm.value.rating,
          text: feedbackForm.value.testimonial,
          photo: feedbackForm.value.photo
            ? URL.createObjectURL(feedbackForm.value.photo)
            : "https://randomuser.me/api/portraits/lego/1.jpg",
          project: null,
        });

        // Reseta o formulário
        feedbackForm.value = {
          name: "",
          position: "",
          company: "",
          rating: 0,
          testimonial: "",
          photo: null,
        };

        isSubmitting.value = false;
        formSubmitted.value = true;
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        alert('Erro ao enviar avaliação. Por favor, tente novamente.');
        isSubmitting.value = false;
      }
    };

    const showProject = (projectIndex) => {
      openProjectModal(projects.value[projectIndex]);
    };

    // Animações
    const animateStats = () => {
      stats.value.forEach((stat, index) => {
        const element = statRefs.value[index];
        if (!element) return;

        const target = stat.value;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            element.textContent =
              Math.floor(current) +
              (index === 2 ? "%" : index === 3 ? "/7" : "+");
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = stat.prefix;
          }
        };

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              updateCounter();
              observer.disconnect();
            }
          },
          { threshold: 0.5 }
        );

        observer.observe(element);
      });
    };

    // Ciclo de vida
    onMounted(() => {
      // Auto-rotate carousel
      setInterval(nextSlide, 5000);

      // Animar estatísticas quando visíveis
      animateStats();
    });

    return {
      currentSlide,
      selectedProject,
      showFeedbackModal,
      formSubmitted,
      isSubmitting,
      feedbackForm,
      stats,
      testimonials,
      projects,
      statRefs,
      nextSlide,
      prevSlide,
      goToSlide,
      openProjectModal,
      closeProjectModal,
      openFeedbackModal,
      closeFeedbackModal,
      handlePhotoUpload,
      submitFeedback,
      showProject,
    };
  },
};
</script>

<style scoped>
/* Variáveis CSS */
:root {
  --primary: #2563eb;
  --primary-light: #3b82f6;
  --primary-dark: #1d4ed8;
  --secondary: #f59e0b;
  --dark: #4d4e4e;
  --light: #f8fafc;
  --gray: #64748b;
  --light-gray: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.1);
  --radius: 8px;
  --radius-lg: 12px;
}

/* Reset e estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  color: var(--dark);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

/* Layout */
.feedback-view {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.section-header p {
  color: var(--gray);
  font-size: 1.1rem;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  padding: 6rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  opacity: 0.2;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.rating-overview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.stars {
  display: flex;
  color: rgb(236, 199, 130);
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.average {
  font-size: 1.5rem;
  font-weight: 700;
}

.count {
  opacity: 0.8;
  font-size: 0.9rem;
}
.highlight {
  color: #0052ff;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(151, 11, 128, 0.2);
  z-index: 0;
  border-radius: 4px;
  transform: skewX(-15deg);
}

/* Stats Section */
.stats-section {
  padding: 4rem 0;
  background-color: var(--light);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s forwards;
}

.stat-card:nth-child(1) {
  animation-delay: 0.1s;
}
.stat-card:nth-child(2) {
  animation-delay: 0.2s;
}
.stat-card:nth-child(3) {
  animation-delay: 0.3s;
}
.stat-card:nth-child(4) {
  animation-delay: 0.4s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--gray);
  font-size: 1rem;
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 0;
  background-color: white;
}

.carousel-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonials-carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  flex: 0 0 100%;
  padding: 0 1rem;
}

.testimonial-content {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2.5rem;
  position: relative;
  height: 100%;
}

.quote-icon {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  font-size: 3rem;
  color: var(--primary-light);
  opacity: 0.2;
  line-height: 1;
}

.rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
}

.star {
  color: orange;
  font-size: 1.25rem;
}

.star.filled {
  color: orange;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--dark);
  margin-bottom: 2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h4 {
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.author-info p {
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 0.5rem;
}

.project-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.project-badge:hover {
  background-color: var(--primary-dark);
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-nav:hover {
  background: var(--primary);
  color: white;
}

.carousel-nav svg {
  width: 20px;
  height: 20px;
}

.carousel-nav.prev {
  left: 0;
}

.carousel-nav.next {
  right: 0;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.carousel-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--light-gray);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dots span.active {
  background-color: var(--primary);
  transform: scale(1.2);
}

/* Projects Section */
.projects-section {
  padding: 5rem 0;
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
}

.projects-section > h2,
.projects-section > p {
  text-align: center; /* Centraliza textos de título e descrição */
  max-width: 800px; /* Opcional: define largura máxima para melhor leitura */
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem; /* Adiciona um pequeno padding nas laterais */
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.project-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.project-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  cursor: pointer;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-image:hover img {
  transform: scale(1.05);
}

.project-rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: flex;
  gap: 0.125rem;
  box-shadow: var(--shadow-sm);
}

.project-rating .stars {
  color: #ddd;
  font-size: 0.875rem;
}

.project-rating .stars.filled {
  color: orange;
}

.project-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.project-info h3 {
  font-size: 1.25rem;
  color: var(--dark);
  margin: 0;
}

.project-short-desc {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--light-gray);
}

.client-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.client-name {
  font-weight: 600;
  color: var(--dark);
  margin: 0;
  font-size: 0.9rem;
}

.client-position {
  font-size: 0.8rem;
  color: var(--gray);
  margin: 0;
}

.view-project-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.view-project-btn:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.view-project-btn svg {
  transition: transform 0.3s ease;
}

.view-project-btn:hover svg {
  transform: translateX(3px);
}

/* Share Section */
.share-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));

  text-align: center;
}

.share-content {
  max-width: 600px;
  margin: 0 auto;
}

.share-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.share-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
}

.share-btn svg {
  width: 20px;
  height: 20px;
}

/* Modais */
.feedback-modal,
.project-modal {
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
  padding: 1rem;
}

.modal-container {
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: var(--radius-lg);
  position: relative;
  animation: modalFadeIn 0.3s ease;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-gray);
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: var(--primary);
  color: white;
}

.close-modal svg {
  width: 20px;
  height: 20px;
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0;
}

.modal-content.submitted {
  grid-template-columns: 1fr;
  padding: 2.5rem;
}

.modal-image-section {
  position: relative;
  min-height: 500px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(29, 78, 216, 0.85));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.overlay-content p {
  font-size: 1.1rem;
  opacity: 0.95;
}

.form-section {
  padding: 2.5rem;
  overflow-y: auto;
  max-height: 90vh;
}

/* Feedback Modal */
.form-section h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.form-section p {
  color: var(--gray);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--dark);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  background-color: #cfcfcf;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: red;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.rating-input {
  display: flex;
  gap: 0.5rem;
}

.rating-input .star {
  font-size: 1.75rem;
  color: rgb(43, 43, 44);
  cursor: pointer;
  transition: all 0.2s ease;
}

.rating-input .star.selected {
  color: orange;
  transform: scale(1.1);
}

.photo-upload input[type="file"] {
  display: none;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--light);
  border: 1px dashed var(--light-gray);
  border-radius: var(--radius);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--primary);
}

.upload-btn svg {
  width: 18px;
  height: 18px;
}

.file-name {
  font-size: 0.8rem;
  color: var(--gray);
  margin-left: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #1d4ed8;
}

.submit-btn:disabled {
  background: var(--light-gray);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Success Section */
.success-section {
  text-align: center;
  padding: 2rem 0;
}

.success-animation {
  margin-bottom: 2rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  animation: scaleIn 0.5s ease;
}

.checkmark-circle {
  stroke: var(--primary);
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke: var(--primary);
  stroke-width: 2;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
}

.success-section h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.success-section p {
  color: var(--gray);
  margin-bottom: 2rem;
}

.close-btn {
  padding: 0.5rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--primary-dark);
}

/* Project Modal */
.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.project-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius);
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnails img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.thumbnails img:hover,
.thumbnails img.active {
  opacity: 1;
  transform: scale(1.05);
}

.project-details {
  display: flex;
  flex-direction: column;
}

.project-header {
  margin-bottom: 1.5rem;
}

.project-header h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.project-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-rating .star {
  font-size: 1.25rem;
  color: var(--light-gray);
}

.project-rating .star.filled {
  color: var(--secondary);
}

.rating-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--gray);
}

.project-description {
  color: var(--gray);
  margin-bottom: 1.5rem;
}

.client-testimonial {
  background: var(--light);
  padding: 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
}

.client-testimonial .quote-icon {
  position: static;
  font-size: 2rem;
  color: var(--primary);
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.client-testimonial p {
  font-style: italic;
  color: var(--dark);
  margin-bottom: 1rem;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.client-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.client-info h4 {
  font-size: 0.9rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.client-info p {
  font-size: 0.8rem;
  color: var(--gray);
}

.project-tech {
  margin-bottom: 1.5rem;
}

.project-tech h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--dark);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tags span {
  padding: 0.25rem 0.75rem;
  background: var(--light);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: rgb(17, 88, 155);
  color: rgb(243, 243, 243);
  border-radius: var(--radius);
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.project-link:hover {
  background-color: rgb(59, 130, 196);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Animações */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .modal-content {
    grid-template-columns: 1fr !important;
  }

  .modal-image-section {
    min-height: 250px;
  }

  .overlay-content h3 {
    font-size: 1.25rem;
  }

  .overlay-content p {
    font-size: 0.95rem;
  }

  .form-section {
    max-height: none;
  }

  .project-gallery {
    margin-bottom: 2rem;
  }

  .testimonial-content {
    padding: 1.5rem;
  }
}

@media (max-width: 576px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: 1.5rem;
  }
}
</style>
