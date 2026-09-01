<template>
  <div>
    <!-- Adicionando Font Awesome via CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <main>
      <!-- Hero Section with Summary Banner -->
      <section class="institutional-hero">
        <h1>Política de <span class="highlight">Privacidade</span></h1>
        <p>Saiba como protegemos e utilizamos seus dados pessoais.</p>
        <div class="privacy-summary">
          <i class="fas fa-shield-alt"></i>
          <p>
            Seus dados estão seguros conosco. Utilizamos criptografia de ponta a
            ponta e seguimos as melhores práticas de segurança. Em conformidade
            com a LGPD.
          </p>
        </div>
        <p class="update-date">Última atualização: Março de 2026</p>
      </section>

      <div class="institutional-content">
        <!-- Privacy Policy Sections -->
        <div class="privacy-container">
          <!-- Navigation Menu -->
          <nav class="privacy-nav">
            <ul>
              <li><a href="#coleta">Coleta de Dados</a></li>
              <li><a href="#uso">Uso das Informações</a></li>
              <li><a href="#cookies">Política de Cookies</a></li>
              <li><a href="#lgpd">LGPD e Seus Direitos</a></li>
              <li><a href="#retencao">Retenção de Dados</a></li>
              <li><a href="#ia">Uso de Inteligência Artificial</a></li>
              <li><a href="#projetos">Dados de Projetos</a></li>
              <li><a href="#seguranca">Segurança</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

          <!-- Content Sections -->
          <div class="privacy-content">
            <section id="coleta" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-file-alt icon-coleta"></i>
                <h2>Coleta de Dados</h2>
              </div>
              <p>Coletamos informações para melhorar sua experiência:</p>
              <ul>
                <li>Dados de cadastro (nome, email, telefone)</li>
                <li>Informações de uso do site</li>
                <li>Dados de dispositivo e navegador</li>
                <li>Histórico de interações</li>
              </ul>
            </section>

            <section id="uso" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-cogs icon-uso"></i>
                <h2>Uso das Informações</h2>
              </div>
              <p>Utilizamos seus dados para:</p>
              <ul>
                <li>Personalizar sua experiência</li>
                <li>Melhorar nossos serviços</li>
                <li>Enviar atualizações relevantes</li>
                <li>Garantir a segurança da sua conta</li>
              </ul>
            </section>

            <section id="cookies" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-cookie-bite icon-cookies"></i>
                <h2>Política de Cookies</h2>
              </div>
              <p>Utilizamos cookies para melhorar sua experiência:</p>
              <ul>
                <li>Cookies essenciais para funcionamento</li>
                <li>Cookies de análise e desempenho</li>
                <li>Cookies de preferências</li>
                <li>Cookies de marketing (opcional)</li>
              </ul>
            </section>

            <section id="direitos" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-user-shield icon-direitos"></i>
                <h2>Seus Direitos</h2>
              </div>
              <p>Você tem direito a:</p>
              <ul>
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar correções</li>
                <li>Pedir exclusão de dados</li>
                <li>Revogar consentimento</li>
              </ul>
            </section>

            <section id="lgpd" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-balance-scale icon-lgpd"></i>
                <h2>LGPD — Lei Geral de Proteção de Dados</h2>
              </div>
              <p>
                A SkillTechnology está em total conformidade com a Lei Geral de
                Proteção de Dados (Lei nº 13.709/2018). Garantimos:
              </p>
              <ul>
                <li>Tratamento de dados apenas com base legal adequada</li>
                <li>Coleta mínima de dados pessoais necessários</li>
                <li>Direito de acesso, correção, exclusão e portabilidade</li>
                <li>Encarregado de dados (DPO) disponível para contato</li>
                <li>Notificação em caso de incidentes de segurança</li>
              </ul>
            </section>

            <section id="retencao" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-clock icon-retencao"></i>
                <h2>Retenção de Dados</h2>
              </div>
              <p>Mantemos seus dados pelo tempo necessário:</p>
              <ul>
                <li>Dados de cadastro: enquanto a conta estiver ativa</li>
                <li>Dados de projetos: 5 anos após a conclusão do projeto</li>
                <li>Dados de navegação: até 12 meses</li>
                <li>Dados fiscais: conforme obrigação legal (5 anos)</li>
                <li>Após o período, os dados são anonimizados ou excluídos</li>
              </ul>
            </section>

            <section id="ia" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-robot icon-ia"></i>
                <h2>Uso de Inteligência Artificial</h2>
              </div>
              <p>
                Utilizamos ferramentas de IA no desenvolvimento dos projetos.
                Sobre os dados dos clientes:
              </p>
              <ul>
                <li>Dados confidenciais do cliente não são compartilhados com ferramentas de IA</li>
                <li>Códigos-fonte são protegidos e não enviados a serviços externos sem autorização</li>
                <li>IA é utilizada como ferramenta de auxílio, não para tomada de decisões sobre dados pessoais</li>
                <li>Todas as ferramentas de IA utilizadas seguem políticas de privacidade compatíveis</li>
              </ul>
            </section>

            <section id="projetos" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-folder-open icon-projetos"></i>
                <h2>Tratamento de Dados de Projetos</h2>
              </div>
              <p>Para projetos desenvolvidos para clientes:</p>
              <ul>
                <li>Acesso restrito apenas à equipe designada ao projeto</li>
                <li>Dados sensíveis armazenados com criptografia</li>
                <li>NDA (Acordo de Confidencialidade) disponível quando necessário</li>
                <li>Dados do projeto entregues integralmente ao cliente ao final</li>
                <li>Backups seguros durante o período de desenvolvimento</li>
              </ul>
            </section>

            <section id="seguranca" class="content-section animate-on-scroll">
              <div class="section-header">
                <i class="fas fa-lock icon-seguranca"></i>
                <h2>Segurança</h2>
              </div>
              <p>Implementamos medidas de segurança:</p>
              <ul>
                <li>Criptografia de dados</li>
                <li>Proteção contra acesso não autorizado</li>
                <li>Monitoramento constante</li>
                <li>Backups regulares</li>
              </ul>
            </section>

            <section id="contato" class="content-section animate-on-scroll">
              <div class="section-header"></div>

              <div class="contact-info">
                <p>contato@skilltechnologywork.com</p>
                <p>Telefone: (62) 98280-9010</p>
                <router-link to="/contato" class="contact-button"
                  >Fale Conosco</router-link
                >
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "PoliticaView",
  components: {},
  mounted() {
    // Smooth scroll para navegação
    document.querySelectorAll(".privacy-nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Animação ao scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
      observer.observe(el);
    });
  },
};
</script>

<style scoped>
/* ─── Abertura ─── */
.institutional-hero {
  padding: 4rem 5% 3.5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
  color: #131a4d;
}

.institutional-hero h1 {
  margin: 0;
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.highlight {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.institutional-hero p {
  max-width: 620px;
  margin: 1rem auto 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #3d4570;
}

.update-date {
  display: inline-block;
  margin-top: 1.25rem !important;
  padding: 0.35rem 0.9rem;
  border: 1px solid #e2e1da;
  border-radius: 999px;
  background: #fff;
  font-size: 0.82rem !important;
  font-weight: 600;
  color: #6b7194 !important;
}

/* ─── Corpo ─── */
.institutional-content {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3.5rem 5% 4.5rem;
  background: #fff;
}

.privacy-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  align-items: start;
  gap: 3rem;
}

/* Índice fixo ao lado do texto */
.privacy-nav {
  position: sticky;
  top: 6rem;
  padding: 1.35rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
}

.privacy-nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.15rem;
}

.privacy-nav a {
  display: block;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #6b7194;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.privacy-nav a:hover {
  background: rgba(0, 82, 255, 0.07);
  color: #0052ff;
}

.privacy-content .content-section,
.privacy-content section {
  scroll-margin-top: 6rem;
  margin: 0 0 2.5rem;
  padding: 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fff;
}

.privacy-content h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: left;
  color: #131a4d;
}

.privacy-content p {
  margin: 0 0 1rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #4b5280;
}

.privacy-content p:last-child {
  margin-bottom: 0;
}

.privacy-content ul {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.6rem;
}

.privacy-content ul li {
  position: relative;
  padding-left: 1.15rem;
  font-size: 0.96rem;
  line-height: 1.7;
  color: #4b5280;
}

.privacy-content ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7c6ef2;
}


.privacy-content .section-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 0 1rem;
}

.privacy-content .section-header i {
  font-size: 1.05rem;
  color: #7c6ef2;
}

.privacy-content .section-header h2 {
  margin: 0;
}

.privacy-content .content-section {
  opacity: 1;
}
@media (max-width: 900px) {
  .privacy-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .privacy-nav {
    position: static;
  }
}

@media (max-width: 768px) {
  .institutional-hero {
    padding: 3rem 1.25rem 2.75rem;
    background-size: 80px 80px;
  }

  .institutional-hero h1 {
    font-size: 1.95rem;
  }

  .institutional-hero p {
    font-size: 0.98rem;
  }

  .institutional-content {
    padding: 2.5rem 1.25rem 3.5rem;
  }

  .privacy-content .content-section,
  .privacy-content section {
    padding: 1.35rem;
  }
}
</style>
