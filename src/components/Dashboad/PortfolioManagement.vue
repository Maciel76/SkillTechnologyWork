<template>
  <div class="portfolio-management">
    <div class="section-header">
      <h2>Gerenciamento de Portfólio</h2>
      <div class="header-actions">
        <button class="btn-save-all" @click="saveAllToDatabase" :disabled="isSaving">
          <i class="fas" :class="isSaving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
          {{ isSaving ? 'Salvando...' : 'Salvar Todos no Banco' }}
        </button>
        <button class="btn-primary"><i class="fas fa-plus"></i> Novo Item</button>
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
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">Websites</button>
      <button class="filter-btn">Aplicativos</button>
      <button class="filter-btn">Design</button>
      <button class="filter-btn">Branding</button>
    </div>

    <div class="portfolio-grid">
      <div class="portfolio-item" v-for="item in portfolioItems" :key="item.id">
        <div class="portfolio-image">
          <img :src="item.image" :alt="item.title" />
          <div class="portfolio-overlay">
            <button class="btn-primary" @click="saveToDatabase(item)" :disabled="isSaving">
              <i class="fas" :class="isSaving ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'"></i>
              {{ item.saved ? 'Salvo' : 'Salvar no Banco' }}
            </button>
          </div>
        </div>
        <div class="portfolio-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.category }}</p>
          <span v-if="item.saved" class="badge-saved">
            <i class="fas fa-check"></i> Salvo
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAgencyPortfolioStore } from '@/stores/agencyPortfolioStore';

export default {
  name: "PortfolioManagement",
  data() {
    return {
      portfolioStore: useAgencyPortfolioStore(),
      isSaving: false,
      successMessage: '',
      errorMessage: '',
      portfolioItems: [
        {
          id: 1,
          title: "Site Corporativo XYZ",
          category: "Web App",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
        {
          id: 2,
          title: "App de Delivery",
          category: "Mobile App",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
        {
          id: 3,
          title: "Identidade Visual ABC",
          category: "Website",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
        {
          id: 4,
          title: "Landing Page Produto",
          category: "Website",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
        {
          id: 5,
          title: "Redesign Plataforma",
          category: "Sistema Web",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
        {
          id: 6,
          title: "App Financeiro",
          category: "Mobile App",
          image: "https://via.placeholder.com/300x200",
          saved: false,
        },
      ],
    };
  },
  methods: {
    async saveToDatabase(item) {
      this.isSaving = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        // Preparar dados do projeto no formato esperado pela API
        const projectData = {
          title: item.title,
          name: item.title,
          category: item.category,
          excerpt: `Projeto de ${item.category} desenvolvido pela nossa agência`,
          description: `${item.title} - Um projeto completo de ${item.category} desenvolvido com as melhores práticas.`,
          client: {
            name: "Cliente Exemplo",
            logo: "https://via.placeholder.com/80"
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
            "Testes automatizados para garantir qualidade"
          ],
          results: [
            "Projeto entregue no prazo",
            "Cliente satisfeito com o resultado",
            "Performance otimizada"
          ],
          features: [
            "Interface intuitiva",
            "Design responsivo",
            "Performance otimizada"
          ],
          liveUrl: "",
          githubUrl: "",
          published: true,
          featured: false,
          agencyName: "CreativeDevStudio",
          agencyDescription: "Transformamos ideias em experiências digitais memoráveis",
          agencyContactInfo: {}
        };

        // Salvar no banco usando a store
        await this.portfolioStore.createProject(projectData);

        // Marcar como salvo
        item.saved = true;
        this.successMessage = `${item.title} foi salvo com sucesso no banco de dados!`;

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      } catch (error) {
        console.error('Erro ao salvar projeto:', error);
        this.errorMessage = `Erro ao salvar ${item.title}: ${error.message}`;

        // Limpar mensagem de erro após 5 segundos
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      } finally {
        this.isSaving = false;
      }
    },

    async saveAllToDatabase() {
      this.isSaving = true;
      this.errorMessage = '';
      this.successMessage = '';

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
          this.successMessage = '';
          this.errorMessage = '';
        }, 5000);

      } catch (error) {
        console.error('Erro ao salvar projetos:', error);
        this.errorMessage = 'Erro ao salvar projetos. Tente novamente.';
      } finally {
        this.isSaving = false;
      }
    }
  }
};
</script>

<style scoped>
.portfolio-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

.btn-save-all:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.btn-save-all:disabled {
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
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.filter-btn {
  background: white;
  border: 2px solid var(--gray-200);
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: var(--gray-700);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn:hover {
  border-color: var(--primary-light);
  background: var(--gray-50);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.portfolio-item {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
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
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info {
  padding: 20px;
}

.portfolio-info h3 {
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.15rem;
  letter-spacing: -0.2px;
}

.portfolio-info p {
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
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
}
</style>
