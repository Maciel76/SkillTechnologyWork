<template>
  <div class="leads-management">
    <div class="section-header">
      <h2>Gerenciamento de Leads</h2>
      <button class="btn-primary"><i class="fas fa-plus"></i> Novo Lead</button>
    </div>

    <div class="leads-table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Origem</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.id">
            <td>{{ lead.name }}</td>
            <td>{{ lead.email }}</td>
            <td>{{ lead.phone }}</td>
            <td>{{ lead.source }}</td>
            <td>
              <span class="status-badge" :class="lead.status">{{
                lead.status
              }}</span>
            </td>
            <td>
              <button class="action-btn edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeadsManagement",
  data() {
    return {
      leads: [
        {
          id: 1,
          name: "João Silva",
          email: "joao@email.com",
          phone: "(11) 99999-9999",
          source: "Site",
          status: "novo",
        },
        {
          id: 2,
          name: "Maria Santos",
          email: "maria@email.com",
          phone: "(11) 88888-8888",
          source: "Instagram",
          status: "contatado",
        },
        {
          id: 3,
          name: "Pedro Costa",
          email: "pedro@email.com",
          phone: "(11) 77777-7777",
          source: "Indicação",
          status: "proposta",
        },
        {
          id: 4,
          name: "Ana Oliveira",
          email: "ana@email.com",
          phone: "(11) 66666-6666",
          source: "Facebook",
          status: "fechado",
        },
      ],
    };
  },
};
</script>

<style scoped>
.leads-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.leads-table-container {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--border-radius);
}
</style>
