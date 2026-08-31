<template>
  <main class="sobre-pagina">
    <!-- Abertura -->
    <section class="sobre-hero">
      <div class="hero-inner">
        <h1>
          Sobre a
          <span class="highlight">SkillTechnology</span>
        </h1>
        <p>
          Somos a agência que coloca inteligência artificial para trabalhar
          dentro do seu negócio — no sistema que você já usa ou em um novo,
          feito sob medida.
        </p>
        <div class="hero-acoes">
          <router-link to="/contato" class="botao-principal">
            Falar com a gente
            <font-awesome-icon icon="arrow-right" />
          </router-link>
          <router-link to="/Portfolio" class="botao-secundario">
            Ver nossos projetos
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quem somos -->
    <section class="secao secao-clara">
      <div class="secao-inner grid-duplo">
        <div class="texto-coluna">
          <h2>Quem <span class="gradiente">Somos</span></h2>
          <p>
            A SkillTechnology é uma agência de tecnologia focada em transformar
            ideias em soluções digitais completas e funcionais. Nascemos com a
            missão de democratizar o acesso à tecnologia de ponta, ajudando
            empresas de todos os portes a automatizar processos, desenvolver
            sistemas inteligentes e acelerar seu crescimento digital.
          </p>

          <h3>O que fazemos</h3>
          <p>
            Desenvolvemos sistemas web, aplicativos, lojas virtuais, automações
            e integrações. E, em cada projeto, aplicamos inteligência artificial
            onde ela resolve um problema real: atendimento, leitura de
            documentos, previsão de demanda, geração de propostas e relatórios.
          </p>

          <h3>Por que somos diferentes</h3>
          <p>
            Enquanto outras agências trabalham de forma tradicional, nós
            combinamos experiência humana com IA de última geração. Isso
            significa entregar mais rápido, com custo menor — e deixar o sistema
            trabalhando por você depois da entrega, não só rodando.
          </p>
        </div>

        <aside class="promessa-card">
          <span class="promessa-selo">
            <font-awesome-icon icon="rocket" />
          </span>
          <h3>Nossa promessa</h3>
          <p>
            Economizar seu tempo, seu dinheiro e entregar resultados reais. Cada
            projeto é tratado como se fosse nosso próprio negócio.
          </p>
          <ul>
            <li v-for="item in promessas" :key="item">
              <font-awesome-icon icon="circle-check" />
              {{ item }}
            </li>
          </ul>
          <router-link to="/contato" class="promessa-cta">
            Solicitar diagnóstico gratuito
            <font-awesome-icon icon="arrow-right" />
          </router-link>
        </aside>
      </div>
    </section>

    <!-- Caminhos da IA -->
    <section class="secao secao-branca">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>
            Como levamos
            <span class="gradiente">IA para o seu negócio</span>
          </h2>
          <p>
            Três caminhos, dependendo de onde a sua empresa está hoje.
          </p>
        </header>

        <div class="caminhos-grid">
          <article
            v-for="caminho in caminhos"
            :key="caminho.titulo"
            class="caminho-card"
          >
            <span class="caminho-icone">
              <font-awesome-icon :icon="caminho.icone" />
            </span>
            <h3>{{ caminho.titulo }}</h3>
            <p>{{ caminho.texto }}</p>
            <ul>
              <li v-for="exemplo in caminho.exemplos" :key="exemplo">
                <font-awesome-icon icon="circle-check" />
                {{ exemplo }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Por que nos escolher -->
    <section class="secao secao-clara">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Por que nos <span class="gradiente">escolher</span></h2>
        </header>

        <div class="motivos-grid">
          <article
            v-for="motivo in motivos"
            :key="motivo.titulo"
            class="motivo-card"
          >
            <span class="motivo-icone">
              <font-awesome-icon :icon="motivo.icone" />
            </span>
            <div>
              <h3>{{ motivo.titulo }}</h3>
              <p>{{ motivo.texto }}</p>
              <router-link v-if="motivo.link" :to="motivo.link" class="motivo-link">
                Ver portfólio
                <font-awesome-icon icon="arrow-right" />
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================
Assim que tiver as fotos e mais de 3 profissionais trabalhando na agencia liberar e edita essa area -->

    <!-- Team Section
    <section class="secao secao-branca">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Nossa Equipe</h2>
        </header>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img src="@/assets/images/avatars/user1.png" alt="Maciel Barbosa" />
            </div>
            <h3>Maciel Barbosa</h3>
            <p class="member-role">CEO & Fundador</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Números -->
    <section class="secao secao-numeros">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Nossos <span class="gradiente">Números</span></h2>
        </header>

        <div class="numeros-grid">
          <div v-for="numero in numeros" :key="numero.label" class="numero-item">
            <strong>{{ numero.valor }}</strong>
            <span>{{ numero.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tecnologias -->
    <!-- <section class="secao secao-branca">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Tecnologias que <span class="gradiente">dominamos</span></h2>
          <p>
            Combinamos as melhores ferramentas do mercado com inteligência
            artificial de última geração.
          </p>
        </header>

        <div class="tech-grid">
          <div
            v-for="categoria in tecnologias"
            :key="categoria.nome"
            class="tech-card"
          >
            <h3>
              <font-awesome-icon :icon="categoria.icone" />
              {{ categoria.nome }}
            </h3>
            <div class="tech-badges">
              <span v-for="item in categoria.itens" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <ContatoService />
  </main>
</template>

<script>
import ContatoService from "../celulas/ContatoService.vue";

export default {
  name: "SobreView",
  components: { ContatoService },

  data() {
    return {
      promessas: [
        "Diagnóstico antes de qualquer proposta",
        "Entrega em fases, com você acompanhando",
        "Suporte e manutenção depois do lançamento",
      ],

      caminhos: [
        {
          icone: "plug",
          titulo: "IA no sistema que você já usa",
          texto:
            "Não precisa trocar de ERP nem recomeçar do zero. Conectamos a IA ao que já está rodando na sua empresa.",
          exemplos: [
            "Atendimento automático no WhatsApp",
            "Leitura de notas fiscais e contratos",
            "Integração entre sistemas e planilhas",
          ],
        },
        {
          icone: "layer-group",
          titulo: "Sistema novo, já com IA",
          texto:
            "Quando o que existe não dá conta, construímos do zero — com a inteligência artificial dentro desde o primeiro dia.",
          exemplos: [
            "CRM que prioriza os melhores leads",
            "ERP que prevê compras e estoque",
            "Dashboard que avisa antes do problema",
          ],
        },
        {
          icone: "bolt",
          titulo: "Automação da operação",
          texto:
            "Mapeamos o que sua equipe faz na mão todo dia e colocamos no automático, com segurança e rastreabilidade.",
          exemplos: [
            "Propostas e cobranças automáticas",
            "Relatórios gerados e enviados sozinhos",
            "Aprovações e fluxos internos",
          ],
        },
      ],

      motivos: [
        {
          icone: "code",
          titulo: "Expertise técnica",
          texto:
            "Domínio de tecnologias modernas: Vue.js, Node.js, React Native, MongoDB, AWS e mais.",
        },
        {
          icone: "robot",
          titulo: "IA como parceira",
          texto:
            "Usamos inteligência artificial de ponta para acelerar cada etapa do desenvolvimento.",
        },
        {
          icone: "rocket",
          titulo: "Entrega rápida",
          texto:
            "Projetos entregues até 3x mais rápido que métodos tradicionais, sem comprometer a qualidade.",
        },
        {
          icone: "headset",
          titulo: "Suporte dedicado",
          texto:
            "Acompanhamento contínuo, suporte técnico e manutenção preventiva para seu projeto.",
        },
        {
          icone: "shield-halved",
          titulo: "Segurança em primeiro lugar",
          texto:
            "Boas práticas de segurança, backup e controle de acesso em todos os projetos.",
        },
        {
          icone: "chart-line",
          titulo: "Resultados comprovados",
          texto:
            "Projetos reais entregues para clientes satisfeitos em diversas áreas do mercado.",
          link: "/Portfolio",
        },
      ],

      numeros: [
        { valor: "200+", label: "Projetos entregues" },
        { valor: "98%", label: "Taxa de satisfação" },
        { valor: "20+", label: "Serviços oferecidos" },
        { valor: "24/7", label: "Suporte disponível" },
      ],

      tecnologias: [
        {
          nome: "Inteligência Artificial",
          icone: "brain",
          itens: [
            "Claude",
            "GPT",
            "Gemini",
            "Agentes de IA",
            "Automações com IA",
          ],
        },
        {
          nome: "Frontend",
          icone: "code",
          itens: ["Vue.js", "React", "TypeScript", "Nuxt.js", "HTML5 / CSS3"],
        },
        {
          nome: "Backend",
          icone: "layer-group",
          itens: ["Node.js", "Python", "Express", "REST APIs", "WebSockets"],
        },
        {
          nome: "Banco de dados & Cloud",
          icone: "database",
          itens: ["MongoDB", "PostgreSQL", "AWS", "Firebase", "Docker"],
        },
        {
          nome: "Mobile",
          icone: "mobile-screen-button",
          itens: ["React Native", "Flutter", "iOS", "Android"],
        },
      ],
    };
  },

  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.$el
      .querySelectorAll(".caminho-card, .motivo-card, .tech-card")
      .forEach((card) => observer.observe(card));
  },
};
</script>

<style scoped>
.sobre-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.sobre-hero {
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

.sobre-hero h1 {
  margin: 0;
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.highlight,
.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sobre-hero p {
  margin: 1.25rem auto 0;
  max-width: 620px;
  font-size: 1.15rem;
  line-height: 1.6;
  color: #3d4570;
}

.hero-acoes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.botao-principal,
.botao-secundario {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.6rem;
  border-radius: 10px;
  font-size: 0.98rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.botao-principal {
  background: #0052ff;
  color: #fff;
  box-shadow: 0 8px 22px rgba(0, 82, 255, 0.25);
}

.botao-principal:hover {
  background: #0040c9;
  transform: translateY(-1px);
}

.botao-secundario {
  border: 1px solid #dcdcd4;
  background: #fff;
  color: #131a4d;
}

.botao-secundario:hover {
  border-color: #7c6ef2;
  color: #0052ff;
}

/* Estrutura das seções */
.secao {
  padding: 5.5rem 5%;
}

.secao-clara {
  background: #f6f5f1;
}

.secao-branca {
  background: #fff;
}

.secao-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.secao-header {
  max-width: 640px;
  margin: 0 auto 3rem;
  text-align: center;
}

.secao-header h2,
.texto-coluna h2 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #131a4d;
}

.secao-header p {
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #6b7194;
}

/* Quem somos */
.grid-duplo {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  align-items: start;
  gap: 3.5rem;
}

.texto-coluna h3 {
  margin: 2rem 0 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #131a4d;
}

.texto-coluna p {
  margin: 1.25rem 0 0;
  font-size: 1.02rem;
  line-height: 1.75;
  color: #4b5280;
}

.texto-coluna h3 + p {
  margin-top: 0;
}

.promessa-card {
  position: sticky;
  top: 6rem;
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.08);
}

.promessa-selo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 1.25rem;
  border-radius: 14px;
  background: rgba(0, 82, 255, 0.1);
  color: #0052ff;
  font-size: 1.15rem;
}

.promessa-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #131a4d;
}

.promessa-card > p {
  margin: 0 0 1.5rem;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #6b7194;
}

.promessa-card ul {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  display: grid;
  gap: 0.7rem;
}

.promessa-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.94rem;
  line-height: 1.5;
  color: #4b5280;
}

.promessa-card li svg,
.caminho-card li svg {
  margin-top: 0.2rem;
  flex: 0 0 auto;
  color: #22c55e;
}

.promessa-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-size: 0.94rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.promessa-cta:hover {
  background: #0040c9;
}

/* Caminhos da IA */
.caminhos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.caminho-card {
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.caminho-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.1);
  transform: translateY(-4px);
}

.caminho-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 1.25rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  font-size: 1.15rem;
}

.caminho-card h3 {
  margin: 0 0 0.65rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: #131a4d;
}

.caminho-card > p {
  margin: 0 0 1.35rem;
  font-size: 0.96rem;
  line-height: 1.65;
  color: #6b7194;
}

.caminho-card ul {
  list-style: none;
  margin: 0;
  padding: 1.25rem 0 0;
  border-top: 1px solid #eeede7;
  display: grid;
  gap: 0.6rem;
}

.caminho-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #4b5280;
}

/* Por que nos escolher */
.motivos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.motivo-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.6rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.motivo-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 14px 34px rgba(19, 26, 77, 0.08);
}

.motivo-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 82, 255, 0.08);
  color: #0052ff;
  font-size: 1.05rem;
}

.motivo-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.08rem;
  font-weight: 700;
  color: #131a4d;
}

.motivo-card p {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.6;
  color: #6b7194;
}

.motivo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: #0052ff;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.motivo-link:hover {
  text-decoration: underline;
}

/* Números */
.secao-numeros {
  color: #fff;
  background-color: #131a4d;
  background-image: linear-gradient(135deg, #131a4d 0%, #1e2a6b 100%);
}

.secao-numeros .secao-header h2 {
  color: #fff;
}

.secao-numeros .gradiente {
  background: linear-gradient(90deg, #7cb0ff, #b9a8ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.numeros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.numero-item {
  padding: 1.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  text-align: center;
}

.numero-item strong {
  display: block;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.numero-item span {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.72);
}

/* Tecnologias */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.tech-card {
  padding: 1.6rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
}

.tech-card h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #131a4d;
}

.tech-card h3 svg {
  color: #7c6ef2;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tech-badges span {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e2e1da;
  border-radius: 999px;
  background: #fff;
  font-size: 0.85rem;
  color: #4b5280;
}

/* Entrada suave */
.caminho-card,
.motivo-card,
.tech-card {
  opacity: 0;
  transform: translateY(20px);
}

.caminho-card.visivel,
.motivo-card.visivel,
.tech-card.visivel {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Responsivo */
@media (max-width: 992px) {
  .grid-duplo {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .promessa-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .sobre-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .sobre-hero h1 {
    font-size: 2.1rem;
  }

  .sobre-hero p {
    font-size: 1rem;
  }

  .hero-acoes {
    flex-direction: column;
    align-items: stretch;
  }

  .botao-principal,
  .botao-secundario {
    justify-content: center;
  }

  .secao {
    padding: 3.5rem 1.25rem;
  }

  .secao-header {
    margin-bottom: 2.25rem;
  }

  .secao-header h2,
  .texto-coluna h2 {
    font-size: 1.9rem;
  }

  .caminho-card,
  .promessa-card {
    padding: 1.6rem 1.35rem;
  }

  .numero-item strong {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caminho-card,
  .motivo-card,
  .tech-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
