<template>
  <section class="section" id="features">
    <div class="container">
      <h2 class="section-title">Nossa Escola</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <h3>Educação de Qualidade</h3>
          <p>
            Professores altamente qualificados e metodologias inovadoras para um
            aprendizado eficaz.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-laptop"></i>
          </div>
          <h3>Tecnologia Educacional</h3>
          <p>
            Salas equipadas com tecnologia de ponta para preparar os alunos para
            o futuro digital.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h3>Ambiente Acolhedor</h3>
          <p>
            Espaço projetado para promover o bem-estar e o desenvolvimento
            integral dos alunos.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-futbol"></i>
          </div>
          <h3>Atividades Extracurriculares</h3>
          <p>
            Programa completo de esportes, artes e ciências para desenvolvimento
            multidisciplinar.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturesEducar",
};
</script>

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  color: var(--primary-color);
}

.feature-card p {
  color: #666;
}
</style>
