<template>
  <div class="contact-management">
    <!-- Cards de Estatísticas por Assunto -->
    <div class="stats-grid">
      <!-- Cards por Assunto -->
      <div
        class="stat-card subject-card orcamento-card"
        :class="{ active: filterAssunto === 'orcamento' }"
        @click="filterBySubject('orcamento')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper orcamento-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="stat-badge orcamento-badge">Orçamento</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.byAssunto?.orcamento || 0 }}</h3>
          <p class="stat-label">Solicitações</p>
        </div>
      </div>

      <div
        class="stat-card subject-card duvida-card"
        :class="{ active: filterAssunto === 'duvida' }"
        @click="filterBySubject('duvida')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper duvida-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <div class="stat-badge duvida-badge">Dúvidas</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.byAssunto?.duvida || 0 }}</h3>
          <p class="stat-label">Questões</p>
        </div>
      </div>

      <div
        class="stat-card subject-card parceria-card"
        :class="{ active: filterAssunto === 'parceria' }"
        @click="filterBySubject('parceria')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper parceria-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="stat-badge parceria-badge">Parceria</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.byAssunto?.parceria || 0 }}</h3>
          <p class="stat-label">Propostas</p>
        </div>
      </div>

      <div
        class="stat-card subject-card outro-card"
        :class="{ active: filterAssunto === 'outro' }"
        @click="filterBySubject('outro')"
      >
        <div class="stat-header">
          <div class="stat-icon-wrapper outro-icon">
            <i class="fas fa-inbox"></i>
          </div>
          <div class="stat-badge outro-badge">Outros</div>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.byAssunto?.outro || 0 }}</h3>
          <p class="stat-label">Diversos</p>
        </div>
      </div>
    </div>

    <!-- Header com Ações -->
    <div class="section-header">
      <div class="header-title">
        <h2>
          <i class="fas fa-inbox"></i>
          Gerenciamento de Contatos
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
          :disabled="selectedContacts.length === 0"
          v-if="selectedContacts.length > 0"
        >
          <i class="fas fa-check"></i>
          Marcar como Lido ({{ selectedContacts.length }})
        </button>
        <button
          class="btn-danger"
          @click="deleteSelected"
          :disabled="selectedContacts.length === 0"
          v-if="selectedContacts.length > 0"
        >
          <i class="fas fa-trash"></i>
          Excluir ({{ selectedContacts.length }})
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
          placeholder="Buscar por nome, email ou mensagem..."
          @input="handleSearch"
        />
      </div>

      <div class="filter-select">
        <i class="fas fa-tag"></i>
        <select v-model="filterAssunto" @change="applyFilters">
          <option value="">Todos os assuntos</option>
          <option value="orcamento">Orçamento</option>
          <option value="duvida">Dúvida</option>
          <option value="parceria">Parceria</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div class="filter-select">
        <i class="fas fa-filter"></i>
        <select v-model="filterStatus" @change="applyFilters">
          <option value="">Todos os status</option>
          <option value="unread">Não lidos</option>
          <option value="read">Lidos</option>
          <option value="responded">Respondidos</option>
          <option value="pending">Pendentes</option>
        </select>
      </div>

      <button
        class="btn-clear-filters"
        @click="clearFilters"
        v-if="searchQuery || filterAssunto || filterStatus"
      >
        <i class="fas fa-times"></i> Limpar Filtros
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Carregando contatos...</p>
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
    <div v-else class="contacts-content">
      <div class="table-container">
        <table class="contacts-table">
          <thead>
            <tr>
              <th width="50">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                />
              </th>
              <th width="80">Status</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Assunto</th>
              <th width="140">Data</th>
              <th width="150">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contact in contacts"
              :key="contact._id"
              :class="{ 'is-unread': !contact.lido, 'clickable-row': true }"
              @click="handleRowClick($event, contact)"
            >
              <td @click.stop>
                <input
                  type="checkbox"
                  v-model="selectedContacts"
                  :value="contact"
                />
              </td>
              <td @click.stop>
                <div class="status-indicators">
                  <span
                    class="status-dot"
                    :class="contact.lido ? 'read' : 'unread'"
                    :title="contact.lido ? 'Lido' : 'Não lido'"
                  ></span>
                  <span
                    v-if="contact.respondido"
                    class="status-icon responded"
                    title="Respondido"
                  >
                    <i class="fas fa-reply"></i>
                  </span>
                </div>
              </td>
              <td class="contact-name">
                <div class="name-wrapper">
                  <strong>{{ contact.nome }}</strong>
                  <span v-if="contact.empresa" class="company-tag">{{
                    contact.empresa
                  }}</span>
                </div>
              </td>
              <td>
                <a :href="`mailto:${contact.email}`" class="email-link">
                  <i class="fas fa-envelope"></i>
                  {{ contact.email }}
                </a>
              </td>
              <td>
                <span class="subject-badge" :class="`subject-${contact.assunto}`">
                  <i :class="getSubjectIcon(contact.assunto)"></i>
                  {{ formatSubject(contact.assunto) }}
                </span>
              </td>
              <td class="date-cell">
                {{ formatDate(contact.createdAt) }}
              </td>
              <td class="actions-cell" @click.stop>
                <button
                  class="action-btn view"
                  @click="viewContact(contact)"
                  title="Ver detalhes"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  class="action-btn email"
                  @click="replyEmail(contact)"
                  title="Responder email"
                >
                  <i class="fas fa-reply"></i>
                </button>
                <button
                  v-if="!contact.lido"
                  class="action-btn mark-read"
                  @click="markAsRead(contact)"
                  title="Marcar como lido"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="deleteContact(contact._id)"
                  :disabled="deletingId === contact._id"
                  title="Excluir"
                >
                  <i
                    class="fas fa-trash"
                    :class="{ 'fa-spin': deletingId === contact._id }"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="contacts.length === 0 && !loading" class="empty-state">
          <i class="fas fa-inbox"></i>
          <h3 v-if="isFiltering">Nenhum contato encontrado</h3>
          <h3 v-else>Nenhuma mensagem recebida</h3>
          <p v-if="isFiltering">
            Tente ajustar seus filtros de busca ou clique em "Limpar Filtros".
          </p>
          <p v-else>Ainda não há mensagens de contato para exibir.</p>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <transition name="modal">
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <div class="modal-title">
              <i class="fas fa-envelope-open-text"></i>
              <h3>Detalhes da Mensagem</h3>
            </div>
            <button @click="closeModal" class="close-button">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body" v-if="selectedContact">
            <div class="contact-details">
              <div class="detail-row">
                <div class="detail-item">
                  <label><i class="fas fa-user"></i> Nome</label>
                  <p>{{ selectedContact.nome }}</p>
                </div>
                <div class="detail-item">
                  <label><i class="fas fa-envelope"></i> Email</label>
                  <p>
                    <a :href="`mailto:${selectedContact.email}`">{{
                      selectedContact.email
                    }}</a>
                  </p>
                </div>
              </div>

              <div class="detail-row">
                <div class="detail-item" v-if="selectedContact.telefone">
                  <label><i class="fas fa-phone"></i> Telefone</label>
                  <p>{{ selectedContact.telefone }}</p>
                </div>
                <div class="detail-item" v-if="selectedContact.empresa">
                  <label><i class="fas fa-building"></i> Empresa</label>
                  <p>{{ selectedContact.empresa }}</p>
                </div>
              </div>

              <div class="detail-row">
                <div class="detail-item full-width">
                  <label><i class="fas fa-tag"></i> Assunto</label>
                  <p>
                    <span
                      class="subject-badge"
                      :class="`subject-${selectedContact.assunto}`"
                    >
                      <i :class="getSubjectIcon(selectedContact.assunto)"></i>
                      {{ formatSubject(selectedContact.assunto) }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="detail-row">
                <div class="detail-item full-width">
                  <label><i class="fas fa-comment-alt"></i> Mensagem</label>
                  <div class="message-content">
                    {{ selectedContact.mensagem }}
                  </div>
                </div>
              </div>

              <div class="detail-row meta-info">
                <div class="detail-item">
                  <label><i class="fas fa-calendar"></i> Recebido em</label>
                  <p>{{ formatDateFull(selectedContact.createdAt) }}</p>
                </div>
                <div class="detail-item">
                  <label><i class="fas fa-info-circle"></i> Status</label>
                  <p>
                    <span
                      class="status-badge"
                      :class="getStatusClass(selectedContact)"
                    >
                      {{ getStatusText(selectedContact) }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="closeModal" class="btn-secondary">
              <i class="fas fa-times"></i>
              Fechar
            </button>
            <button
              v-if="selectedContact && !selectedContact.respondido"
              @click="markAsRespondedAndReply(selectedContact)"
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
import contactService from "@/services/contactService";

export default {
  name: "ContactManagement",
  data() {
    return {
      contacts: [],
      selectedContacts: [],
      stats: {
        total: 0,
        lidos: 0,
        naoLidos: 0,
        respondidos: 0,
        naoRespondidos: 0,
        byAssunto: {
          orcamento: 0,
          duvida: 0,
          parceria: 0,
          outro: 0,
        },
      },
      selectAll: false,
      loading: false,
      deletingId: null,
      error: null,
      searchQuery: "",
      filterAssunto: "",
      filterStatus: "",
      activeFilter: null,
      searchTimeout: null,
      isModalVisible: false,
      selectedContact: null,
    };
  },
  computed: {
    isFiltering() {
      return !!this.searchQuery || !!this.filterAssunto || !!this.filterStatus;
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
        await this.fetchContacts();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        this.error = this.getErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchContacts() {
      try {
        const params = {
          search: this.searchQuery || undefined,
          assunto: this.filterAssunto || undefined,
        };

        if (this.filterStatus === "unread") params.lido = false;
        if (this.filterStatus === "read") params.lido = true;
        if (this.filterStatus === "responded") params.respondido = true;
        if (this.filterStatus === "pending") params.respondido = false;

        const response = await contactService.listAll(params);

        console.log("=== DEBUG RESPONSE ===");
        console.log("response:", response);
        console.log("response.data:", response.data);
        console.log("response.data.data:", response.data?.data);
        console.log("===================");

        // Tentar múltiplas formas de pegar os dados
        let contactsData = null;

        // Forma 1: response.data.data (se o service retornar response.data)
        if (response.data?.data && Array.isArray(response.data.data)) {
          contactsData = response.data.data;
          console.log("✅ Dados encontrados em response.data.data");
        }
        // Forma 2: response.data (se o service retornar só os dados)
        else if (response.data && Array.isArray(response.data)) {
          contactsData = response.data;
          console.log("✅ Dados encontrados em response.data");
        }
        // Forma 3: response (se vier direto)
        else if (Array.isArray(response)) {
          contactsData = response;
          console.log("✅ Dados encontrados em response");
        }

        // Garantir que contacts é sempre um array
        if (contactsData && Array.isArray(contactsData)) {
          this.contacts = contactsData;
          console.log(`✅ ${this.contacts.length} contatos carregados com sucesso`);
        } else {
          console.error("❌ Nenhum formato de dados válido encontrado");
          console.error("Estrutura da response:", JSON.stringify(response, null, 2));
          this.contacts = [];
        }

        // Ordenar por data (mais recentes primeiro)
        if (this.contacts.length > 0) {
          this.contacts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
        this.contacts = []; // Garantir que seja array mesmo em erro
        throw error;
      }
    },

    async fetchStats() {
      try {
        const response = await contactService.getStats();
        this.stats = response.data || response;
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        // Se falhar, calcular stats localmente
        this.calculateLocalStats();
      }
    },

    calculateLocalStats() {
      const all = this.contacts;
      this.stats = {
        total: all.length,
        lidos: all.filter((c) => c.lido).length,
        naoLidos: all.filter((c) => !c.lido).length,
        respondidos: all.filter((c) => c.respondido).length,
        naoRespondidos: all.filter((c) => !c.respondido).length,
        byAssunto: {
          orcamento: all.filter((c) => c.assunto === "orcamento").length,
          duvida: all.filter((c) => c.assunto === "duvida").length,
          parceria: all.filter((c) => c.assunto === "parceria").length,
          outro: all.filter((c) => c.assunto === "outro").length,
        },
      };
    },

    async deleteContact(id) {
      if (!id || !confirm("Tem certeza que deseja excluir esta mensagem?")) {
        return;
      }

      this.deletingId = id;
      try {
        await contactService.delete(id);
        this.contacts = this.contacts.filter((contact) => contact._id !== id);
        this.stats.total--;
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao excluir contato:", error);
        this.error = "Falha ao excluir o contato. " + this.getErrorMessage(error);
      } finally {
        this.deletingId = null;
      }
    },

    async deleteSelected() {
      if (
        !confirm(
          `Tem certeza que deseja excluir ${this.selectedContacts.length} mensagens?`
        )
      ) {
        return;
      }

      this.loading = true;
      try {
        const ids = this.selectedContacts.map((c) => c._id);
        await contactService.bulkDelete(ids);
        this.selectedContacts = [];
        await this.fetchData();
      } catch (error) {
        console.error("Erro ao excluir múltiplos contatos:", error);
        this.error = "Falha ao excluir contatos selecionados.";
      } finally {
        this.loading = false;
      }
    },

    async markAsRead(contact) {
      try {
        await contactService.markAsRead(contact._id);
        contact.lido = true;
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao marcar como lido:", error);
      }
    },

    async markSelectedAsRead() {
      this.loading = true;
      try {
        const ids = this.selectedContacts.map((c) => c._id);
        await contactService.bulkMarkAsRead(ids);
        this.selectedContacts.forEach((c) => (c.lido = true));
        this.selectedContacts = [];
        await this.fetchStats();
      } catch (error) {
        console.error("Erro ao marcar múltiplos como lidos:", error);
        this.error = "Falha ao marcar contatos como lidos.";
      } finally {
        this.loading = false;
      }
    },

    handleRowClick(event, contact) {
      // Não abrir o modal se clicou em checkbox ou botões de ação
      const target = event.target;
      if (
        target.closest("input[type='checkbox']") ||
        target.closest(".action-btn") ||
        target.closest(".actions-cell")
      ) {
        return;
      }
      this.viewContact(contact);
    },

    viewContact(contact) {
      this.selectedContact = contact;
      this.isModalVisible = true;
      if (!contact.lido) {
        this.markAsRead(contact);
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.selectedContact = null;
    },

    replyEmail(contact) {
      const subject = `Re: ${contact.assunto || "Sua mensagem"}`;
      const body = `Olá ${contact.nome},\n\nObrigado por entrar em contato!\n\nEm relação à sua mensagem:\n"${contact.mensagem}"\n\n[Escreva sua resposta aqui]\n\nAtenciosamente,\n[Seu Nome]`;

      window.open(
        `mailto:${contact.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      // Marcar como respondido
      contactService.markAsResponded(contact._id);
      contact.respondido = true;
      this.fetchStats();
    },

    async markAsRespondedAndReply(contact) {
      this.replyEmail(contact);
      this.closeModal();
    },

    toggleSelectAll() {
      this.selectedContacts = this.selectAll ? [...this.contacts] : [];
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.applyFilters();
      }, 500);
    },

    applyFilters() {
      this.fetchContacts();
    },

    clearFilters() {
      this.searchQuery = "";
      this.filterAssunto = "";
      this.filterStatus = "";
      this.activeFilter = null;
      this.applyFilters();
    },

    filterByStatus(status) {
      this.filterStatus = status;
      this.activeFilter = status;
      this.applyFilters();
    },

    filterBySubject(subject) {
      // Se clicar no mesmo assunto, remove o filtro (toggle)
      if (this.filterAssunto === subject) {
        this.filterAssunto = "";
        this.activeFilter = null;
      } else {
        this.filterAssunto = subject;
        this.activeFilter = subject;
      }
      this.applyFilters();
    },

    getFilterName() {
      if (this.filterAssunto) {
        return this.formatSubject(this.filterAssunto);
      }
      if (this.filterStatus) {
        const names = {
          unread: "Não lidos",
          read: "Lidos",
          responded: "Respondidos",
          pending: "Pendentes",
        };
        return names[this.filterStatus];
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

    formatSubject(subject) {
      const subjects = {
        orcamento: "Orçamento",
        duvida: "Dúvida",
        parceria: "Parceria",
        outro: "Outro",
      };
      return subjects[subject] || subject || "Sem assunto";
    },

    getSubjectIcon(subject) {
      const icons = {
        orcamento: "fas fa-dollar-sign",
        duvida: "fas fa-question-circle",
        parceria: "fas fa-handshake",
        outro: "fas fa-inbox",
      };
      return icons[subject] || "fas fa-envelope";
    },

    getStatusClass(contact) {
      if (contact.respondido) return "responded";
      if (contact.lido) return "read";
      return "unread";
    },

    getStatusText(contact) {
      if (contact.respondido) return "Respondido";
      if (contact.lido) return "Lido";
      return "Não lido";
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
    selectedContacts(newVal) {
      this.selectAll =
        newVal.length === this.contacts.length && this.contacts.length > 0;
    },
  },
};
</script>

<style scoped>
.contact-management {
  padding: 20px;
  background: transparent;
  min-height: 100vh;
}

/* Stats Grid - Design Moderno */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 1400px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
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

.orcamento-icon {
  background: linear-gradient(135deg, #fa709a, #fee140);
}

.duvida-icon {
  background: linear-gradient(135deg, #30cfd0, #330867);
}

.parceria-icon {
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  color: #764ba2;
}

.outro-icon {
  background: linear-gradient(135deg, #d299c2, #fef9d7);
  color: #764ba2;
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

.orcamento-badge {
  background: #fef3c7;
  color: #b45309;
}

.duvida-badge {
  background: #dbeafe;
  color: #1e40af;
}

.parceria-badge {
  background: #fce7f3;
  color: #be185d;
}

.outro-badge {
  background: #f3f4f6;
  color: #6b7280;
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

.stat-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
  font-size: 13px;
  color: #94a3b8;
}

.stat-footer i {
  font-size: 14px;
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
  color: #6366f1;
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
.btn-danger {
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

.btn-primary:disabled,
.btn-secondary:disabled,
.btn-danger:disabled {
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
.contacts-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.contacts-table th,
.contacts-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

.contacts-table th {
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

.contacts-table tbody tr {
  transition: all 0.3s ease;
}

.contacts-table tbody tr.clickable-row {
  cursor: pointer;
}

.contacts-table tbody tr:hover {
  background: #f0f4ff;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.contacts-table tbody tr.is-unread {
  background: #fef3f2;
  font-weight: 600;
}

.contacts-table tbody tr.is-unread:hover {
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

.contact-name {
  font-weight: 600;
  color: #1e293b;
}

.name-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.company-tag {
  font-size: 12px;
  color: #64748b;
  font-weight: 400;
}

.email-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.email-link:hover {
  text-decoration: underline;
}

.subject-badge {
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

.subject-badge.subject-orcamento {
  background: #fef3c7;
  color: #b45309;
}

.subject-badge.subject-duvida {
  background: #dbeafe;
  color: #1e40af;
}

.subject-badge.subject-parceria {
  background: #fce7f3;
  color: #be185d;
}

.subject-badge.subject-outro {
  background: #f3f4f6;
  color: #6b7280;
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
  max-width: 700px;
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
  color: #6366f1;
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

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.detail-row.meta-info {
  border-top: 2px solid #f1f5f9;
  padding-top: 20px;
  margin-top: 10px;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-item label i {
  color: #6366f1;
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

.message-content {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  white-space: pre-wrap;
  line-height: 1.8;
  color: #334155;
  font-size: 14px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.unread {
  background: #fef2f2;
  color: #dc2626;
}

.status-badge.read {
  background: #eff6ff;
  color: #2563eb;
}

.status-badge.responded {
  background: #f0fdf4;
  color: #16a34a;
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
