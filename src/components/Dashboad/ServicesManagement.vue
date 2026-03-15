<template>
  <div class="services-management">
    <!-- Header section with title and add button -->
    <div class="section-header">
      <div class="header-content">
        <h2 class="section-title">
          <i class="fas fa-concierge-bell"></i>
          Gerenciamento de Serviços
        </h2>
        <p class="section-subtitle">
          Gerencie e organize os serviços oferecidos pela sua agência
        </p>
      </div>
      <button class="btn-primary btn-add" @click="openAddServiceModal">
        <i class="fas fa-plus"></i>
        <span>Novo Serviço</span>
      </button>
    </div>

    <!-- Service filters by category -->
    <div class="services-filters">
      <button
        v-for="filter in filters"
        :key="filter.id"
        :class="['filter-btn', { active: activeFilter === filter.id }]"
        @click="setActiveFilter(filter.id)"
      >
        <i :class="filter.icon"></i>
        {{ filter.label }}
      </button>
    </div>

    <!-- Services grid with category tags -->
    <div class="services-grid">
      <div
        v-for="service in filteredServices"
        :key="service.id"
        class="service-card"
      >
        <div class="service-header">
          <div class="service-category-badge">
            <i :class="getCategoryIcon(service.category)"></i>
            {{ service.category }}
          </div>
        </div>

        <div class="service-icon">
          <i :class="service.icon"></i>
        </div>

        <h3 class="service-title">{{ service.name }}</h3>
        <p class="service-description">{{ service.description }}</p>

        <div
          class="service-features"
          v-if="service.features && service.features.length > 0"
        >
          <div
            class="feature"
            v-for="(feature, index) in service.features"
            :key="index"
          >
            <i class="fas fa-check-circle"></i>
            <span>{{ feature }}</span>
          </div>
        </div>

        <div class="service-price">
          <div class="price-amount">
            <span class="price">{{ service.price }}</span>
            <span class="period" v-if="service.period">{{
              service.period
            }}</span>
          </div>
          <div class="service-duration" v-if="service.duration">
            <i class="fas fa-clock"></i>
            <span>{{ service.duration }}</span>
          </div>
        </div>

        <div class="service-meta">
          <div class="service-stats">
            <div class="stat">
              <i class="fas fa-chart-line"></i>
              <span>{{ service.popularity || "0" }} vendas</span>
            </div>
            <div class="stat" v-if="service.rating">
              <i class="fas fa-star"></i>
              <span>{{ service.rating }}/5</span>
            </div>
          </div>
        </div>

        <div class="service-footer">
          <button
            class="btn-publicar"
            @click="toggleServicePublish(service)"
          >
            <i class="fas" :class="service.published ? 'fa-eye-slash' : 'fa-eye'"></i>
            {{ service.published ? 'Despublicar' : 'Publicar' }}
          </button>
          <button
            class="btn-editar"
            @click="editService(service)"
          >
            <i class="fas fa-edit"></i>
            Editar
          </button>
          <button
            class="btn-excluir"
            @click="deleteService(service.id)"
          >
            <i class="fas fa-trash"></i>
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Service Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? "Editar Serviço" : "Adicionar Novo Serviço" }}</h3>
          <button class="modal-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="saveService" class="modal-form">
          <div class="form-group">
            <label for="serviceName">Nome do Serviço *</label>
            <input
              type="text"
              id="serviceName"
              v-model="currentService.name"
              placeholder="Ex: Criação de Website"
              required
            />
          </div>

          <div class="form-group">
            <label for="serviceCategory">Categoria *</label>
            <select
              id="serviceCategory"
              v-model="currentService.category"
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="serviceIcon">Ícone</label>
            <select v-model="currentService.icon">
              <option
                v-for="icon in availableIcons"
                :key="icon.value"
                :value="icon.value"
              >
                {{ icon.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="serviceDescription">Descrição *</label>
            <textarea
              id="serviceDescription"
              v-model="currentService.description"
              placeholder="Descreva o serviço em detalhes"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="servicePrice">Preço *</label>
              <input
                type="text"
                id="servicePrice"
                v-model="currentService.price"
                placeholder="Ex: R$ 2.500"
                required
              />
            </div>

            <div class="form-group">
              <label for="servicePeriod">Período</label>
              <select v-model="currentService.period">
                <option value="">Selecione</option>
                <option value="/mês">/mês</option>
                <option value="/projeto">/projeto</option>
                <option value="/único">único</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="serviceDuration">Duração</label>
              <input
                type="text"
                id="serviceDuration"
                v-model="currentService.duration"
                placeholder="Ex: 15 dias"
              />
            </div>

            <div class="form-group">
              <label for="servicePopularity">Poplaridade (vendas)</label>
              <input
                type="number"
                id="servicePopularity"
                v-model="currentService.popularity"
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Recursos Inclusos</label>
            <div class="features-list">
              <div
                v-for="(feature, index) in currentService.features"
                :key="index"
                class="feature-input"
              >
                <input
                  type="text"
                  v-model="currentService.features[index]"
                  :placeholder="`Recurso ${index + 1}`"
                  @blur="addFeatureIfNotEmpty(index)"
                />
                <button
                  type="button"
                  class="remove-feature"
                  @click="removeFeature(index)"
                  v-if="currentService.features.length > 1"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button
                type="button"
                class="btn-secondary btn-add-feature"
                @click="addFeature"
              >
                <i class="fas fa-plus"></i> Adicionar Recurso
              </button>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              {{ isEditing ? "Atualizar" : "Adicionar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesManagement",
  data() {
    return {
      isEditing: false,
      showModal: false,
      activeFilter: "all",
      filters: [
        { id: "all", label: "Todos", icon: "fas fa-globe" },
        { id: "websites", label: "Websites", icon: "fas fa-laptop-code" },
        { id: "marketing", label: "Marketing", icon: "fas fa-bullhorn" },
        { id: "design", label: "Design", icon: "fas fa-palette" },
        { id: "development", label: "Desenvolvimento", icon: "fas fa-code" },
        { id: "consulting", label: "Consultoria", icon: "fas fa-lightbulb" },
      ],
      categories: [
        { id: "websites", name: "Websites" },
        { id: "marketing", name: "Marketing" },
        { id: "design", name: "Design" },
        { id: "development", name: "Desenvolvimento" },
        { id: "consulting", name: "Consultoria" },
      ],
      availableIcons: [
        { value: "fas fa-laptop-code", label: "Laptop Code" },
        { value: "fas fa-shopping-cart", label: "Shopping Cart" },
        { value: "fas fa-search", label: "Search" },
        { value: "fas fa-hashtag", label: "Hashtag" },
        { value: "fas fa-paint-brush", label: "Paint Brush" },
        { value: "fas fa-chart-line", label: "Chart Line" },
        { value: "fas fa-mobile-alt", label: "Mobile" },
        { value: "fas fa-cogs", label: "Settings" },
        { value: "fas fa-bullhorn", label: "Bullhorn" },
        { value: "fas fa-lightbulb", label: "Lightbulb" },
        { value: "fas fa-database", label: "Database" },
        { value: "fas fa-server", label: "Server" },
      ],
      services: [
        {
          id: 1,
          name: "Website Corporativo",
          description:
            "Desenvolvimento de sites institucionais responsivos, com design moderno e otimizado para conversão.",
          icon: "fas fa-laptop-code",
          price: "R$ 2.500",
          period: "/projeto",
          category: "websites",
          duration: "15 dias",
          popularity: 24,
          features: [
            "Design responsivo",
            "Integração com redes sociais",
            "SEO básico",
            "Suporte 30 dias",
          ],
          rating: 4.8,
          published: true,
        },
        {
          id: 2,
          name: "Loja Virtual",
          description:
            "E-commerce completo com painel administrativo, integração de pagamentos e gerenciamento de estoque.",
          icon: "fas fa-shopping-cart",
          price: "R$ 4.500",
          period: "/único",
          category: "websites",
          duration: "30 dias",
          popularity: 42,
          features: [
            "Integração com pagamentos",
            "Gestão de estoque",
            "Relatórios avançados",
            "Suporte 60 dias",
          ],
          rating: 4.9,
          published: true,
        },
        {
          id: 3,
          name: "SEO",
          description:
            "Otimização completa para mecanismos de busca para melhorar a visibilidade orgânica do seu site.",
          icon: "fas fa-search",
          price: "R$ 800",
          period: "/mês",
          category: "marketing",
          duration: "mês contínuo",
          popularity: 18,
          features: [
            "Análise de palavras-chave",
            "Otimização on-page",
            "Relatório mensal",
            "Suporte contínuo",
          ],
          rating: 4.7,
          published: false,
        },
        {
          id: 4,
          name: "Social Media",
          description:
            "Gestão completa de redes sociais com criação de conteúdo e campanhas segmentadas.",
          icon: "fas fa-hashtag",
          price: "R$ 1.200",
          period: "/mês",
          category: "marketing",
          duration: "mês contínuo",
          popularity: 35,
          features: [
            "Criação de conteúdo",
            "Agendamento de posts",
            "Análise de métricas",
            "Gestão de anúncios",
          ],
          rating: 4.6,
          published: true,
        },
        {
          id: 5,
          name: "Identidade Visual",
          description:
            "Criação de marca completa com logotipo, manual da marca e materiais de apoio.",
          icon: "fas fa-paint-brush",
          price: "R$ 1.800",
          period: "/projeto",
          category: "design",
          duration: "20 dias",
          popularity: 29,
          features: [
            "Logotipo",
            "Paleta de cores",
            "Manual da marca",
            "Materiais impressos",
          ],
          rating: 4.9,
          published: true,
        },
        {
          id: 6,
          name: "Consultoria Digital",
          description:
            "Avaliação completa da presença digital e plano de ação personalizado.",
          icon: "fas fa-lightbulb",
          price: "R$ 1.500",
          period: "/sessão",
          category: "consulting",
          duration: "3 horas",
          popularity: 15,
          features: [
            "Análise completa",
            "Relatório detalhado",
            "Recomendações",
            "Plano de ação",
          ],
          rating: 4.8,
          published: false,
        },
      ],
      currentService: {
        id: null,
        name: "",
        description: "",
        icon: "fas fa-concierge-bell",
        price: "",
        period: "",
        category: "",
        duration: "",
        popularity: 0,
        features: [""],
        rating: null,
        published: true,
      },
    };
  },
  computed: {
    filteredServices() {
      if (this.activeFilter === "all") {
        return this.services;
      }
      return this.services.filter(
        (service) => service.category === this.activeFilter
      );
    },
  },
  methods: {
    setActiveFilter(filterId) {
      this.activeFilter = filterId;
    },
    getCategoryIcon(category) {
      const categoryMap = {
        websites: "fas fa-laptop-code",
        marketing: "fas fa-bullhorn",
        design: "fas fa-paint-brush",
        development: "fas fa-code",
        consulting: "fas fa-lightbulb",
      };
      return categoryMap[category] || "fas fa-concierge-bell";
    },
    openAddServiceModal() {
      this.isEditing = false;
      this.currentService = {
        id: null,
        name: "",
        description: "",
        icon: "fas fa-concierge-bell",
        price: "",
        period: "",
        category: "",
        duration: "",
        popularity: 0,
        features: [""],
        rating: null,
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveService() {
      if (this.isEditing) {
        // Update existing service
        const index = this.services.findIndex(
          (s) => s.id === this.currentService.id
        );
        if (index !== -1) {
          this.services[index] = { ...this.currentService };
        }
      } else {
        // Add new service
        const newId = Math.max(...this.services.map((s) => s.id), 0) + 1;
        this.currentService.id = newId;
        this.services.push({ ...this.currentService });
      }
      this.closeModal();
    },
    editService(service) {
      this.isEditing = true;
      this.currentService = { ...service };
      this.showModal = true;
    },
    toggleServicePublish(service) {
      service.published = !service.published;
      const action = service.published ? 'publicado' : 'despublicado';
      // In a real app, you would make an API call to update the service status
      console.log(`Serviço "${service.name}" foi ${action}`);
    },
    deleteService(serviceId) {
      if (confirm("Tem certeza que deseja excluir este serviço?")) {
        this.services = this.services.filter((s) => s.id !== serviceId);
      }
    },
    addFeature() {
      this.currentService.features.push("");
    },
    removeFeature(index) {
      if (this.currentService.features.length > 1) {
        this.currentService.features.splice(index, 1);
      }
    },
    addFeatureIfNotEmpty(index) {
      // Add a new feature input if the current one is filled and it's the last one
      if (
        index === this.currentService.features.length - 1 &&
        this.currentService.features[index].trim() !== ""
      ) {
        this.addFeature();
      }
    },
  },
};
</script>

<style scoped>
.services-management {
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

.header-content {
  flex: 1;
  min-width: 300px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  background: linear-gradient(135deg, var(--primary-dark), var(--secondary));
}

.services-filters {
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

.filter-btn {
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

.filter-btn:hover {
  border-color: var(--primary-light);
  background: var(--gray-50);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.service-card {
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
}

.service-card::before {
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

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.service-category-badge {
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

.service-actions-menu {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
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

.action-btn:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.action-btn.danger:hover {
  background: var(--danger);
}

.service-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto 0.5rem;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(-5deg);
}

.service-title {
  text-align: center;
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.35rem;
  letter-spacing: -0.3px;
  padding: 0 1.5rem;
}

.service-description {
  color: var(--gray-600);
  margin: 0 1.5rem 1.5rem;
  line-height: 1.6;
  font-size: 14.5px;
  flex: 1;
}

.service-features {
  padding: 0 1.5rem;
  margin-bottom: 1rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--success);
  font-size: 0.9rem;
}

.feature:last-child {
  margin-bottom: 0;
}

.service-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: var(--border-radius-sm);
}

.price-amount {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.period {
  color: var(--gray-600);
  font-size: 1rem;
  font-weight: 600;
  margin-left: 4px;
}

.service-duration {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--info);
  font-size: 0.9rem;
  font-weight: 500;
}

.service-meta {
  margin: 0 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.service-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--gray-600);
  font-size: 0.85rem;
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

/* Service Details Modal Styles */
.service-details-modal-overlay {
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

.service-details-modal-content {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.service-details-modal-content .modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.service-details-modal-content .modal-header h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.service-category-badge-modal {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.modal-service-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto;
  color: white;
  font-size: 3rem;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.modal-service-description {
  color: var(--gray-700);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.modal-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.modal-details-grid .detail-item {
  background: var(--gray-50);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  text-align: center;
}

.modal-details-grid .detail-item label {
  font-weight: 600;
  color: var(--gray-600);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.modal-details-grid .detail-item p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray-900);
}

.modal-features {
  margin-bottom: 2rem;
}

.modal-features h4 {
  font-size: 1.2rem;
  color: var(--gray-800);
  margin-bottom: 1rem;
  text-align: center;
}

.modal-features ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.modal-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray-700);
  font-size: 0.95rem;
  background: var(--gray-50);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
}

.modal-features li i {
  color: var(--success);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--gray-200);
  text-align: right;
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
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--gray-900);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-500);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-700);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.feature-input input {
  flex: 1;
}

.remove-feature {
  background: var(--danger);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-feature:hover {
  background: #dc2626;
}

.btn-add-feature {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .services-management {
    padding: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-content {
    min-width: 100%;
  }

  .services-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-price {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .service-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .service-actions-menu {
    align-self: flex-end;
  }

  .modal-content {
    margin: 0.5rem;
  }
}
</style>
