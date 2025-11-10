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
            aria-hidden="true"
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
  background: linear-gradient(135deg, #0052ff 0%, #3b82f6 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Animação de fundo */
.contact-cta::before,
.contact-cta::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(60px);
  z-index: 0;
}

.contact-cta::before {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation: moveOrb1 15s infinite alternate ease-in-out;
}

.contact-cta::after {
  width: 400px;
  height: 400px;
  bottom: -150px;
  right: -150px;
  animation: moveOrb2 20s infinite alternate ease-in-out;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

/* Dark Mode */
[data-theme="dark"] .contact-cta {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f8fafc;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
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
  box-shadow: 0 6px 15px rgba(0, 82, 255, 0.2);
}

.cta-button:hover {
  transform: translateY(-4px);
  background-color: #ffffff;
  color: #0041cc; /* Tom mais escuro do azul principal */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

@keyframes moveOrb1 {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(80px, 60px);
  }
}

@keyframes moveOrb2 {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-100px, -50px);
  }
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
