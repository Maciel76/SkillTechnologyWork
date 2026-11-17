<template>
  <div class="mcp-integration">
    <div class="section-header"><div><h2>Integrações</h2><p>Conecte seus chats ao conteúdo do site pelo protocolo MCP.</p></div></div>
    <section class="mcp-box"><h3>Skill Technology MCP</h3><p>Projetos, blog, produtos e desenvolvedores disponíveis nos seus clientes de IA.</p><label for="mcp-endpoint">Endereço do servidor</label><div class="mcp-address"><input id="mcp-endpoint" :value="endpoint" readonly /><button class="btn-primary" @click="copyEndpoint">{{ copied ? 'Copiado' : 'Copiar' }}</button></div><ol><li>Adicione este endereço como servidor MCP no seu cliente de IA.</li><li>Escolha autenticação OAuth e entre com a conta deste painel.</li><li>Confira as permissões e autorize a conexão.</li></ol><p class="mcp-note">Novos conteúdos começam como rascunho ou perfil oculto. Publicações podem ser solicitadas ao chat.</p></section>
    <section class="mcp-box"><div class="mcp-heading"><div><h3>Conexões autorizadas</h3><p>Revogue uma conexão para interromper o acesso desse aplicativo.</p></div><button class="btn-secondary" :disabled="loading" @click="loadConnections">Atualizar</button></div><p v-if="error" class="mcp-error" role="alert">{{ error }}</p><p v-if="loading" role="status">Carregando conexões…</p><p v-else-if="!connections.length && !error" class="mcp-empty">Nenhum chat conectado. Use o endereço acima para começar.</p><ul v-else class="mcp-connections"><li v-for="connection in connections" :key="connection.id"><div><strong>{{ connection.name }}</strong><p>{{ connection.scopes.includes('content:write') ? 'Consultar, criar e editar conteúdo' : 'Consultar conteúdo' }}</p><small>Autorizado em {{ date(connection.createdAt) }}. Expira em {{ date(connection.expiresAt) }}.</small></div><button class="mcp-revoke" :disabled="revoking === connection.id" @click="revoke(connection)">{{ revoking === connection.id ? 'Revogando…' : 'Revogar' }}</button></li></ul></section>
  </div>
</template>
<script>
export default {
  name: 'McpIntegration',
  data: () => ({ endpoint: `${window.location.origin}/mcp`, copied: false, connections: [], loading: false, error: '', revoking: null }),
  mounted() { this.loadConnections(); },
  methods: {
    async request(path, options = {}) {
      const response = await fetch(`/mcp-auth/admin/${path}`, { ...options, headers: { Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, ...options.headers } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível carregar as conexões.');
      return data;
    },
    async loadConnections() {
      this.loading = true; this.error = '';
      try { const data = await this.request('connections'); this.connections = data.connections; this.endpoint = data.endpoint; }
      catch (error) { this.error = error.message; }
      finally { this.loading = false; }
    },
    async copyEndpoint() { try { await navigator.clipboard.writeText(this.endpoint); this.copied = true; } catch { this.error = 'Selecione e copie o endereço acima.'; } },
    date(seconds) { return new Date(seconds * 1000).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }); },
    async revoke(connection) {
      if (!window.confirm(`Revogar o acesso de ${connection.name}? O aplicativo precisará ser autorizado novamente.`)) return;
      this.revoking = connection.id; this.error = '';
      try { await this.request(`connections/${connection.id}/revoke`, { method: 'POST' }); this.connections = this.connections.filter(item => item.id !== connection.id); }
      catch (error) { this.error = error.message; }
      finally { this.revoking = null; }
    },
  },
};
</script>
<style scoped>
.mcp-box{background:#fff;border:1px solid #e4e9f1;border-radius:12px;padding:26px;margin-bottom:22px}.mcp-box h3{font-size:17px;color:#28364a;margin:0 0 8px}.mcp-box p{color:#637187;font-size:13px}.mcp-box label{display:block;margin:22px 0 8px;font-size:12px;font-weight:600}.mcp-address{display:flex;gap:12px}.mcp-address input{width:100%;min-width:0;border:1px solid #dce3ee;background:#f7f9fc;padding:12px;border-radius:7px;color:#38465a}.mcp-box ol{padding-left:20px;font-size:13px;color:#566479;margin:22px 0}.mcp-box li{margin:10px 0}.mcp-note{background:#edf3ff;border-radius:8px;padding:13px}.mcp-heading{display:flex;justify-content:space-between;gap:20px;align-items:center}.mcp-empty{padding:25px 0}.mcp-connections{list-style:none;padding:0}.mcp-connections li{padding:20px 0;border-top:1px solid #e4e9f1;display:flex;justify-content:space-between;align-items:center;gap:16px}.mcp-connections small{color:#69768a;font-size:11px}.mcp-revoke{background:#fff4f4;color:#b33442;border:1px solid #f1d1d5;border-radius:7px;padding:9px 14px}.mcp-error{color:#af313c!important;margin:15px 0}@media(max-width:600px){.mcp-box{padding:20px}.mcp-address{flex-direction:column}.mcp-heading{align-items:flex-start}.mcp-connections li{align-items:flex-start;flex-direction:column}}
</style>
