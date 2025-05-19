<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <h3 ref="visitsCounter">{{ animatedVisits }}</h3>
          <p>Visitas/mês</p>
        </div>
        <div class="stat-item">
          <h3 ref="leadsCounter">{{ animatedLeads }}</h3>
          <p>Leads/mês</p>
        </div>
        <div class="stat-item">
          <h3 ref="daysCounter">{{ animatedDays }}</h3>
          <p>Dias de prazo</p>
        </div>
        <div class="stat-item">
          <h3 ref="satisfactionCounter">{{ animatedSatisfaction }}%</h3>
          <p>Satisfação dos pais</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsEducar",
  data() {
    return {
      animatedVisits: 0,
      animatedLeads: 0,
      animatedDays: 0,
      animatedSatisfaction: 0,
      targetVisits: 1500,
      targetLeads: 50,
      targetDays: 22,
      targetSatisfaction: 98,
      animationDuration: 2000, // 2 segundos
      startTime: null,
      observer: null,
    };
  },
  mounted() {
    // Configura o Intersection Observer para detectar quando a seção está visível
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startCounters();
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.$el);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    startCounters() {
      this.startTime = performance.now();
      requestAnimationFrame(this.animateCounters);
    },
    animateCounters(timestamp) {
      if (!this.startTime) this.startTime = timestamp;

      const elapsed = timestamp - this.startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);

      // Easing function para suavizar a animação
      const easeOutQuad = (t) => t * (2 - t);

      this.animatedVisits = Math.floor(
        easeOutQuad(progress) * this.targetVisits
      );
      this.animatedLeads = Math.floor(easeOutQuad(progress) * this.targetLeads);
      this.animatedDays = Math.floor(easeOutQuad(progress) * this.targetDays);
      this.animatedSatisfaction = Math.floor(
        easeOutQuad(progress) * this.targetSatisfaction
      );

      if (progress < 1) {
        requestAnimationFrame(this.animateCounters);
      } else {
        // Garante que os valores finais sejam exatos
        this.animatedVisits = this.targetVisits;
        this.animatedLeads = this.targetLeads;
        this.animatedDays = this.targetDays;
        this.animatedSatisfaction = this.targetSatisfaction;
      }
    },
  },
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
  font-weight: 700;
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
