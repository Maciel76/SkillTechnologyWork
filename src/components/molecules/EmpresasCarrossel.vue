<template>
  <section class="empresas">
    <p class="empresas-label">
      Projetos desenvolvidos pela nossa equipe
    </p>

    <div class="carrossel">
      <!-- A lista é repetida duas vezes para o laço ficar contínuo -->
      <div class="trilho" :style="{ animationDuration: duracao }">
        <component
          :is="empresa.url ? 'a' : 'div'"
          v-for="(empresa, index) in empresasDuplicadas"
          :key="index"
          class="empresa"
          :href="empresa.url"
          :target="empresa.url ? '_blank' : undefined"
          :rel="empresa.url ? 'noopener noreferrer' : undefined"
        >
          <span class="empresa-marca" :class="{ 'empresa-marca-ampla': empresa.logoAmpla, 'empresa-marca-imagem': empresa.logo, 'empresa-marca-compacta': empresa.logoCompacta }">
            <img :src="empresa.logo" :alt="empresa.logoAmpla ? empresa.nome : ''" class="empresa-logo" />
          </span>
          <span v-if="!empresa.logoAmpla" class="empresa-nome">{{ empresa.nome }}</span>
        </component>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import linkabioLogo from "@/assets/linkabio.svg";
import kallilLogo from "@/assets/kallil-logo.png";
import rammisIcon from "@/assets/rammis-icon-transparent.png";
import zapflowIcon from "@/assets/zapflow-icon.svg";
import flashrubIcon from "@/assets/flashrub-icon-transparent.png";
import nexlivroIcon from "@/assets/nexlivro-icon-transparent.png";
import zpagoLogo from "@/assets/zpago-logo.png";
import neoblogLogo from "@/assets/neoblog-logo.png";
import fexpLogo from "@/assets/fexp-logo.png";
import multsenseLogo from "@/assets/multsense-logo.png";

export default {
  name: "EmpresasCarrossel",
  setup() {
    const empresas = ref([
      { nome: "Linkabio", logo: linkabioLogo, url: "https://linkab.io/" },
      { nome: "Kallil 2.0", logo: kallilLogo, logoAmpla: true, url: "https://kallil.net/" },
      { nome: "Rammis", logo: rammisIcon, url: "https://www.rammis.app/" },
      { nome: "ZapFlow", logo: zapflowIcon, url: "https://whatsappflow.app/" },
      { nome: "Flashrub", logo: flashrubIcon, url: "https://flashub-auditoria.vercel.app/dashboard" },
      { nome: "Nexlivro", logo: nexlivroIcon, url: "https://nextlivro.com/" },
      { nome: "ZPAGO", logo: zpagoLogo, logoAmpla: true, logoCompacta: true, url: "https://zpago.com/" },
      { nome: "NeoBlog", logo: neoblogLogo, logoAmpla: true, logoCompacta: true, url: "https://neoblog.com.br/" },
      { nome: "FEXP", logo: fexpLogo, logoAmpla: true, logoCompacta: true, url: "https://fexp.com.br/" },
      { nome: "Multsense", logo: multsenseLogo, logoAmpla: true, logoCompacta: true, url: "https://multsense.com.br/" },
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
  text-decoration: none;
  transition: color 0.25s ease;
}

.empresa:hover,
.empresa:focus-visible {
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

.empresa-logo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.empresa .empresa-marca.empresa-marca-imagem {
  background: transparent;
}

.empresa .empresa-marca.empresa-marca-ampla {
  width: 180px;
  height: 48px;
  background: transparent;
  border-radius: 0;
}

.carrossel:focus-within .trilho {
  animation-play-state: paused;
}

.empresa .empresa-marca.empresa-marca-compacta {
  width: 130px;
  height: 36px;
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
