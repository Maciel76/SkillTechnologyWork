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
        <span><router-link to="/">Skill Technology Work</router-link></span>
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
        <router-link to="/contato">{{ displayedText }}</router-link>
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
        "Solicite Orçamento",
        "100% Gratuito",
        "Fale Conosco",
        "Tire suas Dúvidas",
        "Estamos Online",
      ],
      textIndex: 0,
      isMenuOpen: false,
      displayedText: "",
      typingTimer: null,
      pauseTimer: null,
    };
  },
  mounted() {
    if (!this.$route.meta?.hideHeader) {
      this.startTyping();
    }
  },
  beforeUnmount() {
    this.clearAllTimers();
  },
  watch: {
    "$route.meta.hideHeader": {
      immediate: false,
      handler(hide) {
        this.clearAllTimers();
        if (!hide) {
          this.textIndex = 0;
          this.startTyping();
        }
      },
    },
  },
  methods: {
    clearAllTimers() {
      if (this.typingTimer) {
        clearInterval(this.typingTimer);
        this.typingTimer = null;
      }
      if (this.pauseTimer) {
        clearTimeout(this.pauseTimer);
        this.pauseTimer = null;
      }
    },
    typeText(text, callback) {
      this.clearAllTimers();
      let charIndex = 0;
      this.typingTimer = setInterval(() => {
        this.displayedText = text.slice(0, charIndex++);
        if (charIndex > text.length) {
          clearInterval(this.typingTimer);
          this.typingTimer = null;
          this.pauseTimer = setTimeout(callback, 5000);
        }
      }, 100);
    },
    startTyping() {
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
  width: 38px;
  height: 38px;
  border-radius: 8px;
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

</style>
