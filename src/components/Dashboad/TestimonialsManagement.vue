<template>
  <div class="testimonials-management">
    <div class="section-header">
      <h2>Depoimentos de Clientes</h2>
      <button class="btn-primary">
        <i class="fas fa-plus"></i> Novo Depoimento
      </button>
    </div>

    <div class="testimonials-grid">
      <div
        class="testimonial-card"
        v-for="testimonial in testimonials"
        :key="testimonial.id"
      >
        <div class="testimonial-content">
          <p>"{{ testimonial.content }}"</p>
        </div>
        <div class="testimonial-author">
          <img :src="testimonial.avatar" :alt="testimonial.name" />
          <div class="author-info">
            <h4>{{ testimonial.name }}</h4>
            <span>{{ testimonial.position }}</span>
          </div>
        </div>
        <div class="testimonial-actions">
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestimonialsManagement",
  data() {
    return {
      testimonials: [
        {
          id: 1,
          name: "Carlos Mendes",
          position: "CEO, Empresa XYZ",
          content:
            "A Agência Web superou nossas expectativas com o desenvolvimento do nosso site. Profissionais extremamente competentes e dedicados.",
          avatar: "https://ui-avatars.com/api/?name=Carlos+Mendes&size=50",
        },
        {
          id: 2,
          name: "Fernanda Lima",
          position: "Diretora de Marketing",
          content:
            "O trabalho de SEO realizado resultou em um aumento de 150% no tráfego orgânico do nosso site em apenas 3 meses.",
          avatar: "https://ui-avatars.com/api/?name=Fernanda+Lima&size=50",
        },
        {
          id: 3,
          name: "Roberto Alves",
          position: "Empreendedor",
          content:
            "A loja virtual desenvolvida pela equipe é fantástica. Interface intuitiva e performance excepcional.",
          avatar: "https://ui-avatars.com/api/?name=Roberto+Alves&size=50",
        },
      ],
    };
  },
};
</script>

<style scoped>
.testimonials-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.testimonial-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 32px 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 80px;
  font-weight: 700;
  color: var(--gray-100);
  font-family: Georgia, serif;
  line-height: 1;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.testimonial-content {
  margin-bottom: 24px;
  font-style: italic;
  line-height: 1.7;
  color: var(--gray-700);
  font-size: 15px;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  border-top: 2px solid var(--gray-100);
}

.testimonial-author img {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  border: 3px solid var(--gray-100);
  box-shadow: var(--shadow-sm);
}

.author-info h4 {
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--gray-900);
  font-size: 1.05rem;
}

.author-info span {
  color: var(--gray-500);
  font-size: 13.5px;
  font-weight: 500;
}

.testimonial-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
