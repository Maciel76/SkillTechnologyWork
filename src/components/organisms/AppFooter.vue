<!-- src/components/organisms/AppFooter.vue -->
<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- Marca -->
      <div class="footer-brand">
        <router-link to="/" class="logo">
          <img src="@/assets/svg/icons/logo.svg" alt="Logo" class="logo-icon" />
          <span>Skill Technology Work</span>
        </router-link>

        <p class="brand-texto">
          Colocamos inteligência artificial para trabalhar dentro do seu
          negócio — no sistema que você já usa ou em um novo, feito sob medida.
        </p>

        <h3 class="redes-titulo">Siga nosso trabalho</h3>
        <RedesSocias />
      </div>

      <!-- Links -->
      <nav class="footer-links">
        <div class="footer-column">
          <h3>Navegação</h3>
          <ul>
            <li><router-link to="/services">Serviços</router-link></li>
            <li><router-link to="/portfolio">Projetos</router-link></li>
            <li><router-link to="/clientes">Clientes</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/Loja">Loja</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>A agência</h3>
          <ul>
            <li><router-link to="/sobre">Sobre nós</router-link></li>
            <li><router-link to="/missao">Nossa missão</router-link></li>
            <li><router-link to="/eventos">Eventos</router-link></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Fale com a gente</h3>
          <ul>
            <li>
              <router-link to="/contato" class="link-destaque">
                Solicitar diagnóstico
                <font-awesome-icon icon="arrow-right" />
              </router-link>
            </li>
            <li>
              <a
                href="https://wa.me/5563982809010"
                target="_blank"
                rel="noopener"
                class="contato-linha"
              >
                <font-awesome-icon icon="comment-dots" />
                +55 (63) 98280-9010
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@skilltechnologywork.com"
                class="contato-linha"
              >
                <font-awesome-icon icon="envelope" />
                contato@skilltechnologywork.com
              </a>
            </li>
            <li class="contato-linha texto">
              <font-awesome-icon icon="location-dot" />
              Goiânia - GO
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <p>© {{ ano }} Skill Technology Work. Todos os direitos reservados.</p>
      <div class="footer-legal">
        <router-link to="/privacidade">Política de Privacidade</router-link>
        <span aria-hidden="true">·</span>
        <router-link to="/termos">Termos de Uso</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
import RedesSocias from "@/components/organisms/RedesSocias.vue";

export default {
  name: "AppFooter",
  components: { RedesSocias },
  computed: {
    ano() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.site-footer {
  padding: 4.5rem 5% 2rem;
  background: #101736;
  color: #fff;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  gap: 4rem;
  max-width: 1280px;
  margin: 0 auto 3rem;
}

/* Marca */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #fff;
  text-decoration: none;
}

.logo-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
}

.brand-texto {
  margin: 0 0 1.85rem;
  max-width: 340px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
}

.redes-titulo {
  margin: 0 0 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

/* Colunas */
/* align-items explícito: o style.css global tem `nav { align-items: center }`
   e centralizava as colunas, desalinhando os títulos entre si. */
.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1.35fr;
  align-items: start;
  gap: 2.5rem;
}

.footer-column h3 {
  margin: 0 0 1.15rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.footer-column ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.8rem;
}

.footer-column a {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-column a:hover {
  color: #fff;
}

.link-destaque {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  color: #8ab4ff !important;
}

.link-destaque:hover {
  color: #b9cfff !important;
}

.contato-linha {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.92rem;
}

.contato-linha svg {
  flex: 0 0 auto;
  color: rgba(255, 255, 255, 0.4);
}

.contato-linha.texto {
  color: rgba(255, 255, 255, 0.72);
}

/* Base */
.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 1.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  margin: 0;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: #fff;
}

.footer-legal span {
  color: rgba(255, 255, 255, 0.25);
}

/* Responsivo */
@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 2.75rem;
  }

  .brand-texto {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding: 3rem 1.25rem 1.75rem;
  }

  .footer-inner {
    margin-bottom: 2.25rem;
  }

  .footer-links {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
