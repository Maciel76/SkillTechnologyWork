<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>Instituto Educar</h1>
          <p>Transformando vidas através da educação</p>
        </div>
        <nav class="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Nossa Escola</a></li>
            <li><a href="#gallery">Galeria</a></li>
            <li><a href="#admission">Matrículas</a></li>
            <li><a href="#events">Eventos</a></li>
            <li><a href="#" class="btn btn-accent">Área do Aluno</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderEducar",
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

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }

  .nav ul {
    margin-top: 20px;
  }

  .nav ul li {
    margin: 0 10px;
  }
}
</style>
