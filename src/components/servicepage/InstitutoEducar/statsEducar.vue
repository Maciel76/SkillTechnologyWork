<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <h3>+1500</h3>
          <p>Visitas/mês</p>
        </div>
        <div class="stat-item">
          <h3>+50</h3>
          <p>Leads/mês</p>
        </div>
        <div class="stat-item">
          <h3>22</h3>
          <p>Dias de prazo</p>
        </div>
        <div class="stat-item">
          <h3>98%</h3>
          <p>Satisfação dos pais</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsEducar",
};
</script>

<style scoped>
.stats-section {
  background: var(--secondary-color);
  color: white;
  padding: 60px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
}

.stat-item h3 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 1.2rem;
  opacity: 0.9;
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
