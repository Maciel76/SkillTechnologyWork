<template>
  <section id="portfolio" class="portfolio-section">
    <!-- Efeito de partículas como background -->
    <Particles id="portfolio-particles" :options="particleOptions" />

    <div class="container">
      <!-- Cabeçalho com efeito parallax -->
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Nossas <span>Obras</span> Iconicas</h2>
        <p class="section-subtitle">
          Explore nosso portfólio de projetos que redefiniram horizontes
        </p>
      </div>

      <!-- Filtro 3D -->
      <div class="filter-controls" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="(filter, index) in filters"
          :key="index"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
          class="filter-btn"
        >
          <span class="filter-icon" :class="filter.icon"></span>
          {{ filter.label }}
        </button>
      </div>

      <!-- Grid de projetos com efeito masonry -->
      <div class="portfolio-grid">
        <transition-group name="staggered-fade">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="portfolio-item"
            @mouseenter="activateHover(index)"
            @mouseleave="deactivateHover(index)"
          >
            <div
              class="project-card"
              :class="{ hovered: hoveredIndex === index }"
            >
              <div class="card-face front">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="project-image"
                />
                <div class="project-overlay"></div>
              </div>
            </div>
            <div class="project-badge">
              {{ getCategoryLabel(project.category) }}
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Controle de carregamento -->
      <div class="load-more" v-if="showLoadMore" data-aos="fade-up">
        <button class="load-btn" @click="loadMoreProjects">
          Carregar Mais
          <div class="loading-dots" v-if="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Modal de detalhes -->
    <ProjectModal
      :is-open="modalOpen"
      :project="selectedProject"
      @close="modalOpen = false"
    />
  </section>
</template>

<script>
import { ref, computed } from "vue";
import ProjectModal from "./ProjectModal.vue";

export default {
  components: { ProjectModal },
  setup() {
    // Configuração das partículas
    const particleOptions = {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#e9b949" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#1a3a6e",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
      },
    };

    // Dados dos projetos
    const projects = ref([
      // Residencial
      {
        id: 1,
        title: "Residencial Solaris",
        category: "residencial",
        location: "São Paulo, SP",
        year: "2023",
        area: "12.000 m²",
        description:
          "Conjunto residencial de luxo com 3 torres e área de lazer completa",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1350&q=80",
        features: ["Piscina olímpica", "Academia premium", "Jardim vertical"],
        gallery: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 2,
        title: "Villas da Serra",
        category: "residencial",
        location: "Gramado, RS",
        year: "2022",
        area: "8.500 m²",
        description:
          "Condomínio de chalés em área montanhosa com vista panorâmica",
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
        features: ["Lareira central", "Spa exclusivo", "Jardins temáticos"],
        gallery: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
        ],
      },

      // Comercial
      {
        id: 3,
        title: "Edifício Alpha Offices",
        category: "comercial",
        location: "Rio de Janeiro, RJ",
        year: "2023",
        area: "15.000 m²",
        description:
          "Centro empresarial com auditório e salas de reunião modulares",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
        features: ["Auditório para 200 pessoas", "Coworking", "Café interno"],
        gallery: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 4,
        title: "Mall Plaza Center",
        category: "comercial",
        location: "Belo Horizonte, MG",
        year: "2022",
        area: "22.000 m²",
        description:
          "Shopping center com praça de alimentação temática e cinema",
        image:
          "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=1350&q=80",
        features: ["Cinema 4D", "30 lojas âncoras", "Estacionamento VIP"],
        gallery: [
          "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1350&q=80",
        ],
      },

      // Industrial
      {
        id: 5,
        title: "Fábrica de Processos Alfa",
        category: "industrial",
        location: "Campinas, SP",
        year: "2021",
        area: "30.000 m²",
        description:
          "Complexo industrial para manufatura e logística integrada",
        image:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Docas automatizadas",
          "Armazém refrigerado",
          "Centro de controle",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 6,
        title: "Polo Químico Beta",
        category: "industrial",
        location: "Duque de Caxias, RJ",
        year: "2023",
        area: "18.500 m²",
        description: "Unidade química com padrão de segurança SIL-3",
        image:
          "https://images.unsplash.com/photo-1581093057305-3ec4d6a3d2a4?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Sistema de contenção",
          "Laboratório de análise",
          "Treinamento OSHA",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1581093057305-3ec4d6a3d2a4?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1581093057305-3ec4d6a3d2a4?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1581093057305-3ec4d6a3d2a4?auto=format&fit=crop&w=1350&q=80",
        ],
      },

      // Público
      {
        id: 7,
        title: "Biblioteca Central",
        category: "publico",
        location: "Porto Seguro, BA",
        year: "2022",
        area: "5.000 m²",
        description:
          "Biblioteca municipal com salão de leitura e auditório cultural",
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
        features: ["Sala multimídia", "Acervo digital", "Programação cultural"],
        gallery: [
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 8,
        title: "Centro de Convenções Delta",
        category: "publico",
        location: "Fortaleza, CE",
        year: "2023",
        area: "14.000 m²",
        description: "Espaço para feiras, congressos e eventos corporativos",
        image:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Plenária para 1.000 pessoas",
          "Foyer climatizado",
          "Wi-Fi fibra",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1350&q=80",
        ],
      },
    ]);

    const filters = ref([
      { label: "Todos", value: "all", icon: "fas fa-layer-group" },
      { label: "Residencial", value: "residencial", icon: "fas fa-home" },
      { label: "Comercial", value: "comercial", icon: "fas fa-building" },
      { label: "Industrial", value: "industrial", icon: "fas fa-industry" },
      { label: "Público", value: "publico", icon: "fas fa-university" },
    ]);

    const activeFilter = ref("all");
    const hoveredIndex = ref(null);
    const modalOpen = ref(false);
    const selectedProject = ref(null);
    const visibleProjects = ref(6);
    const loading = ref(false);

    const filteredProjects = computed(() => {
      const filtered =
        activeFilter.value === "all"
          ? projects.value
          : projects.value.filter((p) => p.category === activeFilter.value);
      return filtered.slice(0, visibleProjects.value);
    });

    const showLoadMore = computed(() => {
      return (
        visibleProjects.value <
        (activeFilter.value === "all"
          ? projects.value.length
          : projects.value.filter((p) => p.category === activeFilter.value)
              .length)
      );
    });

    function activateHover(index) {
      hoveredIndex.value = index;
    }

    function deactivateHover() {
      hoveredIndex.value = null;
    }

    function openProject(id) {
      selectedProject.value = projects.value.find((p) => p.id === id);
      modalOpen.value = true;
    }

    async function loadMoreProjects() {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      visibleProjects.value += 3;
      loading.value = false;
    }

    function getCategoryColor(category) {
      const colors = {
        residencial: "#1a3a6e",
        comercial: "#e9b949",
        industrial: "#2c7d59",
        publico: "#9c3d54",
      };
      return colors[category] || "#1a3a6e";
    }

    function getCategoryLabel(category) {
      return filters.value.find((f) => f.value === category)?.label || category;
    }

    return {
      particleOptions,
      projects,
      filters,
      activeFilter,
      filteredProjects,
      hoveredIndex,
      modalOpen,
      selectedProject,
      visibleProjects,
      loading,
      showLoadMore,
      activateHover,
      deactivateHover,
      openProject,
      loadMoreProjects,
      getCategoryColor,
      getCategoryLabel,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.portfolio-section {
  position: relative;
  padding: 100px 0;
  background-color: #f9f9f9;
  overflow: hidden;

  #portfolio-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}

.container {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;

  .section-title {
    font-size: 3.2rem;
    font-weight: 800;
    color: $dark-color;
    margin-bottom: 20px;

    span {
      color: $primary-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba($secondary-color, 0.4);
        z-index: -1;
      }
    }
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: $gray-color;
    max-width: 700px;
    margin: 0 auto;
  }
}

.filter-controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;

  .filter-btn {
    background: white;
    border: none;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.active {
      background: $primary-color;
      color: white;

      .filter-icon {
        color: $secondary-color;
      }
    }

    .filter-icon {
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.portfolio-item {
  position: relative;
  height: 400px;
  perspective: 1000px;

  &:hover {
    .project-badge {
      transform: translateY(-10px) rotate(5deg);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
}

.project-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);

  &.hovered {
    transform: rotateY(180deg);
  }
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  &.front {
    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to top,
        rgba($dark-color, 0.7) 0%,
        transparent 50%
      );
    }
  }

  &.back {
    background: white;
    transform: rotateY(180deg);
    padding: 30px;
    display: flex;
    flex-direction: column;

    .project-title {
      font-size: 1.8rem;
      margin-bottom: 15px;
      color: $primary-color;
    }

    .project-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 20px;

      .meta-item {
        font-size: 0.9rem;
        color: $gray-color;
        display: flex;
        align-items: center;
        gap: 5px;

        i {
          color: $secondary-color;
        }
      }
    }

    .project-description {
      flex-grow: 1;
      color: $gray-color;
      line-height: 1.6;
    }

    .project-cta {
      align-self: flex-start;
      background: $primary-color;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;

      &:hover {
        background: darken($primary-color, 10%);
        transform: translateX(5px);

        i {
          transform: translateX(3px);
        }
      }

      i {
        transition: transform 0.3s ease;
      }
    }
  }
}

.project-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 20px;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.load-more {
  text-align: center;

  .load-btn {
    background: $primary-color;
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0 auto;

    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .loading-dots {
    display: flex;
    gap: 5px;

    span {
      display: block;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }
      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Efeitos de transição */
.staggered-fade-enter-active,
.staggered-fade-leave-active {
  transition: all 0.5s ease;
}

.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsividade */
@media (max-width: 992px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .portfolio-item {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .section-header .section-title {
    font-size: 2.5rem;
  }

  .filter-controls {
    gap: 10px;

    .filter-btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 576px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .section-header .section-title {
    font-size: 2rem;
  }

  .card-face.back {
    padding: 20px;

    .project-title {
      font-size: 1.5rem;
    }
  }
}
</style>
