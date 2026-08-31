<template>
  <div class="ai-integration">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2><i class="fas fa-robot"></i> Integração de IA</h2>
        <p class="subtitle">
          Adicione a chave da API da DeepSeek e escolha o modelo do sistema
        </p>
      </div>
      <div class="header-actions">
        <button
          class="btn-secondary"
          @click="testar"
          :disabled="loading || saving || testando || !apiKeyConfigured"
        >
          <i class="fas" :class="testando ? 'fa-spinner fa-spin' : 'fa-plug'"></i>
          {{ testando ? "Testando..." : "Testar conexão" }}
        </button>
        <button class="btn-primary" @click="save" :disabled="loading || saving">
          <i class="fas fa-save"></i> {{ saving ? "Salvando..." : "Salvar" }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando configuração...</p>
    </div>

    <template v-else>
      <!-- Alertas -->
      <div v-if="erro" class="alert alert-danger">
        <i class="fas fa-circle-exclamation"></i> {{ erro }}
      </div>
      <div v-if="sucesso" class="alert alert-success">
        <i class="fas fa-circle-check"></i> {{ sucesso }}
      </div>

      <!-- Chave da API -->
      <div class="card">
        <h3><i class="fas fa-key"></i> Chave da API</h3>
        <p class="card-hint">
          Gere a chave em
          <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">
            platform.deepseek.com/api_keys </a
          >. Ela fica salva no servidor e não é exibida de volta.
        </p>

        <div v-if="apiKeyConfigured" class="key-status">
          <span class="key-mask">
            <i class="fas fa-circle-check"></i> {{ apiKeyMask }}
          </span>
          <button class="btn-link" @click="removerChave" :disabled="removendo">
            {{ removendo ? "Removendo..." : "Remover" }}
          </button>
        </div>

        <div class="key-input">
          <input
            :type="mostrarChave ? 'text' : 'password'"
            v-model="apiKey"
            :placeholder="
              apiKeyConfigured
                ? 'Cole uma nova chave para substituir'
                : 'sk-...'
            "
            autocomplete="off"
          />
          <button
            class="btn-eye"
            type="button"
            @click="mostrarChave = !mostrarChave"
            :title="mostrarChave ? 'Ocultar' : 'Mostrar'"
          >
            <i class="fas" :class="mostrarChave ? 'fa-eye-slash' : 'fa-eye'"></i>
          </button>
        </div>
        <small class="field-hint">
          Deixe em branco para manter a chave que já está salva.
        </small>
      </div>

      <!-- Modelo -->
      <div class="card">
        <h3><i class="fas fa-microchip"></i> Modelo</h3>
        <p class="card-hint">Escolha qual modelo da DeepSeek o sistema vai usar.</p>

        <div class="model-grid">
          <div
            v-for="m in models"
            :key="m.id"
            class="model-card"
            :class="{ selected: modelId === m.id }"
            @click="modelId = m.id"
          >
            <div class="model-head">
              <span class="model-name">{{ m.name }}</span>
              <i
                v-if="modelId === m.id"
                class="fas fa-circle-check model-check"
              ></i>
            </div>
            <code class="model-id">{{ m.id }}</code>
            <p class="model-desc">{{ m.description }}</p>
            <div class="model-badges">
              <span v-if="m.vision" class="badge badge-vision">
                <i class="fas fa-image"></i> Visão
              </span>
              <span v-if="m.experimental" class="badge badge-exp">
                <i class="fas fa-flask"></i> Experimental
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultado do teste -->
      <div v-if="testeResultado" class="card teste-card">
        <h3><i class="fas fa-circle-check"></i> Conexão validada</h3>
        <div class="teste-info">
          <span><strong>Modelo:</strong> {{ testeResultado.model }}</span>
          <span><strong>Latência:</strong> {{ testeResultado.latenciaMs }}ms</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import aiService from "@/services/aiService";

export default {
  name: "AiIntegration",
  data() {
    return {
      loading: true,
      saving: false,
      testando: false,
      removendo: false,
      erro: null,
      sucesso: null,
      models: [],
      modelId: "deepseek-v4-flash",
      apiKey: "",
      apiKeyMask: "",
      apiKeyConfigured: false,
      mostrarChave: false,
      testeResultado: null,
    };
  },
  mounted() {
    this.loadConfig();
  },
  methods: {
    limparAvisos() {
      this.erro = null;
      this.sucesso = null;
    },
    aplicar(data) {
      if (data.modelId !== undefined) this.modelId = data.modelId;
      this.apiKeyConfigured = data.apiKeyConfigured;
      this.apiKeyMask = data.apiKeyMask;
    },
    async loadConfig() {
      this.loading = true;
      this.limparAvisos();
      try {
        const data = await aiService.getConfig();
        this.models = data.models || [];
        this.aplicar(data);
      } catch (error) {
        this.erro = error.message;
      } finally {
        this.loading = false;
      }
    },
    async save() {
      this.saving = true;
      this.limparAvisos();
      try {
        const data = await aiService.updateConfig({
          modelId: this.modelId,
          apiKey: this.apiKey,
        });
        this.aplicar(data);
        this.apiKey = "";
        this.mostrarChave = false;
        this.sucesso = "Configuração salva.";
      } catch (error) {
        this.erro = error.message;
      } finally {
        this.saving = false;
      }
    },
    async removerChave() {
      this.removendo = true;
      this.limparAvisos();
      this.testeResultado = null;
      try {
        const data = await aiService.removeKey();
        this.aplicar(data);
        this.sucesso = "Chave removida.";
      } catch (error) {
        this.erro = error.message;
      } finally {
        this.removendo = false;
      }
    },
    async testar() {
      this.testando = true;
      this.limparAvisos();
      this.testeResultado = null;
      try {
        this.testeResultado = await aiService.testConnection();
        this.sucesso = "Conexão com a DeepSeek funcionando.";
      } catch (error) {
        this.erro = error.message;
      } finally {
        this.testando = false;
      }
    },
  },
};
</script>

<style scoped>
.ai-integration {
  padding: 8px 0;
}

/* Header */
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

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-primary,
.btn-secondary {
  border: none;
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

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--gray-200);
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Estados */
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

.alert-success {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

/* Cards */
.card {
  background: white;
  border-radius: var(--border-radius);
  padding: 22px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
}

.card h3 {
  font-size: 1.05rem;
  color: var(--gray-800);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.card h3 i {
  color: var(--primary);
}

.card-hint {
  font-size: 13px;
  color: var(--gray-500);
  margin-bottom: 16px;
}

.card-hint a {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.card-hint a:hover {
  text-decoration: underline;
}

/* Chave */
.key-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: var(--border-radius-sm);
  padding: 10px 14px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.key-mask {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13.5px;
  color: #15803d;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-link {
  background: none;
  border: none;
  color: var(--danger);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
}

.btn-link:hover:not(:disabled) {
  text-decoration: underline;
}

.btn-link:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.key-input {
  display: flex;
  gap: 8px;
}

.key-input input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius-sm);
  font-size: 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: var(--gray-800);
}

.key-input input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn-eye {
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  color: var(--gray-600);
  width: 46px;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.3s;
}

.btn-eye:hover {
  background: var(--gray-200);
}

.field-hint {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: var(--gray-500);
}

/* Modelos */
.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
}

.model-card {
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius-sm);
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s;
  background: var(--gray-50);
}

.model-card:hover {
  border-color: var(--primary-light);
  transform: translateY(-2px);
}

.model-card.selected {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.06);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.model-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.model-name {
  font-weight: 700;
  color: var(--gray-900);
  font-size: 14.5px;
}

.model-check {
  color: var(--primary);
}

.model-id {
  display: inline-block;
  margin: 6px 0 8px;
  font-size: 12px;
  background: var(--gray-200);
  color: var(--gray-700);
  padding: 2px 7px;
  border-radius: 5px;
}

.model-desc {
  font-size: 13px;
  color: var(--gray-600);
  line-height: 1.5;
}

.model-badges {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-vision {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-exp {
  background: #fef3c7;
  color: #b45309;
}

/* Teste */
.teste-card h3 i {
  color: var(--success);
}

.teste-info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 14px;
  color: var(--gray-700);
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions button {
    flex: 1;
    justify-content: center;
  }
}
</style>
