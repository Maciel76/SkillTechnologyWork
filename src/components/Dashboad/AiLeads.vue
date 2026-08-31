<template>
  <div class="ai-leads">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2><i class="fas fa-user-tie"></i> Leads da IA</h2>
        <p class="subtitle">
          Contatos que o Assistente SkillTechnology captou nas conversas do site
        </p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="carregar" :disabled="loading">
          <i class="fas fa-rotate"></i> Recarregar
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando leads...</p>
    </div>

    <template v-else>
      <div v-if="erro" class="alert alert-danger">
        <i class="fas fa-circle-exclamation"></i> {{ erro }}
      </div>

      <!-- Números -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total"><i class="fas fa-inbox"></i></div>
          <div>
            <span class="stat-value">{{ stats.total }}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon novo"><i class="fas fa-star"></i></div>
          <div>
            <span class="stat-value">{{ stats.novos }}</span>
            <span class="stat-label">Novos</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon contatado"><i class="fas fa-phone"></i></div>
          <div>
            <span class="stat-value">{{ stats.contatados }}</span>
            <span class="stat-label">Contatados</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon fechado"><i class="fas fa-handshake"></i></div>
          <div>
            <span class="stat-value">{{ stats.fechados }}</span>
            <span class="stat-label">Fechados</span>
          </div>
        </div>
      </div>

      <!-- Filtro -->
      <div class="filtros">
        <button
          v-for="f in filtros"
          :key="f.valor"
          class="filtro"
          :class="{ ativo: statusFiltro === f.valor }"
          @click="trocarFiltro(f.valor)"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Lista -->
      <div v-if="!leads.length" class="vazio">
        <i class="fas fa-comments"></i>
        <h3>Nenhum lead ainda</h3>
        <p>
          Quando um visitante deixar e-mail ou telefone na conversa do site, ele
          aparece aqui automaticamente.
        </p>
      </div>

      <div v-else class="lista">
        <div v-for="lead in leads" :key="lead._id" class="lead-card">
          <div class="lead-topo">
            <div class="lead-identidade">
              <span class="lead-nome">
                <i class="fas fa-user"></i>
                {{ lead.nome || "Visitante sem nome" }}
              </span>
              <span class="badge" :class="'badge-' + lead.status">
                {{ rotuloStatus(lead.status) }}
              </span>
            </div>
            <span class="lead-data">{{ formatarData(lead.createdAt) }}</span>
          </div>

          <div class="lead-contatos">
            <a v-if="lead.email" :href="'mailto:' + lead.email" class="contato">
              <i class="fas fa-envelope"></i> {{ lead.email }}
            </a>
            <a
              v-if="lead.telefone"
              :href="'https://wa.me/' + apenasDigitos(lead.telefone)"
              target="_blank"
              rel="noopener"
              class="contato whats"
            >
              <i class="fab fa-whatsapp"></i> {{ lead.telefone }}
            </a>
            <span v-if="lead.categoria" class="contato neutro">
              <i class="fas fa-tag"></i> {{ lead.categoria }}
            </span>
          </div>

          <p v-if="lead.interesse" class="lead-interesse">
            "{{ lead.interesse }}"
          </p>

          <div class="lead-acoes">
            <select
              class="select-status"
              :value="lead.status"
              @change="mudarStatus(lead, $event.target.value)"
            >
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="fechado">Fechado</option>
              <option value="descartado">Descartado</option>
            </select>

            <button class="btn-link" @click="alternarConversa(lead._id)">
              <i
                class="fas"
                :class="
                  abertos[lead._id] ? 'fa-chevron-up' : 'fa-chevron-down'
                "
              ></i>
              {{ abertos[lead._id] ? "Ocultar conversa" : "Ver conversa" }}
              ({{ lead.conversa?.length || 0 }})
            </button>

            <button class="btn-danger" @click="remover(lead)">
              <i class="fas fa-trash"></i> Excluir
            </button>
          </div>

          <div v-if="abertos[lead._id]" class="conversa">
            <div
              v-for="(msg, i) in lead.conversa"
              :key="i"
              class="msg"
              :class="msg.role === 'user' ? 'msg-user' : 'msg-bot'"
            >
              <span class="msg-quem">
                {{ msg.role === "user" ? "Visitante" : "Assistente" }}
              </span>
              <p>{{ msg.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import aiService from "@/services/aiService";

export default {
  name: "AiLeads",
  data() {
    return {
      loading: true,
      erro: null,
      leads: [],
      stats: { total: 0, novos: 0, contatados: 0, fechados: 0 },
      statusFiltro: "todos",
      abertos: {},
      filtros: [
        { valor: "todos", label: "Todos" },
        { valor: "novo", label: "Novos" },
        { valor: "contatado", label: "Contatados" },
        { valor: "fechado", label: "Fechados" },
        { valor: "descartado", label: "Descartados" },
      ],
    };
  },
  mounted() {
    this.carregar();
  },
  methods: {
    async carregar() {
      this.loading = true;
      this.erro = null;
      try {
        const data = await aiService.getLeads(this.statusFiltro);
        this.leads = data.leads || [];
        this.stats = data.stats || this.stats;
      } catch (error) {
        this.erro = error.message;
      } finally {
        this.loading = false;
      }
    },
    trocarFiltro(valor) {
      this.statusFiltro = valor;
      this.carregar();
    },
    alternarConversa(id) {
      this.abertos = { ...this.abertos, [id]: !this.abertos[id] };
    },
    async mudarStatus(lead, status) {
      const anterior = lead.status;
      lead.status = status;
      try {
        await aiService.updateLeadStatus(lead._id, status);
        this.atualizarContadores();
      } catch (error) {
        lead.status = anterior;
        this.erro = error.message;
      }
    },
    async remover(lead) {
      const nome = lead.nome || lead.email || lead.telefone || "este lead";
      if (!window.confirm(`Excluir ${nome}? Isso não pode ser desfeito.`)) {
        return;
      }
      try {
        await aiService.deleteLead(lead._id);
        this.leads = this.leads.filter((l) => l._id !== lead._id);
        this.atualizarContadores();
      } catch (error) {
        this.erro = error.message;
      }
    },
    // Recalcula os números sem uma segunda ida ao servidor
    atualizarContadores() {
      const contar = (s) => this.leads.filter((l) => l.status === s).length;
      if (this.statusFiltro === "todos") {
        this.stats = {
          total: this.leads.length,
          novos: contar("novo"),
          contatados: contar("contatado"),
          fechados: contar("fechado"),
        };
      }
    },
    rotuloStatus(status) {
      const mapa = {
        novo: "Novo",
        contatado: "Contatado",
        fechado: "Fechado",
        descartado: "Descartado",
      };
      return mapa[status] || status;
    },
    apenasDigitos(texto) {
      const d = (texto || "").replace(/\D/g, "");
      // wa.me precisa do código do país
      return d.length <= 11 ? `55${d}` : d;
    },
    formatarData(valor) {
      if (!valor) return "";
      const d = new Date(valor);
      return d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.ai-leads {
  padding: 8px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.header-left h2 {
  font-size: 1.5rem;
  color: var(--gray-900);
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-left h2 i {
  color: var(--primary);
}

.subtitle {
  color: var(--gray-500);
  font-size: 14px;
  margin-top: 4px;
}

.btn-secondary {
  border: none;
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 10px 18px;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-secondary:hover:not(:disabled) {
  background: var(--gray-200);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--gray-500);
}

.loading-state i {
  font-size: 32px;
  color: var(--primary);
  margin-bottom: 12px;
}

.alert {
  padding: 14px 16px;
  border-radius: var(--border-radius-sm);
  margin-bottom: 18px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-danger {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

/* Números */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin-bottom: 22px;
}

.stat-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon.total {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}
.stat-icon.novo {
  background: var(--warning);
}
.stat-icon.contatado {
  background: var(--info);
}
.stat-icon.fechado {
  background: var(--success);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: var(--gray-500);
}

/* Filtros */
.filtros {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.filtro {
  border: 1px solid var(--gray-200);
  background: white;
  color: var(--gray-600);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filtro:hover {
  border-color: var(--primary-light);
  color: var(--gray-800);
}

.filtro.ativo {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-color: transparent;
  color: white;
}

/* Vazio */
.vazio {
  background: white;
  border-radius: var(--border-radius);
  padding: 60px 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.vazio i {
  font-size: 40px;
  color: var(--gray-300);
  margin-bottom: 14px;
}

.vazio h3 {
  color: var(--gray-700);
  margin-bottom: 6px;
}

.vazio p {
  color: var(--gray-500);
  font-size: 14px;
  max-width: 420px;
  margin: 0 auto;
}

/* Lista */
.lista {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.lead-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--gray-200);
}

.lead-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.lead-identidade {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.lead-nome {
  font-weight: 700;
  color: var(--gray-900);
  display: flex;
  align-items: center;
  gap: 8px;
}

.lead-nome i {
  color: var(--gray-400);
}

.lead-data {
  font-size: 12.5px;
  color: var(--gray-500);
}

.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.badge-novo {
  background: #fef3c7;
  color: #b45309;
}
.badge-contatado {
  background: #dbeafe;
  color: #1d4ed8;
}
.badge-fechado {
  background: #dcfce7;
  color: #15803d;
}
.badge-descartado {
  background: var(--gray-100);
  color: var(--gray-500);
}

.lead-contatos {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.contato {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--primary);
  text-decoration: none;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  padding: 5px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.contato:hover {
  background: var(--gray-100);
}

.contato.whats {
  color: #15803d;
}

.contato.neutro {
  color: var(--gray-600);
}

.lead-interesse {
  font-size: 14px;
  color: var(--gray-600);
  font-style: italic;
  line-height: 1.55;
  margin-bottom: 12px;
  padding-left: 12px;
  border-left: 3px solid var(--gray-200);
}

.lead-acoes {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.select-status {
  padding: 7px 12px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 13.5px;
  color: var(--gray-700);
  background: white;
  cursor: pointer;
}

.select-status:focus {
  outline: none;
  border-color: var(--primary);
}

.btn-link {
  background: none;
  border: none;
  color: var(--gray-600);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
}

.btn-link:hover {
  background: var(--gray-100);
  color: var(--gray-800);
}

.btn-danger {
  background: none;
  border: none;
  color: var(--danger);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  margin-left: auto;
}

.btn-danger:hover {
  background: #fee2e2;
}

/* Conversa */
.conversa {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 380px;
  overflow-y: auto;
}

.msg {
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 14px;
  line-height: 1.55;
}

.msg-user {
  align-self: flex-end;
  background: rgba(99, 102, 241, 0.1);
  color: var(--gray-800);
}

.msg-bot {
  align-self: flex-start;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  color: var(--gray-700);
}

.msg-quem {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--gray-400);
  margin-bottom: 4px;
}

.msg p {
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
  }

  .btn-danger {
    margin-left: 0;
  }

  .msg {
    max-width: 100%;
  }
}
</style>
