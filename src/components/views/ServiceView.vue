<template>
  <main class="servicos-pagina">
    <!-- Abertura -->
    <section class="servicos-hero">
      <div class="hero-inner">
        <h1>
          Soluções para
          <span class="gradiente">o seu negócio</span>
        </h1>
        <p>
          Integração de IA e MCP, desenvolvimento de sistemas e sites, e automação
          para simplificar a operação da sua empresa.
        </p>
      </div>
    </section>

    <!-- Cards de serviço -->
    <section class="servicos-lista">
      <div class="lista-inner">
        <article
          v-for="servico in servicos"
          :key="servico.titulo"
          class="servico-card"
        >
          <span
            class="servico-icone"
            :style="{ background: servico.fundo, color: servico.cor }"
          >
            <font-awesome-icon :icon="servico.icone" />
          </span>

          <h2>{{ servico.titulo }}</h2>
          <p class="servico-descricao">{{ servico.descricao }}</p>

          <ul class="servico-itens">
            <li v-for="item in servico.itens" :key="item">
              <font-awesome-icon icon="circle-check" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <router-link
            :to="{ name: 'contato', query: { servico: servico.assunto } }"
            class="servico-contratar"
            :aria-label="`Contratar serviço: ${servico.titulo}`"
          >
            <span>Contratar serviço</span>
            <font-awesome-icon icon="arrow-right" aria-hidden="true" />
          </router-link>
        </article>
      </div>
    </section>

    <ContatoService />
  </main>
</template>

<script>
import ContatoService from "@/components/celulas/ContatoService.vue";

export default {
  name: "ServicosView",
  components: { ContatoService },

  data() {
    return {
      servicos: [
        {
          icone: "plug",
          cor: "#0052ff",
          fundo: "rgba(0, 82, 255, 0.1)",
          titulo: "Integração de IA e MCP",
          assunto: "integrar-ia",
          descricao:
            "Integramos IA ao sistema que você já usa. Com MCP, o ChatGPT ou o Claude pode consultar dados e executar ações autorizadas apenas pela conversa.",
          itens: [
            "Conexão da IA ao seu ERP, CRM ou sistema",
            "Ferramentas MCP para consultar e atualizar dados",
            "Criação de registros e conteúdos pela conversa",
            "Permissões de acesso e ações sob seu controle",
          ],
        },
        {
          icone: "layer-group",
          cor: "#7C6EF2",
          fundo: "rgba(124, 110, 242, 0.12)",
          titulo: "Sistemas próprios e sites institucionais",
          assunto: "criar-sistema",
          descricao:
            "Desenvolvemos sistemas próprios e sites institucionais para a sua empresa, com as funcionalidades e a identidade visual que o seu negócio precisa.",
          itens: [
            "Sistemas de gestão, portais e painéis sob medida",
            "Sites institucionais para apresentar sua empresa",
            "Layout responsivo para computador e celular",
            "Perfis de acesso e integrações conforme o projeto",
          ],
        },
        {
          icone: "bolt",
          cor: "#F59E0B",
          fundo: "rgba(245, 158, 11, 0.12)",
          titulo: "Automação da operação",
          assunto: "automacao",
          descricao:
            "Conectamos as etapas da sua operação para reduzir tarefas manuais, organizar o fluxo de trabalho e acompanhar cada execução.",
          itens: [
            "Propostas, orçamentos e documentos automáticos",
            "Cobranças e lembretes conforme as regras da operação",
            "Relatórios programados e dados sincronizados",
            "Fluxos de aprovação com histórico de execução",
          ],
        },
        {
          icone: "robot",
          cor: "#10B981",
          fundo: "rgba(16, 185, 129, 0.12)",
          titulo: "Atendimento com IA",
          assunto: "atendimento-ia",
          descricao:
            "Um assistente que responde seus clientes em segundos, a qualquer hora, e só passa para a equipe o que realmente precisa.",
          itens: [
            "Assistente no WhatsApp 24 horas por dia",
            "Chat no site que tira dúvidas e capta contatos",
            "Agendamento automático com lembretes",
            "Triagem do suporte antes de chegar no seu time",
          ],
        },
        {
          icone: "globe",
          cor: "#0099DD",
          fundo: "rgba(0, 153, 221, 0.1)",
          titulo: "Sites e lojas virtuais",
          assunto: "site-loja",
          descricao:
            "Presença digital que converte, com atendimento e recomendação inteligentes rodando por trás.",
          itens: [
            "Sites institucionais e landing pages de conversão",
            "Loja virtual com Pix, cartão e cálculo de frete",
            "Busca e recomendação de produtos com IA",
            "SEO técnico e performance otimizada",
          ],
        },
        {
          icone: "mobile-screen-button",
          cor: "#EC4899",
          fundo: "rgba(236, 72, 153, 0.1)",
          titulo: "Aplicativos",
          assunto: "aplicativo",
          descricao:
            "Apps Android e iOS para seus clientes ou para a equipe em campo, conectados ao seu sistema.",
          itens: [
            "Pedidos e acompanhamento pelo celular",
            "Registro de visitas e relatórios em campo",
            "Notificações inteligentes por perfil de usuário",
            "Integração com o backend que você já tem",
          ],
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
      .querySelectorAll(".servico-card")
      .forEach((card) => observer.observe(card));
  },
};
</script>

<style scoped>
.servicos-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.servicos-hero {
  padding: 5.5rem 5% 5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 760px;
  margin: 0 auto;
}

.servicos-hero h1 {
  margin: 0;
  font-size: 3.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.servicos-hero p {
  margin: 1.25rem auto 0;
  max-width: 600px;
  font-size: 1.12rem;
  line-height: 1.6;
  color: #3d4570;
}

/* Lista de serviços */
.servicos-lista {
  padding: 4.5rem 5%;
  background: #fff;
}

.lista-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1.5rem;
  max-width: 1180px;
  margin: 0 auto;
}

.servico-card {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
  opacity: 0;
  transform: translateY(20px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.servico-card.visivel {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.servico-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.1);
}

.servico-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 1.35rem;
  border-radius: 14px;
  font-size: 1.15rem;
}

.servico-card h2 {
  margin: 0 0 0.65rem;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: #131a4d;
}

.servico-descricao {
  margin: 0 0 1.35rem;
  font-size: 0.98rem;
  line-height: 1.65;
  color: #6b7194;
}

.servico-itens {
  list-style: none;
  margin: auto 0 0;
  padding: 1.25rem 0 0;
  border-top: 1px solid #eeede7;
  display: grid;
  gap: 0.65rem;
}

.servico-itens li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.93rem;
  line-height: 1.5;
  color: #4b5280;
}

.servico-itens svg {
  margin-top: 0.2rem;
  flex: 0 0 auto;
  color: #22c55e;
}

.servico-contratar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 44px;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
}

.servico-contratar:hover {
  background: #0040c9;
}

.servico-contratar:focus-visible {
  outline: 3px solid #7c6ef2;
  outline-offset: 3px;
}

/* Responsivo */
@media (max-width: 768px) {
  .servicos-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .servicos-hero h1 {
    font-size: 2.05rem;
  }

  .servicos-hero p {
    font-size: 1rem;
  }

  .servicos-lista {
    padding: 3rem 1.25rem;
  }

  .lista-inner {
    grid-template-columns: 1fr;
  }

  .servico-card {
    padding: 1.6rem 1.35rem;
  }

  .servico-card h2 {
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .servico-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
