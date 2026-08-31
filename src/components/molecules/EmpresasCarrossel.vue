<template>
  <section class="empresas">
    <p class="empresas-label">
      Empresas que já colocaram IA para trabalhar com a gente
    </p>

    <div class="carrossel">
      <!-- A lista é repetida duas vezes para o laço ficar contínuo -->
      <div class="trilho" :style="{ animationDuration: duracao }">
        <div
          v-for="(empresa, index) in empresasDuplicadas"
          :key="index"
          class="empresa"
        >
          <span class="empresa-marca">
            <font-awesome-icon :icon="empresa.icone" />
          </span>
          <span class="empresa-nome">{{ empresa.nome }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "EmpresasCarrossel",
  setup() {
    // Empresas fictícias: trocar pelos logos reais dos clientes
    const empresas = ref([
      { nome: "Nortech", icone: "cube" },
      { nome: "Vallure", icone: "gem" },
      { nome: "Meridian Log", icone: "truck-fast" },
      { nome: "Orbita Saúde", icone: "heart-pulse" },
      { nome: "AgroPrime", icone: "leaf" },
      { nome: "FinNext", icone: "chart-line" },
      { nome: "Solvo Energia", icone: "bolt" },
      { nome: "Grupo Aurora", icone: "mountain-sun" },
      { nome: "Vetra Seguros", icone: "shield-halved" },
      { nome: "Conecta Mais", icone: "circle-nodes" },
    ]);

    const empresasDuplicadas = computed(() => [
      ...empresas.value,
      ...empresas.value,
    ]);

    // ~3,5s por logo mantém o ritmo constante mesmo mudando a lista
    const duracao = computed(() => `${empresas.value.length * 3.5}s`);

    return { empresas, empresasDuplicadas, duracao };
  },
};
</script>

<style scoped>
.empresas {
  padding: 3rem 0 3.5rem;
  background: #fff;
  border-top: 1px solid #eeede7;
  border-bottom: 1px solid #eeede7;
}

.empresas-label {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0b8;
}

/* Máscara nas pontas para os logos surgirem e sumirem suavemente */
.carrossel {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}

.trilho {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  width: max-content;
  animation: desliza linear infinite;
}

.carrossel:hover .trilho {
  animation-play-state: paused;
}

@keyframes desliza {
  from {
    transform: translateX(0);
  }
  to {
    /* metade do trilho = uma volta completa da lista original */
    transform: translateX(calc(-50% - 1.75rem));
  }
}

.empresa {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 0 0 auto;
  color: #8b90a8;
  transition: color 0.25s ease;
}

.empresa:hover {
  color: #131a4d;
}

.empresa-marca {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #f4f4f0;
  font-size: 1.05rem;
  transition: background 0.25s ease, color 0.25s ease;
}

.empresa:hover .empresa-marca {
  background: rgba(0, 82, 255, 0.09);
  color: #0052ff;
}

.empresa-nome {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .empresas {
    padding: 2.25rem 0 2.5rem;
  }

  .empresas-label {
    margin-bottom: 1.5rem;
    font-size: 0.78rem;
    padding: 0 1.25rem;
  }

  .trilho {
    gap: 2.5rem;
  }

  @keyframes desliza {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 1.25rem));
    }
  }

  .empresa-marca {
    width: 34px;
    height: 34px;
    font-size: 0.95rem;
  }

  .empresa-nome {
    font-size: 1rem;
  }
}

/* Respeita quem prefere menos animação */
@media (prefers-reduced-motion: reduce) {
  .trilho {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 2rem 3rem;
    padding: 0 1.25rem;
  }
}
</style>
