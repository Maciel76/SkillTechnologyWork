<template>
  <div class="leads-management">
    <!-- Cards de Estatísticas -->
    <div class="stats-cards" v-if="stats">
      <div class="stat-card total">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.total || 0 }}</h3>
          <p>Total de Leads</p>
        </div>
      </div>
      <div class="stat-card active">
        <div class="stat-icon">
          <i class="fas fa-user-check"></i>
        </div>
        <div class="stat-content">
          <h3>{{ contactedLeadIds.size || 0 }}</h3>
          <p>Leads Contatados</p>
        </div>
      </div>
      <div class="stat-card inactive">
        <div class="stat-icon">
          <i class="fas fa-user-times"></i>
        </div>
        <div class="stat-content">
          <h3>{{ deletedLeadsCount || 0 }}</h3>
          <p>Leads Excluidos</p>
        </div>
      </div>
    </div>

    <div class="section-header">
      <div class="header-title">
        <h2>Gerenciamento de Leads</h2>
      </div>

      <div class="header-actions">
        <button
          class="btn-secondary"
          @click="sendBulkEmail"
          :disabled="selectedLeads.length === 0"
        >
          <i class="fas fa-envelope"></i>
          Enviar Email ({{ selectedLeads.length }})
        </button>
        <button class="btn-primary" @click="fetchData">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Atualizar
        </button>
      </div>
    </div>

    <!-- Filtros e Busca -->
    <div class="filters-container">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar por nome ou email..."
          @input="handleSearch"
        />
      </div>
      <div class="date-filter">
        <i class="fas fa-calendar-alt"></i>
        <input type="date" v-model="searchDate" @change="applyFilters" />
      </div>
      <button
        class="btn-clear-filters"
        @click="clearFilters"
        v-if="searchQuery || searchDate"
      >
        <i class="fas fa-times"></i> Limpar Filtros
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Carregando leads...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-triangle"></i>
      <div class="error-content">
        <p>{{ error }}</p>
        <button @click="fetchData" class="btn-retry">
          <i class="fas fa-redo"></i> Tentar Novamente
        </button>
      </div>
    </div>

    <!-- Success State -->
    <div v-else class="leads-content">
      <div class="table-container">
        <table class="leads-table">
          <thead>
            <tr>
              <th width="50">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                />
              </th>
              <th>Nome</th>
              <th>Email</th>
              <th width="140">Data de Inscrição</th>
              <th width="100">Status</th>
              <th width="120">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leads" :key="lead._id">
              <td>
                <input type="checkbox" v-model="selectedLeads" :value="lead" />
              </td>
              <td class="lead-name">{{ lead.name }}</td>
              <td>
                <a :href="`mailto:${lead.email}`" class="email-link">
                  {{ lead.email }}
                </a>
              </td>
              <td class="date-cell">
                {{ formatDate(lead.subscribedAt || lead.createdAt) }}
              </td>
              <td>
                <span class="status-badge" :class="getStatusClass(lead.active)">
                  {{ getStatusText(lead.active) }}
                </span>
              </td>
              <td class="actions-cell">
                <button
                  class="action-btn email"
                  @click="sendSingleEmail(lead)"
                  :title="`Enviar email para ${lead.email}`"
                >
                  <i class="fas fa-envelope"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="deleteLead(lead._id)"
                  :title="`Excluir lead ${lead.name}`"
                  :disabled="deletingId === lead._id"
                >
                  <i
                    class="fas fa-trash"
                    :class="{ 'fa-spin': deletingId === lead._id }"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="leads.length === 0 && !loading" class="empty-state">
          <i class="fas fa-inbox"></i>
          <h3 v-if="isFiltering">Nenhum lead encontrado</h3>
          <h3 v-else>Nenhum lead cadastrado</h3>
          <p v-if="isFiltering">
            Tente ajustar seus filtros de busca ou clique em "Limpar Filtros".
          </p>
          <p v-else>Ainda não há leads para exibir.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination-container">
        <button @click="goToPage(1)" :disabled="currentPage === 1">
          &laquo;
        </button>
        <button @click="prevPage" :disabled="currentPage === 1">
          &lsaquo;
        </button>
        <span class="pagination-info">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          &rsaquo;
        </button>
        <button
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import subscriptionService from "@/services/subscriptionService";

export default {
  name: "LeadsManagement",
  data() {
    return {
      leads: [],
      selectedLeads: [],
      stats: null,
      selectAll: false,
      loading: false,
      deletingId: null,
      error: null,
      currentPage: 1,
      leadsPerPage: 10,
      searchQuery: "",
      searchDate: "",
      searchTimeout: null,
      deletedLeadsCount: 0,
      contactedLeadIds: new Set(),
    };
  },
  computed: {
    totalPages() {
      if (!this.stats || this.stats.total === 0) {
        return 1;
      }
      return Math.ceil(this.stats.total / this.leadsPerPage);
    },
    isFiltering() {
      return !!this.searchQuery || !!this.searchDate;
    },
  },
  async mounted() {
    // Carregar contadores do localStorage
    const storedDeletedCount = localStorage.getItem("deletedLeadsCount");
    this.deletedLeadsCount = storedDeletedCount
      ? parseInt(storedDeletedCount, 10)
      : 0;

    const storedContactedIds = localStorage.getItem("contactedLeadIds");
    this.contactedLeadIds = storedContactedIds
      ? new Set(JSON.parse(storedContactedIds))
      : new Set();

    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        await this.fetchStats(); // Fetch stats first to get total for pagination
        await this.fetchLeads();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        this.error = this.getErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLeads() {
      try {
        const params = {
          page: this.currentPage,
          limit: this.leadsPerPage,
          search: this.searchQuery || undefined,
          date: this.searchDate || undefined,
        };
        const response = await subscriptionService.listAll(params);
        // A resposta da API provavelmente é um objeto { data: [...] }
        // Certifique-se de que estamos acessando o array de leads.
        this.leads = response.data || response;

        // Garantir que as datas são objetos Date válidos
        this.leads = this.leads.map((lead) => ({
          ...lead,
          subscribedAt: this.parseDate(lead.subscribedAt),
          createdAt: this.parseDate(lead.createdAt),
        }));
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
        throw error;
      }
    },

    async fetchStats() {
      try {
        const response = await subscriptionService.getStats();
        this.stats = response.data || response; // Acessa o objeto 'data' dentro da resposta
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        throw error; // Lançar erro para ser capturado pelo fetchData
      }
    },

    async deleteLead(id) {
      if (!id || !confirm("Tem certeza que deseja excluir este lead?")) {
        return;
      }

      this.deletingId = id;
      try {
        await subscriptionService.deleteSubscription(id);
        // Remove o lead da lista localmente para uma resposta mais rápida da UI
        this.leads = this.leads.filter((lead) => lead._id !== id);
        this.stats.total--;
        // Incrementa e salva a contagem de leads excluídos
        this.deletedLeadsCount++;
        localStorage.setItem("deletedLeadsCount", this.deletedLeadsCount);

        if (this.leads.length === 0 && this.currentPage > 1) {
          // Se a página ficar vazia, volta para a anterior
          await this.goToPage(this.currentPage - 1);
        }
        // this.$notify({ title: 'Sucesso', text: 'Lead excluído com sucesso!', type: 'success' });
      } catch (error) {
        console.error("Erro ao excluir lead:", error);
        this.error = "Falha ao excluir o lead. " + this.getErrorMessage(error);
        // this.$notify({
        //   title: 'Erro',
        //   text: 'Erro ao excluir lead: ' + this.getErrorMessage(error),
        //   type: 'error'
        // });
      } finally {
        this.deletingId = null;
      }
    },

    sendSingleEmail(lead) {
      const subject = `Uma oportunidade para você, ${lead.name}!`;
      const body = `Olá ${lead.name},

Espero que este email o encontre bem.

Meu nome é [Seu Nome] e faço parte da equipe da [Nome da Sua Empresa]. Vimos que você se inscreveu em nossa lista e gostaríamos de apresentar uma oportunidade que pode ser do seu interesse.

Estamos oferecendo [descreva brevemente o serviço ou produto]. Acreditamos que isso pode ajudar você a [mencione um benefício, ex: otimizar seus processos, alcançar mais clientes, etc.].

Gostaria de agendar uma breve conversa de 15 minutos para explorarmos como podemos colaborar?

Atenciosamente,

[Seu Nome]
[Seu Cargo] | [Nome da Sua Empresa]`;

      window.open(
        `mailto:${lead.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      // Marca o lead como contatado e salva
      this.contactedLeadIds.add(lead.email);
      localStorage.setItem(
        "contactedLeadIds",
        JSON.stringify(Array.from(this.contactedLeadIds))
      );
    },

    sendBulkEmail() {
      if (this.selectedLeads.length === 0) return;

      const emails = this.selectedLeads.map((lead) => lead.email).join(",");
      const subject = "Promoção Especial - Sua Empresa";
      const body =
        "Olá,\n\nTemos uma novidade especial para você!\n\nAtenciosamente,\nSua Empresa";

      window.open(
        `mailto:${emails}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      // Marca os leads como contatados e salva
      this.selectedLeads.forEach((lead) => {
        this.contactedLeadIds.add(lead.email);
      });
      localStorage.setItem(
        "contactedLeadIds",
        JSON.stringify(Array.from(this.contactedLeadIds))
      );
    },

    toggleSelectAll() {
      this.selectedLeads = this.selectAll ? [...this.leads] : [];
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.applyFilters();
      }, 500); // Debounce de 500ms
    },

    applyFilters() {
      this.currentPage = 1;
      this.fetchData();
    },

    clearFilters() {
      this.searchQuery = "";
      this.searchDate = "";
      this.applyFilters();
    },

    async goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage)
        return;
      this.currentPage = page;
      this.loading = true;
      await this.fetchLeads();
      this.loading = false;
    },

    async prevPage() {
      await this.goToPage(this.currentPage - 1);
    },

    async nextPage() {
      await this.goToPage(this.currentPage + 1);
    },

    parseDate(date) {
      if (!date) return new Date();
      if (date instanceof Date) return date;
      if (typeof date === "string") return new Date(date);
      // Para compatibilidade com MongoDB Extended JSON que pode vir do backend
      if (date.$date) return new Date(date.$date);
      return new Date();
    },

    formatDate(date) {
      const parsedDate = this.parseDate(date);
      return parsedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    getStatusClass(active) {
      return active ? "active" : "inactive";
    },

    getStatusText(active) {
      return active ? "Ativo" : "Inativo";
    },

    getErrorMessage(error) {
      if (
        error.code === "NETWORK_ERROR" ||
        error.message?.includes("Network Error")
      ) {
        return "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";
      }

      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          return "Endpoint não encontrado. Verifique as rotas do backend.";
        } else if (status === 500) {
          return "Erro interno do servidor.";
        }
        return error.response.data?.message || `Erro ${status}`;
      } else if (error.request) {
        return "Servidor não respondeu. Verifique sua conexão.";
      } else {
        return "Erro inesperado: " + error.message;
      }
    },
  },
  watch: {
    selectedLeads(newVal) {
      this.selectAll =
        newVal.length === this.leads.length && this.leads.length > 0;
    },
  },
};
</script>

<style scoped>
.leads-management {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Estatísticas */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-card.total .stat-icon {
  background: linear-gradient(135deg, #2196f3, #1976d2);
}

.stat-card.active .stat-icon {
  background: linear-gradient(135deg, #4caf50, #388e3c);
}

.stat-card.inactive .stat-icon {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}

.stat-content h3 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.stat-content p {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  margin: 4px 0 0;
}

/* Filtros */
.filters-container {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box,
.date-filter {
  position: relative;
}

.search-box i,
.date-filter i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input,
.date-filter input {
  padding: 10px 16px 10px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.search-box input:focus,
.date-filter input:focus {
  outline: none;
  border-color: #2196f3;
}

.btn-clear-filters {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.header-title h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-primary,
.btn-secondary {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #2196f3;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #1976d2;
  transform: translateY(-1px);
}

.btn-secondary:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
  transform: none;
}

.btn-retry {
  background-color: #ff9800;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.leads-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.leads-table th,
.leads-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.leads-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.875rem;
  position: sticky;
  top: 0;
}

.lead-name {
  font-weight: 500;
  color: #2c3e50;
}

.email-link {
  color: #2196f3;
  text-decoration: none;
  font-size: 0.875rem;
}

.email-link:hover {
  text-decoration: underline;
}

.date-cell {
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
}

.actions-cell {
  white-space: nowrap;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin: 0 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.action-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.action-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.email {
  color: #2196f3;
}
.delete {
  color: #f44336;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background-color: #e8f5e9;
  color: #4caf50;
}

.status-badge.inactive {
  background-color: #ffebee;
  color: #f44336;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #666;
}

.loading {
  color: #2196f3;
}

.error {
  color: #f44336;
  background-color: #ffebee;
  border-radius: 8px;
  padding: 30px;
  margin: 20px;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-state {
  color: #666;
}

.empty-state i {
  font-size: 48px;
  color: #bdbdbd;
  margin-bottom: 12px;
}

.empty-state h3 {
  margin: 0;
  color: #2c3e50;
}

.empty-state p {
  margin: 0;
  color: #666;
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .stats {
    justify-content: flex-start;
  }
}

.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
