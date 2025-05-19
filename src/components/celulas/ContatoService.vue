<template>
  <main>
    <section class="contact-cta">
      <div class="cta-container">
        <h2 class="cta-title">
          Ainda com dúvidas sobre como desenvolver seu projeto?
        </h2>
        <p class="cta-subtitle">
          Solicite uma consultoria gratuita e descubra como podemos ajudar!
        </p>

        <router-link to="/contato" class="cta-button">
          Entre em Contato
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Estilos da Seção CTA */
.contact-cta {
  padding: 5rem 5%;
  background: #0052ff;
  color: white;
  text-align: center;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: #0052ff;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  background-color: rgb(44, 163, 199);
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .contact-cta {
    padding: 4rem 2rem;
  }

  .cta-title {
    font-size: 1.8rem;
  }

  .cta-subtitle {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .cta-title {
    font-size: 1.6rem;
  }
}
</style>
