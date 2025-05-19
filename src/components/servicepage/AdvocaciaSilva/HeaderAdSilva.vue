<template>
  <header
    class="premium-header"
    :class="{ scrolled: isScrolled, 'menu-open': isMenuOpen }"
  >
    <div class="header-container">
      <!-- Logo 3D -->
      <div class="logo-3d" @click="closeMenu">
        <div class="logo-shape logo-part-1"></div>
        <div class="logo-shape logo-part-2"></div>
        <span class="logo-text">Advocacia Silva & Associados</span>
      </div>

      <!-- Menu Desktop -->
      <nav class="desktop-nav">
        <ul>
          <li v-for="(item, index) in navItems" :key="index">
            <a
              href="javascript:void(0)"
              class="nav-link"
              @click.prevent="scrollToSection(item.link)"
              @mouseenter="activateHoverEffect(index)"
              @mouseleave="deactivateHoverEffect"
            >
              <span class="nav-text">{{ item.text }}</span>
              <span
                class="nav-hover-effect"
                :class="{ active: activeHoverIndex === index }"
              ></span>
            </a>
          </li>
        </ul>
        <a href="#contato" class="contact-button">
          <span>Entrar em Contato</span>
          <div class="button-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20M20 12L14 6M20 12L14 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </a>
      </nav>

      <!-- Menu Mobile -->
      <button class="hamburger" @click="toggleMenu" aria-label="Menu">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </button>

      <div class="mobile-nav" v-if="isMenuOpen" @click="closeMenu">
        <div class="mobile-nav-content">
          <ul>
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link" class="mobile-nav-link">
                <span class="mobile-nav-text">{{ item.text }}</span>
              </a>
            </li>
          </ul>
          <a href="#contato" class="mobile-contact-button">
            Entrar em Contato
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "PremiumHeader",
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      activeHoverIndex: null,
      navItems: [
        { text: "Início", link: "#inicio" },
        { text: "Serviços", link: "#servicos" },
        { text: "Equipe", link: "#equipe" },
        { text: "Publicações", link: "#publicacoes" },
        { text: "Sobre Nós", link: "#sobre" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? "hidden" : "auto";
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = "auto";
    },
    activateHoverEffect(index) {
      this.activeHoverIndex = index;
    },
    deactivateHoverEffect() {
      this.activeHoverIndex = null;
    },
    scrollToSection(selector) {
      const target = document.querySelector(selector);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Ajuste caso tenha header fixo
          behavior: "smooth",
        });
        this.closeMenu();
      }
    },
  },
};
</script>

<style scoped>
:root {
  --primary: #1a3e72;
  --secondary: #d4af37;
  --dark: #0a192f;
  --light: #f8f9fa;
  --gray: #6c757d;
}

.premium-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.premium-header.scrolled {
  background: rgba(71, 122, 194, 0.9);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo 3D */
.logo-3d {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1002;
}

.logo-shape {
  width: 24px;
  height: 24px;
  position: relative;
  transition: all 0.3s ease;
}

.logo-part-1 {
  background: var(--primary);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: translateY(0) rotate(0);
  margin-right: -8px;
  z-index: 2;
}

.logo-part-2 {
  background: var(--secondary);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: translateY(5px) rotate(10deg);
  z-index: 1;
}

.logo-3d:hover .logo-part-1 {
  transform: translateY(-2px) rotate(-5deg);
}

.logo-3d:hover .logo-part-2 {
  transform: translateY(7px) rotate(15deg);
}

.logo-text {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 1.2rem;
  margin-left: 15px;
  color: var(--dark);
  transition: color 0.3s;
}

.scrolled .logo-text {
  color: white;
}

/* Menu Desktop */
.desktop-nav {
  display: flex;
  align-items: center;
}

.desktop-nav ul {
  display: flex;
  list-style: none;
  margin-right: 30px;
}

.desktop-nav li {
  margin: 0 12px;
  position: relative;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px 0;
  position: relative;
}

.nav-text {
  color: var(--dark);
  font-weight: 500;
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}

.scrolled .nav-text {
  color: rgba(255, 255, 255, 0.9);
}

.nav-hover-effect {
  position: absolute;
  bottom: 5px;
  width: 0;
  height: 2px;
  background: var(--secondary);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
}

.nav-hover-effect.active {
  width: 100%;
}

.contact-button {
  background: var(--secondary);
  color: var(--dark);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
}

.contact-button span {
  position: relative;
  z-index: 2;
}

.button-icon {
  width: 0;
  height: 20px;
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  opacity: 0;
}

.contact-button:hover {
  padding-right: 15px;
  padding-left: 25px;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}

.contact-button:hover .button-icon {
  width: 20px;
  margin-left: 10px;
  opacity: 1;
}

/* Menu Mobile */
.hamburger {
  display: none;
  background: none;
  border: none;
  width: 30px;
  height: 24px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1002;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: var(--dark);
  transition: all 0.3s ease;
  transform-origin: left center;
}

.scrolled .hamburger-line {
  background: white;
}

.menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(-2px);
}

.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(2px);
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.mobile-nav-content {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: white;
  padding: 100px 30px 30px;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

.mobile-nav ul {
  list-style: none;
  margin-bottom: 30px;
}

.mobile-nav li {
  margin-bottom: 20px;
}

.mobile-nav-link {
  text-decoration: none;
  display: block;
  padding: 10px 0;
}

.mobile-nav-text {
  color: var(--dark);
  font-size: 1.2rem;
  font-weight: 500;
  position: relative;
}

.mobile-nav-text:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--secondary);
  transition: width 0.3s;
}

.mobile-nav-link:hover .mobile-nav-text:after {
  width: 100%;
}

.mobile-contact-button {
  background: var(--primary);
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsividade */
@media (max-width: 992px) {
  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .logo-text {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .header-container {
    height: 70px;
  }

  .mobile-nav-content {
    width: 100%;
    max-width: none;
    padding-top: 80px;
  }
}
</style>
