<template>
  <section class="contato-cta">
    <div class="cta-container">
      <h2 class="cta-title">
        Ainda com dúvidas sobre como desenvolver seu projeto?
      </h2>

      <p class="cta-subtitle">
        Solicite uma consultoria gratuita e descubra como podemos ajudar.
      </p>

      <div class="cta-acoes">
        <router-link to="/contato" class="cta-button">
          Entre em Contato
          <font-awesome-icon icon="arrow-right" />
        </router-link>

        <router-link to="/Portfolio" class="cta-secundario">
          Ver nossos projetos
        </router-link>
      </div>

      <ul class="cta-garantias">
        <li>
          <font-awesome-icon icon="circle-check" />
          Diagnóstico sem custo
        </li>
        <li>
          <font-awesome-icon icon="circle-check" />
          Resposta em até 24h
        </li>
        <li>
          <font-awesome-icon icon="circle-check" />
          Sem compromisso
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContatoService",
};
</script>

<style scoped>
.contato-cta {
  position: relative;
  overflow: hidden;
  padding: 5.5rem 5%;
  text-align: center;
  color: #fff;
  background-color: #131a4d;
  background-image: linear-gradient(135deg, #131a4d 0%, #0052ff 55%, #7c6ef2 100%);
}

/* Grade sutil, igual à da hero */
.contato-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 120px 120px;
}

/* Brilho suave no canto */
.contato-cta::after {
  content: "";
  position: absolute;
  right: -120px;
  bottom: -160px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  filter: blur(80px);
}

.cta-container {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
}

.cta-title {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.cta-subtitle {
  margin: 0 auto;
  max-width: 520px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.cta-acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  margin-top: 2.25rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.75rem;
  border-radius: 10px;
  background: #fff;
  color: #0f1a4d;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 12px 30px rgba(6, 10, 40, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
color: #fefeff;
border: 1px solid #fff;
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(6, 10, 40, 0.35);
}

.cta-secundario {
  display: inline-flex;
  align-items: center;
  padding: 0.95rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.cta-secundario:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.6);
}

.cta-garantias {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.25rem 0 0;
  padding: 0;
  list-style: none;
}

.cta-garantias li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.82);
}

.cta-garantias svg {
  color: #86efac;
}

@media (max-width: 768px) {
  .contato-cta {
    padding: 3.5rem 1.25rem;
  }

  .contato-cta::before {
    background-size: 80px 80px;
  }

  /* O brilho desfocado pesa e cria faixas no celular */
  .contato-cta::after {
    display: none;
  }

  .cta-title {
    font-size: 1.85rem;
  }

  .cta-subtitle {
    font-size: 1rem;
  }

  .cta-acoes {
    flex-direction: column;
    align-items: stretch;
    margin-top: 1.85rem;
  }

  .cta-button,
  .cta-secundario {
    justify-content: center;
  }

  .cta-garantias {
    gap: 0.75rem 1.25rem;
    margin-top: 1.85rem;
  }

  .cta-garantias li {
    font-size: 0.85rem;
  }
}
</style>
