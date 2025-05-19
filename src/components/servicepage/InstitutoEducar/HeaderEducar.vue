<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>Instituto Educar</h1>
          <p>Transformando vidas através da educação</p>
        </div>

        <!-- Botão do menu mobile -->
        <button class="mobile-menu-toggle" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <nav class="nav" :class="{ active: isMenuOpen }">
          <ul>
            <li><a href="#home" @click="closeMenu">Home</a></li>
            <li><a href="#features" @click="closeMenu">Nossa Escola</a></li>
            <li><a href="#gallery" @click="closeMenu">Galeria</a></li>
            <li><a href="#admission" @click="closeMenu">Matrículas</a></li>
            <li><a href="#events" @click="closeMenu">Eventos</a></li>
            <li>
              <a href="#" class="btn btn-accent" @click="closeMenu"
                >Área do Aluno</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderEducar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
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
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
}

.logo h1 {
  color: var(--primary-color);
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.logo p {
  color: var(--secondary-color);
  font-size: 0.8rem;
}

.nav ul {
  display: flex;
  list-style: none;
}

.nav ul li {
  margin-left: 30px;
}

.nav ul li a {
  text-decoration: none;
  color: var(--dark-color);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav ul li a:hover {
  color: var(--secondary-color);
}

/* Estilos para o menu mobile */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

.mobile-menu-toggle .bar {
  display: block;
  width: 25px;
  height: 3px;
  background-color: var(--dark-color);
  margin: 5px 0;
  transition: all 0.3s ease;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    padding-top: 80px;
    z-index: 1000;
  }

  .nav.active {
    right: 0;
  }

  .nav ul {
    flex-direction: column;
    padding: 20px;
  }

  .nav ul li {
    margin: 15px 0;
  }

  /* Animação do botão hamburguer para X */
  .mobile-menu-toggle.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .mobile-menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>
