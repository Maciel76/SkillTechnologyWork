<template>
  <section id="publicacoes" class="premium-publications">
    <div class="container">
      <!-- Cabeçalho -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-text">Publicações Jurídicas</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-subtitle">
          Artigos, análises e atualizações sobre o mundo jurídico
        </p>
      </div>

      <!-- Grid de Publicações -->
      <div class="publications-grid">
        <div
          class="publication-card"
          v-for="(pub, index) in publications"
          :key="index"
          @click="openModal(pub)"
        >
          <!-- Imagem com Overlay -->
          <div class="pub-image-container">
            <div class="pub-image">
              <img :src="pub.image" :alt="pub.title" />
            </div>
            <div class="image-overlay">
              <span class="view-text">Ver publicação completa</span>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="pub-content">
            <div class="pub-meta">
              <span class="pub-date">{{ pub.date }}</span>
              <span
                class="pub-category"
                :style="{ backgroundColor: pub.categoryColor }"
              >
                {{ pub.category }}
              </span>
            </div>
            <h3 class="pub-title">{{ pub.title }}</h3>
            <p class="pub-excerpt">{{ pub.excerpt }}</p>
            <div class="pub-footer">
              <button class="read-more">
                Ler mais
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
              </button>
              <div class="pub-stats">
                <span class="stat-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12 8V12L15 15"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  {{ pub.readTime }}
                </span>
                <span class="stat-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 12L16 8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 12V6"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ pub.views }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botão Ver Todas -->
      <div class="view-all">
        <button class="view-all-button">
          Ver todas as publicações
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div
      class="publication-modal"
      v-if="selectedPublication"
      @click.self="closeModal"
    >
      <div class="modal-container">
        <button class="close-modal" @click="closeModal">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-meta">
              <span class="modal-date">{{ selectedPublication.date }}</span>
              <span
                class="modal-category"
                :style="{ backgroundColor: selectedPublication.categoryColor }"
              >
                {{ selectedPublication.category }}
              </span>
            </div>
            <h2 class="modal-title">{{ selectedPublication.title }}</h2>
            <div class="modal-stats">
              <span>Tempo de leitura: {{ selectedPublication.readTime }}</span>
              <span>Visualizações: {{ selectedPublication.views }}</span>
            </div>
          </div>

          <div class="modal-image">
            <img
              :src="selectedPublication.image"
              :alt="selectedPublication.title"
            />
          </div>

          <div class="modal-body">
            <div class="modal-author">
              <div class="author-avatar">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Autor"
                />
              </div>
              <div class="author-info">
                <span class="author-name">Dra. Ana Silva</span>
                <span class="author-title">Sócia Fundadora</span>
              </div>
            </div>

            <div class="modal-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                porttitor.
              </p>

              <p>
                Ut in nulla enim. Phasellus molestie magna non est bibendum non
                venenatis nisl tempor. Suspendisse dictum feugiat nisl ut
                dapibus. Mauris iaculis porttitor posuere.
              </p>

              <h3>Subtítulo da Publicação</h3>

              <p>
                Praesent id metus massa, ut blandit odio. Proin quis tortor
                orci. Etiam at risus et justo dignissim congue. Donec congue
                lacinia dui, a porttitor lectus condimentum laoreet.
              </p>

              <ul>
                <li>Item de lista importante</li>
                <li>Outro ponto relevante</li>
                <li>Considerações finais</li>
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            <div class="social-share">
              <span>Compartilhar:</span>
              <a href="#" class="social-icon">
                <img
                  src="https://api.iconify.design/logos:facebook.svg"
                  alt="Facebook"
                />
              </a>
              <a href="#" class="social-icon">
                <img
                  src="https://api.iconify.design/logos:linkedin-icon.svg"
                  alt="LinkedIn"
                />
              </a>
              <a href="#" class="social-icon">
                <img
                  src="https://api.iconify.design/logos:twitter.svg"
                  alt="Twitter"
                />
              </a>
            </div>

            <button class="download-button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15V3M12 15L8 11M12 15L16 11M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Baixar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PremiumPublications",
  data() {
    return {
      selectedPublication: null,
      publications: [
        {
          title: "Mudanças na Legislação Trabalhista em 2023",
          excerpt:
            "Análise detalhada das novas leis trabalhistas e seus impactos nas relações empregatícias",
          date: "15 MAI 2023",
          category: "Trabalhista",
          categoryColor: "#FF6B6B",
          readTime: "5 min",
          views: "1.2K",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          content: "Conteúdo completo da publicação...",
        },
        {
          title: "Os Desafios do Direito Digital no Brasil",
          excerpt:
            "Como a legislação brasileira está evoluindo para acompanhar os desafios da era digital",
          date: "02 MAI 2023",
          category: "Digital",
          categoryColor: "#4ECDC4",
          readTime: "7 min",
          views: "2.4K",
          image:
            "https://images.unsplash.com/photo-1649877508777-1554357604eb?q=80&w=2080&auto=format&fit=crop",
          content: "Conteúdo completo da publicação...",
        },
        {
          title: "Planejamento Sucessório: Proteja seu Patrimônio",
          excerpt:
            "Estratégias eficientes para garantir a proteção do seu patrimônio para as futuras gerações",
          date: "25 ABR 2023",
          category: "Família",
          categoryColor: "#FFBE0B",
          readTime: "8 min",
          views: "1.8K",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          content: "Conteúdo completo da publicação...",
        },
        {
          title: "Novas Tendências no Direito Contratual",
          excerpt:
            "Análise das recentes mudanças na interpretação dos contratos pelo STJ",
          date: "10 ABR 2023",
          category: "Civil",
          categoryColor: "#A78BFA",
          readTime: "6 min",
          views: "1.5K",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          content: "Conteúdo completo da publicação...",
        },
      ],
    };
  },
  methods: {
    openModal(pub) {
      this.selectedPublication = pub;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.selectedPublication = null;
      document.body.style.overflow = "auto";
    },
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

.premium-publications {
  position: relative;
  padding: 100px 0;
  background: var(--light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Cabeçalho */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.title-underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(212, 175, 55, 0.3);
  z-index: -1;
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.section-title:hover .title-underline {
  transform: scaleX(0.9);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
}

/* Grid de Publicações */
.publications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.publication-card {
  background: var(--lighter);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
}

.publication-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* Container da Imagem */
.pub-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.pub-image {
  width: 100%;
  height: 100%;
}

.pub-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.publication-card:hover .pub-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 62, 114, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.publication-card:hover .image-overlay {
  opacity: 1;
}

.view-text {
  color: var(--lighter);
  font-weight: 500;
  font-size: 1.1rem;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.publication-card:hover .view-text {
  transform: translateY(0);
}

/* Conteúdo do Card */
.pub-content {
  padding: 25px;
}

.pub-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.pub-date {
  font-size: 0.8rem;
  color: var(--gray);
}

.pub-category {
  font-size: 0.75rem;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.pub-title {
  font-size: 1.3rem;
  color: var(--dark);
  margin-bottom: 15px;
  line-height: 1.4;
}

.pub-excerpt {
  color: var(--gray);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.pub-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read-more {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--primary);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
}

.read-more svg {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.read-more:hover svg {
  transform: translateX(3px);
}

.pub-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--gray);
}

.stat-item svg {
  width: 14px;
  height: 14px;
  margin-right: 5px;
}

/* Botão Ver Todas */
.view-all {
  text-align: center;
}

.view-all-button {
  display: inline-flex;
  align-items: center;
  background: var(--primary);
  color: var(--lighter);
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-button:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
}

.view-all-button svg {
  width: 16px;
  height: 16px;
  margin-left: 10px;
}

/* Modal de Detalhes */
.publication-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow-y: auto;
}

.modal-container {
  position: relative;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  background: var(--lighter);
  border-radius: 12px;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: rgba(0, 0, 0, 0.2);
}

.close-modal svg {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 40px;
}

.modal-header {
  margin-bottom: 30px;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.modal-date {
  font-size: 0.9rem;
  color: var(--gray);
}

.modal-category {
  font-size: 0.8rem;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.modal-title {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 15px;
  line-height: 1.3;
}

.modal-stats {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: var(--gray);
}

.modal-image {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
}

.modal-author {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 3px solid var(--secondary);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  text-align: center;
}

.author-name {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.author-title {
  display: block;
  font-size: 0.9rem;
  color: var(--gray);
}

.modal-text {
  line-height: 1.8;
  color: var(--dark);
}

.modal-text p {
  margin-bottom: 20px;
}

.modal-text h3 {
  font-size: 1.5rem;
  margin: 30px 0 15px;
  color: var(--primary);
}

.modal-text ul {
  margin: 20px 0;
  padding-left: 20px;
}

.modal-text li {
  margin-bottom: 10px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);
}

.social-share {
  display: flex;
  align-items: center;
  gap: 15px;
}

.social-share span {
  font-size: 0.9rem;
  color: var(--gray);
}

.social-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-light);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-icon img {
  width: 16px;
  height: 16px;
}

.download-button {
  display: flex;
  align-items: center;
  background: var(--primary);
  color: var(--lighter);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-button:hover {
  background: var(--primary-light);
}

.download-button svg {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* Responsividade */
@media (max-width: 992px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .modal-author {
    flex-direction: row;
    margin-bottom: 30px;
  }

  .author-info {
    text-align: left;
    margin-left: 20px;
  }
}

@media (max-width: 768px) {
  .premium-publications {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .publications-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .modal-content {
    padding: 30px 20px;
  }

  .modal-title {
    font-size: 1.6rem;
  }

  .modal-image {
    height: 250px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .pub-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .modal-footer {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .social-share {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
