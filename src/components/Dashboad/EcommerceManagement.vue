<template>
  <div class="ecommerce-management">
    <div class="section-header">
      <h2>Gerenciamento da Loja</h2>
      <button class="btn-primary">
        <i class="fas fa-plus"></i> Novo Produto
      </button>
    </div>

    <div class="ecommerce-stats">
      <div class="ecommerce-stat">
        <h3>R$ 8.450</h3>
        <p>Vendas do Mês</p>
      </div>
      <div class="ecommerce-stat">
        <h3>42</h3>
        <p>Pedidos Pendentes</p>
      </div>
      <div class="ecommerce-stat">
        <h3>156</h3>
        <p>Produtos em Estoque</p>
      </div>
      <div class="ecommerce-stat">
        <h3>4.8</h3>
        <p>Avaliação Média</p>
      </div>
    </div>

    <div class="products-table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="product-info">
                <img :src="product.image" :alt="product.name" />
                <span>{{ product.name }}</span>
              </div>
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.category }}</td>
            <td>
              <span class="status-badge" :class="product.status">{{
                product.status
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
  name: "EcommerceManagement",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Template Corporativo",
          price: "R$ 299",
          stock: 15,
          category: "Templates",
          status: "ativo",
          image: "https://via.placeholder.com/40",
        },
        {
          id: 2,
          name: "Plugin WordPress",
          price: "R$ 89",
          stock: 42,
          category: "Plugins",
          status: "ativo",
          image: "https://via.placeholder.com/40",
        },
        {
          id: 3,
          name: "Curso Vue.js",
          price: "R$ 497",
          stock: 0,
          category: "Cursos",
          status: "esgotado",
          image: "https://via.placeholder.com/40",
        },
        {
          id: 4,
          name: "E-book Design",
          price: "R$ 49",
          stock: 28,
          category: "E-books",
          status: "ativo",
          image: "https://via.placeholder.com/40",
        },
      ],
    };
  },
};
</script>

<style scoped>
.ecommerce-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.ecommerce-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.ecommerce-stat {
  background: white;
  border-radius: var(--border-radius);
  padding: 28px 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ecommerce-stat:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.ecommerce-stat h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.ecommerce-stat p {
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.products-table-container {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--border-radius);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-info img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid var(--gray-100);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .ecommerce-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .data-table {
    font-size: 13px;
  }

  .data-table th,
  .data-table td {
    padding: 12px 10px;
  }
}

@media (max-width: 480px) {
  .ecommerce-stats {
    grid-template-columns: 1fr;
  }
}
</style>
