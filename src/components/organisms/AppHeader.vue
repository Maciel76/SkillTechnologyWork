<!-- src/components/Header.vue -->
<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <nav>
      <div class="logo">
        <router-link to="/" class="logo-link" @click="closeMenu">
          <img
            src="@/assets/svg/icons/logo.svg"
            alt="Skill Technology Work"
            class="logo-icon"
          />
          <span class="logo-text">Skill Technology Work</span>
        </router-link>
      </div>

      <button
        type="button"
        class="menu-toggle"
        :aria-expanded="isMenuOpen"
        aria-label="Abrir menu"
        @click="toggleMenu"
      >
        <font-awesome-icon :icon="isMenuOpen ? 'xmark' : 'bars'" />
      </button>

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

        <!-- CTA dentro do menu, só no celular -->
        <li class="mobile-cta">
          <router-link to="/contato" @click="closeMenu">
            Falar com a gente
          </router-link>
        </li>
      </ul>

      <router-link to="/contato" class="cta-button">
        <span class="cta-text">{{ displayedText }}</span>
        <span class="cta-caret" aria-hidden="true"></span>
      </router-link>
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
      isScrolled: false,
      displayedText: "",
      typingTimer: null,
      pauseTimer: null,
    };
  },
  mounted() {
    if (!this.$route.meta?.hideHeader) {
      this.startTyping();
    }
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  },
  beforeUnmount() {
    this.clearAllTimers();
    window.removeEventListener("scroll", this.handleScroll);
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
    handleScroll() {
      this.isScrolled = window.scrollY > 8;
    },
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
/* Header alinhado com o visual da hero */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  /* anula o padding global de "header" no style.css */
  padding: 0;
  background: rgba(246, 245, 241, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: background 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.site-header.scrolled {
  background: rgba(255, 255, 255, 0.9);
  border-bottom-color: #e6e5df;
  box-shadow: 0 6px 24px rgba(19, 26, 77, 0.06);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.85rem 5%;
}

/* Logo */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.logo-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
}

.logo-text {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #131a4d;
}

/* Menu */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  display: block;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  text-decoration: none;
  color: #4b5280;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-links a:hover {
  color: #131a4d;
  background: rgba(19, 26, 77, 0.05);
}

.nav-links a.router-link-active {
  color: #0052ff;
  background: rgba(0, 82, 255, 0.08);
}

.mobile-cta {
  display: none;
}

/* Botão principal */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 44px;
  min-width: 196px;
  padding: 0 1.25rem;
  border: none;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 82, 255, 0.25);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  background: #0040c9;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 82, 255, 0.3);
}

.cta-caret {
  width: 2px;
  height: 1.05em;
  background: rgba(255, 255, 255, 0.85);
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

/* Botão do menu */
.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid #dcdcd4;
  border-radius: 10px;
  background: #fff;
  color: #131a4d;
  font-size: 1.1rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.menu-toggle:hover {
  border-color: #7c6ef2;
}

@media (max-width: 900px) {
  .nav-links a {
    padding: 0.5rem 0.6rem;
    font-size: 0.9rem;
  }

  .cta-button {
    min-width: 168px;
    font-size: 0.9rem;
  }

  .logo-text {
    font-size: 0.98rem;
  }
}

@media (max-width: 768px) {
  nav {
    padding: 0.75rem 1.25rem;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0.75rem;
    right: 0.75rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.15rem;
    background: #fff;
    border: 1px solid #e6e5df;
    border-radius: 14px;
    padding: 0.6rem;
    box-shadow: 0 18px 40px rgba(19, 26, 77, 0.12);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    padding: 0.75rem 0.85rem;
    font-size: 1rem;
  }

  .mobile-cta {
    display: block;
    margin-top: 0.4rem;
    padding-top: 0.6rem;
    border-top: 1px solid #f0efe9;
  }

  .mobile-cta a,
  .mobile-cta a:hover {
    background: #0052ff;
    color: #fff;
    text-align: center;
    font-weight: 600;
  }

  .cta-button {
    display: none;
  }

  .logo-icon {
    width: 30px;
    height: 30px;
  }

  .logo-text {
    font-size: 0.95rem;
  }
}
</style>
