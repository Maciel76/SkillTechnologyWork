<template>
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Excelência em Educação</h1>
          <p>
            O Instituto Educar oferece uma formação completa e inovadora para
            crianças e jovens, preparando-os para os desafios do futuro.
          </p>
          <div class="hero-buttons">
            <a href="#admission" class="btn">Matricule-se</a>
            <a href="#features" class="btn btn-accent">Conheça nossa escola</a>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Estudantes felizes"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroBanner",
};
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--light-color), white);
  padding: 150px 0 80px;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-text {
  flex: 1;
  padding-right: 50px;
}

.hero-text h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-text {
    padding-right: 0;
    margin-bottom: 50px;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
