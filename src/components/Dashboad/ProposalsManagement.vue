<template>
  <div class="proposals-management">
    <!-- Cards de Estatísticas por Status -->
    <div class="stats-grid">
      <div
        class="stat-card status-card pendente-card"
        :class="{ active: filterStatus === 'pendente' }"
        @click="filterByStatus('pendente')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper pendente-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-badge pendente-badge">Pendente</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.porStatus?.pendentes || 0 }}</h3>
          <p class="stat-label">Aguardando</p>
        </div>
      </div>

      <div
        class="stat-card status-card analise-card"
        :class="{ active: filterStatus === 'em_analise' }"
        @click="filterByStatus('em_analise')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper analise-icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="stat-badge analise-badge">Em Análise</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.porStatus?.emAnalise || 0 }}</h3>
          <p class="stat-label">Analisando</p>
        </div>
      </div>

      <div
        class="stat-card status-card aprovado-card"
        :class="{ active: filterStatus === 'aprovado' }"
        @click="filterByStatus('aprovado')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper aprovado-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-badge aprovado-badge">Aprovado</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.porStatus?.aprovados || 0 }}</h3>
          <p class="stat-label">Aceitos</p>
        </div>
      </div>

      <div
        class="stat-card status-card recusado-card"
        :class="{ active: filterStatus === 'recusado' }"
        @click="filterByStatus('recusado')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper recusado-icon">
            <i class="fas fa-times-circle"></i>
          </div>
          <div class="stat-badge recusado-badge">Recusado</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.porStatus?.recusados || 0 }}</h3>
          <p class="stat-label">Negados</p>
        </div>
      </div>

      <div
        class="stat-card status-card concluido-card"
        :class="{ active: filterStatus === 'concluido' }"
        @click="filterByStatus('concluido')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper concluido-icon">
            <i class="fas fa-flag-checkered"></i>
          </div>
          <div class="stat-badge concluido-badge">Concluído</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.porStatus?.concluidos || 0 }}</h3>
          <p class="stat-label">Finalizados</p>
        </div>
      </div>
    </div>

    <!-- Header com Ações -->
    <div class="section-header">
      <div class="header-title">
        <h2>
          <i class="fas fa-gem"></i>
          Gerenciamento de Propostas
        </h2>
        <p v-if="activeFilter" class="filter-indicator">
          <i class="fas fa-filter"></i>
          Filtro ativo: <strong>{{ getFilterName() }}</strong>
        </p>
      </div>

      <div class="header-actions">
        <button
          class="btn-secondary"
          @click="markSelectedAsRead"
          :disabled="selectedProposals.length === 0"
          v-if="selectedProposals.length > 0"
        >
          <i class="fas fa-check"></i>
          Marcar como Lido ({{ selectedProposals.length }})
        </button>
        <button
          class="btn-danger"
          @click="deleteSelected"
          :disabled="selectedProposals.length === 0"
          v-if="selectedProposals.length > 0"
        >
          <i class="fas fa-trash"></i>
          Excluir ({{ selectedProposals.length }})
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
          placeholder="Buscar por nome, email ou serviço..."
          @input="handleSearch"
        />
      </div>

      <div class="filter-select">
        <i class="fas fa-tag"></i>
        <select v-model="filterStatus" @change="applyFilters">
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="em_analise">Em Análise</option>
          <option value="aprovado">Aprovado</option>
          <option value="recusado">Recusado</option>
          <option value="concluido">Concluído</option>
        </select>
      </div>

      <div class="filter-select">
        <i class="fas fa-filter"></i>
        <select v-model="filterLido" @change="applyFilters">
          <option value="">Todos</option>
          <option value="false">Não lidos</option>
          <option value="true">Lidos</option>
        </select>
      </div>

      <button
        class="btn-clear-filters"
        @click="clearFilters"
        v-if="searchQuery || filterStatus || filterLido"
      >
        <i class="fas fa-times"></i> Limpar Filtros
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Carregando propostas...</p>
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
    <div v-else class="proposals-content">
      <div class="table-container">
        <table class="proposals-table">
          <thead>
            <tr>
              <th width="50">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                />
              </th>
              <th width="80">Status Leitura</th>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Plano</th>
              <th width="100">Cobrança</th>
              <th width="120">Status</th>
              <th width="140">Data</th>
              <th width="150">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="proposal in proposals"
              :key="proposal.id || proposal._id"
              :class="{ 'is-unread': !proposal.lido, 'clickable-row': true }"
              @click="handleRowClick($event, proposal)"
            >
              <td @click.stop>
                <input
                  type="checkbox"
                  v-model="selectedProposals"
                  :value="proposal"
                />
              </td>
              <td @click.stop>
                <div class="status-indicators">
                  <span
                    class="status-dot"
                    :class="proposal.lido ? 'read' : 'unread'"
                    :title="proposal.lido ? 'Lido' : 'Não lido'"
                  ></span>
                  <span
                    v-if="proposal.respondido"
                    class="status-icon responded"
                    title="Respondido"
                  >
                    <i class="fas fa-reply"></i>
                  </span>
                </div>
              </td>
              <td class="proposal-name">
                <div class="name-wrapper">
                  <strong>{{ proposal.nome }}</strong>
                  <a :href="`mailto:${proposal.email}`" class="email-link-small">
                    <i class="fas fa-envelope"></i>
                    {{ proposal.email }}
                  </a>
                </div>
              </td>
              <td>
                <span class="service-badge">
                  {{ proposal.serviceName }}
                </span>
              </td>
              <td>
                <div class="plan-info">
                  <strong>{{ proposal.planName }}</strong>
                  <span class="plan-price">{{ proposal.planPrice }}</span>
                </div>
              </td>
              <td>
                <span
                  class="billing-badge"
                  :class="`billing-${proposal.billingType}`"
                >
                  {{ formatBillingType(proposal.billingType) }}
                </span>
              </td>
              <td>
                <span
                  class="status-badge-table"
                  :class="`status-${proposal.status}`"
                >
                  <i :class="getStatusIcon(proposal.status)"></i>
                  {{ formatStatus(proposal.status) }}
                </span>
              </td>
              <td class="date-cell">
                {{ formatDate(proposal.createdAt) }}
              </td>
              <td class="actions-cell" @click.stop>
                <button
                  class="action-btn view"
                  @click="viewProposal(proposal)"
                  title="Ver detalhes"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  class="action-btn email"
                  @click="replyEmail(proposal)"
                  title="Responder email"
                >
                  <i class="fas fa-reply"></i>
                </button>
                <button
                  v-if="!proposal.lido"
                  class="action-btn mark-read"
                  @click="markAsRead(proposal)"
                  title="Marcar como lido"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="deleteProposal(proposal.id || proposal._id)"
                  :disabled="deletingId === (proposal.id || proposal._id)"
                  title="Excluir"
                >
                  <i
                    class="fas fa-trash"
                    :class="{ 'fa-spin': deletingId === (proposal.id || proposal._id) }"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="proposals.length === 0 && !loading" class="empty-state">
          <i class="fas fa-gem"></i>
          <h3 v-if="isFiltering">Nenhuma proposta encontrada</h3>
          <h3 v-else>Nenhuma proposta recebida</h3>
          <p v-if="isFiltering">
            Tente ajustar seus filtros de busca ou clique em "Limpar Filtros".
          </p>
          <p v-else>Ainda não há propostas de serviço para exibir.</p>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <transition name="modal">
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <div class="modal-title">
              <i class="fas fa-gem"></i>
              <h3>Detalhes da Proposta</h3>
            </div>
            <button @click="closeModal" class="close-button">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body" v-if="selectedProposal">
            <div class="proposal-details">
              <!-- Informações do Cliente -->
              <div class="detail-section">
                <h4><i class="fas fa-user"></i> Informações do Cliente</h4>
                <div class="detail-row">
                  <div class="detail-item">
                    <label>Nome</label>
                    <p>{{ selectedProposal.nome }}</p>
                  </div>
                  <div class="detail-item">
                    <label>Email</label>
                    <p>
                      <a :href="`mailto:${selectedProposal.email}`">{{
                        selectedProposal.email
                      }}</a>
                    </p>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-item">
                    <label>Telefone</label>
                    <p>{{ selectedProposal.telefone }}</p>
                  </div>
                </div>
              </div>

              <!-- Informações do Serviço -->
              <div class="detail-section">
                <h4><i class="fas fa-concierge-bell"></i> Detalhes do Serviço</h4>
                <div class="detail-row">
                  <div class="detail-item">
                    <label>Serviço</label>
                    <p class="service-name">{{ selectedProposal.serviceName }}</p>
                  </div>
                  <div class="detail-item">
                    <label>Plano</label>
                    <p>{{ selectedProposal.planName }}</p>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-item">
                    <label>Valor</label>
                    <p class="price-value">{{ selectedProposal.planPrice }}</p>
                  </div>
                  <div class="detail-item">
                    <label>Tipo de Cobrança</label>
                    <p>
                      <span
                        class="billing-badge"
                        :class="`billing-${selectedProposal.billingType}`"
                      >
                        {{ formatBillingType(selectedProposal.billingType) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Mensagem -->
              <div class="detail-section" v-if="selectedProposal.mensagem">
                <h4><i class="fas fa-comment-alt"></i> Mensagem do Cliente</h4>
                <div class="message-content">
                  {{ selectedProposal.mensagem }}
                </div>
              </div>

              <!-- Status e Controle -->
              <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Status e Controle</h4>
                <div class="detail-row">
                  <div class="detail-item">
                    <label>Status Atual</label>
                    <p>
                      <span
                        class="status-badge-table"
                        :class="`status-${selectedProposal.status}`"
                      >
                        <i :class="getStatusIcon(selectedProposal.status)"></i>
                        {{ formatStatus(selectedProposal.status) }}
                      </span>
                    </p>
                  </div>
                  <div class="detail-item">
                    <label>Data de Recebimento</label>
                    <p>{{ formatDateFull(selectedProposal.createdAt) }}</p>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-item full-width">
                    <label>Alterar Status</label>
                    <select v-model="newStatus" class="status-select">
                      <option value="pendente">Pendente</option>
                      <option value="em_analise">Em Análise</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="recusado">Recusado</option>
                      <option value="concluido">Concluído</option>
                    </select>
                  </div>
                </div>
                <div class="detail-row" v-if="selectedProposal.observacoes">
                  <div class="detail-item full-width">
                    <label>Observações</label>
                    <div class="message-content">
                      {{ selectedProposal.observacoes }}
                    </div>
                  </div>
                </div>
                <div class="detail-row">
                  <div class="detail-item full-width">
                    <label>Adicionar/Editar Observações</label>
                    <textarea
                      v-model="newObservacoes"
                      class="observacoes-textarea"
                      placeholder="Digite suas observações aqui..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="closeModal" class="btn-secondary">
              <i class="fas fa-times"></i>
              Fechar
            </button>
            <button @click="updateProposalStatus" class="btn-success">
              <i class="fas fa-save"></i>
              Salvar Alterações
            </button>
            <button
              v-if="selectedProposal && !selectedProposal.respondido"
              @click="markAsRespondedAndReply(selectedProposal)"
              class="btn-primary"
            >
              <i class="fas fa-reply"></i>
              Responder
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import serviceRequestService from "@/services/serviceRequestService";

export default {
  name: "ProposalsManagement",
  data() {
    return {
      proposals: [],
      selectedProposals: [],
      stats: {
        total: 0,
        porStatus: {
          pendentes: 0,
          emAnalise: 0,
          aprovados: 0,
          recusados: 0,
          concluidos: 0,
        },
        naoLidos: 0,
        naoRespondidos: 0,
        porServico: [],
      },
      selectAll: false,
      loading: false,
      deletingId: null,
      error: null,
      searchQuery: "",
      filterStatus: "",
      filterLido: "",
      activeFilter: null,
      searchTimeout: null,
      isModalVisible: false,
      selectedProposal: null,
      newStatus: "",
      newObservacoes: "",
    };
  },
  computed: {
    isFiltering() {
      return !!this.searchQuery || !!this.filterStatus || !!this.filterLido;
    },
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        await this.fetchStats();
        await this.fetchProposals();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        this.error = this.getErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProposals() {
      try {
        const params = {
          search: this.searchQuery || undefined,
          status: this.filterStatus || undefined,
        };

        if (this.filterLido !== "") {
          params.lido = this.filterLido === "true";
        }

        const response = await serviceRequestService.listAll(params);

        let proposalsData = null;

        if (response.data?.data && Array.isArray(response.data.data)) {
          proposalsData = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          proposalsData = response.data;
        } else if (Array.isArray(response)) {
          proposalsData = response;
        }

        if (proposalsData && Array.isArray(proposalsData)) {
          this.proposals = proposalsData;
        } else {
          this.proposals = [];
        }

        if (this.proposals.length > 0) {
          this.proposals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      } catch (error) {
        console.error("Erro ao buscar propostas:", error);
        this.proposals = [];
        throw error;
      }
    },

    async fetchStats() {
      try {
        const response = await serviceRequestService.getStats();
        this.stats = response.data || response;
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        this.calculateLocalStats();
      }
    },

    calculateLocalStats() {
      const all = this.proposals;
      this.stats = {
        total: all.length,
        porStatus: {
          pendentes: all.filter((p) => p.status === "pendente").length,
          emAnalise: all.filter((p) => p.status === "em_analise").length,
          aprovados: all.filter((p) => p.status === "aprovado").length,
          recusados: all.filter((p) => p.status === "recusado").length,
          concluidos: all.filter((p) => p.status === "concluido").length,
        },
        naoLidos: all.filter((p) => !p.lido).length,
        naoRespondidos: all.filter((p) => !p.respondido).length,
      };
    },

    async deleteProposal(id) {
      if (!id || !confirm("Tem certeza que deseja excluir esta proposta?")) {
        return;
      }

      this.deletingId = id;
      try {
        await serviceRequestService.delete(id);
        this.proposals = this.proposals.filter(
          (proposal) => (proposal.id || proposal._id) !== id
        );
        this.stats.total--;
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao excluir proposta:", error);
        this.error =
          "Falha ao excluir a proposta. " + this.getErrorMessage(error);
      } finally {
        this.deletingId = null;
      }
    },

    async deleteSelected() {
      if (
        !confirm(
          `Tem certeza que deseja excluir ${this.selectedProposals.length} propostas?`
        )
      ) {
        return;
      }

      this.loading = true;
      try {
        const ids = this.selectedProposals.map((p) => p.id || p._id);
        await serviceRequestService.bulkDelete(ids);
        this.selectedProposals = [];
        await this.fetchData();
      } catch (error) {
        console.error("Erro ao excluir múltiplas propostas:", error);
        this.error = "Falha ao excluir propostas selecionadas.";
      } finally {
        this.loading = false;
      }
    },

    async markAsRead(proposal) {
      try {
        await serviceRequestService.markAsRead(proposal.id || proposal._id);
        proposal.lido = true;
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao marcar como lido:", error);
      }
    },

    async markSelectedAsRead() {
      this.loading = true;
      try {
        const ids = this.selectedProposals.map((p) => p.id || p._id);
        await serviceRequestService.bulkMarkAsRead(ids);
        this.selectedProposals.forEach((p) => (p.lido = true));
        this.selectedProposals = [];
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao marcar múltiplas como lidas:", error);
        this.error = "Falha ao marcar propostas como lidas.";
      } finally {
        this.loading = false;
      }
    },

    async updateProposalStatus() {
      try {
        await serviceRequestService.updateStatus(
          this.selectedProposal.id || this.selectedProposal._id,
          this.newStatus,
          this.newObservacoes
        );
        this.selectedProposal.status = this.newStatus;
        this.selectedProposal.observacoes = this.newObservacoes;
        await this.fetchData();
        this.closeModal();
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Erro ao atualizar status da proposta.");
      }
    },

    handleRowClick(event, proposal) {
      const target = event.target;
      if (
        target.closest("input[type='checkbox']") ||
        target.closest(".action-btn") ||
        target.closest(".actions-cell")
      ) {
        return;
      }
      this.viewProposal(proposal);
    },

    viewProposal(proposal) {
      this.selectedProposal = proposal;
      this.newStatus = proposal.status;
      this.newObservacoes = proposal.observacoes || "";
      this.isModalVisible = true;
      if (!proposal.lido) {
        this.markAsRead(proposal);
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.selectedProposal = null;
      this.newStatus = "";
      this.newObservacoes = "";
    },

    replyEmail(proposal) {
      const subject = `Proposta de ${proposal.serviceName} - ${proposal.planName}`;
      const body = `Olá ${proposal.nome},\n\nObrigado pelo seu interesse em nossos serviços!\n\nRecebemos sua solicitação para o serviço "${proposal.serviceName}" no plano "${proposal.planName}" com cobrança ${proposal.billingType}.\n\n[Escreva sua resposta aqui]\n\nAtenciosamente,\n[Seu Nome]`;

      window.open(
        `mailto:${proposal.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      serviceRequestService.markAsResponded(proposal.id || proposal._id);
      proposal.respondido = true;
      this.fetchStats();
    },

    async markAsRespondedAndReply(proposal) {
      this.replyEmail(proposal);
      this.closeModal();
    },

    toggleSelectAll() {
      this.selectedProposals = this.selectAll ? [...this.proposals] : [];
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.applyFilters();
      }, 500);
    },

    applyFilters() {
      this.fetchProposals();
    },

    clearFilters() {
      this.searchQuery = "";
      this.filterStatus = "";
      this.filterLido = "";
      this.activeFilter = null;
      this.applyFilters();
    },

    filterByStatus(status) {
      if (this.filterStatus === status) {
        this.filterStatus = "";
        this.activeFilter = null;
      } else {
        this.filterStatus = status;
        this.activeFilter = status;
      }
      this.applyFilters();
    },

    getFilterName() {
      if (this.filterStatus) {
        return this.formatStatus(this.filterStatus);
      }
      return "";
    },

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    formatDateFull(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatStatus(status) {
      const statuses = {
        pendente: "Pendente",
        em_analise: "Em Análise",
        aprovado: "Aprovado",
        recusado: "Recusado",
        concluido: "Concluído",
      };
      return statuses[status] || status;
    },

    formatBillingType(type) {
      const types = {
        mensal: "Mensal",
        anual: "Anual",
      };
      return types[type] || type;
    },

    getStatusIcon(status) {
      const icons = {
        pendente: "fas fa-clock",
        em_analise: "fas fa-search",
        aprovado: "fas fa-check-circle",
        recusado: "fas fa-times-circle",
        concluido: "fas fa-flag-checkered",
      };
      return icons[status] || "fas fa-circle";
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
    selectedProposals(newVal) {
      this.selectAll =
        newVal.length === this.proposals.length && this.proposals.length > 0;
    },
  },
};
</script>

<style scoped>
.proposals-management {
  padding: 20px;
  background: transparent;
  min-height: 100vh;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card.active {
  border: 2px solid #6366f1;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
  transform: translateY(-4px);
}

.stat-card.active::before {
  transform: scaleX(1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.stat-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.pendente-icon {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.analise-icon {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

.aprovado-icon {
  background: linear-gradient(135deg, #34d399, #10b981);
}

.recusado-icon {
  background: linear-gradient(135deg, #f87171, #ef4444);
}

.concluido-icon {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

.stat-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f1f5f9;
  color: #64748b;
}

.pendente-badge {
  background: #fef3c7;
  color: #b45309;
}

.analise-badge {
  background: #dbeafe;
  color: #1e40af;
}

.aprovado-badge {
  background: #d1fae5;
  color: #065f46;
}

.recusado-badge {
  background: #fee2e2;
  color: #991b1b;
}

.concluido-badge {
  background: #ede9fe;
  color: #6b21a8;
}

.stat-content {
  margin-bottom: 16px;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin: 0;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.header-title h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title h2 i {
  color: #a855f7;
}

.filter-indicator {
  margin: 8px 0 0 0;
  color: #64748b;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-indicator strong {
  color: #6366f1;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-danger,
.btn-success {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.btn-primary:disabled,
.btn-secondary:disabled,
.btn-danger:disabled,
.btn-success:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-retry {
  background: #f59e0b;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-weight: 600;
}

/* Filtros */
.filters-container {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.search-box,
.filter-select {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-box i,
.filter-select i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 1;
}

.search-box input,
.filter-select select {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

.search-box input:focus,
.filter-select select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-clear-filters {
  background: #ef4444;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-clear-filters:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

/* Loading State */
.loading {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: #6366f1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0e7ff;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error {
  color: #dc2626;
  background: #fef2f2;
  border-radius: 16px;
  padding: 40px;
  margin: 20px 0;
  text-align: center;
  border: 2px solid #fecaca;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.empty-state i {
  font-size: 64px;
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 12px 0;
  color: #334155;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* Table */
.proposals-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

.proposals-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;
}

.proposals-table th,
.proposals-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

.proposals-table th {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  font-weight: 700;
  color: #475569;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.proposals-table tbody tr {
  transition: all 0.3s ease;
}

.proposals-table tbody tr.clickable-row {
  cursor: pointer;
}

.proposals-table tbody tr:hover {
  background: #f0f4ff;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.proposals-table tbody tr.is-unread {
  background: #fef3f2;
  font-weight: 600;
}

.proposals-table tbody tr.is-unread:hover {
  background: #fee2e2;
}

.status-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.unread {
  background: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
  animation: pulse 2s infinite;
}

.status-dot.read {
  background: #94a3b8;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-icon.responded {
  color: #16a34a;
  font-size: 14px;
}

.proposal-name {
  font-weight: 600;
  color: #1e293b;
}

.name-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.email-link-small {
  font-size: 12px;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.email-link-small:hover {
  text-decoration: underline;
}

.service-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #e0e7ff;
  color: #4338ca;
}

.plan-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plan-price {
  font-size: 12px;
  color: #64748b;
}

.billing-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.billing-badge.billing-mensal {
  background: #dbeafe;
  color: #1e40af;
}

.billing-badge.billing-anual {
  background: #d1fae5;
  color: #065f46;
}

.status-badge-table {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.status-badge-table.status-pendente {
  background: #fef3c7;
  color: #b45309;
}

.status-badge-table.status-em_analise {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge-table.status-aprovado {
  background: #d1fae5;
  color: #065f46;
}

.status-badge-table.status-recusado {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge-table.status-concluido {
  background: #ede9fe;
  color: #6b21a8;
}

.date-cell {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

.actions-cell {
  white-space: nowrap;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: 0 2px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.action-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.action-btn.view {
  color: #3b82f6;
}

.action-btn.view:hover {
  background: #eff6ff;
}

.action-btn.email {
  color: #8b5cf6;
}

.action-btn.email:hover {
  background: #f5f3ff;
}

.action-btn.mark-read {
  color: #16a34a;
}

.action-btn.mark-read:hover {
  background: #f0fdf4;
}

.action-btn.delete {
  color: #ef4444;
}

.action-btn.delete:hover {
  background: #fef2f2;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 28px;
  border-bottom: 2px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 20px 20px 0 0;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-title i {
  color: #a855f7;
  font-size: 24px;
}

.modal-title h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}

.close-button {
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  color: #64748b;
  font-size: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: #e2e8f0;
  color: #1e293b;
  transform: rotate(90deg);
}

.modal-body {
  padding: 28px;
  flex: 1;
}

.proposal-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-section {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.detail-section h4 {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-section h4 i {
  color: #6366f1;
}

.detail-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item label {
  font-weight: 700;
  color: #475569;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item p {
  margin: 0;
  color: #1e293b;
  font-size: 15px;
}

.detail-item a {
  color: #3b82f6;
  text-decoration: none;
}

.detail-item a:hover {
  text-decoration: underline;
}

.service-name {
  font-weight: 600;
  color: #6366f1;
}

.price-value {
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
}

.message-content {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  white-space: pre-wrap;
  line-height: 1.8;
  color: #334155;
  font-size: 14px;
}

.status-select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.status-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.observacoes-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
}

.observacoes-textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.modal-footer {
  padding: 20px 28px;
  border-top: 2px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #fafbfc;
  border-radius: 0 0 20px 20px;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-start;
  }

  .filters-container {
    flex-direction: column;
  }

  .search-box,
  .filter-select {
    width: 100%;
  }

  .detail-row {
    grid-template-columns: 1fr;
  }
}
</style>
