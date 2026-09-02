<template>
  <main class="autores-pagina">
    <!-- Abertura -->
    <section class="autores-hero">
      <div class="hero-inner">
        <h1>
          Quem constrói
          <span class="gradiente">os projetos</span>
        </h1>
        <p>
          O time por trás das entregas da agência. Cada perfil reúne os projetos
          que a pessoa assinou, as tecnologias que domina e como falar com ela.
        </p>
      </div>
    </section>

    <!-- Carregando -->
    <section v-if="carregando" class="estado-carregando">
      <span class="spinner"></span>
      Carregando o time...
    </section>

    <section v-else class="secao secao-branca">
      <div v-if="autores.length" class="autores-grid">
        <router-link
          v-for="autor in autores"
          :key="autor._id"
          :to="`/portfolio/autor/${autor.slug}`"
          class="autor-card"
        >
          <div class="autor-foto">
            <img v-if="autor.avatar" :src="autor.avatar" :alt="autor.name" />
            <span v-else>{{ iniciais(autor.name) }}</span>
          </div>

          <h2>{{ autor.name }}</h2>
          <p v-if="autor.role" class="autor-cargo">{{ autor.role }}</p>
          <p v-if="autor.headline" class="autor-frase">{{ autor.headline }}</p>

          <div v-if="autor.skills && autor.skills.length" class="autor-skills">
            <span v-for="(skill, i) in autor.skills.slice(0, 3)" :key="i">
              {{ skill }}
            </span>
            <span v-if="autor.skills.length > 3" class="mais">
              +{{ autor.skills.length - 3 }}
            </span>
          </div>

          <span class="autor-cta">
            Ver portfólio
            <i class="fas fa-arrow-right"></i>
          </span>
        </router-link>
      </div>

      <p v-else class="lista-vazia">
        Nenhum perfil publicado por enquanto.
      </p>
    </section>

    <ContatoService />
  </main>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContatoService from "../celulas/ContatoService.vue";
import authorService from "@/services/authorService";

export default {
  name: "AutoresLista",
  components: { ContatoService },

  data() {
    return {
      autores: [],
      carregando: true,
    };
  },

  async mounted() {
    await this.carregarAutores();
  },

  methods: {
    async carregarAutores() {
      try {
        const resposta = await authorService.getPublishedAuthors({ limit: 60 });
        this.autores = (resposta.data || []).map((autor) => ({
          ...autor,
          avatar: authorService.resolveImageUrl(autor.avatar || ""),
        }));
      } catch (error) {
        console.warn("Autores indisponíveis:", error);
        this.autores = [];
      } finally {
        this.carregando = false;
      }
    },

    iniciais(nome) {
      return String(nome || "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte.charAt(0).toUpperCase())
        .join("");
    },
  },
};
</script>

<style scoped>
.autores-pagina {
  font-family: "Inter", sans-serif;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.autores-hero {
  padding: 5.5rem 5% 5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 780px;
  margin: 0 auto;
}

.autores-hero h1 {
  margin: 0;
  font-size: 3.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.autores-hero p {
  margin: 1.25rem auto 0;
  max-width: 600px;
  font-size: 1.12rem;
  line-height: 1.6;
  color: #3d4570;
}

.estado-carregando {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem 1.25rem;
  color: #6b7194;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e1da;
  border-top-color: #0052ff;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.secao {
  padding: 5rem 5%;
}

.secao-branca {
  background: #fff;
}

.autores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1180px;
  margin: 0 auto;
}

.autor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fff;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.autor-card:hover {
  transform: translateY(-4px);
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.12);
}

.autor-foto {
  width: 104px;
  height: 104px;
  margin-bottom: 0.65rem;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
}

.autor-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.autor-card h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #131a4d;
}

.autor-cargo {
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: #0052ff;
}

.autor-frase {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #6b7194;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.autor-skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.85rem;
}

.autor-skills span {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: #f1f0ff;
  font-size: 0.74rem;
  font-weight: 500;
  color: #3b3a8f;
}

.autor-skills .mais {
  background: #f1f1ee;
  color: #6b7194;
}

.autor-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.25rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #131a4d;
}

.autor-card:hover .autor-cta {
  color: #0052ff;
}

.lista-vazia {
  text-align: center;
  color: #6b7194;
}

@media (max-width: 600px) {
  .autores-hero {
    padding: 3.5rem 5%;
  }

  .autores-hero h1 {
    font-size: 2.2rem;
  }

  .secao {
    padding: 3.5rem 5%;
  }
}
</style>
