<template>
  <div class="testimonials-management">
    <div class="section-header">
      <h2>Depoimentos de Clientes</h2>
      <button @click="openModal()" class="btn-primary">
        <i class="fas fa-plus"></i> Novo Depoimento
      </button>
    </div>

    <!-- Grid de Depoimentos -->
    <div v-if="testimonials.length > 0" class="testimonials-grid">
      <div
        class="testimonial-card"
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        :class="{ 'is-pending': !testimonial.approved }"
      >
        <div
          class="testimonial-status-badge"
          :class="testimonial.approved ? 'approved' : 'pending'"
        >
          {{ testimonial.approved ? "Aprovado" : "Pendente" }}
        </div>

        <div class="testimonial-content">
          <p>{{ testimonial.content }}</p>
        </div>
        <div class="testimonial-author">
          <img
            :src="testimonial.avatar"
            @error="onImageError"
            :alt="testimonial.name"
          />
          <div class="author-info">
            <h4>{{ testimonial.name }}</h4>
            <span>{{ testimonial.position }}</span>
          </div>
        </div>
        <div class="testimonial-actions">
          <button
            @click="toggleApproval(testimonial)"
            class="action-btn approve"
            :title="testimonial.approved ? 'Marcar como Pendente' : 'Aprovar'"
          >
            <i
              :class="
                testimonial.approved
                  ? 'fas fa-times-circle'
                  : 'fas fa-check-circle'
              "
            ></i>
          </button>
          <button
            @click="openModal(testimonial)"
            class="action-btn edit"
            title="Editar"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            @click="confirmDelete(testimonial)"
            class="action-btn delete"
            title="Excluir"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <i class="fas fa-comment-slash"></i>
      <h3>Nenhum depoimento encontrado</h3>
      <p>Clique em "Novo Depoimento" para começar a adicionar.</p>
    </div>

    <!-- Modal de Criação/Edição -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <h3>{{ isEditing ? "Editar Depoimento" : "Novo Depoimento" }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nome do Cliente</label>
            <input
              id="name"
              v-model="currentTestimonial.name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="position">Cargo/Empresa</label>
            <input
              id="position"
              v-model="currentTestimonial.position"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="content">Depoimento</label>
            <textarea
              id="content"
              v-model="currentTestimonial.content"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="avatar">URL da Foto (Avatar)</label>
            <input id="avatar" v-model="currentTestimonial.avatar" type="url" />
            <small
              >Use URLs do
              <a href="https://ui-avatars.com/" target="_blank"
                >ui-avatars.com</a
              >
              ou similar.</small
            >
          </div>
          <div class="form-group form-check">
            <input
              id="approved"
              v-model="currentTestimonial.approved"
              type="checkbox"
            />
            <label for="approved">Aprovado para exibição no site</label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              {{ isEditing ? "Atualizar" : "Criar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// --- Estado do Componente ---
const testimonials = ref([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentTestimonial = ref({});

const defaultTestimonial = {
  id: null,
  name: "",
  position: "",
  content: "",
  avatar: "",
  approved: false,
};

// --- Simulação de API (substitua pela sua store/service) ---
const fetchTestimonials = async () => {
  // Simula uma chamada de API
  const mockData = [
    {
      id: 1,
      name: "Carlos Mendes",
      position: "CEO, Empresa XYZ",
      content:
        "A Agência Web superou nossas expectativas com o desenvolvimento do nosso site. Profissionais extremamente competentes e dedicados.",
      avatar:
        "https://ui-avatars.com/api/?name=Carlos+Mendes&size=56&background=random",
      approved: true,
    },
    {
      id: 2,
      name: "Fernanda Lima",
      position: "Diretora de Marketing",
      content:
        "O trabalho de SEO realizado resultou em um aumento de 150% no tráfego orgânico do nosso site em apenas 3 meses.",
      avatar:
        "https://ui-avatars.com/api/?name=Fernanda+Lima&size=56&background=random",
      approved: true,
    },
    {
      id: 3,
      name: "Roberto Alves",
      position: "Empreendedor",
      content:
        "A loja virtual desenvolvida pela equipe é fantástica. Interface intuitiva e performance excepcional.",
      avatar:
        "https://ui-avatars.com/api/?name=Roberto+Alves&size=56&background=random",
      approved: false,
    },
  ];
  testimonials.value = mockData;
};

// --- Ciclo de Vida ---
onMounted(() => {
  fetchTestimonials();
});

// --- Funções do Modal ---
const openModal = (testimonial = null) => {
  if (testimonial) {
    isEditing.value = true;
    currentTestimonial.value = { ...testimonial };
  } else {
    isEditing.value = false;
    currentTestimonial.value = { ...defaultTestimonial };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// --- Funções CRUD ---
const handleSubmit = async () => {
  if (isEditing.value) {
    // Lógica de Atualização (Update)
    const index = testimonials.value.findIndex(
      (t) => t.id === currentTestimonial.value.id
    );
    if (index !== -1) {
      testimonials.value[index] = { ...currentTestimonial.value };
    }
  } else {
    // Lógica de Criação (Create)
    const newTestimonial = {
      ...currentTestimonial.value,
      id: Date.now(), // ID temporário
    };
    testimonials.value.unshift(newTestimonial);
  }
  closeModal();
};

const confirmDelete = (testimonial) => {
  if (
    window.confirm(
      `Tem certeza que deseja excluir o depoimento de ${testimonial.name}?`
    )
  ) {
    // Lógica de Exclusão (Delete)
    testimonials.value = testimonials.value.filter(
      (t) => t.id !== testimonial.id
    );
  }
};

const toggleApproval = (testimonial) => {
  testimonial.approved = !testimonial.approved;
  // Aqui você chamaria a API para atualizar o status
};

// --- Tratamento de Erro de Imagem ---
const onImageError = (event) => {
  // Substitui a imagem quebrada por um placeholder SVG
  event.target.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIgNmE0IDQgMCAwIDEgNC00aDEyYTQgNCAwIDAgMSA0IDR2MTJhNCA0IDAgMCAxLTQgNGgtM2wtMi0zaC00bC0yIDNIMmEwIDAgMCAwIDAgMC0ydi0xMmEwIDAgMCAwIDAgMC0yem00IDJhMiAyIDAgMSAwIDAtNGEyIDIgMCAwIDAgMCA0em04IDhjLTIuNzYgMC01LTIuMjQtNS01czIuMjQtNSA1LTVzNSA1LjI0IDUgNXMtMi4yNCA1LTUgNXoiLz48L3N2Zz4=";
};
</script>

<style scoped>
.testimonials-management {
  width: 100%;
  max-width: 100%;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.testimonial-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--primary-color);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-card.is-pending {
  border-left-color: var(--gray-400);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 72px;
  font-weight: 700;
  color: var(--gray-200);
  font-family: Georgia, serif;
  line-height: 1;
  z-index: 0;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.testimonial-content {
  flex-grow: 1;
  margin-bottom: 20px;
  font-style: italic;
  line-height: 1.7;
  color: var(--gray-700);
  font-size: 15px;
  position: relative;
  z-index: 1;
  padding-top: 10px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--gray-200);
  position: relative;
  z-index: 1;
}

.testimonial-author img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--shadow-sm);
}

.author-info h4 {
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--gray-900);
  font-size: 1.05rem;
}

.author-info span {
  color: var(--gray-500);
  font-size: 0.85rem;
  font-weight: 500;
}

.testimonial-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: var(--border-radius);
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.testimonial-card:hover .testimonial-actions {
  opacity: 1;
  transform: translateY(0);
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--gray-500);
  transition: color 0.2s ease;
}
.action-btn.approve:hover {
  color: var(--success-color);
}
.action-btn.edit:hover {
  color: var(--primary-color);
}
.action-btn.delete:hover {
  color: var(--danger-color);
}

.testimonial-status-badge {
  position: absolute;
  top: 16px;
  left: -4px;
  padding: 4px 12px 4px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 0 20px 20px 0;
  z-index: 1;
}
.testimonial-status-badge.approved {
  background-color: var(--success-color);
}
.testimonial-status-badge.pending {
  background-color: var(--warning-color);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background-color: var(--gray-50);
  border-radius: var(--border-radius);
  margin-top: 24px;
  color: var(--gray-500);
}
.empty-state i {
  font-size: 3rem;
  margin-bottom: 16px;
  color: var(--gray-300);
}
.empty-state h3 {
  font-size: 1.5rem;
  color: var(--gray-700);
  margin-bottom: 8px;
}

/* --- Estilos do Modal --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: var(--shadow-xl);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-400);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--gray-800);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--gray-700);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.form-check input {
  width: auto;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
