<template>
  <section id="equipe" class="team-section">
    <div class="container">
      <!-- Cabeçalho -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-text">Nossa Equipe de Especialistas</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-subtitle">
          Profissionais altamente qualificados para atender suas necessidades
          jurídicas
        </p>
      </div>

      <!-- Filtros de Área -->
      <div class="team-filters">
        <button
          v-for="(filter, index) in filters"
          :key="index"
          @click="activeFilter = filter.value"
          :class="{ active: activeFilter === filter.value }"
          class="filter-button"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Grid de Membros -->
      <div class="team-grid">
        <div
          class="team-member"
          v-for="(member, index) in filteredTeam"
          :key="index"
          @mouseenter="activeMember = index"
          @mouseleave="activeMember = null"
        >
          <!-- Card do Membro -->
          <div class="member-card" :class="{ active: activeMember === index }">
            <!-- Foto e Overlay -->
            <div class="member-photo">
              <img :src="member.photo" :alt="member.name" />
              <div class="photo-overlay">
                <div class="overlay-content">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-position">{{ member.position }}</p>
                </div>
              </div>
            </div>

            <!-- Informações -->
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-expertise">{{ member.expertise }}</p>

              <!-- Redes Sociais -->
              <div class="member-social">
                <a
                  v-for="(social, socialIndex) in member.social"
                  :key="socialIndex"
                  :href="social.link"
                  target="_blank"
                  class="social-icon"
                >
                  <img :src="social.icon" :alt="social.name" />
                </a>
              </div>

              <!-- Botão de Contato -->
              <a href="#contato" class="contact-button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C14.03 20.92 9.08 15.97 9.08 11V9C9.08 8.45 9.53 8 10.08 8H13.08C13.63 8 14.08 8.45 14.08 9V11C14.08 14.31 16.77 17 20.08 17H21C21.55 17 22 17.45 22 18V18.01Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.03 12C20.03 7.05 15.97 3 11 3H8C7.45 3 7 3.45 7 4V7C7 11.97 11.03 16 16 16H19C19.55 16 20 15.55 20 15V12.01Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="Contatar">Contatar</span>
              </a>
            </div>

            <!-- Destaque -->
            <div class="member-highlight"></div>
          </div>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="team-footer">
        <p class="footer-text">
          Nossa equipe está pronta para ajudá-lo com seu caso jurídico.
        </p>
        <a href="#contato" class="cta-button">Agende uma consulta</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TeamSection",
  data() {
    return {
      activeFilter: "all",
      activeMember: null,
      filters: [
        { label: "Todos", value: "all" },
        { label: "Direito Civil", value: "civil" },
        { label: "Direito Trabalhista", value: "trabalhista" },
        { label: "Direito de Família", value: "familia" },
        { label: "Direito Empresarial", value: "empresarial" },
      ],
      teamMembers: [
        {
          name: "Dr. Fernando Silva",
          position: "Sócio Fundador",
          expertise: "Direito Civil e Empresarial",
          area: "civil",
          photo:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
        {
          name: "Dra. Ana Paula Mendes",
          position: "Sócia",
          expertise: "Direito de Família e Sucessões",
          area: "familia",
          photo:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
        {
          name: "Dr. Ricardo Almeida",
          position: "Advogado Sênior",
          expertise: "Direito Trabalhista e Previdenciário",
          area: "trabalhista",
          photo:
            "https://images.unsplash.com/photo-1662104935762-707db0439ecd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
        {
          name: "Dra. Camila Oliveira",
          position: "Advogada Sênior",
          expertise: "Direito Empresarial e Contratual",
          area: "empresarial",
          photo:
            "https://images.unsplash.com/photo-1662104935883-e9dd0619eaba?q=80&w=2070&auto=format&fit=crop",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
        {
          name: "Dr. Marcelo Costa",
          position: "Advogado Associado",
          expertise: "Direito Civil e Consumerista",
          area: "civil",
          photo:
            "https://images.unsplash.com/photo-1662104935741-3feec65ddf3f?q=80&w=2070&auto=format&fit=crop",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
        {
          name: "Dra. Juliana Santos",
          position: "Advogada Associada",
          expertise: "Direito Digital e Propriedade Intelectual",
          area: "empresarial",
          photo:
            "https://images.unsplash.com/photo-1734033923455-be938a040807?w=500&auto=format&fit=crop",
          social: [
            {
              name: "LinkedIn",
              icon: "https://api.iconify.design/logos:linkedin-icon.svg",
              link: "#",
            },
            {
              name: "Lattes",
              icon: "https://api.iconify.design/skill-icons:instagram.svg",
              link: "#",
            },
          ],
        },
      ],
    };
  },
  computed: {
    filteredTeam() {
      if (this.activeFilter === "all") return this.teamMembers;
      return this.teamMembers.filter(
        (member) => member.area === this.activeFilter
      );
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

.team-section {
  padding: 100px 0;
  background: var(--lighter);
  position: relative;
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
  font-size: 2.5rem;
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

/* Filtros */
.team-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.filter-button {
  background: var(--gray-light);
  color: var(--dark);
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover {
  background: var(--secondary-light);
}

.filter-button.active {
  background: var(--secondary);
  color: var(--dark);
  font-weight: 500;
}

/* Grid de Equipe */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.team-member {
  position: relative;
  perspective: 1000px;
}

.member-card {
  background: var(--lighter);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
}

.team-member:hover .member-card {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* Foto do Membro */
.member-photo {
  position: relative;
  height: 450px;
  width: 350px; /* Defina a largura desejada, ex: 300px ou 100% */
  overflow: hidden;
  border-radius: 12px; /* opcional: para cantos arredondados */
  background: #eee; /* opcional: cor de fundo padrão */
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.team-member:hover .member-photo img {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(26, 62, 114, 0.9) 0%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 30px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.team-member:hover .photo-overlay {
  opacity: 1;
}

.overlay-content {
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.team-member:hover .overlay-content {
  transform: translateY(0);
}

/* Informações do Membro */
.member-info {
  padding: 25px;
  position: relative;
  z-index: 2;
}

.member-name {
  font-size: 1.3rem;
  color: var(--dark);
  margin-bottom: 5px;
}

.member-position {
  color: var(--secondary);
  font-weight: 500;
  margin-bottom: 10px;
}

.member-expertise {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Redes Sociais */
.member-social {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
  background: var(--secondary);
  transform: translateY(-3px);
}

.social-icon img {
  width: 16px;
  height: 16px;
}

/* Botão de Contato */
.contact-button {
  display: inline-flex;
  align-items: center;
  background: var(--primary);
  color: var(--lighter);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-button:hover {
  background: var(--primary-light);
}

.contact-button svg {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* Destaque */
.member-highlight {
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

.team-member:hover .member-highlight {
  transform: scaleX(1);
}

/* Rodapé */
.team-footer {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid var(--gray-light);
}

.footer-text {
  color: var(--gray);
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.cta-button {
  display: inline-block;
  background: var(--secondary);
  color: var(--dark);
  padding: 12px 30px;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}
.Contatar {
  color: #d4af37;
}

/* Responsividade */
@media (max-width: 992px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .section-title {
    font-size: 2.2rem;
  }

  .member-photo {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .team-section {
    padding: 80px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .team-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }

  .filter-button {
    flex-shrink: 0;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .member-info {
    padding: 20px;
  }
}
</style>
