<template>
  <div class="portfolio-management">
    <div class="section-header">
      <h2>Gerenciamento de Portfólio</h2>
      <div class="header-actions">
        <button
          class="btn-save-all"
          @click="saveAllToDatabase"
          :disabled="isSaving"
        >
          <i
            class="fas"
            :class="isSaving ? 'fa-spinner fa-spin' : 'fa-save'"
          ></i>
          {{ isSaving ? "Salvando..." : "Salvar Todos no Banco" }}
        </button>
        <button class="btn-primary" @click="openCreateForm">
          <i class="fas fa-plus"></i> Novo Projeto
        </button>
      </div>
    </div>

    <!-- Modal de Criação/Edição -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>
            {{ editingProject ? "Editar Projeto" : "Criar Novo Projeto" }}
          </h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form @submit.prevent="saveProject" class="modal-form">
          <div class="form-group">
            <label for="title">Título:</label>
            <input
              id="title"
              v-model="currentProject.title"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Categoria:</label>
            <select id="category" v-model="currentProject.category" required>
              <option value="Website">Website</option>
              <option value="Mobile App">Aplicativo</option>
              <option value="Web App">Web App</option>
              <option value="Design">Design</option>
              <option value="Branding">Branding</option>
            </select>
          </div>
          <div class="form-group">
            <label for="image">URL da Imagem:</label>
            <input
              id="image"
              v-model="currentProject.image"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea
              id="description"
              v-model="currentProject.description"
              rows="4"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="isSaving">
              <i
                class="fas"
                :class="isSaving ? 'fa-spinner fa-spin' : 'fa-save'"
              ></i>
              {{ isSaving ? "Salvando..." : "Salvar" }}
            </button>
            <button type="button" class="btn-secondary" @click="closeModal">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Mensagens de Sucesso/Erro -->
    <div v-if="successMessage" class="alert alert-success">
      <i class="fas fa-check-circle"></i>
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-error">
      <i class="fas fa-exclamation-circle"></i>
      {{ errorMessage }}
    </div>

    <div class="portfolio-filters">
      <button @click="setFilter('')" :class="{ active: activeFilter === '' }">
        Todos
      </button>
      <button
        @click="setFilter('Website')"
        :class="{ active: activeFilter === 'Website' }"
      >
        Websites
      </button>
      <button
        @click="setFilter('Mobile App')"
        :class="{ active: activeFilter === 'Mobile App' }"
      >
        Aplicativos
      </button>
      <button
        @click="setFilter('Design')"
        :class="{ active: activeFilter === 'Design' }"
      >
        Design
      </button>
      <button
        @click="setFilter('Branding')"
        :class="{ active: activeFilter === 'Branding' }"
      >
        Branding
      </button>
    </div>

    <div class="portfolio-grid">
      <div
        class="portfolio-item"
        v-for="item in filteredProjects"
        :key="item.id"
      >
        <!-- <div class="portfolio-header">
          <div class="portfolio-category-badge">
            <i class="fas fa-project-diagram"></i>
            {{ item.category }}
          </div>
          <div class="portfolio-actions-menu">
            <div class="favorite-btn" @click="toggleFavorite(item)">
              <i class="fas" :class="item.featured ? 'fa-star' : 'fa-star'"></i>
            </div>
          </div>
        </div> -->

        <div class="portfolio-image">
          <img :src="item.image" :alt="item.title" />
          <div class="portfolio-overlay">
            <button class="btn-details" @click="viewDetails(item)">
              <i class="fas fa-eye"></i> Ver Detalhes
            </button>
            <button class="btn-edit" @click="openEditForm(item)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-delete" @click="deleteProject(item.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="portfolio-info">
          <h3>{{ item.title }}</h3>
          <p class="project-description">
            {{ item.description || "Sem descrição" }}
          </p>
        </div>

        <!-- <div class="portfolio-actions">
          <div class="portfolio-stats">
            <div class="stat">
              <i class="fas fa-calendar"></i>
              <span>{{ item.year || new Date().getFullYear() }}</span>
            </div>
            <div class="stat" v-if="item.published">
              <i class="fas fa-eye"></i>
              <span>Publicado</span>
            </div>
          </div>
        </div> -->

        <div class="service-footer">
          <button class="btn-publicar" @click="publishProject(item)">
            <i
              class="fas"
              :class="item.published ? 'fa-eye-slash' : 'fa-eye'"
            ></i>
            {{ item.published ? "Despublicar" : "Publicar" }}
          </button>
          <button class="btn-editar" @click="openEditForm(item)">
            <i class="fas fa-edit"></i>
            Editar
          </button>
          <button class="btn-excluir" @click="deleteProject(item.id)">
            <i class="fas fa-trash"></i>
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAgencyPortfolioStore } from "@/stores/agencyPortfolioStore";

export default {
  name: "PortfolioManagement",
  data() {
    return {
      portfolioStore: useAgencyPortfolioStore(),
      isSaving: false,
      successMessage: "",
      errorMessage: "",
      showModal: false,
      editingProject: null,
      activeFilter: "",
      portfolioItems: [
        {
          id: 1,
          title: "Site Corporativo XYZ",
          category: "Website",
          image:
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          description:
            "Site institucional para empresa de tecnologia com foco em responsividade e performance.",
          saved: true,
          published: true,
          featured: false,
        },
        {
          id: 2,
          title: "App de Delivery",
          category: "Mobile App",
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          description:
            "Aplicativo mobile para delivery de alimentos com sistema de geolocalização.",
          saved: true,
          published: true,
          featured: true,
        },
        {
          id: 3,
          title: "Identidade Visual ABC",
          category: "Design",
          image:
            "https://images.unsplash.com/photo-1590102425712-1c28a0d6b85b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Rebranding completo para startup de serviços financeiros.",
          saved: true,
          published: false,
          featured: false,
        },
        {
          id: 4,
          title: "Landing Page Produto",
          category: "Website",
          image:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          description:
            "Página de vendas para novo produto com foco em conversão.",
          saved: true,
          published: true,
          featured: false,
        },
        {
          id: 5,
          title: "Redesign Plataforma",
          category: "Web App",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          description:
            "Redesign da interface de plataforma de e-learning com foco em usabilidade.",
          saved: true,
          published: true,
          featured: true,
        },
        {
          id: 6,
          title: "App Financeiro",
          category: "Mobile App",
          image:
            "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Aplicativo mobile para controle financeiro pessoal com integração bancária.",
          saved: true,
          published: false,
          featured: false,
        },
      ],
      currentProject: {
        id: null,
        title: "",
        category: "Website",
        image:
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        description: "",
      },
    };
  },
  computed: {
    filteredProjects() {
      if (!this.activeFilter) return this.portfolioItems;
      return this.portfolioItems.filter(
        (item) => item.category === this.activeFilter
      );
    },
  },
  watch: {
    "currentProject.category"(newCategory) {
      // Only change the image if it's the default one or empty, and we're not editing an existing project
      if (
        !this.editingProject &&
        (!this.currentProject.image ||
          this.currentProject.image === "https://via.placeholder.com/300x200" ||
          this.isDefaultCategoryImage(
            this.currentProject.image,
            this.currentProject.category
          ))
      ) {
        this.currentProject.image =
          this.getDefaultImageForCategory(newCategory);
      }
    },
  },
  methods: {
    isDefaultCategoryImage(image, category) {
      const categoryImages = {
        Website:
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "Mobile App":
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "Web App":
          "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        Design:
          "https://images.unsplash.com/photo-1545239351-ef35f43d01b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        Branding:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      };
      return image === categoryImages[category];
    },

    getDefaultImageForCategory(category) {
      const categoryImages = {
        Website:
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "Mobile App":
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "Web App":
          "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        Design:
          "https://images.unsplash.com/photo-1545239351-ef35f43d01b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        Branding:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      };
      return categoryImages[category] || categoryImages["Website"];
    },

    openCreateForm() {
      this.editingProject = null;
      this.currentProject = {
        id: null,
        title: "",
        category: "Website",
        image: this.getDefaultImageForCategory("Website"),
        description: "",
      };
      this.showModal = true;
    },

    openEditForm(project) {
      this.editingProject = { ...project };
      this.currentProject = { ...project };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.editingProject = null;
    },

    async saveProject() {
      this.isSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        if (this.editingProject) {
          // Update existing project
          const index = this.portfolioItems.findIndex(
            (item) => item.id === this.currentProject.id
          );
          if (index !== -1) {
            this.portfolioItems[index] = { ...this.currentProject };
            this.successMessage = "Projeto atualizado com sucesso!";
          }
        } else {
          // Create new project
          const newId =
            Math.max(...this.portfolioItems.map((item) => item.id), 0) + 1;
          const newProject = {
            ...this.currentProject,
            id: newId,
            saved: true,
            published: false,
            featured: false,
          };
          this.portfolioItems.push(newProject);
          this.successMessage = "Projeto criado com sucesso!";
        }

        this.closeModal();

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Erro ao salvar projeto:", error);
        this.errorMessage = `Erro ao salvar projeto: ${error.message}`;

        // Clear error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      } finally {
        this.isSaving = false;
      }
    },

    viewDetails(item) {
      alert(
        `Detalhes do Projeto:\n\nTítulo: ${item.title}\nCategoria: ${
          item.category
        }\nDescrição: ${
          item.description || "Nenhuma descrição disponível"
        }\nPublicado: ${item.published ? "Sim" : "Não"}\nFavorito: ${
          item.featured ? "Sim" : "Não"
        }`
      );
    },

    deleteProject(id) {
      if (confirm("Tem certeza que deseja excluir este projeto?")) {
        this.portfolioItems = this.portfolioItems.filter(
          (item) => item.id !== id
        );
        this.successMessage = "Projeto excluído com sucesso!";

        // Clear message after 3 seconds
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      }
    },

    toggleFavorite(item) {
      item.featured = !item.featured;
      const action = item.featured ? "adicionado" : "removido";
      this.successMessage = `Projeto ${action} aos favoritos!`;

      // Clear message after 3 seconds
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },

    publishProject(item) {
      item.published = !item.published;
      const action = item.published ? "publicado" : "despublicado";
      this.successMessage = `Projeto ${action} com sucesso!`;

      // Clear message after 3 seconds
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },

    setFilter(filter) {
      this.activeFilter = filter;
    },

    async saveToDatabase(item) {
      this.isSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        // Preparar dados do projeto no formato esperado pela API
        const projectData = {
          title: item.title,
          name: item.title,
          category: item.category,
          excerpt: `Projeto de ${item.category} desenvolvido pela nossa agência`,
          description:
            item.description ||
            `${item.title} - Um projeto completo de ${item.category} desenvolvido com as melhores práticas.`,
          client: {
            name: "Cliente Exemplo",
            logo: "https://via.placeholder.com/80",
          },
          year: new Date().getFullYear().toString(),
          duration: "3 meses",
          thumbnail: item.image,
          images: [item.image],
          accentColor: "#6C5CE7",
          technologies: ["Vue.js", "Node.js", "MongoDB"],
          challenge: `Desenvolver uma solução inovadora para ${item.title}`,
          solution: [
            "Análise detalhada dos requisitos",
            "Desenvolvimento ágil com entregas incrementais",
            "Testes automatizados para garantir qualidade",
          ],
          results: [
            "Projeto entregue no prazo",
            "Cliente satisfeito com o resultado",
            "Performance otimizada",
          ],
          features: [
            "Interface intuitiva",
            "Design responsivo",
            "Performance otimizada",
          ],
          liveUrl: "",
          githubUrl: "",
          published: item.published,
          featured: item.featured,
          agencyName: "CreativeDevStudio",
          agencyDescription:
            "Transformamos ideias em experiências digitais memoráveis",
          agencyContactInfo: {},
        };

        // Salvar no banco usando a store
        await this.portfolioStore.createProject(projectData);

        // Marcar como salvo
        item.saved = true;
        this.successMessage = `${item.title} foi salvo com sucesso no banco de dados!`;

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } catch (error) {
        console.error("Erro ao salvar projeto:", error);
        this.errorMessage = `Erro ao salvar ${item.title}: ${error.message}`;

        // Limpar mensagem de erro após 5 segundos
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      } finally {
        this.isSaving = false;
      }
    },

    async saveAllToDatabase() {
      this.isSaving = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        let savedCount = 0;
        let errorCount = 0;

        for (const item of this.portfolioItems) {
          if (!item.saved) {
            try {
              await this.saveToDatabase(item);
              savedCount++;
            } catch (error) {
              errorCount++;
              console.error(`Erro ao salvar ${item.title}:`, error);
            }
          }
        }

        if (savedCount > 0) {
          this.successMessage = `${savedCount} projeto(s) salvos com sucesso!`;
        }

        if (errorCount > 0) {
          this.errorMessage = `${errorCount} projeto(s) falharam ao salvar.`;
        }

        // Limpar mensagens após 5 segundos
        setTimeout(() => {
          this.successMessage = "";
          this.errorMessage = "";
        }, 5000);
      } catch (error) {
        console.error("Erro ao salvar projetos:", error);
        this.errorMessage = "Erro ao salvar projetos. Tente novamente.";
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>

<style scoped>
.portfolio-management {
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, var(--gray-50), var(--white));
  min-height: 100vh;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-save-all {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.badge-saved {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 8px;
}

/* Alerts */
.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.portfolio-filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}

.portfolio-filters button {
  background: white;
  border: 2px solid var(--gray-200);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--gray-700);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: fit-content;
}

.portfolio-filters button:hover {
  border-color: var(--primary-light);
  background: var(--gray-50);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.portfolio-filters button.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.portfolio-item {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  text-align: left;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 90%;
}

.portfolio-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.portfolio-item:hover::before {
  transform: scaleX(1);
}

.portfolio-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.9),
    rgba(139, 92, 246, 0.9)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-overlay button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  white-space: nowrap;
}

.portfolio-overlay button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-edit {
  background: rgba(46, 204, 113, 0.8) !important;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.8) !important;
}

.btn-details {
  background: rgba(52, 152, 219, 0.8) !important;
  font-size: 11px !important;
  padding: 6px 10px !important;
}

.portfolio-info {
  padding: 20px;
}

.portfolio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.portfolio-category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.portfolio-actions-menu {
  display: flex;
  gap: 0.5rem;
}

.portfolio-actions-menu .favorite-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border: none;
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.portfolio-actions-menu .favorite-btn:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.portfolio-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.9),
    rgba(139, 92, 246, 0.9)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-overlay button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  white-space: nowrap;
}

.portfolio-overlay button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-edit {
  background: rgba(46, 204, 113, 0.8) !important;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.8) !important;
}

.btn-details {
  background: rgba(52, 152, 219, 0.8) !important;
  font-size: 11px !important;
  padding: 6px 10px !important;
}

.portfolio-info h3 {
  text-align: center;
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.35rem;
  letter-spacing: -0.3px;
  padding: 0 1.5rem;
}

.project-description {
  color: var(--gray-600);
  margin: 0 1.5rem 1.5rem;
  line-height: 1.6;
  font-size: 14.5px;
  flex: 1;
}

.portfolio-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: var(--border-radius-sm);
}

.btn-tertiary {
  background: var(--gray-200);
  color: var(--gray-700);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-tertiary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.btn-tertiary.published {
  background: #d4edda;
  color: #155724;
}

.service-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
}

.service-footer button {
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
}

.btn-publicar {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.btn-publicar:hover {
  background: linear-gradient(135deg, #219653, #27ae60);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.btn-editar {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-editar:hover {
  background: linear-gradient(135deg, #2980b9, #2573a7);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.btn-excluir {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.btn-excluir:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-200);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--gray-900);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-500);
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--gray-800);
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--gray-800);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-secondary {
  background: var(--gray-200);
  color: var(--gray-800);
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--gray-300);
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-filters {
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-save-all,
  .btn-primary {
    width: 100%;
  }

  .modal-content {
    width: 95%;
    margin: 0 10px;
  }
}
</style>
