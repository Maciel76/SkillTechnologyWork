<!-- src/components/Header.vue -->
<template>
  <header>
    <nav>
      <div class="logo">
        <img
          src="@/assets/svg/icons/logo.svg"
          alt="Skill Technology Work"
          class="logo-icon"
        />
        <span><router-link to="/">Skill Technology</router-link></span>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <img src="https://api.iconify.design/heroicons:bars-3.svg" alt="Menu" />
      </div>
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li><router-link to="/blog" @click="closeMenu">Blog</router-link></li>
        <li>
          <router-link to="/Portfolio" @click="closeMenu"
            >Portfolio</router-link
          >
        </li>
        <li>
          <router-link to="/Services" @click="closeMenu">Serviços</router-link>
        </li>
        <li>
          <router-link to="/Planos/precos" @click="closeMenu"
            >Planos e preços</router-link
          >
        </li>
        <li>
          <router-link to="/Clientes" @click="closeMenu">Clientes</router-link>
        </li>
        <li><router-link to="/Loja" @click="closeMenu">Loja</router-link></li>
      </ul>
      <button class="cta-button">
        <router-link to="/contato"><span ref="typing"></span></router-link>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      texts: [
        "Entre em Contato",
        "Solicite Orçamento",
        "100% Gratuito",
        "Entre em Contato",
        "Tire suas Dúvidas",
        "Estamos Online",
        "Entrar em Contato",
      ],
      textIndex: 0,
      isMenuOpen: false,
      displayedText: "", // Adicionado para abordagem reativa
      typingInterval: null, // Para controle do intervalo
    };
  },
  mounted() {
    // Verifica se a rota permite mostrar o header antes de iniciar animação
    if (!this.$route.meta?.hideHeader) {
      this.startTyping();
    }
  },
  beforeUnmount() {
    // Limpa o intervalo quando o componente é destruído
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  },
  watch: {
    // Observa mudanças na rota para reiniciar animação quando necessário
    "$route.meta.hideHeader": {
      immediate: true,
      handler(hide) {
        if (this.typingInterval) {
          clearInterval(this.typingInterval);
        }
        if (!hide) {
          this.startTyping();
        }
      },
    },
  },
  methods: {
    typeText(text, callback) {
      let charIndex = 0;
      this.typingInterval = setInterval(() => {
        // Abordagem reativa - mais segura que manipulação direta do DOM
        this.displayedText = text.slice(0, charIndex++);

        if (charIndex > text.length) {
          clearInterval(this.typingInterval);
          setTimeout(callback, 5000);
        }
      }, 100);
    },
    startTyping() {
      // Reinicia o índice se chegou ao final
      if (this.textIndex >= this.texts.length) {
        this.textIndex = 0;
      }

      this.typeText(this.texts[this.textIndex], () => {
        this.textIndex++;
        this.startTyping();
      });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o Header */
header {
  position: relative;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
nav a {
  text-decoration: none;
  list-style: none;
  color: var(--pricing-text);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
}

.menu-toggle {
  display: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle img {
  width: 24px;
  height: 24px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    padding: 0.5rem 0;
  }

  .cta-button {
    display: none;
  }
}

/* //animação do botao entre en contato */
.cta-button {
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 180px; /* Largura fixa */
  height: 40px;
  text-align: center;
}

#typing {
  display: inline-block;
  white-space: nowrap;
  padding-right: 5px;
  border-right: 2px solid white;
}

@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

@keyframes erase {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
</style>
