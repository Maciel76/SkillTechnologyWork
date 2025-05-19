<template>
  <section class="stats-section">
    <div class="container">
      <div class="stat-item">
        <div class="stat-number">+1200</div>
        <div class="stat-label">visitas/mês</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">+45</div>
        <div class="stat-label">leads/mês</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">20 dias</div>
        <div class="stat-label">prazo médio</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsSection",
};
</script>

<style scoped>
.stats-section {
  background: var(--primary);
  color: white;
  padding: 50px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 20px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  font-family: "Playfair Display", serif;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 600px) {
  .stat-item {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
